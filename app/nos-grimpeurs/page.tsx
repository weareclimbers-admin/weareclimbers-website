import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GrimpeursLanding from '@/components/grimpeurs/GrimpeursLanding'

export default function NosGrimpeurs() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.weareclimbers.fr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Nos Grimpeurs',
        item: 'https://www.weareclimbers.fr/nos-grimpeurs',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <GrimpeursLanding />
      <Footer />
    </>
  )
}
