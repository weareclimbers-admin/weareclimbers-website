import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AppLanding from '@/components/lapp/AppLanding'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "L'app d'entraînement escalade — analyse physiologique | We Are Climbers",
  description:
    "L'app qui transforme tes données en décisions : État de Forme quotidien, suivi de charge, prévention des blessures, analyse du cycle menstruel, sessions poutre. Gratuite au lancement — rejoins la liste.",
  keywords: ['app entraînement escalade', 'suivi charge escalade', 'application escalade', 'app grimpe analyse', 'prévention blessures escalade'],
  openGraph: {
    title: "L'app d'entraînement escalade — We Are Climbers",
    description:
      "État de Forme quotidien, suivi de charge, insights IA, cycle menstruel : l'app qui te dit ce que ton corps vit. Gratuite au lancement.",
    url: 'https://www.weareclimbers.fr/l-app',
  },
}

export default function LAppPage() {
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'We Are Climbers',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'iOS 15.1+, Android 13+',
    description:
      "App d'analyse physiologique pour l'escalade : score État de Forme quotidien (récupération, sommeil, charge, ressenti, cycle), résumé de séance automatique, dashboards de charge, recommandations IA et prévention des blessures.",
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: 'We Are Climbers' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.weareclimbers.fr' },
      { '@type': 'ListItem', position: 2, name: "L'app", item: 'https://www.weareclimbers.fr/l-app' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <AppLanding />
      <Footer />
    </>
  )
}
