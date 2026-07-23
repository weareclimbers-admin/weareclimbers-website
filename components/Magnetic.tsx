'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Bouton magnétique — l'élément glisse légèrement vers le curseur (ressort doux),
 * revient au centre à la sortie. Sans effet au toucher (pas de hover mobile).
 * À envelopper autour d'un CTA : <Magnetic><a className="btn-secondary">…</a></Magnetic>
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode
  /** Fraction du déplacement du curseur transmise à l'élément (0.2–0.35 conseillé) */
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 })
  const sy = useSpring(y, { stiffness: 200, damping: 16 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  )
}
