import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function Histoire() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section
          className="pt-32 pb-12 md:py-32 relative"
          style={{
            backgroundImage: 'url(/julien-bloc.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'var(--color-primary-beige)'
          }}
        >
          <div className="absolute inset-0 bg-primary-green opacity-70"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
                NOTRE HISTOIRE
              </h1>
              <p className="text-xl md:text-2xl font-roboto font-light leading-relaxed">
                L'histoire de We Are Climbers, ou comment une double tendinite
                a changé ma vision de la progression en escalade.
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © Benjamin Gardey
          </div>
        </section>

        {/* LE DÉCLIC */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                LE DÉCLIC
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed">
                <p data-aos="fade-up">
                  Je m'appelle <strong>Julien</strong>. J'ai créé We Are Climbers après une double tendinite à chaque bras.
                </p>

                <p data-aos="fade-up" data-aos-delay="100">
                  Et surtout, je me sentais bloqué. Plafond de verre infranchissable. Pas moyen de progresser.
                </p>

                <p data-aos="fade-up" data-aos-delay="200">
                  Je grimpais 4×/semaine. Je m'entraînais dur. Mais rien ne bougeait.
                </p>

                <p data-aos="fade-up" data-aos-delay="300">
                  Pire : <strong>mon corps me lâchait.</strong>
                </p>

                <p data-aos="fade-up" data-aos-delay="400">
                  Alors je me suis mis à chercher des outils, des montres, des apps, des comptes instas qui me permettrait
                  de comprendre pourquoi je galérais et comment m'améliorer sans me blesser.
                </p>

                <p data-aos="fade-up" data-aos-delay="500" className="text-2xl font-medium">
                  Et je me suis rendu compte d'un truc : <strong>Aucune montre ou bracelet n'existait, aucune app insta
                  ne me disait "Stop. Repose-toi."</strong>
                </p>

                <p data-aos="fade-up" data-aos-delay="600">
                  Elles me disaient juste : "Allez, encore une séance. Pousse plus fort. No pain no gain."
                </p>

                <p data-aos="fade-up" data-aos-delay="700" className="text-2xl font-bold text-secondary-orange">
                  Bullshit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LA DÉCISION */}
        <section className="py-20" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                LA DÉCISION
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed">
                <p data-aos="fade-up">
                  Alors j'ai décidé de créer l'app que j'aurais voulu avoir.
                </p>

                <div data-aos="fade-up" data-aos-delay="100" className="bg-primary-beige p-8">
                  <p className="font-medium mb-4">Une app qui :</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 text-2xl">•</span>
                      <span>Comprend que progresser ≠ grimper tous les jours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 text-2xl">•</span>
                      <span>Me dit parfois "Aujourd'hui, reste à la maison"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 text-2xl">•</span>
                      <span>Analyse mon corps pour m'aider à comprendre MES patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 text-2xl">•</span>
                      <span>Me connecte avec d'autres grimpeurs qui galèrent aussi</span>
                    </li>
                  </ul>
                </div>

                <p data-aos="fade-up" data-aos-delay="200">
                  Je suis pas développeur de formation. Je suis grimpeur.
                </p>

                <p data-aos="fade-up" data-aos-delay="300">
                  J'ai appris les bases du codage sur Youtube.<br />
                  J'ai galéré à faire communiquer l'application et le bracelet Polar.<br />
                  J'ai oublié qu'il n'y avait que 24h dans une journée.<br />
                  J'ai même pleuré quand mon premier APK a planté.
                </p>

                <p data-aos="fade-up" data-aos-delay="400">
                  Mais j'ai continué.
                </p>

                <p data-aos="fade-up" data-aos-delay="500" className="text-2xl font-bold text-primary-green">
                  Parce que je crois en cette vision :
                </p>

                <p data-aos="fade-up" data-aos-delay="600" className="text-2xl md:text-3xl font-bold text-secondary-orange italic text-center py-8">
                  La grimpe mérite mieux que des apps qui te jugent.<br />
                  Elle mérite une app qui te comprend.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* POURQUOI LE CYCLE MENSTRUEL */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto" style={{
              borderLeft: '6px solid var(--color-secondary-orange)',
              paddingLeft: '2rem'
            }}>
              <h2 className="text-4xl md:text-5xl mb-12" style={{ color: 'var(--color-primary-green)' }} data-aos="fade-up">
                POURQUOI LE CYCLE MENSTRUEL ?
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl leading-relaxed" style={{ color: 'var(--color-primary-green)' }}>
                <p data-aos="fade-up">
                  C'est la question qu'on me pose le plus.
                </p>

                <p data-aos="fade-up" data-aos-delay="100" className="text-2xl font-medium italic">
                  "Julien, t'es un mec. Pourquoi tu parles de règles ?"
                </p>

                <p data-aos="fade-up" data-aos-delay="200" className="text-2xl font-bold">
                  La réponse est simple : <span style={{ color: 'var(--color-secondary-orange)' }}>j'ai écouté.</span>
                </p>

                <p data-aos="fade-up" data-aos-delay="300">
                  Pendant des années, j'ai grimpé avec ma compagne et des grimpeuses qui se posaient
                  toutes la même question :
                </p>

                <p data-aos="fade-up" data-aos-delay="400" className="text-xl italic text-center py-6">
                  "Pourquoi certaines semaines, je grimpe comme une déesse, et d'autres, je tiens pas 3 mouvements ?"
                </p>

                <p data-aos="fade-up" data-aos-delay="500">
                  Les mecs, on se pose jamais cette question. Nos performances varient, mais pas de manière
                  aussi cyclique, aussi prévisible.
                </p>

                <p data-aos="fade-up" data-aos-delay="600">
                  Un jour, ma compagne m'a dit : "Tu te rends compte qu'AUCUNE app d'escalade ne parle du cycle menstruel ?"
                </p>

                <p data-aos="fade-up" data-aos-delay="700">
                  Elle avait raison.
                </p>

                <div data-aos="fade-up" data-aos-delay="800" className="text-center py-8" style={{
                  backgroundColor: 'var(--color-secondary-orange)',
                  color: 'var(--color-primary-beige)',
                  margin: '2rem 0',
                  padding: '2rem',
                  maxWidth: '600px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  <p className="text-3xl md:text-4xl font-bold mb-4">
                    50% des grimpeurs ont un cycle hormonal.
                  </p>
                  <p className="text-3xl md:text-4xl font-bold">
                    Et 0% des apps en parlent.
                  </p>
                </div>

                <p data-aos="fade-up" data-aos-delay="900">
                  Pas par méchanceté. Juste parce que personne n'y pense.
                </p>

                <p data-aos="fade-up" data-aos-delay="1000" className="text-2xl font-bold">
                  Alors j'ai décidé d'y penser.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LA DÉMARCHE SCIENTIFIQUE */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                LA DÉMARCHE SCIENTIFIQUE
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed">
                <p data-aos="fade-up">
                  Je suis pas chercheur. Je suis pas médecin.
                </p>

                <p data-aos="fade-up" data-aos-delay="100" className="text-2xl font-medium">
                  Alors j'ai fait ce que tout bon grimpeur fait face à un problème : <strong>j'ai cherché des beta.</strong>
                </p>

                <p data-aos="fade-up" data-aos-delay="200">
                  J'ai lu toutes les publications scientifiques que j'ai pu trouver. Notamment celles citées
                  dans ces deux excellents articles de blog de Juliette Bergmann :
                </p>

                <div data-aos="fade-up" data-aos-delay="300" className="bg-primary-beige p-8 space-y-4">
                  <p className="flex items-start">
                    <span className="mr-3">👉</span>
                    <a
                      href="https://juliettebergmanescalade.fr/2025/03/14/entrainement-au-feminin-part-1-theorie-des-hormones/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-secondary-orange transition-colors"
                    >
                      Entraînement au féminin - Part 1 : Théorie des hormones
                    </a>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3">👉</span>
                    <a
                      href="https://juliettebergmanescalade.fr/2025/04/14/entrainement-au-feminin-partie-2-sentrainer-en-phase-avec-son-cycle/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-secondary-orange transition-colors"
                    >
                      Entraînement au féminin - Partie 2 : S'entraîner en phase avec son cycle
                    </a>
                  </p>
                </div>

                <p data-aos="fade-up" data-aos-delay="400">
                  Et aujourd'hui, <strong>je suis en train de me rapprocher de l'INSEP et de Juliana Antero</strong>,
                  qui a développé le projet <strong>Empow'her</strong> (recherche sur l'impact hormonal sur la performance chez les femmes).
                </p>

                <p data-aos="fade-up" data-aos-delay="500">
                  Mon objectif : faire valider scientifiquement mes hypothèses et collaborer avec des
                  laboratoires de recherche pour <strong>vraiment</strong> améliorer la compréhension de ce sujet.
                </p>

                <p data-aos="fade-up" data-aos-delay="600" className="text-2xl font-bold text-center py-6">
                  Parce que je suis pas là pour faire du greenwashing scientifique.
                </p>

                <p data-aos="fade-up" data-aos-delay="700" className="text-xl text-center">
                  Je suis là pour aider. Vraiment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* L'ÉCO-CONCEPTION */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-center" data-aos="fade-up">
                L'ÉCO-CONCEPTION : PAS DU GREENWASHING
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl leading-relaxed">
                <p data-aos="fade-up">
                  L'autre pilier de WAC, c'est l'éco-conception.
                </p>

                <p data-aos="fade-up" data-aos-delay="100">
                  Pas parce que c'est "trendy".<br />
                  Pas parce que ça fait bien sur un slide PowerPoint.
                </p>

                <p data-aos="fade-up" data-aos-delay="200" className="text-2xl font-bold text-secondary-orange">
                  Mais parce que on grimpe dans la nature. Et la nature, on la protège.
                </p>

                <p data-aos="fade-up" data-aos-delay="300" className="text-xl font-medium">
                  Concrètement, ça veut dire quoi ?
                </p>

                <div data-aos="fade-up" data-aos-delay="400" className="text-primary-green p-8 space-y-4" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                  <p className="flex items-start">
                    <span className="mr-3">✅</span>
                    <span><strong>Compression images automatique</strong> : Réduction 90% des données uploadées</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3">✅</span>
                    <span><strong>Optimisation batterie</strong> : Architecture offline-first, synchronisation intelligente</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3">✅</span>
                    <span><strong>Hébergement serveurs bas carbone</strong> : Datacenters EU verts (RGPD strict)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3">✅</span>
                    <span><strong>Développée en France</strong> : Réduction empreinte carbone transport/communication</span>
                  </p>
                  <p className="flex items-start">
                    <span className="mr-3">✅</span>
                    <span><strong>Roadmap 2027</strong> : Bracelet éco-responsable made in France</span>
                  </p>
                </div>

                <p data-aos="fade-up" data-aos-delay="500" className="text-xl font-medium">
                  Est-ce que WAC est parfaite écologiquement ? <strong className="text-secondary-orange">Non.</strong>
                </p>

                <p data-aos="fade-up" data-aos-delay="600">
                  Une app, par définition, consomme de l'énergie. Des serveurs. De la data.
                </p>

                <p data-aos="fade-up" data-aos-delay="700">
                  Mais on fait le maximum pour minimiser cet impact.
                </p>

                <p data-aos="fade-up" data-aos-delay="800">
                  Et on est transparents sur nos limites.
                </p>

                <p data-aos="fade-up" data-aos-delay="900" className="text-xl text-center py-6">
                  Parce que l'éco-responsabilité, c'est pas un badge marketing.<br />
                  <strong>C'est un engagement quotidien.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LA COMMUNAUTÉ */}
        <section className="py-20 md:py-32 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                LA COMMUNAUTÉ
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed text-center">
                <p data-aos="fade-up">
                  Aujourd'hui, WAC c'est plus que moi.
                </p>

                <p data-aos="fade-up" data-aos-delay="100">
                  C'est des beta-testeurs qui testent, galèrent, donnent du feedback brutal et honnête.
                </p>

                <p data-aos="fade-up" data-aos-delay="200">
                  C'est des médecins du sport qui valident les algorithmes.
                </p>

                <p data-aos="fade-up" data-aos-delay="300">
                  C'est des grimpeuses qui disent "Enfin une app qui parle de mon cycle".
                </p>

                <p data-aos="fade-up" data-aos-delay="400">
                  C'est des grimpeurs de tous niveaux qui progressent sans se détruire.
                </p>

                <p data-aos="fade-up" data-aos-delay="500" className="text-2xl md:text-3xl font-bold text-secondary-orange pt-6">
                  Et demain, j'espère, ce sera toi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LE CROWDFUNDING */}
        <section className="py-20 md:py-32 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-center" data-aos="fade-up">
                LE CROWDFUNDING (MAI 2026)
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl leading-relaxed">
                <p data-aos="fade-up">
                  En mai 2026, on lance notre campagne de crowdfunding.
                </p>

                <p data-aos="fade-up" data-aos-delay="100">
                  Pas pour lever des millions.
                </p>

                <p data-aos="fade-up" data-aos-delay="200" className="text-2xl font-bold text-secondary-orange">
                  Pour savoir si on est seuls à penser que la grimpe mérite mieux.
                </p>

                <p data-aos="fade-up" data-aos-delay="300">
                  Si vous êtes 500 à soutenir, on saura qu'on a raison.<br />
                  Si vous êtes 50, on aura notre réponse aussi.
                </p>

                <p data-aos="fade-up" data-aos-delay="400" className="text-xl font-bold">
                  Mais au moins, on aura essayé.
                </p>

                <p data-aos="fade-up" data-aos-delay="500" className="font-medium">
                  On aura essayé de créer une app qui respecte :
                </p>

                <ul data-aos="fade-up" data-aos-delay="600" className="space-y-3 text-xl max-w-2xl mx-auto">
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-orange">•</span>
                    <span>Ton corps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-orange">•</span>
                    <span>Ton rythme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-orange">•</span>
                    <span>Ta planète</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-secondary-orange">•</span>
                    <span>Ton plaisir de grimper</span>
                  </li>
                </ul>

                <p data-aos="fade-up" data-aos-delay="700" className="text-center pt-6">
                  Une app qui te dit parfois de te reposer.
                </p>

                <p data-aos="fade-up" data-aos-delay="800" className="text-xl font-bold text-center text-secondary-orange">
                  Et qui est fière de te le dire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 md:py-32 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-8 text-primary-green" data-aos="fade-up">
                PRÊT À REJOINDRE L'AVENTURE ?
              </h2>

              <p className="text-xl md:text-2xl font-roboto text-primary-green mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                Le projet WAC se construit avec vous.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link
                  href="/early-access"
                  className="inline-block px-12 py-4 text-xl font-bold hover:scale-105 transition-all relative"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'white',
                    textTransform: 'uppercase'
                  }}
                >
                  <span className="absolute top-0 right-0 w-3 h-3 bg-primary-green"></span>
                  RESTER INFORMÉ·E
                </Link>

                <Link
                  href="/mission"
                  className="inline-block px-12 py-4 text-xl font-bold hover:scale-105 transition-all"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    backgroundColor: 'var(--color-primary-green)',
                    color: 'var(--color-primary-beige)',
                    textTransform: 'uppercase'
                  }}
                >
                  DÉCOUVRE NOTRE MISSION
                </Link>
              </div>

              <p className="mt-12 font-roboto text-primary-green text-lg italic" data-aos="fade-up" data-aos-delay="300">
                Campagne de crowdfunding prévue : <strong>Mai 2026</strong>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
