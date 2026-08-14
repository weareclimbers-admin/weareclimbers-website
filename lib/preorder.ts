/**
 * Source de vérité de l'offre PRÉ-COMMANDE V2 (checkout Stripe en propre).
 *
 * Décisions produit actées avec Julien le 14/08/2026 :
 *   - Paiement intégral à la commande (pas d'acompte)
 *   - Pack unique : bracelet Polar 360 + app WAC
 *   - Livraison par zones : France métropolitaine / Belgique-Luxembourg / Suisse / Outre-mer
 *   - Prix : 179 € TTC hors promotion ; ports TTC : FR 4,99 / BE-LU 6,99 / CH 6,99 / DOM 9,99
 *   - Promo liste d'attente : −10 % (≈161,10 € TTC, parité tarif Ulule sans la commission)
 *   - Codes promo activés (code « liste d'attente » diffusé via Brevo, liste #11)
 *
 * ⚠️ Ce fichier est importable côté client (boutique) : AUCUN import serveur,
 * AUCUN identifiant Stripe en dur. Les IDs Stripe (price, shipping rates) vivent
 * dans les variables d'env serveur — voir .env.example, section Stripe.
 *
 * ⚠️ Terminologie : jamais « crowdfunding » / « early access » / « médical ».
 * On dit « pré-commande », « haute précision / ±1 BPM ».
 */

/**
 * Marqueur metadata posé sur les sessions Checkout ET leurs payment_intents.
 * OBLIGATOIRE : les webhooks Stripe sont broadcastés à tout le compte (abonnements
 * coach + bracelet + pré-commandes) — chaque handler filtre sur son marqueur.
 * La CF coach ignore nos events grâce à lui. Ne jamais le changer, ne jamais
 * poser `type: 'bracelet'` (réservé au flux coach).
 */
export const PREORDER_FLOW = 'preorder_v2' as const

/**
 * Clôture des pré-commandes — pilote le compte à rebours de la boutique et le
 * copy « Comment ça se passe » (commande groupée à Polar après clôture).
 * ⚠️ Julien a écrit « 31 Octobre 2027 » (14/08) mais la livraison est annoncée
 * novembre 2026 → interprété 31/10/2026, À CONFIRMER par lui.
 */
export const PREORDER_END_DATE = '2026-10-31T23:59:59+01:00'
export const PREORDER_END_LABEL = '31 octobre 2026'

export interface PreorderPack {
  name: string
  description: string
  /**
   * Prix TTC affiché (€). ⚠️ Purement présentatif : le montant réellement facturé
   * est celui de la price Stripe (env STRIPE_PRICE_PREORDER, tax_behavior inclusive).
   * Les deux doivent rester alignés à la main.
   */
  priceTtc: number | null
  perks: string[]
  /** Quantité max par commande (adjustable_quantity du checkout). */
  maxQuantity: number
  /**
   * Fenêtre de livraison annoncée — OBLIGATION LÉGALE en pré-commande B2C
   * (art. L216-1 Code conso : date ou délai de livraison affiché avant l'achat).
   */
  deliveryWindow: string | null
}

export const PREORDER_PACK: PreorderPack = {
  // TODO(Julien) : nom commercial du pack à valider
  name: 'Pré-commande — Bracelet + App WAC',
  description:
    "Le bracelet Polar 360 haute précision (±1 BPM) associé à l'app WAC : analyse physiologique en temps réel, prévention des blessures et suivi de récupération.",
  priceTtc: 179, // acté 14/08/2026 : « 179 € TTC hors promotion » (aligné flux bracelet coach) — doit matcher la price Stripe
  perks: [
    // TODO(Julien) : contenu exact du pack à valider
    'Bracelet Polar 360 haute précision (±1 BPM)',
    "L'app WAC et ton État de Forme",
    'Livraison prioritaire pour les inscrits à la liste d’attente',
  ],
  maxQuantity: 5, // TODO(Julien) : à valider
  deliveryWindow: 'novembre 2026', // confirmé par Julien le 14/08/2026 (mention légale)
}

export interface ShippingZone {
  id: string
  label: string
  /** Précision affichée sous l'option (douane, délais…). */
  note?: string
  /**
   * Pays proposés dans le checkout Stripe pour cette zone (ISO 3166-1 alpha-2).
   * C'est CE bornage qui garantit la cohérence frais de port ↔ destination :
   * le checkout hébergé ne sait pas faire varier le port selon l'adresse saisie,
   * donc chaque session n'autorise que les pays de sa zone.
   */
  allowedCountries: string[]
  /** Nom de la variable d'env serveur portant l'ID du shipping rate Stripe de la zone. */
  shippingRateEnv: string
  /**
   * Frais de port TTC affichés (€) — purement présentatif, doit matcher le
   * shipping rate Stripe de la zone (comme priceTtc ↔ STRIPE_PRICE_PREORDER).
   */
  shippingTtc: number | null
}

/**
 * Zones de livraison actées le 14/08/2026 : FR / BE-LU / CH / Outre-mer.
 * Frais de port par zone : TODO(Julien) — montants à définir, puis shipping rates
 * Stripe à créer avec tax_code 'txcd_92010001' (le port suit la TVA du bien —
 * PAS txcd_00000000, erreur connue du shipping bracelet existant).
 *
 * TVA (gérée par Stripe Tax, prix inclusifs — le client paie toujours le même TTC) :
 *   - FR + Monaco : TVA française 20 % extraite du prix
 *   - BE / LU : vente à distance intra-UE (TVA FR sous le seuil des 10 k€, OSS au-delà)
 *   - CH : export hors UE — pas de TVA française ; TVA et frais d'importation suisses
 *     à la charge du destinataire (à écrire dans les CGV)
 *   - Outre-mer : hors champ TVA UE (export) — codes pays ISO dédiés (GP, MQ, RE…),
 *     octroi de mer et taxes locales à la charge du destinataire
 */
export const SHIPPING_ZONES: ShippingZone[] = [
  {
    id: 'fr',
    label: 'France métropolitaine',
    allowedCountries: ['FR', 'MC'],
    shippingRateEnv: 'STRIPE_SHIPPING_RATE_FR',
    shippingTtc: 4.99,
  },
  {
    id: 'be-lu',
    label: 'Belgique & Luxembourg',
    allowedCountries: ['BE', 'LU'],
    shippingRateEnv: 'STRIPE_SHIPPING_RATE_BE_LU',
    shippingTtc: 6.99, // Belgique alignée sur le Luxembourg — confirmé par Julien le 14/08
  },
  {
    id: 'ch',
    label: 'Suisse',
    note: 'TVA et frais de douane suisses à la charge du destinataire.',
    allowedCountries: ['CH'],
    shippingRateEnv: 'STRIPE_SHIPPING_RATE_CH',
    shippingTtc: 6.99,
  },
  {
    id: 'dom-tom',
    label: 'Outre-mer (DOM-TOM)',
    note: 'Octroi de mer et taxes locales éventuelles à la charge du destinataire.',
    // DROM + COM. Liste ajustable selon la réalité logistique — à confirmer avec
    // Julien et à vérifier en mode test (support Stripe Checkout + Stripe Tax).
    allowedCountries: ['GP', 'MQ', 'GF', 'RE', 'YT', 'PM', 'BL', 'MF', 'PF', 'NC', 'WF'],
    shippingRateEnv: 'STRIPE_SHIPPING_RATE_DOM_TOM',
    shippingTtc: 9.99,
  },
]

export function getZone(id: string | undefined | null): ShippingZone | undefined {
  return SHIPPING_ZONES.find((z) => z.id === id)
}
