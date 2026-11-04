import Link from 'next/link'
import Image from 'next/image'
import { postPath, type Post } from '@/lib/blog/posts'
import PostMeta from './PostMeta'

/** Carte d'article : toute la carte est cliquable via le lien du titre (un seul arrêt clavier). */
export default function PostCard({ post, headingLevel = 'h2' }: { post: Post; headingLevel?: 'h2' | 'h3' }) {
  const fm = post.frontmatter
  const Heading = headingLevel
  return (
    <article className="group relative flex flex-col h-full rounded-[20px] overflow-hidden bg-secondary-beige-light/60 border border-primary-green/10 transition-shadow hover:shadow-lg focus-within:shadow-lg">
      <div className="relative aspect-[16/9] bg-secondary-beige-light">
        <Image
          src={fm.heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="blog-chip">{post.category.name}</span>
          {fm.draft && (
            <span className="blog-chip bg-primary-green text-primary-beige border-primary-green">Brouillon</span>
          )}
        </div>
        <Heading className="text-xl md:text-2xl leading-tight">
          <Link
            href={postPath(fm.slug)}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {fm.title}
          </Link>
        </Heading>
        <p className="font-roboto text-base leading-relaxed opacity-90 line-clamp-3">{fm.description}</p>
        <PostMeta publishedAt={fm.publishedAt} readingMinutes={post.readingMinutes} className="mt-auto pt-2 opacity-80" />
      </div>
    </article>
  )
}
