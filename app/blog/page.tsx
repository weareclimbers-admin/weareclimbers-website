import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ListHeader from '@/components/blog/ListHeader'
import CategoryNav from '@/components/blog/CategoryNav'
import PostGrid from '@/components/blog/PostGrid'
import JsonLd from '@/components/blog/JsonLd'
import { getPublishedPosts, getVisiblePosts } from '@/lib/blog/posts'
import { BLOG_DESCRIPTION, BLOG_DEFAULT_OG_IMAGE } from '@/lib/blog/config'
import { blogJsonLd, breadcrumbJsonLd, buildMetadata, type Crumb } from '@/lib/blog/seo'
import '@/components/blog/blog.css'

// Pas de pagination tant que le volume ne la justifie pas : toutes les cartes tiennent sur une page.

const crumbs: Crumb[] = [
  { name: 'Accueil', path: '/' },
  { name: 'Blog', path: '/blog' },
]

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Blog escalade : entraînement, récupération, blessures | WAC",
    description: BLOG_DESCRIPTION,
    path: '/blog',
    image: BLOG_DEFAULT_OG_IMAGE,
    // Une liste vide n'a rien à faire dans l'index
    indexable: getPublishedPosts().length > 0,
  })
}

export default function BlogIndexPage() {
  const posts = getVisiblePosts()
  return (
    <>
      <JsonLd data={blogJsonLd(getPublishedPosts())} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Header />
      <main className="blog-scope bg-primary-beige">
        <ListHeader crumbs={crumbs} title="Le blog" intro={BLOG_DESCRIPTION}>
          <CategoryNav />
        </ListHeader>
        <section aria-label="Articles" className="container-custom py-12 md:py-16">
          <PostGrid posts={posts} />
        </section>
      </main>
      <Footer />
    </>
  )
}
