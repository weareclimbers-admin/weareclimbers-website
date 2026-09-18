import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { getSql } from '@/lib/db'
import { isValidCategory } from '@/lib/roadmap-server'
import { DESC_MAX, DESC_MIN, TITLE_MAX, TITLE_MIN } from '@/lib/roadmap'

export const dynamic = 'force-dynamic'

const RATE_WINDOW_MIN = 10
const RATE_MAX = 3 // max propositions par uid sur la fenêtre

/**
 * POST /api/roadmap/submit
 * body: { title, description, category, uid }
 * Crée l'idée en is_approved=false (file de modération). L'auteur vote d'office
 * pour sa propre idée. Anti-spam : max 3 propositions / 10 min par uid.
 */
export async function POST(req: Request) {
  let body: { title?: string; description?: string; category?: string; uid?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const uid = (body.uid ?? '').trim()
  const title = (body.title ?? '').trim()
  const description = (body.description ?? '').trim()
  const category = body.category

  if (!uid) {
    return NextResponse.json({ error: 'Connecte-toi dans l’app pour proposer une idée.' }, { status: 401 })
  }
  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    return NextResponse.json({ error: `Le titre doit faire entre ${TITLE_MIN} et ${TITLE_MAX} caractères.` }, { status: 400 })
  }
  if (description.length < DESC_MIN || description.length > DESC_MAX) {
    return NextResponse.json({ error: `La description doit faire entre ${DESC_MIN} et ${DESC_MAX} caractères.` }, { status: 400 })
  }
  if (!isValidCategory(category)) {
    return NextResponse.json({ error: 'Catégorie invalide.' }, { status: 400 })
  }

  try {
    const sql = getSql()

    const recent = (await sql`
      SELECT count(*)::int AS count FROM roadmap_features
      WHERE author_uid = ${uid}
        AND created_at > now() - (${RATE_WINDOW_MIN} * interval '1 minute')
    `) as { count: number }[]
    if (recent[0].count >= RATE_MAX) {
      return NextResponse.json(
        { error: 'Doucement ! Tu as déjà proposé plusieurs idées. Réessaie dans quelques minutes.' },
        { status: 429 },
      )
    }

    const id = `f_${randomUUID()}`
    await sql`
      INSERT INTO roadmap_features (id, title, description, category, status, vote_count, author_uid, is_approved)
      VALUES (${id}, ${title}, ${description}, ${category}, 'proposed', 1, ${uid}, false)
    `
    // L'auteur vote pour sa propre idée (cohérent avec le vote_count = 1).
    await sql`INSERT INTO roadmap_votes (feature_id, voter_uid) VALUES (${id}, ${uid}) ON CONFLICT DO NOTHING`

    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error('[roadmap/submit]', err)
    return NextResponse.json({ error: 'Ta proposition n’a pas pu être envoyée.' }, { status: 500 })
  }
}
