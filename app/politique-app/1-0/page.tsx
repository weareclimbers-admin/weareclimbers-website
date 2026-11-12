import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { APP_PRIVACY_POLICY_V1_0 } from '@/lib/legal/appPrivacyPolicy_v1_0'

/**
 * Archive de la politique de l'application mobile 1.0 (§13.2 : archive des
 * anciennes versions accessible). noindex : seule la version en vigueur
 * (/politique-app) doit ressortir dans les moteurs de recherche.
 */
export const metadata: Metadata = {
  title: "Politique de Confidentialité de l'application, version 1.0 — WeAreClimbers",
  description:
    "Version 1.0 de la Politique de Confidentialité de l'application mobile WeAreClimbers, applicable jusqu’au 29 novembre 2026.",
  robots: { index: false, follow: true },
}

export default function AppPrivacyPolicyV10Page() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer
        doc={APP_PRIVACY_POLICY_V1_0}
        notice="Cette version s'applique jusqu'au 29 novembre 2026."
        links={[
          { href: '/politique-app/1-1', label: 'Version suivante (1.1), applicable du 30 novembre au 14 décembre 2026' },
          { href: '/politique-app', label: 'Version en vigueur à partir du 15 décembre 2026 (1.2)' },
        ]}
      />
      <Footer />
    </>
  )
}
