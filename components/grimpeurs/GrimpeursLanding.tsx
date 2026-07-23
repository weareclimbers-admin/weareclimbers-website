'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Reveal, TitleReveal, CountUp } from '@/components/Reveal'
import Magnetic from '@/components/Magnetic'
import WaitlistSection from '@/components/WaitlistSection'
import { DERNIER_ARTICLE } from '@/lib/press'

/**
 * Landing /nos-grimpeurs — la surface de confiance.
 * Blocs : data de validation · athlètes & validateurs (SANS noms pour le moment,
 * rôles uniquement — décision Julien 17/07) · partenariat FFME NA (Équipementier
 * Officiel) · personas grimpeurs/grimpeuses · presse · témoignages · liste d'attente.
 */

const VALIDATEURS = [
  {
    role: 'Champion de France',
    detail: 'Difficulté 2024',
    text: 'Un athlète du plus haut niveau national valide WAC sur le terrain.',
  },
  {
    role: 'Athlète de haut niveau',
    detail: 'Créatrice de contenu escalade',
    text: 'Elle teste, challenge et partage sa vision de la grimpe au féminin.',
  },
  {
    role: 'Coach fédéral',
    detail: 'FFME',
    text: "Il confronte WAC à la réalité de l'entraînement structuré.",
  },
  {
    role: 'Entraîneur de club',
    detail: 'Club de référence nationale',
    text: 'Il pilote ses groupes compétition avec WAC Coach au quotidien.',
  },
]

function PersonaCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="h-full p-6 rounded-[20px]"
      style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.12)' }}
      whileHover={{ y: -6, boxShadow: '0 14px 40px rgba(216,90,26,0.14)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <Image src={icon} alt="" width={26} height={26} className="object-contain" />
      </span>
      <h3 className="text-lg md:text-xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
        {title}
      </h3>
      <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
        {children}
      </p>
    </motion.div>
  )
}

export default function GrimpeursLanding() {
  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden flex items-center pt-32 pb-16 md:pt-36 md:pb-20" style={{ minHeight: '72vh' }}>
        <div className="absolute inset-0 z-0">
          <Image src="/hero-mission.webp" alt="" fill priority quality={85} sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary-green)', opacity: 0.72 }} />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <TitleReveal
              lines={["WAC n'est pas", 'pour tout le monde.', "C'est fait pour toi."]}
              as="h1"
              className="text-5xl md:text-6xl lg:text-7xl mb-7 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)', lineHeight: '1.08' }}
            />
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.92, lineHeight: '1.6' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.3 }}
            >
              Grimpeur régulier ou athlète confirmée : WAC est construit avec celles et ceux qui grimpent — et validé par celles et ceux qui entraînent.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10" style={{ color: 'var(--color-primary-beige)' }}>
          © Stacie Ong
        </div>
      </section>

      {/* ───────────── DATA DE VALIDATION ───────────── */}
      <section className="py-14 md:py-16" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 items-start">
            {[
              { num: <CountUp to={102} duration={2} />, label: 'grimpeurs ont déjà acheté leur bracelet' },
              { num: <CountUp to={9} duration={1.4} />, label: "coachs embarqués dans l'aventure" },
              { num: <CountUp to={100} suffix=" %" duration={1.8} />, label: 'objectif de campagne atteint' },
              { num: <CountUp to={30} prefix="<" suffix=" s" duration={1.6} />, label: "pour analyser une séance" },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div>
                  <div className="text-3xl md:text-4xl leading-none" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
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

      {/* ───────────── ATHLÈTES & VALIDATEURS ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Validé par celles et ceux qui grimpent le plus fort.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-center mb-14" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
              Des athlètes de haut niveau et des coachs de référence utilisent WAC sur le terrain et façonnent le produit avec nous. On te les présentera très bientôt.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {VALIDATEURS.map((v, i) => (
              <Reveal key={v.role} delay={i * 0.08}>
                <div className="card-dark h-full relative">
                  <span className="absolute top-0 right-0 w-3.5 h-3.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                    {v.detail}
                  </p>
                  <h3 className="text-xl md:text-2xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                    {v.role}
                  </h3>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', opacity: 0.85, lineHeight: '1.6' }}>
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PARTENARIAT FFME NA ───────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0 p-6 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                  <div className="relative" style={{ width: '140px', height: '140px' }}>
                    <Image src="/liguenaffme.png" alt="Ligue Nouvelle-Aquitaine FFME" fill className="object-contain" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] mb-3" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                    Équipementier Officiel
                  </p>
                  <h2 className="text-2xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)', lineHeight: '1.15' }}>
                    Partenaire de la Ligue Nouvelle-Aquitaine FFME.
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.6' }}>
                    We Are Climbers est <strong>Équipementier Officiel de la Ligue Nouvelle-Aquitaine de la FFME</strong>. Des grimpeuses et des coachs fédéraux utilisent WAC sur le terrain — et leurs retours façonnent directement le produit.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── GRIMPEURS ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex justify-center mb-6">
                <span className="inline-block px-6 py-2 text-sm font-bold uppercase" style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)', fontFamily: 'var(--font-syne)' }}>
                  Grimpeurs
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl mb-6 text-center" style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase' }}>
                Tu grimpes pour progresser. WAC est fait pour ça.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-4 mb-12 max-w-3xl mx-auto text-center">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                  Tu grimpes 2 à 4 fois par semaine. Tu t'entraînes sérieusement. Et pourtant tu stagnes, tu accumules les douleurs, ou tu ne comprends pas pourquoi certaines séances sont catastrophiques.
                </p>
                <p className="text-lg leading-relaxed font-bold" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                  Ce n'est pas un manque de volonté. C'est un manque de données.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Reveal delay={0}>
                <PersonaCard icon="/icons/icons8-objectif-50.png" title="Comprends comment tu grimpes vraiment">
                  Zones d'effort, fréquence cardiaque à ±1 BPM, patterns de récupération. WAC t'explique ce que ton corps fait pendant que tu grimpes — pour que tu puisses grimper plus intelligemment.
                </PersonaCard>
              </Reveal>
              <Reveal delay={0.08}>
                <PersonaCard icon="/icons/icons8-bouclier-50.png" title="Grimpe plus longtemps sans te blesser">
                  WAC t'alerte quand ton corps accumule trop de fatigue. Pas après la tendinite. Avant. Parce que grimper longtemps vaut mieux que grimper fort une seule saison.
                </PersonaCard>
              </Reveal>
              <Reveal delay={0.16}>
                <PersonaCard icon="/icons/icons8-objectif-50.png" title="Passe tes plafonds de verre">
                  Tu stagnes depuis 6 mois ? Ce n'est probablement pas un problème de technique. C'est un problème d'entraînement non intentionnel. WAC t'aide à identifier ce qui bloque et comment le corriger.
                </PersonaCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── GRIMPEUSES ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex justify-center mb-6">
                <span className="inline-block px-6 py-2 text-sm font-bold uppercase" style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)', fontFamily: 'var(--font-syne)' }}>
                  Grimpeuses
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl mb-6 text-center" style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase' }}>
                Ton corps a son propre rythme. WAC est la première app à le comprendre.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-4 mb-12 max-w-3xl mx-auto text-center">
                <p className="text-lg leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                  Certaines semaines tu grimpes comme une déesse. D'autres, tu tiens à peine 3 mouvements. Et personne ne t'a jamais vraiment expliqué pourquoi.
                </p>
                <p className="text-lg leading-relaxed font-bold" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                  Ce n'est pas dans ta tête. C'est dans ton corps. Et ton corps mérite d'être compris, pas jugé.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Reveal delay={0}>
                <PersonaCard icon="/icons/icons8-cycle-menstruel-64.png" title="L'analyse hormonale — une première dans l'escalade">
                  WAC intègre l'impact de ton cycle menstruel sur ta performance. Force et intensité en phase folliculaire, technique et endurance en phase lutéale. Tu adaptes ton entraînement à ton corps — pas l'inverse.
                </PersonaCard>
              </Reveal>
              <Reveal delay={0.08}>
                <PersonaCard icon="/icons/icons8-cadenas-ouvert-48.png" title="Fini la culpabilité des mauvais jours">
                  Tes variations de performance ont une explication physiologique. WAC te la donne — pour que tu arrêtes de te blâmer et que tu commences à grimper en phase avec toi-même.
                </PersonaCard>
              </Reveal>
              <Reveal delay={0.16}>
                <PersonaCard icon="/icons/icons8-bouclier-50.png" title="Prévention pensée pour ton corps">
                  Alertes récupération, suivi de charge d'entraînement, recommandations adaptées à ton profil physiologique réel. Pas un programme générique conçu pour un corps masculin.
                </PersonaCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PRESSE (pull-quote) ───────────── */}
      {DERNIER_ARTICLE && (
        <section className="py-20 md:py-24">
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
        </section>
      )}

      {/* ───────────── TÉMOIGNAGES ───────────── */}
      <section className="pb-20 md:pb-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "Grâce au bracelet, j'ai compris que je grimpais systématiquement en zone rouge. WAC m'a montré comment doser mes efforts. Paradoxalement, depuis que j'en fais moins, je progresse plus vite.",
                author: 'Alex, 7a+, salle et falaise',
              },
              {
                quote:
                  "WAC m'a montré que mes 'mauvais jours' étaient systématiquement liés à ma phase lutéale. Maintenant j'adapte mes sessions selon mon cycle. Fini la culpabilité — mon corps n'est pas défaillant, il a juste son propre rythme.",
                author: 'Léa, 6b+, grimpe depuis 2 ans',
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

      {/* ───────────── CTA LISTE D'ATTENTE ───────────── */}
      <WaitlistSection
        heading="Rejoins celles et ceux qui grimpent avec WAC."
        subtitle="Les pré-commandes ouvrent bientôt, directement sur weareclimbers.fr. Laisse ton email pour être prévenu·e en premier."
      />

      {/* ───────────── PORTE COACH ───────────── */}
      <section className="py-10" style={{ backgroundColor: 'var(--color-primary-beige)', borderTop: '1px solid rgba(38,83,53,0.12)' }}>
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                <strong>Tu es coach ou tu entraînes en club&nbsp;?</strong> Il existe un espace pensé pour toi.
              </p>
              <Magnetic>
                <Link
                  href="/coachs"
                  className="font-bold uppercase text-sm tracking-wide hover:underline whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                >
                  Découvre WAC Coach →
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
