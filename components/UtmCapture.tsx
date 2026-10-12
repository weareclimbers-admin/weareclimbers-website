'use client'

import { useEffect } from 'react'
import { CREATOR_STORAGE_KEY } from '@/lib/creator'
import { OFFER_STORAGE_KEY } from '@/lib/offers'
import { captureCampaignParams } from '@/lib/attribution'

/**
 * Capture les paramètres d'attribution de l'URL d'atterrissage : le visiteur
 * peut naviguer sur plusieurs pages avant de s'inscrire ou de payer, l'URL ne
 * porte alors plus les paramètres.
 * - utm_* et fbclid → cookies first-party 30 jours (lib/attribution.ts), lus
 *   par NewsletterForm → attributs Brevo, et par la boutique → metadata Stripe.
 * - `wac_creator` (?creator=, sessionStorage) : identifiant créateur UGC
 *   explicite, capturé même sans structure UTM complète (lib/creator.ts).
 * - `wac_offer` (?offre=, sessionStorage) : offre partenaire (tarif négocié +
 *   premium, lib/offers.ts), revérifiée côté serveur au checkout.
 * Un nouvel atterrissage avec paramètres écrase la capture précédente.
 */
export default function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    try {
      captureCampaignParams(params)
    } catch {
      /* cookies indisponibles : non bloquant */
    }
    try {
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
