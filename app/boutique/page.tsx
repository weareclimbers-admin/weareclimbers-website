import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import PressFeature from '@/components/PressFeature'
import WaitlistSection from '@/components/WaitlistSection'
import { DERNIER_ARTICLE } from '@/lib/press'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Boutique — Pré-commandes bientôt | We Are Climbers",
  description: "La campagne a atteint son objectif à 100 %. Les pré-commandes du bracelet Polar 360 et de l'app WAC ouvriront bientôt en propre. Rejoins la liste d'attente.",
  openGraph: {
    title: "Boutique — Pré-commandes bientôt | We Are Climbers",
    description: "La campagne a atteint son objectif à 100 %. Les pré-commandes du bracelet Polar 360 et de l'app WAC ouvriront bientôt. Rejoins la liste d'attente.",
    url: "https://www.weareclimbers.fr/boutique",
  },
}

export default function Boutique() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* BLOC 1 — HERO */}
        <section
          className="pt-32 pb-12 md:py-32"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="max-w-5xl mx-auto text-center">
              <p
                className="text-sm md:text-base mb-4 font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-syne)',
                  color: 'var(--color-secondary-orange)',
                  letterSpacing: '0.1em'
                }}
                data-aos="fade-up"
              >
                Objectif de campagne atteint à 100 %
              </p>

              <h1
                className="text-4xl md:text-6xl lg:text-7xl mb-6"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.1'
                }}
                data-aos="fade-up"
              >
                Les pré-commandes arrivent.
              </h1>

              <p
                className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.5',
                  fontWeight: 400
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Merci ! Grâce à vous, l'objectif est atteint. Prochaine étape : les pré-commandes du bracelet Polar 360 et de l'app WAC, directement sur weareclimbers.fr — sans intermédiaire. La liste d'attente est ouverte.
              </p>

              {/* CTA liste d'attente */}
              <div data-aos="fade-up" data-aos-delay="200">
                <Link href="#liste-attente" className="btn-secondary inline-block">
                  Préviens-moi du lancement
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 2 — CE QUI ARRIVE */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2
                className="text-3xl md:text-5xl mb-8"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)'
                }}
                data-aos="fade-up"
              >
                Ce que tu pourras précommander.
              </h2>

              <p
                className="text-lg md:text-xl mb-10 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Le bracelet Polar 360 (haute précision, ±1 BPM) associé à l'app WAC : analyse physiologique en temps réel, prévention des blessures et suivi de récupération. Les détails complets et les tarifs de pré-commande seront dévoilés au lancement.
              </p>

              <div data-aos="fade-up" data-aos-delay="200">
                <Link href="/le-bracelet" className="btn-beige inline-block">
                  Découvrir le bracelet
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 3 — LISTE D'ATTENTE */}
        <WaitlistSection
          heading="Sois prévenu·e en premier."
          subtitle="Laisse ton email : tu seras informé·e dès l'ouverture des pré-commandes, avant l'annonce publique."
        />

        {/* BLOC 3.5 — PRESSE */}
        {DERNIER_ARTICLE && (
          <section
            className="py-12"
            style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
          >
            <div className="container-custom">
              <PressFeature article={DERNIER_ARTICLE} variant="compact" />
            </div>
          </section>
        )}

        {/* BLOC 4 — RÉASSURANCE */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Élément 1 */}
              <div className="text-center" data-aos="fade-up" data-aos-delay="0">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/icons/icons8-ampoule-globe-48.png"
                    alt=""
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-xl md:text-2xl mb-3"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)',
                    textTransform: 'uppercase'
                  }}
                >
                  Livraison prioritaire
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Les inscrits à la liste d'attente reçoivent leur bracelet en priorité.
                </p>
              </div>

              {/* Élément 2 */}
              <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/icons/icons8-médaille-50.png"
                    alt=""
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-xl md:text-2xl mb-3"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)',
                    textTransform: 'uppercase'
                  }}
                >
                  Tarif préférentiel
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Un tarif de lancement réservé à la liste d'attente, avant l'ouverture publique.
                </p>
              </div>

              {/* Élément 3 */}
              <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/icons/icons8-cadenas-50.png"
                    alt=""
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3
                  className="text-xl md:text-2xl mb-3"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)',
                    textTransform: 'uppercase'
                  }}
                >
                  Paiement sécurisé
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Les pré-commandes se feront via un paiement sécurisé, directement sur notre site.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
