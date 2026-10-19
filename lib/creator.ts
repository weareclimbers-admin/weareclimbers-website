/**
 * Détection du créateur UGC partenaire (3 mois d'abonnement premium offerts,
 * octroyés par les Cloud Functions Firebase via les metadata Stripe).
 *
 * Règle (resserrée le 19/10/2026) : SEUL le paramètre explicite `?creator=`
 * donne droit aux 3 mois — les 3 mois sont réservés aux liens créateurs.
 * L'ancien repli sur `utm_medium=ugc` est supprimé : n'importe quel lien tagué
 * « ugc » (une pub Meta réutilisant un contenu créateur, par exemple) affichait
 * le bandeau et accordait réellement les 3 mois. Tous les liens créateurs
 * fournis depuis le 21/08 portent `&creator=`. Les UTM restent de la pure
 * attribution (metadata utm_*), sans effet sur l'offre.
 *
 * Importé par ShopLanding (affichage) ET /api/checkout (metadata) : une seule
 * source de vérité pour les deux. Le `?creator=` est capturé à l'atterrissage
 * en cookie 30 jours (lib/attribution.ts).
 */

export interface CapturedUtm {
  utm_source?: unknown
  utm_medium?: unknown
  utm_campaign?: unknown
  utm_content?: unknown
  utm_term?: unknown
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase().slice(0, 100) : ''
}

/** Renvoie le pseudo du créateur (minuscules), ou '' si l'achat ne vient pas d'un lien créateur. */
export function detectCreator(creator: unknown): string {
  return clean(creator)
}
