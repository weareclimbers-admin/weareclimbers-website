import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import { APP_PRIVACY_POLICY, APP_PRIVACY_POLICY_EFFECTIVE_DATE } from '@/lib/legal/appPrivacyPolicy'

/**
 * Politique de confidentialité de l'application mobile, telle qu'affichée dans
 * l'app (texte recopié du repo mobile). URL stable pour l'app et les emails.
 */
export const metadata: Metadata = {
  title: "Politique de Confidentialité de l'application — WeAreClimbers",
  description:
    "Politique de Confidentialité de l'application mobile WeAreClimbers : données collectées, finalités, partage avec le coach, vos droits RGPD.",
}

export default function AppPrivacyPolicyPage() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer
        doc={APP_PRIVACY_POLICY}
        effectiveDate={APP_PRIVACY_POLICY_EFFECTIVE_DATE}
        links={[
          { href: '/politique-app/1-1', label: 'Version précédente (1.1), applicable du 30 novembre au 14 décembre 2026' },
          { href: '/politique-app/1-0', label: 'Version 1.0, applicable jusqu’au 29 novembre 2026' },
        ]}
      />
      <Footer />
    </>
  )
}
