'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'

export default function Contact() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.weareclimbers.fr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: 'https://www.weareclimbers.fr/contact'
      }
    ]
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Message envoyé avec succès !',
        })
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Une erreur est survenue. Réessaye dans quelques instants.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erreur de connexion. Vérifie ta connexion internet et réessaye.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section
          className="pt-32 pb-12 md:py-32 relative"
          style={{
            color: 'var(--color-primary-beige)'
          }}
        >
          {/* Background Image */}
          <Image
            src="/hero-contact.webp"
            alt="Contactez We Are Climbers"
            fill
            priority={true}
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary-green opacity-70 z-0"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl mb-6">
                Contact
              </h1>
              <p className="text-lg md:text-xl font-roboto">
                Une question ? Une suggestion ? N'hésitez pas à nous contacter
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-xs opacity-50 z-10">
            © astronaud23
          </div>
        </section>
        

        {/* Contact Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl mb-8 text-primary-green">
                  Envoyez-nous un message
                </h2>

                {/* Message de succès/erreur */}
                {submitStatus.type && (
                  <div
                    className={`p-4 mb-6 ${
                      submitStatus.type === 'success'
                        ? 'bg-green-100 border-l-4 border-green-500 text-green-700'
                        : 'bg-red-100 border-l-4 border-red-500 text-red-700'
                    }`}
                  >
                    <p className="font-roboto">{submitStatus.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-roboto mb-2 text-primary-green">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-beige focus:outline-none focus:ring-2 focus:ring-secondary-orange"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-roboto mb-2 text-primary-green">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-beige focus:outline-none focus:ring-2 focus:ring-secondary-orange"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-roboto mb-2 text-primary-green">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-beige focus:outline-none focus:ring-2 focus:ring-secondary-orange"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="support">Support technique</option>
                      <option value="bracelet">Bracelets connectés</option>
                      <option value="partnership">Partenariat</option>
                      <option value="press">Presse</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-roboto mb-2 text-primary-green">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-beige focus:outline-none focus:ring-2 focus:ring-secondary-orange resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-secondary w-full ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl mb-8 text-primary-green">
                  Informations
                </h2>

                <div className="space-y-8">
                  <div className="p-6 shadow-md" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                    <h3 className="text-xl mb-3 text-primary-green">Email</h3>
                    <p className="font-roboto text-primary-green">
                      <a href="mailto:contact@weareclimbers.fr" className="hover:text-secondary-orange">
                        contact@weareclimbers.fr
                      </a>
                    </p>
                  </div>

                  <div className="p-6 shadow-md" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                    <h3 className="text-xl mb-3 text-primary-green">Support</h3>
                    <p className="font-roboto text-primary-green">
                      <a href="mailto:support@weareclimbers.fr" className="hover:text-secondary-orange">
                        support@weareclimbers.fr
                      </a>
                    </p>
                    <p className="font-roboto text-sm mt-2 text-primary-green opacity-75">
                      Réponse sous 24-48h
                    </p>
                  </div>

                  <div className="p-6 shadow-md" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                    <h3 className="text-xl mb-3 text-primary-green">Réseaux sociaux</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-primary-green hover:text-secondary-orange transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-primary-green hover:text-secondary-orange transition-colors">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="bg-secondary-beige-light p-6">
                    <h3 className="text-xl mb-3 text-primary-green">FAQ</h3>
                    <p className="font-roboto mb-3 text-primary-green">
                      Consultez notre FAQ pour trouver rapidement des réponses aux questions les plus fréquentes.
                    </p>
                    <a href="#" className="text-secondary-orange font-roboto hover:underline">
                      Voir la FAQ →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
