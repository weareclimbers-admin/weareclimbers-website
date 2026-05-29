import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import { Roboto } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://www.weareclimbers.fr'),
  title: 'We Are Climbers — Campagne Ulule en cours jusqu\'au 24 juin',
  description: 'L\'analyse physiologique intelligente pour grimpeurs et grimpeuses. Soutiens We Are Climbers sur Ulule jusqu\'au 24 juin et sécurise ton bracelet Polar 360 + accès à vie à l\'app.',
  keywords: ['escalade', 'climbing', 'application', 'bracelet connecté', 'sport', 'communauté', 'ulule', 'accès anticipé'],
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
    title: 'We Are Climbers — Campagne Ulule en cours jusqu\'au 24 juin',
    description: 'L\'analyse physiologique intelligente pour grimpeurs et grimpeuses. Soutiens We Are Climbers sur Ulule jusqu\'au 24 juin et sécurise ton bracelet Polar 360 + accès à vie à l\'app.',
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
    title: 'We Are Climbers — Campagne Ulule en cours jusqu\'au 24 juin',
    description: 'L\'analyse physiologique intelligente pour grimpeurs et grimpeuses. Soutiens We Are Climbers sur Ulule jusqu\'au 24 juin.',
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
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1574373133681517');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1574373133681517&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <AOSInit />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
