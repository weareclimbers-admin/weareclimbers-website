import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function RoadmapRSE() {
  const commitments = [
    {
      icon: '/icons/icons8-plante-50.png',
      title: 'Éco-conception',
      description: 'Matériaux recyclés, fabrication locale, hébergement vert',
    },
    {
      icon: '/icons/icons8-bouclier-50.png',
      title: 'Prévention',
      description: 'Protection des sites d\'escalade et de la santé des grimpeurs',
    },
    {
      icon: '/icons/icons8-recycler-50.png',
      title: 'Circularité',
      description: 'Réparabilité, longévité et recyclage de nos produits',
    },
    {
      icon: '/icons/icons8-idée-96.png',
      title: 'Transparence',
      description: 'Honnêteté sur nos choix, nos limites et notre progression',
    },
  ]

  const roadmap = [
    {
      phase: '6 mois',
      title: 'Migration vers OVH',
      achievements: [
        'Transfert de notre infrastructure depuis Firebase vers OVH',
        'Entreprise française : souveraineté des données, hébergement 100% France',
        'Datacenters optimisés : refroidissement par eau, énergie renouvelable',
        'Engagement environnemental : recyclage des serveurs, circuits courts',
      ],
    },
    {
      phase: '3 ans',
      title: 'Migration vers Izaralde + Bracelet WAC',
      achievements: [
        'Hébergement 100% vert au Pays Basque (Izaralde)',
        'Datacenter éco-conçu, énergie renouvelable, structure locale et éthique',
        'Développement du bracelet WAC avec éco-conception stricte',
        'Matériaux recyclés & biosourcés, réparabilité maximale, fabrication locale',
        'Programme de reprise et recyclage des anciens bracelets',
      ],
    },
    {
      phase: '5 ans',
      title: 'Neutralité carbone & B-Corp',
      achievements: [
        'Bilan carbone complet et compensation 100% de nos émissions',
        'Certification B-Corp obtenue',
        'Production 100% locale (France/Europe de l\'Ouest)',
        'Bracelet WAC 2.0 : durée de vie 5+ ans, batterie remplaçable',
      ],
    },
  ]

  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section
          className="pt-32 pb-12 md:py-32 relative"
          style={{
            backgroundImage: 'url(/hero-roadmap-rse.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'var(--color-primary-beige)'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-green opacity-70"></div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl mb-6">
                ROADMAP RSE
              </h1>
              <p className="text-lg md:text-xl font-roboto">
                Transparence totale sur notre impact environnemental et notre feuille de route responsable
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © Vitaly Gariev
          </div>
        </section>

        {/* Pitch / Introduction */}
        <section className="py-20" data-aos="fade-up">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl font-roboto mb-6 text-primary-green font-medium">
                Nous voulons être 100% transparents avec vous.
              </p>
              <p className="text-lg font-roboto mb-6 text-primary-green">
                Chez We Are Climbers, nous sommes convaincus que l'innovation technologique doit aller de pair
                avec la responsabilité environnementale et sociale. Notre passion pour l'escalade nous pousse
                à protéger les espaces naturels que nous aimons tant.
              </p>
              <p className="text-lg font-roboto mb-6 text-primary-green">
                <strong>Nous ne sommes pas parfaits.</strong> Nous ne prétendons pas avoir toutes les solutions dès le lancement.
                Mais nous avons une vision claire et une feuille de route ambitieuse pour réduire notre impact
                à chaque étape.
              </p>

              {/* État actuel : Bracelet Polar 360 */}
              <div className="p-8 shadow-lg mt-12" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                <h3 className="text-2xl md:text-3xl mb-4 text-primary-green font-bold">
                  Le Bracelet : Polar 360
                </h3>
                <p className="font-roboto text-primary-green mb-4">
                  Pour notre lancement, nous avons choisi le <strong>Polar 360</strong>, un capteur connecté
                  développé par Polar Electro (Finlande). Voici pourquoi :
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start font-roboto text-primary-green">
                    <span className="text-secondary-orange mr-3">✓</span>
                    <span><strong>Pas d'écran</strong> — Fini les distractions. Vous grimpez, le bracelet mesure. Point.</span>
                  </li>
                  <li className="flex items-start font-roboto text-primary-green">
                    <span className="text-secondary-orange mr-3">✓</span>
                    <span><strong>Capteurs essentiels uniquement</strong> — Fréquence cardiaque, accéléromètre, gyroscope. Pas de gadgets inutiles.</span>
                  </li>
                  <li className="flex items-start font-roboto text-primary-green">
                    <span className="text-secondary-orange mr-3">✓</span>
                    <span><strong>Autonomie longue durée</strong> — Jusqu'à 5 jours, moins de recharges, moins d'usure.</span>
                  </li>
                  <li className="flex items-start font-roboto text-primary-green">
                    <span className="text-secondary-orange mr-3">✓</span>
                    <span><strong>Démarche environnementale de Polar</strong> — Certification ISO 14001, fabrication durable, exploration de matériaux recyclés.</span>
                  </li>
                </ul>
                <p className="font-roboto text-primary-green italic">
                  → Un bracelet sobre, efficace, qui fait ce qu'on lui demande — sans superflu.
                </p>
              </div>

              {/* État actuel : Hébergement Firebase */}
              <div className="p-8 shadow-lg mt-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                <h3 className="text-2xl md:text-3xl mb-4 text-primary-green font-bold">
                  Hébergement : Firebase (Paris)
                </h3>
                <p className="font-roboto text-primary-green mb-4">
                  Actuellement, notre application est hébergée sur <strong>Firebase (Google Cloud)</strong>,
                  avec des serveurs situés à <strong>Paris (europe-west1)</strong>.
                </p>
                <p className="font-roboto text-primary-green mb-4">
                  <strong>Pourquoi Firebase aujourd'hui ?</strong> Fiabilité, scalabilité, coût de démarrage adapté à une jeune startup,
                  conformité RGPD.
                </p>
                <p className="font-roboto text-primary-green">
                  <strong>Notre position :</strong> Nous sommes conscients que Google n'est pas l'hébergeur idéal d'un point de vue éthique
                  et environnemental. Mais c'est un choix pragmatique de démarrage. Nous avons une feuille de route claire pour migrer
                  vers des solutions plus responsables dès que nos moyens nous le permettront.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engagements Grid */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green" data-aos="fade-up">
              NOS ENGAGEMENTS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {commitments.map((commitment, index) => (
                <div key={index} className="p-6 shadow-md text-center" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="flex justify-center mb-4">
                    <Image
                      src={commitment.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl mb-3 text-primary-green font-bold">{commitment.title}</h3>
                  <p className="font-roboto text-primary-green text-sm">
                    {commitment.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feuille de Route */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-16 text-center text-primary-green" data-aos="fade-up">
              NOTRE FEUILLE DE ROUTE
            </h2>

            <div className="max-w-4xl mx-auto space-y-12">
              {roadmap.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-4 border-secondary-orange" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-secondary-orange"></div>
                  <div className="mb-2">
                    <span className="font-roboto text-sm text-secondary-orange font-medium">
                      {item.phase}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4 text-primary-green font-bold">
                    {item.title}
                  </h3>
                  <ul className="space-y-3">
                    {item.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start font-roboto text-primary-green">
                        <span className="text-secondary-orange mr-3">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Pourquoi pas dès aujourd'hui ? */}
            <div className="max-w-4xl mx-auto mt-16 p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up">
              <h3 className="text-3xl mb-6 text-primary-green font-bold">
                Pourquoi pas dès aujourd'hui ?
              </h3>
              <p className="font-roboto text-lg text-primary-green mb-4">
                <strong>Parce que nous voulons être honnêtes avec vous.</strong>
              </p>
              <p className="font-roboto text-primary-green mb-4">
                Créer un bracelet connecté éco-conçu de A à Z, avec des matériaux responsables, une fabrication locale
                et une réparabilité maximale, c'est un <strong>investissement colossal</strong>.
              </p>
              <div className="bg-secondary-beige-light p-6 mb-6">
                <p className="font-roboto text-primary-green mb-3 font-medium">
                  Les réalités économiques :
                </p>
                <ul className="space-y-2 font-roboto text-primary-green text-sm">
                  <li>• R&D hardware : centaines de milliers d'euros (conception, prototypage, certifications)</li>
                  <li>• Moules et outillage : investissement lourd pour produire à l'échelle</li>
                  <li>• Matériaux responsables : coûtent plus cher que le plastique vierge</li>
                  <li>• Fabrication locale : 3 à 5 fois plus cher qu'une production délocalisée</li>
                </ul>
              </div>
              <p className="font-roboto text-primary-green mb-4">
                Nous sommes une <strong>jeune startup</strong>. Nous n'avons pas (encore) les millions d'euros nécessaires
                pour fabriquer notre propre bracelet dans les conditions que nous souhaitons.
              </p>
              <div className="bg-primary-green text-primary-beige p-6">
                <p className="font-roboto font-medium mb-3">
                  💡 Notre engagement :
                </p>
                <p className="font-roboto">
                  Dès que nos revenus le permettront — grâce à vous, notre communauté — nous investirons dans la R&D
                  et la fabrication de notre propre bracelet éco-conçu. Chaque euro gagné sera réinvesti dans notre mission :
                  créer une technologie plus responsable, plus durable, plus éthique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Objectifs 2026 */}
        <section className="py-20 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center" data-aos="fade-up">
              NOS OBJECTIFS 2026
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center" data-aos="fade-up" data-aos-delay="0">
                <div className="text-5xl md:text-6xl font-bold mb-3">1%</div>
                <p className="font-roboto text-lg">
                  Du CA reversé via 1% for the Planet
                </p>
              </div>
              <div className="text-center" data-aos="fade-up" data-aos-delay="100">
                <div className="text-5xl md:text-6xl font-bold mb-3">OVH</div>
                <p className="font-roboto text-lg">
                  Migration hébergement vers serveurs français
                </p>
              </div>
              <div className="text-center" data-aos="fade-up" data-aos-delay="200">
                <div className="text-5xl md:text-6xl font-bold mb-3">R&D</div>
                <p className="font-roboto text-lg">
                  Lancement de la R&D bracelet WAC éco-conçu
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-16 text-center" data-aos="fade-up" data-aos-delay="300">
              <p className="text-xl md:text-2xl font-roboto font-light leading-relaxed">
                Parce que grimper dans la nature, c'est la respecter.
                <br />
                Et que la vraie performance, c'est celle qui ne détruit rien sur son passage.
              </p>
            </div>
          </div>
        </section>

        {/* Transparence Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl mb-6 text-primary-green font-bold">
                TRANSPARENCE ET REPORTING
              </h2>
              <p className="font-roboto text-lg mb-6 text-primary-green">
                Nous nous engageons à publier <strong>chaque année un rapport détaillé de nos actions RSE</strong>,
                incluant nos réussites, nos défis et nos axes d'amélioration.
              </p>
              <p className="font-roboto text-lg mb-6 text-primary-green">
                <strong>⚠️ Transparence :</strong> Nous n'avons pas encore de rapport RSE publié, car nous sommes en phase de lancement.
                Notre premier rapport sera publié en <strong>janvier 2027</strong>, couvrant l'année 2026.
              </p>
              <p className="font-roboto text-lg mb-8 text-primary-green">
                Vous pourrez suivre notre progression en temps réel et nous faire part de vos suggestions
                pour améliorer notre impact positif.
              </p>

              <div className="bg-secondary-beige-light p-6">
                <p className="font-roboto text-primary-green mb-4">
                  <strong>Ce que contiendra notre rapport RSE annuel :</strong>
                </p>
                <ul className="space-y-2 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Bilan carbone complet de nos activités</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Transparence sur nos fournisseurs et nos choix de fabrication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Actions concrètes menées pour réduire notre impact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Montants reversés via 1% for the Planet et associations soutenues</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Objectifs pour l'année suivante</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-center">
                <p className="font-roboto text-primary-green text-sm italic">
                  Premier rapport RSE prévu : <strong>Janvier 2027</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl mb-8 text-primary-green">
                SOUTENEZ NOTRE DÉMARCHE
              </h2>
              <p className="text-lg md:text-xl font-roboto text-primary-green mb-12 leading-relaxed">
                Rejoignez-nous dans cette aventure. Ensemble, construisons une escalade plus responsable.
              </p>
              <Link
                href="/early-access"
                className="inline-block bg-secondary-orange text-white px-12 py-4 text-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 relative"
              >
                <span className="absolute top-0 right-0 w-3 h-3 bg-primary-green"></span>
                REJOINDRE L'AVENTURE
              </Link>
              <div className="mt-8">
                <p className="font-roboto text-primary-green text-sm italic">
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
