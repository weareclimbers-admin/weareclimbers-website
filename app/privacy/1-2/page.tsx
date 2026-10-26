import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { PRIVACY_POLICY_V1_2 } from '@/lib/legal/privacyPolicy_v1_2'

/**
 * Archive de la Politique de Confidentialité 1.2 (URL stable). noindex : seule
 * la version en vigueur (/privacy) doit ressortir dans les moteurs de recherche.
 */
export const metadata: Metadata = {
  title: 'Politique de Confidentialité, version 1.2 — WeAreClimbers',
  description:
    'Version 1.2 (14 août 2026) de la Politique de Confidentialité WeAreClimbers, applicable jusqu’au 29 novembre 2026.',
  robots: { index: false, follow: true },
}

export default function PrivacyPolicyV12Page() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer
        doc={PRIVACY_POLICY_V1_2}
        notice="Cette version s'applique jusqu'au 29 novembre 2026."
        links={[{ href: '/privacy', label: 'Nouvelle version (1.3), en vigueur à partir du 30 novembre 2026' }]}
      />
      <Footer />
    </>
  )
}
