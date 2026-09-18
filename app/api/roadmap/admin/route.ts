import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'
import { isAdmin, isValidStatus, mapRow, type FeatureRow } from '@/lib/roadmap-server'

export const dynamic = 'force-dynamic'

/** GET /api/roadmap/admin — toutes les idées (en attente d'abord). */
export async function GET(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
  }
  try {
    const sql = getSql()
    const rows = (await sql`
      SELECT id, title, description, category, status, vote_count,
             created_at, shipped_at, is_approved
      FROM roadmap_features
      ORDER BY is_approved ASC, vote_count DESC, created_at DESC
    `) as FeatureRow[]
    return NextResponse.json({ features: rows.map(mapRow) })
  } catch (err) {
    console.error('[roadmap/admin GET]', err)
    return NextResponse.json({ error: 'Chargement impossible.' }, { status: 500 })
  }
}

/**
 * POST /api/roadmap/admin — action de modération.
 * body: { action: 'approve' | 'reject' | 'setStatus', id: string, status?: FeatureStatus }
 */
export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 })
  }

  let body: { action?: string; id?: string; status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const { action, id } = body
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'id manquant.' }, { status: 400 })
  }

  try {
    const sql = getSql()

    if (action === 'approve') {
      await sql`UPDATE roadmap_features SET is_approved = true WHERE id = ${id}`
    } else if (action === 'reject') {
      await sql`DELETE FROM roadmap_features WHERE id = ${id}`
    } else if (action === 'setStatus') {
      if (!isValidStatus(body.status)) {
        return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 })
      }
      // Changer de statut = idée curée → on la rend visible. « Livrée » date la mise en ligne.
      if (body.status === 'shipped') {
        await sql`UPDATE roadmap_features SET status = 'shipped', is_approved = true, shipped_at = now() WHERE id = ${id}`
      } else {
        await sql`UPDATE roadmap_features SET status = ${body.status}, is_approved = true, shipped_at = NULL WHERE id = ${id}`
      }
    } else {
      return NextResponse.json({ error: 'Action inconnue.' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[roadmap/admin POST]', err)
    return NextResponse.json({ error: 'Action impossible.' }, { status: 500 })
  }
}
