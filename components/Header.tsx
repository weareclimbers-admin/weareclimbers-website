'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setMobileMenuOpen(false) // Close mobile menu when hiding
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navigation = [
    { name: 'Histoire', href: '/histoire' },
    { name: 'Nos grimpeurs', href: '/nos-grimpeurs' },
    { name: 'Capteurs', href: '/capteurs' },
    { name: 'Boutique', href: '/boutique' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header
      style={{
        backgroundColor: 'var(--color-primary-beige)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 9999
      }}
      className="fixed top-0 left-0 right-0 shadow-sm"
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-green.png"
              alt="We Are Climbers"
              width={180}
              height={50}
              priority
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  fontFamily: 'var(--font-syne)',
                  color: 'var(--color-primary-green)',
                  fontSize: '0.8rem'
                }}
                className="transition-colors hover:opacity-75 uppercase font-bold"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/rejoins-nous" className="btn-secondary-small">
              Rejoins le mouvement
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            style={{
              backgroundColor: 'var(--color-primary-beige)',
              borderRadius: '4px'
            }}
          >
            <svg
              className="w-6 h-6"
              style={{ color: 'var(--color-primary-green)' }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 relative z-40">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-syne)',
                    color: 'var(--color-primary-green)',
                    fontSize: '0.8rem'
                  }}
                  className="transition-colors hover:opacity-75 uppercase font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/rejoins-nous" className="btn-secondary-small inline-block text-center">
                Rejoins-nous
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
