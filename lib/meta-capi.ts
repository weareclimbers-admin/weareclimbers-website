import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'
import { META_SHOP_PIXEL_ID } from '@/lib/meta-content'

/**
 * Conversions API Meta (envoi SERVEUR des events) — pendant serveur du pixel
 * navigateur (lib/meta-pixel.ts). À n'importer QUE depuis du code serveur
 * (routes API, webhook) : lit le secret META_CAPI_ACCESS_TOKEN et utilise le
 * module `crypto` de Node.
 *
 * Le dédoublonnage pixel ↔ serveur repose sur un `event_id` + `event_name`
 * IDENTIQUES entre les deux canaux (cf. eventID généré côté client).
 *
 * Best-effort : ne lève jamais (un event marketing raté ne doit rien casser).
 * Doc : https://developers.facebook.com/docs/marketing-api/conversions-api
 */

const GRAPH_API_VERSION = 'v21.0'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/**
 * Normalise puis hache une donnée client selon la spec Meta Advanced Matching.
 * Retourne null si vide (le champ est alors omis du payload).
 */
function hashField(
  raw: string | null | undefined,
  kind: 'email' | 'phone' | 'city' | 'country' | 'name' | 'zip',
): string | null {
  if (!raw) return null
  let v = raw.trim().toLowerCase()
  switch (kind) {
    case 'phone':
      v = v.replace(/[^0-9]/g, '') // E.164 sans le « + »
      break
    case 'city':
      v = v.replace(/[^a-z0-9]/g, '') // sans espaces ni ponctuation
      break
    case 'country':
      v = v.replace(/[^a-z]/g, '').slice(0, 2) // ISO 3166-1 alpha-2
      break
    case 'zip':
      v = v.replace(/\s/g, '')
      break
    case 'email':
    case 'name':
      break // trim + lowercase suffisent
  }
  return v ? sha256(v) : null
}

/** Données client à faire correspondre (hachées si PII, brutes pour IP/UA/fbp/fbc). */
export interface CapiUserData {
  email?: string | null
  phone?: string | null
  firstName?: string | null
  lastName?: string | null
  city?: string | null
  zip?: string | null
  country?: string | null
  clientIp?: string | null
  userAgent?: string | null
  fbp?: string | null
  fbc?: string | null
}

function buildUserData(u: CapiUserData): Record<string, unknown> {
  const ud: Record<string, unknown> = {}
  const set = (key: string, val: string | null) => {
    if (val) ud[key] = [val]
  }
  set('em', hashField(u.email, 'email'))
  set('ph', hashField(u.phone, 'phone'))
  set('fn', hashField(u.firstName, 'name'))
  set('ln', hashField(u.lastName, 'name'))
  set('ct', hashField(u.city, 'city'))
  set('zp', hashField(u.zip, 'zip'))
  set('country', hashField(u.country, 'country'))
  // NON hachés (spec Meta) :
  if (u.clientIp) ud.client_ip_address = u.clientIp
  if (u.userAgent) ud.client_user_agent = u.userAgent
  if (u.fbp) ud.fbp = u.fbp
  if (u.fbc) ud.fbc = u.fbc
  return ud
}

export interface CapiEventInput {
  eventName: 'Purchase' | 'InitiateCheckout' | 'ViewContent'
  eventId: string
  /** Unix seconds. Défaut = maintenant. Rejeté par Meta si > 7 jours. */
  eventTime?: number
  eventSourceUrl?: string
  userData: CapiUserData
  customData?: Record<string, unknown>
}

/**
 * Envoie un event à la Conversions API. No-op silencieux si le token manque
 * ou si aucune donnée d'appariement n'est exploitable (Meta rejetterait).
 */
export async function sendCapiEvent(input: CapiEventInput): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!token) {
    console.error('meta-capi: META_CAPI_ACCESS_TOKEN absent — event serveur non envoyé')
    return
  }

  const userData = buildUserData(input.userData)
  if (Object.keys(userData).length === 0) {
    console.warn(`meta-capi: aucune donnée user exploitable — ${input.eventName} ignoré`)
    return
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: userData,
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
  }
  // Code de test optionnel (onglet « Test des événements » de Meta).
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE
  if (testCode) payload.test_event_code = testCode

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_SHOP_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )
    if (!res.ok) {
      console.error(
        `meta-capi: envoi refusé (${input.eventName})`,
        res.status,
        await res.text().catch(() => ''),
      )
    }
  } catch (err) {
    console.error(`meta-capi: échec réseau (${input.eventName})`, err)
  }
}

/**
 * Signaux Meta lisibles sur une requête navigateur (checkout) : cookies
 * _fbp/_fbc déposés par le pixel + IP + user-agent. À capturer au checkout
 * puis ranger dans la metadata Stripe pour que le webhook (Purchase) les
 * réutilise — Stripe → serveur n'a PAS ces cookies.
 */
export function readClientSignals(request: NextRequest): {
  fbp: string | null
  fbc: string | null
  clientIp: string | null
  userAgent: string | null
} {
  const fbp = request.cookies.get('_fbp')?.value ?? null
  const fbc = request.cookies.get('_fbc')?.value ?? null
  const userAgent = request.headers.get('user-agent')
  const xff = request.headers.get('x-forwarded-for')
  const clientIp = xff ? xff.split(',')[0].trim() : request.headers.get('x-real-ip')
  return { fbp, fbc, clientIp, userAgent }
}
