import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Client Boxtal API v3 (côté serveur) — remplaçant de lib/mondialrelay.ts.
 *
 * Boxtal = agrégateur multi-transporteurs (Colissimo, Chronopost/Shop2Shop, …).
 * Décision 17/09/2026 : on quitte Mondial Relay pour Boxtal en direct (API publique,
 * sans contrat, une seule intégration). Voir la mémoire projet_boxtal_migration.
 *
 * Spec : OpenAPI v3.1.0 (api-v3.json). Doc : https://developer.boxtal.com/fr/fr
 * Auth : Basic base64(accessKey:secretKey) accepté directement sur tous les endpoints
 *   (vérifié en sandbox le 18/09). Un access token Bearer est aussi dispo via
 *   POST /iam/account-app/token, mais la Basic directe suffit et évite le dance token.
 *
 * ⚠️ ENV : BOXTAL_API_ACCESS_KEY + BOXTAL_API_SECRET_KEY (jamais NEXT_PUBLIC_*).
 * ⚠️ BOXTAL_API_BASE_URL pilote SANDBOX vs PROD. Défaut = TEST (api.boxtal.build)
 *    pour qu'une env manquante ne crée JAMAIS d'expédition réelle facturée. En prod,
 *    poser explicitement BOXTAL_API_BASE_URL=https://api.boxtal.com.
 */

// Défaut volontairement sur le serveur de TEST (les commandes sandbox ne sont pas
// facturées). La prod DOIT surcharger via env — sécurité anti-facturation accidentelle.
const BOXTAL_BASE_URL = process.env.BOXTAL_API_BASE_URL || 'https://api.boxtal.build'

/** Réseaux de points de proximité (searchNetworks). CHRP_NETWORK = Chronopost/Shop2Shop
 *  (vérifié en sandbox). MONR_NETWORK = Mondial Relay (legacy, on s'en éloigne). */
export type BoxtalNetwork = 'CHRP_NETWORK' | 'MONR_NETWORK' | (string & {})

function getAuthHeader(): string {
  const accessKey = process.env.BOXTAL_API_ACCESS_KEY
  const secretKey = process.env.BOXTAL_API_SECRET_KEY
  if (!accessKey || !secretKey) {
    throw new Error('BOXTAL_API_ACCESS_KEY / BOXTAL_API_SECRET_KEY manquantes (voir .env.example)')
  }
  return 'Basic ' + Buffer.from(`${accessKey}:${secretKey}`, 'utf8').toString('base64')
}

/** Format d'erreur Boxtal : { status, errors: [{ code, parameters }] }. */
interface BoxtalError {
  status?: number
  errors?: { code: string; parameters?: unknown }[]
}

function describeError(status: number, body: unknown): string {
  const errs = (body as BoxtalError)?.errors
  if (Array.isArray(errs) && errs.length) {
    return errs.map((e) => e.code).join(', ')
  }
  return `HTTP ${status}`
}

/**
 * Appel authentifié de l'API Boxtal. Renvoie le JSON parsé, lève une Error lisible
 * sur tout statut non-2xx (le corps porte errors[].code — cf. gestion d'erreur de la spec).
 */
async function boxtalFetch<T = unknown>(
  path: string,
  init?: { method?: string; body?: unknown; query?: Record<string, string | string[] | undefined> },
): Promise<T> {
  const url = new URL(path, BOXTAL_BASE_URL)
  for (const [key, value] of Object.entries(init?.query ?? {})) {
    if (value === undefined) continue
    // searchNetworks & co. sont des tableaux → paramètre répété.
    for (const v of Array.isArray(value) ? value : [value]) url.searchParams.append(key, v)
  }

  const response = await fetch(url, {
    method: init?.method ?? 'GET',
    headers: {
      Authorization: getAuthHeader(),
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  })

  const text = await response.text()
  const data = text ? safeJsonParse(text) : null
  if (!response.ok) {
    throw new Error(`Boxtal ${init?.method ?? 'GET'} ${path} : ${describeError(response.status, data)}`)
  }
  return data as T
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return { raw: text.slice(0, 300) }
  }
}

// ── Points de proximité (Shop2Shop / relais) ────────────────────────────────

export interface BoxtalParcelPoint {
  /** Code du point (à passer en pickupPointCode lors de la création d'expédition). */
  code: string
  name: string
  network: BoxtalNetwork | null
  street: string
  zip: string
  city: string
  country: string
  /** Distance en mètres depuis l'adresse de référence. */
  distanceMeters: number | null
}

interface RawNearbyParcelPoint {
  distanceFromSearchLocation?: number
  parcelPoint?: {
    code?: string
    name?: string
    compatibleNetworks?: string[]
    network?: string
    location?: { street?: string; postalCode?: string; city?: string; countryIsoCode?: string }
  }
}

/**
 * Recherche des points de proximité autour d'une adresse, filtrés par réseau
 * (GET /shipping/v3.2/parcel-point-by-network — la v3.1/parcel-point est deprecated).
 * Pour Shop2Shop : networks = ['CHRP_NETWORK'].
 */
export async function searchParcelPoints({
  countryIsoCode,
  postalCode,
  city,
  networks,
}: {
  countryIsoCode: string
  postalCode?: string
  city?: string
  networks: BoxtalNetwork[]
}): Promise<BoxtalParcelPoint[]> {
  const data = await boxtalFetch<{ content?: RawNearbyParcelPoint[] }>(
    '/shipping/v3.2/parcel-point-by-network',
    { query: { countryIsoCode, postalCode, city, searchNetworks: networks } },
  )
  return (data.content ?? []).map((item) => {
    const p = item.parcelPoint ?? {}
    return {
      code: p.code ?? '',
      name: p.name ?? '',
      network: (p.compatibleNetworks?.[0] ?? p.network ?? null) as BoxtalNetwork | null,
      street: p.location?.street ?? '',
      zip: p.location?.postalCode ?? '',
      city: p.location?.city ?? '',
      country: p.location?.countryIsoCode ?? countryIsoCode,
      distanceMeters:
        typeof item.distanceFromSearchLocation === 'number' ? item.distanceFromSearchLocation : null,
    }
  })
}

// ── Création d'expédition + étiquette ───────────────────────────────────────

/** Adresse Boxtal (fromAddress / toAddress). Le téléphone DOIT être au format
 *  international +CCCNNNN… (ex. +33612345678) — pas de 06… national. */
export interface BoxtalAddress {
  type: 'RESIDENTIAL' | 'BUSINESS'
  contact: { firstName: string; lastName: string; email: string; phone: string; company?: string }
  location: {
    street: string
    city: string
    countryIsoCode: string
    number?: string
    postalCode?: string
    state?: string
  }
  additionalInformation?: string
}

/** Colis Boxtal. Poids en KILOS (0,001 près) ; dimensions en cm entiers. */
export interface BoxtalPackage {
  weight: number
  length: number
  width: number
  height?: number
  value: { value: number; currency?: 'EUR' }
  /** Catégorie de contenu : id via GET /content-category (ex. content:v1:50170). */
  content: { id: string; description: string }
  type?: 'PARCEL' | 'LETTER' | 'PALLET'
}

export interface CreateShippingOrderInput {
  /** Code de l'offre de transport (ex. Colissimo domicile signature, Chronopost Shop2Shop).
   *  Obligatoire — la liste est documentée (list-shipping-offer-code), pas d'endpoint. */
  shippingOfferCode: string
  fromAddress: BoxtalAddress
  toAddress: BoxtalAddress
  packages: BoxtalPackage[]
  /** Code du point relais si l'offre est en point de proximité (Shop2Shop). */
  pickupPointCode?: string
  /** Souscrire l'assurance Boxtal sur la valeur déclarée du colis. */
  insured?: boolean
  labelType?: 'PDF_A4' | 'PDF_10x15'
  /** externalId métier (ex. id PaymentIntent Stripe) — remonte dans les webhooks. */
  shipmentExternalId?: string
  /** Date souhaitée de prise en charge (YYYY-MM-DD). */
  expectedTakingOverDate?: string
}

export interface BoxtalShippingOrder {
  id: string
  status: 'PENDING' | 'REQUESTED' | 'CONFIRMED' | 'CANCELLED'
  shipmentId?: string
  deliveryPriceExclTax?: { value: number; currency: string }
  insurancePriceExclTax?: { value: number; currency: string }
  estimatedDeliveryDate?: string
}

/**
 * Crée ET commande une expédition (POST /shipping/v3.1/shipping-order).
 * ⚠️ En PROD, c'est facturé. L'étiquette n'est PAS dans la réponse : la récupérer
 * via getShippingDocuments(orderId) (ou le webhook DOCUMENT_CREATED).
 */
export async function createShippingOrder(input: CreateShippingOrderInput): Promise<BoxtalShippingOrder> {
  const body = {
    insured: input.insured ?? false,
    labelType: input.labelType ?? 'PDF_A4',
    shippingOfferCode: input.shippingOfferCode,
    ...(input.expectedTakingOverDate ? { expectedTakingOverDate: input.expectedTakingOverDate } : {}),
    shipment: {
      fromAddress: input.fromAddress,
      toAddress: input.toAddress,
      packages: input.packages.map((p) => ({
        type: p.type ?? 'PARCEL',
        weight: p.weight,
        length: p.length,
        width: p.width,
        height: p.height ?? 0,
        value: { value: p.value.value, currency: p.value.currency ?? 'EUR' },
        content: p.content,
      })),
      ...(input.pickupPointCode ? { pickupPointCode: input.pickupPointCode } : {}),
      ...(input.shipmentExternalId ? { externalId: input.shipmentExternalId } : {}),
    },
  }
  const data = await boxtalFetch<{ content?: BoxtalShippingOrder }>('/shipping/v3.1/shipping-order', {
    method: 'POST',
    body,
  })
  if (!data.content?.id) throw new Error('Boxtal : réponse de création sans id de commande')
  return data.content
}

export interface BoxtalShippingDocument {
  /** URL signée du document — expire après 7 jours (à re-télécharger si besoin). */
  url: string
  type: 'LABEL' | 'PROFORMA' | 'CN23' | 'VOUCHER'
  format: 'PDF_A4' | 'PDF_10x15'
}

/** Récupère les documents d'expédition (dont l'étiquette LABEL) d'une commande. */
export async function getShippingDocuments(orderId: string): Promise<BoxtalShippingDocument[]> {
  const data = await boxtalFetch<{ content?: BoxtalShippingDocument[] }>(
    `/shipping/v3.1/shipping-order/${encodeURIComponent(orderId)}/shipping-document`,
  )
  return data.content ?? []
}

/** Raccourci : l'URL de la première étiquette (LABEL) d'une commande, si générée. */
export async function getLabelUrl(orderId: string): Promise<string | null> {
  const docs = await getShippingDocuments(orderId)
  return docs.find((d) => d.type === 'LABEL')?.url ?? null
}

// ── Suivi ───────────────────────────────────────────────────────────────────

export type BoxtalTrackingStatus =
  | 'ANNOUNCED'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'FAILED_ATTEMPT'
  | 'REACHED_DELIVERY_PICKUP_POINT'
  | 'DELIVERED'
  | 'RETURNED'
  | 'EXCEPTION'

export interface BoxtalTracking {
  status: BoxtalTrackingStatus
  message?: string
  isFinal?: boolean
  trackingNumber?: string
  packageTrackingUrl?: string
}

/** Récupère le suivi d'une commande (GET .../{id}/tracking). Peut lever
 *  NoPackageTrackingFoundException tant que le suivi n'est pas dispo. */
export async function getTracking(orderId: string): Promise<BoxtalTracking[]> {
  const data = await boxtalFetch<{ content?: BoxtalTracking[] }>(
    `/shipping/v3.1/shipping-order/${encodeURIComponent(orderId)}/tracking`,
  )
  return data.content ?? []
}

// ── Webhooks ─────────────────────────────────────────────────────────────────

/**
 * Vérifie la signature d'un callback webhook Boxtal.
 * L'en-tête `x-bxt-signature` = HMAC SHA256 du corps JSON BRUT, secret = la
 * webhookSecret fournie à la création de la souscription. Comparaison à temps constant.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(signature, 'utf8')
  return a.length === b.length && timingSafeEqual(a, b)
}
