import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/blog/Breadcrumbs'
import PostGrid from '@/components/blog/PostGrid'
import JsonLd from '@/components/blog/JsonLd'
import { BLOG_AUTHORS, authorPath, getAuthor } from '@/lib/blog/authors'
import { getPublishedPosts, getVisiblePosts } from '@/lib/blog/posts'
import { breadcrumbJsonLd, buildMetadata, personJsonLd, type Crumb } from '@/lib/blog/seo'
import '@/components/blog/blog.css'

export const dynamicParams = false

export function generateStaticParams() {
  return BLOG_AUTHORS.map((author) => ({ slug: author.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) return {}
  return buildMetadata({
    title: `${author.name} — auteur du blog | We Are Climbers`,
    description: `${author.bio} Retrouve ses articles sur l'escalade : entraînement, récupération, prévention des blessures et mesure.`,
    path: authorPath(slug),
    image: { url: author.image.src, alt: author.image.alt },
    // Comme le sitemap : indexée dès son premier article publié
    indexable: getPublishedPosts().some((p) => p.frontmatter.author === slug),
  })
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthor(slug)
  if (!author) notFound()

  const posts = getVisiblePosts().filter((p) => p.frontmatter.author === slug)
  const crumbs: Crumb[] = [
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: author.name, path: authorPath(slug) },
  ]

  return (
    <>
      <JsonLd data={personJsonLd(author)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Header />
      <main className="blog-scope bg-primary-beige">
        <section className="blog-dark bg-primary-green text-primary-beige pt-36 md:pt-40 pb-10 md:pb-14">
          <div className="container-custom">
            <Breadcrumbs crumbs={crumbs} tone="dark" />
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 md:gap-10">
              <Image
                src={author.image.src}
                alt={author.image.alt}
                width={author.image.width}
                height={author.image.height}
                preload
                sizes="(min-width: 768px) 192px, 128px"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover object-top shrink-0"
              />
              <div>
                <h1 className="text-4xl md:text-6xl leading-[0.95]">{author.name}</h1>
                <p className="font-roboto text-lg md:text-xl leading-relaxed mt-4 max-w-2xl opacity-90">{author.bio}</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="articles-auteur" className="container-custom py-12 md:py-16">
          <h2 id="articles-auteur" className="text-2xl md:text-3xl mb-8">
            Ses articles
          </h2>
          <PostGrid posts={posts} headingLevel="h3" />
        </section>
      </main>
      <Footer />
    </>
  )
}
