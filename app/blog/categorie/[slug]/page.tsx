import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ListHeader from '@/components/blog/ListHeader'
import CategoryNav from '@/components/blog/CategoryNav'
import PostGrid from '@/components/blog/PostGrid'
import JsonLd from '@/components/blog/JsonLd'
import { BLOG_CATEGORIES, getCategory } from '@/lib/blog/categories'
import { categoryPath, getPublishedPosts, getVisiblePosts } from '@/lib/blog/posts'
import { BLOG_DEFAULT_OG_IMAGE } from '@/lib/blog/config'
import { breadcrumbJsonLd, buildMetadata, type Crumb } from '@/lib/blog/seo'
import '@/components/blog/blog.css'

export const dynamicParams = false

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ slug: category.slug }))
}

type Props = { params: Promise<{ slug: string }> }

function crumbsFor(name: string, slug: string): Crumb[] {
  return [
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name, path: categoryPath(slug) },
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return buildMetadata({
    title: `${category.name} en escalade | Blog WAC`,
    description: category.description,
    path: categoryPath(slug),
    image: BLOG_DEFAULT_OG_IMAGE,
    // Catégorie sans article publié : page mince, gardée hors index
    indexable: getPublishedPosts().some((p) => p.frontmatter.category === slug),
  })
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const posts = getVisiblePosts().filter((p) => p.frontmatter.category === slug)
  const crumbs = crumbsFor(category.name, slug)

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Header />
      <main className="blog-scope bg-primary-beige">
        <ListHeader crumbs={crumbs} title={category.name} intro={category.description}>
          <CategoryNav current={slug} />
        </ListHeader>
        <section aria-label={`Articles : ${category.name}`} className="container-custom py-12 md:py-16">
          <PostGrid posts={posts} emptyText="Pas encore d'article dans cette catégorie. Ça arrive." />
        </section>
      </main>
      <Footer />
    </>
  )
}
