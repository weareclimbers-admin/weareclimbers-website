export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

interface PostMetaProps {
  publishedAt: string
  updatedAt?: string
  readingMinutes: number
  className?: string
}

/** Dates de publication / mise à jour et temps de lecture. */
export default function PostMeta({ publishedAt, updatedAt, readingMinutes, className = '' }: PostMetaProps) {
  return (
    <p className={`text-sm font-roboto flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      <span>
        Publié le <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      </span>
      {updatedAt && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Mis à jour le <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
          </span>
        </>
      )}
      <span aria-hidden="true">·</span>
      <span>{readingMinutes} min de lecture</span>
    </p>
  )
}
