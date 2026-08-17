/**
 * SCRIPT D'EXPÉDITION PRÉ-COMMANDES — Stripe → Mondial Relay (étiquettes en lot).
 *
 * À lancer au moment de l'envoi des colis (novembre) :
 *   node scripts/create-mr-shipments.mjs            → DRY-RUN (liste, ne crée rien)
 *   node scripts/create-mr-shipments.mjs --go       → crée les expéditions MR
 *   node scripts/create-mr-shipments.mjs --go --limit 1   → une seule (test)
 *
 * Ce qu'il fait :
 *   1. Liste les sessions Checkout PAYÉES portant metadata.flow=preorder_v2
 *   2. Zones fr / be-lu uniquement (CH + Outre-mer = hors réseau MR, listées « manuel »)
 *   3. Crée l'expédition via l'API v2 Mondial Relay (connect-api/api/shipment) :
 *        - mode relais   → DeliveryMode 24R, Location "FR-<numéro du point>"
 *        - mode domicile → DeliveryMode HOM à l'adresse de livraison collectée
 *      (⚠️ la création via l'ancienne API SOAP WSI2 renvoie STAT 95 sur les
 *      comptes récents — plus ouverte aux nouvelles intégrations, vérifié 14/08)
 *   4. Récupère l'URL de l'étiquette PDF (A4)
 *   5. Marque le PaymentIntent (metadata.mr_expedition + mr_label_url) → relançable
 *      sans doublon. ⚠️ Nécessite la permission « Payment Intents : Écriture » sur
 *      la clé restreinte (sinon : warning, à marquer à la main).
 *
 * Env requis (.env.local) : STRIPE_SECRET_KEY, MONDIAL_RELAY_API2_LOGIN,
 * MONDIAL_RELAY_API2_PASSWORD, MONDIAL_RELAY_ENSEIGNE (= CustomerId),
 * WAC_SENDER_NAME/ADDRESS/ZIP/CITY/PHONE/EMAIL, PREORDER_PARCEL_WEIGHT_GRAMS.
 */
import Stripe from 'stripe'
import fs from 'node:fs'

// ── Config ──────────────────────────────────────────────────────────────────
const GO = process.argv.includes('--go')
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

// Les identifiants MR ne sont exigés qu'en création réelle (le dry-run lit Stripe seul)
const required = GO
  ? ['STRIPE_SECRET_KEY', 'MONDIAL_RELAY_API2_LOGIN', 'MONDIAL_RELAY_API2_PASSWORD', 'MONDIAL_RELAY_ENSEIGNE']
  : ['STRIPE_SECRET_KEY']
for (const k of required) {
  if (!env[k]) throw new Error(`${k} manquante`)
}

// Expéditeur — TODO(Julien) : adresse réelle WeAreClimbers SAS à poser en env.
const SENDER = {
  name: env.WAC_SENDER_NAME || 'WEARECLIMBERS SAS',
  address: env.WAC_SENDER_ADDRESS || '',
  zip: env.WAC_SENDER_ZIP || '',
  city: env.WAC_SENDER_CITY || '',
  phone: env.WAC_SENDER_PHONE || '',
  email: env.WAC_SENDER_EMAIL || 'contact@weareclimbers.fr',
}
if (!SENDER.address || !SENDER.zip || !SENDER.city) {
  throw new Error('Expéditeur incomplet : poser WAC_SENDER_ADDRESS / WAC_SENDER_ZIP / WAC_SENDER_CITY (.env.local)')
}

/** Poids du colis en grammes, multiplié par la quantité commandée. */
const UNIT_WEIGHT = parseInt(env.PREORDER_PARCEL_WEIGHT_GRAMS || '350', 10)

/** Mode de collecte MR : REL = dépôt en point relais (contrat WAC — validé en réel
 *  le 17/08/2026, expédition 02097674 ; avec CCC l'API répond « Nous n'avons pas
 *  pu obtenir un prix pour cet envoi »). */
const MODE_COL = env.WAC_MR_MODE_COL || 'REL'

const MR_API2_URL = env.MONDIAL_RELAY_API2_URL || 'https://connect-api.mondialrelay.com/api/shipment'

// ── Helpers MR ──────────────────────────────────────────────────────────────

/** MR n'accepte que l'ASCII : translittère les accents, nettoie, tronque. */
function mrText(value, max = 32) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

const xmlEscape = (s) => (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** « 12 rue des Pyrénées » → { houseNo: '12', street: 'rue des Pyrénées' } */
function splitStreet(line1) {
  const m = (line1 ?? '').trim().match(/^(\d+\s?(?:bis|ter|[a-zA-Z])?)\s+(.{3,})$/)
  return m ? { houseNo: m[1].replace(/\s/g, ''), street: m[2] } : { houseNo: '', street: line1 ?? '' }
}

/** « Julien Dupont » → { firstname: 'Julien', lastname: 'Dupont' } */
function splitName(full) {
  const parts = (full ?? '').trim().split(/\s+/)
  if (parts.length <= 1) return { firstname: '', lastname: full ?? '' }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

function addressXml(p) {
  return `        <Address>
          <Title></Title>
          <Firstname>${xmlEscape(p.firstname)}</Firstname>
          <Lastname>${xmlEscape(p.lastname)}</Lastname>
          <Streetname>${xmlEscape(p.street)}</Streetname>
          <HouseNo>${xmlEscape(p.houseNo)}</HouseNo>
          <CountryCode>${p.country}</CountryCode>
          <PostCode>${p.zip}</PostCode>
          <City>${xmlEscape(p.city)}</City>
          <AddressAdd1>${xmlEscape(p.address2 ?? '')}</AddressAdd1>
          <AddressAdd2></AddressAdd2>
          <AddressAdd3></AddressAdd3>
          <PhoneNo></PhoneNo>
          <MobileNo>${xmlEscape(p.phone ?? '')}</MobileNo>
          <Email>${xmlEscape(p.email ?? '')}</Email>
        </Address>`
}

/**
 * Création d'une expédition via l'API v2 (XML en requête, JSON en réponse).
 * Auth : Login/Password API dédiés (≠ enseigne/clé privée de l'API SOAP).
 */
async function createShipment({ orderRef, dest, weightGrams, modeLiv, relayCountry, relayId }) {
  const sender = splitStreet(SENDER.address)
  const senderName = splitName(SENDER.name)
  const destStreet = splitStreet(dest.address)
  const destName = splitName(dest.name)

  const deliveryMode =
    modeLiv === '24R'
      ? `<DeliveryMode Mode="24R" Location="${relayCountry}-${relayId}"/>`
      : `<DeliveryMode Mode="HOM"/>`

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<ShipmentCreationRequest xmlns="http://www.example.org/Request" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Context>
    <Login>${xmlEscape(env.MONDIAL_RELAY_API2_LOGIN)}</Login>
    <Password>${xmlEscape(env.MONDIAL_RELAY_API2_PASSWORD)}</Password>
    <CustomerId>${env.MONDIAL_RELAY_ENSEIGNE}</CustomerId>
    <Culture>fr-FR</Culture>
    <VersionAPI>1.0</VersionAPI>
  </Context>
  <OutputOptions>
    <OutputFormat>A4</OutputFormat>
    <OutputType>PdfUrl</OutputType>
  </OutputOptions>
  <ShipmentsList>
    <Shipment>
      <OrderNo>${xmlEscape(mrText(orderRef, 15))}</OrderNo>
      <CustomerNo></CustomerNo>
      <ParcelCount>1</ParcelCount>
      ${deliveryMode}
      <CollectionMode Mode="${MODE_COL}"/>
      <Parcels>
        <Parcel>
          <Content>Bracelet Polar 360 WeAreClimbers</Content>
          <Weight Value="${weightGrams}" Unit="gr"/>
        </Parcel>
      </Parcels>
      <DeliveryInstruction></DeliveryInstruction>
      <Sender>
${addressXml({ ...senderName, street: sender.street, houseNo: sender.houseNo, country: 'FR', zip: SENDER.zip, city: SENDER.city, phone: SENDER.phone, email: SENDER.email })}
      </Sender>
      <Recipient>
${addressXml({ ...destName, street: destStreet.street, houseNo: destStreet.houseNo, country: dest.country, zip: dest.zip, city: dest.city, address2: dest.address2, phone: dest.phone, email: dest.email })}
      </Recipient>
    </Shipment>
  </ShipmentsList>
</ShipmentCreationRequest>`

  const res = await fetch(MR_API2_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/xml' },
    body: xml,
  })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error(`Réponse MR illisible (HTTP ${res.status}) : ${text.slice(0, 200)}`)
  }

  const error = (data.statusListField ?? []).find((s) => (s.levelField ?? '').toLowerCase().includes('error'))
  if (error) throw new Error(`MR : ${error.messageField ?? 'erreur inconnue'}`)

  const shipment = data.shipmentsListField?.[0]
  const expeditionNum = shipment?.shipmentNumberField
  const labelUrl = shipment?.labelListField?.labelField?.outputField
  if (!expeditionNum) throw new Error(`Réponse MR sans numéro d'expédition : ${text.slice(0, 200)}`)
  return { expeditionNum, labelUrl: labelUrl ?? '' }
}

// ── Lecture des commandes Stripe ────────────────────────────────────────────
const stripe = new Stripe(env.STRIPE_SECRET_KEY)

function getShippingAddress(session) {
  const s = session.collected_information?.shipping_details ?? session.shipping_details ?? null
  return s ? { name: s.name, address: s.address } : null
}

console.log(`${GO ? '🚀 CRÉATION RÉELLE' : '🔍 DRY-RUN (rien ne sera créé — ajoute --go)'} — enseigne ${env.MONDIAL_RELAY_ENSEIGNE}\n`)

const toShip = []
const manual = []
const done = []

for await (const session of stripe.checkout.sessions.list({
  limit: 100,
  expand: ['data.payment_intent'],
})) {
  if (session.metadata?.flow !== 'preorder_v2') continue
  if (session.payment_status !== 'paid') continue

  const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
  if (pi?.metadata?.mr_expedition) {
    done.push({ session, expedition: pi.metadata.mr_expedition })
    continue
  }

  const zone = session.metadata.zone
  if (zone !== 'fr' && zone !== 'be-lu') {
    manual.push(session) // CH / Outre-mer : hors réseau MR → Colissimo à la main
    continue
  }
  toShip.push(session)
}

if (done.length) console.log(`Déjà expédiées (metadata mr_expedition) : ${done.length}`)
if (manual.length) {
  console.log(`\n⚠️ À expédier À LA MAIN (hors réseau MR) : ${manual.length}`)
  for (const s of manual) {
    const ship = getShippingAddress(s)
    console.log(`  - ${s.customer_details?.email} | zone ${s.metadata.zone} | ${ship?.name ?? ''}, ${ship?.address?.postal_code ?? ''} ${ship?.address?.city ?? ''} (${ship?.address?.country ?? ''})`)
  }
}

console.log(`\nÀ créer chez Mondial Relay : ${Math.min(toShip.length, LIMIT)} / ${toShip.length}\n`)

let created = 0
let failed = 0
for (const session of toShip.slice(0, LIMIT === Infinity ? undefined : LIMIT)) {
  const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
  const isRelay = session.metadata.shipping_mode === 'relais'
  const email = session.customer_details?.email ?? ''
  const phone = session.customer_details?.phone ?? ''

  // Destinataire = le client. En relais : adresse de facturation (le colis va au
  // relais via LIV_Rel, mais MR exige l'adresse du destinataire pour le notifier).
  // En domicile : l'adresse de livraison collectée par Stripe.
  const ship = getShippingAddress(session)
  const addr = isRelay ? session.customer_details?.address : (ship?.address ?? session.customer_details?.address)
  const name = isRelay ? (session.customer_details?.name ?? '') : (ship?.name ?? session.customer_details?.name ?? '')

  // Quantité → poids (1 colis unique par commande)
  let qty = 1
  try {
    const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
    qty = items.data.reduce((n, li) => n + (li.quantity ?? 1), 0) || 1
  } catch {
    /* défaut 1 */
  }

  const label = `${email} | ${isRelay ? `relais ${session.metadata.relay_id} (${session.metadata.relay_name})` : `domicile ${addr?.postal_code} ${addr?.city}`} | ${qty} colis-unité | ${UNIT_WEIGHT * qty} g`

  if (!addr?.line1 || !addr?.postal_code || !addr?.city || !addr?.country) {
    console.log(`❌ SKIP ${label} — adresse destinataire incomplète`)
    failed++
    continue
  }

  if (!GO) {
    console.log(`→ ${label}`)
    continue
  }

  try {
    const { expeditionNum, labelUrl } = await createShipment({
      orderRef: (pi?.id ?? session.id).slice(-15),
      dest: {
        name,
        address: addr.line1,
        address2: addr.line2 ?? '',
        zip: addr.postal_code,
        city: addr.city,
        country: addr.country,
        phone,
        email,
      },
      weightGrams: UNIT_WEIGHT * qty,
      modeLiv: isRelay ? '24R' : 'HOM',
      relayCountry: isRelay ? session.metadata.relay_country : undefined,
      relayId: isRelay ? session.metadata.relay_id : undefined,
    })

    console.log(`✅ ${label}`)
    console.log(`   Expédition ${expeditionNum} — étiquette : ${labelUrl}`)
    created++

    // Idempotence : marquer le PaymentIntent (relance sans doublon)
    if (pi) {
      try {
        await stripe.paymentIntents.update(pi.id, {
          metadata: { ...pi.metadata, mr_expedition: expeditionNum, mr_label_url: labelUrl.slice(0, 480) },
        })
      } catch (err) {
        console.log(`   ⚠️ Impossible de marquer le PaymentIntent (permission « Payment Intents : Écriture » manquante sur la clé ?) — noter l'expédition ${expeditionNum} à la main. ${err.message}`)
      }
    }
  } catch (err) {
    console.log(`❌ ÉCHEC ${label} — ${err.message}`)
    failed++
  }
}

console.log(`\n──────── Bilan ────────`)
console.log(`Créées : ${created}${GO ? '' : ' (dry-run)'} · Échecs/skips : ${failed} · Manuelles (CH/DOM) : ${manual.length} · Déjà faites : ${done.length}`)
