/**
 * Auteurs du blog. La bio est volontairement sobre : n'y ajouter ni titre,
 * ni diplôme, ni chiffre sans validation explicite de la personne concernée.
 */

export interface BlogAuthor {
  slug: string
  name: string
  bio: string
  image: { src: string; width: number; height: number; alt: string }
}

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    slug: 'julien-salvadori',
    name: 'Julien Salvadori',
    bio: 'Ingénieur et grimpeur, fondateur de We Are Climbers.',
    image: {
      src: '/images/blog/auteurs/julien-salvadori.webp',
      width: 640,
      height: 800,
      alt: 'Julien Salvadori dans une salle de bloc',
    },
  },
]

export function getAuthor(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug)
}

export function authorPath(slug: string): string {
  return `/auteurs/${slug}`
}
