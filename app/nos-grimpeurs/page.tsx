'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function NosGrimpeurs() {
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
        name: 'Nos Grimpeurs',
        item: 'https://www.weareclimbers.fr/nos-grimpeurs'
      }
    ]
  };

  const [activeSection, setActiveSection] = useState('grimpeurs')
  const [isSticky, setIsSticky] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: 'grimpeurs', label: 'Grimpeurs' },
    { id: 'grimpeuses', label: 'Grimpeuses' },
    { id: 'salles', label: "Salles d'escalade" },
    { id: 'clubs', label: 'Clubs FFME' },
    { id: 'distributeurs', label: 'Distributeurs' },
  ]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top
        setIsSticky(navTop <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        {/* HERO */}
        <section
          className="relative py-32 overflow-hidden"
        >
          {/* Background Image */}
          <Image
            src="/hero-mission.webp"
            alt="Grimpeur en escalade - We Are Climbers"
            fill
            priority={true}
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-green opacity-70 z-0"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight font-syne text-primary-beige uppercase"
                data-aos="fade-up"
              >
                WAC n'est pas pour tout le monde.
                <br />
                C'est fait pour toi.
              </h1>

              <p
                className="text-lg md:text-xl font-roboto text-primary-beige leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Grimpeur amateur ou confirmé, salle indépendante ou club FFME — WAC s'adapte à ta réalité. Pas l'inverse.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10" style={{ color: 'var(--color-primary-beige)' }}>
            © Stacie Ong
          </div>
        </section>

        {/* NAVIGATION STICKY */}
        <div ref={navRef} className="relative">
          <nav
            className={`${
              isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : ''
            } transition-all duration-300`}
            style={{
              backgroundColor: 'var(--color-primary-beige)',
              zIndex: 1000,
            }}
          >
            <div className="container-custom relative">
              {/* Indicateur de scroll pour mobile - gradient gauche */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none md:hidden"
                style={{
                  background: 'linear-gradient(to right, var(--color-primary-beige), transparent)',
                  zIndex: 10,
                }}
              />

              {/* Indicateur de scroll pour mobile - gradient droite */}
              <div
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none md:hidden"
                style={{
                  background: 'linear-gradient(to left, var(--color-primary-beige), transparent)',
                  zIndex: 10,
                }}
              />

              <div className="flex overflow-x-auto scrollbar-hide">
                {sections.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="flex-shrink-0 px-6 py-4 font-bold text-sm md:text-base uppercase transition-all relative group"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      color:
                        activeSection === id
                          ? 'var(--color-primary-beige)'
                          : 'var(--color-primary-green)',
                      backgroundColor:
                        activeSection === id
                          ? 'var(--color-secondary-orange)'
                          : 'transparent',
                      margin: '4px',
                    }}
                  >
                    <span className="relative z-10">{label}</span>

                    {/* Hover effect - only for non-active buttons */}
                    {activeSection !== id && (
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          backgroundColor: 'var(--color-secondary-beige-light)',
                        }}
                      />
                    )}

                    {/* Active indicator */}
                    {activeSection === id && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1"
                        style={{
                          backgroundColor: 'var(--color-primary-beige)',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* SPACER for sticky nav */}
        {isSticky && <div style={{ height: '60px' }} />}

        {/* SECTION GRIMPEURS - sera ajoutée dans la partie 2 */}
        <section id="grimpeurs" className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Badge catégorie */}
              <div className="flex justify-center mb-6" data-aos="fade-up">
                <span
                  className="inline-block px-6 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Grimpeurs
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl mb-6 text-center"
                style={{
                  color: 'var(--color-primary-green)',
                  fontFamily: 'var(--font-syne)',
                  textTransform: 'uppercase',
                }}
                data-aos="fade-up"
              >
                Tu grimpes pour progresser. WAC est fait pour ça.
              </h2>

              <div className="space-y-6 mb-12" data-aos="fade-up" data-aos-delay="100">
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Tu grimpes 2 à 4 fois par semaine. Tu t'entraînes sérieusement. Et pourtant tu stagnes, tu accumules les douleurs, ou tu ne comprends pas pourquoi certaines séances sont catastrophiques.
                </p>
                <p
                  className="text-lg leading-relaxed font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Ce n'est pas un manque de volonté. C'est un manque de données.
                </p>
              </div>

              {/* 3 Cards arguments */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-objectif-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Comprends comment tu grimpes vraiment
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Zones d'effort, fréquence cardiaque à ±1 BPM, patterns de récupération. WAC t'explique ce que ton corps fait pendant que tu grimpes — pour que tu puisses grimper plus intelligemment.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-bouclier-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Grimpe plus longtemps sans te blesser
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    WAC t'alerte quand ton corps accumule trop de fatigue. Pas après la tendinite. Avant. Parce que grimper longtemps vaut mieux que grimper fort une seule saison.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-objectif-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Passe tes plafonds de verre
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Tu stagnes depuis 6 mois ? Ce n'est probablement pas un problème de technique. C'est un problème d'entraînement non intentionnel. WAC t'aide à identifier ce qui bloque et comment le corriger.
                  </p>
                </div>
              </div>

              {/* Témoignage */}
              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-primary-beige)',
                  borderLeft: '4px solid var(--color-secondary-orange)',
                }}
                data-aos="fade-up"
              >
                <p
                  className="text-lg md:text-xl italic mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  "Grâce au bracelet, j'ai compris que je grimpais systématiquement en zone rouge. WAC m'a montré comment doser mes efforts. Paradoxalement, depuis que j'en fais moins, je progresse plus vite."
                </p>
                <p
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}
                >
                  — Alex, 7a+, salle et falaise
                </p>
              </div>

              {/* CTA */}
              <div className="text-center" data-aos="fade-up">
                <Link href="/rejoins-nous" className="btn-secondary inline-block">
                  Rejoindre le mouvement
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION GRIMPEUSES */}
        <section
          id="grimpeuses"
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Badge catégorie */}
              <div className="flex justify-center mb-6" data-aos="fade-up">
                <span
                  className="inline-block px-6 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Grimpeuses
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl mb-6 text-center"
                style={{
                  color: 'var(--color-primary-green)',
                  fontFamily: 'var(--font-syne)',
                  textTransform: 'uppercase',
                }}
                data-aos="fade-up"
              >
                Ton corps a son propre rythme. WAC est la première app à le comprendre.
              </h2>

              <div className="space-y-6 mb-12" data-aos="fade-up" data-aos-delay="100">
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Certaines semaines tu grimpes comme une déesse. D'autres, tu tiens à peine 3 mouvements. Et personne ne t'a jamais vraiment expliqué pourquoi.
                </p>
                <p
                  className="text-lg leading-relaxed font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Ce n'est pas dans ta tête. C'est dans ton corps. Et ton corps mérite d'être compris, pas jugé.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-cycle-menstruel-64.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    L'analyse hormonale — une première dans l'escalade
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    WAC intègre l'impact de ton cycle menstruel sur ta performance. Force et intensité en phase folliculaire, technique et endurance en phase lutéale. Tu adaptes ton entraînement à ton corps — pas l'inverse.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-cadenas-ouvert-48.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Fini la culpabilité des mauvais jours
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Tes variations de performance ont une explication physiologique. WAC te la donne — pour que tu arrêtes de te blâmer et que tu commences à grimper en phase avec toi-même.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-bouclier-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Prévention pensée pour ton corps
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Alertes récupération, suivi de charge d'entraînement, recommandations adaptées à ton profil physiologique réel. Pas un programme générique conçu pour un corps masculin.
                  </p>
                </div>
              </div>

              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-primary-beige)',
                  borderLeft: '4px solid var(--color-secondary-orange)',
                }}
                data-aos="fade-up"
              >
                <p
                  className="text-lg md:text-xl italic mb-4 leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  "WAC m'a montré que mes 'mauvais jours' étaient systématiquement liés à ma phase lutéale. Maintenant j'adapte mes sessions selon mon cycle. Fini la culpabilité — mon corps n'est pas défaillant, il a juste son propre rythme."
                </p>
                <p
                  className="font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}
                >
                  — Léa, 6b+, grimpe depuis 2 ans
                </p>
              </div>

              <div className="text-center" data-aos="fade-up">
                <Link href="/rejoins-nous" className="btn-secondary inline-block">
                  Rejoindre le mouvement
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION SALLES D'ESCALADE */}
        <section id="salles" className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Badge catégorie */}
              <div className="flex justify-center mb-6" data-aos="fade-up">
                <span
                  className="inline-block px-6 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Salles d'escalade
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl mb-6 text-center"
                style={{
                  color: 'var(--color-primary-green)',
                  fontFamily: 'var(--font-syne)',
                  textTransform: 'uppercase',
                }}
                data-aos="fade-up"
              >
                Différenciez-vous. Fidélisez vos grimpeurs.
              </h2>

              <div className="space-y-6 mb-12" data-aos="fade-up" data-aos-delay="100">
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Vos adhérents progressent ailleurs. Ils réservent leurs créneaux chez vous, mais s'entraînent avec les apps de la concurrence. Vos ouvreurs créent des voies exceptionnelles — mais vous n'avez aucun moyen de prouver que vos blocs développent vraiment l'endurance ou la force explosive.
                </p>
                <p
                  className="text-lg leading-relaxed font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  WAC transforme votre salle en terrain d'entraînement scientifique. Et ça, aucune autre salle ne peut le proposer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-médaille-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Un avantage concurrentiel inédit
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Vos adhérents accèdent à des données physiologiques exploitables pendant qu'ils grimpent chez vous. Aucune autre salle ne peut offrir ça. Résultat : fidélisation, bouche-à-oreille, différenciation réelle.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-égalité-des-sexes-30.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Une offre inclusive par défaut
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    WAC intègre l'analyse du cycle menstruel de manière native. Vos grimpeuses se sentent enfin comprises — et elles le diront autour d'elles. L'inclusivité n'est plus un discours : c'est une technologie.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-bouclier-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Prévenez les blessures, gardez vos adhérents
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Un grimpeur blessé arrête son abonnement. WAC alerte vos adhérents avant qu'ils ne se blessent — et vous permet de positionner votre salle comme un lieu qui prend soin de ses grimpeurs.
                  </p>
                </div>
              </div>

              {/* Modèle commercial */}
              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-secondary-beige-light)',
                  border: '2px solid var(--color-secondary-orange)',
                }}
                data-aos="fade-up"
              >
                <h3
                  className="text-2xl mb-4 font-bold"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                >
                  Modèle commercial
                </h3>
                <ul
                  className="space-y-3 text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Bracelets disponibles à <strong>110€ HT l'unité</strong> (tarif distributeur)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Revendez-les à vos adhérents au prix souhaité (suggestion : 120-130€)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>L'application WAC reste gratuite pour vos adhérents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Pas d'exclusivité territoriale imposée — vous gardez votre liberté</span>
                  </li>
                </ul>
              </div>

              <div className="text-center" data-aos="fade-up">
                <Link href="/contact" className="btn-secondary inline-block">
                  Devenir salle partenaire
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION CLUBS FFME */}
        <section
          id="clubs"
          className="py-20 md:py-32"
          style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Badge catégorie */}
              <div className="flex justify-center mb-6" data-aos="fade-up">
                <span
                  className="inline-block px-6 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Clubs FFME
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl mb-6 text-center"
                style={{
                  color: 'var(--color-primary-green)',
                  fontFamily: 'var(--font-syne)',
                  textTransform: 'uppercase',
                }}
                data-aos="fade-up"
              >
                Formez des athlètes. Pas juste des grimpeurs.
              </h2>

              <div className="space-y-6 mb-12" data-aos="fade-up" data-aos-delay="100">
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Vos licenciés s'entraînent dur. Ils suivent vos plans. Mais vous n'avez aucun moyen objectif de mesurer leur progression physiologique — ni de prévenir les blessures avant qu'elles n'arrivent.
                </p>
                <p
                  className="text-lg leading-relaxed font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  WAC vous donne les données pour faire passer votre club au niveau supérieur. Et pour le prouver à la FFME.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-objectif-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Suivi physiologique pour tous vos licenciés
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Données de charge d'entraînement, zones d'effort, récupération. Vous suivez la progression de vos grimpeurs avec des métriques objectives — et vous adaptez vos plans en conséquence.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-égalité-des-sexes-30.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Une approche inclusive validée scientifiquement
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    WAC intègre le cycle menstruel dans la planification. Vos grimpeuses s'entraînent mieux — et votre club devient une référence en matière d'inclusivité.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-primary-beige)' }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-bouclier-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Prévenez les blessures avant qu'elles ne coûtent une saison
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Alertes de surcharge, suivi de récupération, recommandations personnalisées. Gardez vos grimpeurs en forme — et sur le mur.
                  </p>
                </div>
              </div>

              {/* Bloc partenariat FFME */}
              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-primary-beige)',
                  border: '2px solid var(--color-secondary-orange)',
                }}
                data-aos="fade-up"
              >
                <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/liguenaffme.png"
                      alt="Logo FFME"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-2xl mb-3 font-bold"
                      style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                    >
                      WAC travaille avec la FFME
                    </h3>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                    >
                      WAC collabore avec la Fédération Française de la Montagne et de l'Escalade pour développer des outils adaptés aux clubs. Votre feedback compte — et il façonne directement l'évolution du produit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modèle commercial */}
              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-primary-beige)',
                  border: '2px solid var(--color-secondary-orange)',
                }}
                data-aos="fade-up"
              >
                <h3
                  className="text-2xl mb-4 font-bold"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                >
                  Modèle commercial
                </h3>
                <ul
                  className="space-y-3 text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Bracelets disponibles à <strong>110€ HT l'unité</strong> (tarif club FFME)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Revendez-les à vos licenciés ou intégrez-les dans vos packs d'adhésion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>L'application WAC reste gratuite pour vos licenciés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Accompagnement personnalisé pour intégrer WAC dans vos entraînements</span>
                  </li>
                </ul>
              </div>

              <div className="text-center" data-aos="fade-up">
                <Link href="/contact" className="btn-secondary inline-block">
                  Devenir club partenaire
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION DISTRIBUTEURS */}
        <section id="distributeurs" className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Badge catégorie */}
              <div className="flex justify-center mb-6" data-aos="fade-up">
                <span
                  className="inline-block px-6 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    fontFamily: 'var(--font-syne)',
                  }}
                >
                  Distributeurs
                </span>
              </div>

              <h2
                className="text-3xl md:text-5xl mb-6 text-center"
                style={{
                  color: 'var(--color-primary-green)',
                  fontFamily: 'var(--font-syne)',
                  textTransform: 'uppercase',
                }}
                data-aos="fade-up"
              >
                Distribuez un produit que vos clients redemandent.
              </h2>

              <div className="space-y-6 mb-12" data-aos="fade-up" data-aos-delay="100">
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  Vous vendez du matériel d'escalade. Mais vos clients achètent ailleurs leurs bracelets connectés — parce qu'aucun n'est vraiment conçu pour l'escalade. Jusqu'à maintenant.
                </p>
                <p
                  className="text-lg leading-relaxed font-bold"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  WAC est le premier bracelet pensé pour l'escalade. Et vos clients le veulent déjà.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-objectif-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Un produit différenciant dans votre catalogue
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Analyse physiologique en temps réel, prévention des blessures, suivi du cycle menstruel. WAC n'est pas un bracelet de sport générique. C'est un outil d'entraînement pour grimpeurs sérieux.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-médaille-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Marges attractives sur un produit premium
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    WAC est positionné comme un produit premium (PVC suggéré : 120-140€). Vous achetez à 100€ HT — et vous définissez votre propre marge selon votre stratégie commerciale.
                  </p>
                </div>

                <div
                  className="p-6"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="mb-4">
                    <Image
                      src="/icons/icons8-bouclier-50.png"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl mb-3 font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Support marketing et accompagnement dédié
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                  >
                    Fiches produit, visuels, formations pour vos équipes. Nous vous accompagnons pour que vous puissiez vendre WAC efficacement — en boutique et en ligne.
                  </p>
                </div>
              </div>

              {/* Modèle commercial */}
              <div
                className="p-8 mb-10"
                style={{
                  backgroundColor: 'var(--color-secondary-beige-light)',
                  border: '2px solid var(--color-secondary-orange)',
                }}
                data-aos="fade-up"
              >
                <h3
                  className="text-2xl mb-4 font-bold"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                >
                  Conditions distributeur
                </h3>
                <ul
                  className="space-y-3 text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
                >
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Prix distributeur : <strong>100€ HT l'unité</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>PVC suggéré : 120-140€ (selon votre positionnement)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Commande minimum : 20 unités</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Support marketing inclus (visuels, formations, fiches produit)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-secondary-orange font-bold">→</span>
                    <span>Livraison sous 15 jours ouvrés</span>
                  </li>
                </ul>
              </div>

              <div className="text-center" data-aos="fade-up">
                <Link href="/contact" className="btn-secondary inline-block">
                  Devenir distributeur
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
