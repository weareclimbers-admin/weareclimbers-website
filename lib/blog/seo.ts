/**
 * Métadonnées (title, description, canonical, Open Graph, Twitter Card)
 * et données structurées JSON-LD des pages du blog.
 */

import type { Metadata } from 'next'
import {
  SITE_NAME,
  SITE_URL,
  BLOG_TITLE,
  BLOG_DESCRIPTION,
  isIndexableDeployment,
  absoluteUrl,
} from './config'
import { authorPath, type BlogAuthor } from './authors'
import { postPath, type Post } from './posts'

interface PageMetadataInput {
  title: string
  description: string
  path: string
  image: { url: string; alt: string }
  /** false pour forcer le noindex (brouillon, liste vide) */
  indexable?: boolean
  article?: { publishedTime: string; modifiedTime: string; section: string; authorUrl: string }
}

export function buildMetadata({ title, description, path, image, indexable = true, article }: PageMetadataInput): Metadata {
  const index = isIndexableDeployment && indexable
  const images = [{ url: image.url, alt: image.alt }]
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      types: { 'application/rss+xml': [{ url: '/blog/rss.xml', title: BLOG_TITLE }] },
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: article ? 'article' : 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        section: article.section,
        authors: [absoluteUrl(article.authorUrl)],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@weareclimbers',
      title,
      description,
      images: [image.url],
    },
  }
}

// ── JSON-LD ──

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-green.png` },
}

function personRef(author: BlogAuthor) {
  return { '@type': 'Person', name: author.name, url: absoluteUrl(authorPath(author.slug)) }
}

export interface Crumb {
  name: string
  path?: string
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.path && { item: absoluteUrl(crumb.path) }),
    })),
  }
}

export function articleJsonLd(post: Post) {
  const fm = post.frontmatter
  const url = absoluteUrl(postPath(fm.slug))
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.title,
    description: fm.description,
    image: [absoluteUrl(fm.heroImage)],
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt,
    inLanguage: 'fr-FR',
    articleSection: post.category.name,
    author: [personRef(post.author)],
    publisher,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    citation: fm.sources.map((s) => ({ '@type': 'CreativeWork', name: s.title, url: s.url })),
  }
}

export function blogJsonLd(posts: Post[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: absoluteUrl('/blog'),
    inLanguage: 'fr-FR',
    publisher,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.frontmatter.title,
      url: absoluteUrl(postPath(p.frontmatter.slug)),
      datePublished: p.frontmatter.publishedAt,
      dateModified: p.frontmatter.updatedAt,
      author: personRef(p.author),
    })),
  }
}

export function personJsonLd(author: BlogAuthor) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: absoluteUrl(authorPath(author.slug)),
    image: absoluteUrl(author.image.src),
    description: author.bio,
    worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }
}
