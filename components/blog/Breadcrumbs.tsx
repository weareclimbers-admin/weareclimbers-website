import Link from 'next/link'
import type { Crumb } from '@/lib/blog/seo'

/** Fil d'Ariane visible ; le dernier élément est la page courante (non cliquable). */
export default function Breadcrumbs({ crumbs, tone = 'light' }: { crumbs: Crumb[]; tone?: 'light' | 'dark' }) {
  return (
    <nav aria-label="Fil d'Ariane" className={tone === 'dark' ? 'text-primary-beige' : 'text-primary-green'}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-roboto">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={`${crumb.name}-${i}`} className="flex items-center gap-2">
              {crumb.path && !isLast ? (
                <Link href={crumb.path} className="underline underline-offset-2 opacity-90">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'font-medium' : ''}>
                  {crumb.name}
                </span>
              )}
              {!isLast && <span aria-hidden="true" className="opacity-60">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
