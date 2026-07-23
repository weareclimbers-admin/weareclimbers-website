'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Reveal, TitleReveal, CountUp } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import Marquee from '@/components/Marquee'
import StickyCta from '@/components/StickyCta'
import WaitlistSection from '@/components/WaitlistSection'
import FAQItem from '@/components/FAQItem'
import ReadyGauge from './ReadyGauge'
import { faqItems } from '@/lib/faq'
import { DERNIER_ARTICLE } from '@/lib/press'

/** Numéro de section en filigrane orange — motif structurant WAC 2.0 */
function SectionNum({ n }: { n: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -top-6 right-2 md:right-8 select-none leading-none"
      style={{
        fontFamily: 'var(--font-syne)',
        fontWeight: 700,
        fontSize: 'clamp(5rem, 12vw, 10rem)',
        color: 'var(--color-secondary-orange)',
        opacity: 0.08,
      }}
    >
      {n}
    </span>
  )
}

/** Chip icône (lisible sur carte sombre) */
function IconChip({ src }: { src: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
      style={{ backgroundColor: 'var(--color-primary-beige)' }}
    >
      <Image src={src} alt="" width={28} height={28} className="object-contain" />
    </span>
  )
}

export default function HomeLanding() {
  // Parallax léger du mockup téléphone (transform GPU + ressort → fluide)
  const phoneRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: phoneRef, offset: ['start end', 'end start'] })
  const phoneY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), { stiffness: 60, damping: 20 })
  const phoneRotate = useSpring(useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]), { stiffness: 60, damping: 20 })

  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      <StickyCta />

      {/* ───────────── HERO — le score comme héros ───────────── */}
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        {/* Fond : photo grimpeur (Kristine Varga) + voile vert */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-home.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary-green)', opacity: 0.78 }} />
        </div>
        <TopoLines opacity={0.12} drift={false} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-10 items-center">
            {/* Texte (3/5) */}
            <div className="lg:col-span-3">
              <motion.p
                className="text-sm md:text-base mb-5 font-bold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                L'analyse physiologique intelligente pour grimpeurs et grimpeuses
              </motion.p>

              <TitleReveal
                lines={['Grimpons mieux,', 'plus longtemps.']}
                as="h1"
                className="text-5xl md:text-6xl lg:text-7xl mb-7"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-beige)',
                  lineHeight: '1.05',
                }}
              />

              <motion.p
                className="text-lg md:text-xl mb-10 max-w-xl"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.92, lineHeight: '1.6' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
              >
                Comprends ce que ton corps te dit. Récupération, charge réelle, sommeil&nbsp;: ton bracelet et ton app lisent ce que tu ne peux pas voir — pour progresser sans jamais t'abîmer.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.35 }}
              >
                <Magnetic>
                  <a href="#liste-attente" className="btn-secondary inline-block">
                    Rejoins la liste →
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#produit" className="btn-beige inline-block">
                    Comment ça marche
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            {/* Jauge héros (2/5) — carte glass sur la photo */}
            <motion.div
              className="lg:col-span-2 flex justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.4 }}
            >
              <div className="glass-card w-full max-w-sm p-7 md:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2.5 h-2.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <span
                    className="text-xs font-bold uppercase tracking-[0.14em]"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    Ton État de Forme · aujourd'hui
                  </span>
                </div>
                <ReadyGauge value={82} />
                <p
                  className="mt-5 text-center text-sm"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}
                >
                  Un score simple, calculé en continu depuis ton corps. Tu sais si aujourd'hui, c'est grosse séance ou récup.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Crédit photo */}
        <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10" style={{ color: 'var(--color-primary-beige)' }}>
          © Kristine Varga
        </div>
      </section>

      {/* ───────────── PREUVE CHIFFRÉE (façon Lattice) ───────────── */}
      <section className="py-14 md:py-16" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 items-start">
            {[
              { num: <CountUp to={102} duration={2} />, label: 'grimpeurs ont déjà acheté leur bracelet' },
              { num: <CountUp to={9} duration={1.4} />, label: "coachs embarqués dans l'aventure" },
              { num: <CountUp to={180000} duration={2.2} />, label: 'données analysées par heure' },
              { num: <CountUp to={30} prefix="<" suffix=" s" duration={1.6} />, label: 'pour analyser ta séance' },
              { num: <CountUp to={1} prefix="±" suffix=" BPM" duration={1.2} />, label: 'de précision cardiaque' },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div>
                  <div
                    className="text-3xl md:text-4xl leading-none"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}
                  >
                    {m.num}
                  </div>
                  <span className="metric-underline" />
                  <p className="metric-label mt-2.5" style={{ color: 'var(--color-primary-green)', opacity: 0.75 }}>
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 01 · LE CONSTAT ───────────── */}
      <section className="relative py-20 md:py-28">
        <SectionNum n="01" />
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2
                className="text-3xl md:text-5xl mb-12 text-center"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.2',
                }}
              >
                La technologie a transformé tous les sports. Mais pas l'escalade — ou alors, mal.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6 mb-10">
                <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                  Tu grimpes régulièrement. Tu t'entraînes avec sérieux. Et pourtant tu stagnes, tu accumules les douleurs, ou tu t'es blessé sans vraiment comprendre pourquoi.
                </p>
                <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                  Ce n'est pas un manque d'engagement. C'est un manque d'information.
                </p>
              </div>
            </Reveal>

            {/* Citation Julien — pull-quote */}
            <Reveal delay={0.15}>
              <div className="relative pl-10 md:pl-14 py-2 mb-10">
                <span
                  aria-hidden
                  className="absolute left-0 -top-4 leading-none select-none"
                  style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '5rem', color: 'var(--color-secondary-orange)' }}
                >
                  “
                </span>
                <p className="text-xl md:text-2xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)', lineHeight: '1.35' }}>
                  J'ai créé WAC après une double tendinite aux deux bras. Aucune app ne me disait de me reposer. Aucun outil ne m'aidait à comprendre ce que mon corps traversait. J'ai construit ce que j'aurais voulu avoir.
                </p>
                <p className="text-base font-bold" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}>
                  — Julien, fondateur de We Are Climbers
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed text-center" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                WAC est né de ce constat simple&nbsp;: les grimpeurs méritent des outils à la hauteur de leur pratique.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 02 · LE PRODUIT (bento) ───────────── */}
      <section id="produit" className="relative py-20 md:py-28 scroll-mt-24" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <SectionNum n="02" />
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-6"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              La première analyse physiologique pensée pour l'escalade.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto text-center mb-14 leading-relaxed"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}
            >
              Un bracelet léger, sans écran, porté pendant tes sessions. Une app qui analyse tes données en temps réel et te donne des recommandations concrètes.{' '}
              <strong>Pas des graphiques de plus. Une compréhension de ton corps que tu n'avais pas avant.</strong>
            </p>
          </Reveal>

          {/* Bento grid asymétrique */}
          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {/* Grande carte 2×2 — Prêt·e à grimper */}
            <Reveal className="md:col-span-2 md:row-span-2">
              <div
                className="h-full rounded-[20px] p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8"
                style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.14)' }}
              >
                <div className="flex-1">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] mb-4" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                    Le score signature
                  </p>
                  <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    Ton État de Forme.
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                    Chaque matin, ton État de Forme te dit si ton corps est prêt à encaisser une grosse séance — calculé depuis ta récupération, ton sommeil et ta charge réelle. Tu n'as plus à deviner. Tu sais.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <ReadyGauge value={82} size={170} showBars={false} />
                </div>
              </div>
            </Reveal>

            {/* Pilier 1 */}
            <Reveal delay={0.08}>
              <div className="card-dark h-full">
                <IconChip src="/icons/icons8-objectif-50.png" />
                <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                  Entraînement intentionnel
                </h3>
                <p className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.6', opacity: 0.88 }}>
                  Objectifs personnalisés, zones d'effort, patterns de récupération. Tu comprends enfin comment tu grimpes — pour grimper mieux.
                </p>
              </div>
            </Reveal>

            {/* Pilier 2 */}
            <Reveal delay={0.16}>
              <div className="card-dark h-full">
                <IconChip src="/icons/icons8-bouclier-50.png" />
                <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                  Prévention des blessures
                </h3>
                <p className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.6', opacity: 0.88 }}>
                  WAC t'alerte avant que ton corps craque&nbsp;: suivi de récupération, charge hebdomadaire, recommandations adaptées à ton état réel.
                </p>
              </div>
            </Reveal>

            {/* Pilier 3 — carte large */}
            <Reveal delay={0.24} className="md:col-span-3">
              <div className="card-dark flex flex-col sm:flex-row sm:items-center gap-6">
                <IconChip src="/icons/icons8-cycle-menstruel-64.png" />
                <div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                    Analyse adaptée à chaque corps
                  </h3>
                  <p className="text-sm md:text-base max-w-3xl" style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.6', opacity: 0.88 }}>
                    WAC s'adapte aux spécificités physiologiques de chaque grimpeur. Y compris aux variations hormonales liées au cycle menstruel — une première dans l'escalade.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 03 · PREUVE TERRAIN (app + bracelet) ───────────── */}
      <section className="relative py-20 md:py-28">
        <SectionNum n="03" />
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-16"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Une technologie validée sur le terrain.
            </h2>
          </Reveal>

          {/* L'app — mockup téléphone en parallax */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div ref={phoneRef} className="flex justify-center">
                <motion.div style={{ y: phoneY, rotate: phoneRotate, width: '240px' }} className="relative">
                  <div
                    className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                    style={{ backgroundColor: 'var(--color-primary-green)', padding: '12px 10px', border: '3px solid var(--color-primary-green)' }}
                  >
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
                      style={{ width: '56px', height: '14px', backgroundColor: 'var(--color-primary-green)' }}
                    />
                    <div className="relative overflow-hidden" style={{ borderRadius: '2rem', aspectRatio: '9/19.5', backgroundColor: 'var(--color-secondary-beige-light)' }}>
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="WAC — Analyse de performance escalade"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      >
                        <source src="/videos/app/seance.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="mx-auto mt-2 rounded-full" style={{ width: '38px', height: '4px', backgroundColor: 'rgba(245,236,229,0.3)' }} />
                  </div>
                </motion.div>
              </div>

              <div>
                <Reveal>
                  <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                    Une app qui analyse tes données physiologiques en temps réel et te donne des recommandations concrètes pour progresser sans t'abîmer.
                  </p>
                </Reveal>
                <ul className="space-y-3 mb-8">
                  {['Analyse physiologique en temps réel', 'Prévention des blessures', 'Analyse du cycle menstruel (optionnel)', 'Entraînement intentionnel'].map((item, i) => (
                    <Reveal key={item} delay={0.08 + i * 0.08}>
                      <li className="flex items-center gap-3">
                        <span
                          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
                        >
                          ✓
                        </span>
                        <span style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>{item}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <Reveal delay={0.3}>
                  <Magnetic>
                    <Link href="/l-app" className="btn-secondary inline-block">
                      Découvre l'app en détail →
                    </Link>
                  </Magnetic>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Le bracelet — image + specs métriques */}
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div className="flex items-center justify-center">
                  <Image src="/téléchargement (1).png" alt="Bracelet Polar 360 We Are Climbers" width={520} height={520} className="object-contain w-full max-w-md" />
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <p className="text-lg md:text-xl leading-relaxed mb-8 italic" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                    Des capteurs de haute précision utilisés par les sportifs de haut niveau. Tu l'oublies pendant la grimpe. Lui, n'oublie rien.
                  </p>
                </Reveal>

                <div className="grid grid-cols-2 gap-5 mb-8">
                  {[
                    { num: '±1', unit: 'BPM', label: 'précision cardiaque' },
                    { num: '10', unit: 'jours', label: "d'autonomie" },
                    { num: '0', unit: 'écran', label: 'zéro distraction' },
                    { num: '100', unit: '%', label: 'sync automatique' },
                  ].map((s, i) => (
                    <Reveal key={s.label} delay={i * 0.06}>
                      <div>
                        <div className="text-2xl md:text-3xl leading-none" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                          {s.num}
                          <span className="text-base md:text-lg ml-1" style={{ color: 'var(--color-secondary-orange)' }}>{s.unit}</span>
                        </div>
                        <span className="metric-underline" />
                        <p className="metric-label mt-2" style={{ color: 'var(--color-primary-green)', opacity: 0.75 }}>{s.label}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.2}>
                  <Magnetic>
                    <Link href="/le-bracelet" className="btn-secondary inline-block">
                      Voir le bracelet en détail →
                    </Link>
                  </Magnetic>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── MARQUEE CONFIANCE + PULL-QUOTE PRESSE ───────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <Reveal>
          <p
            className="text-center text-sm uppercase tracking-[0.22em] font-bold mb-10"
            style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
          >
            Ils nous font confiance
          </p>
        </Reveal>

        <Marquee ariaLabel="Partenaires et mentions" className="mb-14">
          {[
            { type: 'img' as const, src: '/liguenaffme.png', alt: 'Ligue Nouvelle-Aquitaine FFME' },
            { type: 'text' as const, text: 'Objectif de campagne atteint à 100 %' },
            { type: 'img' as const, src: '/logo-tag.jpg', alt: 'Le TAG — Tournefeuille' },
            { type: 'text' as const, text: 'Vu dans Vertige Média' },
            { type: 'img' as const, src: '/logo-esm.jpg', alt: 'Entente Sportive de Massy' },
            { type: 'text' as const, text: 'Développé avec des coachs fédéraux' },
          ].map((item, i) =>
            item.type === 'img' ? (
              <div key={i} className="relative h-16 w-32 mx-10 flex-shrink-0">
                <Image src={item.src} alt={item.alt} fill className="object-contain" style={{ mixBlendMode: 'multiply' }} />
              </div>
            ) : (
              <span
                key={i}
                className="mx-10 flex-shrink-0 text-sm md:text-base font-bold uppercase tracking-wide whitespace-nowrap"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', opacity: 0.75 }}
              >
                {item.text}
              </span>
            ),
          )}
        </Marquee>

        {/* Pull-quote presse */}
        {DERNIER_ARTICLE && (
          <div className="container-custom">
            <Reveal>
              <div className="max-w-3xl mx-auto relative pl-12 md:pl-16">
                <span
                  aria-hidden
                  className="absolute left-0 -top-6 leading-none select-none"
                  style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '6.5rem', color: 'var(--color-secondary-orange)' }}
                >
                  “
                </span>
                <p className="text-xl md:text-3xl mb-5" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)', lineHeight: '1.35' }}>
                  {DERNIER_ARTICLE.quote}
                </p>
                <a
                  href={DERNIER_ARTICLE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold uppercase tracking-wide hover:underline"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}
                >
                  {DERNIER_ARTICLE.media} · {DERNIER_ARTICLE.date} → Lire l'article
                </a>
              </div>
            </Reveal>
          </div>
        )}
      </section>

      {/* ───────────── TÉMOIGNAGES ───────────── */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "J'ai évité une tendinite grâce aux alertes récupération de WAC. L'app m'a conseillé de me reposer alors que je me sentais en pleine forme. Le bracelet avait vu avant moi ce que mon corps me cachait. Depuis six mois : zéro blessure, progression constante.",
                author: 'Marie, 7b, grimpe 3x/semaine',
              },
              {
                quote:
                  "Grâce au bracelet, j'ai compris que je grimpais systématiquement en zone rouge. WAC m'a montré comment doser mes efforts. Paradoxalement, depuis que j'en fais moins, je progresse plus vite.",
                author: 'Alex, 7a+, salle et falaise',
              },
            ].map((t, i) => (
              <Reveal key={t.author} delay={i * 0.1}>
                <motion.div
                  className="h-full p-8 rounded-[20px]"
                  style={{ backgroundColor: 'var(--color-secondary-beige-light)', border: '1px solid rgba(38,83,53,0.1)' }}
                  whileHover={{ y: -6, boxShadow: '0 14px 40px rgba(216,90,26,0.16)' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <span aria-hidden className="block leading-none mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '2.5rem', color: 'var(--color-secondary-orange)' }}>
                    “
                  </span>
                  <p className="text-base md:text-lg mb-6 italic" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                    {t.quote}
                  </p>
                  <p className="font-bold" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                    {t.author}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── POUR QUI ───────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                WAC n'est pas pour tout le monde.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                C'est pour le grimpeur régulier qui veut comprendre pourquoi il stagne. Pour la grimpeuse qui veut s'entraîner en phase avec son corps, pas contre lui. Pour quiconque a compris que grimper longtemps vaut mieux que grimper fort une seule saison.
                <br />
                <br />
                <strong>Si tu grimpes pour progresser durablement, WAC est fait pour toi.</strong>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Magnetic>
                <Link href="/nos-grimpeurs" className="btn-secondary inline-block">
                  Découvrir si WAC est fait pour moi
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-14" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Questions fréquentes
            </h2>
          </Reveal>
          <div className="max-w-4xl mx-auto">
            {faqItems.map((item) => (
              <FAQItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── VALEURS ───────────── */}
      <section className="relative overflow-hidden py-20 md:py-24" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.1} drift={false} />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}>
                On ne fait pas une app de plus. On fait la bonne.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}>
                Éco-conçue dès la première ligne de code. Développée en France. Pensée pour que la technologie serve le grimpeur — pas l'inverse. Nos choix ne sont pas toujours les plus simples. Mais ils sont les plus justes.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── CTA FINAL — LISTE D'ATTENTE ───────────── */}
      <WaitlistSection
        heading="Les pré-commandes arrivent en propre."
        subtitle="La campagne a atteint son objectif à 100 %. Prochaine étape : les pré-commandes directement sur weareclimbers.fr, sans intermédiaire. Laisse ton email pour être prévenu·e en premier."
      />

      {/* ───────────── PORTE COACH ───────────── */}
      <section className="py-10" style={{ backgroundColor: 'var(--color-primary-beige)', borderTop: '1px solid rgba(38,83,53,0.12)' }}>
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                <strong>Tu es coach ou tu entraînes en club&nbsp;?</strong> Il existe un espace pensé pour toi.
              </p>
              <Link
                href="/coachs"
                className="font-bold uppercase text-sm tracking-wide hover:underline whitespace-nowrap"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
              >
                Découvre WAC Coach →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
