'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  ALL_STATUSES,
  CATEGORIES,
  CATEGORY_LABEL,
  STATUS_LABEL,
  type Feature,
  type FeatureCategory,
  type FeatureStatus,
} from '@/lib/roadmap'

/**
 * Console de modération du board (/roadmap/admin).
 * Protégée par un jeton (ROADMAP_ADMIN_TOKEN côté serveur) saisi ici et
 * mémorisé en localStorage, envoyé en en-tête x-roadmap-admin à chaque appel.
 */

const TOKEN_KEY = 'wac-roadmap-admin-token'

export default function RoadmapAdmin() {
  const [token, setToken] = useState('')
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authed, setAuthed] = useState(false)
  const [statusFilter, setStatusFilter] = useState<FeatureStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<FeatureCategory | 'all'>('all')

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (saved) setToken(saved)
  }, [])

  const load = useCallback(
    async (tok: string) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/roadmap/admin', { headers: { 'x-roadmap-admin': tok } })
        if (res.status === 401) {
          setError('Jeton refusé.')
          setAuthed(false)
          return
        }
        if (!res.ok) throw new Error()
        const data = (await res.json()) as { features: Feature[] }
        setFeatures(data.features)
        setAuthed(true)
        localStorage.setItem(TOKEN_KEY, tok)
      } catch {
        setError('Chargement impossible.')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  // Charge automatiquement si un jeton est déjà mémorisé.
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (saved) load(saved)
  }, [load])

  async function act(id: string, body: Record<string, unknown>) {
    const res = await fetch('/api/roadmap/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-roadmap-admin': token },
      body: JSON.stringify({ id, ...body }),
    })
    if (res.ok) load(token)
    else setError('Action impossible.')
  }

  if (!authed) {
    return (
      <main className="container-custom max-w-md py-20">
        <h1 className="text-3xl">Modération Roadmap</h1>
        <p className="mt-2 opacity-70">Saisis le jeton d’administration.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            load(token)
          }}
          className="mt-6 flex gap-2"
        >
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Jeton"
            className="flex-1 rounded-xl border border-secondary-beige bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary-orange"
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '…' : 'Entrer'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-700">{error}</p>}
      </main>
    )
  }

  const filtering = statusFilter !== 'all' || categoryFilter !== 'all'
  const visible = features.filter(
    (f) =>
      (statusFilter === 'all' || f.status === statusFilter) &&
      (categoryFilter === 'all' || f.category === categoryFilter),
  )
  const pending = visible.filter((f) => f.pending)
  const live = visible.filter((f) => !f.pending)
  const noMatch = 'Aucune idée ne correspond aux filtres.'

  return (
    <main className="container-custom max-w-5xl py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Modération Roadmap</h1>
        <button type="button" onClick={() => load(token)} className="btn-beige" disabled={loading}>
          {loading ? '…' : 'Rafraîchir'}
        </button>
      </div>
      {error && <p className="mt-4 text-red-700">{error}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as FeatureStatus | 'all')}
          className="rounded-lg border border-secondary-beige bg-white px-2 py-1.5"
          aria-label="Filtrer par statut"
        >
          <option value="all">Tous les statuts</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as FeatureCategory | 'all')}
          className="rounded-lg border border-secondary-beige bg-white px-2 py-1.5"
          aria-label="Filtrer par catégorie"
        >
          <option value="all">Toutes les catégories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        {filtering && (
          <>
            <span className="opacity-60">
              {visible.length} / {features.length} idées
            </span>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all')
                setCategoryFilter('all')
              }}
              className="underline underline-offset-2"
            >
              Réinitialiser
            </button>
          </>
        )}
      </div>

      <Section title={`En attente (${pending.length})`} empty={filtering ? noMatch : 'Rien à modérer.'}>
        {pending.map((f) => (
          <Row key={f.id} f={f} act={act} showApprove />
        ))}
      </Section>

      <Section title={`Publiées (${live.length})`} empty={filtering ? noMatch : 'Aucune idée publiée.'}>
        {live.map((f) => (
          <Row key={f.id} f={f} act={act} />
        ))}
      </Section>
    </main>
  )
}

function Section({
  title,
  empty,
  children,
}: {
  title: string
  empty: string
  children: React.ReactNode
}) {
  const items = Array.isArray(children) ? children : [children]
  return (
    <section className="mt-10">
      <h2 className="text-xl">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length > 0 ? items : <p className="opacity-60">{empty}</p>}
      </div>
    </section>
  )
}

function Row({
  f,
  act,
  showApprove,
}: {
  f: Feature
  act: (id: string, body: Record<string, unknown>) => void
  showApprove?: boolean
}) {
  return (
    <div className="rounded-2xl border border-[rgba(38,83,53,0.12)] bg-white p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-[var(--color-secondary-beige-light)] px-2.5 py-0.5">
          {CATEGORY_LABEL[f.category]}
        </span>
        <span className="font-bold uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
          {STATUS_LABEL[f.status]}
        </span>
        <span className="opacity-50">· {f.votes} votes</span>
        {f.pending && <span className="text-[var(--color-secondary-orange)]">· en attente</span>}
      </div>

      <h3 className="mt-2 text-base normal-case" style={{ letterSpacing: 0 }}>
        {f.title}
      </h3>
      <p className="mt-1 text-sm opacity-75">{f.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {showApprove && (
          <button
            type="button"
            onClick={() => act(f.id, { action: 'approve' })}
            className="btn-primary !px-3 !py-1.5 text-xs"
          >
            Approuver
          </button>
        )}

        <select
          value={f.status}
          onChange={(e) => act(f.id, { action: 'setStatus', status: e.target.value as FeatureStatus })}
          className="rounded-lg border border-secondary-beige bg-white px-2 py-1.5 text-sm"
          aria-label="Changer le statut"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            if (confirm(`Supprimer définitivement « ${f.title} » ?`)) act(f.id, { action: 'reject' })
          }}
          className="ml-auto text-sm text-red-700 underline underline-offset-2"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}
