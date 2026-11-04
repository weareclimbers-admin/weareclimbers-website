import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import type { Crumb } from '@/lib/blog/seo'

/** Bandeau vert des pages de liste (blog, catégorie, auteur). */
export default function ListHeader({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[]
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <section className="blog-dark bg-primary-green text-primary-beige pt-36 md:pt-40 pb-10 md:pb-14">
      <div className="container-custom">
        <Breadcrumbs crumbs={crumbs} tone="dark" />
        <h1 className="text-4xl md:text-6xl mt-6 leading-[0.95]">{title}</h1>
        {intro && <p className="font-roboto text-lg md:text-xl leading-relaxed mt-5 max-w-2xl opacity-90">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
