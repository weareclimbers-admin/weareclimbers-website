import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Mission() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.weareclimbers.fr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mission',
        item: 'https://www.weareclimbers.fr/mission'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section
          className="relative py-32 text-primary-beige overflow-hidden"
        >
          {/* Background Image */}
          <Image
            src="/hero-mission.webp"
            alt="Mission We Are Climbers - Grimper ensemble"
            fill
            priority={true}
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-green opacity-70 z-0"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
                GRIMPER ENSEMBLE, PROGRESSER SAINEMENT
              </h1>
              <p className="text-xl md:text-2xl font-roboto font-light leading-relaxed">
                Rendre la progression en escalade plus intelligente, plus saine et plus collective —
                grâce à la technologie responsable.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © Stacie Ong
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                NOTRE VISION
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                <p className="text-2xl font-medium">
                  L'escalade est plus qu'un sport : c'est un mode de vie.
                </p>

                <p>
                  C'est ce moment où tu touches une prise qui semblait impossible il y a deux mois.
                  C'est l'adrénaline d'une voie réussie, mais aussi les mains qui saignent et les avant-bras
                  qui crient grâce. C'est cette communauté qui t'encourage, te pousse, te relève.
                </p>

                <p>
                  Chez We Are Climbers, nous voulons connecter les grimpeurs entre eux et avec eux-mêmes.
                  Pas avec des écrans supplémentaires. Pas avec du marketing vide.
                  Mais avec des outils intelligents qui respectent ton corps, ta planète et ta pratique.
                </p>

                <p className="text-xl font-medium italic text-secondary-orange">
                  Nous croyons en une technologie qui aide sans parasiter,
                  qui mesure sans obsession, qui connecte sans aliéner.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs Section */}
        <section className="py-20" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-primary-green text-center" data-aos="fade-up">
                NOS VALEURS
              </h2>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Valeur 1 : Partage */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center mr-4">
                      <Image
                        src="/icons/icons8-cœur-poignée-de-main-50.png"
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-primary-green">
                      PARTAGE
                    </h3>
                  </div>
                  <p className="font-roboto text-primary-green text-lg leading-relaxed">
                    Créer une vraie communauté. Pas juste des likes, mais du lien réel.
                    Des grimpeurs qui s'entraident, se challengent et progressent ensemble.
                  </p>
                </div>

                {/* Valeur 2 : Accessibilité */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center mr-4">
                      <Image
                        src="/icons/icons8-objectif-50.png"
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-primary-green">
                      ACCESSIBILITÉ
                    </h3>
                  </div>
                  <p className="font-roboto text-primary-green text-lg leading-relaxed">
                    Jamais élitiste, jamais technocratique. Que tu grimpes en 5c ou en 8b,
                    que tu débutes ou que tu sois confirmé : WAC est pour toi.
                  </p>
                </div>

                {/* Valeur 3 : Performance Responsable */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center mr-4">
                      <Image
                        src="/icons/icons8-biceps-66.png"
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-primary-green">
                      PERFORMANCE RESPONSABLE
                    </h3>
                  </div>
                  <p className="font-roboto text-primary-green text-lg leading-relaxed">
                    Progresser sainement, sans se détruire. Prévenir les blessures,
                    écouter son corps, respecter ses cycles. La performance, oui — mais durable.
                  </p>
                </div>

                {/* Valeur 4 : Transparence */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="300">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center mr-4">
                      <Image
                        src="/icons/icons8-idée-96.png"
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl md:text-3xl text-primary-green">
                      TRANSPARENCE
                    </h3>
                  </div>
                  <p className="font-roboto text-primary-green text-lg leading-relaxed">
                    Sur nos choix techniques, notre fabrication, nos valeurs, nos limites.
                    Nous ne sommes pas parfaits, mais nous sommes honnêtes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Les 3 Piliers */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-primary-green text-center" data-aos="fade-up">
                COMMENT ON FAIT LA DIFFÉRENCE
              </h2>

              <div className="space-y-12">
                {/* Pilier 1 : Éco-conception */}
                <div className="p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up" data-aos-delay="0">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <Image
                          src="/icons/icons8-plante-50.png"
                          alt=""
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-4xl text-primary-green mb-4">
                        1. ÉCO-CONCEPTION
                      </h3>
                      <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg mb-4">
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Matériaux recyclés et réparabilité maximale</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Fabrication locale pour réduire notre empreinte</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Hébergement green de nos serveurs</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Adhésion 1% for the Planet</span>
                        </li>
                      </ul>
                      <p className="text-lg md:text-xl font-medium text-secondary-orange italic">
                        → Parce qu'on grimpe dans la nature, on la protège.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pilier 2 : Prévention */}
                <div className="p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up" data-aos-delay="100">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <Image
                          src="/icons/icons8-bouclier-50.png"
                          alt=""
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-4xl text-primary-green mb-4">
                        2. PRÉVENTION
                      </h3>
                      <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg mb-4">
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Prévention des blessures (tendinites, poulies, coiffe des rotateurs)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Préservation de l'environnement (sites d'escalade)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Promotion des bonnes pratiques en salle</span>
                        </li>
                      </ul>
                      <p className="text-lg md:text-xl font-medium text-secondary-orange italic">
                        → Progresser sans se détruire, ni détruire.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pilier 3 : Inclusivité */}
                <div className="p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up" data-aos-delay="200">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <Image
                          src="/icons/icons8-égalité-des-sexes-30.png"
                          alt=""
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-4xl text-primary-green mb-4">
                        3. INCLUSIVITÉ
                      </h3>
                      <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg mb-4">
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span><strong>Première app escalade à analyser l'impact des cycles menstruels</strong> sur les performances</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Prise en compte de tous les genres, morphologies et handicaps</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-secondary-orange mr-3">•</span>
                          <span>Personnalisation des analyses pour chaque profil</span>
                        </li>
                      </ul>
                      <p className="text-lg md:text-xl font-medium text-secondary-orange italic">
                        → L'escalade pour tous, vraiment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Engagements Concrets RSE */}
        <section className="py-20 md:py-32 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-primary-green text-center" data-aos="fade-up">
                NOS ENGAGEMENTS CONCRETS
              </h2>

              <div className="space-y-8">
                {/* Engagement 1 : Éco-Conception */}
                <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-4 flex items-center gap-3">
                    <Image src="/icons/icons8-plante-50.png" alt="" width={36} height={36} className="object-contain" />
                    ÉCO-CONCEPTION
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Hébergement low-carbon</strong> : serveurs en France alimentés par énergies renouvelables</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Optimisation des images</strong> : compression à 90% pour réduire la bande passante</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Conception sobre</strong> : app légère, pas de fonctionnalités superflues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Engagement 1% for the Planet</strong> : reversement d'1% de notre CA à des associations environnementales</span>
                    </li>
                  </ul>
                </div>

                {/* Engagement 2 : Transparence */}
                <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-4 flex items-center gap-3">
                    <Image src="/icons/icons8-idée-96.png" alt="" width={36} height={36} className="object-contain" />
                    TRANSPARENCE
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Open Data</strong> : vos données vous appartiennent, export possible à tout moment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Pas de revente de données</strong> : notre modèle économique repose sur l'abonnement, pas sur vos informations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Communication sincère</strong> : on partage nos réussites comme nos galères</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Roadmap publique</strong> : vous savez où on va, et vous pouvez contribuer aux priorités</span>
                    </li>
                  </ul>
                </div>

                {/* Engagement 3 : Inclusivité & Diversité */}
                <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-4 flex items-center gap-3">
                    <Image src="/icons/icons8-égalité-des-sexes-30.png" alt="" width={36} height={36} className="object-contain" />
                    INCLUSIVITÉ & DIVERSITÉ
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Cycle menstruel</strong> : première app escalade à analyser l'impact hormonal sur la performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Accessibilité tarifaire</strong> : tarifs solidaires pour étudiant·es, chômeur·euses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Interface inclusive</strong> : tous niveaux, tous âges, tous morphotypes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Lutte contre le sexisme</strong> : modération stricte des contenus, respect de chacun·e</span>
                    </li>
                  </ul>
                </div>

                {/* Engagement 4 : Recherche Scientifique */}
                <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="300">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-4 flex items-center gap-3">
                    <Image src="/icons/icons8-biceps-66.png" alt="" width={36} height={36} className="object-contain" />
                    DÉMARCHE SCIENTIFIQUE
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base md:text-lg">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Collaboration INSEP</strong> : validation scientifique des analyses de performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Expertise médicale</strong> : intégration de recommandations de médecins du sport</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Recherche cycle menstruel</strong> : partenariat avec Juliana Antero (INSEP) pour études hormonales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold">✓</span>
                      <span><strong>Open Science</strong> : partage de nos résultats avec la communauté scientifique</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Note footer */}
              <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
                <p className="font-roboto text-primary-green text-sm italic">
                  → Retrouvez notre roadmap RSE complète et nos indicateurs de suivi dans le footer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Promesse */}
        <section className="py-20 md:py-32 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-12" data-aos="fade-up">
                CE QU'ON VOUS PROMET
              </h2>

              <div className="space-y-8 font-roboto text-lg md:text-xl leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                <p>
                  <strong className="text-secondary-orange">Un bracelet connecté sans écran</strong> — léger, robuste,
                  qui ne vous distrait pas de votre grimpe.
                </p>

                <p>
                  <strong className="text-secondary-orange">Une application dédiée</strong> qui analyse vos performances,
                  prévient les blessures, vous aide à passer vos plafonds de verre.
                </p>

                <p>
                  <strong className="text-secondary-orange">Une communauté authentique</strong> où vous pouvez partager vos sessions,
                  vous challenger, rencontrer d'autres grimpeurs.
                </p>

                <p className="text-xl md:text-2xl font-medium pt-8">
                  Et surtout : une approche respectueuse de votre corps,
                  de votre rythme et de votre planète.
                </p>

                <p className="text-2xl md:text-3xl font-bold pt-4">
                  Parce que la vraie performance, c'est la progression.
                  <br />
                  Et la vraie progression, c'est celle qu'on construit ensemble, dans la durée.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final - Rejoindre l'aventure */}
        <section className="py-20 md:py-32 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-8 text-primary-green" data-aos="fade-up">
                REJOIGNEZ L'AVENTURE
              </h2>

              <p className="text-xl md:text-2xl font-roboto text-primary-green mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                Le projet WAC se construit avec vous.
              </p>

              <div className="p-8 md:p-12 shadow-lg mb-12" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up" data-aos-delay="200">
                <p className="font-roboto text-lg text-primary-green mb-6">
                  Inscrivez-vous pour être informé du lancement de notre campagne de crowdfunding
                  et devenir early supporter.
                </p>

                <a
                  href="/early-access"
                  className="inline-block bg-secondary-orange text-white px-12 py-4 text-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 relative"
                  style={{ position: 'relative', fontFamily: 'var(--font-syne)', textTransform: 'uppercase' }}
                >
                  <span className="absolute top-0 right-0 w-3 h-3 bg-primary-green"></span>
                  RESTER INFORMÉ·E
                </a>

                <div className="mt-8 p-6 bg-secondary-beige">
                  <p className="font-roboto text-primary-green flex items-start gap-2">
                    <span className="flex-shrink-0">
                      <Image src="/icons/icons8-ampoule-globe-48.png" alt="" width={28} height={28} className="object-contain" />
                    </span>
                    <span>
                      <strong>Bonus early birds :</strong> accès exclusif, tarifs préférentiels,
                      et votre nom dans les premiers supporters du projet.
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="font-roboto text-primary-green text-lg italic">
                  Campagne de crowdfunding prévue : <strong>Avril-Mai 2026</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
