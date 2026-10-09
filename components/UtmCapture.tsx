'use client'

import { useEffect } from 'react'
import { CREATOR_STORAGE_KEY } from '@/lib/creator'
import { OFFER_STORAGE_KEY } from '@/lib/offers'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

/**
 * Capture les paramètres d'attribution de l'URL d'atterrissage et les persiste
 * en sessionStorage : le visiteur peut naviguer sur plusieurs pages avant de
 * s'inscrire ou de payer, l'URL ne porte alors plus les paramètres.
 * - `wac_utm` (utm_*) : lus par NewsletterForm → attributs Brevo, et par la
 *   boutique → metadata Stripe.
 * - `wac_creator` (?creator=) : identifiant créateur UGC explicite, capturé
 *   même sans structure UTM complète (lib/creator.ts).
 * - `wac_offer` (?offre=) : offre partenaire (tarif négocié + premium,
 *   lib/offers.ts), revérifiée côté serveur au checkout.
 * Un nouvel atterrissage avec paramètres écrase la capture précédente.
 */
export default function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    try {
      if (UTM_KEYS.some((key) => params.has(key))) {
        const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key) ?? '']))
        sessionStorage.setItem('wac_utm', JSON.stringify(utm))
      }
      const creator = params.get('creator')?.trim()
      if (creator) {
        sessionStorage.setItem(CREATOR_STORAGE_KEY, creator.toLowerCase())
      }
      const offer = params.get('offre')?.trim()
      if (offer) {
        sessionStorage.setItem(OFFER_STORAGE_KEY, offer.toLowerCase())
      }
    } catch {
      /* sessionStorage indisponible (navigation privée stricte) : non bloquant */
    }
  }, [])

  return null
}
