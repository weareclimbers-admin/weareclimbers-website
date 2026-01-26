interface BadgeProps {
  icon: string
  text: string
  className?: string
}

export default function Badge({ icon, text, className = '' }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm ${className}`}
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}
