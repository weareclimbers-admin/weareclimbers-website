'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ParcelPoint } from '@boxtal/parcel-point-map'
import { SHIPPING_ZONES, cheapestShipping, formatPrice, formatShipping } from '@/lib/preorder'
import type { PartnerOffer } from '@/lib/offers'
import { trackShopEvent, SHOP_CONTENT, newEventId, hasMarketingConsent } from '@/lib/meta-pixel'
import { trackShop, trackShopBeforeLeaving } from '@/lib/umami'
import Reassurance from '@/components/boutique/Reassurance'

/**
 * Formulaire de commande de la boutique → checkout Stripe hébergé.
 *
 * Une seule étape avant le paiement (refonte conversion, 13/10/2026) : France +
 * point relais Chronopost présélectionnés (choix de Julien : le relais coûte
 * nettement moins cher que le domicile), le visiteur tape son code postal et
 * choisit son relais. Les autres options (domicile, hors France) sont repliées
 * derrière « Modifier la livraison ». La quantité se règle sur la page Stripe
 * (adjustable_quantity, sauf offre partenaire).
 *
 * UNE seule instance par page (une seule carte Boxtal, id fixe) : ShopLanding
 * l'affiche dans la fiche sur ordinateur et dans le panneau mobile.
 */

export interface Attribution {
  creator: string
  utm: Record<string, string>
  offer: string
  fbclid: string
}

/** Point relais tel que renvoyé par /api/relay-points (miroir de la réponse Boxtal serveur). */
interface RelayPointLite {
  id: string
  name: string
  address: string
  zip: string
  city: string
  country: string
  distanceMeters: number | null
}

/**
 * Carte Boxtal (choix visuel du relais). Vérifiée en prod par Julien le
 * 13/10/2026 : elle s'affiche. ⚠️ Depuis un navigateur automatisé (tests
 * headless), le style de l'app hébergée Boxtal répond 410 → la carte n'y
 * charge jamais et le repli « liste » prend le relais après 8 s : ce n'est pas
 * représentatif des vrais visiteurs. false = liste des relais seule.
 */
const USE_BOXTAL_MAP = true

const labelStyle = {
  fontFamily: 'var(--font-syne)',
  color: 'var(--color-primary-green)',
  letterSpacing: '0.1em',
} as const

export default function OrderForm({
  active,
  inSheet,
  unitPrice,
  attribution,
  offer,
  onOfferUnavailable,
}: {
  /** Formulaire visible au moins une fois → la carte Boxtal peut se charger. */
  active: boolean
  /** Affiché dans le panneau mobile (le clic d'ouverture a déjà été compté). */
  inSheet: boolean
  unitPrice: number | null
  attribution: Attribution
  offer: PartnerOffer | undefined
  onOfferUnavailable: () => void
}) {
  const [zoneId, setZoneId] = useState(SHIPPING_ZONES[0].id)
  const [modeId, setModeId] = useState(SHIPPING_ZONES[0].modes[0].id)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sélection du point relais Chronopost Shop2Shop (modes « relais »)
  const [relayCountry, setRelayCountry] = useState('FR')
  const [relayZip, setRelayZip] = useState('')
  const [relayPoints, setRelayPoints] = useState<RelayPointLite[] | null>(null)
  const [relaySearching, setRelaySearching] = useState(false)
  const [relayError, setRelayError] = useState<string | null>(null)
  const [selectedRelay, setSelectedRelay] = useState<RelayPointLite | null>(null)
  const zipInputRef = useRef<HTMLInputElement>(null)
  /** Dernière recherche lancée (pays-CP) : la recherche part toute seule, une fois par code postal. */
  const lastSearch = useRef('')

  // Carte interactive Boxtal (choix visuel du point Shop2Shop). Fallback recherche
  // manuelle (liste) si la clé manque, si le module échoue, ou si la carte ne charge pas.
  const mapRef = useRef<null | {
    searchParcelPoints: (
      address: { country: string; zipCode: string; city: string },
      cb: (pp: ParcelPoint) => void,
    ) => void
  }>(null)
  const mapLoadedRef = useRef(false)
  const [mapReady, setMapReady] = useState(false)
  const [mapFailed, setMapFailed] = useState(!USE_BOXTAL_MAP)

  const currentZone = SHIPPING_ZONES.find((z) => z.id === zoneId) ?? SHIPPING_ZONES[0]
  const currentMode = currentZone.modes.find((m) => m.id === modeId) ?? currentZone.modes[0]
  const total = unitPrice !== null ? unitPrice + (currentMode.shippingTtc ?? 0) : null

  // Monte la carte Boxtal quand le formulaire est visible ET en mode relais (sur
  // mobile : à la 1re ouverture du panneau, pas au chargement de la page) ; bascule
  // en recherche manuelle si le token échoue, si le module échoue, ou après 8 s.
  useEffect(() => {
    if (!USE_BOXTAL_MAP || !active || !currentMode.relay) return
    let cancelled = false
    mapLoadedRef.current = false
    setMapReady(false)
    setMapFailed(false)
    const timeout = setTimeout(() => {
      if (!cancelled && !mapLoadedRef.current) setMapFailed(true)
    }, 8000)
    void (async () => {
      try {
        // Token JWT généré côté serveur (la clé secrète carte ne fuite pas au client).
        const [{ BoxtalParcelPointMap }, tokRes] = await Promise.all([
          import('@boxtal/parcel-point-map'),
          fetch('/api/boxtal-map-token'),
        ])
        const tok = await tokRes.json().catch(() => null)
        if (!tokRes.ok || !tok?.accessToken) throw new Error('token carte indisponible')
        if (cancelled) return
        mapRef.current = new BoxtalParcelPointMap({
          domToLoadMap: '#boxtal-parcel-map',
          accessToken: tok.accessToken,
          config: {
            locale: 'fr',
            parcelPointNetworks: [{ code: 'CHRP_NETWORK' }],
            options: { autoSelectNearestParcelPoint: false, primaryColor: '#265335' },
          },
          onMapLoaded: () => {
            if (cancelled) return
            mapLoadedRef.current = true
            setMapReady(true)
          },
        })
      } catch {
        if (!cancelled) setMapFailed(true)
      }
    })()
    return () => {
      cancelled = true
      clearTimeout(timeout)
      mapRef.current = null
    }
  }, [active, currentMode.relay])

  function resetRelay() {
    setRelayZip('')
    setRelayPoints(null)
    setRelayError(null)
    setSelectedRelay(null)
    setError(null)
    lastSearch.current = ''
  }

  function selectZone(id: string) {
    const zone = SHIPPING_ZONES.find((z) => z.id === id) ?? SHIPPING_ZONES[0]
    setZoneId(zone.id)
    setModeId(zone.modes[0].id)
    setRelayCountry(zone.relayCountries?.[0]?.code ?? 'FR')
    resetRelay()
    trackShop('choix-livraison', { zone: zone.id, mode: zone.modes[0].id })
  }

  function selectMode(id: 'relais' | 'domicile') {
    setModeId(id)
    resetRelay()
    trackShop('choix-livraison', { zone: zoneId, mode: id })
  }

  function chooseRelay(point: RelayPointLite) {
    setSelectedRelay(point)
    setError(null)
    trackShop('point-relais-choisi', { pays: point.country })
  }

  async function searchRelays() {
    setRelaySearching(true)
    setRelayError(null)
    setRelayPoints(null)
    setSelectedRelay(null)
    try {
      const params = new URLSearchParams({ zone: zoneId, country: relayCountry, zip: relayZip.trim() })
      const res = await fetch(`/api/relay-points?${params}`)
      const data = await res.json().catch(() => null)
      if (!res.ok || !Array.isArray(data?.points)) {
        throw new Error(data?.error || 'Recherche indisponible. Réessaye dans quelques instants.')
      }
      if (data.points.length === 0) {
        setRelayError('Aucun point relais trouvé autour de ce code postal.')
      } else {
        setRelayPoints(data.points)
      }
    } catch (err) {
      setRelayError(err instanceof Error ? err.message : 'Recherche indisponible. Réessaye.')
    } finally {
      setRelaySearching(false)
    }
  }

  // Recherche pilotée par le code postal : via la carte si dispo, sinon la liste.
  async function onRelaySearch() {
    const zip = relayZip.trim()
    // Carte pas encore prête : l'effet de recherche auto relancera dès qu'elle l'est.
    if (zip.length < 4 || (!mapReady && !mapFailed)) return
    lastSearch.current = `${relayCountry}-${zip}`
    setError(null)
    if (mapRef.current && !mapFailed) {
      setRelayError(null)
      // La carte hébergée géocode l'adresse pour se centrer → il lui faut une ville.
      // On la résout depuis le code postal via l'API publique gouv (sans clé).
      let city = ''
      try {
        const r = await fetch(
          `https://geo.api.gouv.fr/communes?codePostal=${encodeURIComponent(zip)}&fields=nom&format=json`,
        )
        const communes = await r.json()
        city = Array.isArray(communes) && communes[0]?.nom ? String(communes[0].nom) : ''
      } catch {
        /* on tente quand même sans ville */
      }
      mapRef.current.searchParcelPoints({ country: relayCountry, zipCode: zip, city }, (pp) =>
        chooseRelay({
          id: pp.code,
          name: pp.name,
          address: pp.location.street ?? '',
          zip: pp.location.zipCode,
          city: pp.location.city,
          country: pp.location.country,
          distanceMeters: null,
        }),
      )
    } else {
      searchRelays()
    }
  }

  // La recherche part toute seule dès que le code postal est complet (5 chiffres
  // en France, 4 en Belgique/Luxembourg) et que la carte — ou son fallback — est prête.
  useEffect(() => {
    if (!currentMode.relay) return
    const zip = relayZip.trim()
    const complete = relayCountry === 'FR' ? /^\d{5}$/.test(zip) : /^\d{4}$/.test(zip)
    if (!complete || (!mapReady && !mapFailed)) return
    if (lastSearch.current === `${relayCountry}-${zip}`) return
    void onRelaySearch()
    // onRelaySearch lit l'état courant de ce rendu : pas de dépendance à ajouter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relayZip, relayCountry, mapReady, mapFailed, currentMode.relay])

  async function handleCheckout() {
    // Sur mobile, le clic d'ouverture du panneau a déjà été compté.
    if (!inSheet) trackShop('clic-precommande', { emplacement: 'fiche' })
    if (currentMode.relay && !selectedRelay) {
      trackShop('erreur-paiement', { raison: 'relais-manquant' })
      setError('Choisis ton point relais Chronopost avant de continuer.')
      zipInputRef.current?.focus()
      return
    }
    setLoading(true)
    setError(null)
    // Raison remontée à Umami si le départ au paiement échoue.
    let failure = 'reseau'
    try {
      // Meta Pixel — InitiateCheckout : départ vers le paiement Stripe.
      // No-op sans consentement. Le même event_id est transmis au serveur
      // (metaEventId) pour que la CAPI dédoublonne l'event serveur.
      const checkoutEventId = newEventId()
      trackShopEvent(
        'InitiateCheckout',
        {
          ...SHOP_CONTENT,
          num_items: 1,
          ...(unitPrice !== null ? { value: unitPrice, currency: 'EUR' } : {}),
        },
        checkoutEventId,
      )

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zone: zoneId,
          mode: currentMode.id,
          // Quantité ajustable sur la page de paiement Stripe.
          quantity: 1,
          creator: attribution.creator,
          utm: attribution.utm,
          fbclid: attribution.fbclid,
          offer: offer?.slug,
          relay: selectedRelay
            ? {
                id: selectedRelay.id,
                name: selectedRelay.name,
                zip: selectedRelay.zip,
                city: selectedRelay.city,
                country: selectedRelay.country,
              }
            : undefined,
          // Meta CAPI : dédup InitiateCheckout serveur (même event_id) et gating
          // consentement pour le Purchase serveur (via metadata Stripe).
          metaEventId: checkoutEventId,
          marketingConsent: hasMarketingConsent(),
        }),
      })
      const data = await res.json().catch(() => null)
      failure = data?.offerUnavailable ? 'offre-indisponible' : `serveur-${res.status}`
      if (data?.offerUnavailable) {
        // Places épuisées / offre terminée : on retire l'offre (le clic suivant
        // part au tarif normal) et on affiche l'explication du serveur.
        onOfferUnavailable()
      }
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Une erreur est survenue. Réessaye dans quelques instants.')
      }
      await trackShopBeforeLeaving('depart-paiement', { zone: zoneId, mode: currentMode.id })
      window.location.href = data.url // redirection vers le checkout hébergé Stripe
    } catch (err) {
      trackShop('erreur-paiement', { raison: failure })
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Réessaye.')
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ── Livraison : résumé (France + relais par défaut) ou options dépliées ── */}
      <p className="text-sm font-bold uppercase mb-3" style={labelStyle}>
        Livraison
      </p>
      {!optionsOpen ? (
        <div className="mb-6">
          <div
            className="flex items-baseline justify-between gap-3 p-3.5 rounded-xl"
            style={{ border: '2px solid var(--color-secondary-orange)', backgroundColor: 'var(--color-secondary-beige-light)' }}
          >
            <span>
              <span className="block text-sm font-bold uppercase" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                {currentZone.label}
              </span>
              <span className="block text-xs mt-0.5" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.8 }}>
                {currentMode.label}
              </span>
            </span>
            {currentMode.shippingTtc !== null && (
              <span className="flex-none text-sm font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                {formatShipping(currentMode.shippingTtc)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOptionsOpen(true)}
            className="mt-2 text-xs font-bold underline underline-offset-2 hover:opacity-70"
            style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
          >
            Modifier la livraison
          </button>
        </div>
      ) : (
        <>
          <fieldset className="mb-5">
            <legend className="sr-only">Zone de livraison</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHIPPING_ZONES.map((z) => (
                <label
                  key={z.id}
                  className="flex items-start gap-3 p-3.5 cursor-pointer transition-colors rounded-xl"
                  style={{
                    border: `2px solid ${zoneId === z.id ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)'}`,
                    backgroundColor: zoneId === z.id ? 'var(--color-secondary-beige-light)' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="zone"
                    value={z.id}
                    checked={zoneId === z.id}
                    onChange={() => selectZone(z.id)}
                    className="mt-1"
                    style={{ accentColor: 'var(--color-secondary-orange)' }}
                  />
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold uppercase" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                        {z.label}
                      </span>
                      {cheapestShipping(z) !== null && (
                        <span className="flex-none text-sm font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                          {z.modes.length > 1 && (cheapestShipping(z) as number) > 0 ? 'dès ' : ''}
                          {formatShipping(cheapestShipping(z) as number)}
                        </span>
                      )}
                    </span>
                    {z.note && (
                      <span className="block text-xs mt-1" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
                        {z.note}
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Mode de livraison (si la zone en propose plusieurs — France : relais ou domicile) */}
          {currentZone.modes.length > 1 && (
            <fieldset className="mb-6">
              <legend className="text-sm font-bold uppercase mb-3" style={labelStyle}>
                Comment veux-tu être livré·e ?
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentZone.modes.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center gap-3 p-3.5 cursor-pointer transition-colors rounded-xl"
                    style={{
                      border: `2px solid ${currentMode.id === m.id ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)'}`,
                      backgroundColor: currentMode.id === m.id ? 'var(--color-secondary-beige-light)' : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={m.id}
                      checked={currentMode.id === m.id}
                      onChange={() => selectMode(m.id)}
                      style={{ accentColor: 'var(--color-secondary-orange)' }}
                    />
                    <span className="flex-1 flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold uppercase" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                        {m.label}
                      </span>
                      {m.shippingTtc !== null && (
                        <span className="flex-none text-sm font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                          {formatShipping(m.shippingTtc)}
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </>
      )}

      {/* ── Point relais Chronopost Shop2Shop (modes « relais ») ── */}
      {currentMode.relay && (
        <div className="mb-6">
          <label htmlFor="relay-zip" className="block text-sm font-bold uppercase mb-3" style={labelStyle}>
            Ton point relais Chronopost
          </label>

          <div className="flex flex-wrap items-stretch gap-2">
            {(currentZone.relayCountries ?? []).length > 1 && (
              <div className="flex rounded-lg overflow-hidden" style={{ border: '2px solid var(--color-primary-green)' }}>
                {(currentZone.relayCountries ?? []).map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setRelayCountry(c.code)
                      setRelayPoints(null)
                      setSelectedRelay(null)
                      setRelayError(null)
                      lastSearch.current = ''
                    }}
                    className="px-3 text-xs font-bold uppercase"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      backgroundColor: relayCountry === c.code ? 'var(--color-primary-green)' : 'transparent',
                      color: relayCountry === c.code ? 'var(--color-primary-beige)' : 'var(--color-primary-green)',
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            <input
              id="relay-zip"
              ref={zipInputRef}
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={relayZip}
              onChange={(e) => setRelayZip(e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onRelaySearch()
                }
              }}
              placeholder={relayCountry === 'FR' ? 'Ton code postal (ex. 64100)' : 'Ton code postal'}
              className="flex-1 min-w-[140px] px-3 py-3 text-base bg-transparent outline-none rounded-lg"
              style={{
                fontFamily: 'var(--font-roboto)',
                color: 'var(--color-primary-green)',
                border: '2px solid var(--color-primary-green)',
              }}
            />
          </div>

          {(relaySearching || (!mapReady && !mapFailed)) && (
            <p className="mt-2 text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
              {relaySearching ? 'Recherche des points relais…' : 'Chargement de la carte…'}
            </p>
          )}

          {/* Carte interactive (choix visuel) ; masquée si fallback manuel */}
          {!mapFailed && (
            <div
              id="boxtal-parcel-map"
              className="mt-3 rounded-lg overflow-hidden"
              style={{ height: 300, border: '2px solid var(--color-primary-green)' }}
            />
          )}

          {relayError && (
            <p className="mt-3 text-sm font-bold" style={{ fontFamily: 'var(--font-roboto)', color: '#8C2B1E' }}>
              {relayError}
            </p>
          )}

          {mapFailed && relayPoints && (
            <div className="mt-3 max-h-64 overflow-y-auto space-y-2 pr-1">
              {relayPoints.map((p) => (
                <label
                  key={p.id}
                  className="flex items-start gap-3 p-3 cursor-pointer transition-colors rounded-lg"
                  style={{
                    border: `2px solid ${selectedRelay?.id === p.id ? 'var(--color-secondary-orange)' : 'rgba(38,83,53,0.35)'}`,
                    backgroundColor: selectedRelay?.id === p.id ? 'var(--color-secondary-beige-light)' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="relay"
                    checked={selectedRelay?.id === p.id}
                    onChange={() => chooseRelay(p)}
                    className="mt-1"
                    style={{ accentColor: 'var(--color-secondary-orange)' }}
                  />
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                        {p.name}
                      </span>
                      {p.distanceMeters !== null && (
                        <span className="flex-none text-xs font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}>
                          {p.distanceMeters < 1000 ? `${p.distanceMeters} m` : `${(p.distanceMeters / 1000).toFixed(1)} km`}
                        </span>
                      )}
                    </span>
                    <span className="block text-xs mt-0.5" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                      {p.address && `${p.address}, `}
                      {p.zip} {p.city}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          )}

          {selectedRelay && (
            <div
              className="mt-3 p-3 rounded-lg"
              style={{ border: '2px solid var(--color-secondary-orange)', backgroundColor: 'var(--color-secondary-beige-light)' }}
            >
              <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                ✓ {selectedRelay.name}
              </span>
              <span className="block text-xs mt-0.5" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                {selectedRelay.address && `${selectedRelay.address}, `}
                {selectedRelay.zip} {selectedRelay.city}
              </span>
            </div>
          )}

          <p className="mt-3 text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.65, lineHeight: 1.5 }}>
            Au paiement, seule ton adresse de facturation te sera demandée : le point relais choisi
            apparaîtra comme adresse de livraison sur ta facture.
          </p>
        </div>
      )}

      {/* ── Paiement ── */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="btn-secondary w-full mb-4 disabled:opacity-60 disabled:cursor-wait"
      >
        {loading
          ? 'Redirection vers le paiement…'
          : `Passer au paiement${total !== null ? ` — ${formatPrice(total)}` : ''} →`}
      </button>

      {error && (
        <p
          role="alert"
          className="mb-4 px-4 py-3 text-sm font-bold rounded-lg"
          style={{ fontFamily: 'var(--font-roboto)', color: '#8C2B1E', backgroundColor: '#FDE8E2', border: '2px solid #8C2B1E' }}
        >
          {error}
        </p>
      )}

      <div className="mt-2 mb-5">
        <Reassurance />
      </div>

      <p className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7, lineHeight: 1.6 }}>
        {offer ? '' : 'Quantité modifiable sur la page de paiement. '}
        Facture envoyée par email. En précommandant, tu acceptes nos{' '}
        <Link href="/cgv" target="_blank" className="underline underline-offset-2 font-bold hover:opacity-70 transition-opacity">
          Conditions Générales de Vente
        </Link>
        .
      </p>
    </div>
  )
}
