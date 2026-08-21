'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import PhoneShot from '@/components/PhoneShot'
import { Reveal, TitleReveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import PressFeature from '@/components/PressFeature'
import CountdownTimer from '@/components/CountdownTimer'
import { DERNIER_ARTICLE } from '@/lib/press'
import { PREORDER_PACK, SHIPPING_ZONES, PREORDER_END_DATE, PREORDER_END_LABEL, cheapestShipping } from '@/lib/preorder'
import { CREATOR_STORAGE_KEY, detectCreator } from '@/lib/creator'

/**
 * Boutique pré-commande V2 — vraie page e-commerce (galerie + panneau d'achat
 * sticky + sélecteur de zone + quantité → checkout Stripe hébergé).
 * Montée sur /boutique2 (noindex) le temps du chantier ; remplacera /boutique
 * après le GO de Julien.
 *
 * TODO(Julien) : packshots provisoires (réutilisés des autres pages) — à
 * remplacer par les vrais visuels boutique. FAQ et copy à valider.
 */

// Galerie produit — la 1re image est l'image principale par défaut.
const GALLERY = [
  { src: '/téléchargement (1).png', alt: 'Bracelet Polar 360 We Are Climbers — vue produit' },
  { src: '/images/rejoins-nous/bracelet-polar360.webp', alt: "Le bracelet Polar 360 porté à l'avant-bras" },
  { src: '/hero-capteurs.webp', alt: 'Le bracelet Polar 360 en situation de grimpe' },
]

const METRIC_CHIPS = ['±1 BPM', '29 g', '10 jours d’autonomie']

// Ordre validé par Julien le 14/08 : transparence totale sur la mécanique de
// pré-commande (commande groupée à Polar après clôture, expédition par nos soins).
const STEPS: { title: string; text: string }[] = [
  {
    title: 'Tu précommandes',
    text: 'Paiement sécurisé par Stripe. Tu reçois immédiatement un email de confirmation avec ta facture.',
  },
  {
    title: 'On commande les bracelets',
    text: `À la clôture des pré-commandes, le ${PREORDER_END_LABEL}, on passe commande de tous les bracelets auprès de Polar.`,
  },
  {
    title: 'On expédie nous-mêmes',
    text: 'Dès réception des bracelets, on prépare et expédie chaque colis nous-mêmes — avec un email à chaque étape, jusqu’à la remise de ton colis.',
  },
  {
    title: 'Tu grimpes',
    text: 'Tu connectes ton bracelet à l’app WAC en quelques minutes grâce au guide de démarrage inclus.',
  },
]

// TODO(Julien) : FAQ à valider (notamment la politique d'annulation avant expédition).
const FAQ: { q: string; a: string }[] = [
  {
    q: 'Quand est-ce que je serai livré·e ?',
    a: 'La fenêtre de livraison est affichée sur cette page avant ton achat, et rappelée dans ton email de confirmation. On te tient au courant de chaque étape par email.',
  },
  {
    q: "J'ai un code de la liste d'attente, où l'utiliser ?",
    a: 'Au moment du paiement : un champ « Code promotionnel » est disponible sur la page de paiement sécurisée. Ton tarif préférentiel s’applique immédiatement.',
  },
  {
    q: 'Le paiement est-il sécurisé ?',
    a: 'Oui — le paiement est opéré par Stripe, leader mondial du paiement en ligne. Aucune donnée bancaire ne transite par nos serveurs. Ta facture t’est envoyée automatiquement par email.',
  },
  {
    q: 'Et si je change d’avis ?',
    a: 'Tu disposes du droit de rétractation légal de 14 jours après réception de ta commande, pour un remboursement intégral. Écris-nous simplement, on s’occupe de tout.',
  },
]

// ── Sections « découverte produit » (inspirées de la fiche Polar Loop :
// specs par catégories sur la fiche, « ce qui est inclus », app compagnon,
// piliers de confiance). Données RÉELLES reprises de /le-bracelet et /l-app. ──

/** Résumé des specs — extraits de la section #specs de /le-bracelet (source de vérité). */
const SPECS_RESUME: { title: string; items: string[] }[] = [
  {
    title: 'Capteurs',
    items: [
      'Cardio optique 9 LED (Precision Prime™), ±1 BPM',
      'Échantillonnage 50 Hz — 180 000 données par heure',
      'Accéléromètre 3 axes, gyroscope, température cutanée',
    ],
  },
  {
    title: 'Autonomie & charge',
    items: [
      'Jusqu’à 10 jours en usage quotidien',
      '40 heures en enregistrement continu',
      'Recharge USB-C — 2 h pour une charge complète',
    ],
  },
  {
    title: 'Connectivité',
    items: [
      'Bluetooth 5.0, synchronisation automatique avec l’app',
      'Mode offline intelligent (enregistre sans connexion)',
      'Mémoire interne : 200 heures de sessions',
    ],
  },
  {
    title: 'Physique & compatibilité',
    items: [
      '29 g, sans écran, porté à l’avant-bras',
      'Résistant à l’eau, aux chocs et à la magnésie',
      'iOS 15.1+ · Android 13+ · Garantie Polar 2 ans',
    ],
  },
]

// TODO(Julien) : contenu exact de la boîte à valider avant mise en ligne.
const INCLUS: { title: string; text: string }[] = [
  { title: 'Le bracelet Polar 360', text: 'Édition We Are Climbers, prêt à grimper.' },
  { title: 'Son câble de charge USB-C', text: '2 h de charge pour 10 jours d’autonomie.' },
  { title: 'Ton guide de démarrage', text: 'Connexion à l’app WAC en quelques minutes.' },
]

/** Les 6 signaux de l'État de Forme — mêmes intitulés que /l-app. */
const PILIERS_APP = [
  'Récupération temporelle',
  'Récupération cardiaque',
  'Charge récente',
  'Système nerveux',
  'Ressenti',
  'Phase du cycle',
]

/** Piliers de confiance — uniquement des faits déjà publiés sur le site. */
const CONFIANCE: { big: string; small: string }[] = [
  { big: '±1 BPM', small: 'précision validée sur le terrain' },
  { big: '102', small: 'grimpeurs déjà équipés' },
  { big: '9', small: 'coachs embarqués' },
  { big: '2 ans', small: 'garantie constructeur Polar' },
  { big: 'FFME NA', small: 'Équipementier Officiel' },
]

function formatPrice(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)
}

/** Point relais tel que renvoyé par /api/relay-points (miroir de lib/mondialrelay). */
interface RelayPointLite {
  id: string
  name: string
  address: string
  zip: string
  city: string
  country: string
  distanceMeters: number | null
}

export default function ShopLanding() {
  const [mainImage, setMainImage] = useState(0)
  const [zoneId, setZoneId] = useState(SHIPPING_ZONES[0].id)
  const [modeId, setModeId] = useState(SHIPPING_ZONES[0].modes[0].id)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sélection du point relais Mondial Relay (modes « relais »)
  const [relayCountry, setRelayCountry] = useState('FR')
  const [relayZip, setRelayZip] = useState('')
  const [relayPoints, setRelayPoints] = useState<RelayPointLite[] | null>(null)
  const [relaySearching, setRelaySearching] = useState(false)
  const [relayError, setRelayError] = useState<string | null>(null)
  const [selectedRelay, setSelectedRelay] = useState<RelayPointLite | null>(null)

  // Attribution créateur UGC capturée à l'atterrissage (UtmCapture → sessionStorage),
  // relue au montage : affiche la contrepartie premium et voyage vers les metadata
  // Stripe au checkout. sessionStorage indisponible → paiement normal sans créateur.
  const [attribution, setAttribution] = useState<{ creator: string; utm: Record<string, string> }>({
    creator: '',
    utm: {},
  })
  const creatorDetected = detectCreator(attribution.creator, attribution.utm)

  useEffect(() => {
    try {
      const rawUtm = JSON.parse(sessionStorage.getItem('wac_utm') ?? '{}')
      setAttribution({
        creator: sessionStorage.getItem(CREATOR_STORAGE_KEY) ?? '',
        utm: typeof rawUtm === 'object' && rawUtm !== null ? rawUtm : {},
      })
    } catch {
      /* capture illisible : paiement sans attribution */
    }
  }, [])

  const currentZone = SHIPPING_ZONES.find((z) => z.id === zoneId) ?? SHIPPING_ZONES[0]
  const currentMode = currentZone.modes.find((m) => m.id === modeId) ?? currentZone.modes[0]

  function resetRelay() {
    setRelayZip('')
    setRelayPoints(null)
    setRelayError(null)
    setSelectedRelay(null)
    setError(null)
  }

  function selectZone(id: string) {
    const zone = SHIPPING_ZONES.find((z) => z.id === id) ?? SHIPPING_ZONES[0]
    setZoneId(zone.id)
    setModeId(zone.modes[0].id)
    setRelayCountry(zone.relayCountries?.[0]?.code ?? 'FR')
    resetRelay()
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

  async function handleCheckout() {
    if (currentMode.relay && !selectedRelay) {
      setError('Choisis ton point relais Mondial Relay avant de continuer.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zone: zoneId,
          mode: currentMode.id,
          quantity,
          creator: attribution.creator,
          utm: attribution.utm,
          relay: selectedRelay
            ? {
                id: selectedRelay.id,
                name: selectedRelay.name,
                zip: selectedRelay.zip,
                city: selectedRelay.city,
                country: selectedRelay.country,
              }
            : undefined,
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'Une erreur est survenue. Réessaye dans quelques instants.')
      }
      window.location.href = data.url // redirection vers le checkout hébergé Stripe
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Réessaye.')
      setLoading(false)
    }
  }

  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── TITRE + COMPTE À REBOURS ───────────── */}
      <section className="relative overflow-hidden pt-36 pb-10 md:pt-44 md:pb-14">
        <TopoLines opacity={0.06} drift={false} color="var(--color-primary-green)" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <TitleReveal
              lines={['Les pré-commandes', 'sont ouvertes.']}
              as="h1"
              className="text-4xl md:text-6xl lg:text-7xl mb-8"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)',
                lineHeight: '1.08',
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.25 }}
            >
              <div style={{ color: 'var(--color-primary-green)' }}>
                <CountdownTimer
                  endDate={PREORDER_END_DATE}
                  endedLabel="Les pré-commandes sont terminées."
                />
              </div>
              <p
                className="text-xs md:text-sm mt-3 font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-syne)',
                  color: 'var(--color-secondary-orange)',
                  letterSpacing: '0.15em',
                }}
              >
                Fin des pré-commandes le {PREORDER_END_LABEL}
              </p>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl mt-8 max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.35 }}
            >
              Après le succès de notre{' '}
              <a
                href="https://fr.ulule.com/we-are-climbers/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-secondary-orange)' }}
              >
                campagne sur Ulule
              </a>
              , on a décidé de lancer une nouvelle campagne de pré-commandes directement sur notre
              site internet.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Cible des liens de campagne déjà diffusés vers /boutique#liste-attente :
          une fois cette page en prod, ils doivent atterrir sur la commande
          (la prévente remplace la liste d'attente). Ne pas supprimer cet id. */}
      <span id="liste-attente" aria-hidden className="block scroll-mt-32" />

      {/* ───────────── FICHE PRODUIT ───────────── */}
      <section id="commande" className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Galerie */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <div
                className="relative flex items-center justify-center p-8 md:p-12 rounded-[20px] overflow-hidden"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)', border: '2px solid var(--color-primary-green)' }}
              >
                <Image
                  key={GALLERY[mainImage].src}
                  src={GALLERY[mainImage].src}
                  alt={GALLERY[mainImage].alt}
                  width={640}
                  height={640}
                  priority
                  className="object-contain w-full aspect-square"
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {GALLERY.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setMainImage(i)}
                    aria-label={`Voir la photo ${i + 1}`}
                    className="relative p-2 transition-opacity rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-secondary-beige-light)',
                      border: `2px solid ${i === mainImage ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)'}`,
                      opacity: i === mainImage ? 1 : 0.65,
                    }}
                  >
                    <Image src={img.src} alt="" width={160} height={160} className="object-contain w-full aspect-square" />
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {METRIC_CHIPS.map((chip, i) => (
                  <span
                    key={chip}
                    className="px-4 py-2 text-sm font-bold uppercase"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      backgroundColor: i === 0 ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)',
                      color: 'var(--color-primary-beige)',
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Panneau d'achat */}
            <motion.div
              className="lg:sticky lg:top-28"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
            >
              <p
                className="text-sm md:text-base mb-4 font-bold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
              >
                Pré-commande
              </p>

              <TitleReveal
                lines={['Bracelet Polar 360', '+ App WAC.']}
                as="h2"
                className="text-3xl md:text-4xl lg:text-5xl mb-5"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.08',
                }}
              />

              {/* Prix */}
              {PREORDER_PACK.priceTtc !== null ? (
                <p className="mb-2">
                  <span
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    {formatPrice(PREORDER_PACK.priceTtc)}
                  </span>
                  <span className="ml-2 text-sm font-bold uppercase" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
                    TTC
                  </span>
                </p>
              ) : (
                <p
                  className="mb-2 inline-block px-4 py-2 text-sm font-bold uppercase rounded-lg"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    color: 'var(--color-primary-green)',
                    border: '2px dashed var(--color-primary-green)',
                    opacity: 0.7,
                  }}
                >
                  Prix de lancement — annoncé à l&apos;ouverture
                </p>
              )}
              <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                Frais de livraison calculés selon ta zone, affichés avant paiement.
                {' '}
                {PREORDER_PACK.deliveryWindow
                  ? `Expédition estimée : ${PREORDER_PACK.deliveryWindow}.`
                  : 'Fenêtre de livraison annoncée à l’ouverture des pré-commandes.'}
              </p>

              {/* Contenu du pack */}
              <ul className="mb-7 space-y-2.5">
                {PREORDER_PACK.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                    <span
                      className="mt-0.5 flex-none w-5 h-5 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
                    >
                      ✓
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              {/* Zone de livraison */}
              <fieldset className="mb-6">
                <legend
                  className="text-sm font-bold uppercase mb-3"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', letterSpacing: '0.1em' }}
                >
                  Où doit-on te livrer ?
                </legend>
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
                          <span
                            className="text-sm font-bold uppercase"
                            style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                          >
                            {z.label}
                          </span>
                          {cheapestShipping(z) !== null && (
                            <span
                              className="flex-none text-sm font-bold"
                              style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                            >
                              {z.modes.length > 1 ? 'dès ' : ''}
                              {formatPrice(cheapestShipping(z) as number)}
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
                  <legend
                    className="text-sm font-bold uppercase mb-3"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', letterSpacing: '0.1em' }}
                  >
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
                          onChange={() => {
                            setModeId(m.id)
                            resetRelay()
                          }}
                          style={{ accentColor: 'var(--color-secondary-orange)' }}
                        />
                        <span className="flex-1 flex items-baseline justify-between gap-2">
                          <span
                            className="text-sm font-bold uppercase"
                            style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                          >
                            {m.label}
                          </span>
                          {m.shippingTtc !== null && (
                            <span
                              className="flex-none text-sm font-bold"
                              style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                            >
                              {formatPrice(m.shippingTtc)}
                            </span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Point relais Mondial Relay (modes « relais ») */}
              {currentMode.relay && (
                <div className="mb-6">
                  <p
                    className="text-sm font-bold uppercase mb-3"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', letterSpacing: '0.1em' }}
                  >
                    Ton point relais Mondial Relay
                  </p>

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
                      type="text"
                      inputMode="numeric"
                      value={relayZip}
                      onChange={(e) => setRelayZip(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          searchRelays()
                        }
                      }}
                      placeholder={relayCountry === 'FR' ? 'Code postal (ex. 64100)' : 'Code postal'}
                      aria-label="Code postal pour la recherche de point relais"
                      className="flex-1 min-w-[140px] px-3 py-2.5 text-sm bg-transparent outline-none rounded-lg"
                      style={{
                        fontFamily: 'var(--font-roboto)',
                        color: 'var(--color-primary-green)',
                        border: '2px solid var(--color-primary-green)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={searchRelays}
                      disabled={relaySearching || relayZip.trim().length < 4}
                      className="px-4 py-2.5 text-sm font-bold uppercase disabled:opacity-40 transition-opacity rounded-lg"
                      style={{
                        fontFamily: 'var(--font-syne)',
                        backgroundColor: 'var(--color-primary-green)',
                        color: 'var(--color-primary-beige)',
                      }}
                    >
                      {relaySearching ? 'Recherche…' : 'Chercher'}
                    </button>
                  </div>

                  {relayError && (
                    <p className="mt-3 text-sm font-bold" style={{ fontFamily: 'var(--font-roboto)', color: '#8C2B1E' }}>
                      {relayError}
                    </p>
                  )}

                  {relayPoints && (
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
                            onChange={() => {
                              setSelectedRelay(p)
                              setError(null)
                            }}
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

                  <p className="mt-3 text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.65, lineHeight: 1.5 }}>
                    Ton colis sera livré dans le point relais choisi — c&apos;est lui qui apparaîtra
                    comme adresse de livraison sur ta facture. Au paiement, seule ton adresse de
                    facturation te sera demandée.
                  </p>
                </div>
              )}

              {creatorDetected && (
                <p
                  className="mb-4 px-4 py-3 text-sm font-bold rounded-lg"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-beige)',
                    backgroundColor: 'var(--color-secondary-orange)',
                  }}
                >
                  3 mois d&apos;abonnement premium offerts
                </p>
              )}

              {/* Quantité + CTA */}
              <div className="flex items-stretch gap-4 mb-4">
                <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '2px solid var(--color-primary-green)' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Réduire la quantité"
                    className="w-11 self-stretch text-xl font-bold disabled:opacity-30"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    −
                  </button>
                  <span
                    className="w-10 text-center text-lg font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(PREORDER_PACK.maxQuantity, q + 1))}
                    disabled={quantity >= PREORDER_PACK.maxQuantity}
                    aria-label="Augmenter la quantité"
                    className="w-11 self-stretch text-xl font-bold disabled:opacity-30"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    +
                  </button>
                </div>

                <Magnetic className="flex-1">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading}
                    className="btn-secondary w-full disabled:opacity-60 disabled:cursor-wait"
                  >
                    {loading ? 'Redirection vers le paiement…' : 'Je précommande →'}
                  </button>
                </Magnetic>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mb-4 px-4 py-3 text-sm font-bold rounded-lg"
                  style={{ fontFamily: 'var(--font-roboto)', color: '#8C2B1E', backgroundColor: '#FDE8E2', border: '2px solid #8C2B1E' }}
                >
                  {error}
                </p>
              )}

              <p className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7, lineHeight: 1.6 }}>
                Paiement sécurisé Stripe · Facture envoyée par email · Rétractation 14 jours après réception ·
                Inscrit·e à la liste d&apos;attente ? Ton code s&apos;applique au moment du paiement.
              </p>

              <p className="text-xs mt-2" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7, lineHeight: 1.6 }}>
                En précommandant, tu acceptes nos{' '}
                <Link href="/cgv" target="_blank" className="underline underline-offset-2 font-bold hover:opacity-70 transition-opacity">
                  Conditions Générales de Vente
                </Link>
                .
              </p>

              {/* Découverte pour qui arrive directement ici (pattern fiche produit Polar) */}
              <p className="text-sm mt-4" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                Tu découvres We Are Climbers ?{' '}
                <Link href="/le-bracelet" className="font-bold underline underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-secondary-orange)' }}>
                  Tout sur le bracelet
                </Link>
                {' '}·{' '}
                <Link href="/l-app" className="font-bold underline underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-secondary-orange)' }}>
                  Tout sur l&apos;app
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── DANS TA PRÉ-COMMANDE ───────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-12 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}
            >
              Dans ta pré-commande.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Le bracelet Polar 360',
                text: 'Capteur cardio haute précision (±1 BPM), 29 g, 10 jours d’autonomie. Porté à l’avant-bras, sans écran : tu l’oublies pendant la grimpe.',
              },
              {
                title: 'L’app WAC',
                text: 'Ton État de Forme calculé sur 6 signaux physiologiques : récupération, charge, système nerveux, ressenti, phase du cycle. Chaque matin, tu sais où tu en es.',
              },
              {
                title: 'La suite, en priorité',
                text: 'Livraison prioritaire pour la liste d’attente, guide de démarrage inclus, et un email à chaque étape de ta commande jusqu’à la livraison.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <div className="card-dark p-8 h-full">
                  <h3
                    className="text-xl mb-4"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.85, lineHeight: 1.6 }}>
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SPECS SUR LA FICHE (pattern Polar) ───────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-4 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Sous le bracelet.
            </h2>
            <p
              className="text-center mb-12 max-w-2xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}
            >
              L&apos;essentiel des caractéristiques, directement ici — pour le détail complet,
              la page bracelet t&apos;attend.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {SPECS_RESUME.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.08}>
                <div
                  className="h-full p-6 rounded-[20px]"
                  style={{ backgroundColor: 'var(--color-primary-beige)', border: '1px solid rgba(38,83,53,0.12)' }}
                >
                  <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {group.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="flex-shrink-0 mt-2 w-1.5 h-1.5" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
                        <span className="text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.55 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Magnetic>
                <Link href="/le-bracelet#specs" className="btn-secondary inline-block">
                  Toutes les spécifications techniques →
                </Link>
              </Magnetic>
              <Link
                href="/le-bracelet"
                className="font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
              >
                Découvrir le bracelet en détail
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── CE QUI EST INCLUS (pattern Polar) ───────────── */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-2xl md:text-4xl mb-10 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Dans la boîte.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {INCLUS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="text-center px-4">
                  <span
                    className="inline-flex w-9 h-9 items-center justify-center font-bold mb-3"
                    style={{ fontFamily: 'var(--font-syne)', backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}
                  >
                    ✓
                  </span>
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.8, lineHeight: 1.6 }}>
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── L'APP QUI VA AVEC (pattern « Polar Flow ») ───────────── */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <PhoneShot
                src={['/videos/app/dashboard-1.mp4', '/videos/app/dashboard-2.mp4']}
                alt="Dashboards Performances & Santé de l'app WAC"
                width={260}
              />
            </div>

            <div className="order-1 lg:order-2">
              <Reveal>
                <p
                  className="text-sm md:text-base mb-4 font-bold uppercase tracking-[0.15em]"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                >
                  L&apos;app qui va avec
                </p>
                <h2
                  className="text-3xl md:text-5xl mb-6"
                  style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)', lineHeight: 1.1 }}
                >
                  Ton État de Forme, chaque matin.
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.9, lineHeight: 1.6 }}
                >
                  Le bracelet mesure, l&apos;app t&apos;explique. Chaque matin, ton État de Forme
                  est calculé à partir de six signaux physiologiques — tu sais si c&apos;est un jour
                  à envoyer, ou un jour à récupérer.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {PILIERS_APP.map((p) => (
                    <span
                      key={p}
                      className="px-3.5 py-2 text-xs font-bold uppercase"
                      style={{
                        fontFamily: 'var(--font-syne)',
                        color: 'var(--color-primary-beige)',
                        border: '1px solid rgba(245,236,229,0.35)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Magnetic>
                    <Link href="/l-app" className="btn-beige inline-block">
                      Découvrir l&apos;app en détail →
                    </Link>
                  </Magnetic>
                  <span
                    className="text-sm font-bold"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)', opacity: 0.85 }}
                  >
                    L&apos;app est gratuite au téléchargement.
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── COMMENT ÇA SE PASSE ───────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-12 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Comment ça se passe.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="h-full p-6 rounded-[20px]" style={{ border: '2px solid var(--color-primary-green)', backgroundColor: 'var(--color-primary-beige)' }}>
                  <span
                    className="inline-flex w-10 h-10 items-center justify-center text-lg font-bold mb-4"
                    style={{ fontFamily: 'var(--font-syne)', backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="text-lg mb-3"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}>
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CONFIANCE (pattern « Science & Fiabilité » Polar) ───────────── */}
      <section className="py-14" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {CONFIANCE.map((item, i) => (
              <Reveal key={item.big} delay={i * 0.06}>
                <div className="text-center">
                  <p
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                  >
                    {item.big}
                  </p>
                  <p
                    className="text-xs uppercase font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', letterSpacing: '0.08em', lineHeight: 1.5 }}
                  >
                    {item.small}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-12 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Les questions qu&apos;on nous pose.
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.08}>
                <details className="group rounded-[20px] overflow-hidden" style={{ border: '2px solid var(--color-primary-green)', backgroundColor: 'var(--color-secondary-beige-light)' }}>
                  <summary
                    className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold uppercase text-sm md:text-base"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    {item.q}
                    <span className="flex-none transition-transform group-open:rotate-45 text-xl" style={{ color: 'var(--color-secondary-orange)' }}>
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}>
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PRESSE + CTA FINAL ───────────── */}
      {DERNIER_ARTICLE && (
        <section className="py-12" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
          <div className="container-custom">
            <PressFeature article={DERNIER_ARTICLE} variant="compact" />
          </div>
        </section>
      )}

      <section className="py-20 text-center" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-8"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Prêt·e à grimper avec nous ?
            </h2>
            <Magnetic>
              <a href="#commande" className="btn-secondary inline-block">
                Je précommande →
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ── Barre d'achat mobile (pattern Polar : CTA toujours visible) ── */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
        style={{
          backgroundColor: 'var(--color-primary-beige)',
          borderTop: '2px solid var(--color-primary-green)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <div>
            {PREORDER_PACK.priceTtc !== null && (
              <p className="text-lg font-bold leading-tight" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                {formatPrice(PREORDER_PACK.priceTtc)} <span className="text-xs">TTC</span>
              </p>
            )}
            <p className="text-[11px]" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
              Fin des pré-commandes le {PREORDER_END_LABEL}
            </p>
          </div>
          <a href="#commande" className="btn-secondary text-sm whitespace-nowrap">
            Je précommande
          </a>
        </div>
      </div>
    </main>
  )
}
