import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/Badge'
import ValuePillar from '@/components/ValuePillar'
import TestimonialCard from '@/components/TestimonialCard'
// import PricingCard from '@/components/PricingCard' // Commenté temporairement - section pricing désactivée
import FAQItem from '@/components/FAQItem'
import { values, manifesto } from '@/lib/values'
import { testimonials } from '@/lib/testimonials'
// import { pricingPlans, upcomingModules } from '@/lib/pricing' // Commenté temporairement - section pricing désactivée
import { faqItems } from '@/lib/faq'

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* 1. HERO SECTION */}
        <section
          className="pt-32 pb-12 md:py-32 relative"
          style={{
            backgroundImage: 'url(/hero-home.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'var(--color-primary-beige)'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-green opacity-70"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              {/* Title */}
              <h1
                className="text-4xl md:text-6xl lg:text-7xl mb-6"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  lineHeight: '1.1'
                }}
              >
                GRIMPONS MIEUX, ENSEMBLE.
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto"
                style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.5', fontWeight: 400 }}
              >
                Parce que la vraie performance, c'est grimper longtemps.
                <br />
                Pas grimper fort une fois.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/mission" className="btn-beige">
                  Découvre notre vision
                </Link>
                <Link href="/early-access" className="btn-secondary">
                  Rejoins le mouvement
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © Kristine Varga
          </div>
        </section>

        {/* 2. NOS VALEURS */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2
                className="text-3xl md:text-5xl mb-6"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)'
                }}
              >
                NOS VALEURS
              </h2>
              <p
                className="text-lg md:text-xl max-w-4xl mx-auto italic"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6'
                }}
              >
                "{manifesto.quote}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={value.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <ValuePillar value={value} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. BÉNÉFICES / POURQUOI WAC */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl text-center mb-16"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
            >
              POURQUOI WAC ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Bénéfice 1 */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <div className="mb-4">
                  <Image src="/icons/icons8-bouclier-50.png" alt="" width={48} height={48} className="object-contain" />
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)'
                  }}
                >
                  Prévention des blessures
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Notre app t'alerte quand tu dois te reposer. Objectif hebdomadaire personnalisé,
                  suivi de récupération, et recommendations basées sur tes données physiologiques.
                </p>
              </div>

              {/* Bénéfice 2 - HIGHLIGHT cycle menstruel */}
              <div
                className="p-8 relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-secondary-orange)',
                  color: 'white'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div
                  className="absolute top-4 right-4 text-xs px-3 py-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    fontFamily: 'var(--font-roboto)',
                    fontWeight: 700
                  }}
                >
                  INNOVATION 🩸
                </div>
                <div className="mb-4">
                  <Image src="/icons/icons8-cycle-menstruel-64.png" alt="" width={48} height={48} className="object-contain" />
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-beige)'
                  }}
                >
                  Comprends ton corps (vraiment)
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    lineHeight: '1.6',
                    color: 'var(--color-primary-beige)'
                  }}
                >
                  <strong>1ère app escalade</strong> à prendre en compte l'impact du cycle menstruel sur ta performance.
                  Parce que ton corps mérite d'être compris, pas jugé.
                </p>
              </div>

              {/* Bénéfice 3 */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="mb-4">
                  <Image src="/icons/icons8-objectif-50.png" alt="" width={48} height={48} className="object-contain" />
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)'
                  }}
                >
                  Entraînement intentionnel
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Tu grimpes 3×/semaine mais tu stagnes depuis 6 mois ?
                  <br /><br />
                  C'est pas parce que tu n'es pas assez bon.<br />
                  C'est parce que tu grimpes au hasard. Pas avec intention.
                  <br /><br />
                  <strong>WAC t'aide à comprendre COMMENT tu grimpes pour grimper MIEUX.</strong>
                  <br /><br />
                  <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Analyse zones FC, patterns de récupération, recommandations adaptées.
                  </span>
                </p>
              </div>

              {/* Bénéfice 4 */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="mb-4">
                  <Image src="/icons/icons8-cœur-poignée-de-main-50.png" alt="" width={48} height={48} className="object-contain" />
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)'
                  }}
                >
                  Communauté bienveillante
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Partage tes sessions (sans les rendre publiques si tu veux), participe à des challenges collectifs,
                  célèbre tes progrès ET tes galères. On grimpe seul·e, mais on progresse ensemble.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. AVEC / SANS BRACELET */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
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
                L'APP EST GRATUITE.
              </h2>
              <p
                className="text-lg md:text-xl mb-8 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Le bracelet Polar 360 est optionnel — mais recommandé si tu veux l'analyse
                physiologique complète et comprendre vraiment ton corps.
              </p>
              <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link href="/capteurs" className="btn-secondary">
                  Découvre les capteurs et les analyses →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LE BRACELET */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto" data-aos="fade-up">
              {/* Image produit */}
              <div className="flex items-center justify-center aspect-square">
                <Image
                  src="/téléchargement (1).png"
                  alt="Bracelet Polar 360 WeAreClimbers"
                  width={600}
                  height={600}
                  className="object-contain w-full h-full p-4"
                />
              </div>

              {/* Content */}
              <div>
                <h2
                  className="text-3xl md:text-5xl mb-6"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--color-primary-green)'
                  }}
                >
                  L'ANALYSE PHYSIOLOGIQUE WAC
                </h2>
                <p
                  className="text-xl md:text-2xl mb-4 font-medium"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.4'
                  }}
                >
                  Conçue pour celles et ceux qui veulent comprendre.<br />
                  Pas juste grimper.
                </p>
                <p
                  className="text-lg mb-4"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Avec le <strong>bracelet Polar 360</strong>, WAC analyse automatiquement tes sessions.<br />
                  Léger. Discret. Précis.
                </p>
                <p
                  className="text-lg mb-8 italic"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Tu l'oublies pendant la grimpe. Mais lui, il n'oublie rien.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <span className="mr-4">
                      <Image src="/icons/icons8-objectif-50.png" alt="" width={32} height={32} className="object-contain" />
                    </span>
                    <div>
                      <h4
                        className="font-bold mb-1"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Capteurs de précision médicale
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Fréquence cardiaque précise à ±1 BPM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="mr-4">
                      <Image src="/icons/icons8-poids-léger-50.png" alt="" width={32} height={32} className="object-contain" />
                    </span>
                    <div>
                      <h4
                        className="font-bold mb-1"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Ultra-léger et confortable
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Tu oublies que tu le portes pendant l'escalade
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="mr-4">
                      <Image src="/icons/icons8-batterie-pleine-48.png" alt="" width={32} height={32} className="object-contain" />
                    </span>
                    <div>
                      <h4
                        className="font-bold mb-1"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Autonomie longue durée
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Jusqu'à 10 jours en usage quotidien
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="mr-4">
                      <Image src="/icons/icons8-idée-96.png" alt="" width={32} height={32} className="object-contain" />
                    </span>
                    <div>
                      <h4
                        className="font-bold mb-1"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Synchronisation automatique
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-roboto)',
                          color: 'var(--color-primary-green)'
                        }}
                      >
                        Tes données se synchronisent sans intervention
                      </p>
                    </div>
                  </div>
                </div>

                {/* Différentiation */}
                <div
                  className="p-6 mb-8"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                >
                  <p
                    className="text-sm mb-2 font-bold"
                    style={{
                      fontFamily: 'var(--font-roboto)',
                      color: 'var(--color-primary-green)'
                    }}
                  >
                    Pourquoi pas une Apple Watch ou Garmin ?
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: 'var(--font-roboto)',
                      color: 'var(--color-primary-green)',
                      lineHeight: '1.5'
                    }}
                  >
                    Notre bracelet est optimisé pour l'escalade : capteurs adaptés aux mouvements spécifiques,
                    algorithmes calibrés pour l'effort intermittent, et surtout, <strong>données exploitées intelligemment</strong>
                    dans l'app WAC (pas juste des graphs, mais des recommendations actionnables).
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/capteurs"
                  className="inline-block px-8 py-3 transition-all hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'white'
                  }}
                >
                  EN SAVOIR PLUS SUR LES CAPTEURS →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. QUI SOMMES-NOUS */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-5xl text-center mb-12"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
                data-aos="fade-up"
              >
                QUI SOMMES-NOUS ?
              </h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Photo Julien */}
                <div data-aos="fade-right">
                  <div
                    className="aspect-square bg-secondary-beige overflow-hidden shadow-lg"
                    style={{
                      backgroundImage: 'url(/photo-julien.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '0'
                    }}
                  />
                </div>

                {/* Texte */}
                <div data-aos="fade-left">
                  <p
                    className="text-lg md:text-xl mb-6 leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)' }}
                  >
                    Je m'appelle <strong>Julien</strong> et j'ai créé We Are Climbers après une double tendinite
                    à chaque bras, sans jamais réussir à percer mes plafonds de verre.
                  </p>

                  <p
                    className="text-lg md:text-xl mb-6 leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)' }}
                  >
                    Aucune app ne me disait de me reposer. Aucun outil ne m'aidait à comprendre mon corps,
                    mes mouvements, mes efforts.
                  </p>

                  <p
                    className="text-lg md:text-xl mb-6 leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)' }}
                  >
                    Alors j'ai décidé de créer l'app que j'aurais voulu avoir.
                  </p>

                  <p
                    className="text-xl md:text-2xl mb-6"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--color-secondary-orange)'
                    }}
                  >
                    PAS UNE APP QUI JUGE.
                    <br />
                    UNE APP QUI COMPREND.
                  </p>

                  <p
                    className="text-lg md:text-xl mb-8 leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)' }}
                  >
                    Mais je ne voulais pas créer une app de plus qui détruise notre planète.
                    Alors <strong>WAC est éco-conçue dès la première ligne de code.</strong>
                  </p>

                  <Link
                    href="/histoire"
                    className="inline-block px-8 py-3 transition-all hover:scale-105"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '1rem',
                      backgroundColor: 'var(--color-secondary-orange)',
                      color: 'white'
                    }}
                  >
                    DÉCOUVRE NOTRE HISTOIRE →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRICING - COMMENTÉ TEMPORAIREMENT (à réutiliser après lancement public) */}
        {/*
        <section
          id="pricing"
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl text-center mb-4"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
            >
              TARIFS
            </h2>
            <p
              className="text-center mb-16 text-lg max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--font-roboto)',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Essaie l'app gratuitement. Quand tu es prêt·e, ajoute le bracelet pour débloquer tout le potentiel.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>

            <div
              className="max-w-4xl mx-auto p-8"
              style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
            >
              <h3
                className="text-2xl mb-6 text-center"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  color: 'var(--color-primary-green)'
                }}
              >
                MODULES COMPLÉMENTAIRES À VENIR
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingModules.map((module) => (
                  <div key={module.id} className="text-center">
                    <div className="mb-2 flex justify-center">
                      <Image src={module.icon} alt="" width={48} height={48} className="object-contain" />
                    </div>
                    <h4
                      className="font-bold mb-1"
                      style={{
                        fontFamily: 'var(--font-roboto)',
                        color: 'var(--color-primary-green)'
                      }}
                    >
                      {module.name}
                    </h4>
                    <p
                      className="text-sm mb-2"
                      style={{
                        fontFamily: 'var(--font-roboto)',
                        color: 'var(--color-primary-green)'
                      }}
                    >
                      {module.description}
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        fontFamily: 'var(--font-roboto)',
                        color: 'var(--color-secondary-beige-light)',
                        fontStyle: 'italic'
                      }}
                    >
                      {module.availableFrom}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        */}

        {/* 8. FAQ */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl text-center mb-16"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
            >
              QUESTIONS FRÉQUENTES
            </h2>

            <div className="max-w-4xl mx-auto">
              {faqItems.map((item) => (
                <FAQItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* 9. TÉMOIGNAGES */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl text-center mb-4"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
            >
              ILS GRIMPENT AVEC WAC
            </h2>
            <p
              className="text-center mb-16 text-lg"
              style={{
                fontFamily: 'var(--font-roboto)',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Ce qu'en disent vraiment les grimpeur·ses
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom text-center" data-aos="fade-up">
            <h2
              className="text-3xl md:text-5xl mb-6"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}
            >
              PRÊT·E À NOUS REJOINDRE ?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)' }}
            >
              Rejoins le mouvement. Reste informé·e du lancement du crowdfunding en Mai 2026.
            </p>
            <div className="flex justify-center">
              <Link href="/early-access" className="btn-secondary">
                Reste informé du crowdfunding
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
