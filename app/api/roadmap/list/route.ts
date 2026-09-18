import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { mapRow, type FeatureRow } from '@/lib/roadmap-server'

// Données par utilisateur (état "voté") → jamais mises en cache.
export const dynamic = 'force-dynamic'

/**
 * GET /api/roadmap/list?uid=<firebaseUid>
 * Renvoie toutes les idées approuvées + les idées EN ATTENTE de l'utilisateur
 * courant (pour qu'il voie sa propre proposition avant modération).
 * `voted_by_me` est calculé côté serveur : c'est la source de vérité anti
 * double-vote (le localStorage de la webview n'est pas fiable en Custom Tab).
 */
export async function GET(req: Request) {
  const uid = new URL(req.url).searchParams.get('uid') ?? ''

  try {
    const sql = getSql()
    const rows = (await sql`
      SELECT f.id, f.title, f.description, f.category, f.status, f.vote_count,
             f.created_at, f.shipped_at, f.is_approved,
             (v.voter_uid IS NOT NULL) AS voted_by_me
      FROM roadmap_features f
      LEFT JOIN roadmap_votes v ON v.feature_id = f.id AND v.voter_uid = ${uid}
      WHERE f.is_approved = true OR (${uid} <> '' AND f.author_uid = ${uid})
      ORDER BY f.vote_count DESC, f.created_at DESC
    `) as FeatureRow[]

    return NextResponse.json({ features: rows.map(mapRow) })
  } catch (err) {
    console.error('[roadmap/list]', err)
    return NextResponse.json({ error: 'Impossible de charger les idées.' }, { status: 500 })
  }
}
