'use client'

import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  CATEGORIES,
  CATEGORY_LABEL,
  DESC_MAX,
  DESC_MIN,
  STATUS_LABEL,
  TITLE_MIN,
  type Feature,
  type FeatureCategory,
} from '@/lib/roadmap'

/**
 * Board d'idées « WAC Roadmap » — page cachée ouverte en onglet navigateur
 * in-app (Custom Tab / SafariVC) depuis l'app mobile, avec ?uid=<firebaseUid>.
 *
 * L'uid (Firebase Auth UID) identifie l'utilisateur pour empêcher le
 * double-vote et rattacher ses propositions. Comme le localStorage d'un Custom
 * Tab n'est pas fiable, l'état « déjà voté » vient du SERVEUR (champ votedByMe
 * de /api/roadmap/list), pas du stockage local.
 */

const SPRING = { type: 'spring', stiffness: 260, damping: 26 } as const
type SortKey = 'popular' | 'recent'

export default function RoadmapBoard() {
  const searchParams = useSearchParams()
  const uid = searchParams.get('uid') ?? ''

  const [features, setFeatures] = useState<Feature[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('popular')
  const [category, setCategory] = useState<FeatureCategory | 'all'>('all')
  const [formOpen, setFormOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const votedIds = useMemo(
    () => new Set(features.filter((f) => f.votedByMe).map((f) => f.id)),
    [features],
  )

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      const res = await fetch(`/api/roadmap/list?uid=${encodeURIComponent(uid)}`)
      if (!res.ok) throw new Error()
      const data = (await res.json()) as { features: Feature[] }
      setFeatures(data.features)
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [uid])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3600)
    return () => clearTimeout(t)
  }, [toast])

  async function toggleVote(id: string) {
    if (!uid) {
      setToast('Ouvre cette page depuis l’app pour voter. 🧗')
      return
    }
    const wasVoted = votedIds.has(id)
    const nextVoted = !wasVoted

    // Mise à jour optimiste.
    setFeatures((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, votedByMe: nextVoted, votes: f.votes + (nextVoted ? 1 : -1) } : f,
      ),
    )

    try {
      const res = await fetch('/api/roadmap/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureId: id, uid, voted: nextVoted }),
      })
      if (!res.ok) throw new Error()
      const data = (await res.json()) as { votes: number; voted: boolean }
      // On aligne sur le compteur serveur (source de vérité).
      setFeatures((prev) =>
        prev.map((f) => (f.id === id ? { ...f, votes: data.votes, votedByMe: data.voted } : f)),
      )
    } catch {
      // Rollback.
      setFeatures((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, votedByMe: wasVoted, votes: f.votes + (nextVoted ? -1 : 1) } : f,
        ),
      )
      setToast('Le vote n’a pas pu être enregistré. Réessaie.')
    }
  }

  async function submitIdea(input: {
    title: string
    description: string
    category: FeatureCategory
  }): Promise<{ ok: boolean; error?: string }> {
    if (!uid) return { ok: false, error: 'Ouvre cette page depuis l’app pour proposer une idée.' }
    try {
      const res = await fetch('/api/roadmap/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, uid }),
      })
      const data = (await res.json()) as { ok?: boolean; id?: string; error?: string }
      if (!res.ok || !data.ok) return { ok: false, error: data.error ?? 'Envoi impossible.' }

      // Affiche immédiatement l'idée à son auteur, en attente de modération.
      const created: Feature = {
        id: data.id!,
        title: input.title,
        description: input.description,
        category: input.category,
        status: 'proposed',
        votes: 1,
        createdAt: new Date().toISOString(),
        votedByMe: true,
        pending: true,
      }
      setFeatures((prev) => [created, ...prev])
      setFormOpen(false)
      setToast('Merci ! Ton idée est envoyée. On la relit avant publication. 🧗')
      return { ok: true }
    } catch {
      return { ok: false, error: 'Ta proposition n’a pas pu être envoyée.' }
    }
  }

  const shipped = useMemo(
    () =>
      features
        .filter((f) => f.status === 'shipped')
        .sort((a, b) => (b.shippedAt ?? '').localeCompare(a.shippedAt ?? '')),
    [features],
  )

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return features
      .filter((f) => f.status !== 'shipped')
      .filter((f) => category === 'all' || f.category === category)
      .filter(
        (f) => !q || f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q),
      )
      .sort((a, b) =>
        sort === 'popular' ? b.votes - a.votes : b.createdAt.localeCompare(a.createdAt),
      )
  }, [features, search, category, sort])

  const totalVotes = useMemo(() => features.reduce((sum, f) => sum + f.votes, 0), [features])

  return (
    <div className="relative min-h-screen">
      <header className="border-b border-[rgba(38,83,53,0.12)]">
        <div className="container-custom flex items-center justify-between py-4">
          <Link href="/" aria-label="Retour au site We Are Climbers">
            <Image src="/logo-green.png" alt="We Are Climbers" width={180} height={45} className="h-8 w-auto" />
          </Link>
          <span className="metric-label opacity-60">Idées & votes</span>
        </div>
      </header>

      <main className="container-custom max-w-4xl pb-28 pt-10 md:pt-14">
        <section>
          <p
            className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-secondary-orange)] md:text-base"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Ta voix façonne l’app
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl">Construis WAC avec nous.</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-80">
            Propose les fonctionnalités qui te manquent, vote pour celles des autres grimpeurs.
            Les idées les plus demandées orientent directement ce qu’on développe ensuite.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Stat value={features.length} label="idées" />
            <Stat value={totalVotes} label="votes" />
            <Stat value={shipped.length} label="livrées" />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 opacity-40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une idée…"
                aria-label="Rechercher une idée"
                className="w-full rounded-xl border border-secondary-beige bg-white py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-secondary-orange"
              />
            </div>

            <div className="flex gap-2">
              <SortToggle sort={sort} onChange={setSort} />
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                data-umami-event="roadmap-idea-open"
                className="btn-secondary whitespace-nowrap"
              >
                + Proposer
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <CategoryChip active={category === 'all'} onClick={() => setCategory('all')}>
              Toutes
            </CategoryChip>
            {CATEGORIES.map((c) => (
              <CategoryChip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
                {c.label}
              </CategoryChip>
            ))}
          </div>
        </section>

        <section className="mt-8">
          {status === 'loading' && <BoardSkeleton />}

          {status === 'error' && (
            <div className="rounded-[20px] border-2 border-dashed border-[rgba(216,90,26,0.4)] p-10 text-center">
              <p className="text-lg font-bold uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                Chargement impossible
              </p>
              <p className="mt-2 opacity-70">Le board n’est pas joignable pour le moment.</p>
              <button type="button" onClick={load} className="btn-primary mt-5 inline-block">
                Réessayer
              </button>
            </div>
          )}

          {status === 'ready' && (
            <AnimatePresence mode="popLayout">
              {visible.length > 0 ? (
                <motion.ul layout className="space-y-3">
                  {visible.map((f) => (
                    <IdeaCard key={f.id} feature={f} voted={votedIds.has(f.id)} onVote={() => toggleVote(f.id)} />
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[20px] border-2 border-dashed border-[rgba(38,83,53,0.2)] p-10 text-center"
                >
                  <p className="text-lg font-bold uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                    Aucune idée ne correspond
                  </p>
                  <p className="mt-2 opacity-70">Personne n’a encore proposé ça — et si tu ouvrais le bal ?</p>
                  <button type="button" onClick={() => setFormOpen(true)} className="btn-primary mt-5 inline-block">
                    Proposer cette idée
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </section>

        {shipped.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 shrink-0 bg-[var(--color-secondary-orange)]" aria-hidden />
              <h2 className="text-2xl md:text-3xl">Livré récemment</h2>
            </div>
            <p className="mt-2 opacity-70">
              Vos idées, désormais dans l’app. Continuez à voter — la suite dépend de vous.
            </p>

            <ul className="mt-6 space-y-3">
              {shipped.map((f) => (
                <li key={f.id} className="card-dark flex items-start gap-4 !p-5">
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary-orange)]"
                    aria-hidden
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-base normal-case tracking-normal" style={{ letterSpacing: 0 }}>
                        {f.title}
                      </h3>
                      {f.shippedAt && <span className="metric-label opacity-60">{shippedDate(f.shippedAt)}</span>}
                    </div>
                    <p className="mt-1.5 text-sm opacity-80">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-16 text-center text-sm opacity-60">
          On lit chaque proposition. Merci de faire grandir WAC. 🧗
        </p>
      </main>

      <AnimatePresence>
        {formOpen && <SubmitModal onClose={() => setFormOpen(false)} onSubmit={submitIdea} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={SPRING}
            className="fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md bg-[var(--color-primary-green)] px-5 py-4 text-[var(--color-primary-beige)] shadow-xl"
            style={{ borderRadius: 16 }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ────────────────────────────── Sous-composants ────────────────────────── */

function relativeTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days <= 0) return "aujourd'hui"
  if (days === 1) return 'hier'
  if (days < 7) return `il y a ${days} jours`
  if (days < 30) return `il y a ${Math.floor(days / 7)} sem.`
  if (days < 365) return `il y a ${Math.floor(days / 30)} mois`
  return `il y a ${Math.floor(days / 365)} an${days >= 730 ? 's' : ''}`
}

function shippedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

function BoardSkeleton() {
  return (
    <ul className="space-y-3" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="flex gap-4 rounded-[20px] border border-[rgba(38,83,53,0.08)] bg-white p-4 sm:p-5">
          <div className="h-16 w-14 shrink-0 animate-pulse rounded-xl bg-[rgba(38,83,53,0.08)]" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 w-24 animate-pulse rounded bg-[rgba(38,83,53,0.08)]" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-[rgba(38,83,53,0.10)]" />
            <div className="h-3 w-full animate-pulse rounded bg-[rgba(38,83,53,0.06)]" />
          </div>
        </li>
      ))}
    </ul>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-syne)' }}>
        {value}
      </div>
      <div className="metric-label opacity-60">{label}</div>
      <span className="metric-underline" />
    </div>
  )
}

function SortToggle({ sort, onChange }: { sort: SortKey; onChange: (s: SortKey) => void }) {
  return (
    <div className="flex overflow-hidden rounded-xl border border-secondary-beige">
      {(['popular', 'recent'] as const).map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={sort === key}
          className={`px-3.5 py-3 text-xs font-bold uppercase transition-colors ${
            sort === key
              ? 'bg-[var(--color-primary-green)] text-[var(--color-primary-beige)]'
              : 'text-[var(--color-primary-green)] opacity-70 hover:opacity-100'
          }`}
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {key === 'popular' ? 'Populaires' : 'Récentes'}
        </button>
      ))}
    </div>
  )
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'border-[var(--color-primary-green)] bg-[var(--color-primary-green)] text-[var(--color-primary-beige)]'
          : 'border-[rgba(38,83,53,0.25)] text-[var(--color-primary-green)] hover:border-[var(--color-primary-green)]'
      }`}
    >
      {children}
    </button>
  )
}

function IdeaCard({ feature, voted, onVote }: { feature: Feature; voted: boolean; onVote: () => void }) {
  const showStatus = feature.status === 'planned' || feature.status === 'in_progress'
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={SPRING}
      className="flex gap-4 rounded-[20px] border border-[rgba(38,83,53,0.10)] bg-white p-4 shadow-[0_2px_12px_rgba(38,83,53,0.05)] sm:p-5"
    >
      <button
        type="button"
        onClick={onVote}
        data-umami-event="roadmap-vote"
        aria-pressed={voted}
        aria-label={voted ? `Retirer mon vote (${feature.votes})` : `Voter (${feature.votes})`}
        className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl border transition-all ${
          voted
            ? 'border-[var(--color-secondary-orange)] bg-[var(--color-secondary-orange)] text-[var(--color-primary-beige)]'
            : 'border-[rgba(38,83,53,0.2)] text-[var(--color-primary-green)] hover:border-[var(--color-secondary-orange)] hover:-translate-y-0.5'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="mt-0.5 text-base font-bold" style={{ fontFamily: 'var(--font-syne)' }}>
          {feature.votes}
        </span>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--color-secondary-beige-light)] px-2.5 py-0.5 text-xs font-medium">
            {CATEGORY_LABEL[feature.category]}
          </span>
          {feature.pending && (
            <span
              className="rounded-full border border-dashed border-[var(--color-secondary-orange)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[var(--color-secondary-orange)]"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              En attente de validation
            </span>
          )}
          {showStatus && !feature.pending && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                feature.status === 'in_progress'
                  ? 'bg-[var(--color-secondary-orange)] text-[var(--color-primary-beige)]'
                  : 'border border-[var(--color-primary-green)] text-[var(--color-primary-green)]'
              }`}
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {STATUS_LABEL[feature.status]}
            </span>
          )}
        </div>

        <h3 className="mt-2 text-base normal-case leading-snug" style={{ letterSpacing: 0 }}>
          {feature.title}
        </h3>
        <p className="mt-1 text-sm opacity-75">{feature.description}</p>

        <div className="mt-2.5 text-xs opacity-50">{relativeTime(feature.createdAt)}</div>
      </div>
    </motion.li>
  )
}

function SubmitModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (input: {
    title: string
    description: string
    category: FeatureCategory
  }) => Promise<{ ok: boolean; error?: string }>
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<FeatureCategory>('app')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit =
    title.trim().length >= TITLE_MIN && description.trim().length >= DESC_MIN && !submitting

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setError(null)
    const result = await onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
    })
    if (!result.ok) {
      setError(result.error ?? 'Envoi impossible.')
      setSubmitting(false)
    }
    // Si ok, le parent ferme la modale.
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(38,83,53,0.45)] p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Proposer une idée"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={SPRING}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-[24px] bg-[var(--color-primary-beige)] p-6 sm:rounded-[24px] sm:p-8"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-2xl">Proposer une idée</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="text-2xl leading-none opacity-50 transition-opacity hover:opacity-100"
          >
            ×
          </button>
        </div>
        <p className="mt-1 text-sm opacity-70">
          Une idée = une proposition. Sois concret : qu’est-ce qui te manque, et pourquoi ?
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="idea-title" className="mb-2 block font-roboto">
              Titre de l’idée *
            </label>
            <input
              id="idea-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              required
              placeholder="Ex. Widget écran verrouillé pendant la séance"
              className="w-full rounded-xl border border-secondary-beige bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange"
            />
          </div>

          <div>
            <label htmlFor="idea-category" className="mb-2 block font-roboto">
              Catégorie
            </label>
            <select
              id="idea-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as FeatureCategory)}
              className="w-full rounded-xl border border-secondary-beige bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="idea-desc" className="mb-2 block font-roboto">
              Décris ton idée *
            </label>
            <textarea
              id="idea-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={DESC_MAX}
              required
              placeholder="Ce qui te manque aujourd’hui, et en quoi ça t’aiderait à mieux grimper."
              className="w-full resize-none rounded-xl border border-secondary-beige bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange"
            />
            <div className="mt-1 text-right text-xs opacity-50">
              {description.length}/{DESC_MAX}
            </div>
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            data-umami-event="roadmap-idea-submit"
            className={`btn-secondary w-full ${!canSubmit ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {submitting ? 'Envoi…' : 'Envoyer mon idée'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}
