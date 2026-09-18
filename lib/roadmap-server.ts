import 'server-only'
import type { Feature, FeatureCategory, FeatureStatus } from './roadmap'
import { ALL_CATEGORIES, ALL_STATUSES } from './roadmap'

/** Forme brute d'une ligne `features` renvoyée par Neon. */
export interface FeatureRow {
  id: string
  title: string
  description: string
  category: string
  status: string
  vote_count: number | string
  created_at: string | Date
  shipped_at: string | Date | null
  voted_by_me?: boolean
  is_approved?: boolean
}

/** Ligne DB → objet `Feature` consommé par le front. */
export function mapRow(r: FeatureRow): Feature {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    category: r.category as FeatureCategory,
    status: r.status as FeatureStatus,
    votes: Number(r.vote_count),
    createdAt: new Date(r.created_at).toISOString(),
    shippedAt: r.shipped_at ? new Date(r.shipped_at).toISOString() : undefined,
    votedByMe: r.voted_by_me ?? false,
    pending: r.is_approved === false ? true : undefined,
  }
}

export function isValidCategory(v: unknown): v is FeatureCategory {
  return typeof v === 'string' && (ALL_CATEGORIES as string[]).includes(v)
}

export function isValidStatus(v: unknown): v is FeatureStatus {
  return typeof v === 'string' && (ALL_STATUSES as string[]).includes(v)
}

/** Vérifie le jeton d'administration depuis l'en-tête de la requête. */
export function isAdmin(req: Request): boolean {
  const token = process.env.ROADMAP_ADMIN_TOKEN
  if (!token) return false // pas de jeton configuré → admin verrouillé
  return req.headers.get('x-roadmap-admin') === token
}
