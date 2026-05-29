'use client'

import { useEffect, useState } from 'react'
import { CAMPAIGN } from '@/lib/campaign'

type Variant = 'compact' | 'large'

function computeRemaining(endIso: string) {
  const diff = new Date(endIso).getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, ended: false }
}

export default function CountdownTimer({ variant = 'large' }: { variant?: Variant }) {
  // Évite la divergence SSR/CSR : on n'affiche le compteur qu'après hydratation
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(() => computeRemaining(CAMPAIGN.endDate))

  useEffect(() => {
    setMounted(true)
    setTime(computeRemaining(CAMPAIGN.endDate))
    const interval = setInterval(() => {
      setTime(computeRemaining(CAMPAIGN.endDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    // Placeholder côté serveur — même taille que le rendu final pour éviter le shift
    if (variant === 'compact') return <span className="font-bold">J-…</span>
    return <span className="opacity-0">J-00 · 00:00:00</span>
  }

  if (time.ended) {
    return variant === 'compact' ? <span>Campagne terminée</span> : <span>La campagne est terminée.</span>
  }

  if (variant === 'compact') {
    return <span className="font-bold whitespace-nowrap">J-{time.days}</span>
  }

  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="flex gap-3 md:gap-6 justify-center items-end font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
      <Unit value={time.days} label="jours" />
      <Separator />
      <Unit value={time.hours} label="heures" pad={pad} />
      <Separator />
      <Unit value={time.minutes} label="min" pad={pad} />
      <Separator />
      <Unit value={time.seconds} label="sec" pad={pad} />
    </div>
  )
}

function Unit({ value, label, pad }: { value: number; label: string; pad?: (n: number) => string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-6xl leading-none">{pad ? pad(value) : value}</span>
      <span className="text-xs md:text-sm uppercase mt-2 opacity-80" style={{ letterSpacing: '0.1em' }}>
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="text-3xl md:text-5xl leading-none opacity-40 self-start mt-1" style={{ fontFamily: 'var(--font-syne)' }}>
      :
    </span>
  )
}
