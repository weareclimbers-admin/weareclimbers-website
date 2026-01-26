'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CookiesPolicy() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:py-32 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl mb-6">
                Politique Cookies
              </h1>
              <p className="text-lg md:text-xl font-roboto opacity-90">
                Comment nous utilisons les cookies sur weareclimbers.fr
              </p>
              <p className="text-sm font-roboto opacity-75 mt-4">
                Dernière mise à jour : 26 Janvier 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">

              {/* Section 1 - Introduction */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">1. Introduction</h2>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">1.1 Qu'est-ce que cette Politique ?</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Cette Politique Cookies explique comment We Are Climbers utilise les cookies et technologies similaires sur son site web <strong>weareclimbers.fr</strong>.
                    Elle complète notre <a href="/privacy" className="text-secondary-orange hover:underline">Politique de Confidentialité</a> et nos <a href="/terms" className="text-secondary-orange hover:underline">Conditions Générales d'Utilisation</a>.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">1.2 Qu'est-ce qu'un Cookie ?</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Un cookie est un petit fichier texte stocké sur ton ordinateur ou appareil mobile par un site web que tu visites.
                    Les cookies permettent au site de mémoriser tes actions et préférences sur une période donnée.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">1.3 Pourquoi utilisons-nous des cookies ?</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Les cookies nous permettent de :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2 mb-4">
                    <li>Mémoriser tes préférences (langue, paramètres d'affichage)</li>
                    <li>Comprendre comment tu utilises notre site pour l'améliorer</li>
                    <li>Sécuriser ton utilisation du site</li>
                    <li>Mesurer l'audience de notre site (analytics)</li>
                  </ul>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Nous n'utilisons PAS de cookies pour :</strong>
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Publicités ciblées (We Are Climbers ne diffuse aucune publicité)</li>
                    <li>Tracking cross-site (suivi entre différents sites)</li>
                    <li>Revente de données à des tiers</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 - Types de Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">2. Types de Cookies Utilisés</h2>

                <div className="mb-8 p-6 bg-secondary-beige-light">
                  <h3 className="text-2xl mb-4 text-primary-green">2.1 Cookies Strictement Nécessaires</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Fonction :</strong> Essentiels au fonctionnement du site web.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    Ces cookies sont obligatoires et ne nécessitent pas ton consentement (intérêt légitime).
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full font-roboto text-sm">
                      <thead>
                        <tr className="border-b border-primary-green">
                          <th className="text-left py-2 text-primary-green">Cookie</th>
                          <th className="text-left py-2 text-primary-green">Durée</th>
                          <th className="text-left py-2 text-primary-green">Fonction</th>
                        </tr>
                      </thead>
                      <tbody className="text-primary-green">
                        <tr className="border-b border-secondary-beige">
                          <td className="py-2">cookie_consent</td>
                          <td className="py-2">13 mois</td>
                          <td className="py-2">Mémorise ton choix de cookies</td>
                        </tr>
                        <tr className="border-b border-secondary-beige">
                          <td className="py-2">session_id</td>
                          <td className="py-2">Session</td>
                          <td className="py-2">Identifiant de session sécurisé</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="font-roboto text-primary-green mt-4 text-sm opacity-75">
                    <strong>Base légale :</strong> Intérêt légitime (Article 6.1.f RGPD)
                  </p>
                </div>

                <div className="mb-8 p-6 bg-secondary-beige-light">
                  <h3 className="text-2xl mb-4 text-primary-green">2.2 Cookies Analytics (Optionnels)</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Fonction :</strong> Comprendre comment tu utilises le site pour l'améliorer.
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    Ces cookies nécessitent ton <strong>consentement explicite</strong>.
                  </p>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full font-roboto text-sm">
                      <thead>
                        <tr className="border-b border-primary-green">
                          <th className="text-left py-2 text-primary-green">Service</th>
                          <th className="text-left py-2 text-primary-green">Durée</th>
                          <th className="text-left py-2 text-primary-green">Données collectées</th>
                        </tr>
                      </thead>
                      <tbody className="text-primary-green">
                        <tr className="border-b border-secondary-beige">
                          <td className="py-2">Umami Analytics</td>
                          <td className="py-2">Session</td>
                          <td className="py-2">Pages visitées, durée de visite, pays</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Données collectées par Umami :</strong>
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2 mb-4">
                    <li>Pages consultées sur le site</li>
                    <li>Durée de visite et parcours utilisateur</li>
                    <li>Type d'appareil et navigateur (sans identification personnelle)</li>
                    <li>Pays de provenance (pas de localisation précise)</li>
                    <li>Site référent (comment tu es arrivé sur notre site)</li>
                  </ul>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Données NON collectées :</strong>
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2 mb-4">
                    <li>Adresse IP complète (anonymisée)</li>
                    <li>Informations personnelles identifiables</li>
                    <li>Contenu des formulaires avant soumission</li>
                    <li>Cookies tiers ou tracking cross-site</li>
                  </ul>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Hébergement :</strong> Umami est hébergé sur des serveurs européens (Vercel EU), tes données ne quittent jamais l'Europe.
                  </p>
                  <p className="font-roboto text-primary-green text-sm opacity-75">
                    <strong>Base légale :</strong> Consentement (Article 6.1.a RGPD)
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">2.3 Cookies que nous n'utilisons PAS</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    We Are Climbers ne fait <strong>PAS</strong> usage de :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Cookies publicitaires (pas de régie publicitaire)</li>
                    <li>Cookies de réseaux sociaux tiers (Facebook Pixel, LinkedIn Insight, etc.)</li>
                    <li>Cookies de retargeting ou remarketing</li>
                    <li>Cookies de profilage comportemental à des fins marketing</li>
                    <li>Google Analytics ou autres solutions américaines invasives</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 - Gestion des Préférences */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">3. Gérer tes Préférences</h2>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">3.1 Consentement Initial</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    À ta première visite sur weareclimbers.fr, tu verras une bannière de cookies te proposant :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2 mb-4">
                    <li><strong>Accepter tout :</strong> Active cookies essentiels + analytics</li>
                    <li><strong>Refuser les cookies optionnels :</strong> Active uniquement les cookies essentiels</li>
                    <li><strong>Personnaliser :</strong> Choisis précisément quels cookies activer</li>
                  </ul>
                  <p className="font-roboto text-primary-green">
                    <strong>Par défaut</strong> (si tu fermes la bannière) : Seuls les cookies essentiels sont activés.
                  </p>
                </div>

                <div className="mb-8 p-6 bg-secondary-beige-light">
                  <h3 className="text-2xl mb-4 text-primary-green">3.2 Modifier tes Choix</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Tu peux modifier tes préférences à tout moment en cliquant sur le lien en bas de page :
                    <button className="text-secondary-orange hover:underline ml-2 font-bold">
                      Gérer mes cookies
                    </button>
                  </p>
                  <p className="font-roboto text-primary-green mb-4">
                    <strong>Effet immédiat :</strong> Dès que tu désactives les cookies analytics, nous arrêtons immédiatement la collecte de données.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">3.3 Supprimer les Cookies via ton Navigateur</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Tu peux aussi supprimer les cookies directement dans ton navigateur :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li><strong>Chrome :</strong> Paramètres &gt; Confidentialité et sécurité &gt; Cookies et données de sites</li>
                    <li><strong>Firefox :</strong> Paramètres &gt; Vie privée et sécurité &gt; Cookies et données de sites</li>
                    <li><strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Gérer les données de sites web</li>
                    <li><strong>Edge :</strong> Paramètres &gt; Confidentialité, recherche et services &gt; Cookies</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 - Durée de Conservation */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">4. Durée de Conservation</h2>
                <div className="overflow-x-auto">
                  <table className="w-full font-roboto text-sm">
                    <thead>
                      <tr className="border-b-2 border-primary-green">
                        <th className="text-left py-3 text-primary-green">Type de cookie</th>
                        <th className="text-left py-3 text-primary-green">Durée</th>
                        <th className="text-left py-3 text-primary-green">Suppression</th>
                      </tr>
                    </thead>
                    <tbody className="text-primary-green">
                      <tr className="border-b border-secondary-beige">
                        <td className="py-3">Consentement cookies</td>
                        <td className="py-3">13 mois</td>
                        <td className="py-3">Automatique ou via navigateur</td>
                      </tr>
                      <tr className="border-b border-secondary-beige">
                        <td className="py-3">Session</td>
                        <td className="py-3">Jusqu'à fermeture navigateur</td>
                        <td className="py-3">Automatique</td>
                      </tr>
                      <tr className="border-b border-secondary-beige">
                        <td className="py-3">Analytics Umami</td>
                        <td className="py-3">Session uniquement</td>
                        <td className="py-3">Automatique à la fermeture</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5 - Législation */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">5. Conformité Légale</h2>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">5.1 Conformité RGPD (UE)</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    We Are Climbers respecte le RGPD :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Consentement libre, spécifique, éclairé et univoque pour cookies non essentiels</li>
                    <li>Pas de "cookie wall" (accès au site même si tu refuses les cookies)</li>
                    <li>Retrait du consentement aussi facile que de le donner</li>
                    <li>Transparence totale sur l'utilisation des cookies</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl mb-4 text-primary-green">5.2 Directive ePrivacy (Cookie Law)</h3>
                  <p className="font-roboto text-primary-green mb-4">
                    Applicable en France (Article 82 de la Loi Informatique et Libertés) :
                  </p>
                  <ul className="list-disc pl-6 font-roboto text-primary-green space-y-2">
                    <li>Consentement obligatoire pour cookies non essentiels</li>
                    <li>Information claire et complète avant consentement</li>
                    <li>Possibilité de refuser sans conséquence sur l'accès au site</li>
                    <li>Durée de validité du consentement : 13 mois maximum (recommandation CNIL)</li>
                  </ul>
                </div>
              </div>

              {/* Section 6 - Tes Droits */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">6. Tes Droits RGPD</h2>
                <p className="font-roboto text-primary-green mb-4">
                  Tu disposes des droits suivants concernant les données collectées via cookies :
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary-beige-light">
                    <p className="font-roboto text-primary-green">
                      <strong>Droit d'accès :</strong> Savoir quelles données sont collectées via cookies
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-beige-light">
                    <p className="font-roboto text-primary-green">
                      <strong>Droit à l'effacement :</strong> Supprimer tes cookies via les paramètres du site ou ton navigateur
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-beige-light">
                    <p className="font-roboto text-primary-green">
                      <strong>Droit d'opposition :</strong> Refuser les cookies analytics à tout moment
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-beige-light">
                    <p className="font-roboto text-primary-green">
                      <strong>Droit de retirer le consentement :</strong> Désactiver les cookies optionnels en un clic
                    </p>
                  </div>
                </div>
                <p className="font-roboto text-primary-green mt-6">
                  Pour exercer tes droits, contacte-nous : <a href="mailto:contact@weareclimbers.fr" className="text-secondary-orange hover:underline">contact@weareclimbers.fr</a>
                </p>
              </div>

              {/* Section 7 - FAQ */}
              <div className="mb-12">
                <h2 className="text-3xl mb-6 text-primary-green">7. Questions Fréquentes</h2>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-primary-green mb-2">Le site fonctionne-t-il si je refuse les cookies analytics ?</h4>
                    <p className="font-roboto text-primary-green">
                      Oui, absolument ! Toutes les fonctionnalités du site restent accessibles. Nous ne collecterons simplement pas de statistiques d'usage.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-primary-green mb-2">We Are Climbers utilise-t-il mes cookies pour de la publicité ?</h4>
                    <p className="font-roboto text-primary-green">
                      Non, jamais. We Are Climbers ne diffuse aucune publicité et ne partage pas tes données avec des régies publicitaires.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-primary-green mb-2">Mes données sont-elles envoyées aux États-Unis ?</h4>
                    <p className="font-roboto text-primary-green">
                      Non. Umami est hébergé sur des serveurs européens (Vercel EU). Tes données restent en Europe et sont protégées par le RGPD.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-primary-green mb-2">Combien de temps mon consentement est-il valable ?</h4>
                    <p className="font-roboto text-primary-green">
                      13 mois selon les recommandations CNIL. Après cette période, nous te redemanderons ton consentement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 8 - Contact */}
              <div className="mb-12 p-6 bg-primary-green text-primary-beige">
                <h2 className="text-3xl mb-6">8. Nous Contacter</h2>
                <p className="font-roboto mb-4">
                  Questions sur les cookies ?
                </p>
                <div className="space-y-2 font-roboto">
                  <p>
                    <strong>Email :</strong> <a href="mailto:contact@weareclimbers.fr" className="text-secondary-orange hover:underline">contact@weareclimbers.fr</a>
                  </p>
                  <p>
                    <strong>Adresse postale :</strong><br />
                    We Are Climbers<br />
                    97 Allée Théodore Monod<br />
                    64210 Bidart<br />
                    France
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-8 border-t border-secondary-beige">
                <p className="font-roboto text-sm text-primary-green opacity-75">
                  © 2026 We Are Climbers. Tous droits réservés.
                </p>
                <p className="font-roboto text-xs text-primary-green opacity-60 mt-2">
                  Cette Politique Cookies a été établie conformément au RGPD (UE 2016/679) et à la directive ePrivacy (2002/58/CE)
                  telle que transposée en France (Article 82 de la Loi Informatique et Libertés).
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
