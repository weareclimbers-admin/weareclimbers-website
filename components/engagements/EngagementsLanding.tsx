'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Reveal, TitleReveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import WaitlistSection from '@/components/WaitlistSection'

/**
 * Landing /engagements — fusion mission RSE + roadmap (ex /roadmap-rse).
 * Transparence radicale : état actuel honnête (Polar, Firebase), feuille de route,
 * réalités économiques, reporting annuel. Copy d'origine passée au tutoiement
 * (charte de marque) et neutralisée sur l'autonomie (chiffre à confirmer).
 */

const ENGAGEMENTS = [
  { icon: '/icons/icons8-plante-50.png', title: 'Éco-conception', desc: 'Matériaux recyclés, fabrication locale, hébergement vert' },
  { icon: '/icons/icons8-bouclier-50.png', title: 'Prévention', desc: "Protection des sites d'escalade et de la santé des grimpeurs" },
  { icon: '/icons/icons8-recycler-50.png', title: 'Circularité', desc: 'Réparabilité, longévité et recyclage de nos produits' },
  { icon: '/icons/icons8-idée-96.png', title: 'Transparence', desc: 'Honnêteté sur nos choix, nos limites et notre progression' },
]

const ROADMAP = [
  {
    phase: '6 mois',
    title: 'Migration vers OVH',
    items: [
      'Transfert de notre infrastructure depuis Firebase vers OVH',
      'Entreprise française : souveraineté des données, hébergement 100 % France',
      'Datacenters optimisés : refroidissement par eau, énergie renouvelable',
      'Engagement environnemental : recyclage des serveurs, circuits courts',
    ],
  },
  {
    phase: '3 ans',
    title: 'Migration vers Izaralde + Bracelet WAC',
    items: [
      'Hébergement 100 % vert au Pays Basque (Izaralde)',
      'Datacenter éco-conçu, énergie renouvelable, structure locale et éthique',
      'Développement du bracelet WAC avec éco-conception stricte',
      'Matériaux recyclés & biosourcés, réparabilité maximale, fabrication locale',
      'Programme de reprise et recyclage des anciens bracelets',
    ],
  },
  {
    phase: '5 ans',
    title: 'Neutralité carbone & B-Corp',
    items: [
      'Bilan carbone complet et compensation 100 % de nos émissions',
      'Certification B-Corp obtenue',
      "Production 100 % locale (France/Europe de l'Ouest)",
      'Bracelet WAC 2.0 : durée de vie 5+ ans, batterie remplaçable',
    ],
  },
]

export default function EngagementsLanding() {
  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden flex items-center pt-32 pb-16 md:pt-36 md:pb-20" style={{ minHeight: '72vh' }}>
        <div className="absolute inset-0 z-0">
          <Image src="/hero-roadmap-rse.webp" alt="" fill priority quality={85} sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary-green)', opacity: 0.72 }} />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <TitleReveal
              lines={['Nos engagements']}
              as="h1"
              className="text-6xl md:text-7xl lg:text-8xl mb-7 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)', lineHeight: '1.05' }}
            />
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.92, lineHeight: '1.5' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
            >
              Transparence totale sur notre impact environnemental et notre feuille de route responsable.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10" style={{ color: 'var(--color-primary-beige)' }}>
          © Vitaly Gariev
        </div>
      </section>

      {/* ───────────── INTRO TRANSPARENCE ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal>
                <p className="text-2xl font-medium" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                  On veut être 100 % transparents avec toi.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Chez We Are Climbers, on est convaincus que l'innovation technologique doit aller de pair avec la responsabilité environnementale et sociale. Notre passion pour l'escalade nous pousse à protéger les espaces naturels qu'on aime tant.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  <strong>On n'est pas parfaits.</strong> On ne prétend pas avoir toutes les solutions dès le lancement. Mais on a une vision claire et une feuille de route ambitieuse pour réduire notre impact à chaque étape.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── LES 4 ENGAGEMENTS ───────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-14" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Nos engagements
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="card-dark h-full text-center relative">
                  <span className="absolute top-0 right-0 w-3.5 h-3.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                    <Image src={e.icon} alt="" width={28} height={28} className="object-contain" />
                  </span>
                  <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>{e.title}</h3>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', opacity: 0.88, lineHeight: '1.6' }}>{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ÉTAT ACTUEL (transparence radicale) ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-14" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Où on en est, honnêtement.
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Polar 360 */}
            <Reveal>
              <div className="h-full p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                  Le bracelet : Polar 360
                </h3>
                <p className="mb-5" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                  Pour notre lancement, on a choisi le <strong>Polar 360</strong>, un capteur développé par Polar Electro (Finlande). Voici pourquoi :
                </p>
                <ul className="space-y-3 mb-5">
                  {[
                    ["Pas d'écran", 'fini les distractions. Tu grimpes, le bracelet mesure. Point.'],
                    ['Capteurs essentiels uniquement', 'fréquence cardiaque, accéléromètre, gyroscope. Pas de gadgets inutiles.'],
                    ['Autonomie longue durée', "moins de recharges, moins d'usure."],
                    ['Démarche environnementale de Polar', 'certification ISO 14001, fabrication durable, exploration de matériaux recyclés.'],
                  ].map(([strong, rest]) => (
                    <li key={strong} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}>
                        ✓
                      </span>
                      <span style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.55' }}>
                        <strong>{strong}</strong> — {rest}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="italic" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}>
                  → Un bracelet sobre, efficace, qui fait ce qu'on lui demande — sans superflu.
                </p>
              </div>
            </Reveal>

            {/* Firebase */}
            <Reveal delay={0.1}>
              <div className="h-full p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                  Hébergement : Firebase (Paris)
                </h3>
                <div className="space-y-4" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                  <p>
                    Actuellement, notre application est hébergée sur <strong>Firebase (Google Cloud)</strong>, avec des serveurs situés à <strong>Paris (europe-west1)</strong>.
                  </p>
                  <p>
                    <strong>Pourquoi Firebase aujourd'hui ?</strong> Fiabilité, scalabilité, coût de démarrage adapté à une jeune startup, conformité RGPD.
                  </p>
                  <p>
                    <strong>Notre position :</strong> on est conscients que Google n'est pas l'hébergeur idéal d'un point de vue éthique et environnemental. Mais c'est un choix pragmatique de démarrage. On a une feuille de route claire pour migrer vers des solutions plus responsables dès que nos moyens nous le permettront.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── FEUILLE DE ROUTE ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-16" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Notre feuille de route
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-14">
            {ROADMAP.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative pl-10" style={{ borderLeft: '4px solid var(--color-secondary-orange)' }}>
                  <div className="absolute -left-3.5 top-0 w-7 h-7 flex items-center justify-center" style={{ backgroundColor: 'var(--color-secondary-orange)' }}>
                    <span className="w-2 h-2" style={{ backgroundColor: 'var(--color-primary-beige)' }} />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] mb-2" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                    {step.phase}
                  </p>
                  <h3 className="text-2xl md:text-3xl mb-5" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {step.title}
                  </h3>
                  <ul className="space-y-3">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                        <span style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.55' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pourquoi pas dès aujourd'hui */}
          <Reveal delay={0.1}>
            <div className="max-w-3xl mx-auto mt-16 p-8 md:p-12 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.12)' }}>
              <h3 className="text-2xl md:text-3xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                Pourquoi pas dès aujourd'hui ?
              </h3>
              <div className="space-y-4" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                <p className="text-lg font-medium">
                  <strong>Parce qu'on veut être honnêtes avec toi.</strong>
                </p>
                <p>
                  Créer un bracelet connecté éco-conçu de A à Z, avec des matériaux responsables, une fabrication locale et une réparabilité maximale, c'est un <strong>investissement colossal</strong>.
                </p>
                <div className="p-6 rounded-[14px]" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                  <p className="font-medium mb-3">Les réalités économiques :</p>
                  <ul className="space-y-2 text-sm">
                    <li>• R&D hardware : centaines de milliers d'euros (conception, prototypage, certifications)</li>
                    <li>• Moules et outillage : investissement lourd pour produire à l'échelle</li>
                    <li>• Matériaux responsables : coûtent plus cher que le plastique vierge</li>
                    <li>• Fabrication locale : 3 à 5 fois plus cher qu'une production délocalisée</li>
                  </ul>
                </div>
                <p>
                  On est une <strong>jeune startup</strong>. On n'a pas (encore) les millions d'euros nécessaires pour fabriquer notre propre bracelet dans les conditions qu'on souhaite.
                </p>
                <div className="relative p-6" style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}>
                  <span className="absolute top-0 right-0 w-3 h-3" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <p className="font-bold mb-3" style={{ fontFamily: 'var(--font-syne)' }}>Notre engagement :</p>
                  <p>
                    Dès que nos revenus le permettront — grâce à toi, notre communauté — on investira dans la R&D et la fabrication de notre propre bracelet éco-conçu. Chaque euro gagné sera réinvesti dans notre mission : créer une technologie plus responsable, plus durable, plus éthique.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── OBJECTIFS 2026 ───────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.1} drift={false} />
        <div className="container-custom relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-14" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}>
              Nos objectifs 2026
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              { big: '1 %', text: 'du CA reversé via 1% for the Planet' },
              { big: 'OVH', text: 'migration hébergement vers serveurs français' },
              { big: 'R&D', text: 'lancement de la R&D bracelet WAC éco-conçu' },
            ].map((o, i) => (
              <Reveal key={o.big} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-secondary-orange)' }}>
                    {o.big}
                  </div>
                  <p className="text-lg" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9 }}>
                    {o.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="max-w-3xl mx-auto mt-14 text-center text-xl md:text-2xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.92 }}>
              Parce que grimper dans la nature, c'est la respecter.
              <br />
              Et que la vraie performance, c'est celle qui ne détruit rien sur son passage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── TRANSPARENCE & REPORTING ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-[20px]" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
              <h2 className="text-2xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                Transparence et reporting
              </h2>
              <div className="space-y-4" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                <p className="text-lg">
                  On s'engage à publier <strong>chaque année un rapport détaillé de nos actions RSE</strong>, incluant nos réussites, nos défis et nos axes d'amélioration.
                </p>
                <p className="text-lg">
                  <strong>Transparence :</strong> on n'a pas encore de rapport RSE publié, car on est en phase de lancement. Notre premier rapport sera publié en <strong>janvier 2027</strong>, couvrant l'année 2026.
                </p>
                <div className="p-6 rounded-[14px]" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                  <p className="font-medium mb-3">Ce que contiendra notre rapport RSE annuel :</p>
                  <ul className="space-y-2">
                    {[
                      'Bilan carbone complet de nos activités',
                      'Transparence sur nos fournisseurs et nos choix de fabrication',
                      'Actions concrètes menées pour réduire notre impact',
                      'Montants reversés via 1% for the Planet et associations soutenues',
                      "Objectifs pour l'année suivante",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── CTA LISTE D'ATTENTE ───────────── */}
      <WaitlistSection
        heading="Soutiens notre démarche."
        subtitle="Rejoins-nous dans cette aventure : ensemble, construisons une escalade plus responsable. Sois prévenu·e en premier de l'ouverture des pré-commandes."
      />
    </main>
  )
}
