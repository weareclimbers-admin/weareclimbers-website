import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BraceletLanding from '@/components/bracelet/BraceletLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Le bracelet cardio pour l\'escalade — Polar 360 × WAC | We Are Climbers',
  description:
    "Le Polar 360 version We Are Climbers : capteur cardio sans écran, ±1 BPM (donnée Polar), porté à l'avant-bras et relié à l'app. Commande-le en prévente dès maintenant.",
  keywords: ['bracelet cardio escalade', 'capteur FC escalade', 'capteur fréquence cardiaque grimpe', 'Polar 360 escalade', 'bracelet connecté escalade'],
  openGraph: {
    title: "Le bracelet cardio pensé pour l'escalade — Polar 360 × WAC",
    description:
      "Capteur cardio sans écran, ±1 BPM (donnée Polar), porté à l'avant-bras et relié à l'app d'analyse We Are Climbers.",
    url: 'https://www.weareclimbers.fr/le-bracelet',
  },
}

export default function LeBraceletPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Bracelet cardio Polar 360 × We Are Climbers',
    brand: { '@type': 'Brand', name: 'Polar' },
    description:
      "Bracelet cardio Polar 360 sans écran : fréquence cardiaque en continu (±1 BPM selon les données communiquées par Polar), intervalles entre battements, accéléromètre et température cutanée. Porté à l'avant-bras, associé à l'app d'analyse physiologique We Are Climbers.",
    image: 'https://www.weareclimbers.fr/téléchargement (1).png',
    offers: {
      '@type': 'Offer',
      url: 'https://www.weareclimbers.fr/le-bracelet',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/PreOrder',
      seller: { '@type': 'Organization', name: 'We Are Climbers' },
    },
    category: 'Bracelet connecté sport',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.weareclimbers.fr' },
      { '@type': 'ListItem', position: 2, name: 'Le bracelet', item: 'https://www.weareclimbers.fr/le-bracelet' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <BraceletLanding />
      <Footer />
    </>
  )
}
