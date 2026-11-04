import { getPublishedPosts, latestUpdate, postPath } from '@/lib/blog/posts'
import { BLOG_DESCRIPTION, BLOG_TITLE, absoluteUrl } from '@/lib/blog/config'

// Flux RSS 2.0 : articles publiés uniquement (jamais les brouillons, quel que soit l'environnement).
export const dynamic = 'force-static'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(isoDate: string): string {
  return new Date(`${isoDate}T08:00:00Z`).toUTCString()
}

export function GET() {
  const posts = getPublishedPosts()
  const lastUpdate = latestUpdate(posts)

  const items = posts
    .map((post) => {
      const fm = post.frontmatter
      const url = absoluteUrl(postPath(fm.slug))
      return `    <item>
      <title>${escapeXml(fm.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(fm.publishedAt)}</pubDate>
      <dc:creator>${escapeXml(post.author.name)}</dc:creator>
      <category>${escapeXml(post.category.name)}</category>
      <description>${escapeXml(fm.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(BLOG_TITLE)}</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>fr-FR</language>
    <atom:link href="${absoluteUrl('/blog/rss.xml')}" rel="self" type="application/rss+xml" />${
      lastUpdate ? `\n    <lastBuildDate>${rfc822(lastUpdate)}</lastBuildDate>` : ''
    }
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
