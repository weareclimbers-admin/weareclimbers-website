import Link from 'next/link'

/**
 * Appel à l'action vers une offre WAC.
 * <CTA to="/le-bracelet" title="Optionnel" text="Optionnel" label="Optionnel" />
 *
 * Événement Umami au clic (nom figé, kebab-case FR comme les autres) :
 *   clic-cta-blog   data : cible (page visée), article (slug)
 * Umami n'est chargé qu'après consentement : sans effet sinon.
 */

const TARGETS = {
  '/le-bracelet': {
    title: 'Le bracelet choisi pour la grimpe',
    text: "Porté à l'avant-bras, sans écran, relié à l'app We Are Climbers.",
    label: 'Découvrir le bracelet',
  },
  '/l-app': {
    title: "L'app qui lit tes séances",
    text: 'Chaque matin, ton État de Forme résume ce que ton corps a vécu : récupération, sommeil et charge réelle.',
    label: "Découvrir l'app",
  },
  '/boutique': {
    title: 'La boutique We Are Climbers',
    text: 'Disponibilités, prix et livraison : toutes les infos sont sur la boutique.',
    label: 'Voir la boutique',
  },
  '/coachs': {
    title: 'Tu entraînes des grimpeurs ?',
    text: 'Ton tableau de bord te montre la forme du groupe et les grimpeurs à regarder en priorité.',
    label: "Découvrir l'offre coachs",
  },
} as const

export type CtaTarget = keyof typeof TARGETS
export const CTA_TARGETS = Object.keys(TARGETS) as CtaTarget[]

export interface CTAProps {
  to: CtaTarget
  title?: string
  text?: string
  label?: string
  /** Injecté par la page article, pas à renseigner dans le MDX */
  article?: string
}

export default function CTA({ to, title, text, label, article }: CTAProps) {
  const defaults = TARGETS[to]
  if (!defaults) {
    throw new Error(`[blog] <CTA to="${to}"> : cible non autorisée. Valeurs possibles : ${CTA_TARGETS.join(', ')}`)
  }
  return (
    <aside className="blog-dark rounded-[20px] bg-primary-green text-primary-beige p-6 md:p-8">
      <p className="font-syne font-bold uppercase text-xl md:text-2xl leading-tight tracking-tight">
        {title ?? defaults.title}
      </p>
      <p className="font-roboto text-base leading-relaxed mt-2 opacity-90">{text ?? defaults.text}</p>
      <Link
        href={to}
        className="btn-beige inline-block mt-5 no-underline"
        data-umami-event="clic-cta-blog"
        data-umami-event-cible={to}
        {...(article && { 'data-umami-event-article': article })}
      >
        {label ?? defaults.label}
      </Link>
    </aside>
  )
}
