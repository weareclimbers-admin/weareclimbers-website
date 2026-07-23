import type { ReactNode } from 'react'

/**
 * Marquee — défilement horizontal lent infini (logos, mentions).
 * Purement CSS (keyframes `wac-marquee` dans globals.css) : GPU only, fluide,
 * pause au survol, désactivé si prefers-reduced-motion.
 * Le contenu est dupliqué pour un défilement sans couture.
 */
export default function Marquee({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`} role="marquee" aria-label={ariaLabel}>
      <div className="marquee-track">
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
