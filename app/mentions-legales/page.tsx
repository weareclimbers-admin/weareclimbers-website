import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { LEGAL_NOTICES } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Mentions Légales — WeAreClimbers',
  description:
    "Mentions légales WeAreClimbers SAS — éditeur, hébergement, propriété intellectuelle, conformité loi LCEN 2004-575.",
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer doc={LEGAL_NOTICES} />
      <Footer />
    </>
  )
}
