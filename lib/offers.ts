/**
 * Offres partenaires de la boutique (tarif négocié + mois premium offerts),
 * activées UNIQUEMENT par un lien `?offre=<slug>` (capturé par UtmCapture).
 *
 * Principe acté avec Julien le 09/10/2026 — une seule clé, le lien :
 *   - le tarif vient d'un coupon Stripe SANS code promo public (impossible à
 *     saisir au paiement), appliqué côté serveur par /api/checkout et plafonné
 *     dans Stripe (max_redemptions + redeem_by) ;
 *   - le même lien déclenche les mois premium (metadata grant_premium_months,
 *     lue par la CF braceletPremiumGrant du repo coach — `creator` n'y est pas
 *     requis, vérifié le 09/10).
 * Les deux avantages arrivent donc ensemble ou pas du tout : un lien perdu se
 * voit au prix affiché (179 €), jamais un premium perdu en silence.
 *
 * 1 bracelet par commande sous offre : la remise est un montant fixe appliqué
 * une fois par commande, et le premium est rattaché à l'email du paiement →
 * chaque bénéficiaire passe sa propre commande.
 *
 * Ajouter un partenaire : une entrée ici + son coupon Stripe
 * (scripts/create-partner-offer-coupons.mjs — ID personnalisé, identique en
 * test et en live, donc aucune variable d'env).
 *
 * Importable côté client (affichage boutique). Le slug n'est pas un secret : le
 * plafond Stripe borne les abus, et seul le serveur applique le coupon après
 * avoir revérifié l'offre.
 */
import { PREORDER_END_DATE } from '@/lib/preorder'

/** Clé sessionStorage du `?offre=` capturé à l'atterrissage (UtmCapture). */
export const OFFER_STORAGE_KEY = 'wac_offer'

export interface PartnerOffer {
  /** Valeur du paramètre `?offre=` du lien partenaire (minuscules). */
  slug: string
  /** Nom du partenaire affiché sur la boutique. */
  label: string
  /** ID personnalisé du coupon Stripe (identique test/live). */
  couponId: string
  /**
   * Prix TTC affiché (€). Purement présentatif : /api/checkout refuse l'offre si
   * price Stripe − remise du coupon ≠ ce montant (le client paierait autre chose
   * que le prix annoncé).
   */
  priceTtc: number
  /** Mois d'abonnement premium offerts (metadata grant_premium_months). */
  grantPremiumMonths: number
  /** Fin de validité — le coupon Stripe porte le même redeem_by. */
  endDate: string
}

export const PARTNER_OFFERS: PartnerOffer[] = [
  {
    // Négocié avec la fédé Nouvelle-Aquitaine (09/10/2026) : grimpeurs de
    // l'équipe régionale, 10 places, port en plus, jusqu'à la fin des pré-commandes.
    slug: 'equipe-regionale-na',
    label: 'Équipe régionale FFME Nouvelle-Aquitaine',
    couponId: 'partenaire-equipe-regionale-na',
    priceTtc: 130,
    grantPremiumMonths: 3,
    endDate: PREORDER_END_DATE,
  },
]

/** Offre partenaire active pour ce slug, ou undefined (inconnue ou terminée). */
export function getPartnerOffer(slug: unknown): PartnerOffer | undefined {
  if (typeof slug !== 'string') return undefined
  const s = slug.trim().toLowerCase()
  return PARTNER_OFFERS.find((o) => o.slug === s && Date.now() <= Date.parse(o.endDate))
}
