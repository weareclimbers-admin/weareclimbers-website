'use client'

import { useEffect } from 'react'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const

/**
 * Capture les paramètres UTM de l'URL d'atterrissage et les persiste en
 * sessionStorage (`wac_utm`) : le visiteur peut naviguer sur plusieurs pages
 * avant de s'inscrire, l'URL du formulaire ne porte alors plus les UTM.
 * Lus par NewsletterForm à la soumission, transmis à Brevo via /api/newsletter.
 * Un nouvel atterrissage avec UTM écrase la capture précédente.
 */
export default function UtmCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!UTM_KEYS.some((key) => params.has(key))) return

    const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key) ?? '']))
    try {
      sessionStorage.setItem('wac_utm', JSON.stringify(utm))
    } catch {
      /* sessionStorage indisponible (navigation privée stricte) : non bloquant */
    }
  }, [])

  return null
}
