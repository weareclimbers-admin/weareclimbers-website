import Link from 'next/link'
import type { PricingPlan } from '@/lib/pricing'

interface PricingCardProps {
  plan: PricingPlan
}

export default function PricingCard({ plan }: PricingCardProps) {
  const isRecommended = plan.recommended
  const isFree = plan.price === 0

  return (
    <div
      className={`relative p-8 shadow-lg flex flex-col ${
        isRecommended ? 'ring-2 ring-secondary-orange' : ''
      }`}
      style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
    >
      {/* Badge recommandé */}
      {isRecommended && (
        <div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-6 py-1 text-xs font-bold whitespace-nowrap text-center"
          style={{
            backgroundColor: 'var(--color-secondary-orange)',
            color: 'var(--color-primary-beige)',
            fontFamily: 'var(--font-syne)',
            textTransform: 'uppercase'
          }}
        >
          ⭐ Le plus populaire
        </div>
      )}

      {/* Nom du pack */}
      <h3
        className={`text-2xl mb-4 ${isRecommended ? 'mt-12' : ''}`}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: 'var(--color-primary-green)'
        }}
      >
        {plan.name}
      </h3>

      {/* Prix */}
      <div className="mb-6">
        <span
          className="text-5xl font-bold"
          style={{ color: 'var(--color-primary-green)' }}
        >
          {plan.price}€
        </span>
        {!isFree && (
          <span
            className="text-sm ml-2"
            style={{
              fontFamily: 'var(--font-roboto)',
              color: 'var(--color-secondary-beige)'
            }}
          >
            achat unique
          </span>
        )}
      </div>

      {/* Séparateur */}
      <div
        className="h-px mb-6"
        style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
      />

      {/* Features incluses */}
      <ul className="space-y-3 mb-6 flex-grow">
        {plan.features.included.map((feature, index) => (
          <li
            key={index}
            className="flex items-start"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            <span
              className="mr-2 mt-1"
              style={{ color: 'var(--color-primary-green)' }}
            >
              ✓
            </span>
            <span style={{ color: 'var(--color-primary-green)' }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Features exclues (pour le pack gratuit) */}
      {plan.features.excluded && (
        <ul className="space-y-3 mb-6 opacity-50">
          {plan.features.excluded.map((feature, index) => (
            <li
              key={index}
              className="flex items-start"
              style={{ fontFamily: 'var(--font-roboto)' }}
            >
              <span
                className="mr-2 mt-1"
                style={{ color: 'var(--color-secondary-beige)' }}
              >
                ✗
              </span>
              <span style={{ color: 'var(--color-secondary-beige)' }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <Link
        href={plan.ctaLink}
        className={`block w-full text-center mt-auto ${
          isFree ? 'btn-primary' : 'btn-secondary'
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  )
}
