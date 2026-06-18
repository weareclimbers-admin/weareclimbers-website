import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import CountdownTimer from '@/components/CountdownTimer'
import PackCard from '@/components/PackCard'
import PressFeature from '@/components/PressFeature'
import { CAMPAIGN, CONTREPARTIES } from '@/lib/campaign'
import { DERNIER_ARTICLE } from '@/lib/press'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Boutique — Accès Anticipé sur Ulule | We Are Climbers",
  description: "La campagne Ulule est lancée jusqu'au 24 juin. Pack Salon (160€) et Pack Crux (178€) disponibles. Soutiens We Are Climbers maintenant.",
  openGraph: {
    title: "Boutique — Accès Anticipé sur Ulule",
    description: "La campagne Ulule est lancée jusqu'au 24 juin. Pack Salon (160€) et Pack Crux (178€) disponibles.",
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
                Campagne Ulule en cours
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
                L'Accès Anticipé est ouvert.
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
                Le bracelet Polar 360 et l'accès à vie à l'app WAC sont disponibles dès maintenant via la campagne Ulule. Jusqu'au 24 juin.
              </p>

              {/* Compte à rebours */}
              <div
                className="mb-10"
                style={{ color: 'var(--color-primary-green)' }}
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <CountdownTimer variant="large" />
              </div>

              {/* CTA Ulule */}
              <div data-aos="fade-up" data-aos-delay="200">
                <a
                  href={CAMPAIGN.ululeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  Voir la campagne sur Ulule
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 2 — APERÇU PRODUIT */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl text-center mb-12"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
            >
              Choisis ta contrepartie.
            </h2>

            {/* Cards produit — générées dynamiquement depuis CONTREPARTIES (lib/campaign.ts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
              {CONTREPARTIES.map((pack, i) => (
                <PackCard key={pack.id} pack={pack} animationDelay={i * 100} />
              ))}
            </div>

            {/* Note sous les cards */}
            <p
              className="text-center text-sm max-w-3xl mx-auto"
              style={{
                fontFamily: 'var(--font-roboto)',
                color: 'var(--color-primary-green)',
                lineHeight: '1.6'
              }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Paiement sécurisé sur Ulule. Livraison estimée après la clôture de la campagne. Détails complets et autres contreparties disponibles sur la page Ulule.
            </p>
          </div>
        </section>

        {/* BLOC 3 — VOIR LA CAMPAGNE COMPLÈTE */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-green)' }}
        >
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-3xl md:text-5xl mb-6"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-beige)'
                }}
                data-aos="fade-up"
              >
                Toutes les contreparties sont sur Ulule.
              </h2>

              <p
                className="text-lg md:text-xl mb-10"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-beige)',
                  lineHeight: '1.6',
                  opacity: 0.9
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Découvre l'ensemble des contreparties disponibles, la barre de progression de la campagne, et soutiens We Are Climbers directement sur Ulule.
              </p>

              <div data-aos="fade-up" data-aos-delay="200">
                <a
                  href={CAMPAIGN.ululeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  Voir la campagne sur Ulule
                </a>
              </div>
            </div>
          </div>
        </section>

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
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
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
                  Les premiers inscrits reçoivent leur bracelet en priorité.
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
                  Tarif Accès Anticipé
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Les tarifs Accès Anticipé sont réservés aux soutiens de la campagne. Le tarif public post-campagne sera supérieur.
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
                  Paiement sécurisé Ulule
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Transaction protégée par la plateforme Ulule. Tu n'es débité qu'à la clôture de la campagne, si l'objectif est atteint.
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
