'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Reveal, TitleReveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import StoreButtons from '@/components/StoreButtons'
import WaitlistSection from '@/components/WaitlistSection'
import { getPrimaryCta } from '@/lib/campaign'

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
                  <Link href={getPrimaryCta().href ?? '/boutique'} className="btn-secondary inline-block">
                    {getPrimaryCta().label} →
                  </Link>
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
                  { text: '±1 BPM (donnée Polar)', pos: 'top-6 -left-2 md:left-0' },
                  { text: 'Sans écran', pos: 'bottom-24 -right-2 md:right-0' },
                  { text: 'Avant-bras', pos: 'bottom-2 left-8' },
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
              Ce que mesure le bracelet.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto text-center mb-14"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}
            >
              Le Polar 360 mesure en continu ta fréquence cardiaque, l'intervalle entre chaque battement, ta température cutanée et tes mouvements. ±1 BPM selon les données communiquées par Polar. Sa validité en escalade et à l'avant-bras est en cours d'évaluation par notre R&D.
            </p>
          </Reveal>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { t: 'Capteur optique', d: "Precision Prime™ : Polar combine la mesure optique à d'autres capteurs pour limiter les erreurs dues aux mouvements." },
              { t: 'Accéléromètre', d: "Accéléromètre : 50 Hz, soit 180 000 points de mesure par heure. L'app s'en sert pour analyser tes séances." },
              { t: 'Variabilité cardiaque', d: "L'intervalle entre chaque battement, base de ton analyse de récupération." },
              { t: 'Température cutanée', d: 'Mesurée en continu par le bracelet.' },
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
              { num: '17', unit: 'g', label: "avec bracelet, 5 g pour le module seul (données Polar)" },
              { num: '0', unit: 'écran', label: 'zéro distraction, juste la grimpe' },
              { num: '5', unit: 'jours', label: "Polar annonce jusqu'à 5 jours. Avec l'usage We Are Climbers, on recharge le nôtre environ tous les 10 jours. L'autonomie varie selon l'utilisation." },
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
              Étanche à 30 mètres, selon Polar. On le porte à l'avant-bras. Notre R&D mesure actuellement ce placement face à une ceinture thoracique.
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
              Bonne question. Ta montre mesure aussi ta fréquence cardiaque, et on ne prétend pas faire mieux qu'elle en escalade&nbsp;: aucune mesure ne le montre à ce jour. On a fait un autre choix&nbsp;: <strong>un seul capteur</strong>, pour que l'app sache exactement d'où viennent ses données.
            </p>
          </Reveal>

          <div className="max-w-2xl mx-auto mb-12">
            {/* Polar 360 : des faits, sans comparaison chiffrée avec les montres */}
            <Reveal>
              <div className="relative h-full p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-green)', border: '2px solid var(--color-secondary-orange)' }}>
                <span className="absolute top-0 right-0 w-4 h-4" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                <h3 className="text-xl md:text-2xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>
                  Polar 360 à l'avant-bras
                </h3>
                <ul className="space-y-4">
                  {[
                    "±1 BPM selon les données communiquées par Polar",
                    'Intervalles entre chaque battement, température cutanée, accéléromètre',
                    'Sans écran — ton attention reste sur le caillou',
                    "On le porte à l'avant-bras. Notre R&D mesure actuellement ce placement face à une ceinture thoracique.",
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
              Nous avons choisi le Polar 360 après une analyse de ses caractéristiques, sans banc d'essai comparatif.
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
              { n: '1', t: 'Tu grimpes', d: 'Le bracelet enregistre en continu — même sans ton téléphone, grâce à sa mémoire interne.' },
              { n: '2', t: 'Il se synchronise', d: "De retour près de ton téléphone, tout remonte automatiquement en Bluetooth. Zéro manipulation." },
              { n: '3', t: "L'app analyse", d: "Une heure de grimpe est analysée en moins de 30 secondes : zones d'effort, tentatives, récupération, état de forme." },
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

          {/* L'app est déjà en ligne — téléchargement direct */}
          <Reveal delay={0.1}>
            <div className="mt-14 text-center">
              <p className="mb-5 text-base md:text-lg" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                L'app qui analyse tes séances est gratuite, sur iOS et Android.
              </p>
              <StoreButtons className="max-w-md mx-auto justify-center" />
            </div>
          </Reveal>
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
                  'Fréquence cardiaque optique Precision Prime™ : ±1 BPM selon les données communiquées par Polar',
                  "Sa validité en escalade et à l'avant-bras est en cours d'évaluation par notre R&D.",
                  'Accéléromètre : 50 Hz, soit 180 000 points de mesure par heure.',
                  'Capteur de température cutanée',
                ],
              },
              {
                title: 'Connectivité',
                items: [
                  'Bluetooth Low Energy et ANT',
                  "Synchronisation automatique avec l'app WAC",
                  'Mode hors connexion (enregistrement sans téléphone)',
                  'Mémoire interne : 16 Mo',
                ],
              },
              {
                title: 'Autonomie & charge',
                items: [
                  "Polar annonce jusqu'à 5 jours. Avec l'usage We Are Climbers, on recharge le nôtre environ tous les 10 jours. L'autonomie varie selon l'utilisation.",
                  'Batterie Li-Po rechargeable de 148 mAh',
                  'Recharge avec le câble fourni, sur un port ou un chargeur USB',
                  "Indicateur de batterie dans l'app",
                ],
              },
              {
                title: 'Physique & compatibilité',
                items: [
                  '17 g avec bracelet, 5 g pour le module seul (données Polar), sans écran',
                  "On le porte à l'avant-bras. Notre R&D mesure actuellement ce placement face à une ceinture thoracique.",
                  'Étanche à 30 mètres (WR30, selon Polar)',
                  'iOS 15.1+ · Android 13+ · Garantie légale de conformité : 2 ans',
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
                  On est transparents&nbsp;: le capteur est fabriqué par <strong>Polar</strong>, fabricant finlandais de capteurs cardio pour le sport. Fabriquer notre propre hardware dès le premier jour aurait signifié des années de retard. Nous avons choisi le Polar 360 après une analyse de ses caractéristiques, sans banc d'essai comparatif.
                </p>
                <p>
                  <strong>Toute l'intelligence, elle, est française</strong>&nbsp;: les algorithmes d'analyse, l'app, les modèles de prévention des blessures sont développés en France, avec des grimpeurs et des coachs fédéraux.
                </p>
                <p>
                  Et c'est une étape&nbsp;: notre roadmap prévoit un <strong>bracelet WAC éco-conçu</strong>, développé en propre. On y va pas à pas — en commençant par un capteur existant.
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

      {/* ───────────── CTA PRÉVENTE ───────────── */}
      <WaitlistSection heading="Réserve ton bracelet." />
    </main>
  )
}
