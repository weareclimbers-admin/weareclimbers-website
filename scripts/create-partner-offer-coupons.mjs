/**
 * Création des coupons des offres partenaires (lib/offers.ts) — coupon SANS code
 * promo public : il ne s'applique que via /api/checkout, sur lien `?offre=`.
 * ID personnalisé, identique en test et en live → aucune variable d'env.
 *
 * TEST par défaut (garde rk_test_), live via --live explicite (annoncé à Julien
 * avant). Relançable : un coupon existant n'est jamais recréé ; Stripe ne permet
 * pas de modifier sa remise/plafond/date → en cas d'écart, le script le signale
 * (il faut alors supprimer le coupon au dashboard et relancer).
 *
 * ⚠️ Paramètres à garder alignés avec lib/offers.ts (un .mjs n'importe pas le
 * TS) — /api/checkout refuse de toute façon un coupon dont la remise ne colle
 * pas au prix affiché.
 *
 * Usage : node scripts/create-partner-offer-coupons.mjs [--live]
 */
import Stripe from 'stripe'
import fs from 'node:fs'

const FLOW = 'preorder_v2'
const SITE = 'https://www.weareclimbers.fr'

const OFFERS = [
  {
    slug: 'equipe-regionale-na',
    couponId: 'partenaire-equipe-regionale-na',
    name: 'Offre équipe régionale FFME NA', // affiché au checkout et sur la facture (40 car. max)
    amountOff: 4900, // 179 € → 130 € TTC (port en plus)
    maxRedemptions: 10,
    redeemBy: '2026-10-31T23:59:59+01:00', // = PREORDER_END_DATE
    utm: 'utm_source=ffme-na&utm_medium=partenariat&utm_campaign=precommande-v2&utm_content=equipe-regionale',
  },
]

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
  throw new Error('--live exige une clé restreinte LIVE (rk_live_...)')
}
if (!LIVE && !key.startsWith('rk_test_')) {
  throw new Error('Sécurité : clé restreinte TEST (rk_test_...) exigée. Pour le live : flag --live explicite.')
}
console.log(`Mode : ${LIVE ? '🔴 LIVE (compte réel)' : '🧪 TEST'}\n`)

const stripe = new Stripe(key)

// Produit de pré-commande (le coupon ne doit s'appliquer qu'à lui : compte
// Stripe partagé avec le SaaS coach).
const products = await stripe.products.list({ limit: 100, active: true })
const product = products.data.find((p) => p.metadata?.flow === FLOW)
if (!product) throw new Error(`Produit pré-commande (metadata.flow=${FLOW}) introuvable`)
console.log(`Produit pré-commande : ${product.id}`)

for (const o of OFFERS) {
  const redeemBy = Math.floor(Date.parse(o.redeemBy) / 1000)
  let coupon = null
  try {
    coupon = await stripe.coupons.retrieve(o.couponId, { expand: ['applies_to'] })
  } catch (err) {
    if (err?.code !== 'resource_missing') throw err
  }

  if (coupon) {
    const drift = [
      coupon.amount_off !== o.amountOff && `remise ${coupon.amount_off} ≠ ${o.amountOff}`,
      coupon.currency !== 'eur' && `devise ${coupon.currency}`,
      coupon.max_redemptions !== o.maxRedemptions && `plafond ${coupon.max_redemptions} ≠ ${o.maxRedemptions}`,
      coupon.redeem_by !== redeemBy && `fin ${coupon.redeem_by} ≠ ${redeemBy}`,
      !coupon.applies_to?.products?.includes(product.id) && 'applies_to sans le produit pré-commande',
    ].filter(Boolean)
    console.log(
      `Coupon ${o.couponId} déjà existant (${coupon.times_redeemed}/${coupon.max_redemptions} utilisés, ` +
        `valide : ${coupon.valid ? 'oui' : 'NON'})`,
    )
    if (drift.length) console.warn(`  ⚠️ Écart avec la config : ${drift.join(' · ')}`)
  } else {
    coupon = await stripe.coupons.create({
      id: o.couponId,
      name: o.name,
      amount_off: o.amountOff,
      currency: 'eur',
      duration: 'once',
      max_redemptions: o.maxRedemptions,
      redeem_by: redeemBy,
      applies_to: { products: [product.id] },
      metadata: { flow: FLOW, partner_offer: o.slug },
    })
    console.log(
      `✅ Coupon créé : ${coupon.id} (−${o.amountOff / 100} €, ${o.maxRedemptions} utilisations max, ` +
        `jusqu'au ${o.redeemBy})`,
    )
  }
  console.log(`   Lien : ${SITE}/boutique?offre=${o.slug}&${o.utm}\n`)
}
