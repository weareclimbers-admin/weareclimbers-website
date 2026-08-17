import Stripe from 'stripe'

/**
 * Client Stripe côté serveur — flux pré-commandes V2 du site UNIQUEMENT.
 *
 * ⚠️ Le compte Stripe est PARTAGÉ avec le SaaS coach et le flux bracelet
 * (Cloud Functions Firebase, projet weareclimbers-prod). La clé utilisée ici
 * doit être la clé RESTREINTE dédiée au website (Checkout Sessions write +
 * Products/Prices read) — JAMAIS la clé secrète complète des CF coach,
 * jamais en NEXT_PUBLIC_*, jamais commitée.
 *
 * Init paresseuse : le build ne doit pas exiger la variable d'env
 * (elle ne vit que dans Vercel + .env.local).
 */
let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY manquante (clé restreinte website — voir .env.example)')
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key)
  }
  return stripeClient
}
