import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { APP_PRIVACY_POLICY_V1_1, APP_PRIVACY_POLICY_V1_1_EFFECTIVE_DATE } from '@/lib/legal/appPrivacyPolicy_v1_1'

/**
 * Archive de la politique de l'application mobile 1.1 (§13.2 : archive des
 * anciennes versions accessible). noindex : seule la version en vigueur
 * (/politique-app) doit ressortir dans les moteurs de recherche.
 */
export const metadata: Metadata = {
  title: "Politique de Confidentialité de l'application, version 1.1 — WeAreClimbers",
  description:
    "Version 1.1 de la Politique de Confidentialité de l'application mobile WeAreClimbers, applicable du 30 novembre au 14 décembre 2026.",
  robots: { index: false, follow: true },
}

export default function AppPrivacyPolicyV11Page() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer
        doc={APP_PRIVACY_POLICY_V1_1}
        effectiveDate={APP_PRIVACY_POLICY_V1_1_EFFECTIVE_DATE}
        notice="Cette version s'applique du 30 novembre au 14 décembre 2026."
        links={[
          { href: '/politique-app', label: 'Nouvelle version (1.2), en vigueur à partir du 15 décembre 2026' },
          { href: '/politique-app/1-0', label: 'Version précédente (1.0), applicable jusqu’au 29 novembre 2026' },
        ]}
      />
      <Footer />
    </>
  )
}
