import Image from 'next/image'

export interface FigureProps {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  credit?: string
}

/**
 * <Figure src="/images/blog/slug/schema.webp" alt="…" width={1600} height={900} caption="…" />
 * alt, width et height sont obligatoires, l'image doit être un .webp de public/ :
 * sinon le build échoue.
 */
export default function Figure({ src, alt, width, height, caption, credit }: FigureProps) {
  const problems: string[] = []
  if (typeof src !== 'string' || !src.startsWith('/') || !src.toLowerCase().endsWith('.webp')) {
    problems.push(`src doit être un chemin /… vers un .webp (reçu : ${JSON.stringify(src)})`)
  }
  if (typeof alt !== 'string' || !alt.trim()) problems.push('alt manquant')
  if (typeof width !== 'number' || width <= 0) problems.push('width manquant (nombre, ex. width={1600})')
  if (typeof height !== 'number' || height <= 0) problems.push('height manquant (nombre, ex. height={900})')
  if (problems.length > 0) {
    throw new Error(`[blog] <Figure> invalide : ${problems.join(' ; ')}`)
  }

  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 672px, 100vw"
        className="w-full h-auto rounded-[14px]"
      />
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm font-roboto opacity-85 leading-snug">
          {caption}
          {credit && <span className="block text-xs mt-1">Crédit : {credit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
