import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopLanding from '@/components/boutique/ShopLanding'
import { Metadata } from 'next'

/**
 * Page de travail du checkout pré-commandes — TEMPORAIRE (même pattern que /start :
 * noindex/nofollow, absente du sitemap, jamais liée depuis le site).
 * Elle remplacera app/boutique/page.tsx UNIQUEMENT après le GO explicite de Julien.
 * Ne pas l'ajouter à app/sitemap.ts ni à la nav.
 */

export const metadata: Metadata = {
  title: 'Pré-commande — Bracelet Polar 360 + App | We Are Climbers',
  description:
    'Précommande le bracelet Polar 360 haute précision (±1 BPM) et l’app WAC. Paiement sécurisé, livraison France, Belgique, Luxembourg, Suisse et outre-mer.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function Boutique2() {
  return (
    <>
      <Header />
      <ShopLanding />
      <Footer />
    </>
  )
}
