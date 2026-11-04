'use client'

import { Reveal } from '@/components/Reveal'
import { APP_PROOF, STORE_REVIEWS } from '@/lib/proof'

/**
 * Avis réels de l'App Store et de Google Play (lib/proof.ts), texte non retouché.
 * Même présentation que la section avis de la boutique. Jamais de témoignage inventé.
 */
export default function StoreReviews({ className = 'py-20 md:py-24' }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container-custom">
        <Reveal>
          <h2
            className="text-3xl md:text-5xl mb-3 text-center"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
          >
            Ils grimpent déjà avec l&apos;app.
          </h2>
          <p
            className="text-center mb-10 text-sm md:text-base"
            style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.8 }}
          >
            Avis publiés sur l&apos;App Store et Google Play · l&apos;app est notée {APP_PROOF.storeRating}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {STORE_REVIEWS.map((review, i) => (
            <Reveal key={review.author} delay={i * 0.08}>
              <figure
                className="h-full flex flex-col p-6 rounded-[20px]"
                style={{ backgroundColor: 'var(--color-secondary-beige-light)', border: '2px solid var(--color-primary-green)' }}
              >
                <p aria-label="5 étoiles sur 5" className="mb-3 text-lg tracking-[0.15em]" style={{ color: 'var(--color-secondary-orange)' }}>
                  ★★★★★
                </p>
                <blockquote
                  className="flex-1 mb-5"
                  style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}
                >
                  « {review.text} »
                </blockquote>
                <figcaption className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.75 }}>
                  <strong className="text-sm" style={{ fontFamily: 'var(--font-syne)', opacity: 1 }}>
                    {review.author}
                  </strong>
                  <br />
                  Avis {review.source} · {review.date}
                  {review.excerpt ? ' · Extrait' : ''}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
