import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopLanding from '@/components/boutique/ShopLanding'
import { Metadata } from 'next'

/**
 * Boutique pré-commande V2 EN LIGNE (mise en live le 01/10/2026 : l'ancienne
 * page « liste d'attente / campagne atteinte » a été remplacée par la vraie
 * fiche produit + checkout Stripe, auparavant en préparation sur /boutique2).
 * /boutique2 redirige désormais vers /boutique (voir next.config.js).
 */

export const metadata: Metadata = {
  title: 'Pré-commande — Bracelet Polar 360 + App | We Are Climbers',
  description:
    'Précommande le bracelet Polar 360 haute précision (±1 BPM) et l’app WAC. Paiement sécurisé, livraison France, Belgique, Luxembourg, Suisse et outre-mer.',
  alternates: { canonical: 'https://www.weareclimbers.fr/boutique' },
  openGraph: {
    title: 'Pré-commande — Bracelet Polar 360 + App | We Are Climbers',
    description:
      'Précommande le bracelet Polar 360 (±1 BPM) et l’app WAC. Paiement sécurisé, livraison France, Belgique, Luxembourg, Suisse et outre-mer.',
    url: 'https://www.weareclimbers.fr/boutique',
  },
}

export default function Boutique() {
  return (
    <>
      <Header />
      <ShopLanding />
      <Footer />
    </>
  )
}
