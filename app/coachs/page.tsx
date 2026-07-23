import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CoachLanding from '@/components/coachs/CoachLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WAC Coach — le suivi physiologique de tes grimpeurs | We Are Climbers',
  description:
    "Vois ce que vivent tes grimpeurs entre deux séances : sommeil, récupération, charge réelle. Le logiciel de suivi pour coachs et clubs d'escalade. Demande ta démo.",
  openGraph: {
    title: 'WAC Coach — le suivi physiologique de tes grimpeurs',
    description:
      "Passe du ressenti déclaré à la donnée réelle. Le logiciel de suivi pour coachs et clubs d'escalade. Demande ta démo en avant-première.",
    url: 'https://www.weareclimbers.fr/coachs',
  },
}

export default function CoachsPage() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'WAC Coach',
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Web',
    description:
      "Espace coach de We Are Climbers : suivi physiologique des grimpeurs (sommeil, récupération, charge d'entraînement), score d'état de forme, programmation intelligente et dashboard de groupe pour coachs et clubs d'escalade.",
    offers: {
      '@type': 'Offer',
      category: 'B2B',
    },
    publisher: {
      '@type': 'Organization',
      name: 'We Are Climbers',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Header />
      <CoachLanding />
      <Footer />
    </>
  )
}
