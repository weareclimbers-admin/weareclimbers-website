import Image from 'next/image'
import type { Pack } from '@/lib/campaign'

/**
 * Carte d'une contrepartie Ulule.
 * Gère 3 états visuels :
 *  - Épuisée (soldOut: true) : opacity réduite, prix barré, CTA désactivé "Pack épuisé"
 *  - Stock limité (stockLeft: number) : badge "Plus que X", CTA → reward Ulule
 *  - Stock illimité (stockLeft: null) : badge "Disponible", CTA → reward Ulule
 *
 * La carte est mise en avant (border orange) si pack.highlight === true.
 */
export default function PackCard({ pack, animationDelay = 0 }: { pack: Pack; animationDelay?: number }) {
  const isSoldOut = pack.soldOut
  const hasLimitedStock = !isSoldOut && pack.stockLeft !== null && pack.stockLeft > 0
  const isUnlimited = !isSoldOut && pack.stockLeft === null

  const badgeLabel = isSoldOut
    ? 'Épuisé'
    : hasLimitedStock
      ? `Plus que ${pack.stockLeft}`
      : 'Disponible'

  const badgeBg = isSoldOut
    ? 'var(--color-primary-green)'
    : 'var(--color-secondary-orange)'

  const borderStyle = pack.highlight
    ? '3px solid var(--color-secondary-orange)'
    : undefined

  return (
    <div
      className="p-8 relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: 'var(--color-primary-beige)',
        border: borderStyle,
      }}
      data-aos="fade-up"
      data-aos-delay={animationDelay}
    >
      {/* Badge */}
      <div
        className="absolute top-4 right-4 px-3 py-1 text-xs font-bold z-10"
        style={{
          backgroundColor: badgeBg,
          color: 'var(--color-primary-beige)',
          fontFamily: 'var(--font-syne)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {badgeLabel}
      </div>

      {/* Visuel */}
      <div
        className="relative aspect-square w-full mb-6 overflow-hidden"
        style={isSoldOut ? { opacity: 0.5 } : undefined}
      >
        <Image src={pack.imageUrl} alt={pack.imageAlt} fill className="object-contain" />
      </div>

      {/* Nom */}
      <h3
        className="text-2xl md:text-3xl mb-4"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          color: 'var(--color-primary-green)',
          textTransform: 'uppercase',
        }}
      >
        {pack.name}
      </h3>

      {/* Prix */}
      <div className="mb-6">
        <span
          className="text-4xl md:text-5xl font-bold"
          style={{
            fontFamily: 'var(--font-syne)',
            color: pack.highlight && !isSoldOut ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)',
            ...(isSoldOut ? { textDecoration: 'line-through', opacity: 0.6 } : {}),
          }}
        >
          {pack.price}€
        </span>
      </div>

      {/* Perks */}
      <ul className="space-y-3 mb-8 flex-1" style={isSoldOut ? { opacity: 0.6 } : undefined}>
        {pack.perks.map((perk, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold mt-1"
              style={{
                backgroundColor: 'var(--color-secondary-orange)',
                color: 'var(--color-primary-beige)',
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontFamily: 'var(--font-roboto)',
                color: 'var(--color-primary-green)',
                lineHeight: '1.6',
              }}
            >
              {perk}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {isSoldOut ? (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full block text-center py-3 px-6 cursor-not-allowed"
          style={{
            backgroundColor: 'var(--color-secondary-beige)',
            color: 'var(--color-primary-beige)',
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          Pack épuisé
        </button>
      ) : (
        <a
          href={pack.ululeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full block text-center"
        >
          Je soutiens WAC
        </a>
      )}
    </div>
  )
}
