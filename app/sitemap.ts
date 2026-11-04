import { MetadataRoute } from 'next'
import { CGU, COOKIES_POLICY, LEGAL_NOTICES, PRIVACY_POLICY } from '@/lib/legal'
import { APP_PRIVACY_POLICY } from '@/lib/legal/appPrivacyPolicy'
import { BLOG_CATEGORIES } from '@/lib/blog/categories'
import { BLOG_AUTHORS, authorPath } from '@/lib/blog/authors'
import { categoryPath, getPublishedPosts, latestUpdate, postPath } from '@/lib/blog/posts'

/**
 * lastModified n'est renseigné que lorsqu'une vraie date de modification existe
 * (documents légaux versionnés, articles du blog). Pour les autres pages on l'omet :
 * une date de build identique partout n'apporte aucune information aux moteurs.
 * Les brouillons du blog ne figurent jamais ici.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.weareclimbers.fr'

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/histoire`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/le-bracelet`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/l-app`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nos-grimpeurs`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/boutique`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coachs`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: PRIVACY_POLICY.lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-app`,
      lastModified: APP_PRIVACY_POLICY.lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/supprimer-compte`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: CGU.lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: COOKIES_POLICY.lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: LEGAL_NOTICES.lastUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/engagements`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // ── Blog : index, catégories et pages auteur seulement s'ils ont au moins un article publié ──
  const posts = getPublishedPosts()
  const blog: MetadataRoute.Sitemap = []

  if (posts.length > 0) {
    blog.push({
      url: `${baseUrl}/blog`,
      lastModified: latestUpdate(posts),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  for (const category of BLOG_CATEGORIES) {
    const inCategory = posts.filter((p) => p.frontmatter.category === category.slug)
    if (inCategory.length === 0) continue
    blog.push({
      url: `${baseUrl}${categoryPath(category.slug)}`,
      lastModified: latestUpdate(inCategory),
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  for (const author of BLOG_AUTHORS) {
    const byAuthor = posts.filter((p) => p.frontmatter.author === author.slug)
    if (byAuthor.length === 0) continue
    blog.push({
      url: `${baseUrl}${authorPath(author.slug)}`,
      lastModified: latestUpdate(byAuthor),
      changeFrequency: 'monthly',
      priority: 0.4,
    })
  }

  for (const post of posts) {
    blog.push({
      url: `${baseUrl}${postPath(post.frontmatter.slug)}`,
      lastModified: post.frontmatter.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return [...pages, ...blog]
}
