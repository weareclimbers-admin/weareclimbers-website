'use client'

import { useEffect } from 'react'
import { trackShopEvent, SHOP_CONTENT } from '@/lib/meta-pixel'

/**
 * Déclenche l'event Meta `Purchase` sur la page de remerciement (composant
 * serveur), une fois côté client. No-op sans consentement marketing.
 *
 * L'`eventId` est DÉTERMINISTE (dérivé du session_id Stripe côté serveur) :
 * - il est identique à celui que la Conversions API enverra (phase 2) → dédup ;
 * - il reste stable si l'utilisateur rafraîchit la page → Meta dédoublonne et
 *   ne compte pas deux fois l'achat.
 *
 * `value`/`currency` viennent du montant réellement payé (session Stripe).
 * Purchase exige une valeur : on ne monte pas ce composant si elle manque.
 */
export default function MetaPurchase({
  eventId,
  value,
  currency,
}: {
  eventId: string
  value: number
  currency: string
}) {
  useEffect(() => {
    trackShopEvent('Purchase', { ...SHOP_CONTENT, value, currency }, eventId)
  }, [eventId, value, currency])

  return null
}
