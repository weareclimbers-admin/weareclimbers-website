import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-light.png"
                alt="We Are Climbers"
                width={180}
                height={50}
                style={{ height: 'auto' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm mb-4">
              L'application et les bracelets connectés qui révolutionnent votre pratique de l'escalade.
            </p>
            <p style={{ fontFamily: 'var(--font-roboto)' }} className="text-xs opacity-75">
              © 2026 We Are Climbers. Tous droits réservés.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              textTransform: 'uppercase'
            }} className="text-sm mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/nos-grimpeurs" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Nos grimpeurs
                </Link>
              </li>
              <li>
                <Link href="/histoire" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link href="/le-bracelet" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Le bracelet
                </Link>
              </li>
              <li>
                <Link href="/l-app" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  L'app
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/rejoins-nous" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Rejoins le mouvement
                </Link>
              </li>
              <li>
                <Link href="/boutique" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Boutique
                </Link>
              </li>
              <li>
                <a href="https://coach.weareclimbers.fr/tarifs" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Offres coach
                </a>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              textTransform: 'uppercase'
            }} className="text-sm mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/le-bracelet#specs" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Spécifications Techniques
                </Link>
              </li>
              <li>
                <Link href="/engagements" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Nos engagements
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              textTransform: 'uppercase'
            }} className="text-sm mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/cookies" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Politique de Cookies
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" style={{ fontFamily: 'var(--font-roboto)' }} className="text-sm transition-colors hover:opacity-75">
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Badges & Contact */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              textTransform: 'uppercase'
            }} className="text-sm mb-4">Suivez-nous</h3>
            <div className="flex space-x-4 mb-6">
              {/* Instagram */}
              <a href="https://www.instagram.com/wac_weareclimbers/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-75" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61575132327572" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-75" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/we-are-climbers/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-75" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2 text-xs" style={{ fontFamily: 'var(--font-roboto)' }}>
              <div className="flex items-center gap-2">
                <span>🩸</span>
                <span>Cycle menstruel</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span>Éco-conçue</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🇫🇷</span>
                <span>Made in France</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
