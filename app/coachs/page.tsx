import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CoachLanding from '@/components/coachs/CoachLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "WAC Coach — suis et programme l'entraînement de tes grimpeurs | We Are Climbers",
  description:
    "Vois la forme réelle de tes grimpeurs, programme en conséquence et teste tes plans avant la compète. Le logiciel des coachs et clubs d'escalade.",
  openGraph: {
    title: "WAC Coach — suis et programme l'entraînement de tes grimpeurs",
    description:
      "Du ressenti à la donnée, de la donnée à la séance. Le logiciel des coachs et clubs d'escalade. Réserve ta démo ou essaie-le gratuitement.",
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
      "Espace coach de We Are Climbers : suivi physiologique des grimpeurs (sommeil, récupération, charge d'entraînement), état de forme et tableau de bord de groupe, programmation de séances envoyées dans l'app de l'élève, scénarios d'entraînement comparés avant une compétition, bibliothèque d'exercices et de modèles de séance, graphiques personnalisés. Pour coachs et clubs d'escalade.",
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
