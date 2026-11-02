import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { FETES_SALE, PREORDER_PACK } from '@/lib/preorder'

/**
 * Stock des bracelets à prix réduit de la précommande des fêtes (FETES_SALE.flash).
 *
 * La source de vérité est le coupon Stripe `FETES_SALE.flash.couponId` (−20 €,
 * max_redemptions = 10, redeem_by = clôture) : Stripe compte lui-même les
 * utilisations, on ne tient aucun compteur de notre côté.
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
 * Coupon utilisable pour la vente au prix réduit : actif, pas épuisé, et
 * cohérent avec le prix annoncé (price Stripe − remise = FETES_SALE.flash.priceTtc).
 * Un coupon incohérent est une erreur de config : loggée, et traitée comme épuisé
 * (le client paie alors le prix standard affiché, jamais un montant inattendu).
 */
export function flashStockFromCoupon(coupon: Stripe.Coupon, priceUnitAmount: number | null): FlashStock {
  const total = FETES_SALE.flash.units
  const expected = Math.round(FETES_SALE.flash.priceTtc * 100)
  const coherent =
    coupon.amount_off !== null &&
    coupon.currency === 'eur' &&
    priceUnitAmount !== null &&
    priceUnitAmount - coupon.amount_off === expected
  if (!coherent) {
    console.error(
      `flash-stock: coupon ${coupon.id} incohérent (remise ${coupon.amount_off} ${coupon.currency}, ` +
        `price ${priceUnitAmount}) — attendu ${expected} centimes après remise`,
    )
    return { left: 0, total }
  }
  if (!coupon.valid) return { left: 0, total }
  const cap = coupon.max_redemptions ?? total
  return { left: Math.max(0, Math.min(total, cap - coupon.times_redeemed)), total }
}

/**
 * Stock restant au prix réduit. null si Stripe n'est pas configuré ou injoignable,
 * ou si le coupon n'existe pas encore : la boutique affiche alors l'offre sans
 * compteur exact (le checkout, lui, refusera proprement).
 */
export async function getFlashStock(): Promise<FlashStock | null> {
  // Aperçu local / preview : stock simulé (ex. FLASH_STOCK_OVERRIDE=0 pour voir
  // l'état « épuisé »). Jamais en production.
  const override = process.env.FLASH_STOCK_OVERRIDE
  if (override !== undefined && process.env.VERCEL_ENV !== 'production') {
    const left = Number.parseInt(override, 10)
    if (Number.isInteger(left)) return { left: Math.max(0, left), total: FETES_SALE.flash.units }
  }

  const priceId = process.env.STRIPE_PRICE_PREORDER
  if (!process.env.STRIPE_SECRET_KEY || !priceId) return null
  try {
    const stripe = getStripe()
    const [coupon, price] = await Promise.all([
      stripe.coupons.retrieve(FETES_SALE.flash.couponId),
      stripe.prices.retrieve(priceId),
    ])
    return flashStockFromCoupon(coupon, price.unit_amount)
  } catch (err) {
    console.error('flash-stock: lecture du coupon impossible', err)
    return null
  }
}

/** Prix TTC affiché pour une commande selon le stock (présentatif). */
export function displayedUnitPrice(stock: FlashStock | null): number | null {
  return stock && stock.left > 0 ? FETES_SALE.flash.priceTtc : PREORDER_PACK.priceTtc
}
