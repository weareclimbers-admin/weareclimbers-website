/**
 * Réglages communs du blog.
 *
 * Visibilité des brouillons (draft: true) — fermée par défaut :
 *   - `next dev` en local                      → visibles
 *   - aperçus Vercel (VERCEL_ENV = 'preview')  → visibles, en noindex
 *   - production Vercel ou `next build` local  → 404, absents des listes, du sitemap et du RSS
 * BLOG_SHOW_DRAFTS=1 force l'affichage hors production (ex. `next build` local pour relire).
 */

export const SITE_URL = 'https://www.weareclimbers.fr'
export const SITE_NAME = 'We Are Climbers'

export const BLOG_TITLE = 'Le blog We Are Climbers'
export const BLOG_DESCRIPTION =
  "Charge d'entraînement, récupération, prévention des blessures, mesure : des articles pour comprendre ce que ton corps vit en escalade."

/** Image Open Graph des pages de liste (blog, catégories, auteur). */
export const BLOG_DEFAULT_OG_IMAGE = {
  url: '/hero-home.webp',
  alt: 'Un grimpeur au sommet d’un bloc, encouragé par ses amis',
}

const isVercelProduction = process.env.VERCEL_ENV === 'production'

export const showDrafts =
  !isVercelProduction &&
  (process.env.VERCEL_ENV === 'preview' ||
    process.env.NODE_ENV === 'development' ||
    process.env.BLOG_SHOW_DRAFTS === '1')

/** Seule la production Vercel est indexable : local et aperçus restent en noindex. */
export const isIndexableDeployment = isVercelProduction

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}
