'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  variant?: 'hero' | 'footer'
  placeholder?: string
  buttonText?: string
}

export default function NewsletterForm({
  variant = 'hero',
  placeholder = 'ton@email.fr',
  buttonText = 'Je rejoins le mouvement'
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim()
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Merci ! Tu fais maintenant partie du mouvement.')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Oups, une erreur est survenue. Réessaye dans quelques instants.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erreur de connexion. Vérifie ta connexion internet et réessaye.')
      console.error('Newsletter subscription error:', error)
    }
  }

  if (variant === 'footer') {
    // Version simplifiée pour le CTA final (email uniquement)
    return (
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-6 py-4 text-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary-orange"
              style={{ fontFamily: 'var(--font-roboto)' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-secondary text-lg px-8 py-4 whitespace-nowrap"
            >
              {status === 'loading' ? 'Envoi...' : buttonText}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-sm" style={{ color: 'var(--color-primary-beige)' }}>
              {message}
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-300">
              {message}
            </p>
          )}
        </form>

        <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-75" style={{ color: 'var(--color-primary-beige)' }}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>0 spam. Désinscription en 1 clic.</span>
        </div>
      </div>
    )
  }

  // Version complète pour le hero (nom + email)
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ton prénom"
              required
              className="w-full px-4 py-3 border border-secondary-beige focus:outline-none focus:ring-2 focus:ring-secondary-orange"
              style={{ fontFamily: 'var(--font-roboto)' }}
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="w-full px-4 py-3 border border-secondary-beige focus:outline-none focus:ring-2 focus:ring-secondary-orange"
              style={{ fontFamily: 'var(--font-roboto)' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-secondary w-full md:w-auto md:px-12"
        >
          {status === 'loading' ? 'Envoi...' : buttonText}
        </button>

        {status === 'success' && (
          <p className="text-sm text-primary-green font-roboto">
            {message}
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600 font-roboto">
            {message}
          </p>
        )}
      </form>

      <p className="text-sm mt-3 opacity-75 font-roboto" style={{ color: 'var(--color-primary-green)' }}>
        En t'inscrivant, tu acceptes de recevoir nos emails sur le crowdfunding. Tu peux te désinscrire à tout moment.
      </p>
    </div>
  )
}
