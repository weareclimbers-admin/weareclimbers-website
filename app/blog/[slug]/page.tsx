import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/blog/Breadcrumbs'
import PostMeta from '@/components/blog/PostMeta'
import TableOfContents from '@/components/blog/TableOfContents'
import HealthNotice from '@/components/blog/HealthNotice'
import SourcesList, { SOURCES_HEADING_ID } from '@/components/blog/SourcesList'
import AuthorBox from '@/components/blog/AuthorBox'
import PostGrid from '@/components/blog/PostGrid'
import JsonLd from '@/components/blog/JsonLd'
import { getMdxComponents } from '@/components/blog/mdx'
import { categoryPath, getRelatedPosts, getVisiblePost, getVisiblePosts, postPath } from '@/lib/blog/posts'
import { authorPath } from '@/lib/blog/authors'
import { compilePostBody } from '@/lib/blog/mdx'
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, type Crumb } from '@/lib/blog/seo'
import '@/components/blog/blog.css'

// Seuls les articles visibles sur ce déploiement existent : en production, un brouillon renvoie une 404.
export const dynamicParams = false

export function generateStaticParams() {
  return getVisiblePosts().map((post) => ({ slug: post.frontmatter.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getVisiblePost(slug)
  if (!post) return {}
  const fm = post.frontmatter
  return buildMetadata({
    title: fm.seoTitle,
    description: fm.description,
    path: postPath(fm.slug),
    image: { url: fm.heroImage, alt: fm.heroAlt },
    indexable: !fm.draft,
    article: {
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt,
      section: post.category.name,
      authorUrl: authorPath(post.author.slug),
    },
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getVisiblePost(slug)
  if (!post) notFound()

  const fm = post.frontmatter
  const { Content, toc } = await compilePostBody(`${fm.slug}.mdx`, post.body)
  const tocEntries = [...toc, { id: SOURCES_HEADING_ID, text: 'Sources' }]
  const related = getRelatedPosts(post)

  const crumbs: Crumb[] = [
    { name: 'Accueil', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.category.name, path: categoryPath(post.category.slug) },
    { name: fm.title, path: postPath(fm.slug) },
  ]

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Header />
      <main className="blog-scope bg-primary-beige text-primary-green">
        <article>
          <header className="container-custom pt-36 md:pt-40 pb-8 md:pb-10">
            <div className="max-w-3xl">
              <Breadcrumbs crumbs={crumbs} />
              <div className="flex flex-wrap items-center gap-2 mt-6">
                <Link href={categoryPath(post.category.slug)} className="blog-chip hover:bg-secondary-beige-light">
                  {post.category.name}
                </Link>
                {fm.draft && (
                  <span className="blog-chip bg-primary-green text-primary-beige border-primary-green">
                    Brouillon — invisible en production
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl leading-[1.02] mt-4">{fm.title}</h1>
              <p className="font-roboto text-base mt-5">
                Par{' '}
                <Link href={authorPath(post.author.slug)} className="font-medium underline underline-offset-2">
                  {post.author.name}
                </Link>
              </p>
              <PostMeta
                publishedAt={fm.publishedAt}
                updatedAt={fm.updatedAt}
                readingMinutes={post.readingMinutes}
                className="mt-1 opacity-90"
              />
            </div>
          </header>

          <div className="container-custom">
            <div className="relative aspect-[16/9] max-w-5xl rounded-[20px] overflow-hidden bg-secondary-beige-light">
              <Image
                src={fm.heroImage}
                alt={fm.heroAlt}
                fill
                preload
                sizes="(min-width: 1088px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="container-custom py-10 md:py-14">
            <div className="lg:grid lg:grid-cols-[minmax(0,42rem)_15rem] lg:gap-16 xl:gap-24">
              <div className="min-w-0">
                {/* Sommaire mobile : replié pour laisser la lecture en premier */}
                <details className="lg:hidden mb-8 rounded-[14px] bg-secondary-beige-light px-5 py-4">
                  <summary className="cursor-pointer font-syne font-bold uppercase text-sm tracking-tight">
                    Sommaire
                  </summary>
                  <div className="mt-4">
                    <TableOfContents entries={tocEntries} id="sommaire-mobile" />
                  </div>
                </details>

                {post.category.healthNotice && (
                  <div className="mb-8 max-w-[42rem]">
                    <HealthNotice />
                  </div>
                )}

                <div className="blog-prose">
                  <Content components={getMdxComponents(fm.slug)} />
                </div>

                <div className="mt-14">
                  <SourcesList sources={fm.sources} />
                </div>

                <div className="mt-12 max-w-[42rem]">
                  <AuthorBox author={post.author} />
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <TableOfContents entries={tocEntries} id="sommaire-desktop" />
                </div>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section aria-labelledby="articles-lies" className="bg-secondary-beige-light/50 py-12 md:py-16">
            <div className="container-custom">
              <h2 id="articles-lies" className="text-2xl md:text-3xl mb-8">
                À lire aussi en {post.category.name}
              </h2>
              <PostGrid posts={related} headingLevel="h3" />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
