import type { Testimonial } from '@/lib/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="p-8 shadow-lg" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
      {/* Header avec nom et niveau */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h4
            className="text-xl mb-1"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              color: 'var(--color-primary-green)'
            }}
          >
            {testimonial.name}
          </h4>
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-roboto)',
              color: 'var(--color-secondary-beige)'
            }}
          >
            {testimonial.level} • {testimonial.frequency}
          </p>
        </div>
        <div className="text-3xl">🧗</div>
      </div>

      {/* Citation */}
      <blockquote
        className="mb-6 whitespace-pre-line"
        style={{
          fontFamily: 'var(--font-roboto)',
          color: 'var(--color-primary-green)',
          lineHeight: '1.6',
          fontSize: '0.95rem'
        }}
      >
        &quot;{testimonial.quote}&quot;
      </blockquote>

      {/* Valeur incarnée */}
      <div
        className="text-sm font-medium pt-4 border-t"
        style={{
          fontFamily: 'var(--font-roboto)',
          color: 'var(--color-secondary-orange)',
          borderColor: 'var(--color-secondary-beige-light)'
        }}
      >
        → {testimonial.value}
      </div>
    </div>
  )
}
