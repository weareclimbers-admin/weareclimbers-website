import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CampaignBanner from '@/components/CampaignBanner'
import Link from 'next/link'
import Image from 'next/image'
import FAQItem from '@/components/FAQItem'
import { faqItems } from '@/lib/faq'
import { CAMPAIGN } from '@/lib/campaign'

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
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
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <CampaignBanner />

      <main className="bg-primary-beige">
        {/* BLOC 1 — HERO */}
        <section
          className="pt-32 pb-12 md:py-32 relative"
          style={{
            color: 'var(--color-primary-beige)'
          }}
        >
          {/* Background Image */}
          <Image
            src="/hero-home.webp"
            alt="Grimpeur en action - We Are Climbers"
            fill
            priority={true}
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-green opacity-70 z-0"></div>

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
                Grimpons mieux, plus longtemps.
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-2xl mb-6 max-w-3xl mx-auto"
                style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.5', fontWeight: 500 }}
              >
                L'analyse physiologique intelligente pour grimpeurs et grimpeuses.
              </p>

              {/* Corps */}
              <p
                className="text-base md:text-xl mb-10 max-w-3xl mx-auto"
                style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.5', fontWeight: 400 }}
              >
                Parce que la vraie performance, c'est la progression durable. Pas grimper fort une fois.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CAMPAIGN.ululeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Je soutiens WAC sur Ulule
                </a>
                <Link href="#produit" className="btn-beige">
                  Découvrir comment ça marche
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © Kristine Varga
          </div>
        </section>

        {/* BLOC 2 — LE CONSTAT */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-5xl mb-12 text-center"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.2'
                }}
                data-aos="fade-up"
              >
                La technologie a transformé tous les sports. Mais pas l'escalade — ou alors, mal.
              </h2>

              <div className="space-y-6 mb-10" data-aos="fade-up" data-aos-delay="100">
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Tu grimpes régulièrement. Tu t'entraînes avec sérieux. Et pourtant tu stagnes, tu accumules les douleurs, ou tu t'es blessé sans vraiment comprendre pourquoi.
                </p>

                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  Ce n'est pas un manque d'engagement. C'est un manque d'information.
                </p>
              </div>

              {/* Citation Julien */}
              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-secondary-beige-light)',
                  borderLeft: '4px solid var(--color-secondary-orange)'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p
                  className="text-lg md:text-xl italic mb-4"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  "J'ai créé WAC après une double tendinite aux deux bras. Aucune app ne me disait de me reposer. Aucun outil ne m'aidait à comprendre ce que mon corps traversait. J'ai construit ce que j'aurais voulu avoir."
                </p>
                <p
                  className="text-base font-bold"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)'
                  }}
                >
                  — Julien, fondateur de We Are Climbers
                </p>
              </div>

              <p
                className="text-lg md:text-xl leading-relaxed text-center"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6'
                }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                WAC est né de ce constat simple : les grimpeurs méritent des outils à la hauteur de leur pratique.
              </p>
            </div>
          </div>
        </section>

        {/* BLOC 3 — LE PRODUIT */}
        <section
          id="produit"
          className="py-20"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl text-center mb-8"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)'
              }}
              data-aos="fade-up"
            >
              La première analyse physiologique pensée pour l'escalade.
            </h2>

            <p
              className="text-lg md:text-xl max-w-4xl mx-auto text-center mb-16 leading-relaxed"
              style={{
                fontFamily: 'var(--font-roboto)',
                color: 'var(--color-primary-green)',
                lineHeight: '1.6'
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Un bracelet léger, sans écran, porté pendant tes sessions. Une app qui analyse tes données physiologiques en temps réel — fréquence cardiaque à ±1 BPM, récupération, zones d'effort — et te donne des recommandations concrètes pour progresser sans t'abîmer.
              <br /><br />
              <strong>Pas des graphiques de plus. Une compréhension de ton corps que tu n'avais pas avant.</strong>
            </p>

            {/* 3 piliers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Pilier 1 — Entraînement intentionnel */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
                data-aos-delay="0"
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
                  Objectifs personnalisés, analyse de tes zones d'effort, patterns de récupération. Tu comprends enfin comment tu grimpes — pour grimper mieux.
                </p>
              </div>

              {/* Pilier 2 — Prévention des blessures */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
                data-aos-delay="100"
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
                  WAC t'alerte avant que ton corps craque. Suivi de récupération, charge d'entraînement hebdomadaire, recommandations adaptées à ton état physiologique réel.
                </p>
              </div>

              {/* Pilier 3 — Analyse adaptée à chaque corps */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="mb-4">
                  <Image src="/icons/icons8-cycle-menstruel-64.png" alt="" width={48} height={48} className="object-contain" />
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    color: 'var(--color-primary-green)'
                  }}
                >
                  Analyse adaptée à chaque corps
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  WAC s'adapte aux spécificités physiologiques de chaque grimpeur. Y compris aux variations hormonales liées au cycle menstruel — une première dans l'escalade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 4 — PREUVES & CRÉDIBILITÉ */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
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
              Une technologie validée sur le terrain.
            </h2>

            {/* Sous-bloc Application mobile */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Mock téléphone */}
                <div className="flex justify-center" data-aos="fade-right">
                  <div className="relative" style={{ width: '240px' }}>
                    <div
                      className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                      style={{
                        backgroundColor: 'var(--color-primary-green)',
                        padding: '12px 10px',
                        border: '3px solid var(--color-primary-green)',
                      }}
                    >
                      {/* Encoche */}
                      <div
                        className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
                        style={{ width: '56px', height: '14px', backgroundColor: 'var(--color-primary-green)' }}
                      />
                      {/* Écran */}
                      <div
                        className="relative overflow-hidden"
                        style={{ borderRadius: '2rem', aspectRatio: '9/19.5', backgroundColor: '#1a1a2e' }}
                      >
                        <Image
                          src="/images/rejoins-nous/screenshot-perf.jpg"
                          alt="WAC — Analyse de performance escalade"
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      {/* Barre home */}
                      <div
                        className="mx-auto mt-2 rounded-full"
                        style={{ width: '38px', height: '4px', backgroundColor: 'rgba(245,236,229,0.3)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Texte app */}
                <div data-aos="fade-left">
                  <p
                    className="text-lg md:text-xl leading-relaxed mb-8"
                    style={{
                      fontFamily: 'var(--font-roboto)',
                      color: 'var(--color-primary-green)',
                      lineHeight: '1.6'
                    }}
                  >
                    Une app qui analyse tes données physiologiques en temps réel et te donne des recommandations concrètes pour progresser sans t'abîmer.
                    <br /><br />
                    Pas des graphiques de plus. Une compréhension de ton corps que tu n'avais pas avant.
                  </p>

                  <ul className="space-y-3">
                    {[
                      'Analyse physiologique en temps réel',
                      'Prévention des blessures',
                      'Analyse du cycle menstruel (optionnel)',
                      'Entraînement intentionnel',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span
                          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
                        >
                          ✓
                        </span>
                        <span style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            {/* Sous-bloc Bracelet Polar */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
                {/* Image bracelet */}
                <div className="flex items-center justify-center aspect-square">
                  <Image
                    src="/téléchargement (1).png"
                    alt="Bracelet Polar 360 WeAreClimbers"
                    width={600}
                    height={600}
                    className="object-contain w-full h-full p-4"
                  />
                </div>

                {/* Texte bracelet détaillé */}
                <div>
                  <p
                    className="text-lg md:text-xl leading-relaxed mb-8 italic"
                    style={{
                      fontFamily: 'var(--font-roboto)',
                      color: 'var(--color-primary-green)',
                      lineHeight: '1.6'
                    }}
                  >
                    Des capteurs de haute précision utilisés par les sportifs de haut niveau. Ultra-léger, discret, jusqu'à 10 jours d'autonomie. Tu l'oublies pendant la grimpe. Lui, n'oublie rien.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="mr-4">
                        <Image src="/icons/icons8-objectif-50.png" alt="" width={32} height={32} className="object-contain" />
                      </span>
                      <div>
                        <p
                          className="font-bold mb-1"
                          style={{
                            fontFamily: 'var(--font-roboto)',
                            color: 'var(--color-primary-green)'
                          }}
                        >
                          Capteurs de haute précision
                        </p>
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
                        <p
                          className="font-bold mb-1"
                          style={{
                            fontFamily: 'var(--font-roboto)',
                            color: 'var(--color-primary-green)'
                          }}
                        >
                          Ultra-léger et confortable
                        </p>
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
                        <p
                          className="font-bold mb-1"
                          style={{
                            fontFamily: 'var(--font-roboto)',
                            color: 'var(--color-primary-green)'
                          }}
                        >
                          Autonomie longue durée
                        </p>
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
                        <p
                          className="font-bold mb-1"
                          style={{
                            fontFamily: 'var(--font-roboto)',
                            color: 'var(--color-primary-green)'
                          }}
                        >
                          Synchronisation automatique
                        </p>
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
                </div>
              </div>
            </div>

            {/* Sous-bloc FFME */}
            <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
              <div className="flex justify-center mb-8">
                <div className="relative" style={{ width: '200px', height: '200px' }}>
                  <Image
                    src="/liguenaffme.png"
                    alt="Ligue Nationale FFME"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6'
                }}
              >
                We Are Climbers est développé en collaboration avec la Fédération Française de la Montagne et de l'Escalade. Des grimpeuses et coachs fédéraux testent l'app pour qu'elle soit à la hauteur des meilleurs.
              </p>
            </div>

            {/* Témoignages */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Témoignage Marie */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <p
                  className="text-lg mb-6 italic"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  "J'ai évité une tendinite grâce aux alertes récupération de WAC. L'app m'a conseillé de me reposer alors que je me sentais en pleine forme. Le bracelet avait vu avant moi ce que mon corps me cachait. Depuis six mois : zéro blessure, progression constante."
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)'
                  }}
                >
                  Marie, 7b, grimpe 3x/semaine
                </p>
              </div>

              {/* Témoignage Alex */}
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p
                  className="text-lg mb-6 italic"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)',
                    lineHeight: '1.6'
                  }}
                >
                  "Grâce au bracelet, j'ai compris que je grimpais systématiquement en zone rouge. WAC m'a montré comment doser mes efforts. Paradoxalement, depuis que j'en fais moins, je progresse plus vite."
                </p>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-green)'
                  }}
                >
                  Alex, 7a+, salle et falaise
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 5 — POUR QUI */}
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
                WAC n'est pas pour tout le monde.
              </h2>

              <p
                className="text-lg md:text-xl leading-relaxed mb-10"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                C'est pour le grimpeur régulier qui veut comprendre pourquoi il stagne. Pour la grimpeuse qui veut s'entraîner en phase avec son corps, pas contre lui. Pour quiconque a compris que grimper longtemps vaut mieux que grimper fort une seule saison.
                <br /><br />
                <strong>Si tu grimpes pour progresser durablement, WAC est fait pour toi.</strong>
              </p>

              <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link href="/nos-grimpeurs" className="btn-secondary">
                  Découvrir si WAC est fait pour moi
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 6 — FAQ */}
        <section
          className="py-20"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
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

        {/* BLOC 7 — VALEURS */}
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
                On ne fait pas une app de plus. On fait la bonne.
              </h2>

              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Éco-conçue dès la première ligne de code. Développée en France. Pensée pour que la technologie serve le grimpeur — pas l'inverse. Nos choix ne sont pas toujours les plus simples. Mais ils sont les plus justes.
              </p>
            </div>
          </div>
        </section>

        {/* BLOC 8 — CTA FINAL */}
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
              L'Accès Anticipé est ouvert.
            </h2>
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.6' }}
            >
              La campagne Ulule est en cours jusqu'au 24 juin. {CAMPAIGN.percentReached}% déjà atteints — rejoins les grimpeurs et grimpeuses qui ont déjà cru au projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CAMPAIGN.ululeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Je soutiens WAC sur Ulule
              </a>
              <Link href="/rejoins-nous" className="btn-beige">
                En savoir plus
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
