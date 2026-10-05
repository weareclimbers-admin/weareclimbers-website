import { STORES } from '@/lib/stores'

/**
 * Boutons de téléchargement App Store / Google Play — composant partagé.
 * Tracking Umami figé : `clic-app-store` / `clic-play-store` (cf. projet tracking UTM).
 *
 * `theme` :
 *   - 'light' (défaut) : boutons verts sur texte beige → pour fonds clairs (beige).
 *   - 'dark'           : boutons beige sur texte vert → pour fonds verts.
 */

type Store = 'apple' | 'google'
type Theme = 'light' | 'dark'

function StoreIcon({ store }: { store: Store }) {
  return store === 'apple' ? (
    <svg viewBox="0 0 384 512" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  ) : (
    <svg viewBox="0 0 512 512" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  )
}

/** Bouton store unique — passe en « Bientôt disponible » tant que le lien est null. */
export function StoreButton({
  store,
  href,
  theme = 'light',
}: {
  store: Store
  href: string | null
  theme?: Theme
}) {
  const label = store === 'apple' ? 'App Store' : 'Google Play'
  const colors =
    theme === 'dark'
      ? { backgroundColor: 'var(--color-primary-beige)', color: 'var(--color-primary-green)' }
      : { backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }

  if (!href) {
    return (
      <div
        aria-disabled
        className="flex flex-1 items-center justify-center gap-3 border-2 border-dashed border-[rgba(38,83,53,0.3)] px-6 py-4 opacity-60"
        style={{ borderRadius: 20 }}
      >
        <StoreIcon store={store} />
        <span className="text-left leading-tight">
          <span className="block text-xs uppercase tracking-wide">Bientôt sur</span>
          <span className="block font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
            {label}
          </span>
        </span>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event={store === 'apple' ? 'clic-app-store' : 'clic-play-store'}
      className="flex flex-1 items-center justify-center gap-3 px-6 py-4 transition-transform hover:-translate-y-0.5"
      style={{ borderRadius: 20, ...colors }}
    >
      <StoreIcon store={store} />
      <span className="text-left leading-tight">
        <span className="block text-xs uppercase tracking-wide opacity-80">Télécharger sur</span>
        <span className="block font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
          {label}
        </span>
      </span>
    </a>
  )
}

/** Paire App Store + Google Play, câblée sur les liens officiels (lib/stores.ts). */
export default function StoreButtons({
  className = '',
  theme = 'light',
}: {
  className?: string
  theme?: Theme
}) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <StoreButton store="apple" href={STORES.appStoreUrl} theme={theme} />
      <StoreButton store="google" href={STORES.playStoreUrl} theme={theme} />
    </div>
  )
}
