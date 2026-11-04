/**
 * Catégories du blog — source unique.
 *
 * Ajouter / renommer une catégorie : modifier ce tableau. Le `slug` sert d'URL
 * (/blog/categorie/[slug]) et de valeur `category` dans le frontmatter des articles :
 * le changer casse les URL déjà indexées (prévoir alors une redirection dans next.config.js).
 *
 * `healthNotice: true` affiche automatiquement l'encart santé en tête des articles.
 */

export interface BlogCategory {
  slug: string
  name: string
  description: string
  healthNotice?: boolean
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'charge-entrainement',
    name: "Charge d'entraînement",
    description: "Doser l'effort en escalade : volume, intensité, fatigue accumulée et progression.",
  },
  {
    slug: 'recuperation',
    name: 'Récupération',
    description: 'Sommeil, repos entre les séances et signaux du corps pour mieux récupérer entre deux grimpes.',
  },
  {
    slug: 'blessures-prevention',
    name: 'Blessures & prévention',
    description: 'Comprendre les blessures fréquentes en escalade et les signaux qui invitent à lever le pied.',
    healthNotice: true,
  },
  {
    slug: 'mesure-materiel',
    name: 'Mesure & matériel',
    description: 'Capteurs, fréquence cardiaque et données : ce que la mesure apporte vraiment au grimpeur.',
  },
]

export const HEALTH_NOTICE_TEXT =
  "Ce contenu est informatif. Il ne remplace pas l'avis d'un professionnel de santé. En cas de douleur, consulte un professionnel."

export function getCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}
