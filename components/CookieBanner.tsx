'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('wac_cookie_consent')
    if (!consent) {
      // Afficher le banner après 1 seconde pour une meilleure UX
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Charger analytics si consentement donné
      const consentData = JSON.parse(consent)
      if (consentData.analytics) {
        loadUmamiAnalytics()
      }
    }
  }, [])

  const loadUmamiAnalytics = () => {
    // Charger le script Umami Analytics
    if (typeof window === 'undefined') return

    // Vérifier si Umami est déjà chargé
    if ((window as any).umami) {
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

    script.onload = () => {
      console.log('✅ Umami Analytics chargé et actif')
    }

    script.onerror = () => {
      console.error('❌ Erreur lors du chargement d\'Umami Analytics')
    }

    document.head.appendChild(script)
  }

  const saveConsent = (analytics: boolean) => {
    const consent = {
      essential: true, // Toujours true
      analytics: analytics,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('wac_cookie_consent', JSON.stringify(consent))

    if (analytics) {
      loadUmamiAnalytics()
    }

    setShowBanner(false)
  }

  const acceptAll = () => {
    saveConsent(true)
  }

  const refuseOptional = () => {
    saveConsent(false)
  }

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
                We Are Climbers utilise des cookies pour améliorer ton expérience sur le site.
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
                      <strong>Cookies analytics</strong> (optionnels) : Comprendre l'usage pour améliorer le site
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
                      <li>Sécurité et protection contre les attaques</li>
                      <li>Fonctionnement des formulaires</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">📊 Cookies Analytics (optionnels)</h4>
                    <p className="mb-2">Avec <strong>Umami Analytics</strong> (solution européenne, respectueuse de la vie privée) :</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Pages visitées et parcours utilisateur</li>
                      <li>Type d'appareil et navigateur (anonymisé)</li>
                      <li>Pays de provenance (pas de localisation précise)</li>
                      <li>Durée de visite</li>
                    </ul>
                    <p className="mt-2 text-xs opacity-75">
                      ⚠️ Aucune donnée personnelle identifiable n'est collectée. Les données restent en Europe et ne sont jamais revendues.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-secondary-beige">
                    <p className="text-xs">
                      <strong>Nous n'utilisons PAS :</strong> Google Analytics, publicités ciblées, tracking cross-site, ou cookies tiers invasifs.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-4 text-secondary-orange hover:underline font-roboto text-sm font-bold"
              >
                {showDetails ? '▲ Masquer les détails' : '▼ Voir les détails'}
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
                onClick={refuseOptional}
                className="btn-beige flex-1 sm:flex-initial"
              >
                Refuser les cookies optionnels
              </button>
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
