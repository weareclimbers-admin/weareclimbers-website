import type { Post } from '@/lib/blog/posts'
import PostCard from './PostCard'

export default function PostGrid({
  posts,
  emptyText = 'Les premiers articles arrivent bientôt.',
  headingLevel,
}: {
  posts: Post[]
  emptyText?: string
  headingLevel?: 'h2' | 'h3'
}) {
  if (posts.length === 0) {
    return <p className="font-roboto text-lg py-8">{emptyText}</p>
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.frontmatter.slug}>
          <PostCard post={post} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
