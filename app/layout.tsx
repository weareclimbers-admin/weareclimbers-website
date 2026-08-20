import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import { Roboto } from 'next/font/google'
import AOSInit from '@/components/AOSInit'
import CookieBanner from '@/components/CookieBanner'
import UtmCapture from '@/components/UtmCapture'
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
  metadataBase: new URL('https://www.weareclimbers.fr'),
  title: 'We Are Climbers — L\'analyse physiologique intelligente pour grimpeurs',
  description: 'Le bracelet connecté et l\'app qui analysent ton corps en escalade : fréquence cardiaque à ±1 BPM, récupération, prévention des blessures. Grimpons mieux, plus longtemps.',
  keywords: ['escalade', 'climbing', 'application escalade', 'bracelet connecté escalade', 'analyse physiologique', 'prévention blessures escalade', 'récupération grimpeur', 'coach escalade'],
  icons: {
    icon: '/WAC-acronyme-1-green.svg',
    shortcut: '/WAC-acronyme-1-green.svg',
    apple: '/WAC-acronyme-1-green.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.weareclimbers.fr',
    siteName: 'We Are Climbers',
    title: 'We Are Climbers — L\'analyse physiologique intelligente pour grimpeurs',
    description: 'Le bracelet connecté et l\'app qui analysent ton corps en escalade : fréquence cardiaque à ±1 BPM, récupération, prévention des blessures. Grimpons mieux, plus longtemps.',
    images: [
      {
        url: '/WAC-acronyme-1-green.svg',
        width: 1200,
        height: 630,
        alt: 'We Are Climbers Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@weareclimbers',
    creator: '@weareclimbers',
    title: 'We Are Climbers — L\'analyse physiologique intelligente pour grimpeurs',
    description: 'Le bracelet connecté et l\'app qui analysent ton corps en escalade : ±1 BPM, récupération, prévention des blessures. Grimpons mieux, plus longtemps.',
    images: ['/WAC-acronyme-1-green.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${roboto.variable}`}>
      <body>
        {/* Organization Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'We Are Climbers',
              url: 'https://www.weareclimbers.fr',
              logo: 'https://www.weareclimbers.fr/WAC-acronyme-1-green.svg',
              description: 'We Are Climbers propose une application mobile et des bracelets connectés pour optimiser votre pratique de l\'escalade.',
              sameAs: [
                'https://www.facebook.com/weareclimbers',
                'https://www.instagram.com/weareclimbers',
                'https://www.linkedin.com/company/weareclimbers',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'contact@weareclimbers.fr',
              },
            })
          }}
        />
        {/*
          Meta Pixel (Facebook) : traceur publicitaire soumis à consentement
          préalable (art. 82 loi Informatique & Libertés / CNIL). Il n'est plus
          chargé ici de façon inconditionnelle — son injection est déléguée à
          <CookieBanner /> et n'intervient QUE si l'utilisateur accepte la
          catégorie « Marketing ». Voir components/CookieBanner.tsx.
        */}
        <AOSInit />
        <UtmCapture />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
