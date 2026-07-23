'use client'

import { motion, animate, useInView } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Courbe d'easing (utilisée pour les compteurs) */
const EASE = [0.16, 1, 0.3, 1] as const

/** Ressort signature WAC 2.0 — utilisé par tous les reveals au scroll */
const SPRING = { type: 'spring', stiffness: 120, damping: 18 } as const

/**
 * Révélation au scroll — ressort signature WAC 2.0.
 * @param delay  décalage (s) pour orchestrer un stagger manuel (pas de 0.08 recommandé)
 * @param y      distance de translation initiale (px)
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // ⚠️ marge verticale UNIQUEMENT : une marge sur les 4 côtés exclut une bande
      // à gauche de l'écran → les éléments collés au bord gauche (mobile) ne
      // déclenchent jamais l'animation.
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Reveal typographique pour les gros titres Syne : chaque ligne est masquée
 * (overflow hidden) et remonte dans son masque, en stagger.
 * Animation jouée AU MONTAGE (pas à l'entrée dans le viewport) : les titres de
 * hero sont toujours au-dessus de la ligne de flottaison, et un observer qui ne
 * se déclenche pas laisserait le titre invisible sous son masque.
 * Passer le titre découpé en lignes : ["Grimpons mieux,", "plus longtemps."]
 */
export function TitleReveal({
  lines,
  as: Tag = 'h1',
  className,
  style,
  delay = 0,
}: {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  style?: React.CSSProperties
  delay?: number
}) {
  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/**
 * Compteur animé qui démarre quand l'élément entre dans le viewport.
 * Formate en fr-FR (180 000) par défaut.
 */
export function CountUp({
  to,
  from = 0,
  duration = 2,
  className,
  prefix = '',
  suffix = '',
}: {
  to: number
  from?: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  // Marge verticale uniquement (voir Reveal) — un span étroit collé au bord
  // gauche sur mobile ne doit pas être exclu de la zone d'observation.
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const [started, setStarted] = useState(false)
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (inView) setStarted(true)
  }, [inView])

  // Filet de sécurité : si l'observer ne se déclenche pas (quirk navigateur),
  // on vérifie directement la position à l'écran, au montage puis au scroll.
  useEffect(() => {
    if (started) return
    const isOnScreen = () => {
      const rect = ref.current?.getBoundingClientRect()
      return !!(rect && rect.top < window.innerHeight && rect.bottom > 0)
    }
    if (isOnScreen()) {
      setStarted(true)
      return
    }
    const onScroll = () => {
      if (isOnScreen()) {
        setStarted(true)
        cleanup()
      }
    }
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return cleanup
  }, [started])

  useEffect(() => {
    if (!started) return
    const controls = animate(from, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [started, to, from, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}
