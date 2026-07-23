import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HistoireLanding from '@/components/histoire/HistoireLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Notre Histoire - Comment We Are Climbers est né | We Are Climbers",
  description: "Découvrez l'histoire de Julien, fondateur de We Are Climbers, et comment une tendinite a inspiré la création d'une technologie pensée pour les grimpeurs.",
  openGraph: {
    title: "Notre Histoire - Comment We Are Climbers est né",
    description: "Découvrez l'histoire de Julien, fondateur de We Are Climbers, et comment une tendinite a inspiré la création d'une technologie pensée pour les grimpeurs.",
    url: "https://www.weareclimbers.fr/histoire",
  },
}

export default function Histoire() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Julien',
    jobTitle: 'Fondateur',
    worksFor: {
      '@type': 'Organization',
      name: 'We Are Climbers'
    },
    description: 'Fondateur de We Are Climbers. Ancien grimpeur blessé par une double tendinite, Julien a créé WAC pour aider les grimpeurs à progresser durablement sans se détruire.',
    knowsAbout: ['Escalade', 'Analyse physiologique', 'Prévention des blessures', 'Entraînement sportif'],
    url: 'https://www.weareclimbers.fr/histoire'
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.weareclimbers.fr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Histoire',
        item: 'https://www.weareclimbers.fr/histoire'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <HistoireLanding />
      <Footer />
    </>
  )
}
