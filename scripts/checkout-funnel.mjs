/**
 * Entonnoir de paiement des pré-commandes, vu de Stripe — LECTURE SEULE.
 *
 * Complète Umami : Umami ne voit que les visiteurs ayant accepté les cookies
 * analytics, alors que Stripe enregistre CHAQUE session de paiement ouverte
 * depuis la boutique (metadata flow=preorder_v2). On sait ainsi combien de
 * visiteurs arrivent sur la page de paiement, combien paient, combien
 * abandonnent (session expirée au bout de 24 h), par jour, par source et par
 * mode de livraison. Aucune donnée personnelle affichée.
 *
 *   node scripts/checkout-funnel.mjs                     → TEST (clé rk_test_ de .env.local)
 *   STRIPE_SECRET_KEY=rk_live_... node scripts/checkout-funnel.mjs --live
 *   … --since 2026-10-14                                 → période (défaut : ouverture du 01/10/2026)
 */
import Stripe from 'stripe'
import fs from 'node:fs'

const FLOW = 'preorder_v2'

function loadEnvKey() {
  if (process.env.STRIPE_SECRET_KEY) return process.env.STRIPE_SECRET_KEY
  const lines = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^STRIPE_SECRET_KEY=(.+)$/)
    if (m) return m[1].trim()
  }
  throw new Error('STRIPE_SECRET_KEY introuvable (.env.local)')
}

function argValue(name, fallback) {
  const i = process.argv.indexOf(name)
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

const LIVE = process.argv.includes('--live')
const key = loadEnvKey()
if (LIVE && !key.startsWith('rk_live_')) {
  throw new Error('--live exige une clé restreinte LIVE (rk_live_...) en variable d’env STRIPE_SECRET_KEY')
}
if (!LIVE && !key.startsWith('rk_test_')) {
  throw new Error('Sécurité : sans --live, ce script exige une clé restreinte TEST (rk_test_...).')
}

const since = argValue('--since', '2026-10-01')
const sinceTs = Math.floor(new Date(`${since}T00:00:00+02:00`).getTime() / 1000)
if (Number.isNaN(sinceTs)) throw new Error(`--since invalide : ${since} (format AAAA-MM-JJ)`)

console.log(`Mode : ${LIVE ? '🔴 LIVE (compte réel)' : '🧪 TEST'} · sessions de paiement depuis le ${since}\n`)

const stripe = new Stripe(key)
const sessions = (
  await stripe.checkout.sessions
    .list({ created: { gte: sinceTs }, limit: 100, expand: ['data.line_items'] })
    .autoPagingToArray({ limit: 10000 })
).filter((s) => s.metadata?.flow === FLOW)

/** payee | abandonnee | en-cours */
function outcome(s) {
  if (s.status === 'complete' && s.payment_status !== 'unpaid') return 'payee'
  if (s.status === 'expired') return 'abandonnee'
  return 'en-cours'
}

function bracelets(s) {
  return (s.line_items?.data ?? []).reduce((sum, item) => sum + (item.quantity ?? 0), 0)
}

function tally(groupKey) {
  const rows = new Map()
  for (const s of sessions) {
    const k = groupKey(s)
    const row = rows.get(k) ?? { creees: 0, payee: 0, abandonnee: 0, 'en-cours': 0 }
    row.creees++
    row[outcome(s)]++
    rows.set(k, row)
  }
  return rows
}

function pct(part, total) {
  return total ? `${Math.round((part / total) * 100)} %` : '—'
}

/** byVolume = false : garde l'ordre des clés (chronologique pour « Par jour »). */
function printTable(title, rows, byVolume = true) {
  console.log(`── ${title} ──`)
  const entries = [...rows.entries()]
  const sorted = byVolume ? entries.sort((a, b) => b[1].creees - a[1].creees) : entries.sort((a, b) => a[0].localeCompare(b[0]))
  for (const [k, r] of sorted) {
    const finished = r.payee + r.abandonnee
    console.log(
      `${String(k).padEnd(28)} ouvertes ${String(r.creees).padStart(4)} · payées ${String(r.payee).padStart(4)} · abandonnées ${String(r.abandonnee).padStart(4)} · en cours ${String(r['en-cours']).padStart(3)} · taux de paiement ${pct(r.payee, finished)}`,
    )
  }
  console.log('')
}

const total = { payee: 0, abandonnee: 0, 'en-cours': 0 }
let braceletsPayes = 0
for (const s of sessions) {
  total[outcome(s)]++
  if (outcome(s) === 'payee') braceletsPayes += bracelets(s)
}
const finished = total.payee + total.abandonnee

console.log('── Total ──')
console.log(`Pages de paiement ouvertes : ${sessions.length}`)
console.log(`Payées                     : ${total.payee} (${braceletsPayes} bracelets)`)
console.log(`Abandonnées (expirées)     : ${total.abandonnee}`)
console.log(`En cours (< 24 h)          : ${total['en-cours']}`)
console.log(`Taux de paiement           : ${pct(total.payee, finished)} des sessions terminées`)
console.log('(Les remboursements ne sont pas déduits.)\n')

const parisDay = (s) => new Date(s.created * 1000).toLocaleDateString('fr-CA', { timeZone: 'Europe/Paris' })
printTable('Par jour', tally(parisDay), false)
printTable('Par source (utm_source)', tally((s) => s.metadata?.utm_source || '(direct / inconnue)'))
printTable('Par campagne (utm_campaign)', tally((s) => s.metadata?.utm_campaign || '(aucune)'))
printTable('Par livraison (zone / mode)', tally((s) => `${s.metadata?.zone ?? '?'} / ${s.metadata?.shipping_mode ?? '?'}`))

// Port réellement facturé par zone / mode (grille du 12/10/2026 : France
// offerte, BE-LU et CH 1,99, Outre-mer 4,99). Une session France avec un port
// non nul = variable d'env de shipping rate restée sur un ancien tarif.
console.log('── Port facturé (zone / mode → montants) ──')
const ports = new Map()
for (const s of sessions) {
  const k = `${s.metadata?.zone ?? '?'} / ${s.metadata?.shipping_mode ?? '?'}`
  const amount = ((s.shipping_cost?.amount_total ?? 0) / 100).toFixed(2).replace('.', ',')
  const row = ports.get(k) ?? new Map()
  row.set(amount, (row.get(amount) ?? 0) + 1)
  ports.set(k, row)
}
for (const [k, row] of [...ports.entries()].sort()) {
  console.log(`${k.padEnd(28)} ${[...row.entries()].map(([a, n]) => `${a} € × ${n}`).join(' · ')}`)
}
const frCharged = sessions.filter((s) => s.metadata?.zone === 'fr' && (s.shipping_cost?.amount_total ?? 0) > 0)
console.log(
  frCharged.length
    ? `⚠️ ${frCharged.length} session(s) France avec port facturé : ${frCharged.map((s) => `${parisDay(s)} ${s.metadata?.shipping_mode} ${s.shipping_cost?.shipping_rate}`).join(', ')}`
    : '✅ Aucune session France avec port facturé.',
)
console.log('')
