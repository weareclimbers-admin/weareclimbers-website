'use client'

import { useState, useEffect } from 'react'

/**
 * Bandeau de consentement CNIL du site vitrine.
 *
 * Deux catégories optionnelles, toutes deux en OPT-IN (désactivées par défaut) :
 * - « Analytics » → Umami Cloud EU (mesure d'audience, sans cookie tiers)
 * - « Marketing » → Meta Pixel (Facebook), traceur publicitaire soumis à
 *   consentement préalable. Le pixel n'est JAMAIS chargé tant que ce
 *   consentement n'est pas donné (cf. layout.tsx d'où il a été retiré).
 *
 * Le choix est mémorisé dans localStorage (`wac_cookie_consent`).
 */
type ConsentState = {
  essential: true
  analytics: boolean
  marketing: boolean
  timestamp: string
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  // Cases à cocher du mode « choix personnalisés » (opt-in par défaut = false)
  const [analyticsChecked, setAnalyticsChecked] = useState(false)
  const [marketingChecked, setMarketingChecked] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('wac_cookie_consent')
    if (!consent) {
      // Afficher le banner après 1 seconde pour une meilleure UX
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Recharger les traceurs correspondant au consentement déjà donné
      try {
        const consentData = JSON.parse(consent)
        if (consentData.analytics) loadUmamiAnalytics()
        if (consentData.marketing) loadMetaPixel()
      } catch {
        /* consentement illisible : on ne charge rien */
      }
    }
  }, [])

  const loadUmamiAnalytics = () => {
    // Charger le script Umami Analytics (Umami Cloud EU)
    if (typeof window === 'undefined') return

    // Vérifier si Umami est déjà chargé
    if (window.umami) {
      console.log('Umami Analytics déjà chargé')
      return
    }

    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
    const scriptSrc = process.env.NEXT_PUBLIC_UMAMI_SRC

    if (!websiteId || !scriptSrc) {
      console.warn('Umami Analytics : variables d\'environnement manquantes')
      return
    }

    // Créer et injecter le script Umami
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = scriptSrc
    script.setAttribute('data-website-id', websiteId)
    // Seul le domaine public est mesuré — les previews Vercel et localhost
    // ne polluent pas les stats de campagne même si on y consent.
    script.setAttribute('data-domains', 'www.weareclimbers.fr')

    script.onload = () => {
      console.log('✅ Umami Analytics chargé et actif')
    }

    script.onerror = () => {
      console.error('❌ Erreur lors du chargement d\'Umami Analytics')
    }

    document.head.appendChild(script)
  }

  const loadMetaPixel = () => {
    // Charger le Meta Pixel UNIQUEMENT après consentement « Marketing ».
    if (typeof window === 'undefined') return

    const w = window as any
    if (w.fbq) return // déjà initialisé

    const pixelId =
      process.env.NEXT_PUBLIC_META_PIXEL_ID || '1574373133681517'

    // Snippet officiel Meta, exécuté à la demande (et non au chargement de page)
    const n: any = (w.fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    })
    if (!w._fbq) w._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []

    const t = document.createElement('script')
    t.async = true
    t.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(t, s)

    w.fbq('init', pixelId)
    w.fbq('track', 'PageView')
    console.log('✅ Meta Pixel chargé (consentement marketing)')
  }

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const consent: ConsentState = {
      essential: true, // Toujours true
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('wac_cookie_consent', JSON.stringify(consent))

    if (analytics) loadUmamiAnalytics()
    if (marketing) loadMetaPixel()

    setShowBanner(false)
  }

  const acceptAll = () => saveConsent(true, true)
  const refuseAll = () => saveConsent(false, false)
  const saveChoices = () => saveConsent(analyticsChecked, marketingChecked)

  if (!showBanner) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        style={{ backdropFilter: 'blur(2px)' }}
      />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
        <div className="container-custom py-4 md:py-6">
          <div
            className="mx-auto max-w-4xl shadow-lg p-4 md:p-8"
            style={{ backgroundColor: 'var(--color-primary-beige)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 mr-3 flex-shrink-0"
                  fill="var(--color-primary-green)"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <h3 className="text-2xl text-primary-green">
                  On respecte ta vie privée
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="font-roboto text-primary-green mb-4">
                We Are Climbers utilise des cookies pour améliorer ton expérience sur le site. Tu peux tout accepter, tout refuser, ou choisir précisément ce que tu autorises.
              </p>

              {!showDetails ? (
                <div className="space-y-3 font-roboto text-primary-green">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-secondary-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <p>
                      <strong>Cookies essentiels</strong> (obligatoires) : Sécurité et fonctionnement du site
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <p>
                      <strong>Cookies analytics</strong> (optionnels) : Comprendre l'usage pour améliorer le site (Umami, sans cookie tiers)
                    </p>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <p>
                      <strong>Cookies marketing</strong> (optionnels) : Mesure de nos campagnes publicitaires (Meta Pixel / Facebook)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="max-h-[40vh] overflow-y-auto space-y-4 font-roboto text-primary-green text-sm bg-secondary-beige-light p-4 rounded">
                  <div>
                    <h4 className="font-bold mb-2">🔒 Cookies Essentiels (obligatoires)</h4>
                    <p className="mb-2">Ces cookies sont nécessaires au fonctionnement du site :</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mémorisation de ton choix de cookies (13 mois)</li>
                      <li>Sécurité et fonctionnement des formulaires</li>
                    </ul>
                  </div>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsChecked}
                        onChange={(e) => setAnalyticsChecked(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-secondary-orange"
                      />
                      <span>
                        <span className="font-bold block mb-1">📊 Cookies Analytics (optionnels)</span>
                        Avec <strong>Umami Cloud EU</strong> (solution européenne, respectueuse de la vie privée, sans cookie tiers) : pages visitées, type d'appareil et navigateur (anonymisé), pays de provenance, durée de visite. Aucune donnée personnelle identifiable, données hébergées dans l'Union Européenne.
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingChecked}
                        onChange={(e) => setMarketingChecked(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-secondary-orange"
                      />
                      <span>
                        <span className="font-bold block mb-1">🎯 Cookies Marketing (optionnels)</span>
                        Avec le <strong>Meta Pixel (Facebook)</strong> : mesure de la performance de nos campagnes publicitaires et remarketing. Ces cookies tiers déposés par Meta permettent un suivi cross-site. Le pixel n'est chargé <strong>que si tu l'acceptes ici</strong>. Un transfert de données vers les États-Unis (Meta Platforms) peut avoir lieu, encadré par les Clauses Contractuelles Types et le Data Privacy Framework.
                      </span>
                    </label>
                  </div>
                  <div className="pt-2 border-t border-secondary-beige">
                    <p className="text-xs">
                      <strong>Nous n'utilisons PAS :</strong> Google Analytics ni cookies tiers autres que ceux listés ci-dessus. Les cookies analytics et marketing sont désactivés par défaut : rien n'est chargé sans ton accord.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-4 text-secondary-orange hover:underline font-roboto text-sm font-bold"
              >
                {showDetails ? '▲ Masquer les détails' : '▼ Personnaliser mes choix'}
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptAll}
                className="btn-secondary flex-1 sm:flex-initial"
              >
                Accepter tout
              </button>
              <button
                onClick={refuseAll}
                className="btn-beige flex-1 sm:flex-initial"
              >
                Tout refuser
              </button>
              {showDetails && (
                <button
                  onClick={saveChoices}
                  className="btn-beige flex-1 sm:flex-initial"
                >
                  Enregistrer mes choix
                </button>
              )}
            </div>

            {/* Footer Links */}
            <div className="mt-4 pt-4 border-t border-secondary-beige">
              <p className="font-roboto text-xs text-primary-green opacity-75">
                En savoir plus :
                <a href="/cookies" className="text-secondary-orange hover:underline ml-1">Politique Cookies</a>
                {' • '}
                <a href="/privacy" className="text-secondary-orange hover:underline">Politique de Confidentialité</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }

        /* Style de la scrollbar pour webkit (Chrome, Safari, Edge) */
        .animate-slide-up::-webkit-scrollbar {
          width: 8px;
        }
        .animate-slide-up::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .animate-slide-up::-webkit-scrollbar-thumb {
          background: var(--color-secondary-orange);
          border-radius: 4px;
        }
        .animate-slide-up::-webkit-scrollbar-thumb:hover {
          background: var(--color-primary-green);
        }
      `}</style>
    </>
  )
}
