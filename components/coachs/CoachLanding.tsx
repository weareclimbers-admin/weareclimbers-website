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

/* Fonctionnalités — `src` : captures actuelles (.JPG), à remplacer par les vidéos
   de démo de la webapp coach dès que Julien les dépose dans public/videos/coach/
   (ScreenFrame détecte .mp4/.webm automatiquement, tableau = lecture en chaîne). */
const FEATURES = [
  {
    index: '01',
    title: 'La fiche élève à 360°',
    desc: "Sommeil, récupération cardiaque (HRV), charge réelle vs ressentie, historique de séances : tout remonte automatiquement du bracelet et de l'app. Tu vois qui est frais, qui accumule, qui décroche — sans avoir à demander.",
    label: 'Fiche élève',
    placeholder: 'Fiche élève : sommeil, HRV, charge, historique',
    src: '/images/coachs/sommeil-eleve.JPG' as string | undefined,
  },
  {
    index: '02',
    title: 'Le score « État de forme »',
    desc: "Un indicateur clair qui combine récupération, sommeil, charge récente et ressenti. D'un regard : qui peut encaisser une grosse séance, et qui doit lever le pied cette semaine.",
    label: 'État de forme',
    placeholder: 'Score qui combine récup, sommeil, charge, ressenti',
    src: '/images/coachs/etat-de-forme.JPG' as string | undefined,
  },
  {
    index: '03',
    title: 'La programmation intelligente',
    desc: "Assigne les séances en glisser-déposer. Et surtout : simule une montée en charge sur 4 à 16 semaines, compare deux plans côte à côte et vois leur impact projeté sur la forme de ton grimpeur. Tu ne devines plus, tu testes.",
    label: 'Programmation',
    placeholder: 'Simulation de charge sur 4 à 16 semaines',
    src: '/images/coachs/programmation.JPG' as string | undefined,
  },
  {
    index: '04',
    title: 'Ton dashboard de groupe',
    desc: "Charge cumulée, forme moyenne, séances de la semaine, et la liste des grimpeurs à surveiller en priorité. Plus un digest par email chaque lundi. Tu repères ce qui compte sans éplucher chaque profil.",
    label: 'Dashboard groupe',
    placeholder: 'Vue équipe + liste à surveiller + digest du lundi',
    src: '/images/coachs/groupe.JPG' as string | undefined,
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
                lines={['Vois enfin ce que', 'vivent tes grimpeurs', 'entre deux séances.']}
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
                Une semaine compte 168&nbsp;heures. Tu n'en coaches qu'une poignée — le reste (sommeil, récupération, charge réelle) décide de leur progression, et tu ne le vois pas. WAC&nbsp;Coach te le rend visible&nbsp;: du ressenti déclaré à la donnée réelle.
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

      {/* ───────────── PROBLÈME ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)', lineHeight: '1.15' }}>
                Tu coaches à l'aveugle entre deux séances.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                Tu vois ton grimpeur une heure. Puis il disparaît&nbsp;: sa nuit avant la séance, sa fatigue accumulée, ses autres entraînements, sa vraie récup — tu n'en sais rien. Tu ajustes au ressenti qu'il veut bien te livrer. Et quand la fatigue parle à ta place, c'est souvent trop tard&nbsp;: la blessure est là, la progression casse, et l'adhérent décroche.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── SOLUTION ───────────── */}
      <section id="produit" className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)', lineHeight: '1.15' }}>
                Relie ce qu'ils font sur le mur à ce qu'ils vivent en dehors.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                Tes grimpeurs portent le bracelet WAC et utilisent l'app. Toi, tu retrouves tout dans ton espace coach&nbsp;: leur forme, leur charge, leur récupération — en temps réel, sans avoir à demander. Tu sais enfin qui pousser et qui laisser récupérer, <strong>avant</strong> que la fatigue ne décide pour toi.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── FONCTIONNALITÉS (lignes alternées, prêtes pour screenshots réels) ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-20" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Pour piloter, pas deviner.
            </h2>
          </Reveal>

          <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
            {FEATURES.map((f, i) => (
              <div key={f.index} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Texte */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <Reveal>
                    <div className="text-5xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-secondary-orange)', opacity: 0.3 }}>
                      {f.index}
                    </div>
                    <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                      {f.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                      {f.desc}
                    </p>
                  </Reveal>
                </div>

                {/* Visuel (cadre écran — screenshot réel à venir) */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <ScreenFrame src={f.src} label={f.label} placeholder={f.placeholder} tilt={i === 0} />
                </div>
              </div>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="text-center mt-20 text-sm italic" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
              + Ta bibliothèque de séances&nbsp;: capitalise tes modèles et tes exos custom pour programmer plus vite.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── BÉNÉFICES ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { t: 'Gagne du temps', d: 'Un écran au lieu de dix conversations. Tu repères l\'essentiel en un coup d\'œil.' },
              { t: 'Préviens la blessure', d: 'Repère la surcharge avant la casse : moins de blessés, plus d\'adhérents qui restent.' },
              { t: 'Coache avec crédibilité', d: 'Des décisions appuyées sur la donnée réelle, pas sur l\'intuition.' },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 0.1}>
                <motion.div
                  className="relative h-full p-7 rounded-[20px]"
                  style={{ border: '1px solid rgba(245,236,229,0.2)' }}
                  whileHover={{ y: -6, borderColor: 'rgba(216,90,26,0.9)', boxShadow: '0 16px 48px rgba(216,90,26,0.18)' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                >
                  <span className="absolute top-0 right-0 w-3 h-3" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <div className="w-10 h-1 mb-5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <h3 className="text-xl md:text-2xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>{b.t}</h3>
                  <p style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.85, lineHeight: '1.6' }}>{b.d}</p>
                </motion.div>
              </Reveal>
            ))}
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
              { n: '2', t: 'Ses données remontent', d: 'Sommeil, récup, charge — tout se synchronise automatiquement.' },
              { n: '3', t: 'Tu pilotes', d: 'Depuis ton espace coach, tu suis, tu programmes, tu ajustes.' },
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
              WAC Coach ouvre bientôt. Sois dans les premiers.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}>
              Réserve ta démo et découvre l'espace coach en avant-première. Choisis ton créneau en 2 minutes.
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
