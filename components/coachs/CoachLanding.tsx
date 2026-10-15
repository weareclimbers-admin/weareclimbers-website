'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Reveal, TitleReveal, CountUp } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import CoachHeroCard from './CoachHeroCard'
import ScreenFrame from './ScreenFrame'
import CoachLeadForm from './CoachLeadForm'
import { COACH_VIDEOS, type CoachVideoId } from '@/lib/coachVideos'

/* Le parcours du coach, du constat à la séance — un bénéfice par bloc.
   `video` : tuto de la webapp coach (lib/coachVideos.ts) ; s'il n'est pas (ou plus)
   publié, le bloc retombe sur `image`, sinon sur le placeholder « Démo à venir ».
   01 garde une capture en attendant le tuto « tour rapide ». `badge` = offre minimale. */
const FEATURES: {
  index: string
  step: string
  title: string
  desc: string
  label: string
  placeholder: string
  image?: string
  imageAlt?: string
  video?: CoachVideoId
  badge?: string
}[] = [
  {
    index: '01',
    step: 'Repérer',
    title: "Sache d'un coup d'œil qui pousser et qui ménager.",
    desc: "Sommeil, récupération, charge réelle face au ressenti\u00a0: tout remonte seul du bracelet et de l'app. Ton tableau de bord te montre la forme du groupe et les grimpeurs à regarder en priorité, et un récap t'attend chaque lundi par email.",
    label: 'État de forme',
    placeholder: 'Forme du groupe et grimpeurs à regarder en priorité',
    image: '/images/coachs/etat-de-forme.JPG',
    imageAlt: "Capture WAC Coach\u00a0: état de forme d'un grimpeur et son évolution sur 30 jours",
  },
  {
    index: '02',
    step: 'Programmer',
    title: 'Envoie ta séance. Vois ce qui a vraiment été fait.',
    desc: "Tu programmes en quelques clics, avec tes consignes et l'effort visé\u00a0: ton grimpeur reçoit la séance directement dans son app. Une fois faite, tu compares le prévu au réalisé et tu ajustes la suite sur du concret, pas sur un «\u00a0ça allait\u00a0».",
    label: 'Programmation',
    placeholder: 'Calendrier, consignes, prévu face au réalisé',
    video: 'programmation',
  },
  {
    index: '03',
    step: 'Anticiper',
    title: 'Teste ton plan sur le papier, pas sur ton grimpeur.',
    desc: "Une compétition en vue\u00a0? Construis ton bloc semaine par semaine, jusqu'à 16 semaines, duplique-le et compare deux options. L'app projette la forme et la fraîcheur de ton grimpeur au jour\u00a0J\u00a0: tu envoies le meilleur plan en un clic, séances comprises.",
    label: 'Scénarios',
    placeholder: 'Deux plans comparés, forme projetée au jour\u00a0J',
    video: 'scenarios',
    badge: 'Offre Pro',
  },
  {
    index: '04',
    step: 'Gagner du temps',
    title: 'Écris ta séance une fois. Programme-la autant que tu veux.',
    desc: "Crée tes propres exercices et enregistre tes séances types, consignes comprises. La prochaine fois, tu les programmes en un clic au lieu de tout réécrire\u00a0: moins de temps derrière l'écran, plus de temps au pied du mur.",
    label: 'Bibliothèque',
    placeholder: 'Exercices perso et modèles de séance',
    video: 'exercices-modeles',
    // Exercices perso dès Essentiel, modèles en Pro
    badge: 'Modèles\u00a0: offre Pro',
  },
  {
    index: '05',
    step: 'Coacher à ta façon',
    title: "Suis ce qui compte pour toi, pas ce qu'on a choisi à ta place.",
    desc: "Chaque coach a ses repères. Construis tes propres graphiques en croisant plus de 40 métriques, du volume de grimpe à l'effort perçu. Ils s'affichent ensuite sur chaque fiche élève, calculés avec ses propres données.",
    label: 'Mes graphiques',
    placeholder: 'Graphiques perso sur chaque fiche élève',
    video: 'mes-graphiques',
    badge: 'Offre Pro',
  },
]

export default function CoachLanding() {
  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        {/* Fond : vidéo d'entraînement muette en boucle (poster photo pour l'affichage immédiat) */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-rejoins-nous.webp"
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/hero-coach.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary-green)', opacity: 0.82 }} />
        </div>
        <TopoLines opacity={0.13} />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Texte */}
            <div>
              <motion.p
                className="text-sm md:text-base mb-5 font-bold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                Pour les coachs & les clubs d'escalade
              </motion.p>
              <TitleReveal
                lines={['Vois leur forme.', 'Programme mieux.', 'Vérifie le résultat.']}
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl mb-7"
                style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)', lineHeight: '1.08' }}
              />
              <motion.p
                className="text-lg md:text-xl mb-9 max-w-xl"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
              >
                Sommeil, récupération, charge réelle&nbsp;: WAC&nbsp;Coach te montre ce que vivent tes grimpeurs entre deux séances. Tu programmes en conséquence, tu testes ton plan avant de l'envoyer, et tu vois ce qui a vraiment été fait.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.35 }}
              >
                <Magnetic>
                  <a href="#demo" className="btn-secondary inline-block">Réserver une démo</a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="https://coach.weareclimbers.fr/tarifs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-beige inline-block"
                  >
                    Voir les offres
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#produit" className="btn-beige inline-block">Voir comment ça marche</a>
                </Magnetic>
              </motion.div>
              <motion.p
                className="mt-6 text-sm"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.75 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.5 }}
              >
                Déjà coach chez nous ?{' '}
                <a
                  href="https://coach.weareclimbers.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold hover:opacity-80"
                  style={{ color: 'var(--color-secondary-orange)' }}
                >
                  Accéder à mon espace →
                </a>
              </motion.p>
            </div>

            {/* Carte glass État de Forme — vue groupe (même langage que la home) */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.4 }}
            >
              <CoachHeroCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── 168 HEURES (kinétique, déclenché à l'apparition) ───────────── */}
      <section className="relative overflow-hidden py-24 md:py-36" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.12} />
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] font-bold mb-8" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
              Le vrai terrain
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="text-2xl md:text-4xl mb-1" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>
              Une semaine, c'est
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="leading-none my-2 flex flex-wrap items-baseline justify-center gap-x-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
              <span className="text-8xl md:text-[12rem]" style={{ color: 'var(--color-secondary-orange)' }}>
                <CountUp to={168} duration={2.2} />
              </span>
              <span className="text-3xl md:text-5xl" style={{ color: 'var(--color-primary-beige)' }}>heures.</span>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="text-2xl md:text-4xl mt-8 mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>
              Tu n'en coaches qu'une poignée.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="text-lg md:text-2xl mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.85, lineHeight: '1.5' }}>
              Le reste — sommeil, récupération, charge réelle — décide de leur progression. Et tu ne le vois pas.
            </p>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="inline-flex items-center gap-3 px-6 py-3 relative" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
              <span className="absolute top-0 right-0 w-3 h-3" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
              <span className="text-base md:text-xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                WAC Coach te montre le reste.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── DU RESSENTI À LA SÉANCE ───────────── */}
      <section id="produit" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)', lineHeight: '1.15' }}>
                Du ressenti à la donnée. De la donnée à la séance.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                Tes grimpeurs portent le bracelet WAC et utilisent l'app. Toi, tu retrouves leur forme, leur charge et leur récupération dans ton espace coach, sans avoir à leur demander. Et tu ne t'arrêtes pas au constat&nbsp;: tu programmes, tu testes et tu ajustes au même endroit.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── PARCOURS DU COACH (démos vidéo en grand, capture côte à côte) ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Pour piloter, pas deviner.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-lg md:text-xl text-center mb-20 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.85, lineHeight: '1.6' }}>
              Voir la forme de tes grimpeurs, c'est le point de départ. Voici ce que tu en fais.
            </p>
          </Reveal>

          <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
            {FEATURES.map((f, i) => {
              const clip = f.video ? COACH_VIDEOS[f.video] : undefined
              const text = (
                <Reveal>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-secondary-orange)', opacity: 0.3 }}>
                      {f.index}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.15em]" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                      {f.step}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {f.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                    {f.desc}
                  </p>
                  {f.badge && (
                    <span
                      className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
                      style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)', border: '1px solid var(--color-secondary-orange)' }}
                    >
                      <span className="w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                      {f.badge}
                    </span>
                  )}
                </Reveal>
              )
              const visual = (
                <ScreenFrame
                  clips={clip ? [clip] : undefined}
                  src={f.image}
                  alt={f.imageAlt}
                  label={f.label}
                  placeholder={f.placeholder}
                  tilt={i === 0}
                />
              )

              // Démo vidéo : texte en haut à gauche, vidéo en grand dessous (lisible)
              if (clip) {
                return (
                  <div key={f.index} className="space-y-8 md:space-y-10">
                    <div className="max-w-3xl">{text}</div>
                    {visual}
                  </div>
                )
              }

              // Capture : texte et visuel côte à côte
              return (
                <div key={f.index} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div>{text}</div>
                  <div>{visual}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────────── COMMENT ÇA MARCHE ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-16" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Comment ça marche.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: '1', t: 'Ton grimpeur s\'équipe', d: 'Il porte le bracelet WAC et utilise l\'app au quotidien.' },
              { n: '2', t: 'Ses données remontent', d: 'Sommeil, récup, charge\u00a0: tout se synchronise tout seul, sans saisie de ta part.' },
              { n: '3', t: 'Tu programmes, il reçoit', d: 'Ta séance arrive dans son app avec tes consignes. Il la fait, tu vois le résultat, tu ajustes.' },
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

      {/* ───────────── PREUVE / RÉASSURANCE ───────────── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <p className="text-center text-sm uppercase tracking-[0.22em] font-bold mb-12" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
              Ils nous font déjà confiance
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 mb-12">
              {[
                { src: '/liguenaffme.png', alt: 'Ligue Nouvelle-Aquitaine FFME' },
                { src: '/logo-tag.jpg', alt: 'Le TAG — Tournefeuille' },
                { src: '/logo-esm.jpg', alt: 'Entente Sportive de Massy' },
              ].map((logo) => (
                <div key={logo.src} className="relative h-20 md:h-24 w-36 md:w-44">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-3xl mx-auto text-center text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              Développé main dans la main avec la <strong>Ligue Nouvelle-Aquitaine de la FFME</strong>. Et déjà, des clubs de référence nous font confiance&nbsp;: <strong>le TAG</strong> (Tournefeuille) et l'<strong>ES Massy</strong>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── CTA / LEAD ───────────── */}
      <section id="demo" className="relative overflow-hidden py-20 md:py-28 scroll-mt-24" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.1} />
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}>
              Essaie-le avec un de tes grimpeurs.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}>
              Réserve ta démo&nbsp;: on regarde ensemble comment l'adapter à ton groupe. Tu préfères tester seul&nbsp;? L'offre Découverte est gratuite, sans limite de durée, et ta première programmation est offerte.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CoachLeadForm />
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.85 }}>
              Tu veux d'abord voir les tarifs&nbsp;?{' '}
              <a
                href="https://coach.weareclimbers.fr/tarifs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:opacity-80"
                style={{ color: 'var(--color-secondary-orange)' }}
              >
                Voir les offres →
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
