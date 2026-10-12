/**
 * Paramètres de campagne de l'URL d'atterrissage (utm_*, fbclid), conservés
 * 30 jours en cookies first-party : le visiteur revient souvent plus tard,
 * dans un autre onglet, pour s'inscrire ou payer.
 *
 * Posés même sans consentement marketing (décision Julien, 12/10/2026) : ce
 * sont des paramètres de campagne lus par nous seuls (attributs Brevo,
 * metadata Stripe), jamais envoyés à Meta — la CAPI n'utilise que fb_fbc,
 * gaté par le consentement.
 *
 * Client uniquement (document.cookie). Dernier contact : tout nouvel
 * atterrissage de campagne (UTM et/ou fbclid) remplace UTM ET fbclid ensemble —
 * pas de fbclid d'une ancienne pub Meta mêlé aux UTM d'un email Brevo.
 */

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

const UTM_COOKIE = 'wac_utm'
const FBCLID_COOKIE = 'wac_fbclid'
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
export function captureCampaignParams(params: URLSearchParams): void {
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

/** Lu au moment d'envoyer un formulaire (newsletter) ou de partir au paiement. */
export function readCampaignParams(): { utm: Record<string, string>; fbclid: string } {
  try {
    const raw: unknown = JSON.parse(getCookie(UTM_COOKIE) || '{}')
    return {
      utm: typeof raw === 'object' && raw !== null ? (raw as Record<string, string>) : {},
      fbclid: getCookie(FBCLID_COOKIE),
    }
  } catch {
    return { utm: {}, fbclid: '' }
  }
}
