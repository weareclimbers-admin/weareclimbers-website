import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { PRIVACY_POLICY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — WeAreClimbers',
  description:
    "Politique de Confidentialité WeAreClimbers : traitement des données personnelles des grimpeurs et coachs conformément au RGPD.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer doc={PRIVACY_POLICY} />
      <Footer />
    </>
  )
}
