import Image from 'next/image'
import type { PressArticle } from '@/lib/press'

type Variant = 'full' | 'medium' | 'compact'

interface PressFeatureProps {
  article: PressArticle
  /**
   * full    — home : coupure pleine largeur + (logo centré + citation + CTA) en dessous
   * medium  — rejoins-nous : logo centré + citation + CTA (sans coupure)
   * compact — boutique : fine barre logo + citation courte + lien
   */
  variant?: Variant
}

const LABEL = 'Ils parlent de nous'

// Dimensions natives des visuels (public/images/presse/)
const ARTICLE_W = 1106
const ARTICLE_H = 469

function Label() {
  return (
    <p
      className="text-sm md:text-base mb-8 font-bold uppercase text-center"
      style={{
        fontFamily: 'var(--font-syne)',
        letterSpacing: '0.1em',
        color: 'var(--color-secondary-orange)',
      }}
    >
      {LABEL}
    </p>
  )
}

function Cta({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-bold hover:underline"
      style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-secondary-orange)' }}
    >
      Lire l’article →
    </a>
  )
}

export default function PressFeature({ article, variant = 'full' }: PressFeatureProps) {
  if (variant === 'compact') {
    return (
      <div
        className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 px-6 py-5"
        style={{ backgroundColor: 'var(--color-primary-beige)' }}
        data-aos="fade-up"
      >
        <div className="relative flex-shrink-0" style={{ width: '135px', height: '90px' }}>
          <Image src={article.logo} alt={article.media} fill className="object-contain" />
        </div>
        <p
          className="text-sm md:text-base italic text-center sm:text-left flex-1"
          style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: '1.5' }}
        >
          “{article.quote}”
        </p>
        <div className="flex-shrink-0 whitespace-nowrap">
          <Cta url={article.url} />
        </div>
      </div>
    )
  }

  // full & medium : layout centré sur une colonne. "full" ajoute la coupure en haut.
  return (
    <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
      <Label />

      {/* Coupure pleine largeur (full uniquement) */}
      {variant === 'full' && article.image && (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-10 overflow-hidden shadow-lg group"
        >
          <Image
            src={article.image}
            alt={`Article ${article.media} — We Are Climbers`}
            width={ARTICLE_W}
            height={ARTICLE_H}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>
      )}

      {/* Logo média — centré, agrandi */}
      <div className="relative mx-auto mb-6" style={{ width: '210px', height: '140px' }}>
        <Image src={article.logo} alt={article.media} fill className="object-contain" />
      </div>

      {/* Citation */}
      <blockquote className="mb-6">
        <p
          className="text-xl md:text-2xl italic"
          style={{
            fontFamily: 'var(--font-roboto)',
            color: 'var(--color-primary-green)',
            lineHeight: '1.5',
          }}
        >
          “{article.quote}”
        </p>
        <footer
          className="mt-4 text-base font-bold"
          style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)' }}
        >
          — {article.media}, {article.date}
        </footer>
      </blockquote>

      <Cta url={article.url} />
    </div>
  )
}
