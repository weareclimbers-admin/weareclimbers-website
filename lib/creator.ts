/**
 * Détection du créateur UGC partenaire (3 mois d'abonnement premium offerts,
 * octroyés par les Cloud Functions Firebase via les metadata Stripe).
 *
 * Règle : le paramètre explicite `?creator=` gagne toujours ; sinon on ne
 * déduit un créateur des UTM QUE si le lien porte `utm_medium=ugc` (convention
 * liens créateurs figée le 20/08) — jamais depuis un utm_source nu, sinon tout
 * le trafic tagué de la campagne (utm_source=brevo, instagram…) déclencherait
 * l'offre premium.
 *
 * Importé par ShopLanding (affichage) ET /api/checkout (metadata) : une seule
 * source de vérité pour les deux.
 */

/** Clé sessionStorage du `?creator=` capturé à l'atterrissage (UtmCapture). */
export const CREATOR_STORAGE_KEY = 'wac_creator'

export interface CapturedUtm {
  utm_source?: unknown
  utm_medium?: unknown
  utm_campaign?: unknown
  utm_content?: unknown
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase().slice(0, 100) : ''
}

/** Renvoie le pseudo du créateur (minuscules), ou '' si l'achat n'en vient pas. */
export function detectCreator(creator: unknown, utm: CapturedUtm | null | undefined): string {
  const explicit = clean(creator)
  if (explicit) return explicit
  if (clean(utm?.utm_medium) !== 'ugc') return ''
  return clean(utm?.utm_content) || clean(utm?.utm_source)
}
