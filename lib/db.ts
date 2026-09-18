import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

/**
 * Client Postgres (Neon) partagé — utilisé par les routes /api/roadmap.
 *
 * Initialisation PARESSEUSE : `neon()` lève si DATABASE_URL est absent, et
 * Next.js évalue le code de module au build → on ne crée le client qu'au
 * premier appel réel, sinon `next build` planterait tant que la base n'est
 * pas provisionnée. Voir la skill vercel-storage (build-time safety).
 *
 * DATABASE_URL est injecté automatiquement par l'intégration Neon du Vercel
 * Marketplace (et récupéré en local via `vercel env pull`).
 */

let _sql: NeonQueryFunction<false, false> | null = null

export function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL
    if (!url) {
      throw new Error(
        'DATABASE_URL manquant. Provisionne Neon via le Vercel Marketplace ' +
          'puis `vercel env pull` (ou renseigne .env.local).',
      )
    }
    _sql = neon(url)
  }
  return _sql
}
