import Link from 'next/link'
import NewsletterForm from './NewsletterForm'
import { WAITLIST, CAMPAIGN } from '@/lib/campaign'

/**
 * Section CTA de fin de page réutilisable — cible #liste-attente de tous les CTA du site.
 * Phase-aware (lib/campaign.ts) :
 *   - avant l'ouverture : formulaire liste d'attente (Brevo)
 *   - 'precommande-live' : CTA direct vers la boutique (la liste d'attente n'existe plus)
 *
 * `heading` / `subtitle` permettent d'adapter l'accroche au contexte de la page.
 * En phase 'precommande-live', le sous-titre est forcé sur le message pré-commande
 * (les sous-titres passés par les pages sont orientés liste d'attente).
 */
const PREORDER_SUBTITLE =
  "Les pré-commandes sont ouvertes. Réserve ton bracelet Polar 360 + l'app au tarif de lancement, en quantités limitées."

export default function WaitlistSection({
  heading = WAITLIST.formTitle,
  subtitle,
}: {
  heading?: string
  subtitle?: string
}) {
  const isPreorder = CAMPAIGN.phase === 'precommande-live'
  const resolvedSubtitle = isPreorder ? PREORDER_SUBTITLE : subtitle ?? WAITLIST.formSubtitle

  return (
    <section
      id="liste-attente"
      className="py-20 scroll-mt-32"
      style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}
    >
      <div className="container-custom text-center" data-aos="fade-up">
        {/* Preuve sociale */}
        <span
          className="inline-block mb-6 px-4 py-1 text-sm font-bold uppercase tracking-wide"
          style={{
            fontFamily: 'var(--font-syne)',
            backgroundColor: 'var(--color-secondary-orange)',
            color: 'var(--color-primary-beige)',
          }}
        >
          Objectif 100 % atteint — merci à la cordée
        </span>

        <h2
          className="text-3xl md:text-5xl mb-6"
          style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase' }}
        >
          {heading}
        </h2>

        <p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.6' }}
        >
          {resolvedSubtitle}
        </p>

        {isPreorder ? (
          <Link href="/boutique" className="btn-secondary inline-block">
            Je précommande →
          </Link>
        ) : (
          <NewsletterForm variant="footer" buttonText={WAITLIST.buttonText} />
        )}
      </div>
    </section>
  )
}
