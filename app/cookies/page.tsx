import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { COOKIES_POLICY } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Politique Cookies — WeAreClimbers',
  description:
    'Cookies et technologies similaires utilisés par WeAreClimbers (application mobile grimpeur et webapp coach).',
}

export default function CookiesPolicyPage() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer doc={COOKIES_POLICY} />
      <Footer />
    </>
  )
}
