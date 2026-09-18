import { NextResponse } from 'next/server'
import { getSql } from '@/lib/db'

export const dynamic = 'force-dynamic'

/**
 * POST /api/roadmap/vote
 * body: { featureId: string, uid: string, voted: boolean }
 * `voted` = état souhaité (true = ajouter mon vote, false = le retirer).
 * Idempotent : la contrainte unique(feature_id, voter_uid) empêche le double
 * vote, et vote_count est recalculé depuis la table roadmap_votes après chaque
 * changement (pas de compteur qui dérive).
 */
export async function POST(req: Request) {
  let body: { featureId?: string; uid?: string; voted?: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const { featureId, uid, voted } = body
  if (!featureId || typeof featureId !== 'string') {
    return NextResponse.json({ error: 'featureId manquant.' }, { status: 400 })
  }
  if (!uid || typeof uid !== 'string') {
    return NextResponse.json({ error: 'Connecte-toi dans l’app pour voter.' }, { status: 401 })
  }

  try {
    const sql = getSql()

    if (voted) {
      // INSERT peut lever une violation de clé étrangère si l'idée n'existe pas.
      await sql`
        INSERT INTO roadmap_votes (feature_id, voter_uid)
        VALUES (${featureId}, ${uid})
        ON CONFLICT (feature_id, voter_uid) DO NOTHING
      `
    } else {
      await sql`DELETE FROM roadmap_votes WHERE feature_id = ${featureId} AND voter_uid = ${uid}`
    }

    const rows = (await sql`
      UPDATE roadmap_features
      SET vote_count = (SELECT count(*) FROM roadmap_votes WHERE feature_id = ${featureId})
      WHERE id = ${featureId}
      RETURNING vote_count
    `) as { vote_count: number }[]

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Idée introuvable.' }, { status: 404 })
    }

    return NextResponse.json({ votes: Number(rows[0].vote_count), voted: !!voted })
  } catch (err) {
    // FK violation (idée supprimée entre-temps) → 404, sinon 500.
    const code = (err as { code?: string })?.code
    if (code === '23503') {
      return NextResponse.json({ error: 'Idée introuvable.' }, { status: 404 })
    }
    console.error('[roadmap/vote]', err)
    return NextResponse.json({ error: 'Le vote n’a pas pu être enregistré.' }, { status: 500 })
  }
}
