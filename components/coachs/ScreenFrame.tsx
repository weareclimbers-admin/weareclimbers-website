'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useState } from 'react'
import Tilt from '@/components/Tilt'

/**
 * Cadre "fenêtre app" WAC — DA v2 (arrondi 20 px, bordure fine, glow au survol).
 * Reçoit un visuel réel de la webapp coach :
 *  - image (.jpg/.png) → capture fixe
 *  - vidéo (.mp4/.webm) → démo en boucle muette autoplay
 *  - TABLEAU de vidéos → lecture en chaîne bouclée (A → B → A → …)
 * Placeholder brandé si aucun visuel. Reveal à ressort, tilt 3D optionnel.
 */
export default function ScreenFrame({
  src,
  alt = 'Aperçu WAC Coach',
  label = 'WAC Coach',
  placeholder,
  tilt = false,
}: {
  src?: string | string[]
  alt?: string
  label?: string
  placeholder?: string
  tilt?: boolean
}) {
  const sources = Array.isArray(src) ? src : src ? [src] : []
  const [idx, setIdx] = useState(0)
  const current = sources[idx % sources.length]
  const isVideo = current ? /\.(mp4|webm)$/i.test(current) : false

  const frame = (
    <motion.div
      className="relative rounded-[20px] overflow-hidden"
      style={{
        backgroundColor: 'var(--color-primary-beige)',
        border: '1px solid rgba(38,83,53,0.16)',
        boxShadow: '0 10px 34px rgba(38,83,53,0.12)',
      }}
      whileHover={{ y: -6, boxShadow: '0 18px 50px rgba(216,90,26,0.2)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {/* Barre de fenêtre */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(38,83,53,0.12)' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-secondary-orange)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-secondary-beige)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary-green)', opacity: 0.35 }} />
        <span className="ml-2 text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}>
          {label}
        </span>
      </div>

      {/* Contenu : vidéo démo, capture, ou placeholder */}
      <div className="relative" style={{ aspectRatio: '16 / 10' }}>
        {current && isVideo ? (
          <video
            key={current}
            autoPlay
            muted
            playsInline
            loop={sources.length === 1}
            onEnded={() => setIdx((i) => (i + 1) % sources.length)}
            aria-label={alt}
            className="absolute inset-0 w-full h-full object-cover object-top"
          >
            <source src={current} type={current.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          </video>
        ) : current ? (
          <Image src={current} alt={alt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
            <span className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', opacity: 0.5 }}>
              Démo à venir
            </span>
            <span className="text-sm md:text-base" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.7 }}>
              {placeholder || 'Vidéo réelle du produit'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )

  const wrapped = tilt ? <Tilt max={7}>{frame}</Tilt> : frame

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      {wrapped}
    </motion.div>
  )
}
