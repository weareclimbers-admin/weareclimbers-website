/**
 * Nouvelle grille de frais de port pré-commande (actée par Julien le 12/10/2026) :
 * France offerte (point relais ET domicile), Belgique-Luxembourg et Suisse
 * 1,99 € TTC, Outre-mer 4,99 € TTC.
 *
 * Le montant d'un shipping rate Stripe est IMMUABLE → on en crée 5 nouveaux,
 * mêmes conventions que scripts/create-stripe-preorder-objects.mjs (TTC
 * inclusive, tax_code txcd_92010001, metadata.flow). Les anciens tarifs restent
 * actifs : la prod les utilise jusqu'au redéploiement avec les nouvelles env.
 * AUCUNE modification d'objet existant.
 *
 * TEST par défaut (clé rk_test_ de .env.local). LIVE : flag --live explicite,
 * clé rk_live_ passée en variable d'env STRIPE_SECRET_KEY (jamais .env.local).
 * Relançable : un tarif de cette grille déjà créé est réutilisé.
 * En sortie : les 5 lignes d'env à coller dans .env.local (TEST) / Vercel (LIVE).
 */
import Stripe from 'stripe'
import fs from 'node:fs'

const FLOW = 'preorder_v2'
const GRID = '2026-10'

function loadEnvKey() {
  if (process.env.STRIPE_SECRET_KEY) return process.env.STRIPE_SECRET_KEY
  const lines = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^STRIPE_SECRET_KEY=(.+)$/)
    if (m) return m[1].trim()
  }
  throw new Error('STRIPE_SECRET_KEY introuvable (.env.local)')
}

const LIVE = process.argv.includes('--live')
const key = loadEnvKey()
if (LIVE && !key.startsWith('rk_live_')) {
  throw new Error('--live exige une clé restreinte LIVE (rk_live_...) en variable d’env STRIPE_SECRET_KEY')
}
if (!LIVE && !key.startsWith('rk_test_')) {
  throw new Error('Sécurité : sans --live, ce script exige une clé restreinte TEST (rk_test_...).')
}
console.log(`Mode : ${LIVE ? '🔴 LIVE (compte réel)' : '🧪 TEST'}\n`)

const stripe = new Stripe(key)

const RATES = [
  { env: 'STRIPE_SHIPPING_RATE_FR', zone: 'fr', name: 'Livraison en point relais Chronopost', amount: 0 },
  { env: 'STRIPE_SHIPPING_RATE_FR_DOMICILE', zone: 'fr-domicile', name: 'Livraison à domicile', amount: 0 },
  { env: 'STRIPE_SHIPPING_RATE_BE_LU', zone: 'be-lu', name: 'Livraison Belgique & Luxembourg', amount: 199 },
  { env: 'STRIPE_SHIPPING_RATE_CH', zone: 'ch', name: 'Livraison Suisse', amount: 199 },
  { env: 'STRIPE_SHIPPING_RATE_DOM_TOM', zone: 'dom-tom', name: 'Livraison Outre-mer', amount: 499 },
]

const existing = await stripe.shippingRates.list({ active: true, limit: 100 }).autoPagingToArray({ limit: 1000 })
const out = []
for (const r of RATES) {
  let rate = existing.find(
    (s) => s.metadata?.flow === FLOW && s.metadata?.zone === r.zone && s.metadata?.grid === GRID,
  )
  if (rate) {
    console.log(`Tarif « ${r.name} » (grille ${GRID}) déjà existant, réutilisé : ${rate.id}`)
  } else {
    rate = await stripe.shippingRates.create({
      display_name: r.name,
      type: 'fixed_amount',
      fixed_amount: { amount: r.amount, currency: 'eur' },
      tax_behavior: 'inclusive',
      tax_code: 'txcd_92010001',
      metadata: { flow: FLOW, zone: r.zone, grid: GRID },
    })
    console.log(`✅ Tarif créé : ${rate.id} (${r.name}, ${r.amount / 100} € TTC)`)
  }
  if (rate.fixed_amount?.amount !== r.amount || rate.tax_behavior !== 'inclusive') {
    throw new Error(`Tarif ${rate.id} incohérent (montant ${rate.fixed_amount?.amount}, ${rate.tax_behavior})`)
  }
  out.push(`${r.env}=${rate.id}`)
}

console.log(`\n── Variables d'env à poser (${LIVE ? 'Vercel, Production' : '.env.local'}) ──`)
console.log(out.join('\n'))
