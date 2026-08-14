import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { CGV } from '@/lib/legal'

/**
 * CGV — vente de biens en pré-commande sur le site.
 * ⚠️ noindex TEMPORAIRE tant que les pré-commandes ne sont pas ouvertes
 * (la page mentionne la vente avant son annonce publique). À l'ouverture :
 * retirer `robots` ci-dessous + ajouter la page au footer et au sitemap.
 */
export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — WeAreClimbers',
  description:
    'Conditions Générales de Vente des pré-commandes weareclimbers.fr — prix, livraison, rétractation, garanties légales.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function CgvPage() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer doc={CGV} />
      <Footer />
    </>
  )
}
