'use client'

import { useState } from 'react'

/**
 * Formulaire lead B2B "WAC Coach" — qualifie le lead (structure + profil + tél),
 * contrairement à la liste d'attente B2C (email seul).
 * POST → /api/coach-lead → Brevo (liste coachs dédiée), PUIS ouverture immédiate
 * du popup de réservation Calendly pré-rempli (le coach choisit son créneau dans
 * la foulée, sans passer par un email intermédiaire).
 */

// Page de réservation Calendly (démo 45 min). Publique : peut vivre en clair.
const CALENDLY_DEMO_URL = 'https://calendly.com/julien-weareclimbers/45min'
const CALENDLY_WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css'

/**
 * Charge à la demande le CSS + JS du widget Calendly (une seule fois), sur le
 * même principe que l'injection Umami. Résout dès que `window.Calendly` est prêt.
 */
function ensureCalendly(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if (window.Calendly) return resolve()

    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_WIDGET_CSS
      link.setAttribute('data-calendly', '')
      document.head.appendChild(link)
    }

    const existing = document.querySelector('script[data-calendly]') as HTMLScriptElement | null
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('calendly load error')))
      return
    }

    const script = document.createElement('script')
    script.src = CALENDLY_WIDGET_JS
    script.async = true
    script.setAttribute('data-calendly', '')
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('calendly load error'))
    document.head.appendChild(script)
  })
}

interface CalendlyPrefill {
  name: string
  email: string
  phone: string
  structure: string
}

/**
 * Ouvre le popup Calendly pré-rempli (nom + email + questions perso Q1 tél / Q2
 * structure). Fallback : si le script Calendly ne charge pas (bloqueur…), on
 * ouvre la page de réservation dans un nouvel onglet.
 */
async function openCalendly({ name, email, phone, structure }: CalendlyPrefill) {
  try {
    await ensureCalendly()
    window.Calendly?.initPopupWidget({
      url: CALENDLY_DEMO_URL,
      prefill: {
        name,
        email,
        customAnswers: { a1: phone, a2: structure },
      },
    })
  } catch {
    window.open(CALENDLY_DEMO_URL, '_blank', 'noopener,noreferrer')
  }
}

export default function CoachLeadForm() {
  const [name, setName] = useState('')
  const [structure, setStructure] = useState('')
  const [profil, setProfil] = useState('Coach indépendant')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/coach-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          structure: structure.trim(),
          profil,
          phone: phone.trim(),
          email: email.trim(),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        window.umami?.track('demande-demo-coach')
        setStatus('success')
        setMessage(data.message || 'Ta demande est enregistrée. Choisis ton créneau pour la démo.')
        // Ouvre le popup de réservation pré-rempli dans la foulée.
        openCalendly({ name: name.trim(), email: email.trim(), phone: phone.trim(), structure: structure.trim() })
      } else {
        setStatus('error')
        setMessage(data.error || 'Oups, une erreur est survenue. Réessaye.')
      }
    } catch {
      setStatus('error')
      setMessage('Erreur de connexion. Réessaye dans un instant.')
    }
  }

  const inputStyle = {
    fontFamily: 'var(--font-roboto)',
    backgroundColor: 'var(--color-primary-beige)',
    color: 'var(--color-primary-green)',
    border: '2px solid var(--color-primary-green)',
  } as const

  if (status === 'success') {
    return (
      <div
        className="max-w-xl mx-auto p-8 text-center"
        style={{ backgroundColor: 'var(--color-primary-beige)', border: '2px solid var(--color-primary-green)' }}
      >
        <p className="text-2xl mb-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: 'var(--color-primary-green)', textTransform: 'uppercase' }}>
          C'est noté 🤝
        </p>
        <p className="mb-6" style={{ color: 'var(--color-primary-green)' }}>{message}</p>
        <button
          type="button"
          onClick={() => openCalendly({ name: name.trim(), email: email.trim(), phone: phone.trim(), structure: structure.trim() })}
          className="btn-secondary w-full sm:w-auto sm:px-12"
        >
          Choisir mon créneau
        </button>
        <p className="mt-4 text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
          La fenêtre de réservation s'est ouverte. Elle ne s'affiche pas&nbsp;? Clique ci-dessus.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Ton prénom" required
          className="px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange" style={inputStyle}
        />
        <input
          type="text" value={structure} onChange={(e) => setStructure(e.target.value)}
          placeholder="Ton club / ta structure"
          className="px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange" style={inputStyle}
        />
      </div>

      <select
        value={profil} onChange={(e) => setProfil(e.target.value)}
        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange" style={inputStyle}
      >
        <option>Coach indépendant</option>
        <option>Club</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.fr" required
          className="px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange" style={inputStyle}
        />
        <input
          type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder="Ton téléphone" required
          className="px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange" style={inputStyle}
        />
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-secondary w-full sm:w-auto sm:px-12">
        {status === 'loading' ? 'Envoi…' : 'Réserver ma démo'}
      </button>

      {status === 'error' && <p className="text-sm text-red-600" style={{ fontFamily: 'var(--font-roboto)' }}>{message}</p>}

      <p className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
        On enregistre ta demande et tu choisis ton créneau dans la foulée. 0 spam.
      </p>
    </form>
  )
}
