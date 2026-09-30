/**
 * Helpers pixel Meta côté BOUTIQUE (pré-commandes /boutique2).
 *
 * Le pixel vitrine (PageView global) et le pixel boutique sont tous deux
 * initialisés dans components/CookieBanner.tsx, UNIQUEMENT après consentement
 * « Marketing » (CNIL). Ici on route les events e-commerce vers le SEUL pixel
 * boutique via `trackSingle`, pour ne pas polluer le pixel vitrine.
 *
 * Chaque event porte un `eventID` : c'est la clé de dédoublonnage avec la
 * Conversions API (phase 2, envoi serveur). Le pixel navigateur et l'appel
 * serveur doivent envoyer le MÊME `eventID` + le même `event_name`.
 */

/** ID du pixel dédié à la boutique. Surchargable par env (fallback = ID Meta). */
export const META_SHOP_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_SHOP_ID || '1424037446331441'

/**
 * Identité produit de la pré-commande — DOIT être identique partout
 * (pixel + CAPI, ViewContent/InitiateCheckout/Purchase) pour que le
 * retargeting et le catalogue fonctionnent. SKU figé volontairement.
 */
export const SHOP_CONTENT = {
  content_ids: ['polar360-pack'],
  content_type: 'product',
  content_name: 'Bracelet Polar 360 + App WAC',
} as const

/** Le consentement « Marketing » est-il donné ? (même source que CookieBanner) */
function hasMarketingConsent(): boolean {
  try {
    const raw = localStorage.getItem('wac_cookie_consent')
    if (!raw) return false
    return JSON.parse(raw).marketing === true
  } catch {
    return false
  }
}

/** Génère un eventID unique (partagé pixel ↔ CAPI pour le dédoublonnage). */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  // Fallback très improbable (navigateurs anciens) : suffisant pour un id de dédup.
  return `evt-${Date.now()}-${Math.round(Math.random() * 1e9)}`
}

/**
 * Envoie un event vers le pixel BOUTIQUE uniquement.
 * No-op si le consentement marketing n'est pas donné. Si le pixel n'est pas
 * encore chargé (course entre le montage de la page et CookieBanner), on
 * réessaie brièvement le temps que `fbq` apparaisse.
 */
export function trackShopEvent(
  eventName: string,
  customData?: Record<string, unknown>,
  eventID?: string,
): void {
  if (typeof window === 'undefined') return
  if (!hasMarketingConsent()) return

  let attempts = 0
  const fire = () => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
    if (typeof fbq === 'function') {
      fbq(
        'trackSingle',
        META_SHOP_PIXEL_ID,
        eventName,
        customData ?? {},
        eventID ? { eventID } : undefined,
      )
      return
    }
    // Le pixel se charge de façon asynchrone après consentement : on patiente.
    if (attempts++ < 20) setTimeout(fire, 150)
  }
  fire()
}
