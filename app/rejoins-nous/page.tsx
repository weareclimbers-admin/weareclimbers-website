'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import CountdownTimer from '@/components/CountdownTimer'
import PackCard from '@/components/PackCard'
import PressFeature from '@/components/PressFeature'
import Image from 'next/image'
import Link from 'next/link'
import { CAMPAIGN, CONTREPARTIES } from '@/lib/campaign'
import { DERNIER_ARTICLE } from '@/lib/press'

const betaTesteurs = [
  {
    prenom: 'ELSA',
    nom: 'Ravinet',
    niveau: 'Athlète haut niveau',
    description: 'Finaliste Championnats de France Senior',
    photo: '/images/rejoins-nous/beta-testeurs/elsa-ravinet.webp',
  },
  {
    prenom: 'EDWIN',
    nom: 'Gaufrès',
    niveau: 'Équipe de France Militaire',
    description: 'Athlète de haut niveau',
    photo: '/images/rejoins-nous/beta-testeurs/edwin-gaufres.png',
  },
  {
    prenom: 'CORALINE',
    nom: 'Ribeil',
    niveau: 'Athlète bloc',
    description: 'Ouvreuse salles parisiennes',
    photo: '/images/rejoins-nous/beta-testeurs/Coraline-Ribeil.jpg',
  },
  {
    prenom: 'SAMUEL',
    nom: 'Guilbault',
    niveau: 'Haut niveau',
    description: 'Team Départ, Gironde',
    photo: '/images/rejoins-nous/beta-testeurs/samuel-guilbault.jpeg',
  },
  {
    prenom: 'AMANDINE',
    nom: 'Durand',
    niveau: 'Athlète haut niveau',
    description: 'Team 33 diff & bloc',
    photo: '/images/rejoins-nous/beta-testeurs/amandine-durand.jpg',
  },
  {
    prenom: 'CHARLES',
    nom: 'Mousseigne',
    niveau: 'Expert',
    description: 'Bloc indoor & outdoor',
    photo: '/images/rejoins-nous/beta-testeurs/charles-mousseigne.png',
  },
  {
    prenom: 'HÉLÈNE',
    nom: 'Charpentier',
    niveau: 'Athlète haut niveau',
    description: 'Team 33 diff & bloc',
    photo: '/images/rejoins-nous/beta-testeurs/helene-charpentier.jpg',
  },
  {
    prenom: 'SÉBASTIEN',
    nom: 'Lecat',
    niveau: 'Intermédiaire',
    description: 'Rouge/Noir Arkose',
    photo: '/images/rejoins-nous/beta-testeurs/sebastien-lecat.jpeg',
  },
  {
    prenom: 'AURÉLIEN',
    nom: 'Poullain',
    niveau: 'Confirmé',
    description: 'Bloc & voie, indoor & outdoor',
    photo: '/images/rejoins-nous/beta-testeurs/aurelien-poulain.jpeg',
  },
]

export default function RejoinsNous() {
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
        name: 'Rejoins-nous',
        item: 'https://www.weareclimbers.fr/rejoins-nous'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>

        {/* BLOC 1 — HERO */}
        <section
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          {/* Background Image */}
          <Image
            src="/hero-rejoins-nous.webp"
            alt="Rejoins le mouvement We Are Climbers"
            fill
            priority={true}
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary-green opacity-70 z-0" />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              <h1
                className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
                style={{
                  color: 'var(--color-primary-beige)',
                  fontFamily: 'var(--font-syne)',
                }}
                data-aos="fade-up"
              >
                Sois parmi les premiers à grimper avec WAC.
              </h1>

              <p
                className="text-lg md:text-xl font-roboto mb-12 max-w-3xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-primary-beige)', opacity: 0.9 }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                La campagne Ulule est lancée. Soutiens We Are Climbers, sécurise ton bracelet Polar 360 et ton accès à vie à l'app — jusqu'au 24 juin.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <a
                  href={CAMPAIGN.ululeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Je soutiens WAC sur Ulule
                </a>
                <a
                  href="#campagne"
                  className="btn-beige"
                >
                  Voir la campagne
                </a>
              </div>

            </div>
          </div>
        </section>


        {/* BLOC 1.5 — CAMPAGNE ULULE EN COURS */}
        <section
          id="campagne"
          className="py-20 md:py-28"
          style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">

              <p
                className="text-sm md:text-base mb-4 font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-syne)',
                  letterSpacing: '0.1em',
                  color: 'var(--color-secondary-orange)'
                }}
                data-aos="fade-up"
              >
                Campagne en cours
              </p>

              <h2
                className="text-4xl md:text-6xl mb-6"
                style={{ fontFamily: 'var(--font-syne)' }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                La campagne Ulule est lancée.
              </h2>

              <p
                className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-roboto"
                style={{ opacity: 0.9, lineHeight: '1.6' }}
                data-aos="fade-up"
                data-aos-delay="150"
              >
                Nous avons déjà atteint <strong>{CAMPAIGN.percentReached}%</strong> de notre objectif grâce aux premiers soutiens. Tu peux nous rejoindre jusqu'au 24 juin.
              </p>

              {/* Compte à rebours */}
              <div className="mb-14" data-aos="fade-up" data-aos-delay="200">
                <CountdownTimer variant="large" />
              </div>

              {/* Vidéo YouTube */}
              <div
                className="relative mx-auto mb-12 shadow-2xl overflow-hidden"
                style={{ maxWidth: '900px', aspectRatio: '16 / 9' }}
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${CAMPAIGN.videoYoutubeId}`}
                  title="Vidéo de présentation We Are Climbers"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Gros CTA Ulule */}
              <div data-aos="fade-up" data-aos-delay="300">
                <a
                  href={CAMPAIGN.ululeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-5 md:px-12 md:py-6 text-base md:text-xl font-bold uppercase transition-opacity hover:opacity-90"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Je soutiens We Are Climbers
                </a>
                <p
                  className="text-sm font-roboto mt-4"
                  style={{ opacity: 0.7 }}
                >
                  Redirection vers Ulule. Paiement sécurisé.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* BLOC 2 — HISTOIRE FONDATEUR */}
        <section id="histoire" className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">

              <div className="mb-12 text-center" data-aos="fade-up">
                <h2
                  className="text-3xl md:text-5xl"
                  style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                >
                  Une blessure. Une frustration. Une décision.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">

                <div className="md:col-span-2" data-aos="fade-right">
                  <div className="relative aspect-square max-w-xs mx-auto overflow-hidden shadow-lg">
                    <Image
                      src="/julien-bloc.jpeg"
                      alt="Julien, fondateur de We Are Climbers"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p
                    className="text-center text-xs mt-3 font-roboto"
                    style={{ color: 'var(--color-primary-green)', opacity: 0.5 }}
                  >
                    © Benjamin Gardey
                  </p>
                </div>

                <div className="md:col-span-3 space-y-6 font-roboto text-lg leading-relaxed" style={{ color: 'var(--color-primary-green)' }}>
                  <p data-aos="fade-up">
                    Je m'appelle <strong>Julien</strong>. En été 2024, après un an de grimpe intensive, je me retrouve avec une double tendinite aux deux bras et bloqué en 6a depuis trois mois.
                  </p>
                  <p data-aos="fade-up" data-aos-delay="100">
                    Je grimpais quatre fois par semaine. Je forçais. Et aucune app ne me disait pourquoi mon corps lâchait — ni quand m'arrêter.
                  </p>
                  <p data-aos="fade-up" data-aos-delay="200">
                    J'ai cherché des outils. J'ai trouvé des montres qui me disaient 'pousse plus fort'. Alors j'ai décidé de créer l'app que j'aurais voulu avoir. Celle qui comprend ton corps au lieu de le juger.
                  </p>
                  <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="border-l-4 pl-6 italic text-xl"
                    style={{ borderColor: 'var(--color-secondary-orange)' }}
                  >
                    "La grimpe mérite mieux que des apps qui te jugent. Elle mérite une app qui te comprend."
                    <br />
                    <span className="text-base not-italic font-bold" style={{ color: 'var(--color-secondary-orange)' }}>
                      — Julien, fondateur de We Are Climbers
                    </span>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="400">
                    <Link
                      href="/histoire"
                      className="text-secondary-orange font-roboto hover:underline text-lg"
                    >
                      Lire toute l'histoire →
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* BLOC 3 — LES PACKS */}
        <section
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-14" data-aos="fade-up">
                <h2
                  className="text-3xl md:text-5xl mb-4"
                  style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                >
                  Choisis ta contrepartie.
                </h2>
              </div>

              {/* Cards générées dynamiquement depuis CONTREPARTIES (lib/campaign.ts) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {CONTREPARTIES.map((pack, i) => (
                  <PackCard key={pack.id} pack={pack} animationDelay={i * 100} />
                ))}
              </div>

              {/* Note sous les packs */}
              <div
                className="p-6 text-center"
                style={{ backgroundColor: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <p
                  className="text-sm font-roboto italic"
                  style={{ color: 'var(--color-primary-green)', opacity: 0.7 }}
                >
                  Paiement sécurisé sur Ulule. Livraison estimée après la clôture de la campagne. Détails complets et autres contreparties sur la page Ulule.
                </p>
              </div>

              {/* CTA sous les packs */}
              <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="300">
                <a
                  href={CAMPAIGN.ululeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  Voir toute la campagne sur Ulule
                </a>
              </div>

            </div>
          </div>
        </section>


        {/* BLOC 4 — PLAN EN 3 ÉTAPES */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-14" data-aos="fade-up">
                <h2
                  className="text-3xl md:text-5xl"
                  style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                >
                  Comment ça se passe ?
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

                {/* Étape 1 */}
                <div className="text-center" data-aos="fade-up" data-aos-delay="0">
                  <div
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: 'var(--color-secondary-orange)',
                      color: 'var(--color-primary-beige)',
                      fontFamily: 'var(--font-syne)',
                      borderRadius: '50%'
                    }}
                  >
                    1
                  </div>
                  <h3
                    className="text-xl md:text-2xl mb-4"
                    style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                  >
                    Maintenant
                  </h3>
                  <p
                    className="font-roboto leading-relaxed"
                    style={{ color: 'var(--color-primary-green)' }}
                  >
                    Tu soutiens WAC sur Ulule en choisissant ta contrepartie. Paiement sécurisé. Aucun débit avant la clôture.
                  </p>
                </div>

                {/* Étape 2 */}
                <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                  <div
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: 'var(--color-secondary-orange)',
                      color: 'var(--color-primary-beige)',
                      fontFamily: 'var(--font-syne)',
                      borderRadius: '50%'
                    }}
                  >
                    2
                  </div>
                  <h3
                    className="text-xl md:text-2xl mb-4"
                    style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                  >
                    24 juin 2026
                  </h3>
                  <p
                    className="font-roboto leading-relaxed"
                    style={{ color: 'var(--color-primary-green)' }}
                  >
                    Clôture de la campagne. Si l'objectif est atteint, ta contribution est débitée et la production démarre.
                  </p>
                </div>

                {/* Étape 3 */}
                <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                  <div
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold"
                    style={{
                      backgroundColor: 'var(--color-secondary-orange)',
                      color: 'var(--color-primary-beige)',
                      fontFamily: 'var(--font-syne)',
                      borderRadius: '50%'
                    }}
                  >
                    3
                  </div>
                  <h3
                    className="text-xl md:text-2xl mb-4"
                    style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                  >
                    Après la clôture
                  </h3>
                  <p
                    className="font-roboto leading-relaxed"
                    style={{ color: 'var(--color-primary-green)' }}
                  >
                    Production et livraison des premières unités. Tous les soutiens reçoivent leur bracelet en livraison prioritaire. Tu grimpes avec WAC.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* BLOC 5 — PREUVES & CRÉDIBILITÉ */}
        <section
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">

              <div className="text-center mb-12" data-aos="fade-up">
                <h2
                  className="text-3xl md:text-5xl"
                  style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                >
                  WAC n'est pas seul dans cette aventure.
                </h2>
              </div>

              {/* 3 stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                  className="p-8 text-center"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                >
                  <p
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                  >
                    130
                  </p>
                  <p className="font-roboto text-base" style={{ color: 'var(--color-primary-green)' }}>
                    grimpeurs ont participé au sondage initial
                  </p>
                </div>
                <div
                  className="p-8 text-center"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <p
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ color: 'var(--color-secondary-orange)', fontFamily: 'var(--font-syne)' }}
                  >
                    70
                  </p>
                  <p className="font-roboto text-base" style={{ color: 'var(--color-primary-beige)' }}>
                    ont décidé de suivre le projet
                  </p>
                </div>
                <div
                  className="p-8 text-center"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <p
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                  >
                    9
                  </p>
                  <p className="font-roboto text-base" style={{ color: 'var(--color-primary-green)' }}>
                    grimpeurs en bêta-test actif
                  </p>
                </div>
              </div>

              {/* Sous-titre beta-testeurs */}
              <div className="text-center mb-14" data-aos="fade-up">
                <p
                  className="text-lg md:text-xl font-roboto leading-relaxed max-w-3xl mx-auto"
                  style={{ color: 'var(--color-primary-green)' }}
                >
                  Pas des testeurs payés. Des grimpeurs qui ont dit oui parce qu'ils croient au projet. Leurs retours façonnent directement l'app.
                </p>
              </div>

              {/* Grille des 9 beta-testeurs */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-10 max-w-5xl mx-auto mb-6">
                {betaTesteurs.slice(0, 5).map((tester, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                  >
                    <div
                      className="relative mb-4 overflow-hidden"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '3px solid var(--color-primary-green)',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={tester.photo}
                        alt={`${tester.prenom} ${tester.nom}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p
                      className="font-bold text-sm leading-tight"
                      style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                    >
                      {tester.prenom}
                    </p>
                    <p
                      className="text-xs font-roboto mt-1"
                      style={{ color: 'var(--color-secondary-orange)', fontWeight: 600 }}
                    >
                      {tester.niveau}
                    </p>
                    <p
                      className="text-xs font-roboto mt-0.5"
                      style={{ color: 'var(--color-primary-green)', opacity: 0.6 }}
                    >
                      {tester.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto">
                {betaTesteurs.slice(5).map((tester, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center"
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                  >
                    <div
                      className="relative mb-4 overflow-hidden"
                      style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '3px solid var(--color-primary-green)',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={tester.photo}
                        alt={`${tester.prenom} ${tester.nom}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p
                      className="font-bold text-sm leading-tight"
                      style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                    >
                      {tester.prenom}
                    </p>
                    <p
                      className="text-xs font-roboto mt-1"
                      style={{ color: 'var(--color-secondary-orange)', fontWeight: 600 }}
                    >
                      {tester.niveau}
                    </p>
                    <p
                      className="text-xs font-roboto mt-0.5"
                      style={{ color: 'var(--color-primary-green)', opacity: 0.6 }}
                    >
                      {tester.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* BLOC 5 (suite) — FFME */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">

              <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">

                <div
                  className="md:col-span-2 flex items-center justify-center"
                  data-aos="fade-right"
                >
                  <div className="relative w-72 h-72 md:w-96 md:h-96">
                    <Image
                      src="/liguenaffme.png"
                      alt="FFME — Ligue Nouvelle-Aquitaine"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="md:col-span-3 space-y-5" data-aos="fade-left">
                  <p
                    className="font-roboto text-lg leading-relaxed"
                    style={{ color: 'var(--color-primary-green)' }}
                  >
                    We Are Climbers est développé en collaboration officielle avec la Ligue Nouvelle-Aquitaine de la FFME. Des grimpeuses et coachs fédéraux participent au bêta-test et alimentent directement le développement de l'app.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* BLOC 5 (suite) — PRESSE */}
        {DERNIER_ARTICLE && (
          <section className="pb-20 md:pb-32" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
            <div className="container-custom">
              <PressFeature article={DERNIER_ARTICLE} variant="medium" />
            </div>
          </section>
        )}


        {/* BLOC 6 — CE QUE TU REÇOIS EN T'INSCRIVANT */}
        <section
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">

              <div className="text-center mb-14" data-aos="fade-up">
                <h2
                  className="text-3xl md:text-5xl"
                  style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                >
                  Pas prêt à soutenir ? Reste en contact.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '📬',
                    titre: 'Les coulisses du projet',
                    texte: 'Avancement du bêta-test, décisions de conception, retours des testeurs — avant tout le monde.',
                  },
                  {
                    icon: '📣',
                    titre: 'Suivi de la campagne',
                    texte: "Les updates de la campagne Ulule et les annonces clés directement dans ta boîte mail.",
                  },
                  {
                    icon: '🚀',
                    titre: 'Lancement public',
                    texte: "Après la campagne, sois averti dès la mise en vente publique du bracelet et de l'app.",
                  },
                  {
                    icon: '🎙️',
                    titre: 'Ton avis compte',
                    texte: 'Sondages, votes sur les fonctionnalités — tu participes à construire WAC.',
                  },
                ].map((raison, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-6"
                    style={{
                      backgroundColor: 'var(--color-primary-beige)',
                    }}
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <span className="text-3xl flex-shrink-0">{raison.icon}</span>
                    <div>
                      <p
                        className="font-bold text-base mb-2"
                        style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}
                      >
                        {raison.titre}
                      </p>
                      <p
                        className="font-roboto text-sm leading-relaxed"
                        style={{ color: 'var(--color-primary-green)' }}
                      >
                        {raison.texte}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* BLOC 7 — FORMULAIRE NEWSLETTER */}
        <section
          id="newsletter"
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--color-primary-green)' }}
        >
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">

              <div className="mb-10" data-aos="fade-up">
                <h2
                  className="text-3xl md:text-5xl leading-tight mb-4"
                  style={{ color: 'var(--color-primary-beige)', fontFamily: 'var(--font-syne)' }}
                >
                  Reste dans la boucle.
                </h2>
                <p
                  className="text-lg md:text-xl font-roboto"
                  style={{ color: 'var(--color-primary-beige)', opacity: 0.85 }}
                >
                  Pas envie de soutenir maintenant ? Inscris-toi pour suivre la campagne et être averti à la mise en vente publique.
                </p>
              </div>

              <div data-aos="fade-up" data-aos-delay="100">
                <NewsletterForm variant="footer" buttonText="Je m'inscris" />
              </div>

              <p
                className="text-sm mt-4 opacity-75"
                style={{ color: 'var(--color-primary-beige)', fontFamily: 'var(--font-roboto)' }}
              >
                0 spam. Désinscription en 1 clic.
              </p>

              <div
                className="mt-14 pt-10"
                style={{ borderTop: '1px solid rgba(245,236,229,0.2)' }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">

                  <div className="md:col-span-2">
                    <div className="relative aspect-square max-w-xs mx-auto">
                      <Image
                        src="/photo-julien.png"
                        alt="Julien, fondateur de We Are Climbers"
                        fill
                        className="object-cover shadow-lg"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <blockquote>
                      <p
                        className="text-lg md:text-xl italic font-roboto leading-relaxed mb-4"
                        style={{ color: 'var(--color-primary-beige)', opacity: 0.85 }}
                      >
                        "Je ne crée pas WAC pour lever des millions. Je la crée parce que j'aurais voulu l'avoir quand je plafonnais avec mes tendinites. Si tu te reconnais dans cette galère, rejoins-nous. On va grimper mieux, plus longtemps."
                      </p>
                      <footer
                        className="font-bold text-sm"
                        style={{ color: 'var(--color-secondary-orange)', fontFamily: 'var(--font-syne)' }}
                      >
                        — JULIEN, FONDATEUR WAC
                      </footer>
                    </blockquote>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
