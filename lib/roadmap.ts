/**
 * Modèle de données partagé (front + serveur) du board « WAC Roadmap ».
 * Les données vivent désormais en base (Neon) — voir lib/db.ts, les routes
 * app/api/roadmap/* et le script scripts/roadmap-setup.mjs pour le schéma/seed.
 */

export type FeatureStatus = 'proposed' | 'planned' | 'in_progress' | 'shipped'

export type FeatureCategory = 'app' | 'bracelet' | 'coach' | 'communaute' | 'autre'

export interface Feature {
  id: string
  title: string
  description: string
  category: FeatureCategory
  status: FeatureStatus
  votes: number
  /** ISO 8601 — date de proposition */
  createdAt: string
  /** ISO 8601 — date de mise en ligne (uniquement si status === 'shipped') */
  shippedAt?: string
  /** true si l'utilisateur courant (uid) a déjà voté pour cette idée */
  votedByMe?: boolean
  /** true si l'idée est en attente de modération (visible uniquement par son auteur) */
  pending?: boolean
}

export const ALL_STATUSES: FeatureStatus[] = ['proposed', 'planned', 'in_progress', 'shipped']

/** Libellés + ordre d'affichage des catégories (tutoiement, ton WAC). */
export const CATEGORIES: { value: FeatureCategory; label: string }[] = [
  { value: 'app', label: "L'app" },
  { value: 'bracelet', label: 'Le bracelet' },
  { value: 'coach', label: 'Coaching' },
  { value: 'communaute', label: 'Communauté' },
  { value: 'autre', label: 'Autre' },
]

export const ALL_CATEGORIES: FeatureCategory[] = CATEGORIES.map((c) => c.value)

export const CATEGORY_LABEL: Record<FeatureCategory, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
) as Record<FeatureCategory, string>

/**
 * Libellés des statuts. `proposed` n'affiche pas de badge (état par défaut) ;
 * `shipped` bascule dans la section « Livré récemment ».
 */
export const STATUS_LABEL: Record<FeatureStatus, string> = {
  proposed: 'Proposée',
  planned: 'Prévue',
  in_progress: 'En cours',
  shipped: 'Livrée',
}

/** Contraintes de validation partagées (soumission d'idée). */
export const TITLE_MIN = 4
export const TITLE_MAX = 80
export const DESC_MIN = 10
export const DESC_MAX = 500
