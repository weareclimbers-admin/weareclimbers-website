import { HEALTH_NOTICE_TEXT } from '@/lib/blog/categories'

/** Encart automatique des catégories `healthNotice` (texte figé, ne pas reformuler). */
export default function HealthNotice() {
  return (
    <div role="note" className="rounded-[14px] border-l-4 border-secondary-orange bg-secondary-beige-light px-5 py-4">
      <p className="font-roboto text-base leading-relaxed">{HEALTH_NOTICE_TEXT}</p>
    </div>
  )
}
