'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ONBOARDING } from '@/lib/onboarding'
import { TitleReveal } from '@/components/Reveal'
import TopoLines from '@/components/TopoLines'
import YouTubeGate from './YouTubeGate'

/**
 * Parcours de démarrage /start — façon e-learning en 3 étapes :
 * 1. Merci (vidéo de l'équipe) → 2. Le bracelet (vidéos) → 3. L'app (stores).
 * Chaque étape se débloque quand ses vidéos ont été vues ; la progression est
 * mémorisée en localStorage pour que la page serve aussi de guide à revisiter.
 */

const STORAGE_KEY = 'wac-start-progress-v1'
const SPRING = { type: 'spring', stiffness: 120, damping: 18 } as const

const STEPS = [
  { label: 'Merci' },
  { label: 'Ton bracelet' },
  { label: "L'app" },
] as const

type Progress = { step: number; watched: string[] }

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Progress>
      return {
        step: typeof parsed.step === 'number' ? Math.min(Math.max(parsed.step, 0), 2) : 0,
        watched: Array.isArray(parsed.watched) ? parsed.watched.filter((k) => typeof k === 'string') : [],
      }
    }
  } catch {
    /* localStorage indisponible ou JSON corrompu → on repart de zéro */
  }
  return { step: 0, watched: [] }
}

export default function StartOnboarding() {
  const [step, setStep] = useState(0)
  const [watched, setWatched] = useState<string[]>([])
  // La progression vit en localStorage : on ne rend le parcours qu'après
  // hydratation pour éviter un mismatch serveur/client.
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadProgress()
    setStep(saved.step)
    setWatched(saved.watched)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, watched } satisfies Progress))
    } catch {
      /* navigation privée : la progression ne survivra pas, tant pis */
    }
  }, [hydrated, step, watched])

  const markWatched = (key: string) =>
    setWatched((prev) => (prev.includes(key) ? prev : [...prev, key]))

  const merciDone = watched.includes(ONBOARDING.merci.video.key)
  const braceletDone = ONBOARDING.bracelet.videos.every((v) => watched.includes(v.key))

  /** Une étape est accessible si toutes les précédentes sont complétées. */
  const maxReachable = useMemo(() => {
    if (!merciDone) return 0
    if (!braceletDone) return 1
    return 2
  }, [merciDone, braceletDone])

  const stepDone = [merciDone, braceletDone, false]
  const canGoNext = step < 2 && stepDone[step]

  const braceletSeenCount = ONBOARDING.bracelet.videos.filter((v) => watched.includes(v.key)).length

  if (!hydrated) {
    // Squelette minimal le temps de lire la progression (évite le flash étape 1)
    return <div className="min-h-screen" />
  }

  return (
    <div className="relative min-h-screen">
      {/* Barre du haut — volontairement minimale : pas de nav, le parcours d'abord */}
      <header className="border-b border-[rgba(38,83,53,0.12)]">
        <div className="container-custom flex items-center justify-between py-4">
          <Link href="/" aria-label="Retour au site We Are Climbers">
            <Image src="/logo-green.png" alt="We Are Climbers" width={180} height={45} className="h-8 w-auto" />
          </Link>
          <span className="metric-label opacity-60">Parcours de démarrage</span>
        </div>
      </header>

      <main className="container-custom max-w-3xl pb-24 pt-10 md:pt-14">
        {/* Stepper */}
        <nav aria-label="Étapes du parcours" className="mb-10">
          <ol className="flex items-center gap-2 md:gap-3">
            {STEPS.map((s, i) => {
              const done = stepDone[i] || i < step
              const reachable = i <= maxReachable
              const current = i === step
              return (
                <li key={s.label} className="flex flex-1 items-center gap-2 md:gap-3">
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => reachable && setStep(i)}
                    aria-current={current ? 'step' : undefined}
                    className={`flex items-center gap-2.5 transition-opacity ${
                      reachable ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                    }`}
                  >
                    <span
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center font-bold ${
                        current
                          ? 'bg-[var(--color-secondary-orange)] text-[var(--color-primary-beige)]'
                          : done
                            ? 'bg-[var(--color-primary-green)] text-[var(--color-primary-beige)]'
                            : 'border-2 border-[rgba(38,83,53,0.35)] text-[var(--color-primary-green)]'
                      }`}
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {done && !current ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                      {/* carré-en-coin signature */}
                      {current && (
                        <span className="absolute right-0 top-0 h-2 w-2 bg-[var(--color-primary-green)]" aria-hidden />
                      )}
                    </span>
                    <span
                      className={`hidden text-sm font-bold uppercase sm:block ${current ? '' : 'opacity-60'}`}
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span
                      className={`h-0.5 flex-1 ${
                        i < maxReachable ? 'bg-[var(--color-secondary-orange)]' : 'bg-[rgba(38,83,53,0.2)]'
                      }`}
                      aria-hidden
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={SPRING}
          >
            {/* ── Étape 1 : Merci ── */}
            {step === 0 && (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-secondary-orange)] md:text-base" style={{ fontFamily: 'var(--font-syne)' }}>
                  Ton bracelet est là
                </p>
                <TitleReveal
                  lines={['Merci d’être', 'de la première cordée.']}
                  className="mt-3 text-3xl md:text-5xl"
                />
                <p className="mt-4 max-w-xl text-lg opacity-80">
                  Tu tiens entre les mains le résultat d’une aventure que tu as rendue possible.
                  Avant d’enfiler ton bracelet, prends deux minutes : on t’explique tout, étape par étape.
                </p>

                <div className="mt-8">
                  <YouTubeGate
                    video={ONBOARDING.merci.video}
                    watched={merciDone}
                    onWatched={() => markWatched(ONBOARDING.merci.video.key)}
                  />
                </div>
              </section>
            )}

            {/* ── Étape 2 : Le bracelet ── */}
            {step === 1 && (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-secondary-orange)] md:text-base" style={{ fontFamily: 'var(--font-syne)' }}>
                  Étape 2 — {braceletSeenCount}/{ONBOARDING.bracelet.videos.length} vidéos vues
                </p>
                <TitleReveal
                  lines={['Fais connaissance', 'avec ton bracelet.']}
                  className="mt-3 text-3xl md:text-5xl"
                />
                <p className="mt-4 max-w-xl text-lg opacity-80">
                  Quelques vidéos courtes pour comprendre comment il fonctionne, ce que ses états
                  veulent dire, et comment le connecter — de quoi éviter tous les pièges du premier jour.
                </p>

                <div className="mt-8 space-y-10">
                  {ONBOARDING.bracelet.videos.map((v, i) => (
                    <div key={v.key}>
                      <p className="metric-label mb-2 text-[var(--color-secondary-orange)]">
                        Vidéo {i + 1}
                      </p>
                      <YouTubeGate video={v} watched={watched.includes(v.key)} onWatched={() => markWatched(v.key)} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Étape 3 : L'app ── */}
            {step === 2 && (
              <section>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-secondary-orange)] md:text-base" style={{ fontFamily: 'var(--font-syne)' }}>
                  Dernière étape
                </p>
                <TitleReveal
                  lines={['Télécharge l’app,', 'connecte, grimpe.']}
                  className="mt-3 text-3xl md:text-5xl"
                />
                <p className="mt-4 max-w-xl text-lg opacity-80">
                  L’app est gratuite. Une fois ton compte créé, elle te guide pour appairer
                  ton bracelet — ensuite, tout est automatique.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <StoreButton store="apple" href={ONBOARDING.stores.appStoreUrl} />
                  <StoreButton store="google" href={ONBOARDING.stores.playStoreUrl} />
                </div>

                {/* Checklist après téléchargement */}
                <div className="card-dark mt-10">
                  <h2 className="text-lg">Une fois l’app installée</h2>
                  <ol className="mt-4 space-y-3">
                    {[
                      'Crée ton compte (ou connecte-toi si tu en as déjà un).',
                      'Active le Bluetooth et garde ton bracelet chargé à proximité.',
                      'Laisse-toi guider : l’app détecte ton bracelet et l’appaire en quelques secondes.',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--color-secondary-orange)] text-xs font-bold text-[var(--color-primary-beige)]"
                          style={{ fontFamily: 'var(--font-syne)' }}
                        >
                          {i + 1}
                        </span>
                        <span className="opacity-90">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Support */}
                <div className="mt-6 border-2 border-[rgba(38,83,53,0.15)] p-6" style={{ borderRadius: 20 }}>
                  <h2 className="text-lg">Un souci, une question ?</h2>
                  <p className="mt-2 opacity-80">
                    Garde cette page dans tes favoris : elle reste ton guide de démarrage.
                    Et si quelque chose coince, écris-nous — on répond vite.
                  </p>
                  <a href={`mailto:${ONBOARDING.supportEmail}`} className="btn-primary mt-4 inline-block">
                    {ONBOARDING.supportEmail}
                  </a>
                </div>

                <p className="mt-10 text-center text-lg font-bold uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                  Bonnes grimpes. 🧗
                </p>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation bas de page */}
        <div className="mt-12 flex items-center justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm font-medium underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
            >
              ← Étape précédente
            </button>
          ) : (
            <span />
          )}

          {step < 2 && (
            <div className="text-right">
              <AnimatePresence>
                {canGoNext ? (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={SPRING}
                    onClick={() => setStep(step + 1)}
                    className="btn-secondary"
                  >
                    Suivant →
                  </motion.button>
                ) : (
                  <motion.p key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm opacity-60">
                    {step === 0
                      ? 'Regarde la vidéo pour continuer'
                      : 'Regarde les vidéos pour continuer'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Fond topo discret en pied de page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64">
        <TopoLines color="var(--color-primary-green)" opacity={0.06} drift={false} />
      </div>
    </div>
  )
}

/** Bouton store — passe en « Bientôt disponible » tant que le lien est null. */
function StoreButton({ store, href }: { store: 'apple' | 'google'; href: string | null }) {
  const label = store === 'apple' ? 'App Store' : 'Google Play'
  const icon =
    store === 'apple' ? (
      <svg viewBox="0 0 384 512" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
    ) : (
      <svg viewBox="0 0 512 512" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
      </svg>
    )

  if (!href) {
    return (
      <div
        aria-disabled
        className="flex flex-1 items-center justify-center gap-3 border-2 border-dashed border-[rgba(38,83,53,0.3)] px-6 py-4 opacity-60"
        style={{ borderRadius: 20 }}
      >
        {icon}
        <span className="text-left leading-tight">
          <span className="block text-xs uppercase tracking-wide">Bientôt sur</span>
          <span className="block font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
            {label}
          </span>
        </span>
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event={store === 'apple' ? 'clic-app-store' : 'clic-play-store'}
      className="flex flex-1 items-center justify-center gap-3 bg-[var(--color-primary-green)] px-6 py-4 text-[var(--color-primary-beige)] transition-transform hover:-translate-y-0.5"
      style={{ borderRadius: 20 }}
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-xs uppercase tracking-wide opacity-80">Télécharger sur</span>
        <span className="block font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
          {label}
        </span>
      </span>
    </a>
  )
}
