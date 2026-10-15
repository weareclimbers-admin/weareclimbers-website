'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import Tilt from '@/components/Tilt'
import type { CoachVideo } from '@/lib/coachVideos'

/** Marge avant la fin de plage : `timeupdate` tombe toutes les ~250 ms, on reboucle avant la carte de fin. */
const END_MARGIN_SEC = 0.25

/** Une seule voix à la fois : la démo qui active le son prévient les autres, qui se coupent. */
const SOUND_EVENT = 'wac-demo-sound'

function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M4 2.5v11l9.5-5.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />
    </svg>
  )
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 6h2.5L7.5 3v10L4 10H1.5z" fill="currentColor" />
      {muted ? <path d="M10.5 6l4 4M14.5 6l-4 4" /> : <path d="M10 5.5a3.5 3.5 0 0 1 0 5M12 3.5a6.3 6.3 0 0 1 0 9" />}
    </svg>
  )
}

function FullscreenIcon({ exit = false }: { exit?: boolean }) {
  return (
    <svg width={14} height={14} viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
      {exit ? (
        <path d="M6 1.5V6H1.5M10 1.5V6h4.5M6 14.5V10H1.5M10 14.5V10h4.5" />
      ) : (
        <path d="M1.5 6V1.5H6M14.5 6V1.5H10M1.5 10v4.5H6M14.5 10v4.5H10" />
      )}
    </svg>
  )
}

/** Bouton de la barre de lecture */
const CONTROL_CLASS =
  'h-9 min-w-9 px-2 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer hover:bg-[rgba(38,83,53,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1'
const CONTROL_STYLE = { color: 'var(--color-primary-green)', outlineColor: 'var(--color-secondary-orange)' }

/**
 * Lecteur des démos vidéo à plage utile (tutos de la webapp coach, cf. lib/coachVideos.ts) :
 * lecture de `start` à `end` seulement (jamais la carte titre ni la carte de fin),
 * bouclée, ou enchaînée s'il y a plusieurs clips.
 * Rien n'est chargé loin de l'écran (preload="none", src posée à l'approche),
 * lecture muette quand la vidéo est visible, pause hors écran.
 * Barre sous l'image (les sous-titres incrustés occupent le bas de l'image) :
 * pause/lecture à gauche ; son (voix off), volume et plein écran à droite.
 * Mouvement réduit ou Save-Data → image fixe + bouton « Voir la démo » : rien
 * n'est chargé ni ne bouge sans un clic du visiteur.
 */
function DemoClips({ clips }: { clips: CoachVideo[] }) {
  const id = useId()
  const boxRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const visible = useRef(false)
  // Pause demandée par le visiteur : la vidéo ne repart pas d'elle-même en revenant à l'écran
  const userPaused = useRef(false)
  const mutedRef = useRef(true)
  const [idx, setIdx] = useState(0)
  const [armed, setArmed] = useState(false)
  const [still, setStill] = useState(false)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [full, setFull] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(1)
  const clip = clips[idx % clips.length]
  const active = !still || started

  const applyMuted = (m: boolean) => {
    mutedRef.current = m
    setMuted(m)
    if (videoRef.current) videoRef.current.muted = m
  }

  const setSound = (on: boolean) => {
    applyMuted(!on)
    if (on) window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: id }))
  }

  const play = () => {
    const v = videoRef.current
    if (!v || !visible.current || userPaused.current) return
    v.muted = mutedRef.current
    v.play().catch(() => {
      // Lecture avec le son refusée par le navigateur : on repart en muet
      if (!v.muted) {
        applyMuted(true)
        v.play().catch(() => {})
      }
    })
  }

  const start = () => {
    setArmed(true)
    setStarted(true)
  }

  const togglePlay = () => {
    if (!active) return start()
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      play()
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  // Plein écran du lecteur (barre comprise) ; iPhone : lecteur natif de la vidéo
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
      return
    }
    if (!active) start()
    const box = boxRef.current
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null
    if (box?.requestFullscreen) {
      box
        .requestFullscreen()
        .then(() => {
          // Mobile Android : bascule en paysage (refusé sans erreur ailleurs)
          const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }
          orientation.lock?.('landscape').catch(() => {})
        })
        .catch(() => {})
    } else {
      v?.webkitEnterFullscreen?.()
    }
  }

  // Mouvement réduit / économie de données → image fixe
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
    const update = () => setStill(reduce.matches || saveData)
    update()
    reduce.addEventListener('change', update)
    return () => reduce.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const onChange = () => setFull(!!boxRef.current && document.fullscreenElement === boxRef.current)
    const onSound = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id && !mutedRef.current) applyMuted(true)
    }
    document.addEventListener('fullscreenchange', onChange)
    window.addEventListener(SOUND_EVENT, onSound)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      window.removeEventListener(SOUND_EVENT, onSound)
    }
  }, [id])

  // Approche du viewport → on pose la source ; visibilité → lecture / pause.
  // Marges verticales uniquement (une marge latérale exclut le bord gauche sur mobile).
  useEffect(() => {
    const box = boxRef.current
    if (!box || !active) return
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true)
          near.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    const seen = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting
        if (e.isIntersecting) play()
        else videoRef.current?.pause()
      },
      { threshold: 0.25 },
    )
    near.observe(box)
    seen.observe(box)
    return () => {
      near.disconnect()
      seen.disconnect()
    }
  }, [active])

  return (
    <div
      ref={boxRef}
      className={`flex flex-col ${full ? 'h-full' : ''}`}
      style={{ backgroundColor: 'var(--color-primary-beige)' }}
    >
      {/* Image */}
      <div className={`relative ${full ? 'flex-1 min-h-0' : ''}`} style={full ? undefined : { aspectRatio: '16 / 9' }}>
        {active ? (
          <video
            ref={videoRef}
            key={clip.src}
            src={armed ? `${clip.src}#t=${clip.start}` : undefined}
            poster={clip.poster}
            preload={armed ? 'metadata' : 'none'}
            muted
            playsInline
            disablePictureInPicture
            aria-label={clip.alt}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget
              v.muted = mutedRef.current
              v.volume = volume
              // Le fragment #t n'est pas honoré partout : on se cale nous-mêmes au début de plage
              if (v.currentTime < clip.start - 0.1 || v.currentTime >= clip.end) v.currentTime = clip.start
              play()
            }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget
              if (v.currentTime < clip.end - END_MARGIN_SEC) return
              if (clips.length > 1) setIdx((i) => (i + 1) % clips.length)
              else v.currentTime = clip.start
            }}
            className={`absolute inset-0 w-full h-full ${full ? 'object-contain' : 'object-cover object-top'}`}
          />
        ) : (
          <>
            <Image src={clip.poster} alt={clip.alt} fill className="object-cover object-top" sizes="(max-width: 1200px) 100vw, 1152px" />
            <button
              type="button"
              onClick={start}
              aria-label={`Voir la démo : ${clip.alt}`}
              className="group absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <span
                className="relative inline-flex items-center gap-2.5 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] shadow-lg group-hover:shadow-xl group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4"
                style={{ backgroundColor: 'var(--color-secondary-orange)', color: 'var(--color-primary-beige)', fontFamily: 'var(--font-syne)', outlineColor: 'var(--color-primary-green)' }}
              >
                <span className="absolute top-0 right-0 w-2 h-2" style={{ backgroundColor: 'var(--color-primary-green)' }} />
                <PlayIcon />
                Voir la démo
              </span>
            </button>
          </>
        )}
      </div>

      {/* Barre de lecture : pause/lecture à gauche ; son, volume, plein écran à droite */}
      <div className="flex items-center justify-between gap-2 px-2 py-1.5" style={{ borderTop: '1px solid rgba(38,83,53,0.12)' }}>
        <button type="button" onClick={togglePlay} aria-label={playing ? 'Mettre la démo en pause' : 'Lire la démo'} className={CONTROL_CLASS} style={CONTROL_STYLE}>
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              // Activer le son sur l'image fixe (mouvement réduit) lance aussi la démo
              if (!active && muted) start()
              setSound(muted)
            }}
            aria-label={muted ? 'Activer le son de la démo (voix off)' : 'Couper le son de la démo'}
            className={CONTROL_CLASS}
            style={CONTROL_STYLE}
          >
            <SpeakerIcon muted={muted || volume === 0} />
            {muted && (
              <span className="text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syne)' }}>
                Activer le son
              </span>
            )}
          </button>
          {/* Volume : seulement avec une souris (sur mobile, iOS ignore le volume réglé par la page) */}
          {!muted && (
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => {
                const value = Number(e.target.value)
                setVolume(value)
                if (videoRef.current) videoRef.current.volume = value
                if (value === 0) setSound(false)
              }}
              aria-label="Volume de la démo"
              className="hidden [@media(hover:hover)]:block w-20 mr-1 cursor-pointer"
              style={{ accentColor: 'var(--color-secondary-orange)' }}
            />
          )}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={full ? 'Quitter le plein écran' : 'Voir la démo en plein écran'}
            className={CONTROL_CLASS}
            style={CONTROL_STYLE}
          >
            <FullscreenIcon exit={full} />
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Cadre "fenêtre app" WAC — DA v2 (arrondi 20 px, bordure fine, glow au survol).
 * Reçoit un visuel réel de la webapp coach :
 *  - image (.jpg/.png) → capture fixe
 *  - vidéo (.mp4/.webm) → démo en boucle muette autoplay
 *  - TABLEAU de vidéos → lecture en chaîne bouclée (A → B → A → …)
 *  - `clips` (tutos à plage utile, prioritaires sur `src`) → lecteur 16:9, cf. DemoClips
 * Placeholder brandé si aucun visuel. Reveal à ressort, tilt 3D optionnel.
 */
export default function ScreenFrame({
  src,
  clips,
  alt = 'Aperçu WAC Coach',
  label = 'WAC Coach',
  placeholder,
  tilt = false,
}: {
  src?: string | string[]
  clips?: CoachVideo[]
  alt?: string
  label?: string
  placeholder?: string
  tilt?: boolean
}) {
  const sources = Array.isArray(src) ? src : src ? [src] : []
  const [idx, setIdx] = useState(0)
  const current = sources[idx % sources.length]
  const isVideo = current ? /\.(mp4|webm)$/i.test(current) : false
  const hasClips = !!clips && clips.length > 0

  const frame = (
    <motion.div
      className="relative rounded-[20px] overflow-hidden"
      style={{
        backgroundColor: 'var(--color-primary-beige)',
        border: '1px solid rgba(38,83,53,0.16)',
        boxShadow: '0 10px 34px rgba(38,83,53,0.12)',
      }}
      // Lecteur : pas de soulèvement au survol (les contrôles ne doivent pas bouger sous la souris)
      whileHover={hasClips ? { boxShadow: '0 18px 50px rgba(216,90,26,0.2)' } : { y: -6, boxShadow: '0 18px 50px rgba(216,90,26,0.2)' }}
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

      {/* Contenu : lecteur de démos à plage utile, vidéo démo, capture, ou placeholder */}
      {hasClips ? (
        <DemoClips clips={clips} />
      ) : (
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
      )}
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
