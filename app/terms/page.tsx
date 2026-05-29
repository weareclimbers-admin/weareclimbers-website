import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { CGU } from '@/lib/legal'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — WeAreClimbers",
  description:
    "Conditions Générales d'Utilisation applicables aux grimpeurs (app mobile) et aux coachs (webapp) WeAreClimbers.",
}

export default function TermsOfService() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer doc={CGU} />
      <Footer />
    </>
  )
}
