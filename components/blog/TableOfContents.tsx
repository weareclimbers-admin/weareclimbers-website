import type { TocEntry } from '@/lib/blog/mdx'

/** Sommaire généré depuis les H2 de l'article. */
export default function TableOfContents({ entries, id }: { entries: TocEntry[]; id: string }) {
  if (entries.length === 0) return null
  return (
    <nav aria-labelledby={id}>
      <p id={id} className="font-syne font-bold uppercase text-sm tracking-tight mb-3">
        Sommaire
      </p>
      <ol className="space-y-2 border-l-2 border-secondary-orange pl-4">
        {entries.map((entry) => (
          <li key={entry.id} className="text-[0.95rem] leading-snug">
            <a href={`#${entry.id}`} className="hover:underline underline-offset-2">
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
