'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:py-32 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl mb-6">
                Conditions Générales d'Utilisation
              </h1>
              <p className="text-lg md:text-xl font-roboto opacity-90">
                Conditions d'utilisation du site weareclimbers.fr
              </p>
              <p className="text-sm font-roboto opacity-75 mt-4">
                Dernière mise à jour : 26 Janvier 2026 - Version 1.0
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">

              {/* Section 1 - Acceptation */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">1. Acceptation des Conditions</h2>
                <p className="font-roboto text-primary-green mb-4">
                  Bienvenue sur We Are Climbers ! En utilisant notre site web <strong>weareclimbers.fr</strong>, tu acceptes d'être lié par les présentes Conditions Générales d'Utilisation (« CGU » ou « Conditions »).
                </p>
                <p className="font-roboto text-primary-green mb-6">
                  Si tu n'acceptes pas ces Conditions, n'utilise pas ce site.
                </p>

                <div className="p-6 bg-secondary-beige-light mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">1.1 Qui sommes-nous ?</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    We Are Climbers est une application mobile d'escalade éditée par :
                  </p>
                  <div className="font-roboto text-primary-green space-y-1">
                    <p><strong>We Are Climbers SAS</strong></p>
                    <p>Capital social : 1 000 €</p>
                    <p>97 Allée Théodore Monod</p>
                    <p>64210 Bidart, France</p>
                    <p>SIRET : 98923006500017</p>
                    <p>TVA : FR39989230065</p>
                    <p>Email : <a href="mailto:contact@weareclimbers.fr" className="text-secondary-orange hover:underline">contact@weareclimbers.fr</a></p>
                    <p>Hébergement : Vercel Inc. (San Francisco, CA) et OVH SAS (Roubaix, France)</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">1.2 Objet du Site</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Le site <strong>weareclimbers.fr</strong> est un site vitrine présentant :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>L'application mobile We Are Climbers (iOS et Android)</li>
                    <li>Notre mission et nos valeurs</li>
                    <li>Les fonctionnalités et services de l'application</li>
                    <li>Un formulaire de contact et d'inscription à la newsletter</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 - Accès au Site */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">2. Accès au Site</h2>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">2.1 Conditions d'Accès</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    L'accès au site <strong>weareclimbers.fr</strong> est gratuit et ouvert à tous.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie du site à tout moment, sans préavis.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">2.2 Disponibilité du Site</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Nous faisons de notre mieux pour maintenir le site accessible 24h/24, 7j/7, mais nous ne garantissons pas :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>L'absence d'interruptions ou d'erreurs</li>
                    <li>La disponibilité permanente (maintenance, pannes techniques)</li>
                    <li>La compatibilité avec tous les navigateurs et appareils</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 - Utilisation du Site */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">3. Utilisation du Site</h2>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">3.1 Usage Autorisé</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Tu peux utiliser ce site pour :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Découvrir l'application We Are Climbers</li>
                    <li>Contacter notre équipe via le formulaire</li>
                    <li>T'inscrire à notre newsletter pour suivre le crowdfunding</li>
                    <li>Consulter nos pages d'information (mission, valeurs, spécifications techniques)</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">3.2 Usage Interdit</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Il est strictement interdit de :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Copier, modifier, distribuer ou reproduire tout ou partie du site sans autorisation</li>
                    <li>Utiliser des bots, scripts ou outils automatisés pour accéder au site</li>
                    <li>Tenter de pirater, perturber ou surcharger le site (attaques DDoS, injection SQL)</li>
                    <li>Extraire massivement des données du site (scraping)</li>
                    <li>Utiliser le site à des fins illégales ou frauduleuses</li>
                    <li>Usurper l'identité de We Are Climbers ou de ses représentants</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 - Formulaire de Contact et Newsletter */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">4. Formulaire de Contact et Newsletter</h2>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">4.1 Formulaire de Contact</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Lorsque tu utilises notre formulaire de contact, tu acceptes que nous traitions tes données personnelles (nom, email, message) pour répondre à ta demande.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    Tes données sont conservées pendant <strong>3 ans maximum</strong> après ton dernier contact.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    Pour plus d'informations, consulte notre <a href="/privacy" className="text-secondary-orange hover:underline">Politique de Confidentialité</a>.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">4.2 Inscription Newsletter</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    En t'inscrivant à notre newsletter, tu acceptes de recevoir des emails concernant :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2 mb-4">
                    <li>Le lancement du crowdfunding We Are Climbers (Mai 2026)</li>
                    <li>Les actualités importantes de l'application</li>
                    <li>Les mises à jour majeures et nouvelles fonctionnalités</li>
                  </ul>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Fréquence :</strong> Nous ne t'enverrons pas plus de 2 emails par mois.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Désabonnement :</strong> Tu peux te désinscrire à tout moment en cliquant sur le lien de désinscription présent dans chaque email.
                  </p>
                </div>
              </div>

              {/* Section 5 - Propriété Intellectuelle */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">5. Propriété Intellectuelle</h2>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">5.1 Nos Droits</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Tous les contenus présents sur <strong>weareclimbers.fr</strong> sont protégés par le droit d'auteur et appartiennent à We Are Climbers ou à ses concédants :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Textes, articles, descriptions</li>
                    <li>Design, graphismes, illustrations</li>
                    <li>Logos, marques, noms commerciaux</li>
                    <li>Photos et vidéos</li>
                    <li>Code source du site</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">5.2 Utilisation Autorisée</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Tu peux :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Consulter et naviguer sur le site pour ton usage personnel</li>
                    <li>Partager des liens vers nos pages sur les réseaux sociaux</li>
                    <li>Citer de courts extraits avec attribution et lien vers la source</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">5.3 Marques de Tiers</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Polar, Google, Apple et autres marques tierces mentionnées sont la propriété de leurs détenteurs respectifs. Leur mention n'implique aucune affiliation ou approbation de leur part.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">5.4 Crédits Photos</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Les photos d'escalade utilisées sur le site proviennent de :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Banques d'images libres de droits (Unsplash, Pexels)</li>
                    <li>Photographes collaborateurs (crédités sur chaque image)</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 - Limitation de Responsabilité */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">6. Limitation de Responsabilité</h2>

                <div className="p-6 bg-secondary-beige-light mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">6.1 Informations Fournies</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Nous faisons de notre mieux pour fournir des informations exactes et à jour sur le site, mais nous ne garantissons pas :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>L'exactitude, l'exhaustivité ou l'actualité des informations</li>
                    <li>L'absence d'erreurs ou d'omissions</li>
                    <li>La disponibilité future des fonctionnalités décrites</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">6.2 Liens Externes</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Le site peut contenir des liens vers des sites tiers (Instagram, partenaires). Nous ne sommes pas responsables du contenu, de la disponibilité ou des pratiques de confidentialité de ces sites.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">6.3 Dommages</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Dans les limites autorisées par la loi, We Are Climbers ne sera pas responsable des dommages directs ou indirects résultant de :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>L'utilisation ou l'impossibilité d'utiliser le site</li>
                    <li>Erreurs, interruptions ou pannes techniques</li>
                    <li>Perte de données ou d'informations</li>
                    <li>Virus ou malwares (bien que nous fassions notre possible pour les prévenir)</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 - Protection des Données */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">7. Protection des Données Personnelles</h2>
                <p className="font-roboto text-primary-green mb-4">
                  Nous prenons très au sérieux la protection de tes données personnelles.
                </p>
                <p className="font-roboto text-primary-green mb-4">
                  Toutes les informations sur la collecte, l'utilisation et la protection de tes données sont détaillées dans notre <a href="/privacy" className="text-secondary-orange hover:underline font-bold">Politique de Confidentialité</a>.
                </p>
                <p className="font-roboto text-primary-green mb-4">
                  Conformément au RGPD, tu disposes d'un droit d'accès, de rectification, de suppression et de portabilité de tes données. Pour exercer ces droits, contacte-nous à <a href="mailto:contact@weareclimbers.fr" className="text-secondary-orange hover:underline">contact@weareclimbers.fr</a>.
                </p>
              </div>

              {/* Section 8 - Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">8. Cookies et Technologies Similaires</h2>
                <p className="font-roboto text-primary-green mb-4">
                  Nous utilisons des cookies pour améliorer ton expérience sur le site et mesurer son audience.
                </p>
                <p className="font-roboto text-primary-green mb-4">
                  Pour tout savoir sur les cookies que nous utilisons et comment les gérer, consulte notre <a href="/cookies" className="text-secondary-orange hover:underline font-bold">Politique Cookies</a>.
                </p>
              </div>

              {/* Section 9 - Modifications */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">9. Modifications des Conditions</h2>
                <p className="font-roboto text-primary-green mb-4">
                  Nous pouvons modifier ces Conditions à tout moment pour refléter :
                </p>
                <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2 mb-4">
                  <li>Évolutions du site (nouvelles fonctionnalités)</li>
                  <li>Changements réglementaires</li>
                  <li>Améliorations des services</li>
                </ul>
                <p className="font-roboto text-primary-green mb-4">
                  En cas de modification importante, nous afficherons un avertissement sur le site et mettrons à jour la date de « Dernière mise à jour » en haut de cette page.
                </p>
                <p className="font-roboto text-primary-green">
                  Ton utilisation continue du site après modification signifie que tu acceptes les nouvelles Conditions.
                </p>
              </div>

              {/* Section 10 - Droit Applicable */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">10. Droit Applicable et Juridiction</h2>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">10.1 Droit Applicable</h3>
                  <p className="font-roboto text-primary-green">
                    Ces Conditions sont régies par le droit français.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">10.2 Résolution des Litiges</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Avant toute action judiciaire, nous encourageons la résolution amiable des différends en nous contactant à <a href="mailto:contact@weareclimbers.fr" className="text-secondary-orange hover:underline">contact@weareclimbers.fr</a>.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    Conformément aux articles L.612-1 et suivants du Code de la consommation, tu as le droit de recourir gratuitement à un médiateur de la consommation en cas de litige.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl mb-4 text-primary-green">10.3 Juridiction Compétente</h3>
                  <p className="font-roboto text-primary-green">
                    En cas d'échec de la médiation, les tribunaux français sont compétents. Pour les consommateurs, tu peux saisir le tribunal de ton lieu de résidence ou celui de notre siège social (Bayonne, France).
                  </p>
                </div>
              </div>

              {/* Section 11 - Contact */}
              <div className="mb-12 p-6 bg-primary-green text-primary-beige">
                <h2 className="text-3xl mb-6">11. Nous Contacter</h2>
                <p className="font-roboto mb-4">
                  Questions sur les Conditions Générales d'Utilisation ?
                </p>
                <div className="space-y-3 font-roboto">
                  <p>
                    <strong>Email :</strong> <a href="mailto:contact@weareclimbers.fr" className="text-secondary-orange hover:underline">contact@weareclimbers.fr</a>
                  </p>
                  <p>
                    <strong>Support :</strong> <a href="mailto:support@weareclimbers.fr" className="text-secondary-orange hover:underline">support@weareclimbers.fr</a>
                  </p>
                  <p>
                    <strong>Adresse postale :</strong><br />
                    We Are Climbers<br />
                    97 Allée Théodore Monod<br />
                    64210 Bidart<br />
                    France
                  </p>
                  <p className="mt-6">
                    <strong>Formulaire de contact :</strong> <a href="/contact" className="text-secondary-orange hover:underline">Nous contacter</a>
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-8 border-t border-secondary-beige">
                <p className="font-roboto text-sm text-primary-green opacity-75">
                  © 2026 We Are Climbers. Tous droits réservés.
                </p>
                <p className="font-roboto text-xs text-primary-green opacity-60 mt-2">
                  En utilisant le site weareclimbers.fr, tu reconnais avoir lu, compris et accepté les présentes Conditions Générales d'Utilisation.
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
