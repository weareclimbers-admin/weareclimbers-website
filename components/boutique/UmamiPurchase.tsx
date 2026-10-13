'use client'

import { useEffect } from 'react'
import { trackShopWhenReady } from '@/lib/umami'

/**
 * Event Umami `precommande-payee` sur la page de remerciement : dernière marche
 * du rapport Funnel (boutique → clic-precommande → depart-paiement → payée).
 * `revenue`/`currency` alimentent le rapport Revenus d'Umami (montant réel Stripe).
 *
 * Compté une seule fois par session Stripe : un rafraîchissement de la page ne
 * recompte pas l'achat (marqueur sessionStorage, best-effort).
 */
export default function UmamiPurchase({
  sessionId,
  value,
  currency,
}: {
  sessionId: string
  value: number
  currency: string
}) {
  useEffect(() => {
    const key = `wac_umami_paid_${sessionId}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      /* sessionStorage indisponible : on compte quand même */
    }
    return trackShopWhenReady('precommande-payee', { revenue: value, currency })
  }, [sessionId, value, currency])

  return null
}
