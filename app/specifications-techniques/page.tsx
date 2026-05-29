import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Fonctionnalites() {
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
        name: 'Spécifications techniques',
        item: 'https://www.weareclimbers.fr/specifications-techniques'
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
          className="pt-32 pb-12 md:py-32 relative"
          style={{
            color: 'var(--color-primary-beige)'
          }}
        >
          {/* Background Image */}
          <Image
            src="/hero-fonctionnalites.webp"
            alt="Spécifications techniques We Are Climbers"
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
              <h1 className="text-4xl md:text-6xl mb-6 font-syne uppercase">
                Fonctionnalités
              </h1>
              <p className="text-lg md:text-xl font-roboto">
                Des outils innovants pour progresser sainement en escalade
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © Robert Zunikoff
          </div>
        </section>

        {/* SUIVI DE PERFORMANCE */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-objectif-50.png" alt="" width={48} height={48} className="object-contain" />
              Suivi de performance
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Enregistrement de séances */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Enregistrement de séances
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Enregistrement automatique avec le bracelet Polar 360 (précision de 96-100%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Saisie manuelle pour les utilisateurs sans bracelet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Historique complet des séances avec calendrier et filtres</span>
                  </li>
                </ul>
              </div>

              {/* Métriques en temps réel */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Métriques en temps réel
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Fréquence cardiaque haute précision (99,4%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Détection des mouvements d'escalade en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Analyse du temps de préhension et estimation du lactate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Détection automatique des tentatives et réussites</span>
                  </li>
                </ul>
              </div>

              {/* Analyses avancées */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Analyses avancées (12 graphiques scientifiques)
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Vitesse de récupération cardiaque</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Distribution des zones de fréquence cardiaque</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Suivi de la charge progressive (prévention des blessures)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Analyse des patterns de mouvement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Matrice de quadrant performance (forme vs charge)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Monotonie et contrainte d'entraînement</span>
                  </li>
                </ul>
              </div>

              {/* Intelligence artificielle */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Intelligence artificielle
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Recommandations d'entraînement personnalisées</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Détection des risques de blessure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Optimisation de la récupération</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Calcul du Foster Score et du Training Stress Balance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Analyse du cycle menstruel - Full width card */}
            <div className="max-w-6xl mx-auto mt-8">
              <div className="bg-secondary-orange p-8 shadow-lg" style={{ color: 'var(--color-primary-beige)' }} data-aos="fade-up" data-aos-delay="400">
                <h3 className="text-2xl mb-4 font-syne uppercase flex items-center">
                  Analyse du cycle menstruel ⭐ Innovation mondiale
                </h3>
                <ul className="space-y-3 font-roboto">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Première application d'escalade à analyser l'impact du cycle sur la performance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Recommandations adaptatives selon la phase du cycle</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Validation scientifique (Dr. Juliana Antero, INSEP)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Chiffrement AES-256 pour une confidentialité maximale</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTÈME D'ENTRAÎNEMENT */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-biceps-66.png" alt="" width={48} height={48} className="object-contain" />
              Système d'entraînement
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Défis quotidiens */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Défis quotidiens (7 entraînements)
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Mobilité matinale (lundi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Renforcement des doigts (mardi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Équilibre et proprioception (mercredi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Étirements de récupération (jeudi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Gainage fonctionnel (vendredi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Renforcement antagoniste (samedi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Libre choix (dimanche)</span>
                  </li>
                </ul>
              </div>

              {/* Système de badges */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Système de badges (11 badges dynamiques)
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Premier Défi, Week Warrior, Streak Master</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Consistency King, Speed Demon, Century Club</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Badges spéciaux pour les défis de groupe</span>
                  </li>
                </ul>
              </div>

              {/* Progression et points */}
              <div className="p-8 shadow-lg md:col-span-2" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Progression et points
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Système de points avec multiplicateurs de difficulté</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Objectifs hebdomadaires personnalisables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Suivi mensuel des progrès</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Partage des accomplissements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RÉSEAU SOCIAL */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-social-50.png" alt="" width={48} height={48} className="object-contain" />
              Réseau social
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Fil d'actualité */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Fil d'actualité
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Publications enrichies (texte + photos + métriques d'escalade)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Prévisualisation des données de session avant partage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Contrôles de visibilité public/privé</span>
                  </li>
                </ul>
              </div>

              {/* Interactions communautaires */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Interactions communautaires
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Likes et commentaires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Mentions d'utilisateurs (@username)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Système de suivi (follow/unfollow)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Notifications en temps réel</span>
                  </li>
                </ul>
              </div>

              {/* Défis de groupe */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Défis de groupe
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>6 types de défis (distance, volume, sessions, collectifs, chronométrés, personnalisés)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Classement en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Système d'invitation (codes partageables)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Limite de 3 défis actifs et 50 participants maximum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Détection automatique de complétion</span>
                  </li>
                </ul>
              </div>

              {/* Découverte */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Découverte
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Recherche d'utilisateurs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Découverte de défis publics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Recommandations communautaires</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BRACELET CONNECTÉ POLAR 360 */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-montre-connectée-64.png" alt="" width={48} height={48} className="object-contain" />
              Bracelet connecté Polar 360
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Suivi Performance Escalade */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase flex items-center gap-3">
                  Suivi Performance Escalade <Image src="/icons/icons8-escalade-50.png" alt="" width={32} height={32} className="object-contain" />
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Fréquence cardiaque en temps réel pendant tes sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Analyse des mouvements avec accéléromètre 3 axes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Température corporelle pour suivre ton effort</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Données synchronisées automatiquement après la séance</span>
                  </li>
                </ul>
              </div>

              {/* Design Grimpeur */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase flex items-center gap-3">
                  Design Grimpeur <Image src="/icons/icons8-poids-léger-50.png" alt="" width={32} height={32} className="object-contain" />
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Ultra-léger (29g) - tu l'oublies sur ton poignet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Bracelet textile respirant - confort maximum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Sans écran - zéro distraction, juste grimpe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Résistant à l'eau et aux chocs</span>
                  </li>
                </ul>
              </div>

              {/* Autonomie et Connectivité */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase flex items-center gap-3">
                  Autonomie et Connectivité <Image src="/icons/icons8-batterie-pleine-48.png" alt="" width={32} height={32} className="object-contain" />
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>8 jours d'autonomie - recharge hebdomadaire</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Mode offline intelligent - continue d'enregistrer même déconnecté</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Synchronisation Bluetooth automatique avec l'app WAC</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Reconnexion automatique à ton téléphone</span>
                  </li>
                </ul>
              </div>

              {/* Technologie Polar pour l'Escalade */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase flex items-center gap-3">
                  Technologie Polar pour l'Escalade <Image src="/icons/icons8-médaille-50.png" alt="" width={32} height={32} className="object-contain" />
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Precision Prime™ - mesure FC la plus précise du marché</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Capteur optique 9 LED pour précision maximale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Enregistrement continu pendant toute la séance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Compatible avec ton workflow d'entraînement WAC</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROFIL & PERSONNALISATION */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-utilisateur-50.png" alt="" width={48} height={48} className="object-contain" />
              Profil & personnalisation
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Configuration du profil */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Configuration du profil (8 étapes)
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Photo, nom, âge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Identité de genre (5 options inclusives)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Type d'escalade préféré</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Niveau d'expérience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Données morphologiques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Localisation</span>
                  </li>
                </ul>
              </div>

              {/* Données physiologiques */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Données physiologiques (optionnelles)
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Suivi du cycle menstruel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Paramètres de régularité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Chiffrement des données sensibles</span>
                  </li>
                </ul>
              </div>

              {/* Gestion du compte */}
              <div className="p-8 shadow-lg md:col-span-2" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Gestion du compte
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Modification du profil</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Objectifs hebdomadaires personnalisables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Paramètres de confidentialité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Export de données (conformité RGPD)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONFIDENTIALITÉ & SÉCURITÉ */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-cadenas-50.png" alt="" width={48} height={48} className="object-contain" />
              Confidentialité & sécurité
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contrôles de confidentialité */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Contrôles de confidentialité
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Profil public/privé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Visibilité des séances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Gestion du consentement</span>
                  </li>
                </ul>
              </div>

              {/* Conformité RGPD complète */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Conformité RGPD complète
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Sécurité avancée</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Chiffrement AES-256 pour les données sensibles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Protection des mineurs (16+ avec restrictions 16-17 ans)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Authentification sécurisée (email, Google Sign-In)</span>
                  </li>
                </ul>
              </div>

              {/* Légal */}
              <div className="p-8 shadow-lg md:col-span-2" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Légal
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Politique de confidentialité (RGPD exemplaire)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Conditions d'utilisation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Politique de modération</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>FAQ complète</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-cloche-48.png" alt="" width={48} height={48} className="object-contain" />
              Notifications
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Alertes système */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Alertes système
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Badges débloqués</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Rappels de défis quotidiens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Progression des objectifs hebdomadaires</span>
                  </li>
                </ul>
              </div>

              {/* Notifications sociales */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Notifications sociales
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Nouveaux abonnés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Likes et commentaires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Invitations aux défis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Mises à jour des classements</span>
                  </li>
                </ul>
              </div>

              {/* Alertes de performance */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Alertes de performance
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Avertissements de risque de blessure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Rappels de récupération</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Célébration des records personnels</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ONBOARDING */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-chapeau-de-diplôme-30.png" alt="" width={48} height={48} className="object-contain" />
              Onboarding
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Expérience d'accueil
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Écran de bienvenue personnalisé</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Visite guidée interactive (2 phases, 8 étapes)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Découverte contextuelle des fonctionnalités</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Coaching progressif</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ÉCO-CONCEPTION */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-5xl mb-12 text-center text-primary-green font-syne uppercase flex items-center justify-center gap-4" data-aos="fade-up">
              <Image src="/icons/icons8-recycler-50.png" alt="" width={48} height={48} className="object-contain" />
              Éco-conception
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Optimisations techniques */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Optimisations techniques
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Compression d'images (90% de réduction des données)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Optimisation de la batterie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Architecture offline-first</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Stratégies de cache intelligentes</span>
                  </li>
                </ul>
              </div>

              {/* Engagement environnemental */}
              <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-2xl mb-4 text-primary-green font-syne uppercase">
                  Engagement environnemental
                </h3>
                <ul className="space-y-3 font-roboto text-primary-green">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Développé en France</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Hébergement vert (serveurs EU RGPD)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Éco-conception dès la première ligne de code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-2">•</span>
                    <span>Suivi de l'empreinte carbone</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-green text-primary-beige">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl mb-6 font-syne uppercase" data-aos="fade-up">
              Prêt à découvrir toutes ces fonctionnalités ?
            </h2>
            <p className="text-lg font-roboto mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Rejoins la communauté We Are Climbers et progresse sainement en escalade.
            </p>
            <div data-aos="fade-up" data-aos-delay="200">
              <a href="/boutique" className="btn-beige">
                Rejoindre l'aventure
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
