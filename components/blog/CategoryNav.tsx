import Link from 'next/link'
import { BLOG_CATEGORIES } from '@/lib/blog/categories'
import { categoryPath } from '@/lib/blog/posts'

/** Pastilles de catégories (sur fond vert). */
export default function CategoryNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Catégories du blog" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/blog"
            aria-current={current ? undefined : 'page'}
            className={`blog-chip ${current ? 'hover:bg-primary-beige/10' : 'bg-primary-beige text-primary-green border-primary-beige'}`}
          >
            Tous les articles
          </Link>
        </li>
        {BLOG_CATEGORIES.map((category) => {
          const active = category.slug === current
          return (
            <li key={category.slug}>
              <Link
                href={categoryPath(category.slug)}
                aria-current={active ? 'page' : undefined}
                className={`blog-chip ${active ? 'bg-primary-beige text-primary-green border-primary-beige' : 'hover:bg-primary-beige/10'}`}
              >
                {category.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
