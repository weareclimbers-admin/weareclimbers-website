import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TopoLines from '@/components/TopoLines'
import { Reveal, TitleReveal } from '@/components/Reveal'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Offres WAC Coach — bientôt disponibles | We Are Climbers',
  description:
    "La grille tarifaire WAC Coach arrive très bientôt. En attendant, demande ta démo : on te montre l'espace coach en avant-première et on répond à toutes tes questions.",
  // Page temporaire : ne pas indexer (retirer ce bloc + ajouter au sitemap quand la vraie grille sera prête)
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Offres WAC Coach — bientôt disponibles',
    description: "La grille tarifaire arrive très bientôt. Demande ta démo en avant-première.",
    url: 'https://www.weareclimbers.fr/coachs/offres',
  },
}

export default function CoachsOffresPage() {
  return (
    <>
      <Header />
      <main
        className="relative overflow-hidden flex items-center"
        style={{ backgroundColor: 'var(--color-primary-green)', minHeight: '82vh' }}
      >
        <TopoLines opacity={0.12} />
        <div className="container-custom relative z-10 py-32 md:py-40 text-center">
          <Reveal>
            <p
              className="text-sm md:text-base mb-6 font-bold uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
            >
              Offres WAC Coach
            </p>
          </Reveal>

          <TitleReveal
            lines={['Notre grille tarifaire', 'arrive très bientôt.']}
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl mb-8"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--color-primary-beige)',
              lineHeight: '1.1',
            }}
          />

          <Reveal delay={0.2}>
            <p
              className="text-lg md:text-xl mb-4 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}
            >
              On finalise les offres WAC&nbsp;Coach pour qu'elles collent vraiment à ta réalité — que tu sois coach indépendant ou club. En attendant, le plus simple pour découvrir l'outil et parler tarifs, c'est une démo&nbsp;: on te montre l'espace coach en direct et on répond à toutes tes questions.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p
              className="text-base mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.7 }}
            >
              Gratuit et sans engagement. On te recontacte rapidement.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/coachs#demo" className="btn-secondary inline-block">Demander une démo</a>
              <a href="/coachs" className="btn-beige inline-block">← Retour à la page coach</a>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  )
}
