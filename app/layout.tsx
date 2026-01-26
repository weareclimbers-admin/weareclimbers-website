import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import { Roboto } from 'next/font/google'
import AOSInit from '@/components/AOSInit'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

// Configuration des fonts selon la charte graphique
const syne = Syne({
  subsets: ['latin'],
  weight: ['700'], // Bold pour les titres
  variable: '--font-syne',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Regular, Medium, Bold
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'We Are Climbers - Application et bracelets connectés pour grimpeurs',
  description: 'We Are Climbers propose une application mobile et des bracelets connectés pour optimiser votre pratique de l\'escalade. Rejoignez notre communauté.',
  keywords: ['escalade', 'climbing', 'application', 'bracelet connecté', 'sport', 'communauté'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${roboto.variable}`}>
      <body>
        <AOSInit />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
