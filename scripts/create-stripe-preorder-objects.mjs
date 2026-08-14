/**
 * Création des objets Stripe du flux pré-commande V2 — MODE TEST uniquement
 * (garde-fou : refuse toute clé non rk_test_). Périmètre strict annoncé à Julien
 * le 14/08/2026 : 1 produit, 1 price 179 € TTC inclusive, 4 shipping rates,
 * 1 coupon −10 % + code promo. AUCUNE modification d'objet existant (les objets
 * coach/bracelet du compte partagé ne sont jamais touchés).
 *
 * Relançable sans risque : chaque objet est recherché (metadata.flow) avant
 * d'être créé. Usage : node scripts/create-stripe-preorder-objects.mjs
 * En sortie : les lignes d'env à coller dans .env.local / Vercel.
 */
import Stripe from 'stripe'
import fs from 'node:fs'

const FLOW = 'preorder_v2'
const PROMO_CODE = 'CORDEE10'
// Bracelet coach existant — lu UNIQUEMENT pour reprendre sa catégorie fiscale.
const EXISTING_BRACELET_PRODUCT = 'prod_UvyVq4JTmoSwvR'

function loadEnvKey() {
  if (process.env.STRIPE_SECRET_KEY) return process.env.STRIPE_SECRET_KEY
  const lines = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^STRIPE_SECRET_KEY=(.+)$/)
    if (m) return m[1].trim()
  }
  throw new Error('STRIPE_SECRET_KEY introuvable (.env.local)')
}

const key = loadEnvKey()
if (!key.startsWith('rk_test_')) {
  throw new Error(
    'Sécurité : ce script exige une clé restreinte TEST (rk_test_...). ' +
      'Le passage en live se fera explicitement, avec annonce préalable à Julien.',
  )
}

const stripe = new Stripe(key)
const out = []

// ── 1) Catégorie fiscale : miroir du bracelet existant ──────────────────────
let taxCode
try {
  const bracelet = await stripe.products.retrieve(EXISTING_BRACELET_PRODUCT)
  taxCode = typeof bracelet.tax_code === 'string' ? bracelet.tax_code : bracelet.tax_code?.id
  console.log(`Catégorie fiscale du bracelet existant : ${taxCode ?? '(aucune — défaut du compte)'}`)
} catch (err) {
  console.warn(`⚠️ Lecture du produit bracelet impossible (${err.message}) — tax_code par défaut du compte.`)
}

// ── 2) Produit ──────────────────────────────────────────────────────────────
const products = await stripe.products.list({ limit: 100, active: true })
let product = products.data.find((p) => p.metadata?.flow === FLOW)
if (product) {
  console.log(`Produit déjà existant, réutilisé : ${product.id}`)
} else {
  product = await stripe.products.create({
    name: 'Pré-commande — Bracelet Polar 360 + App WAC',
    description:
      "Bracelet Polar 360 haute précision (±1 BPM) + app WAC. Pré-commande — expédition estimée : novembre 2026.",
    shippable: true,
    ...(taxCode ? { tax_code: taxCode } : {}),
    metadata: { flow: FLOW },
  })
  console.log(`✅ Produit créé : ${product.id}`)
}

// ── 3) Price 179,00 € TTC (inclusive — convention du compte, IMMUABLE) ──────
const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 })
let price = prices.data.find((p) => p.unit_amount === 17900 && p.currency === 'eur')
if (price) {
  console.log(`Price déjà existante, réutilisée : ${price.id}`)
} else {
  price = await stripe.prices.create({
    product: product.id,
    currency: 'eur',
    unit_amount: 17900,
    tax_behavior: 'inclusive',
    metadata: { flow: FLOW },
  })
  console.log(`✅ Price créée : ${price.id}`)
}
// Vérification post-création OBLIGATOIRE (incident « Pro Early » : tax_behavior immuable)
const checkPrice = await stripe.prices.retrieve(price.id)
if (checkPrice.tax_behavior !== 'inclusive') {
  throw new Error(
    `❌ Price ${price.id} : tax_behavior "${checkPrice.tax_behavior}" au lieu de "inclusive" — ` +
      'NE PAS UTILISER, à archiver et recréer.',
  )
}
console.log(`   Vérifié : tax_behavior=inclusive ✓ (${checkPrice.unit_amount / 100} € TTC)`)
out.push(`STRIPE_PRICE_PREORDER=${price.id}`)

// ── 4) Shipping rates (TTC, le port suit la TVA du bien : txcd_92010001) ────
const RATES = [
  { env: 'STRIPE_SHIPPING_RATE_FR', zone: 'fr', name: 'Livraison France métropolitaine', amount: 499 },
  { env: 'STRIPE_SHIPPING_RATE_FR_DOMICILE', zone: 'fr-domicile', name: 'Livraison France à domicile', amount: 599 },
  { env: 'STRIPE_SHIPPING_RATE_BE_LU', zone: 'be-lu', name: 'Livraison Belgique & Luxembourg', amount: 699 },
  { env: 'STRIPE_SHIPPING_RATE_CH', zone: 'ch', name: 'Livraison Suisse', amount: 699 },
  { env: 'STRIPE_SHIPPING_RATE_DOM_TOM', zone: 'dom-tom', name: 'Livraison Outre-mer', amount: 999 },
]
const existingRates = await stripe.shippingRates.list({ active: true, limit: 100 })
for (const r of RATES) {
  let rate = existingRates.data.find((s) => s.metadata?.flow === FLOW && s.metadata?.zone === r.zone)
  if (rate) {
    console.log(`Shipping rate « ${r.name} » déjà existant, réutilisé : ${rate.id}`)
  } else {
    rate = await stripe.shippingRates.create({
      display_name: r.name,
      type: 'fixed_amount',
      fixed_amount: { amount: r.amount, currency: 'eur' },
      tax_behavior: 'inclusive',
      tax_code: 'txcd_92010001',
      metadata: { flow: FLOW, zone: r.zone },
    })
    console.log(`✅ Shipping rate créé : ${rate.id} (${r.name}, ${r.amount / 100} € TTC)`)
  }
  out.push(`${r.env}=${rate.id}`)
}

// ── 5) Coupon −10 % + code promo liste d'attente ────────────────────────────
const coupons = await stripe.coupons.list({ limit: 100 })
let coupon = coupons.data.find((c) => c.metadata?.flow === FLOW)
if (coupon) {
  console.log(`Coupon déjà existant, réutilisé : ${coupon.id}`)
} else {
  coupon = await stripe.coupons.create({
    percent_off: 10,
    duration: 'once',
    name: "Liste d'attente −10 %",
    metadata: { flow: FLOW },
  })
  console.log(`✅ Coupon créé : ${coupon.id} (−10 %)`)
}

const promoCodes = await stripe.promotionCodes.list({ code: PROMO_CODE, limit: 10 })
let promo = promoCodes.data.find((p) => p.active)
if (promo) {
  console.log(`Code promo ${PROMO_CODE} déjà existant, réutilisé : ${promo.id}`)
} else {
  promo = await stripe.promotionCodes.create({
    promotion: { type: 'coupon', coupon: coupon.id },
    code: PROMO_CODE,
    metadata: { flow: FLOW },
  })
  console.log(`✅ Code promo créé : ${PROMO_CODE} (${promo.id})`)
}

console.log('\n──────── Lignes à coller dans .env.local (et Vercel au moment voulu) ────────')
for (const line of out) console.log(line)
