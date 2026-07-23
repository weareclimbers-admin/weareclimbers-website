import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EngagementsLanding from '@/components/engagements/EngagementsLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos engagements — Éco-conception & transparence | We Are Climbers',
  description:
    "Éco-conception, prévention, circularité, transparence : notre feuille de route RSE honnête — état actuel, objectifs 2026, roadmap bracelet éco-conçu et rapport annuel.",
  openGraph: {
    title: 'Nos engagements — Éco-conception & transparence',
    description:
      "Éco-conception, prévention, circularité, transparence : notre feuille de route RSE honnête — état actuel, objectifs 2026 et roadmap bracelet éco-conçu.",
    url: 'https://www.weareclimbers.fr/engagements',
  },
}

export default function EngagementsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.weareclimbers.fr' },
      { '@type': 'ListItem', position: 2, name: 'Nos engagements', item: 'https://www.weareclimbers.fr/engagements' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <EngagementsLanding />
      <Footer />
    </>
  )
}
