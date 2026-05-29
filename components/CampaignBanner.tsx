import { CAMPAIGN, buildBannerStockLine } from '@/lib/campaign'
import CountdownTimer from './CountdownTimer'

/**
 * Bandeau campagne Ulule.
 * Placé en haut de la home, sticky sous le Header fixe pendant le scroll.
 * Non fermable (durée de campagne courte, on garde le CTA visible).
 * Le texte "stock restant" est généré dynamiquement depuis CONTREPARTIES dans lib/campaign.ts.
 */
export default function CampaignBanner() {
  const stockLine = buildBannerStockLine()

  return (
    <div
      className="sticky z-40 w-full shadow-md"
      style={{
        top: '80px',
        backgroundColor: 'var(--color-secondary-orange)',
        color: 'var(--color-primary-beige)',
      }}
      role="region"
      aria-label="Campagne Ulule en cours"
    >
      <div className="container-custom py-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
          {/* Texte principal */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base"
            style={{ fontFamily: 'var(--font-roboto)' }}
          >
            <span className="font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syne)' }}>
              {stockLine}
            </span>
            <span className="hidden md:inline opacity-60">•</span>
            <CountdownTimer variant="compact" />
          </div>

          {/* CTA */}
          <a
            href={CAMPAIGN.ululeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2 text-sm font-bold uppercase whitespace-nowrap transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'var(--font-syne)',
              backgroundColor: 'var(--color-primary-green)',
              color: 'var(--color-primary-beige)',
            }}
          >
            Je soutiens WAC
          </a>
        </div>
      </div>
    </div>
  )
}
