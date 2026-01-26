interface TimelineStepProps {
  stepNumber: number
  title: string
  items: string[]
  isActive?: boolean
}

export default function TimelineStep({ stepNumber, title, items, isActive = false }: TimelineStepProps) {
  return (
    <div className="relative" data-aos="fade-up" data-aos-delay={stepNumber * 100}>
      {/* Numéro de l'étape */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
        style={{
          backgroundColor: isActive ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)',
          color: 'var(--color-primary-beige)',
          fontFamily: 'var(--font-syne)',
          fontSize: '1.5rem',
          fontWeight: 700
        }}
      >
        {stepNumber}
      </div>

      {/* Titre */}
      <h3
        className="text-xl md:text-2xl mb-4 text-center"
        style={{
          color: isActive ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)',
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}
      >
        {title}
      </h3>

      {/* Liste des items */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span
              className="mt-1.5 flex-shrink-0"
              style={{ color: isActive ? 'var(--color-secondary-orange)' : 'var(--color-primary-green)' }}
            >
              →
            </span>
            <span className="font-roboto" style={{ color: 'var(--color-primary-green)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
