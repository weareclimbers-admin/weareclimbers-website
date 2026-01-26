import type { Value } from '@/lib/values'
import Image from 'next/image'

interface ValuePillarProps {
  value: Value
}

export default function ValuePillar({ value }: ValuePillarProps) {
  const { icon, title, description } = value
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-12 h-12 relative">
        <Image
          src={icon}
          alt=""
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <h3
        className="text-xl md:text-2xl"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          color: 'var(--color-primary-green)'
        }}
      >
        {title}
      </h3>
      <p
        className="text-base leading-relaxed"
        style={{
          fontFamily: 'var(--font-roboto)',
          color: 'var(--color-primary-green)',
          lineHeight: '1.6'
        }}
      >
        {description}
      </p>
    </div>
  )
}
