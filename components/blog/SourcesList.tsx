import type { PostSource } from '@/lib/blog/posts'

export const SOURCES_HEADING_ID = 'sources'

/** Liste des sources de l'article (frontmatter « sources »). */
export default function SourcesList({ sources }: { sources: PostSource[] }) {
  return (
    <section aria-labelledby={SOURCES_HEADING_ID} className="blog-prose">
      <h2 id={SOURCES_HEADING_ID}>Sources</h2>
      <ol>
        {sources.map((source) => (
          <li key={source.url} className="break-words">
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
            <span className="sr-only"> (nouvel onglet)</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
