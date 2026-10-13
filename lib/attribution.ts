/**
 * Attribution capturée sur l'URL d'atterrissage et conservée 30 jours en
 * cookies first-party : le visiteur revient souvent plus tard, dans un autre
 * onglet, pour s'inscrire ou payer.
 *
 * - utm_* (`wac_utm`) et fbclid (`wac_fbclid`) : paramètres de campagne.
 *   Dernier contact : tout nouvel atterrissage de campagne (UTM et/ou fbclid)
 *   remplace UTM ET fbclid ensemble — pas de fbclid d'une ancienne pub Meta mêlé
 *   aux UTM d'un email Brevo.
 * - ?creator= (`wac_creator`, lib/creator.ts) et ?offre= (`wac_offer`,
 *   lib/offers.ts) : avantages promis au visiteur (premium, tarif partenaire).
 *   Conservés malgré un atterrissage de campagne ultérieur ; seul un nouveau
 *   lien du même type les remplace. Revérifiés côté serveur au checkout.
 *
 * Posés même sans consentement marketing (décision Julien, 12/10/2026) : lus
 * par nous seuls (attributs Brevo, metadata Stripe), jamais envoyés à Meta — la
 * CAPI n'utilise que fb_fbc, gaté par le consentement.
 *
 * Client uniquement (document.cookie).
 */

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

const UTM_COOKIE = 'wac_utm'
const FBCLID_COOKIE = 'wac_fbclid'
const CREATOR_COOKIE = 'wac_creator'
const OFFER_COOKIE = 'wac_offer'
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60
/** Borne par valeur (le serveur retronque de toute façon) — garde le cookie petit. */
const MAX_VALUE_LENGTH = 200

function setCookie(name: string, value: string): void {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; Path=/`
}

function getCookie(name: string): string {
  const entry = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : ''
}

/** Appelé à l'atterrissage (UtmCapture). */
export function captureAttribution(params: URLSearchParams): void {
  const creator = params.get('creator')?.trim().toLowerCase()
  if (creator) {
    setCookie(CREATOR_COOKIE, creator.slice(0, MAX_VALUE_LENGTH))
  }
  const offer = params.get('offre')?.trim().toLowerCase()
  if (offer) {
    setCookie(OFFER_COOKIE, offer.slice(0, MAX_VALUE_LENGTH))
  }

  const fbclid = params.get('fbclid')?.trim() ?? ''
  if (!fbclid && !UTM_KEYS.some((key) => params.has(key))) return
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, (params.get(key) ?? '').slice(0, MAX_VALUE_LENGTH)]))
  setCookie(UTM_COOKIE, JSON.stringify(utm))
  if (fbclid) {
    setCookie(FBCLID_COOKIE, fbclid.slice(0, MAX_VALUE_LENGTH))
  } else {
    deleteCookie(FBCLID_COOKIE)
  }
}

/** Lu au moment d'afficher la boutique, d'envoyer un formulaire ou de partir au paiement. */
export function readAttribution(): { utm: Record<string, string>; fbclid: string; creator: string; offer: string } {
  let utm: Record<string, string> = {}
  try {
    const raw: unknown = JSON.parse(getCookie(UTM_COOKIE) || '{}')
    if (typeof raw === 'object' && raw !== null) utm = raw as Record<string, string>
  } catch {
    /* cookie illisible : sans UTM */
  }
  return {
    utm,
    fbclid: getCookie(FBCLID_COOKIE),
    creator: getCookie(CREATOR_COOKIE),
    offer: getCookie(OFFER_COOKIE),
  }
}

/** Offre partenaire refusée par le serveur (places épuisées, offre terminée). */
export function clearPartnerOffer(): void {
  deleteCookie(OFFER_COOKIE)
}
