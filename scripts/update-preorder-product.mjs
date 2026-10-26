/**
 * Fiche du produit de pré-commande telle qu'affichée sur la page Stripe Checkout
 * (nom, description sous le nom, image) — réassurance demandée par Julien le
 * 26/10/2026 (16 sessions abandonnées sur 21 du 19 au 26/10).
 *
 * On MODIFIE le produit existant (repéré par metadata flow=preorder_v2) au lieu
 * de passer un `product_data` inline dans /api/checkout : un produit inline
 * aurait un nouvel ID à chaque session, et le coupon partenaire (applies_to =
 * ce produit) deviendrait inapplicable (« does not apply to anything in this
 * order », vérifié en test le 26/10). La price n'est PAS touchée.
 *
 * Affiche l'avant/après ; n'écrit qu'avec --go. Relançable (no-op si à jour).
 * TEST par défaut (garde rk_test_), live via --live explicite (annoncé à Julien).
 *
 * Usage : node scripts/update-preorder-product.mjs [--live] [--go]
 */
import Stripe from 'stripe'
import fs from 'node:fs'

const FLOW = 'preorder_v2'

const TARGET = {
  name: 'Bracelet Polar 360 + app WAC',
  // ⚠️ « France métropolitaine » : la description est vue par TOUTES les zones,
  // et l'Outre-mer paie 4,99 € de port. Date = PREORDER_PACK.estimatedDelivery.
  description:
    'Pré-commande · Livraison estimée la semaine du 16 novembre 2026 · Livraison offerte en France métropolitaine',
  // Visuel principal de la boutique (public/téléchargement (1).png), URL encodée.
  images: ['https://www.weareclimbers.fr/t%C3%A9l%C3%A9chargement%20%281%29.png'],
}

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
const GO = process.argv.includes('--go')
const key = loadEnvKey()
if (LIVE && !key.startsWith('rk_live_')) {
  throw new Error('--live exige une clé restreinte LIVE (rk_live_...)')
}
if (!LIVE && !key.startsWith('rk_test_')) {
  throw new Error('Sécurité : clé restreinte TEST (rk_test_...) exigée. Pour le live : flag --live explicite.')
}
console.log(`Mode : ${LIVE ? '🔴 LIVE (compte réel)' : '🧪 TEST'} · ${GO ? 'ÉCRITURE' : 'aperçu (ajouter --go pour écrire)'}\n`)

const stripe = new Stripe(key)

const products = await stripe.products.list({ limit: 100, active: true })
const matches = products.data.filter((p) => p.metadata?.flow === FLOW)
if (matches.length !== 1) {
  throw new Error(`Attendu 1 produit actif metadata.flow=${FLOW}, trouvé ${matches.length} — rien modifié.`)
}
const product = matches[0]

const changes = {}
if (product.name !== TARGET.name) changes.name = TARGET.name
if (product.description !== TARGET.description) changes.description = TARGET.description
if (JSON.stringify(product.images) !== JSON.stringify(TARGET.images)) changes.images = TARGET.images

console.log(`Produit ${product.id}`)
for (const field of ['name', 'description', 'images']) {
  const before = JSON.stringify(product[field])
  console.log(`  ${field.padEnd(11)} ${field in changes ? `${before}\n${' '.repeat(14)}→ ${JSON.stringify(changes[field])}` : `${before} (inchangé)`}`)
}

if (!Object.keys(changes).length) {
  console.log('\nDéjà à jour — rien à faire.')
} else if (!GO) {
  console.log('\nAperçu uniquement. Relancer avec --go pour appliquer.')
} else {
  await stripe.products.update(product.id, changes)
  console.log('\n✅ Produit mis à jour (la price et les paiements existants ne sont pas touchés).')
}
