import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Polar 360 - Capteur cardiaque pour grimpeurs | We Are Climbers",
  description: "Haute précision ±1 BPM, conçu pour l'escalade. Disponible via la campagne Ulule en cours jusqu'au 24 juin.",
  openGraph: {
    title: "Polar 360 - Capteur cardiaque pour grimpeurs",
    description: "Haute précision ±1 BPM, conçu pour l'escalade. Disponible via la campagne Ulule en cours jusqu'au 24 juin.",
    url: "https://www.weareclimbers.fr/capteurs",
  },
}

export default function Capteurs() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Polar 360 - Bracelet connecté pour escalade',
    brand: {
      '@type': 'Brand',
      name: 'Polar'
    },
    description: 'Bracelet connecté de haute précision pour l\'escalade. Analyse physiologique en temps réel, fréquence cardiaque à ±1 BPM, suivi de récupération et prévention des blessures. Compatible avec l\'application We Are Climbers.',
    image: 'https://www.weareclimbers.fr/téléchargement (1).png',
    offers: {
      '@type': 'Offer',
      url: 'https://www.weareclimbers.fr/capteurs',
      priceCurrency: 'EUR',
      price: '120',
      availability: 'https://schema.org/PreOrder',
      availabilityStarts: '2026-05-01',
      seller: {
        '@type': 'Organization',
        name: 'We Are Climbers'
      }
    },
    category: 'Bracelet connecté sport',
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 16
    }
  };

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
        name: 'Capteurs',
        item: 'https://www.weareclimbers.fr/capteurs'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
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
            src="/hero-capteurs.webp"
            alt="Capteurs physiologiques pour escalade - We Are Climbers"
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
              <h1 className="text-4xl md:text-6xl mb-6 leading-tight">
                COMPRENDRE TON CORPS POUR GRIMPER MIEUX
              </h1>
              <p className="text-xl md:text-2xl font-roboto font-light leading-relaxed">
                L'analyse physiologique WAC + Polar 360 : la combinaison parfaite pour progresser sans te détruire.
              </p>
            </div>
          </div>
        </section>

        {/* Section : Le problème */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                TU T'ES DÉJÀ DEMANDÉ POURQUOI ?
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                <p className="text-2xl font-medium">
                  Pourquoi certains jours tu grimpes comme un dieu, et d'autres tu tiens pas 3 mouvements ?
                </p>

                <p>
                  Pourquoi tu stagnes depuis 6 mois alors que tu t'entraînes 3×/semaine ?
                </p>

                <p>
                  Pourquoi tu te blesses alors que tu fais attention ?
                </p>

                <p className="text-xl font-medium italic text-secondary-orange">
                  → Parce que tu grimpes sans comprendre ce qui se passe dans ton corps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section : La solution WAC */}
        <section className="py-20" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-primary-green text-center" data-aos="fade-up">
                WAC TE DONNE LA RÉPONSE
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Bénéfice 1 */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Image
                      src="/icons/icons8-biceps-66.png"
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl text-primary-green mb-4 text-center">
                    ZONES D'EFFORT
                  </h3>
                  <p className="font-roboto text-primary-green text-base leading-relaxed text-center">
                    Sais exactement quand tu es dans ta zone optimale, en surcharge, ou en récupération.
                  </p>
                </div>

                {/* Bénéfice 2 */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Image
                      src="/icons/icons8-bouclier-50.png"
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl text-primary-green mb-4 text-center">
                    PRÉVENTION BLESSURES
                  </h3>
                  <p className="font-roboto text-primary-green text-base leading-relaxed text-center">
                    Reçois des alertes avant de te blesser. L'app te dit parfois "Stop. Repose-toi."
                  </p>
                </div>

                {/* Bénéfice 3 */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                  <div className="w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                    <Image
                      src="/icons/icons8-idée-96.png"
                      alt=""
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl text-primary-green mb-4 text-center">
                    RECOMMANDATIONS IA
                  </h3>
                  <p className="font-roboto text-primary-green text-base leading-relaxed text-center">
                    Pas juste des graphiques. Des recommandations concrètes adaptées à TON corps.
                  </p>
                </div>
              </div>

              {/* Mock téléphone — screen perf réel */}
              <div className="mt-16 flex flex-col items-center" data-aos="fade-up" data-aos-delay="300">
                <p className="text-2xl md:text-3xl font-bold text-primary-green mb-10 text-center">
                  Pas de bullshit. Juste de la science.
                </p>

                <div className="relative" style={{ width: '260px' }}>
                  <div
                    className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                    style={{
                      backgroundColor: 'var(--color-primary-green)',
                      padding: '12px 10px',
                      border: '3px solid var(--color-primary-green)',
                    }}
                  >
                    {/* Encoche */}
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
                      style={{ width: '60px', height: '16px', backgroundColor: 'var(--color-primary-green)' }}
                    />
                    {/* Écran */}
                    <div
                      className="relative overflow-hidden"
                      style={{ borderRadius: '2rem', aspectRatio: '9/19.5', backgroundColor: '#1a1a2e' }}
                    >
                      <Image
                        src="/images/rejoins-nous/screenshot-perf.jpg"
                        alt="WAC — Analyse de performance escalade en temps réel"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    {/* Barre home */}
                    <div
                      className="mx-auto mt-2 rounded-full"
                      style={{ width: '40px', height: '4px', backgroundColor: 'rgba(245,236,229,0.3)' }}
                    />
                  </div>
                  {/* Badge flottant gauche */}
                  <div
                    className="absolute -left-6 top-12 px-3 py-2 shadow-lg text-xs font-bold uppercase"
                    style={{
                      backgroundColor: 'var(--color-primary-green)',
                      color: 'var(--color-primary-beige)',
                      fontFamily: 'var(--font-syne)',
                      maxWidth: '100px',
                      lineHeight: '1.3',
                    }}
                  >
                    Données<br />réelles
                  </div>
                  {/* Badge flottant droit */}
                  <div
                    className="absolute -right-6 bottom-16 px-3 py-2 shadow-lg text-xs font-bold uppercase"
                    style={{
                      backgroundColor: 'var(--color-secondary-orange)',
                      color: 'var(--color-primary-beige)',
                      fontFamily: 'var(--font-syne)',
                      maxWidth: '100px',
                      lineHeight: '1.3',
                    }}
                  >
                    Bêta<br />test actif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section : Polar 360 - Pourquoi ce capteur */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-5xl mx-auto" style={{
              borderLeft: '6px solid var(--color-secondary-orange)',
              paddingLeft: '2rem'
            }}>
              <h2 className="text-4xl md:text-5xl mb-12" style={{ color: 'var(--color-primary-green)' }} data-aos="fade-up">
                POURQUOI LE POLAR 360 ?
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl leading-relaxed mb-12" style={{ color: 'var(--color-primary-green)' }} data-aos="fade-up" data-aos-delay="100">
                <p className="text-2xl font-medium text-center">
                  WAC fonctionne exclusivement avec le capteur Polar 360.
                </p>

                <p className="text-center">
                  C'est pas par hasard. C'est un choix technique délibéré.
                </p>

                <p className="text-center font-medium">
                  On a optimisé nos algorithmes spécifiquement pour ce capteur qui répond aux besoins des grimpeurs.
                </p>
              </div>

              {/* Caractéristiques Polar 360 */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)', color: 'var(--color-primary-green)' }} data-aos="fade-up" data-aos-delay="0">
                  <h3 className="text-2xl mb-6 font-bold">HAUTE PRÉCISION</h3>
                  <ul className="space-y-4 font-roboto text-base">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>99,4% de précision</strong> fréquence cardiaque (capteur optique 9 LED)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>Accéléromètre 3 axes</strong> optimisé pour les mouvements d'escalade</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>Variabilité cardiaque (HRV)</strong> pour analyse récupération</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>Capteur température</strong> peau pour détection fatigue</span>
                    </li>
                  </ul>
                </div>

                <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)', color: 'var(--color-primary-green)' }} data-aos="fade-up" data-aos-delay="100">
                  <h3 className="text-2xl mb-6 font-bold">CONÇU POUR GRIMPER</h3>
                  <ul className="space-y-4 font-roboto text-base">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>29g seulement</strong> — tu l'oublies pendant la grimpe</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>Sans écran</strong> — zéro distraction, juste la grimpe</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>Résistant</strong> eau, chocs, magnésie</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3 font-bold text-xl">✓</span>
                      <span><strong>8 jours d'autonomie</strong> — recharge hebdomadaire</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="200">
                <p className="text-xl font-medium italic" style={{ color: 'var(--color-secondary-orange)' }}>
                  → On a testé 15+ capteurs. Le Polar 360 a gagné.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section : L'exclusivité expliquée */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-12 text-primary-green text-center" data-aos="fade-up">
                POURQUOI PAS APPLE WATCH OU GARMIN ?
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl text-primary-green leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                <p>
                  On aurait pu faire une app compatible avec tous les capteurs.
                </p>

                <p>
                  Mais ça aurait signifié sacrifier la qualité des analyses.
                </p>

                <div className="p-8 shadow-lg my-8" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                  <p className="text-2xl font-bold mb-6 text-center text-secondary-orange">
                    On a fait le choix inverse.
                  </p>
                  <p className="text-xl text-center">
                    <strong>Un seul capteur. Optimisé à 100% pour l'escalade.</strong><br />
                    Des analyses ultra-précises adaptées aux mouvements spécifiques de la grimpe.
                  </p>
                </div>

                <p className="font-medium">
                  Les autres capteurs (Apple Watch, Garmin, Fitbit) ne sont pas conçus pour l'escalade :
                </p>

                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Précision FC variable sur mouvements explosifs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Accéléromètres non calibrés pour l'escalade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Écrans qui distraient de la grimpe</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-orange mr-3">•</span>
                    <span>Autonomie faible (1-2 jours)</span>
                  </li>
                </ul>

                <p className="text-xl font-medium italic text-center pt-8 text-secondary-orange">
                  → Qualité &gt; Compatibilité universelle
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section : Spécifications techniques */}
        <section className="py-20" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl mb-16 text-primary-green text-center" data-aos="fade-up">
                SPÉCIFICATIONS TECHNIQUES
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Capteurs */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="0">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-6">
                    CAPTEURS POLAR 360
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Fréquence cardiaque optique 9 LED (Precision Prime™)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Accéléromètre 3 axes + Gyroscope</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Capteur température peau</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Capteur luminosité ambiante</span>
                    </li>
                  </ul>
                </div>

                {/* Connectivité */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="100">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-6">
                    CONNECTIVITÉ
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Bluetooth 5.0</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Synchronisation automatique avec app WAC</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Mode offline intelligent (enregistrement sans connexion)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Mémoire interne : 200 heures de sessions</span>
                    </li>
                  </ul>
                </div>

                {/* Autonomie */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="200">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-6">
                    AUTONOMIE & CHARGE
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>8 jours en usage quotidien</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>40 heures en enregistrement continu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Recharge USB-C (2 heures complètes)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Indicateur batterie dans l'app</span>
                    </li>
                  </ul>
                </div>

                {/* Compatibilité */}
                <div className="p-8" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }} data-aos="fade-up" data-aos-delay="300">
                  <h3 className="text-2xl md:text-3xl text-primary-green mb-6">
                    COMPATIBILITÉ
                  </h3>
                  <ul className="space-y-3 font-roboto text-primary-green text-base">
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>iOS 14+ (iPhone 8 et ultérieurs)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Android 10+ (Samsung, Google, Xiaomi, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Mise à jour firmware OTA</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-orange mr-3">•</span>
                      <span>Garantie constructeur Polar : 2 ans</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
                <Link
                  href="/specifications-techniques"
                  className="inline-block text-primary-green hover:text-secondary-orange transition-colors font-roboto text-lg underline"
                >
                  → Voir toutes les spécifications techniques détaillées
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section : Où acheter */}
        <section className="py-20 md:py-32 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-12" data-aos="fade-up">
                OÙ ACHETER LE POLAR 360 ?
              </h2>

              <div className="space-y-6 font-roboto text-lg md:text-xl leading-relaxed mb-12" data-aos="fade-up" data-aos-delay="100">
                <p className="text-2xl font-medium">
                  Le capteur Polar 360 sera disponible via We Are Climbers.
                </p>

                <div className="bg-secondary-beige-light text-primary-green p-8 my-8">
                  <p className="text-3xl font-bold mb-4">Prix public bientôt communiqué</p>
                  <p className="text-lg">
                    Capteur Polar 360 + Câble USB-C + Garantie 2 ans
                  </p>
                </div>

                <p>
                  📦 <strong>Livraison</strong> : France et Europe<br />
                  🔄 <strong>Retour</strong> : 30 jours satisfait ou remboursé<br />
                  🛡️ <strong>Garantie</strong> : 2 ans constructeur Polar
                </p>

                <p className="text-xl font-medium pt-6">
                  Le capteur est disponible dès maintenant via la campagne Ulule en cours, jusqu'au 24 juin.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link
                  href="/boutique"
                  className="inline-block bg-secondary-orange text-white px-12 py-4 text-xl font-syne hover:bg-opacity-90 transition-all transform hover:scale-105"
                >
                  VOIR LES CONTREPARTIES
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl mb-8 text-primary-green" data-aos="fade-up">
                PRÊT À COMPRENDRE TON CORPS ?
              </h2>

              <p className="text-xl md:text-2xl font-roboto text-primary-green mb-12 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                Rejoins le mouvement des grimpeurs qui progressent sans se détruire.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link
                  href="/nos-grimpeurs"
                  className="inline-block bg-primary-green text-primary-beige px-10 py-4 text-lg font-syne hover:bg-opacity-90 transition-all"
                >
                  DÉCOUVRE NOS GRIMPEURS
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-secondary-orange text-white px-10 py-4 text-lg font-syne hover:bg-opacity-90 transition-all"
                >
                  REJOINS-NOUS
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
