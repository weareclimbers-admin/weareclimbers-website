/**
 * Revue de presse — source unique de vérité.
 *
 * Pour ajouter un article : pousser un objet `PressArticle` dans le tableau `PRESSE`.
 * Le plus récent en premier. Les composants `PressFeature` se mettent à jour automatiquement.
 *
 * Visuels attendus dans `public/images/presse/` :
 *   - logo du média
 *   - capture / coupure de l'article (optionnel, surtout pour la version "full")
 */

export interface PressArticle {
  /** Identifiant stable (slug) */
  id: string
  /** Nom du média */
  media: string
  /** URL publique de l'article */
  url: string
  /** Citation mise en exergue (1–2 phrases) */
  quote: string
  /** Date de parution affichée (ex. "8 juin 2026") */
  date: string
  /** Date ISO pour le tri / le SEO (ex. "2026-06-08") */
  dateISO: string
  /** Logo du média dans /public */
  logo: string
  /** Capture / coupure de l'article dans /public (optionnel) */
  image?: string
}

export const PRESSE: PressArticle[] = [
  {
    id: 'vertige-media-2026-06',
    media: 'Vertige Média',
    url: 'https://www.vertigemedia.fr/we-are-climbers-suivi-physiologique-escalade',
    quote:
      'Une progression durable ne se mesure pas uniquement au niveau maximum atteint un soir de grande forme.',
    date: '8 juin 2026',
    dateISO: '2026-06-08',
    logo: '/images/presse/vertige-media-logo.jpg',
    image: '/images/presse/article-vertige.jpg',
  },
]

/** Le dernier article paru (le premier du tableau). */
export const DERNIER_ARTICLE: PressArticle | undefined = PRESSE[0]
