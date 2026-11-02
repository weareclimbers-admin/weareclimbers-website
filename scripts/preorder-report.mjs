/**
 * BILAN DES PRÉ-COMMANDES — LECTURE SEULE (ne modifie rien, ni Stripe ni Boxtal).
 *
 *   STRIPE_SECRET_KEY=rk_live_… node scripts/preorder-report.mjs
 *   STRIPE_SECRET_KEY=rk_live_… node scripts/preorder-report.mjs --find "rodriguez"
 *
 * 1. Commandes pré-commande (metadata.flow=preorder_v2) payées : personnes uniques
 *    (email), bracelets, remboursées, commandes de test, commandes payées après la
 *    clôture du 31/10/2026.
 * 2. Contrôle avant étiquettes Boxtal, commande par commande : adresse complète,
 *    téléphone convertible au format international, point relais présent, zone
 *    expédiée à la main (CH / Outre-mer), déjà expédiée.
 * 3. --find <texte> : cherche un nom ou un email dans TOUTES les sessions payées du
 *    compte (tous flux, y compris le bracelet coach) — utile pour une commande
 *    arrivée hors boutique.
 *
 * Clé : une clé restreinte LIVE en LECTURE suffit (Checkout Sessions, Payment
 * Intents, Charges). La passer en variable d'environnement, jamais dans .env.local.
 */
import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY
if (!key) {
  console.error('STRIPE_SECRET_KEY manquante (à passer en variable d’environnement).')
  process.exit(1)
}
const findArg = process.argv.indexOf('--find')
const FIND = findArg !== -1 ? (process.argv[findArg + 1] ?? '').toLowerCase() : null

const PREORDER_END = new Date('2026-10-31T23:59:59+01:00').getTime() / 1000
// Commandes passées par l'équipe pour tester le parcours (à exclure du décompte).
const TEST_EMAILS = new Set(['julien@weareclimbers.fr', 'juliensalvadori8@gmail.com', 'contact@weareclimbers.fr'])

const stripe = new Stripe(key)
const mode = key.includes('_live_') ? 'LIVE' : 'TEST'

const toIntlPhone = (raw, country) => {
  const cc = { FR: '33', MC: '33', BE: '32', LU: '352', CH: '41' }[country] || '33'
  const p = (raw || '').replace(/[^\d+]/g, '')
  if (!p) return ''
  if (p.startsWith('+')) return p
  if (p.startsWith('00')) return '+' + p.slice(2)
  if (p.startsWith('0')) return '+' + cc + p.slice(1)
  return '+' + cc + p
}
const fmtDate = (ts) => new Date(ts * 1000).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
/** Metadata lisibles : sans les signaux techniques Meta (fb_*) ni l'URL signée d'étiquette. */
const readable = (meta) =>
  JSON.stringify(Object.fromEntries(Object.entries(meta ?? {}).filter(([k]) => !k.startsWith('fb_') && k !== 'boxtal_label_url')))
const eur = (cents) => `${(cents / 100).toFixed(2).replace('.', ',')} €`

const orders = []
const matches = []

for await (const session of stripe.checkout.sessions.list({
  limit: 100,
  status: 'complete',
  expand: ['data.payment_intent', 'data.payment_intent.latest_charge'],
})) {
  if (session.payment_status !== 'paid') continue
  const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
  const charge = pi && typeof pi.latest_charge === 'object' ? pi.latest_charge : null
  const email = (session.customer_details?.email ?? '').toLowerCase()
  const name = session.customer_details?.name ?? ''
  const ship = session.collected_information?.shipping_details ?? session.shipping_details ?? null

  if (FIND) {
    const haystack = [email, name, ship?.name, charge?.billing_details?.name, JSON.stringify(session.metadata)]
      .join(' ')
      .toLowerCase()
    if (haystack.includes(FIND)) matches.push({ session, pi, charge, ship })
  }

  if (session.metadata?.flow !== 'preorder_v2') continue

  let qty = 1
  try {
    const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
    qty = items.data.reduce((n, li) => n + (li.quantity ?? 1), 0) || 1
  } catch {
    /* défaut 1 */
  }

  const refundedCents = charge?.amount_refunded ?? 0
  const zone = session.metadata.zone
  const shipMode = session.metadata.shipping_mode
  const isRelay = shipMode === 'relais'
  const addr = isRelay
    ? { line1: session.metadata.relay_name, postal_code: session.metadata.relay_zip, city: session.metadata.relay_city, country: session.metadata.relay_country || 'FR' }
    : ship?.address ?? session.customer_details?.address ?? null
  const country = addr?.country ?? ''
  const phone = toIntlPhone(session.customer_details?.phone, country)

  const issues = []
  if (!addr?.line1 || !addr?.postal_code || !addr?.city || !addr?.country) issues.push('adresse incomplète')
  if (isRelay && !session.metadata.relay_point_code) issues.push('point relais manquant')
  if (!/^\+\d{9,15}$/.test(phone)) issues.push(`téléphone invalide (« ${session.customer_details?.phone ?? ''} »)`)
  if (zone === 'fr' && /^9[78]/.test(addr?.postal_code ?? '')) issues.push('CP Outre-mer en zone France')
  if (!isRelay && ship && session.customer_details?.name && ship.name && ship.name !== session.customer_details.name) {
    issues.push(`destinataire ≠ payeur (${ship.name})`)
  }

  orders.push({
    session,
    email,
    name: ship?.name ?? name,
    qty,
    amount: session.amount_total ?? 0,
    refunded: refundedCents > 0,
    fullyRefunded: !!charge?.refunded,
    refundedCents,
    test: TEST_EMAILS.has(email),
    late: session.created > PREORDER_END,
    zone,
    shipMode,
    addr,
    phone,
    manual: zone === 'ch' || zone === 'dom-tom' || (isRelay && zone !== 'fr'),
    shipped: pi?.metadata?.boxtal_order ?? null,
    creator: session.metadata.creator || '',
    offer: session.metadata.partner_offer || '',
    issues,
  })
}

// ── 1. Décompte ────────────────────────────────────────────────────────────
const valid = orders.filter((o) => !o.refunded && !o.test)
const byEmail = new Map()
for (const o of valid) byEmail.set(o.email, [...(byEmail.get(o.email) ?? []), o])

console.log(`\n═══ BILAN PRÉ-COMMANDES (${mode}) — ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })} ═══\n`)
console.log(`Sessions payées flow=preorder_v2 : ${orders.length}`)
console.log(`  − remboursées (totalement ou partiellement) : ${orders.filter((o) => o.refunded).length}`)
console.log(`  − commandes de test équipe (non remboursées) : ${orders.filter((o) => o.test && !o.refunded).length}`)
console.log(`\n▶ COMMANDES VALIDES : ${valid.length}`)
console.log(`▶ PERSONNES UNIQUES (email) : ${byEmail.size}`)
console.log(`▶ BRACELETS À EXPÉDIER : ${valid.reduce((n, o) => n + o.qty, 0)}`)
console.log(`▶ ENCAISSÉ (TTC, port inclus) : ${eur(valid.reduce((n, o) => n + o.amount, 0))}`)

const multi = [...byEmail.entries()].filter(([, list]) => list.length > 1)
if (multi.length) {
  console.log(`\nPersonnes avec plusieurs commandes : ${multi.length}`)
  for (const [email, list] of multi) console.log(`  - ${email} : ${list.length} commandes, ${list.reduce((n, o) => n + o.qty, 0)} bracelets`)
}
const late = valid.filter((o) => o.late)
if (late.length) {
  console.log(`\n⚠️ Payées APRÈS la clôture du 31/10 : ${late.length}`)
  for (const o of late) console.log(`  - ${fmtDate(o.session.created)} · ${o.email} · ${eur(o.amount)}`)
}

const count = (key) => {
  const m = new Map()
  for (const o of valid) m.set(o[key] || '—', (m.get(o[key] || '—') ?? 0) + o.qty)
  return [...m.entries()].map(([k, v]) => `${k} ${v}`).join(' · ')
}
console.log(`\nBracelets par zone : ${count('zone')}`)
console.log(`Bracelets par mode : ${count('shipMode')}`)
console.log(`Bracelets par créateur : ${count('creator')}`)
console.log(`Bracelets par offre partenaire : ${count('offer')}`)

// ── 2. Contrôle avant étiquettes ───────────────────────────────────────────
console.log(`\n═══ CONTRÔLE AVANT ÉTIQUETTES BOXTAL ═══\n`)
const shipped = valid.filter((o) => o.shipped)
const manual = valid.filter((o) => !o.shipped && o.manual)
const problems = valid.filter((o) => !o.shipped && !o.manual && o.issues.length)
const ready = valid.filter((o) => !o.shipped && !o.manual && !o.issues.length)
console.log(`Prêtes pour Boxtal : ${ready.length} commandes (${ready.reduce((n, o) => n + o.qty, 0)} bracelets, ${ready.filter((o) => o.qty >= 2).length} assurées car ≥ 2)`)
console.log(`Déjà expédiées : ${shipped.length}`)
console.log(`À expédier à la main (CH / Outre-mer) : ${manual.length}`)
for (const o of manual) console.log(`  - ${o.email} · ${o.zone}/${o.shipMode} · ${o.addr?.postal_code ?? ''} ${o.addr?.city ?? ''} (${o.addr?.country ?? ''}) · ${o.qty}×`)
console.log(`À corriger avant étiquettes : ${problems.length}`)
for (const o of problems) console.log(`  ❌ ${o.email} · ${o.zone}/${o.shipMode} · ${o.issues.join(' ; ')}`)

const partial = orders.filter((o) => o.refunded && !o.fullyRefunded)
if (partial.length) {
  console.log(`\n⚠️ Remboursements PARTIELS (exclus du décompte et de l'expédition — à vérifier) :`)
  for (const o of partial) console.log(`  - ${o.email} · ${eur(o.refundedCents)} remboursés sur ${eur(o.amount)}`)
}

// ── 3. Recherche ───────────────────────────────────────────────────────────
if (FIND) {
  console.log(`\n═══ RECHERCHE « ${FIND} » (toutes sessions payées, tous flux) : ${matches.length} ═══`)
  for (const { session, pi, charge, ship } of matches) {
    console.log(`\n• ${session.id} — ${fmtDate(session.created)} — ${eur(session.amount_total ?? 0)}`)
    console.log(`  Payeur : ${session.customer_details?.name ?? '—'} <${session.customer_details?.email ?? '—'}> ${session.customer_details?.phone ?? ''}`)
    console.log(`  Facturation : ${JSON.stringify(session.customer_details?.address ?? null)}`)
    console.log(`  Livraison : ${ship ? `${ship.name} ${JSON.stringify(ship.address)}` : '— (non collectée)'}`)
    console.log(`  Remboursé : ${charge?.amount_refunded ? eur(charge.amount_refunded) : 'non'}`)
    console.log(`  Metadata session : ${readable(session.metadata)}`)
    if (pi?.metadata && Object.keys(pi.metadata).length) console.log(`  Metadata paiement : ${readable(pi.metadata)}`)
  }
}
