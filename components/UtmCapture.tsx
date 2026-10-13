'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/**
 * Capture l'attribution de l'URL d'atterrissage (utm_*, fbclid, ?creator=,
 * ?offre=) en cookies first-party 30 jours — voir lib/attribution.ts. Le
 * visiteur peut naviguer sur plusieurs pages, ou revenir plus tard, avant de
 * s'inscrire ou de payer : l'URL ne porte alors plus les paramètres.
 * Relue par NewsletterForm (attributs Brevo) et par la boutique (affichage
 * premium / tarif partenaire + metadata Stripe).
 */
export default function UtmCapture() {
  useEffect(() => {
    try {
      captureAttribution(new URLSearchParams(window.location.search))
    } catch {
      /* cookies indisponibles : non bloquant */
    }
  }, [])

  return null
}
