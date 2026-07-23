'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Reveal, TitleReveal, CountUp } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import WaitlistSection from '@/components/WaitlistSection'

/**
 * Landing /le-bracelet — preuve matérielle.
 * Objectif : lever toutes les objections hardware.
 * SEO : « bracelet cardio escalade », « capteur FC escalade ».
 */
export default function BraceletLanding() {
  // Parallax léger de l'image produit (un seul élément, lissé au ressort)
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })

  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── HERO PRODUIT ───────────── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <TopoLines opacity={0.07} drift={false} color="var(--color-primary-green)" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                className="text-sm md:text-base mb-5 font-bold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                Polar 360 × We Are Climbers
              </motion.p>

              <TitleReveal
                lines={['Le bracelet cardio', "pensé pour l'escalade."]}
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl mb-7"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.08',
                }}
              />

              <motion.p
                className="text-lg md:text-xl mb-9 max-w-xl"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
              >
                Un capteur de fréquence cardiaque haute précision, porté à l'avant-bras, sans écran. Tu l'oublies pendant la grimpe. Lui, n'oublie rien.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.35 }}
              >
                <Magnetic>
                  <a href="#liste-attente" className="btn-secondary inline-block">
                    Réserve ta place sur la liste →
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link href="/l-app" className="btn-primary inline-block">
                    Découvrir l'app qui va avec
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            {/* Image produit + chips métriques flottantes */}
            <div ref={imgRef} className="relative flex justify-center">
              <motion.div style={{ y: imgY }} className="relative">
                <Image
                  src="/téléchargement (1).png"
                  alt="Bracelet cardio Polar 360 pour l'escalade — We Are Climbers"
                  width={560}
                  height={560}
                  priority
                  className="object-contain w-full max-w-lg"
                />
                {[
                  { text: '±1 BPM', pos: 'top-6 -left-2 md:left-0' },
                  { text: '29 g', pos: 'bottom-24 -right-2 md:right-0' },
                  { text: '10 jours', pos: 'bottom-2 left-8' },
                ].map((chip, i) => (
                  <motion.span
                    key={chip.text}
                    className={`absolute ${chip.pos} px-4 py-2 text-sm font-bold uppercase shadow-lg`}
                    style={{
                      fontFamily: 'var(--font-syne)',
                      backgroundColor: i === 0 ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)',
                      color: 'var(--color-primary-beige)',
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 + i * 0.15 }}
                  >
                    {chip.text}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PRÉCISION ───────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.1} drift={false} />
        <div className="container-custom relative z-10">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-6"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}
            >
              La précision d'abord. Tout le reste en découle.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto text-center mb-14"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}
            >
              Prévenir une blessure demande des données fiables. Le Polar 360 mesure ta fréquence cardiaque à l'avant-bras — là où le signal est stable, même dans les mouvements explosifs de la grimpe.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-14">
            {[
              { num: <CountUp to={1} prefix="±" duration={1.2} />, unit: 'BPM', label: 'de précision cardiaque' },
              { num: <CountUp to={50} duration={1.6} />, unit: 'Hz', label: "d'échantillonnage" },
              { num: <CountUp to={180000} duration={2.2} />, unit: '', label: 'données par heure' },
              { num: <CountUp to={99} suffix=",4" duration={1.8} />, unit: '%', label: 'de fiabilité mesurée' },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl leading-none" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>
                    {m.num}
                    {m.unit && (
                      <span className="text-lg md:text-xl ml-1" style={{ color: 'var(--color-secondary-orange)' }}>{m.unit}</span>
                    )}
                  </div>
                  <span className="metric-underline mx-auto" />
                  <p className="metric-label mt-2.5" style={{ color: 'var(--color-primary-beige)', opacity: 0.75 }}>{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { t: 'Optique 9 LED', d: 'Capteur Precision Prime™, conçu pour le signal en mouvement.' },
              { t: 'Accéléromètre 3 axes', d: 'Calibré pour les mouvements spécifiques de la grimpe.' },
              { t: 'Variabilité cardiaque', d: 'La HRV, base de ton analyse de récupération.' },
              { t: 'Température cutanée', d: 'Un signal de plus pour détecter la fatigue.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="h-full p-6 rounded-[20px]" style={{ border: '1px solid rgba(245,236,229,0.2)' }}>
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>{c.t}</h3>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.8, lineHeight: '1.55' }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ERGONOMIE ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-14"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Conçu pour être oublié.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {[
              { num: '29', unit: 'g', label: 'tu ne le sens plus après 2 minutes' },
              { num: '0', unit: 'écran', label: 'zéro distraction, juste la grimpe' },
              { num: '10', unit: 'jours', label: "d'autonomie en usage quotidien" },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="card-dark text-center h-full">
                  <div className="text-5xl md:text-6xl leading-none mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                    {m.num}
                    <span className="text-2xl ml-1" style={{ color: 'var(--color-secondary-orange)' }}>{m.unit}</span>
                  </div>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', opacity: 0.85, lineHeight: '1.5' }}>{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="text-center text-lg md:text-xl max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
              Résistant à l'eau, aux chocs et à la magnésie. Porté à l'avant-bras, il ne gêne ni les fissures, ni les inversées, ni les manchons.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── POURQUOI PAS MA GARMIN / APPLE WATCH ? ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-6"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              « Pourquoi pas ma Garmin ou mon Apple Watch ? »
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-center mb-14" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
              Bonne question. On aurait pu rendre WAC compatible avec tous les capteurs. On a fait le choix inverse&nbsp;: <strong>un seul capteur, optimisé à 100&nbsp;% pour l'escalade</strong>. Parce que la qualité des analyses passe avant la compatibilité universelle.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {/* Montres généralistes */}
            <Reveal>
              <div className="h-full p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.15)' }}>
                <h3 className="text-xl md:text-2xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)', opacity: 0.65 }}>
                  Montre au poignet
                </h3>
                <ul className="space-y-4">
                  {[
                    'Précision FC variable sur les mouvements explosifs',
                    "Positions extrêmes du poignet = signal dégradé",
                    "Accéléromètre non calibré pour l'escalade",
                    'Un écran qui te distrait en pleine voie',
                    "1 à 2 jours d'autonomie",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: 'var(--color-secondary-beige)' }}>✕</span>
                      <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75, lineHeight: '1.55' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Polar 360 */}
            <Reveal delay={0.1}>
              <div className="relative h-full p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-green)', border: '2px solid var(--color-secondary-orange)' }}>
                <span className="absolute top-0 right-0 w-4 h-4" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                <h3 className="text-xl md:text-2xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>
                  Polar 360 à l'avant-bras
                </h3>
                <ul className="space-y-4">
                  {[
                    '99,4 % de fiabilité, même dans les surplombs',
                    'Signal stable quel que soit le mouvement du poignet',
                    'Accéléromètre calibré grimpe (bloc, voie, poutre)',
                    'Sans écran — ton attention reste sur le caillou',
                    "10 jours d'autonomie",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
                      >
                        ✓
                      </span>
                      <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', lineHeight: '1.55' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="text-center text-lg italic font-medium" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}>
              → On a testé plus de 15 capteurs. Le Polar 360 a gagné.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── SYNC AUTO ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-14"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Toi tu grimpes. Lui, il s'occupe du reste.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: '1', t: 'Tu grimpes', d: 'Le bracelet enregistre en continu — même sans ton téléphone, grâce à sa mémoire interne de 200 heures.' },
              { n: '2', t: 'Il se synchronise', d: "De retour près de ton téléphone, tout remonte automatiquement en Bluetooth. Zéro manipulation." },
              { n: '3', t: "L'app analyse", d: "Ta séance est analysée en moins de 30 secondes : zones d'effort, tentatives, récupération, état de forme." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 mx-auto mb-5 flex items-center justify-center text-2xl relative"
                    style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)', fontFamily: 'var(--font-syne)', fontWeight: 700 }}
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <span className="absolute top-0 right-0 w-2.5 h-2.5" style={{ backgroundColor: 'var(--color-primary-green)' }} />
                    {s.n}
                  </motion.div>
                  <h3 className="text-lg md:text-xl mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>{s.t}</h3>
                  <p style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SPECS TECHNIQUES DÉTAILLÉES (SEO) ───────────── */}
      <section id="specs" className="py-20 md:py-28 scroll-mt-24" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl text-center mb-14"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Spécifications techniques
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              {
                title: 'Capteurs',
                items: [
                  'Fréquence cardiaque optique 9 LED (Precision Prime™), ±1 BPM',
                  'Échantillonnage 50 Hz — 180 000 données par heure',
                  'Accéléromètre 3 axes + gyroscope',
                  'Capteur de température cutanée',
                  'Capteur de luminosité ambiante',
                ],
              },
              {
                title: 'Connectivité',
                items: [
                  'Bluetooth 5.0',
                  "Synchronisation automatique avec l'app WAC",
                  'Mode offline intelligent (enregistrement sans connexion)',
                  'Mémoire interne : 200 heures de sessions',
                ],
              },
              {
                title: 'Autonomie & charge',
                items: [
                  "Jusqu'à 10 jours en usage quotidien",
                  '40 heures en enregistrement continu',
                  'Recharge USB-C — 2 heures pour une charge complète',
                  "Indicateur de batterie dans l'app",
                ],
              },
              {
                title: 'Physique & compatibilité',
                items: [
                  "29 g, sans écran, porté à l'avant-bras",
                  "Résistant à l'eau, aux chocs et à la magnésie",
                  'iOS 15.1+ · Android 13+ · mises à jour firmware OTA',
                  'Garantie constructeur Polar : 2 ans',
                ],
              },
            ].map((group, i) => (
              <Reveal key={group.title} delay={i * 0.08}>
                <div className="h-full p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.12)' }}>
                  <h3 className="text-xl md:text-2xl mb-5" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                        <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.55' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── TRANSPARENCE POLAR ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2
                className="text-3xl md:text-5xl mb-8"
                style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)', lineHeight: '1.15' }}
              >
                Pourquoi Polar, et pas un bracelet 100&nbsp;% WAC&nbsp;?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                <p>
                  On est transparents&nbsp;: le capteur est fabriqué par <strong>Polar</strong>, référence mondiale du cardio sportif depuis 40 ans. Fabriquer notre propre hardware dès le premier jour aurait signifié des années de retard et des données moins fiables.
                </p>
                <p>
                  <strong>Toute l'intelligence, elle, est française</strong>&nbsp;: les algorithmes d'analyse, l'app, les modèles de prévention des blessures sont développés en France, avec des grimpeurs et des coachs fédéraux.
                </p>
                <p>
                  Et c'est une étape&nbsp;: notre roadmap prévoit un <strong>bracelet WAC éco-conçu</strong>, développé en propre. On y va pas à pas — en commençant par le meilleur capteur disponible.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8">
                <Link
                  href="/engagements"
                  className="text-sm font-bold uppercase tracking-wide hover:underline"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                >
                  Voir notre roadmap éco-conception →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── CTA LISTE D'ATTENTE ───────────── */}
      <WaitlistSection
        heading="Réserve ta place sur la liste."
        subtitle="Les pré-commandes ouvrent bientôt, directement sur weareclimbers.fr. Les inscrits profitent du tarif Fondateur en avant-première — avant l'ouverture publique."
      />
    </main>
  )
}
