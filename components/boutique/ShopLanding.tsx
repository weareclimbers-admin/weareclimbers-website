'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import PhoneShot from '@/components/PhoneShot'
import { Reveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import Magnetic from '@/components/Magnetic'
import PressFeature from '@/components/PressFeature'
import CountdownTimer from '@/components/CountdownTimer'
import OrderForm, { type Attribution } from '@/components/boutique/OrderForm'
import Reassurance from '@/components/boutique/Reassurance'
import { DERNIER_ARTICLE } from '@/lib/press'
import { PREORDER_PACK, FETES_SALE, formatPrice } from '@/lib/preorder'
import { APP_PROOF, STORE_REVIEWS } from '@/lib/proof'
import { detectCreator } from '@/lib/creator'
import { getPartnerOffer } from '@/lib/offers'
import { readAttribution, clearPartnerOffer } from '@/lib/attribution'
import { trackShopEvent, SHOP_CONTENT, newEventId } from '@/lib/meta-pixel'
import { trackShop } from '@/lib/umami'

/**
 * Boutique pré-commande V2 — fiche produit + formulaire de commande (OrderForm)
 * → checkout Stripe hébergé. EN LIGNE sur /boutique depuis le 01/10/2026.
 *
 * Refonte conversion (13/10/2026) : bénéfice d'abord, preuves sociales juste
 * sous le titre, et une commande accessible de partout — chaque bouton
 * « Je commande » ouvre le formulaire (panneau mobile / fiche sur ordinateur).
 *
 * TODO(Julien) : packshots provisoires — à remplacer par les vrais visuels boutique.
 */

// Galerie produit — la 1re image est l'image principale par défaut.
// (bracelet-polar360.webp et hero-capteurs.webp sont le MÊME fichier : un seul ici.)
const GALLERY = [
  { src: '/téléchargement (1).png', alt: 'Bracelet Polar 360 We Are Climbers — vue produit' },
  { src: '/hero-capteurs.webp', alt: 'Les capteurs optiques du bracelet Polar 360' },
]

/** Largeur « ordinateur » (lg) : le formulaire vit dans la fiche, pas dans le panneau mobile. */
const DESKTOP_QUERY = '(min-width: 1024px)'

const METRIC_CHIPS = ['±1 BPM (donnée Polar)', 'Sans écran', 'Porté à l’avant-bras']

// Ordre validé par Julien le 14/08 : transparence totale sur la mécanique de
// pré-commande (commande groupée à Polar après clôture, expédition par nos soins).
const STEPS: { title: string; text: string }[] = [
  {
    title: 'Tu commandes',
    text: 'Paiement sécurisé par Stripe. Tu reçois immédiatement un email de confirmation avec ta facture.',
  },
  {
    title: 'On commande les bracelets',
    text: `On passe commande auprès de Polar, notre fournisseur. Les ${FETES_SALE.flash.units} bracelets à ${FETES_SALE.flash.priceTtc} € arrivent avant Noël ; pour les suivants, on fait tout pour te livrer avant les fêtes.`,
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

// Gratuit / premium : périmètre et tarifs donnés par Julien le 13/10/2026.
const FAQ: { q: string; a: string }[] = [
  {
    q: 'Faut-il payer un abonnement ?',
    a: 'Non. Avec ton bracelet, l’app WAC gratuite te donne tout ce qu’il faut pour éviter la surcharge d’entraînement : ton État de Forme chaque matin, l’analyse de tes séances, tes graphiques de suivi, ta récupération nocturne et le suivi de ton cycle. Le premium (9,99 €/mois ou 99 €/an) est une option pour aller plus loin : séances de renforcement et mixtes grimpe + renfo, analyses avancées, analyses IA illimitées en fin de séance et connexion à un coach.',
  },
  {
    q: 'Quand est-ce que je serai livré·e ?',
    a: `Les ${FETES_SALE.flash.units} bracelets à ${FETES_SALE.flash.priceTtc} € sont livrés ${FETES_SALE.flash.delivery}, avant Noël. Au-delà, ${FETES_SALE.standard.delivery.charAt(0).toLowerCase()}${FETES_SALE.standard.delivery.slice(1, -1)} — au plus tard le ${FETES_SALE.standard.deliveryDeadline}. Pour la Suisse et l’Outre-mer, compte quelques jours de plus. On t’expédie ton bracelet nous-mêmes, avec un email à chaque étape.`,
  },
  {
    q: 'Puis-je payer en plusieurs fois ?',
    a: 'Oui. Sur la page de paiement sécurisée, choisis Klarna pour régler en plusieurs fois. Le nombre d’échéances et les conditions s’affichent directement chez Klarna, selon ton éligibilité.',
  },
  {
    q: 'Le paiement est-il sécurisé ?',
    a: 'Oui — le paiement est opéré par Stripe, leader mondial du paiement en ligne. Aucune donnée bancaire ne transite par nos serveurs. Ta facture t’est envoyée automatiquement par email.',
  },
  {
    q: 'Et si je change d’avis ?',
    a: 'Tant que ta commande n’est pas expédiée, tu peux l’annuler gratuitement sur simple email, et on te rembourse intégralement. Après réception, tu disposes encore du droit de rétractation légal de 14 jours. Écris-nous simplement, on s’occupe de tout.',
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
      'Cardio optique Precision Prime™ : ±1 BPM (donnée Polar)',
      'Accéléromètre : 50 Hz, soit 180 000 points de mesure par heure.',
      'Température cutanée',
    ],
  },
  {
    title: 'Autonomie & charge',
    items: [
      "Polar annonce jusqu’à 5 jours. Avec l’usage We Are Climbers, on recharge le nôtre environ tous les 10 jours. L’autonomie varie selon l’utilisation.",
      'Batterie Li-Po rechargeable de 148 mAh',
      'Recharge avec le câble fourni, sur un port ou un chargeur USB',
    ],
  },
  {
    title: 'Connectivité',
    items: [
      'Bluetooth Low Energy et ANT, synchronisation automatique avec l’app',
      'Mode hors connexion (enregistre sans téléphone)',
      'Mémoire interne : 16 Mo',
    ],
  },
  {
    title: 'Physique & compatibilité',
    items: [
      '17 g avec bracelet, 5 g pour le module seul (données Polar), sans écran',
      "On le porte à l’avant-bras. Notre R&D mesure actuellement ce placement face à une ceinture thoracique.",
      'Étanche à 30 mètres (WR30, selon Polar) · iOS 15.1+ · Android 13+ · Garantie légale 2 ans',
    ],
  },
]

// TODO(Julien) : contenu exact de la boîte à valider avant mise en ligne.
const INCLUS: { title: string; text: string }[] = [
  { title: 'Le bracelet Polar 360', text: 'Édition We Are Climbers, prêt à grimper.' },
  { title: 'Son câble de charge', text: 'Le câble Polar fourni, à brancher sur un port ou un chargeur USB.' },
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

export default function ShopLanding({
  climbersCount,
  flashStock,
}: {
  /** Grimpeurs équipés (lib/proof.ts) + précommandes payées depuis l'ouverture, calculé côté serveur. */
  climbersCount: number | null
  /** Bracelets restants à prix réduit (coupon Stripe, lib/flash-stock.ts) ; null si illisible. */
  flashStock: { left: number; total: number } | null
}) {
  const [mainImage, setMainImage] = useState(0)

  // Formulaire de commande : en ligne dans la fiche sur ordinateur, dans un
  // panneau qui monte du bas de l'écran sur mobile, ouvert par n'importe quel
  // bouton « Je commande ». Une seule instance d'OrderForm (une seule carte).
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetOpened, setSheetOpened] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Attribution capturée à l'atterrissage (UtmCapture → cookies 30 jours,
  // lib/attribution.ts), relue au montage : créateur UGC et offre partenaire
  // affichent la contrepartie (premium, tarif négocié) ; tout voyage vers
  // /api/checkout, qui revérifie. Cookies indisponibles → paiement normal.
  const [attribution, setAttribution] = useState<Attribution>({
    creator: '',
    utm: {},
    offer: '',
    fbclid: '',
  })
  const creatorDetected = detectCreator(attribution.creator)
  const offer = getPartnerOffer(attribution.offer)
  // Stock à prix réduit : chiffre serveur au chargement, passé à 0 si le
  // paiement répond « épuisé » (409). null = illisible → le prix réduit reste
  // proposé et le serveur tranche au clic.
  const [flashLeft, setFlashLeft] = useState<number | null>(flashStock ? flashStock.left : null)
  const flashActive = !offer && (flashLeft === null || flashLeft > 0)
  // Prix unitaire réellement payé (le serveur applique la remise du coupon).
  const unitPrice = offer ? offer.priceTtc : flashActive ? FETES_SALE.flash.priceTtc : PREORDER_PACK.priceTtc
  const ctaLabel = flashActive
    ? `Je prends le mien à ${formatPrice(FETES_SALE.flash.priceTtc)}`
    : `Je commande — ${formatPrice(unitPrice ?? 0)}`
  const deliveryShort = flashActive
    ? `livré avant Noël, ${FETES_SALE.flash.delivery}`
    : `au plus tard le ${FETES_SALE.standard.deliveryDeadline}, on fait tout pour avant les fêtes`

  useEffect(() => {
    try {
      setAttribution(readAttribution())
    } catch {
      /* capture illisible : paiement sans attribution */
    }
  }, [])

  // Meta Pixel (boutique) — ViewContent au montage : « a vu le bracelet »,
  // le socle du retargeting produit. No-op sans consentement marketing.
  // L'eventID prépare le dédoublonnage avec la Conversions API (phase 2).
  useEffect(() => {
    trackShopEvent(
      'ViewContent',
      {
        ...SHOP_CONTENT,
        ...(PREORDER_PACK.priceTtc !== null
          ? { value: PREORDER_PACK.priceTtc, currency: 'EUR' }
          : {}),
      },
      newEventId(),
    )
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const update = () => {
      setIsDesktop(mq.matches)
      // Repassé en largeur ordinateur : le formulaire est dans la fiche.
      if (mq.matches) setSheetOpen(false)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Panneau mobile ouvert : page figée derrière, Échap pour fermer.
  useEffect(() => {
    if (!sheetOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [sheetOpen])

  /** Tous les boutons « Je commande » : panneau sur mobile, formulaire de la fiche sur ordinateur. */
  function openOrder(emplacement: string) {
    trackShop('clic-precommande', { emplacement })
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      document.getElementById('achat')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setSheetOpen(true)
      setSheetOpened(true)
    }
  }

  /** Lien « Je commande » : ancre #achat sans JavaScript, panneau avec. */
  function preorderLinkProps(emplacement: string) {
    return {
      href: '#achat',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        openOrder(emplacement)
      },
    }
  }

  function onOfferUnavailable() {
    try {
      clearPartnerOffer()
    } catch {
      /* non bloquant */
    }
    setAttribution((a) => ({ ...a, offer: '' }))
  }

  // Bande de preuves — compteur automatique (Ulule + précommandes payées) et
  // chiffres vérifiés (lib/proof.ts). Sans Stripe : libellé sans chiffre exact.
  const proofs: { big: string; small: string }[] = [
    { big: climbersCount !== null ? String(climbersCount) : '100+', small: 'grimpeurs ont déjà choisi WAC' },
    { big: APP_PROOF.storeRating, small: 'note de l’app sur l’App Store et Google Play' },
    { big: APP_PROOF.activeUsers, small: 'grimpeurs actifs sur l’app' },
    { big: APP_PROOF.sessions, small: 'séances déjà enregistrées' },
    { big: 'FFME NA', small: 'Équipementier officiel' },
  ]

  return (
    <main style={{ backgroundColor: 'var(--color-primary-beige)' }}>
      {/* ───────────── TITRE : LE BÉNÉFICE D'ABORD ─────────────
          Rendu visible dès le HTML serveur (pas d'animation d'entrée au-dessus
          de la ligne de flottaison) : sur mobile, dans le navigateur Instagram,
          le haut de page ne doit jamais rester vide pendant le chargement. */}
      <section className="relative overflow-hidden pt-32 pb-8 md:pt-44 md:pb-12">
        <TopoLines opacity={0.06} drift={false} color="var(--color-primary-green)" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xs md:text-sm mb-5 font-bold uppercase"
              style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', letterSpacing: '0.12em', textWrap: 'balance' }}
            >
              <span style={{ color: 'var(--color-secondary-orange)' }}>Prévente des fêtes</span>
              {' '}· jusqu&apos;au {FETES_SALE.endLabel} 23&nbsp;h&nbsp;59 ·{' '}
              <span style={{ color: 'var(--color-secondary-orange)' }}>
                <CountdownTimer variant="compact" endDate={FETES_SALE.endDate} />
              </span>
            </p>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl mb-6"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--color-primary-green)',
                lineHeight: '1.08',
                textWrap: 'balance',
              }}
            >
              {flashActive ? (
                <>
                  {FETES_SALE.flash.units} bracelets à {FETES_SALE.flash.priceTtc}&nbsp;€.
                  <br />
                  Livrés avant Noël.
                </>
              ) : (
                <>Les {FETES_SALE.flash.units} bracelets à {FETES_SALE.flash.priceTtc}&nbsp;€ sont partis.</>
              )}
            </h1>

            {flashActive ? (
              <div className="max-w-xl mx-auto">
                {/* Jauge de stock — chiffre réel lu sur le coupon Stripe (lib/flash-stock.ts). */}
                {flashLeft !== null && (
                  <>
                    <p
                      className="text-lg md:text-xl font-bold mb-3"
                      style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                    >
                      Plus que <span style={{ color: 'var(--color-secondary-orange)' }}>{flashLeft}</span> sur{' '}
                      {FETES_SALE.flash.units} à {formatPrice(FETES_SALE.flash.priceTtc)} au lieu de{' '}
                      {formatPrice(PREORDER_PACK.priceTtc ?? 0)}
                    </p>
                    <div
                      className="h-3 rounded-full overflow-hidden mb-4"
                      style={{ backgroundColor: 'var(--color-secondary-beige-light)', border: '1px solid var(--color-primary-green)' }}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={FETES_SALE.flash.units}
                      aria-valuenow={flashLeft}
                      aria-label={`Bracelets restants à ${FETES_SALE.flash.priceTtc} €`}
                    >
                      <div
                        className="h-full"
                        style={{
                          width: `${(flashLeft / FETES_SALE.flash.units) * 100}%`,
                          backgroundColor: 'var(--color-secondary-orange)',
                        }}
                      />
                    </div>
                  </>
                )}
                <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}>
                  Au-delà des {FETES_SALE.flash.units}, la prévente reste ouverte jusqu&apos;au {FETES_SALE.endLabel}, sans
                  tarif réduit ({formatPrice(PREORDER_PACK.priceTtc ?? 0)}).
                </p>
              </div>
            ) : (
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto"
                style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6' }}
              >
                La prévente reste ouverte à {formatPrice(PREORDER_PACK.priceTtc ?? 0)} jusqu&apos;au{' '}
                {FETES_SALE.endLabel}. {FETES_SALE.standard.delivery}
              </p>
            )}

            <div className="mt-8 flex flex-col items-center gap-3">
              <a {...preorderLinkProps('haut-de-page')} className="btn-secondary inline-block">
                {ctaLabel}
              </a>
              <p className="text-sm" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.8 }}>
                Livraison offerte en France · {deliveryShort}
              </p>
            </div>

            <p
              className="mt-8 text-base max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.6', opacity: 0.85 }}
            >
              <strong>Projet ou récup&nbsp;? Ton corps te le dit.</strong> Le bracelet Polar 360 mesure ton corps à
              ±1&nbsp;BPM. Chaque matin, l&apos;app WAC en tire ton État de Forme : tu sais si c&apos;est un jour pour
              ton projet ou un jour pour récupérer.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── PREUVES (juste sous le titre) ───────────── */}
      <section className="py-8 md:py-10" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-6 max-w-6xl mx-auto">
            {proofs.map((item, i) => (
              <li key={item.small} className={`text-center ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}>
                <p
                  className={`${i === 0 ? 'text-4xl' : 'text-2xl'} md:text-3xl font-bold mb-1`}
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
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cible des liens de campagne déjà diffusés vers /boutique#liste-attente :
          une fois cette page en prod, ils doivent atterrir sur la commande
          (la prévente remplace la liste d'attente). Ne pas supprimer cet id. */}
      <span id="liste-attente" aria-hidden className="block scroll-mt-32" />

      {/* ───────────── FICHE PRODUIT ───────────── */}
      {/* ⚠️ Pas de z-index sur cette section ni son conteneur : il enfermerait le
          panneau de commande mobile (fixed) sous l'en-tête et la barre d'achat. */}
      <section id="commande" className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Galerie */}
            <div>
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

              <div className="grid grid-cols-4 gap-3 mt-3">
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
            </div>

            {/* Panneau d'achat — cible des boutons « Je commande » (#achat) */}
            <div id="achat" className="lg:sticky lg:top-28 scroll-mt-28">
              <p
                className="text-sm md:text-base mb-4 font-bold uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
              >
                Prévente
              </p>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl mb-5"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.08',
                }}
              >
                Bracelet Polar 360
                <br />+ App WAC.
              </h2>

              {/* Prix */}
              {unitPrice !== null ? (
                <p className="mb-2">
                  <span
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                  >
                    {formatPrice(unitPrice)}
                  </span>
                  {(offer || flashActive) && PREORDER_PACK.priceTtc !== null && (
                    <s
                      className="ml-3 text-xl md:text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', opacity: 0.45 }}
                    >
                      {formatPrice(PREORDER_PACK.priceTtc)}
                    </s>
                  )}
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
              {/* Klarna activé sur le compte Stripe (confirmé par Julien le 13/10/2026) :
                  proposé automatiquement sur la page de paiement, selon l'éligibilité. */}
              <p className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}>
                Payable en plusieurs fois avec Klarna
              </p>
              <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                <strong>Prévente des fêtes</strong> :{' '}
                {flashActive
                  ? `livré avant Noël, ${FETES_SALE.flash.delivery}. 1 bracelet par commande à ce prix.`
                  : `${FETES_SALE.standard.delivery} Au plus tard le ${FETES_SALE.standard.deliveryDeadline}.`}
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

              {offer ? (
                <div
                  className="mb-4 px-4 py-3 text-sm rounded-lg"
                  style={{
                    fontFamily: 'var(--font-roboto)',
                    color: 'var(--color-primary-beige)',
                    backgroundColor: 'var(--color-secondary-orange)',
                  }}
                >
                  <p className="font-bold uppercase" style={{ fontFamily: 'var(--font-syne)', letterSpacing: '0.05em' }}>
                    Offre {offer.label}
                  </p>
                  <p className="font-bold mt-1">
                    {formatPrice(offer.priceTtc)} au lieu de {formatPrice(PREORDER_PACK.priceTtc ?? 0)} +{' '}
                    {offer.grantPremiumMonths} mois d&apos;abonnement premium offerts
                  </p>
                  <p className="text-xs mt-1" style={{ opacity: 0.9 }}>
                    Remise appliquée automatiquement au paiement · 1 bracelet par commande
                  </p>
                </div>
              ) : (
                creatorDetected && (
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
                )
              )}

              {/* Mobile : ouvre le panneau de commande */}
              <button
                type="button"
                onClick={() => openOrder('fiche')}
                className="btn-secondary w-full mb-5 lg:hidden"
              >
                {ctaLabel}
              </button>
              <div className="mb-6 lg:hidden">
                <Reassurance />
              </div>

              {/* Formulaire de commande : en ligne dans la fiche sur ordinateur, panneau
                  qui monte du bas de l'écran sur mobile (ouvert par les boutons
                  « Je commande »). Une seule instance → une seule carte Boxtal. */}
              <div
                className={`${sheetOpen ? 'fixed inset-0 z-[60] flex flex-col justify-end' : 'hidden'} lg:static lg:z-auto lg:block`}
                role={sheetOpen ? 'dialog' : undefined}
                aria-modal={sheetOpen ? true : undefined}
                aria-label={sheetOpen ? 'Ta commande' : undefined}
              >
                <div aria-hidden className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setSheetOpen(false)} />
                <div
                  className="relative max-h-[90dvh] overflow-y-auto rounded-t-[20px] px-5 pt-5 lg:max-h-none lg:overflow-visible lg:rounded-none lg:p-0"
                  style={{
                    backgroundColor: 'var(--color-primary-beige)',
                    paddingBottom: sheetOpen ? 'calc(1.25rem + env(safe-area-inset-bottom))' : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-5 lg:hidden">
                    <div>
                      <p
                        className="text-xs font-bold uppercase mb-1"
                        style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)', letterSpacing: '0.15em' }}
                      >
                        Prévente
                      </p>
                      <p className="text-lg font-bold uppercase" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', lineHeight: 1.2 }}>
                        Bracelet Polar 360 + App WAC
                      </p>
                      <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                        {flashActive ? `Livré avant Noël, ${FETES_SALE.flash.delivery}.` : `Au plus tard le ${FETES_SALE.standard.deliveryDeadline}.`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSheetOpen(false)}
                      aria-label="Fermer"
                      className="flex-none w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full"
                      style={{ color: 'var(--color-primary-green)', border: '2px solid var(--color-primary-green)' }}
                    >
                      ✕
                    </button>
                  </div>

                  <OrderForm
                    active={isDesktop || sheetOpened}
                    inSheet={sheetOpen}
                    unitPrice={unitPrice}
                    attribution={attribution}
                    offer={offer}
                    onOfferUnavailable={onOfferUnavailable}
                    flash={flashActive}
                    onFlashSoldOut={() => setFlashLeft(0)}
                  />
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── AVIS (stores, texte non retouché — lib/proof.ts) ───────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-3 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Ils grimpent déjà avec l&apos;app.
            </h2>
            <p
              className="text-center mb-10 text-sm md:text-base"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.8 }}
            >
              Avis publiés sur l&apos;App Store et Google Play · l&apos;app est notée {APP_PROOF.storeRating}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {STORE_REVIEWS.map((review, i) => (
              <Reveal key={review.author} delay={i * 0.08}>
                <figure
                  className="h-full flex flex-col p-6 rounded-[20px]"
                  style={{ backgroundColor: 'var(--color-primary-beige)', border: '2px solid var(--color-primary-green)' }}
                >
                  <p aria-label="5 étoiles sur 5" className="mb-3 text-lg tracking-[0.15em]" style={{ color: 'var(--color-secondary-orange)' }}>
                    ★★★★★
                  </p>
                  <blockquote
                    className="flex-1 mb-5"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}
                  >
                    « {review.text} »
                  </blockquote>
                  <figcaption className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                    <strong className="text-sm" style={{ fontFamily: 'var(--font-syne)', opacity: 1 }}>
                      {review.author}
                    </strong>
                    <br />
                    Avis {review.source} · {review.date}
                    {review.excerpt ? ' · Extrait' : ''}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── DANS TA COMMANDE ───────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-primary-green)' }}>
        <div className="container-custom">
          <Reveal>
            <h2
              className="text-3xl md:text-5xl mb-12 text-center"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-beige)' }}
            >
              Dans ta commande.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Le bracelet Polar 360',
                text: "Capteur cardio sans écran, ±1 BPM (donnée Polar). On le porte à l’avant-bras. Notre R&D mesure actuellement ce placement face à une ceinture thoracique.",
              },
              {
                title: 'L’app WAC',
                text: 'Ton État de Forme calculé chaque matin sur 6 signaux physiologiques, l’analyse de tes séances, ta récupération nocturne et le suivi de ton cycle. Gratuite, sans abonnement obligatoire.',
              },
              {
                title: 'Livraison offerte en France',
                text: 'En point relais Chronopost ou à domicile, avec ton guide de démarrage et un email à chaque étape jusqu’à la livraison.',
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
              <a {...preorderLinkProps('bas-de-page')} className="btn-secondary inline-block">
                Je commande →
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
        <p
          className="pt-2 text-[11px] text-center"
          style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}
        >
          Fin de la prévente dans{' '}
          <strong style={{ color: 'var(--color-secondary-orange)' }}>
            <CountdownTimer variant="inline" endDate={FETES_SALE.endDate} />
          </strong>
        </p>
        <div className="flex items-center justify-between gap-4 px-5 pb-3 pt-1.5">
          <div>
            {unitPrice !== null && (
              <p className="text-lg font-bold leading-tight" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
                {formatPrice(unitPrice)} <span className="text-xs">TTC</span>
              </p>
            )}
            <p className="text-[11px]" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
              {flashActive && flashLeft !== null
                ? `Plus que ${flashLeft} à ${formatPrice(FETES_SALE.flash.priceTtc)}`
                : 'Livraison offerte en France'}
            </p>
          </div>
          <a {...preorderLinkProps('barre-mobile')} className="btn-secondary text-sm whitespace-nowrap">
            Je commande
          </a>
        </div>
      </div>
    </main>
  )
}
