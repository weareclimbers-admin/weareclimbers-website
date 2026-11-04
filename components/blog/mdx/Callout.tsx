import type { ReactNode } from 'react'

const VARIANTS = {
  info: { label: 'À retenir', className: 'border-primary-green' },
  astuce: { label: 'Astuce', className: 'border-primary-green' },
  attention: { label: 'Attention', className: 'border-secondary-orange' },
} as const

export type CalloutType = keyof typeof VARIANTS

/** <Callout type="astuce" title="Optionnel">Texte en **markdown**</Callout> */
export default function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: ReactNode
}) {
  const variant = VARIANTS[type]
  if (!variant) {
    throw new Error(`[blog] <Callout type="${type}"> inconnu. Valeurs possibles : ${Object.keys(VARIANTS).join(', ')}`)
  }
  return (
    <aside
      aria-label={title ?? variant.label}
      className={`rounded-[14px] border-l-4 ${variant.className} bg-secondary-beige-light px-5 py-4`}
    >
      <p className="font-syne font-bold uppercase text-sm tracking-tight mb-2">{title ?? variant.label}</p>
      <div className="blog-stack">{children}</div>
    </aside>
  )
}
