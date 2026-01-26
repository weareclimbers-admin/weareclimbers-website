interface BenefitCardProps {
  icon: string
  title: string
  description: string
  delay?: number
}

export default function BenefitCard({ icon, title, description, delay = 0 }: BenefitCardProps) {
  return (
    <div
      className="p-6 shadow-md hover:shadow-lg transition-shadow h-full"
      style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl mb-3" style={{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-syne)' }}>
        {title}
      </h3>
      <p className="font-roboto" style={{ color: 'var(--color-primary-green)' }}>
        {description}
      </p>
    </div>
  )
}
