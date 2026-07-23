import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BraceletLanding from '@/components/bracelet/BraceletLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Le bracelet cardio pour l\'escalade — Polar 360 × WAC | We Are Climbers',
  description:
    "Le capteur FC pensé pour l'escalade : ±1 BPM, 50 Hz, 29 g, sans écran, 10 jours d'autonomie. Porté à l'avant-bras pour un signal fiable même dans les surplombs. Rejoins la liste d'attente.",
  keywords: ['bracelet cardio escalade', 'capteur FC escalade', 'capteur fréquence cardiaque grimpe', 'Polar 360 escalade', 'bracelet connecté escalade'],
  openGraph: {
    title: "Le bracelet cardio pensé pour l'escalade — Polar 360 × WAC",
    description:
      "±1 BPM, 29 g, sans écran, 10 jours d'autonomie. Le capteur haute précision porté à l'avant-bras, optimisé pour la grimpe.",
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
      "Bracelet cardio haute précision pour l'escalade : fréquence cardiaque à ±1 BPM (capteur optique 9 LED, 50 Hz), 29 g, sans écran, 10 jours d'autonomie. Porté à l'avant-bras, associé à l'app d'analyse physiologique We Are Climbers.",
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
