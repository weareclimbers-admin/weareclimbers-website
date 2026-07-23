'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { CountUp } from '@/components/Reveal'

/**
 * Jauge "État de Forme" — l'élément interactif signature de la home
 * (logique "le score comme héros", à la Whoop/Oura, sur charte WAC).
 * Même nom que dans l'app et la webapp coach : État de Forme.
 * Anneau SVG qui se remplit 0 → valeur avec un dégradé vert → orange,
 * chiffre central en Syne, mini-barres Récup / Sommeil / Charge.
 */
export default function ReadyGauge({
  value = 82,
  size = 190,
  showBars = true,
}: {
  value?: number
  size?: number
  showBars?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Marge verticale uniquement — une marge 4-côtés exclut le bord gauche sur mobile
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const R = 62
  const CIRC = 2 * Math.PI * R
  const offset = CIRC * (1 - value / 100)

  const bars = [
    { label: 'Récupération', pct: 86 },
    { label: 'HRV', pct: 74 },
    { label: 'Charge', pct: 61 },
  ]

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Anneau */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 160 160" className="-rotate-90 w-full h-full">
          <defs>
            <linearGradient id="wac-gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary-green)" />
              <stop offset="100%" stopColor="var(--color-secondary-orange)" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(38,83,53,0.14)" strokeWidth="11" />
          <motion.circle
            cx="80"
            cy="80"
            r={R}
            fill="none"
            stroke="url(#wac-gauge-gradient)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          />
        </svg>

        {/* Chiffre central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="leading-none"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: size * 0.28,
              color: 'var(--color-primary-green)',
            }}
          >
            <CountUp to={value} duration={1.8} />
          </span>
          <span
            className="mt-1 text-[0.6rem] uppercase font-bold tracking-[0.14em]"
            style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.65 }}
          >
            État de forme
          </span>
        </div>
      </div>

      {/* Mini-barres */}
      {showBars && (
        <div className="w-full mt-5 space-y-2.5">
          {bars.map((b, i) => (
            <div key={b.label}>
              <div className="flex justify-between mb-1">
                <span
                  className="text-[0.62rem] uppercase font-bold tracking-[0.12em]"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}
                >
                  {b.label}
                </span>
                <span
                  className="text-[0.62rem] font-bold"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                >
                  {b.pct}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(38,83,53,0.12)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: i === 2 ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${b.pct}%` } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
