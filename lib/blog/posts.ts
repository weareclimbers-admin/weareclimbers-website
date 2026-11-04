/**
 * Articles du blog : content/blog/[slug].mdx (côté serveur uniquement).
 *
 * Le frontmatter est validé à chaque lecture : un champ manquant ou invalide
 * fait échouer `next build` avec un message qui nomme le fichier et le champ.
 */

import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'
import { BLOG_CATEGORIES, getCategory, type BlogCategory } from './categories'
import { BLOG_AUTHORS, getAuthor, type BlogAuthor } from './authors'
import { showDrafts } from './config'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')
const PUBLIC_DIR = path.join(process.cwd(), 'public')

/** Les vérifications sur disque (images dans public/) ne tournent qu'au build et en dev :
 *  public/ n'est pas embarqué dans les fonctions qui régénèrent les pages (ISR). */
const canCheckPublicFiles =
  process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'development'

export interface PostSource {
  title: string
  url: string
}

export interface PostFrontmatter {
  title: string
  seoTitle: string
  description: string
  slug: string
  category: string
  author: string
  publishedAt: string
  updatedAt: string
  heroImage: string
  heroAlt: string
  draft: boolean
  sources: PostSource[]
}

export interface Post {
  frontmatter: PostFrontmatter
  category: BlogCategory
  author: BlogAuthor
  /** Corps MDX, sans le frontmatter */
  body: string
  readingMinutes: number
}

const REQUIRED_FIELDS: (keyof PostFrontmatter)[] = [
  'title',
  'seoTitle',
  'description',
  'slug',
  'category',
  'author',
  'publishedAt',
  'updatedAt',
  'heroImage',
  'heroAlt',
  'draft',
  'sources',
]

const RESERVED_SLUGS = ['categorie', 'rss', 'page']

class FrontmatterError extends Error {
  constructor(file: string, message: string) {
    super(`[blog] content/blog/${file} : ${message}`)
    this.name = 'FrontmatterError'
  }
}

function splitFrontmatter(file: string, raw: string): { data: unknown; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    throw new FrontmatterError(file, 'frontmatter absent (le fichier doit commencer par un bloc --- ... ---)')
  }
  try {
    return { data: parseYaml(match[1]), body: match[2] }
  } catch (err) {
    throw new FrontmatterError(file, `frontmatter YAML illisible — ${(err as Error).message}`)
  }
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const d = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value
}

function validateFrontmatter(file: string, data: unknown): PostFrontmatter {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new FrontmatterError(file, 'le frontmatter doit être un objet YAML')
  }
  const fm = data as Record<string, unknown>

  const missing = REQUIRED_FIELDS.filter((key) => fm[key] === undefined || fm[key] === null || fm[key] === '')
  if (missing.length > 0) {
    throw new FrontmatterError(file, `champ(s) manquant(s) : ${missing.join(', ')}`)
  }

  const strings: (keyof PostFrontmatter)[] = [
    'title', 'seoTitle', 'description', 'slug', 'category', 'author', 'heroImage', 'heroAlt',
  ]
  for (const key of strings) {
    if (typeof fm[key] !== 'string' || !(fm[key] as string).trim()) {
      throw new FrontmatterError(file, `« ${key} » doit être un texte non vide`)
    }
  }

  const expectedSlug = file.replace(/\.mdx$/, '')
  if (fm.slug !== expectedSlug) {
    throw new FrontmatterError(file, `« slug » vaut "${fm.slug}" mais le fichier s'appelle ${file} (attendu : "${expectedSlug}")`)
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug as string)) {
    throw new FrontmatterError(file, '« slug » : minuscules, chiffres et tirets uniquement (sans accent)')
  }
  if (RESERVED_SLUGS.includes(fm.slug as string)) {
    throw new FrontmatterError(file, `« slug » réservé par une route du blog : ${RESERVED_SLUGS.join(', ')}`)
  }

  if (!getCategory(fm.category as string)) {
    throw new FrontmatterError(
      file,
      `« category » inconnue : "${fm.category}". Valeurs possibles : ${BLOG_CATEGORIES.map((c) => c.slug).join(', ')} (lib/blog/categories.ts)`,
    )
  }
  if (!getAuthor(fm.author as string)) {
    throw new FrontmatterError(
      file,
      `« author » inconnu : "${fm.author}". Valeurs possibles : ${BLOG_AUTHORS.map((a) => a.slug).join(', ')} (lib/blog/authors.ts)`,
    )
  }

  for (const key of ['publishedAt', 'updatedAt'] as const) {
    if (!isIsoDate(fm[key])) {
      throw new FrontmatterError(file, `« ${key} » doit être une date AAAA-MM-JJ, entre guillemets (reçu : ${JSON.stringify(fm[key])})`)
    }
  }
  if ((fm.updatedAt as string) < (fm.publishedAt as string)) {
    throw new FrontmatterError(file, '« updatedAt » ne peut pas précéder « publishedAt »')
  }

  if (typeof fm.draft !== 'boolean') {
    throw new FrontmatterError(file, '« draft » doit valoir true ou false')
  }

  const heroImage = fm.heroImage as string
  if (!heroImage.startsWith('/') || !heroImage.toLowerCase().endsWith('.webp')) {
    throw new FrontmatterError(file, `« heroImage » doit être un chemin absolu vers un fichier .webp de public/ (reçu : "${heroImage}")`)
  }
  if (canCheckPublicFiles && !fs.existsSync(path.join(PUBLIC_DIR, heroImage))) {
    throw new FrontmatterError(file, `« heroImage » introuvable : public${heroImage}`)
  }

  if (!Array.isArray(fm.sources) || fm.sources.length === 0) {
    throw new FrontmatterError(file, '« sources » doit être une liste d\'au moins une source { title, url }')
  }
  const sources = fm.sources.map((source, i) => {
    const s = source as Record<string, unknown>
    if (!s || typeof s.title !== 'string' || !s.title.trim()) {
      throw new FrontmatterError(file, `« sources[${i}].title » manquant`)
    }
    if (typeof s.url !== 'string' || !/^https?:\/\/\S+$/.test(s.url)) {
      throw new FrontmatterError(file, `« sources[${i}].url » doit être une URL http(s) complète`)
    }
    return { title: s.title.trim(), url: s.url }
  })

  const seoTitle = (fm.seoTitle as string).trim()
  const description = (fm.description as string).trim()
  if (seoTitle.length > 60) {
    console.warn(`[blog] content/blog/${file} : « seoTitle » fait ${seoTitle.length} caractères (60 max conseillés)`)
  }
  if (description.length < 70 || description.length > 160) {
    console.warn(`[blog] content/blog/${file} : « description » fait ${description.length} caractères (70 à 160 conseillés)`)
  }

  return {
    title: (fm.title as string).trim(),
    seoTitle,
    description,
    slug: fm.slug as string,
    category: fm.category as string,
    author: fm.author as string,
    publishedAt: fm.publishedAt as string,
    updatedAt: fm.updatedAt as string,
    heroImage,
    heroAlt: (fm.heroAlt as string).trim(),
    draft: fm.draft,
    sources,
  }
}

function readingMinutes(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`[\]()!-]/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

function loadPost(file: string): Post {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
  const { data, body } = splitFrontmatter(file, raw)
  const frontmatter = validateFrontmatter(file, data)
  return {
    frontmatter,
    category: getCategory(frontmatter.category)!,
    author: getAuthor(frontmatter.author)!,
    body,
    readingMinutes: readingMinutes(body),
  }
}

function byNewest(a: Post, b: Post): number {
  return b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt) ||
    a.frontmatter.title.localeCompare(b.frontmatter.title, 'fr')
}

/** Tous les articles, brouillons compris, validés. */
export function getAllPostsIncludingDrafts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map(loadPost)
    .sort(byNewest)
}

/** Articles affichables sur ce déploiement (brouillons inclus hors production). */
export function getVisiblePosts(): Post[] {
  return getAllPostsIncludingDrafts().filter((p) => showDrafts || !p.frontmatter.draft)
}

/** Articles publiés uniquement : sitemap, RSS, données structurées. */
export function getPublishedPosts(): Post[] {
  return getAllPostsIncludingDrafts().filter((p) => !p.frontmatter.draft)
}

export function getVisiblePost(slug: string): Post | undefined {
  return getVisiblePosts().find((p) => p.frontmatter.slug === slug)
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getVisiblePosts()
    .filter((p) => p.frontmatter.category === post.frontmatter.category && p.frontmatter.slug !== post.frontmatter.slug)
    .slice(0, limit)
}

export function postPath(slug: string): string {
  return `/blog/${slug}`
}

export function categoryPath(slug: string): string {
  return `/blog/categorie/${slug}`
}

/** Date de modification la plus récente d'une liste d'articles (AAAA-MM-JJ), ou undefined. */
export function latestUpdate(posts: Post[]): string | undefined {
  return posts.map((p) => p.frontmatter.updatedAt).sort().at(-1)
}
