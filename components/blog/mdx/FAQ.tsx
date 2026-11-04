import type { ReactNode } from 'react'

/**
 * <FAQ>
 *   <Question q="La question ?">Réponse en **markdown**.</Question>
 * </FAQ>
 * Le titre de section s'écrit en markdown juste avant (« ## Questions fréquentes »)
 * pour figurer dans le sommaire.
 */
export function FAQ({ children }: { children: ReactNode }) {
  return <div className="blog-faq divide-y divide-primary-green/15 border-y border-primary-green/15">{children}</div>
}

export function Question({ q, children }: { q: string; children: ReactNode }) {
  if (typeof q !== 'string' || !q.trim()) {
    throw new Error('[blog] <Question> : l\'attribut q (la question) est obligatoire')
  }
  return (
    <details className="group py-1">
      <summary className="flex items-start justify-between gap-4 py-3 font-roboto font-medium text-[1.05em] leading-snug">
        <span>{q}</span>
        <span aria-hidden="true" className="blog-faq-icon text-2xl leading-none text-secondary-orange shrink-0">
          +
        </span>
      </summary>
      <div className="blog-stack pb-4">{children}</div>
    </details>
  )
}
