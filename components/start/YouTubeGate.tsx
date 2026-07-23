'use client'

import { useEffect, useRef, useState } from 'react'
import type { OnboardingVideo } from '@/lib/onboarding'

/**
 * Lecteur YouTube « gated » : signale au parcours quand la vidéo a été
 * regardée jusqu'au bout (état ENDED de l'IFrame API).
 *
 * - `youtubeId: null` → placeholder « bientôt disponible » qui se marque vu
 *   tout seul, pour que le parcours reste testable avant publication du contenu.
 * - Filet anti-blocage : si la vidéo n'est pas terminée au bout d'un délai
 *   (API YouTube en panne, lecteur bloqué en entreprise…), un lien discret
 *   permet de continuer sans elle — une page d'aide ne doit jamais emprisonner.
 */

const FALLBACK_DELAY_MS = 20_000

/* Types minimaux de l'IFrame API YouTube (pas besoin de @types/youtube pour ça) */
type YTPlayer = { destroy: () => void }
declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer
      PlayerState?: { ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<NonNullable<Window['YT']>> | null = null

/** Charge l'IFrame API une seule fois, même avec plusieurs lecteurs sur la page. */
function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        resolve(window.YT!)
      }
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.head.appendChild(script)
    })
  }
  return apiPromise
}

export default function YouTubeGate({
  video,
  watched,
  onWatched,
}: {
  video: OnboardingVideo
  watched: boolean
  onWatched: () => void
}) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [showFallback, setShowFallback] = useState(false)

  // Le parent passe des arrows inline → on fige la dernière version dans une
  // ref pour ne pas recréer le player à chaque render.
  const onWatchedRef = useRef(onWatched)
  onWatchedRef.current = onWatched

  // Placeholder (pas encore de vidéo) : l'étape se valide toute seule.
  useEffect(() => {
    if (video.youtubeId === null && !watched) onWatchedRef.current()
  }, [video.youtubeId, watched])

  // Création du lecteur YouTube.
  useEffect(() => {
    if (!video.youtubeId) return
    let player: YTPlayer | undefined
    let cancelled = false

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return
      player = new YT.Player(mountRef.current, {
        videoId: video.youtubeId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (e: { data: number }) => {
            // 0 = ENDED
            if (e.data === 0) onWatchedRef.current()
          },
        },
      })
    })

    return () => {
      cancelled = true
      try {
        player?.destroy()
      } catch {
        /* le player peut déjà avoir été retiré du DOM */
      }
    }
  }, [video.youtubeId])

  // Lien de secours après un délai, si la vidéo n'a pas été terminée.
  useEffect(() => {
    if (!video.youtubeId || watched) return
    const timer = setTimeout(() => setShowFallback(true), FALLBACK_DELAY_MS)
    return () => clearTimeout(timer)
  }, [video.youtubeId, watched])

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-[20px] border border-[rgba(38,83,53,0.15)] bg-[var(--color-primary-green)]">
        {video.youtubeId ? (
          // L'IFrame API remplace cette div par l'iframe — React n'y retouche pas.
          <div ref={mountRef} className="absolute inset-0 h-full w-full" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-[var(--color-primary-beige)]">
            <svg viewBox="0 0 24 24" className="h-12 w-12 opacity-70" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            <p className="font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-syne)' }}>
              Vidéo bientôt disponible
            </p>
            <p className="max-w-xs text-sm opacity-70">
              On tourne en ce moment — cette étape se débloque sans elle en attendant.
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
            {video.title}
          </p>
          <p className="mt-0.5 text-sm opacity-70">{video.description}</p>
        </div>
        {watched && (
          <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--color-secondary-orange)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Vue
          </span>
        )}
      </div>

      {showFallback && !watched && (
        <button
          type="button"
          onClick={onWatched}
          className="mt-2 text-xs underline underline-offset-2 opacity-60 transition-opacity hover:opacity-100"
        >
          La vidéo ne se lance pas ? Continue sans elle
        </button>
      )}
    </div>
  )
}
