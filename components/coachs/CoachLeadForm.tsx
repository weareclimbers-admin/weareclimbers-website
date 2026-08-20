'use client'

import { useState } from 'react'

/**
 * Formulaire lead B2B "WAC Coach" — qualifie le lead (structure + profil),
 * contrairement à la liste d'attente B2C (email seul).
 * POST → /api/coach-lead → Brevo (liste coachs dédiée).
 */
export default function CoachLeadForm() {
  const [name, setName] = useState('')
  const [structure, setStructure] = useState('')
  const [profil, setProfil] = useState('Coach indépendant')
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
        body: JSON.stringify({ name: name.trim(), structure: structure.trim(), profil, email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        window.umami?.track('demande-demo-coach')
        setStatus('success')
        setMessage(data.message || 'Merci ! On te recontacte très vite.')
        setName(''); setStructure(''); setEmail('')
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
        <p style={{ color: 'var(--color-primary-green)' }}>{message}</p>
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

      <input
        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="ton@email.fr" required
        className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange" style={inputStyle}
      />

      <button type="submit" disabled={status === 'loading'} className="btn-secondary w-full sm:w-auto sm:px-12">
        {status === 'loading' ? 'Envoi…' : 'Demander ma démo'}
      </button>

      {status === 'error' && <p className="text-sm text-red-600" style={{ fontFamily: 'var(--font-roboto)' }}>{message}</p>}

      <p className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
        On te recontacte pour te présenter WAC Coach en avant-première. 0 spam.
      </p>
    </form>
  )
}
