'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { FAQItem as FAQItemType } from '@/lib/faq'

interface FAQItemProps {
  item: FAQItemType
}

export default function FAQItem({ item }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--color-secondary-beige-light)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left transition-colors hover:opacity-75"
        aria-expanded={isOpen}
      >
        <span
          className="text-lg font-medium pr-4 flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-roboto)',
            color: 'var(--color-primary-green)'
          }}
        >
          <Image src="/icons/icons8-point-d'interrogation-30.png" alt="" width={20} height={20} className="object-contain flex-shrink-0" />
          {item.question}
        </span>
        <span
          className="text-2xl flex-shrink-0 transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--color-secondary-orange)'
          }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          className="pb-6 whitespace-pre-line"
          style={{
            fontFamily: 'var(--font-roboto)',
            color: 'var(--color-primary-green)',
            lineHeight: '1.6'
          }}
        >
          {item.answer}
        </div>
      )}
    </div>
  )
}
