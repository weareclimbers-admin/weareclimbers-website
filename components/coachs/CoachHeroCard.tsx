'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import ReadyGauge from '@/components/home/ReadyGauge'

/**
 * Carte hero de /coachs — même langage visuel que la home (glass-card + jauge
 * État de Forme), déclinée en vue "groupe" côté coach : forme moyenne du groupe
 * + grimpeurs à surveiller (données fictives de démo).
 */
export default function CoachHeroCard() {
  const ref = useRef<HTMLDivElement>(null)
  // Marge verticale uniquement — une marge 4-côtés exclut le bord gauche sur mobile
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const athletes = [
    { name: 'Léa M.', note: 'Charge en hausse · surveille', color: 'var(--color-secondary-orange)' },
    { name: 'Tom R.', note: 'Récup faible 2 nuits', color: '#B23B0E' },
    { name: 'Inès B.', note: 'Prête pour une grosse séance', color: 'var(--color-primary-green)' },
  ]

  return (
    <div ref={ref} className="glass-card w-full max-w-sm p-7 md:p-8">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2.5 h-2.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
        <span
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
        >
          Ton groupe · aujourd'hui
        </span>
      </div>

      <ReadyGauge value={78} showBars={false} size={170} />
      <p
        className="mt-2 mb-5 text-center text-[0.65rem] uppercase font-bold tracking-[0.12em]"
        style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.6 }}
      >
        Forme moyenne du groupe
      </p>

      {/* À surveiller — apparition en cascade */}
      <div className="space-y-2">
        {athletes.map((a, i) => (
          <motion.div
            key={a.name}
            className="flex items-center gap-3 px-3 py-2 rounded-xl"
            style={{ backgroundColor: 'rgba(245,236,229,0.75)', borderLeft: `3px solid ${a.color}` }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.7 + i * 0.15 }}
          >
            <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              {a.name}
            </span>
            <span className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
              {a.note}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
