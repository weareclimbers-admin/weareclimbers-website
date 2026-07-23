'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useState } from 'react'

/**
 * Cadre téléphone WAC (portrait) — affiche une capture réelle de l'app,
 * ou un placeholder brandé en attendant le visuel.
 *
 * `src` accepte :
 *  - une image (.jpg/.png) → capture fixe
 *  - une vidéo (.mp4/.webm) → boucle muette autoplay
 *  - un TABLEAU de vidéos → lues en chaîne, en boucle (A → B → A → …)
 *
 * Reveal à ressort à l'apparition. Largeur pilotée par `width` (px).
 */
export default function PhoneShot({
  src,
  alt = "Capture de l'app WAC",
  placeholder,
  width = 240,
  delay = 0,
}: {
  src?: string | string[]
  alt?: string
  placeholder?: string
  width?: number
  delay?: number
}) {
  const sources = Array.isArray(src) ? src : src ? [src] : []
  const [idx, setIdx] = useState(0)

  const current = sources[idx % sources.length]
  const isVideo = current ? /\.(mp4|webm)$/i.test(current) : false

  return (
    <motion.div
      className="relative mx-auto"
      style={{ width }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    >
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'var(--color-primary-green)', padding: '12px 10px', border: '3px solid var(--color-primary-green)' }}
      >
        {/* Encoche */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
          style={{ width: '56px', height: '14px', backgroundColor: 'var(--color-primary-green)' }}
        />
        {/* Écran */}
        <div className="relative overflow-hidden" style={{ borderRadius: '2rem', aspectRatio: '9/19.5', backgroundColor: 'var(--color-secondary-beige-light)' }}>
          {current && isVideo ? (
            <video
              key={current}
              autoPlay
              muted
              playsInline
              // Une seule vidéo : boucle native. Plusieurs : onEnded passe à la suivante (remontée via key).
              loop={sources.length === 1}
              onEnded={() => setIdx((i) => (i + 1) % sources.length)}
              aria-label={alt}
              className="absolute inset-0 w-full h-full object-cover object-top"
            >
              <source src={current} type={current.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            </video>
          ) : current ? (
            <Image src={current} alt={alt} fill className="object-cover object-top" sizes={`${width}px`} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <span
                className="text-[0.6rem] uppercase tracking-widest mb-2"
                style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', opacity: 0.5 }}
              >
                Capture à venir
              </span>
              {placeholder && (
                <span className="text-xs" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
                  {placeholder}
                </span>
              )}
            </div>
          )}
        </div>
        {/* Barre home */}
        <div className="mx-auto mt-2 rounded-full" style={{ width: '38px', height: '4px', backgroundColor: 'rgba(245,236,229,0.3)' }} />
      </div>
    </motion.div>
  )
}
