import StartOnboarding from '@/components/start/StartOnboarding'
import { Metadata } from 'next'

/**
 * Parcours de démarrage — cible du QR code glissé dans les colis.
 * Page volontairement INVISIBLE : noindex/nofollow, absente du sitemap,
 * jamais liée depuis le site. Ne pas l'ajouter à app/sitemap.ts ni à la nav.
 * (Pas de Disallow dans robots.txt : Google doit pouvoir lire le noindex.)
 */

export const metadata: Metadata = {
  title: 'Bienvenue dans la cordée — We Are Climbers',
  description: 'Ton parcours de démarrage : découvre ton bracelet et connecte-le à l’app.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function StartPage() {
  return <StartOnboarding />
}
