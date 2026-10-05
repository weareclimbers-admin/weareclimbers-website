import { CAMPAIGN, getBannerConfig, WAITLIST } from '@/lib/campaign'
import CountdownTimer from './CountdownTimer'

/**
 * Bandeau d'annonce — strip compact rendu EN HAUT du Header fixe (voir Header.tsx).
 * Piloté par la phase active (lib/campaign.ts) :
 * - 'ulule-live'       : message stock + compte à rebours Ulule + CTA Ulule
 * - 'campaign-success' : message succès + CTA liste d'attente (pas de compte à rebours)
 * - 'precommande-live' : « pré-commandes jusqu'au 31 octobre » + compte à rebours + CTA boutique
 *
 * Hauteur volontairement contenue et contenu non-wrap : le Header grandit d'autant,
 * et toutes les premières sections (pt-32 min) le dégagent sans chevauchement.
 */
export default function CampaignBanner() {
  const banner = getBannerConfig()
  if (!banner) return null

  const { text, cta } = banner
  const isUluleLive = CAMPAIGN.phase === 'ulule-live'
  const isPreorderLive = CAMPAIGN.phase === 'precommande-live'
  const showCountdown = isUluleLive || isPreorderLive
  const countdownEnd = isPreorderLive ? CAMPAIGN.preorderEndDate : CAMPAIGN.endDate

  // Destination du CTA selon sa nature
  const href = cta.kind === 'waitlist' ? WAITLIST.anchor : cta.href ?? '#'
  const isExternal = cta.kind === 'ulule'

  return (
    <div
      className="w-full overflow-hidden"
      style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)' }}
      role="region"
      aria-label="Actualité We Are Climbers"
    >
      <div className="container-custom py-2">
        <div className="flex flex-nowrap items-center justify-center gap-2.5 md:gap-5 text-center">
          {/* Texte principal — masqué sur très petit écran pour rester sur une ligne */}
          <span
            className="hidden sm:inline font-bold uppercase tracking-wide text-xs md:text-sm whitespace-nowrap"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {text}
          </span>

          {showCountdown && (
            <>
              <span className="hidden sm:inline opacity-50">•</span>
              <span className="text-xs md:text-sm whitespace-nowrap" style={{ fontFamily: 'var(--font-syne)' }}>
                <CountdownTimer variant="compact" endDate={countdownEnd} />
              </span>
            </>
          )}

          <a
            href={href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex-shrink-0 px-3 py-1 text-xs md:text-sm font-bold uppercase whitespace-nowrap transition-opacity hover:opacity-90"
            style={{
              fontFamily: 'var(--font-syne)',
              backgroundColor: 'var(--color-primary-green)',
              color: 'var(--color-primary-beige)',
            }}
          >
            {cta.label} →
          </a>
        </div>
      </div>
    </div>
  )
}
