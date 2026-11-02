import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { CGV_V1_1 } from '@/lib/legal/cgv_v1_1'

/**
 * Archive des CGV 1.1 (URL stable) : contrat des pré-commandes d'octobre 2026.
 * noindex : seule la version en vigueur (/cgv) doit ressortir dans les moteurs.
 */
export const metadata: Metadata = {
  title: 'Conditions Générales de Vente, version 1.1 — WeAreClimbers',
  description:
    'Version 1.1 (28 septembre 2026) des Conditions Générales de Vente WeAreClimbers, applicable aux pré-commandes passées jusqu’au 31 octobre 2026.',
  robots: { index: false, follow: true },
}

export default function CgvV11Page() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer
        doc={CGV_V1_1}
        notice="Cette version s'applique aux pré-commandes passées jusqu'au 31 octobre 2026."
        links={[{ href: '/cgv', label: 'Version en vigueur (1.2)' }]}
      />
      <Footer />
    </>
  )
}
