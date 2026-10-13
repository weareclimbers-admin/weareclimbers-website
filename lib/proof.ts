/**
 * Preuves sociales de la boutique — UNIQUEMENT des faits vérifiés.
 *
 * - Chiffres de l'app : vérifiés par Julien la semaine du 06/10/2026. À mettre
 *   à jour ici, à la main.
 * - Avis : copiés tels quels depuis les stores (pseudo, source, date). Ne jamais
 *   retoucher le texte d'un avis ; `excerpt` quand il a été raccourci.
 * - Ne jamais réutiliser lib/testimonials.ts (témoignages fictifs, code mort).
 *
 * Importable côté client (aucun import serveur).
 */

/** Grimpeurs équipés lors de la campagne Ulule (clôturée le 10/07/2026). */
export const ULULE_BUYERS = 102

export const APP_PROOF = {
  activeUsers: '+150',
  sessions: '750',
  /** Note de l'app sur l'App Store et Google Play (tous les avis à 5/5 au 13/10/2026). */
  storeRating: '5/5',
}

export interface StoreReview {
  author: string
  source: 'App Store' | 'Google Play'
  date: string
  /** true = avis raccourci → mention « Extrait ». */
  excerpt: boolean
  text: string
}

export const STORE_REVIEWS: StoreReview[] = [
  {
    author: 'Bouyakacha',
    source: 'App Store',
    date: '28 août 2026',
    excerpt: true,
    text: 'L’app permet une vraie analyse des sessions de grimpe et/ou de renforcement pour l’escalade en + du sommeil et de sa qualité.',
  },
  {
    author: 'Nathan L.',
    source: 'Google Play',
    date: '5 octobre 2026',
    excerpt: true,
    text: 'Permet d’avoir une meilleure visibilité sur les charges d’entraînement, l’état de forme général et autres paramètres.',
  },
  {
    author: 'Nico',
    source: 'Google Play',
    date: '16 septembre 2026',
    excerpt: false,
    text: 'Suivi des perfos au top, bonne application en perpétuelle évolution !',
  },
]
