'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Reveal, TitleReveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import PhoneShot from '@/components/PhoneShot'
import WaitlistSection from '@/components/WaitlistSection'
import ReadyGauge from '@/components/home/ReadyGauge'

/**
 * Landing /l-app — preuve logicielle.
 * Objectif : démontrer l'intelligence de l'app.
 * SEO : « app entraînement escalade », « suivi charge escalade ».
 * Chaque feature est illustrée par une capture réelle (PhoneShot) —
 * les placeholders attendent les visuels de Julien dans /public/images/app/.
 */

/** Les 6 piliers du score État de Forme */
const PILIERS = [
  { t: 'Récupération temporelle', d: 'Le temps écoulé depuis ta dernière séance.' },
  { t: 'Récupération cardiaque', d: 'Ton HRR60 : la vitesse à laquelle ton cœur redescend après l\'effort.' },
  { t: 'Charge récente', d: 'Ta charge d\'entraînement calendaire des derniers jours.' },
  { t: 'Système nerveux', d: 'Ta variabilité cardiaque (HRV), reflet de ta fatigue nerveuse.' },
  { t: 'Ressenti', d: 'Ton check-in du matin : comment tu te sens vraiment.' },
  { t: 'Phase du cycle', d: 'Pour les grimpeuses : la phase de ton cycle, si tu la suis.' },
]

/** Sections features — captures réelles de l'app (vidéos rognées/compressées, un tableau = lecture en chaîne) */
const FEATURES: {
  kicker: string
  title: string
  desc: string
  src?: string | string[]
  placeholder: string
}[] = [
  {
    kicker: 'Après chaque session',
    title: 'Ton résumé de séance, en direct.',
    desc: "Tu poses le téléphone, tu grimpes. L'app détecte automatiquement les voies, les tentatives et les temps de repos. À la fin de la séance : zones d'effort, intensité, récupération — tout est là, sans rien saisir.",
    src: '/videos/app/seance.mp4',
    placeholder: 'Résumé de séance',
  },
  {
    kicker: 'Tes tableaux de bord',
    title: 'Performances & Santé. Charges & Mouvements.',
    desc: "Deux dashboards complémentaires : l'un suit ta forme, ta récupération cardiaque et ta fatigue accumulée ; l'autre décortique tes charges d'entraînement et tes mouvements. Tu vois les tendances que ton ressenti ne capte pas.",
    src: ['/videos/app/dashboard-1.mp4', '/videos/app/dashboard-2.mp4'],
    placeholder: 'Dashboards Performances & Santé / Charges & Mouvements',
  },
  {
    kicker: "L'analyse IA",
    title: 'Des insights, pas des graphiques de plus.',
    desc: "L'app transforme tes données en recommandations actionnables : « Ta récupération plafonne depuis 5 jours, allège ta prochaine séance. » Parfois elle te dit simplement : « Stop. Repose-toi. » Et elle est fière de te le dire.",
    src: '/videos/app/ia.mp4',
    placeholder: 'Insights & recommandations IA',
  },
  {
    kicker: 'Une première dans l’escalade',
    title: 'Ton cycle, pris en compte.',
    desc: "WAC analyse tes performances selon les phases de ton cycle menstruel et adapte ses recommandations : quand pousser, quand privilégier la technique ou la récup. 100 % optionnel, chiffré, jamais partagé. Validé avec la Dr Juliana Antero (INSEP).",
    src: '/videos/app/cycle-app.mp4',
    placeholder: 'Suivi du cycle menstruel',
  },
  {
    kicker: 'Chaque nuit compte',
    title: 'Ton sommeil et ta récupération, analysés.',
    desc: "Pendant que tu dors, WAC mesure ta récupération : durée et qualité du sommeil, variabilité cardiaque nocturne. C'est ce qui nourrit ton État de Forme du matin — et ce qui te dit si ton corps a vraiment encaissé la séance d'hier.",
    src: ['/videos/app/sommeil-1.mp4', '/videos/app/sommeil-2.mp4'],
    placeholder: 'Analyse du sommeil et de la récupération',
  },
]

export default function AppLanding() {
  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── HERO — ce que ton corps te dit aujourd'hui ───────────── */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.12} drift={false} />
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
                L'app We Are Climbers
              </motion.p>

              <TitleReveal
                lines={['Ce que ton corps', "te dit, aujourd'hui."]}
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl mb-7"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-beige)',
                  lineHeight: '1.08',
                }}
              />

              <motion.p
                className="text-lg md:text-xl mb-9 max-w-xl"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
              >
                Chaque matin, ton État de Forme résume ce que ton corps a vécu — et te dit si aujourd'hui, c'est grosse séance ou récup. Calculé depuis six signaux que ton ressenti seul ne capte pas.
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
                  <Link href="/le-bracelet" className="btn-beige inline-block">
                    Le bracelet qui va avec
                  </Link>
                </Magnetic>
              </motion.div>
            </div>

            {/* Jauge en carte glass */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.4 }}
            >
              <div className="glass-card w-full max-w-sm p-7 md:p-8">
                <ReadyGauge value={82} />
              </div>
            </motion.div>
          </div>

          {/* Les 5 piliers du score */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
            {PILIERS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="h-full p-5 rounded-[16px]" style={{ border: '1px solid rgba(245,236,229,0.2)' }}>
                  <div className="w-8 h-1 mb-3" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <h3 className="text-base md:text-lg mb-1.5" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-beige)' }}>
                    {p.t}
                  </h3>
                  <p className="text-xs md:text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.75, lineHeight: '1.5' }}>
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FEATURES — chaque bloc = capture réelle ───────────── */}
      {FEATURES.map((f, i) => (
        <section
          key={f.title}
          className="py-20 md:py-24"
          style={{ backgroundColor: i % 2 === 1 ? 'var(--color-secondary-beige-light)' : 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <Reveal>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] mb-4" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                    {f.kicker}
                  </p>
                  <h2
                    className="text-2xl md:text-4xl mb-5"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)', lineHeight: '1.15' }}
                  >
                    {f.title}
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.65' }}>
                    {f.desc}
                  </p>
                </Reveal>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <PhoneShot src={f.src} alt={f.title} placeholder={f.placeholder} width={250} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ───────────── CTA — L'APP EST GRATUITE ───────────── */}
      <WaitlistSection
        heading="L'app est gratuite."
        subtitle="Rejoins la liste pour être notifié·e du lancement — et réserver ton bracelet en avant-première au tarif Fondateur."
      />
    </main>
  )
}
