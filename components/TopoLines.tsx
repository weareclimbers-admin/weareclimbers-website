'use client'

import { motion } from 'motion/react'

/**
 * Fond topographique animé — courbes de niveau (thème montagne/escalade).
 * Un blob de base rendu à plusieurs échelles concentriques ; chaque tracé
 * se dessine (pathLength) puis l'ensemble dérive lentement (rotation infinie).
 * Purement décoratif → aria-hidden.
 *
 * @param color   couleur des lignes
 * @param accent  couleur d'une ligne d'accent (le carré-en-coin de WAC en version trait)
 * @param opacity opacité globale
 */
export default function TopoLines({
  color = 'var(--color-primary-beige)',
  accent = 'var(--color-secondary-orange)',
  opacity = 0.15,
  drift = true,
  className,
}: {
  color?: string
  accent?: string
  opacity?: number
  /** Rotation lente infinie. Désactiver (false) sur les sections déjà chargées (perf). */
  drift?: boolean
  className?: string
}) {
  // Blob organique de base (centré ~600,400)
  const BLOB =
    'M600,250 C742,250 842,332 842,432 C842,548 728,602 600,602 C468,602 358,548 358,432 C358,332 458,250 600,250 Z'

  const rings = [0.28, 0.46, 0.64, 0.82, 1.0, 1.18, 1.36]

  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%' }}
        animate={drift ? { rotate: 360 } : undefined}
        transition={drift ? { duration: 240, ease: 'linear', repeat: Infinity } : undefined}
      >
        <g style={{ transformOrigin: '600px 400px' }}>
          {rings.map((s, i) => (
            <motion.path
              key={i}
              d={BLOB}
              fill="none"
              stroke={i === 4 ? accent : color}
              strokeWidth={i === 4 ? 2.5 : 1.5}
              transform={`translate(600 400) scale(${s}) translate(-600 -400)`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: i === 4 ? 0.9 : 0.55 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  )
}
