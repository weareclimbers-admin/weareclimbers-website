/**
 * Événements Umami du parcours de commande (boutique → Stripe → merci).
 *
 * Noms FIGÉS (kebab-case FR, comme inscription-liste-attente / clic-app-store) :
 * ne jamais les renommer, les rapports Funnel d'Umami en dépendent.
 *
 *   clic-precommande     un bouton « Je précommande » (data : emplacement)
 *   choix-livraison      changement de zone ou de mode (data : zone, mode)
 *   point-relais-choisi  relais sélectionné (data : pays)
 *   depart-paiement      session Stripe créée, redirection en cours (data : zone, mode, quantite)
 *   erreur-paiement      départ au paiement impossible (data : raison)
 *   precommande-payee    page merci (data : revenue, currency — rapport Revenus d'Umami)
 *
 * Umami n'est chargé qu'après consentement « Analytics » (CookieBanner) et
 * jamais en local/preview (data-domains) : tout est best-effort, sans effet
 * si le script est absent.
 */

export type ShopEvent =
  | 'clic-precommande'
  | 'choix-livraison'
  | 'point-relais-choisi'
  | 'depart-paiement'
  | 'erreur-paiement'
  | 'precommande-payee'

type EventData = Record<string, string | number | boolean>

export function trackShop(event: ShopEvent, data?: EventData): void {
  try {
    void window.umami?.track(event, data)
  } catch {
    /* tracker absent ou bloqué : non bloquant */
  }
}

/**
 * Variante à attendre juste avant de quitter la page (redirection vers Stripe) :
 * laisse partir la requête Umami, sans jamais retarder le visiteur de plus de 300 ms.
 */
export async function trackShopBeforeLeaving(event: ShopEvent, data?: EventData): Promise<void> {
  try {
    const sent = window.umami?.track(event, data)
    await Promise.race([sent, new Promise((resolve) => setTimeout(resolve, 300))])
  } catch {
    /* non bloquant */
  }
}

/**
 * Variante pour un événement au chargement de la page (merci) : le script Umami,
 * injecté après lecture du consentement, arrive souvent après le montage.
 * Abandonne au bout de `timeoutMs` (pas de consentement ou bloqueur).
 */
export function trackShopWhenReady(event: ShopEvent, data?: EventData, timeoutMs = 8000): () => void {
  const started = Date.now()
  const timer = setInterval(() => {
    if (window.umami) {
      clearInterval(timer)
      trackShop(event, data)
    } else if (Date.now() - started > timeoutMs) {
      clearInterval(timer)
    }
  }, 250)
  return () => clearInterval(timer)
}
