import { Suspense } from 'react'
import { Metadata } from 'next'
import RoadmapBoard from '@/components/roadmap/RoadmapBoard'

/**
 * Board d'idées — page ouverte en webview depuis l'app mobile (via ?uid=<id>).
 * Page volontairement INVISIBLE : noindex/nofollow, absente du sitemap,
 * jamais liée depuis le site public. Ne pas l'ajouter à app/sitemap.ts ni à la nav.
 * (Pas de Disallow dans robots.txt : Google doit pouvoir lire le noindex.)
 */

export const metadata: Metadata = {
  title: 'Idées & votes — We Are Climbers',
  description: 'Propose des fonctionnalités et vote pour celles des autres grimpeurs.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function RoadmapPage() {
  // <Suspense> requis : RoadmapBoard lit ?uid via useSearchParams.
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <RoadmapBoard />
    </Suspense>
  )
}
