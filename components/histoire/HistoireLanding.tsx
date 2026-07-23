'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Reveal, TitleReveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import WaitlistSection from '@/components/WaitlistSection'

/**
 * Landing /histoire — le récit fondateur (copy d'origine préservée, ton émotionnel)
 * + blocs Mission et 4 piliers éditoriaux (Science du corps · Progression durable ·
 * Transparence & engagement · Vie de grimpeur). CTA liste d'attente.
 */

const PILIERS = [
  {
    n: '01',
    t: 'Science du corps',
    d: "Physiologie, récupération, cycle hormonal : on vulgarise la science pour que tu comprennes ce que ton corps vit — sans jargon, sans bullshit.",
  },
  {
    n: '02',
    t: 'Progression durable',
    d: "Progresser, c'est durer. Entraînement intelligent, prévention des blessures, tous niveaux : la vraie performance se mesure sur des années.",
  },
  {
    n: '03',
    t: 'Transparence & engagement',
    d: "Nos choix techniques, nos limites, nos coulisses : on dit ce qu'on fait et on fait ce qu'on dit. Même quand c'est inconfortable.",
  },
  {
    n: '04',
    t: 'Vie de grimpeur',
    d: "L'authenticité avant tout : les vrais moments de grimpe, les galères, l'humour du milieu. Parce que WAC est fait par des grimpeurs, pour des grimpeurs.",
  },
]

export default function HistoireLanding() {
  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden flex items-center pt-32 pb-16 md:pt-36 md:pb-20" style={{ minHeight: '72vh' }}>
        <div className="absolute inset-0 z-0">
          <Image src="/julien-bloc.jpeg" alt="" fill priority quality={85} sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-primary-green)', opacity: 0.72 }} />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-5xl mx-auto text-center">
            <TitleReveal
              lines={['Notre histoire']}
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
              L'histoire de We Are Climbers, ou comment une double tendinite a changé ma vision de la progression en escalade.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10" style={{ color: 'var(--color-primary-beige)' }}>
          © Benjamin Gardey
        </div>
      </section>

      {/* ───────────── LE DÉCLIC ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12 text-center" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                Le déclic
              </h2>
            </Reveal>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal><p>Je m'appelle <strong>Julien</strong>. J'ai créé We Are Climbers après une double tendinite à chaque bras.</p></Reveal>
              <Reveal delay={0.05}><p>Et surtout, je me sentais bloqué. Plafond de verre infranchissable. Pas moyen de progresser.</p></Reveal>
              <Reveal delay={0.1}><p>Je grimpais 4×/semaine. Je m'entraînais dur. Mais rien ne bougeait.</p></Reveal>
              <Reveal delay={0.15}><p>Pire : <strong>mon corps me lâchait.</strong></p></Reveal>
              <Reveal delay={0.2}>
                <p>
                  Alors je me suis mis à chercher des outils, des montres, des apps, des comptes instas qui me permettraient de comprendre pourquoi je galérais et comment m'améliorer sans me blesser.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-2xl font-medium">
                  Et je me suis rendu compte d'un truc : <strong>aucune montre ou bracelet n'existait, aucune app insta ne me disait « Stop. Repose-toi. »</strong>
                </p>
              </Reveal>
              <Reveal delay={0.3}><p>Elles me disaient juste : « Allez, encore une séance. Pousse plus fort. No pain no gain. »</p></Reveal>
              <Reveal delay={0.35}>
                <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                  Bullshit.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── LA DÉCISION ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12 text-center" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                La décision
              </h2>
            </Reveal>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal><p>Alors j'ai décidé de créer l'app que j'aurais voulu avoir.</p></Reveal>

              <Reveal delay={0.05}>
                <div className="p-8 rounded-[20px]" style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.12)' }}>
                  <p className="font-medium mb-4">Une app qui :</p>
                  <ul className="space-y-3">
                    {[
                      'Comprend que progresser ≠ grimper tous les jours',
                      "Me dit parfois « Aujourd'hui, reste à la maison »",
                      "Analyse mon corps pour m'aider à comprendre MES patterns",
                      "Me connecte avec d'autres grimpeurs qui galèrent aussi",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}><p>Je suis pas développeur de formation. Je suis grimpeur.</p></Reveal>
              <Reveal delay={0.15}>
                <p>
                  J'ai appris les bases du codage sur Youtube.<br />
                  J'ai galéré à faire communiquer l'application et le bracelet Polar.<br />
                  J'ai oublié qu'il n'y avait que 24h dans une journée.<br />
                  J'ai même pleuré quand mon premier APK a planté.
                </p>
              </Reveal>
              <Reveal delay={0.2}><p>Mais j'ai continué.</p></Reveal>
              <Reveal delay={0.25}><p className="text-2xl font-bold">Parce que je crois en cette vision :</p></Reveal>

              {/* Pull-quote vision */}
              <Reveal delay={0.3}>
                <div className="relative pl-10 md:pl-14 py-4">
                  <span
                    aria-hidden
                    className="absolute left-0 -top-3 leading-none select-none"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '5rem', color: 'var(--color-secondary-orange)' }}
                  >
                    “
                  </span>
                  <p className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-secondary-orange)', lineHeight: '1.3' }}>
                    La grimpe mérite mieux que des apps qui te jugent. Elle mérite une app qui te comprend.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── LA MISSION ───────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.1} drift={false} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                Notre mission
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-3xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)', lineHeight: '1.15' }}>
                Comprends ce que ton corps te dit. Progresse sans jamais l'abîmer.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: '1.65' }}>
                L'analyse physiologique intelligente, pour tous les grimpeurs et toutes les grimpeuses. Pas que pour l'élite. Pas que pour la performance. Pour que chacun·e puisse grimper mieux, plus longtemps.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── LES 4 PILIERS ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <h2 className="text-3xl md:text-5xl text-center mb-14" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
              Ce qui nous guide.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {PILIERS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="card-dark h-full relative">
                  <span className="absolute top-0 right-0 w-3.5 h-3.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                  <div className="text-4xl mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-secondary-orange)', opacity: 0.35 }}>
                    {p.n}
                  </div>
                  <h3 className="text-xl md:text-2xl mb-3" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>
                    {p.t}
                  </h3>
                  <p className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', opacity: 0.88, lineHeight: '1.6' }}>
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── POURQUOI LE CYCLE MENSTRUEL ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                Pourquoi le cycle menstruel&nbsp;?
              </h2>
            </Reveal>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal><p>C'est la question qu'on me pose le plus.</p></Reveal>
              <Reveal delay={0.05}><p className="text-2xl font-medium italic">« Julien, t'es un mec. Pourquoi tu parles de règles ? »</p></Reveal>
              <Reveal delay={0.1}>
                <p className="text-2xl font-bold">
                  La réponse est simple : <span style={{ color: 'var(--color-secondary-orange)' }}>j'ai écouté.</span>
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>Pendant des années, j'ai grimpé avec ma compagne et des grimpeuses qui se posaient toutes la même question :</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl italic text-center py-4">
                  « Pourquoi certaines semaines, je grimpe comme une déesse, et d'autres, je tiens pas 3 mouvements ? »
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p>Les mecs, on se pose jamais cette question. Nos performances varient, mais pas de manière aussi cyclique, aussi prévisible.</p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>Un jour, ma compagne m'a dit : « Tu te rends compte qu'AUCUNE app d'escalade ne parle du cycle menstruel ? »</p>
              </Reveal>
              <Reveal delay={0.35}><p>Elle avait raison.</p></Reveal>

              <Reveal delay={0.4}>
                <div className="relative text-center py-10 px-8 my-6 max-w-xl mx-auto" style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}>
                  <span className="absolute top-0 right-0 w-4 h-4" style={{ backgroundColor: 'var(--color-primary-green)' }} />
                  <p className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                    50 % des grimpeurs ont un cycle hormonal.
                  </p>
                  <p className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
                    Et 0 % des apps en parlent.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.45}><p>Pas par méchanceté. Juste parce que personne n'y pense.</p></Reveal>
              <Reveal delay={0.5}><p className="text-2xl font-bold">Alors j'ai décidé d'y penser.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── LA DÉMARCHE SCIENTIFIQUE ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12 text-center" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                La démarche scientifique
              </h2>
            </Reveal>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal><p>Je suis pas chercheur. Je suis pas médecin.</p></Reveal>
              <Reveal delay={0.05}>
                <p className="text-2xl font-medium">
                  Alors j'ai fait ce que tout bon grimpeur fait face à un problème : <strong>j'ai cherché des beta.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  J'ai lu toutes les publications scientifiques que j'ai pu trouver. Notamment celles citées dans ces deux excellents articles de blog de Juliette Bergmann :
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="p-8 rounded-[20px] space-y-4" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                  <p className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                    <a
                      href="https://juliettebergmanescalade.fr/2025/03/14/entrainement-au-feminin-part-1-theorie-des-hormones/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-75 transition-opacity"
                    >
                      Entraînement au féminin — Part 1 : Théorie des hormones
                    </a>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                    <a
                      href="https://juliettebergmanescalade.fr/2025/04/14/entrainement-au-feminin-partie-2-sentrainer-en-phase-avec-son-cycle/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-75 transition-opacity"
                    >
                      Entraînement au féminin — Partie 2 : S'entraîner en phase avec son cycle
                    </a>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p>
                  Et aujourd'hui, <strong>je suis en train de me rapprocher de l'INSEP et de Juliana Antero</strong>, qui a développé le projet <strong>Empow'her</strong> (recherche sur l'impact hormonal sur la performance chez les femmes).
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p>
                  Mon objectif : faire valider scientifiquement mes hypothèses et collaborer avec des laboratoires de recherche pour <strong>vraiment</strong> améliorer la compréhension de ce sujet.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-2xl font-bold text-center py-4" style={{ fontFamily: 'var(--font-syne)' }}>
                  Parce que je suis pas là pour faire du greenwashing scientifique.
                </p>
              </Reveal>
              <Reveal delay={0.35}><p className="text-xl text-center">Je suis là pour aider. Vraiment.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── POURQUOI LA FRANCE / L'ÉCO-CONCEPTION ───────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <TopoLines opacity={0.1} drift={false} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12 text-center" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}>
                L'éco-conception : pas du greenwashing
              </h2>
            </Reveal>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)' }}>
              <Reveal><p>L'autre pilier de WAC, c'est l'éco-conception.</p></Reveal>
              <Reveal delay={0.05}>
                <p>
                  Pas parce que c'est « trendy ».<br />
                  Pas parce que ça fait bien sur un slide PowerPoint.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary-orange)' }}>
                  Mais parce qu'on grimpe dans la nature. Et la nature, on la protège.
                </p>
              </Reveal>
              <Reveal delay={0.15}><p className="text-xl font-medium">Concrètement, ça veut dire quoi ?</p></Reveal>

              <Reveal delay={0.2}>
                <div className="p-8 rounded-[20px] space-y-4" style={{ backgroundColor: 'var(--color-primary-beige)', color: 'var(--color-primary-green)' }}>
                  {[
                    ['Compression images automatique', 'Réduction 90 % des données uploadées'],
                    ['Optimisation batterie', 'Architecture offline-first, synchronisation intelligente'],
                    ['Hébergement serveurs bas carbone', 'Datacenters EU verts (RGPD strict)'],
                    ['Développée en France', 'Réduction empreinte carbone transport/communication'],
                    ['Roadmap 2027', 'Bracelet éco-responsable made in France'],
                  ].map(([strong, rest]) => (
                    <p key={strong} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
                      >
                        ✓
                      </span>
                      <span>
                        <strong>{strong}</strong> : {rest}
                      </span>
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="text-xl font-medium">
                  Est-ce que WAC est parfaite écologiquement ? <strong style={{ color: 'var(--color-secondary-orange)' }}>Non.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.3}><p>Une app, par définition, consomme de l'énergie. Des serveurs. De la data.</p></Reveal>
              <Reveal delay={0.35}><p>Mais on fait le maximum pour minimiser cet impact. Et on est transparents sur nos limites.</p></Reveal>
              <Reveal delay={0.4}>
                <p className="text-xl text-center py-4">
                  Parce que l'éco-responsabilité, c'est pas un badge marketing.<br />
                  <strong>C'est un engagement quotidien.</strong>
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="text-center">
                  <Link
                    href="/engagements"
                    className="text-sm font-bold uppercase tracking-wide hover:underline"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                  >
                    Voir tous nos engagements →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── LA COMMUNAUTÉ ───────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                La communauté
              </h2>
            </Reveal>

            <div className="space-y-5 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal><p>Aujourd'hui, WAC c'est plus que moi.</p></Reveal>
              <Reveal delay={0.05}><p>C'est des beta-testeurs qui testent, galèrent, donnent du feedback brutal et honnête.</p></Reveal>
              <Reveal delay={0.1}><p>C'est des médecins du sport qui valident les algorithmes.</p></Reveal>
              <Reveal delay={0.15}><p>C'est des grimpeuses qui disent « Enfin une app qui parle de mon cycle ».</p></Reveal>
              <Reveal delay={0.2}><p>C'est des grimpeurs de tous niveaux qui progressent sans se détruire.</p></Reveal>
              <Reveal delay={0.25}>
                <p className="text-2xl md:text-3xl font-bold pt-4" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                  Et demain, j'espère, ce sera toi.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── ON A EU NOTRE RÉPONSE ───────────── */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl mb-12 text-center" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}>
                On a eu notre réponse
              </h2>
            </Reveal>

            <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
              <Reveal><p>On a lancé une campagne pour tester une intuition.</p></Reveal>
              <Reveal delay={0.05}><p>Pas pour lever des millions.</p></Reveal>
              <Reveal delay={0.1}>
                <p className="text-2xl font-bold" style={{ color: 'var(--color-secondary-orange)' }}>
                  Pour savoir si on est seuls à penser que la grimpe mérite mieux.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  Objectif atteint à 100 %. Vous avez été nombreux et nombreuses à répondre présent.<br />
                  On a notre réponse : on n'est pas seuls.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── CTA LISTE D'ATTENTE ───────────── */}
      <WaitlistSection
        heading="Rejoins le mouvement."
        subtitle="Les pré-commandes ouvrent bientôt, directement sur weareclimbers.fr. Laisse ton email pour faire partie des premiers."
      />
    </main>
  )
}
