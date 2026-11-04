import type { ComponentProps } from 'react'
import Link from 'next/link'
import Figure from './Figure'
import Callout from './Callout'
import { FAQ, Question } from './FAQ'
import CTA from './CTA'

/**
 * Composants disponibles dans les articles MDX, sans import :
 * <Figure>, <Callout>, <FAQ> + <Question>, <CTA>.
 * Le slug de l'article est transmis au CTA pour l'événement Umami.
 */
export function getMdxComponents(articleSlug: string) {
  return {
    Figure,
    Callout,
    FAQ,
    Question,
    CTA: (props: ComponentProps<typeof CTA>) => <CTA {...props} article={articleSlug} />,
    // Liens internes : pas de nouvel onglet ; liens externes : nouvel onglet signalé.
    a: ({ href = '', children, ...rest }: ComponentProps<'a'>) =>
      /^https?:\/\//.test(href) ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      ) : href.startsWith('/') ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} {...rest}>
          {children}
        </a>
      ),
    // Les images markdown ![]() sont refusées : passer par <Figure> (WebP, dimensions, alt).
    img: () => {
      throw new Error('[blog] image markdown ![…](…) interdite : utilise <Figure src alt width height />')
    },
  }
}
