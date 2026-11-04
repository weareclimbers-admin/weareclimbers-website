import Link from 'next/link'
import Image from 'next/image'
import { authorPath, type BlogAuthor } from '@/lib/blog/authors'

/** Bloc auteur en fin d'article. */
export default function AuthorBox({ author }: { author: BlogAuthor }) {
  return (
    <aside aria-label="À propos de l'auteur" className="flex gap-4 md:gap-5 items-center rounded-[20px] bg-secondary-beige-light p-5 md:p-6">
      <Image
        src={author.image.src}
        alt={author.image.alt}
        width={author.image.width}
        height={author.image.height}
        sizes="80px"
        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top shrink-0"
      />
      <div>
        <p className="text-xs uppercase tracking-[0.12em] font-medium mb-1">Écrit par</p>
        <p className="font-syne font-bold uppercase text-lg tracking-tight">
          <Link href={authorPath(author.slug)} className="underline underline-offset-2">
            {author.name}
          </Link>
        </p>
        <p className="font-roboto text-base leading-relaxed mt-1">{author.bio}</p>
      </div>
    </aside>
  )
}
