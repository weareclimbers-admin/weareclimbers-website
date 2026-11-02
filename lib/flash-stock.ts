import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { FETES_SALE, PREORDER_FLOW, PREORDER_PACK } from '@/lib/preorder'
import { saleCountingSince } from '@/lib/campaign'

/**
 * Stock des bracelets à prix réduit de la précommande des fêtes (FETES_SALE.flash).
 *
 * Source de vérité = les commandes RÉELLEMENT PAYÉES au prix réduit (sessions
 * Checkout payées, metadata price_tier=flash-159, non remboursées) — PAS le
 * compteur du coupon. Vécu en test le 02/11/2026 : Stripe compte une utilisation
 * du coupon dès qu'un paiement démarre avec redirection (Klarna, 3D Secure…) —
 * création du client + `customer.discount.created` — et ne la rend pas si le
 * client abandonne. Un coupon plafonné à 10 se viderait donc avec des paniers
 * abandonnés. Le coupon ne porte que la remise (sans plafond d'utilisations).
 *
 * Limite connue, acceptée : deux clients qui paient en même temps le dernier
 * bracelet peuvent tous deux l'obtenir (le plafond est vérifié à l'ouverture du
 * paiement, pas à l'encaissement).
 *
 * SERVEUR UNIQUEMENT (clé Stripe). Lu par /boutique (régénérée toutes les 5 min
 * et après chaque achat via le webhook) et revérifié par /api/checkout.
 */

export interface FlashStock {
  /** Bracelets encore disponibles au prix réduit (0 = épuisés). */
  left: number
  total: number
}

/**
 * Coupon cohérent avec le prix annoncé : remise fixe en euros, actif, et
 * price Stripe − remise = FETES_SALE.flash.priceTtc. Incohérent = erreur de
 * config, loggée : le prix réduit est alors coupé (le client paie le prix
 * standard affiché, jamais un montant inattendu).
 */
export function isFlashCouponCoherent(coupon: Stripe.Coupon, priceUnitAmount: number | null): boolean {
  const expected = Math.round(FETES_SALE.flash.priceTtc * 100)
  const coherent =
    coupon.valid &&
    coupon.amount_off !== null &&
    coupon.currency === 'eur' &&
    priceUnitAmount !== null &&
    priceUnitAmount - coupon.amount_off === expected
  if (!coherent) {
    console.error(
      `flash-stock: coupon ${coupon.id} inutilisable (valide ${coupon.valid}, remise ${coupon.amount_off} ` +
        `${coupon.currency}, price ${priceUnitAmount}) — attendu ${expected} centimes après remise`,
    )
  }
  return coherent
}

/** Bracelets payés au prix réduit depuis l'ouverture, remboursements exclus. */
export async function countFlashSold(stripe: Stripe): Promise<number> {
  let sold = 0
  for await (const session of stripe.checkout.sessions.list({
    created: { gte: saleCountingSince() },
    status: 'complete',
    limit: 100,
    expand: ['data.payment_intent.latest_charge'],
  })) {
    if (session.metadata?.flow !== PREORDER_FLOW || session.metadata?.price_tier !== 'flash-159') continue
    if (session.payment_status !== 'paid') continue
    const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null
    const charge = pi && typeof pi.latest_charge === 'object' ? pi.latest_charge : null
    if (charge?.refunded) continue // remboursé = bracelet remis en vente
    sold += 1 // 1 bracelet par commande au prix réduit
  }
  return sold
}

/**
 * Stock restant au prix réduit. null si Stripe n'est pas configuré ou injoignable :
 * la boutique affiche alors l'offre sans compteur (le checkout revérifie).
 */
export async function getFlashStock(): Promise<FlashStock | null> {
  const total = FETES_SALE.flash.units

  // Aperçu local / preview : stock simulé (ex. FLASH_STOCK_OVERRIDE=0 pour voir
  // l'état « épuisé »). Jamais en production.
  const override = process.env.FLASH_STOCK_OVERRIDE
  if (override !== undefined && process.env.VERCEL_ENV !== 'production') {
    const left = Number.parseInt(override, 10)
    if (Number.isInteger(left)) return { left: Math.max(0, left), total }
  }

  const priceId = process.env.STRIPE_PRICE_PREORDER
  if (!process.env.STRIPE_SECRET_KEY || !priceId) return null
  try {
    const stripe = getStripe()
    const [coupon, price, sold] = await Promise.all([
      stripe.coupons.retrieve(FETES_SALE.flash.couponId),
      stripe.prices.retrieve(priceId),
      countFlashSold(stripe),
    ])
    if (!isFlashCouponCoherent(coupon, price.unit_amount)) return { left: 0, total }
    return { left: Math.max(0, total - sold), total }
  } catch (err) {
    console.error('flash-stock: lecture du stock impossible', err)
    return null
  }
}

/** Prix TTC affiché pour une commande selon le stock (présentatif). */
export function displayedUnitPrice(stock: FlashStock | null): number | null {
  return stock && stock.left > 0 ? FETES_SALE.flash.priceTtc : PREORDER_PACK.priceTtc
}
