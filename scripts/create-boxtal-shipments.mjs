/**
 * SCRIPT D'EXPÉDITION PRÉ-COMMANDES — Stripe → Boxtal (étiquettes en lot).
 * Remplaçant de create-mr-shipments.mjs (on quitte Mondial Relay pour Boxtal).
 *
 * À lancer au moment de l'envoi des colis :
 *   node scripts/create-boxtal-shipments.mjs            → DRY-RUN (liste, ne crée rien)
 *   node scripts/create-boxtal-shipments.mjs --go       → crée les expéditions Boxtal
 *   node scripts/create-boxtal-shipments.mjs --go --limit 1   → une seule (test)
 *   node scripts/create-boxtal-shipments.mjs --sync-labels    → récupère les étiquettes
 *                                                                asynchrones manquantes (maj PI)
 *
 * Ce qu'il fait :
 *   1. Liste les sessions Checkout PAYÉES portant metadata.flow=preorder_v2
 *   2. Zones fr / be-lu (CH + Outre-mer = douane CN23 → listées « manuel » en v1)
 *   3. Résout l'offre Boxtal selon zone + mode de livraison :
 *        - domicile FR      → POFR-ColissimoExpert (Colissimo domicile AVEC signature)
 *        - domicile BE-LU   → POFR-ColissimoExpertInternational
 *        - relais (Shop2Shop) → CHRP-ChronoShoptoShop + pickupPointCode (metadata.relay_point_code)
 *   4. Assurance : insured = (quantité >= 2) — décision Julien 28/09 (1 bracelet = non assuré)
 *   5. Crée l'expédition (POST /shipping/v3.1/shipping-order), récupère l'étiquette PDF
 *      (GET .../shipping-document, type LABEL) et le n° de suivi
 *   6. Marque le PaymentIntent (metadata.boxtal_order + boxtal_label_url + boxtal_tracking)
 *      → relançable sans doublon. ⚠️ Nécessite « Payment Intents : Écriture » sur la clé.
 *
 * ⚠️ CONTRAT METADATA attendu (posé par le checkout, à mettre à jour lors du branchement) :
 *   flow=preorder_v2, zone, shipping_mode (domicile|relais), quantité (line items),
 *   et pour le relais : relay_point_code (code point Boxtal CHRP), relay_name/zip/city/country.
 *
 * Env requis (.env.local) : STRIPE_SECRET_KEY, BOXTAL_API_ACCESS_KEY, BOXTAL_API_SECRET_KEY,
 *   WAC_SENDER_NAME/ADDRESS/ZIP/CITY/PHONE/EMAIL. Optionnels : BOXTAL_API_BASE_URL
 *   (défaut TEST api.boxtal.build — la PROD DOIT poser https://api.boxtal.com),
 *   PREORDER_PARCEL_WEIGHT_GRAMS (250), PREORDER_PARCEL_{LENGTH,WIDTH,HEIGHT}_CM (20/15/5),
 *   PREORDER_PARCEL_CONTENT_ID (content:v1:50170), PREORDER_UNIT_VALUE_EUR (179).
 */
import Stripe from 'stripe'
import fs from 'node:fs'

// ── Config ──────────────────────────────────────────────────────────────────
const GO = process.argv.includes('--go')
const SYNC = process.argv.includes('--sync-labels')
const limitArg = process.argv.indexOf('--limit')
const LIMIT = limitArg !== -1 ? parseInt(process.argv[limitArg + 1], 10) : Infinity

function loadEnv() {
  const out = { ...process.env }
  try {
    for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
      const i = line.indexOf('=')
      if (i > 0 && /^[A-Z0-9_]+$/i.test(line.slice(0, i)) && out[line.slice(0, i)] === undefined) {
        out[line.slice(0, i)] = line.slice(i + 1).trim()
      }
    }
  } catch {
    /* pas de .env.local (CI) : env process uniquement */
  }
  return out
}
const env = loadEnv()

// Les identifiants Boxtal ne sont exigés qu'en création réelle (le dry-run lit Stripe seul)
const required = GO || SYNC
  ? ['STRIPE_SECRET_KEY', 'BOXTAL_API_ACCESS_KEY', 'BOXTAL_API_SECRET_KEY']
  : ['STRIPE_SECRET_KEY']
for (const k of required) {
  if (!env[k]) throw new Error(`${k} manquante`)
}

// Défaut sur le serveur de TEST — anti-facturation accidentelle. La prod doit surcharger.
const BOXTAL_BASE_URL = env.BOXTAL_API_BASE_URL || 'https://api.boxtal.build'
const BOXTAL_AUTH =
  'Basic ' + Buffer.from(`${env.BOXTAL_API_ACCESS_KEY}:${env.BOXTAL_API_SECRET_KEY}`, 'utf8').toString('base64')

const SENDER = {
  name: env.WAC_SENDER_NAME || 'WEARECLIMBERS SAS',
  address: env.WAC_SENDER_ADDRESS || '',
  zip: env.WAC_SENDER_ZIP || '',
  city: env.WAC_SENDER_CITY || '',
  phone: env.WAC_SENDER_PHONE || '',
  email: env.WAC_SENDER_EMAIL || 'contact@weareclimbers.fr',
}
if (GO && (!SENDER.address || !SENDER.zip || !SENDER.city)) {
  throw new Error('Expéditeur incomplet : poser WAC_SENDER_ADDRESS / WAC_SENDER_ZIP / WAC_SENDER_CITY (.env.local)')
}

const UNIT_WEIGHT_G = parseInt(env.PREORDER_PARCEL_WEIGHT_GRAMS || '250', 10)
const PARCEL = {
  length: parseInt(env.PREORDER_PARCEL_LENGTH_CM || '20', 10),
  width: parseInt(env.PREORDER_PARCEL_WIDTH_CM || '15', 10),
  height: parseInt(env.PREORDER_PARCEL_HEIGHT_CM || '5', 10),
  contentId: env.PREORDER_PARCEL_CONTENT_ID || 'content:v1:50170', // Montres, horlogerie
}
const UNIT_VALUE_EUR = parseFloat(env.PREORDER_UNIT_VALUE_EUR || '179')


// ── Helpers ───────────────────────────────────────────────────────────────────

/** Résout l'offre Boxtal (shippingOfferCode) selon zone + mode. null = à faire à la main. */
function resolveOffer(zone, mode) {
  if (mode === 'relais') {
    // Shop2Shop = produit C2C → expéditeur RESIDENTIAL OBLIGATOIRE (avec BUSINESS,
    // aucune offre n'est trouvée). Réseau FR ; BE-LU relais non couvert en v1 → manuel.
    return zone === 'fr'
      ? { code: 'CHRP-ChronoShoptoShop', needsPickup: true, senderType: 'RESIDENTIAL' }
      : null
  }
  // domicile (Colissimo avec signature) — expéditeur BUSINESS
  if (zone === 'fr') return { code: 'POFR-ColissimoExpert', needsPickup: false, senderType: 'BUSINESS' }
  if (zone === 'be-lu') return { code: 'POFR-ColissimoExpertInternational', needsPickup: false, senderType: 'BUSINESS' }
  return null // ch / dom-tom → douane CN23, manuel en v1
}

/** Téléphone national → format international exigé par Boxtal (+CCC…). */
function toIntlPhone(raw, country) {
  const cc = { FR: '33', MC: '33', BE: '32', LU: '352', CH: '41' }[country] || '33'
  let p = (raw || '').replace(/[^\d+]/g, '')
  if (p.startsWith('+')) return p
  if (p.startsWith('00')) return '+' + p.slice(2)
  if (p.startsWith('0')) return '+' + cc + p.slice(1)
  return p ? '+' + cc + p : ''
}

/** « 12 rue des Pyrénées » → { number: '12', street: 'rue des Pyrénées' } */
function splitStreet(line1) {
  const m = (line1 ?? '').trim().match(/^(\d+\s?(?:bis|ter|[a-zA-Z])?)\s+(.{2,})$/)
  return m ? { number: m[1].replace(/\s/g, ''), street: m[2] } : { number: '', street: line1 ?? '' }
}

/** « Julien Dupont » → { firstName: 'Julien', lastName: 'Dupont' } */
function splitName(full) {
  const parts = (full ?? '').trim().split(/\s+/)
  if (parts.length <= 1) return { firstName: '', lastName: full || '—' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function boxtalAddress({ type, name, line1, line2, zip, city, country, phone, email, company }) {
  const who = splitName(name)
  const street = splitStreet(line1)
  return {
    type,
    contact: {
      firstName: who.firstName || '.',
      lastName: who.lastName || '.',
      email: email || SENDER.email,
      phone: toIntlPhone(phone, country),
      ...(company ? { company } : {}),
    },
    location: {
      number: street.number || undefined,
      street: [street.street, line2].filter(Boolean).join(' '),
      city,
      postalCode: zip,
      countryIsoCode: country,
    },
  }
}

async function boxtalFetch(path, init) {
  const res = await fetch(new URL(path, BOXTAL_BASE_URL), {
    method: init?.method || 'GET',
    headers: {
      Authorization: BOXTAL_AUTH,
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  })
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    throw new Error(`Réponse Boxtal illisible (HTTP ${res.status}) : ${text.slice(0, 200)}`)
  }
  if (!res.ok) {
    const codes = (data?.errors ?? []).map((e) => e.code).join(', ') || `HTTP ${res.status}`
    throw new Error(`Boxtal ${init?.method || 'GET'} ${path} : ${codes}`)
  }
  return data
}

/** Étiquette + suivi générés en ASYNCHRONE par Boxtal (aussi poussés par les
 *  webhooks DOCUMENT_CREATED / TRACKING_CHANGED). On sonde quelques fois. */
async function fetchDocs(orderId, { tries = 6, delayMs = 2500 } = {}) {
  let labelUrl = ''
  let trackingNumber = ''
  for (let i = 0; i < tries; i++) {
    try {
      const docs = await boxtalFetch(`/shipping/v3.1/shipping-order/${encodeURIComponent(orderId)}/shipping-document`)
      labelUrl = (docs?.content ?? []).find((d) => d.type === 'LABEL')?.url ?? ''
    } catch {
      /* pas encore prêt */
    }
    try {
      const tr = await boxtalFetch(`/shipping/v3.1/shipping-order/${encodeURIComponent(orderId)}/tracking`)
      trackingNumber = (tr?.content ?? [])[0]?.trackingNumber ?? trackingNumber
    } catch {
      /* suivi pas encore dispo */
    }
    if (labelUrl) break
    if (i < tries - 1) await new Promise((r) => setTimeout(r, delayMs))
  }
  return { labelUrl, trackingNumber }
}

async function createShipment({ offer, dest, weightG, insured, qty, orderRef }) {
  const from = boxtalAddress({
    type: offer.senderType || 'BUSINESS',
    name: SENDER.name,
    // Un expéditeur RESIDENTIAL (exigé par Shop2Shop) ne porte pas de société.
    ...(offer.senderType === 'RESIDENTIAL' ? {} : { company: 'WeAreClimbers' }),
    line1: SENDER.address,
    zip: SENDER.zip,
    city: SENDER.city,
    country: 'FR',
    phone: SENDER.phone,
    email: SENDER.email,
  })
  const to = boxtalAddress({ type: 'RESIDENTIAL', ...dest })

  const body = {
    insured,
    labelType: 'PDF_A4',
    shippingOfferCode: offer.code,
    shipment: {
      externalId: orderRef,
      fromAddress: from,
      toAddress: to,
      ...(offer.needsPickup && dest.pickupPointCode ? { pickupPointCode: dest.pickupPointCode } : {}),
      packages: [
        {
          type: 'PARCEL',
          weight: weightG / 1000,
          length: PARCEL.length,
          width: PARCEL.width,
          height: PARCEL.height,
          value: { value: +(UNIT_VALUE_EUR * qty).toFixed(2), currency: 'EUR' },
          content: { id: PARCEL.contentId, description: 'Bracelet connecte Polar 360 WeAreClimbers' },
        },
      ],
    },
  }

  const created = await boxtalFetch('/shipping/v3.1/shipping-order', { method: 'POST', body })
  const orderId = created?.content?.id
  if (!orderId) throw new Error(`Réponse Boxtal sans id de commande : ${JSON.stringify(created).slice(0, 200)}`)

  // Étiquette + suivi générés en asynchrone → on sonde quelques secondes.
  const { labelUrl, trackingNumber } = await fetchDocs(orderId)
  return { orderId, labelUrl, trackingNumber, price: created?.content?.deliveryPriceExclTax?.value }
}

// ── Lecture des commandes Stripe ────────────────────────────────────────────
const stripe = new Stripe(env.STRIPE_SECRET_KEY)

// Mode --sync-labels : ré-interroge les étiquettes des expéditions déjà créées
// dont l'URL n'a pas été captée (génération asynchrone) et met à jour le PaymentIntent.
if (SYNC) {
  console.log('🔄 SYNC LABELS — récupération des étiquettes manquantes\n')
  let synced = 0
  for await (const session of stripe.checkout.sessions.list({ limit: 100, expand: ['data.payment_intent'] })) {
    if (session.metadata?.flow !== 'preorder_v2') continue
    const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
    const orderId = pi?.metadata?.boxtal_order
    if (!pi || !orderId || pi.metadata.boxtal_label_url) continue
    const { labelUrl, trackingNumber } = await fetchDocs(orderId, { tries: 3, delayMs: 2000 })
    if (!labelUrl) {
      console.log(`⏳ ${orderId} — étiquette toujours pas prête`)
      continue
    }
    try {
      await stripe.paymentIntents.update(pi.id, {
        metadata: { ...pi.metadata, boxtal_label_url: labelUrl.slice(0, 480), boxtal_tracking: trackingNumber },
      })
      console.log(`✅ ${orderId} — étiquette récupérée`)
      synced++
    } catch (err) {
      console.log(`⚠️ ${orderId} — maj PaymentIntent impossible : ${err.message}`)
    }
  }
  console.log(`\nSynchronisées : ${synced}`)
  process.exit(0)
}

function getShippingAddress(session) {
  const s = session.collected_information?.shipping_details ?? session.shipping_details ?? null
  return s ? { name: s.name, address: s.address } : null
}

console.log(
  `${GO ? '🚀 CRÉATION RÉELLE' : '🔍 DRY-RUN (rien ne sera créé — ajoute --go)'} — Boxtal ${BOXTAL_BASE_URL}\n`,
)

const toShip = []
const manual = []
const done = []
const refunded = []

for await (const session of stripe.checkout.sessions.list({
  limit: 100,
  expand: ['data.payment_intent', 'data.payment_intent.latest_charge'],
})) {
  if (session.metadata?.flow !== 'preorder_v2') continue
  if (session.payment_status !== 'paid') continue

  const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
  if (pi?.metadata?.boxtal_order) {
    done.push({ session, order: pi.metadata.boxtal_order })
    continue
  }

  // Commande remboursée (totale ou partielle) → on ne l'expédie pas.
  const charge = pi && typeof pi.latest_charge === 'object' ? pi.latest_charge : null
  if (charge && (charge.refunded || (charge.amount_refunded ?? 0) > 0)) {
    refunded.push(session)
    continue
  }

  const zone = session.metadata.zone
  const mode = session.metadata.shipping_mode
  if (!resolveOffer(zone, mode)) {
    manual.push(session) // CH / Outre-mer / cas non couvert → manuel
    continue
  }
  toShip.push(session)
}

if (done.length) console.log(`Déjà expédiées (metadata boxtal_order) : ${done.length}`)
if (refunded.length) console.log(`Remboursées (non expédiées) : ${refunded.length}`)
if (manual.length) {
  console.log(`\n⚠️ À expédier À LA MAIN (hors périmètre Boxtal v1) : ${manual.length}`)
  for (const s of manual) {
    const ship = getShippingAddress(s)
    console.log(
      `  - ${s.customer_details?.email} | zone ${s.metadata.zone}/${s.metadata.shipping_mode} | ${ship?.address?.postal_code ?? ''} ${ship?.address?.city ?? ''} (${ship?.address?.country ?? ''})`,
    )
  }
}

console.log(`\nÀ créer chez Boxtal : ${Math.min(toShip.length, LIMIT)} / ${toShip.length}\n`)

let created = 0
let failed = 0
for (const session of toShip.slice(0, LIMIT === Infinity ? undefined : LIMIT)) {
  const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
  const zone = session.metadata.zone
  const mode = session.metadata.shipping_mode
  const offer = resolveOffer(zone, mode)
  const isRelay = mode === 'relais'
  const email = session.customer_details?.email ?? ''
  const phone = session.customer_details?.phone ?? ''

  // Relais : la destination EST le point relais → la localisation du toAddress doit
  // être celle du RELAIS (zip/ville), sinon l'offre Shop2Shop ne matche pas (le relais
  // doit être dans la zone du destinataire). Le contact reste le client (notification).
  // Domicile : adresse de livraison collectée par Stripe.
  const ship = getShippingAddress(session)
  let addr, name
  if (isRelay) {
    name = session.customer_details?.name ?? ''
    addr = {
      line1: session.metadata.relay_name || 'Point relais',
      line2: '',
      postal_code: session.metadata.relay_zip,
      city: session.metadata.relay_city,
      country: session.metadata.relay_country || 'FR',
    }
  } else {
    addr = ship?.address ?? session.customer_details?.address
    name = ship?.name ?? session.customer_details?.name ?? ''
  }

  // Quantité → poids + valeur + règle d'assurance
  let qty = 1
  try {
    const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
    qty = items.data.reduce((n, li) => n + (li.quantity ?? 1), 0) || 1
  } catch {
    /* défaut 1 */
  }
  const insured = qty >= 2 // décision Julien 28/09
  const weightG = UNIT_WEIGHT_G * qty

  const label = `${email} | ${zone}/${mode}${isRelay ? ` (point ${session.metadata.relay_point_code || '???'})` : ''} | ${qty}×bracelet | ${weightG} g${insured ? ' | 🛡️ assuré' : ''}`

  if (!addr?.line1 || !addr?.postal_code || !addr?.city || !addr?.country) {
    console.log(`❌ SKIP ${label} — adresse destinataire incomplète`)
    failed++
    continue
  }
  if (offer.needsPickup && !session.metadata.relay_point_code) {
    console.log(`❌ SKIP ${label} — point relais Boxtal manquant (metadata.relay_point_code)`)
    failed++
    continue
  }

  if (!GO) {
    console.log(`→ ${label}`)
    continue
  }

  try {
    const { orderId, labelUrl, trackingNumber, price } = await createShipment({
      offer,
      insured,
      qty,
      weightG,
      orderRef: (pi?.id ?? session.id).slice(-30),
      dest: {
        name,
        line1: addr.line1,
        line2: addr.line2 ?? '',
        zip: addr.postal_code,
        city: addr.city,
        country: addr.country,
        phone,
        email,
        pickupPointCode: session.metadata.relay_point_code,
      },
    })

    console.log(`✅ ${label}`)
    console.log(`   Commande ${orderId}${price != null ? ` (${price} € HT)` : ''} — suivi ${trackingNumber || '—'}`)
    console.log(`   Étiquette : ${labelUrl || '⏳ pas encore prête (ré-interroger par id)'}`)
    created++

    // Idempotence : marquer le PaymentIntent (relance sans doublon)
    if (pi) {
      try {
        await stripe.paymentIntents.update(pi.id, {
          metadata: {
            ...pi.metadata,
            boxtal_order: orderId,
            boxtal_label_url: labelUrl.slice(0, 480),
            boxtal_tracking: trackingNumber,
          },
        })
      } catch (err) {
        console.log(
          `   ⚠️ Impossible de marquer le PaymentIntent (permission « Payment Intents : Écriture » ?) — noter ${orderId} à la main. ${err.message}`,
        )
      }
    }
  } catch (err) {
    console.log(`❌ ÉCHEC ${label} — ${err.message}`)
    failed++
  }
}

console.log(`\n──────── Bilan ────────`)
console.log(
  `Créées : ${created}${GO ? '' : ' (dry-run)'} · Échecs/skips : ${failed} · Manuelles : ${manual.length} · Remboursées : ${refunded.length} · Déjà faites : ${done.length}`,
)
