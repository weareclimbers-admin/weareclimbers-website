import NewsletterForm from './NewsletterForm'
import { WAITLIST } from '@/lib/campaign'

/**
 * Section liste d'attente réutilisable — cible de tous les CTA "waitlist" du site (#liste-attente).
 * Affiche la preuve sociale (objectif 100 % atteint) + le formulaire Brevo.
 *
 * À placer en bas des pages pendant l'entre-deux (Ulule terminé → pré-commandes en propre).
 * `heading` / `subtitle` permettent d'adapter l'accroche au contexte de la page.
 */
export default function WaitlistSection({
  heading = WAITLIST.formTitle,
  subtitle = WAITLIST.formSubtitle,
}: {
  heading?: string
  subtitle?: string
}) {
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
          {subtitle}
        </p>

        <NewsletterForm variant="footer" buttonText={WAITLIST.buttonText} />
      </div>
    </section>
  )
}
