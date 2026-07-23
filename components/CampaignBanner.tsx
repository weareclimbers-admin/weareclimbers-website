import { CAMPAIGN, getBannerConfig, WAITLIST } from '@/lib/campaign'
import CountdownTimer from './CountdownTimer'

/**
 * Bandeau haut de page, piloté par la phase active (lib/campaign.ts).
 * Placé sous le Header fixe, sticky pendant le scroll.
 * - phase 'ulule-live'       : stock + compte à rebours + CTA Ulule
 * - phase 'campaign-success' : message succès + CTA liste d'attente
 * - phase 'precommande-live' : message pré-commandes + CTA checkout
 */
export default function CampaignBanner() {
  const banner = getBannerConfig()
  if (!banner) return null

  const { text, cta } = banner
  const isUluleLive = CAMPAIGN.phase === 'ulule-live'

  // Destination du CTA selon sa nature
  const href = cta.kind === 'waitlist' ? WAITLIST.anchor : cta.href ?? '#'
  const isExternal = cta.kind === 'ulule'

  return (
    <div
      className="sticky z-40 w-full shadow-md"
      style={{
        top: '80px',
        backgroundColor: 'var(--color-secondary-orange)',
        color: 'var(--color-primary-beige)',
      }}
      role="region"
      aria-label="Actualité We Are Climbers"
    >
      <div className="container-custom py-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
          {/* Texte principal */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            <span className="font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syne)' }}>
              {text}
            </span>
            {isUluleLive && (
              <>
                <span className="hidden md:inline opacity-60">•</span>
                <CountdownTimer variant="compact" />
              </>
            )}
          </div>

          {/* CTA */}
          <a
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-block px-5 py-2 text-sm font-bold uppercase whitespace-nowrap transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'var(--font-syne)',
              backgroundColor: 'var(--color-primary-green)',
              color: 'var(--color-primary-beige)',
            }}
          >
            {cta.label}
          </a>
        </div>
      </div>
    </div>
  )
}
