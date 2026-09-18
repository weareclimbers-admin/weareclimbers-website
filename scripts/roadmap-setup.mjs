// @ts-nocheck
/**
 * Setup de la base du board « WAC Roadmap ».
 *
 *   node scripts/roadmap-setup.mjs           → crée les tables + index (idempotent)
 *   node scripts/roadmap-setup.mjs --seed    → + insère des idées de départ (si table vide)
 *
 * Lit DATABASE_URL depuis l'environnement, sinon depuis .env.local (parse maison,
 * aucune dépendance). À lancer une fois après avoir provisionné Neon.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { neon } from '@neondatabase/serverless'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  // Neon/Vercel écrit par défaut dans .env.development.local ; on tente les deux.
  for (const file of ['.env.local', '.env.development.local']) {
    try {
      const env = readFileSync(join(__dirname, '..', file), 'utf8')
      for (const line of env.split('\n')) {
        const m = line.match(/^\s*DATABASE_URL\s*=\s*(.+)\s*$/)
        if (m) return m[1].replace(/^["']|["']$/g, '').trim()
      }
    } catch {
      /* fichier absent → on essaie le suivant */
    }
  }
  return null
}

const DATABASE_URL = loadDatabaseUrl()
if (!DATABASE_URL) {
  console.error(
    '❌ DATABASE_URL introuvable. Provisionne Neon via le Vercel Marketplace,\n' +
      '   puis `vercel env pull .env.local` (ou colle la connection string dans .env.local).',
  )
  process.exit(1)
}

const sql = neon(DATABASE_URL)

const DDL = [
  `CREATE TABLE IF NOT EXISTS roadmap_features (
     id           text PRIMARY KEY,
     title        text NOT NULL,
     description  text NOT NULL,
     category     text NOT NULL DEFAULT 'autre',
     status       text NOT NULL DEFAULT 'proposed'
                    CHECK (status IN ('proposed','planned','in_progress','shipped')),
     vote_count   integer NOT NULL DEFAULT 0,
     author_uid   text,
     is_approved  boolean NOT NULL DEFAULT false,
     created_at   timestamptz NOT NULL DEFAULT now(),
     shipped_at   timestamptz
   )`,
  `CREATE TABLE IF NOT EXISTS roadmap_votes (
     feature_id  text NOT NULL REFERENCES roadmap_features(id) ON DELETE CASCADE,
     voter_uid   text NOT NULL,
     created_at  timestamptz NOT NULL DEFAULT now(),
     PRIMARY KEY (feature_id, voter_uid)
   )`,
  `CREATE INDEX IF NOT EXISTS idx_roadmap_features_approved_status ON roadmap_features (is_approved, status)`,
  `CREATE INDEX IF NOT EXISTS idx_roadmap_features_votecount ON roadmap_features (vote_count DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_roadmap_votes_voter ON roadmap_votes (voter_uid)`,
]

/**
 * Idées de départ pour ne pas lancer le board vide — CONTENU D'EXEMPLE :
 * édite / supprime librement (via l'admin) pour coller à la réalité WAC.
 * vote_count volontairement à 0 : pas de faux compteurs, les vrais grimpeurs votent.
 */
const SEED = [
  { id: 'seed-mode-bloc', title: 'Mode bloc dédié (sessions courtes et intenses)', description: "Un mode bloc qui découpe la séance en essais plutôt qu'en longueurs.", category: 'app' },
  { id: 'seed-export-strava', title: 'Export automatique des séances vers Strava', description: 'Synchroniser mes sessions d’escalade avec Strava.', category: 'app' },
  { id: 'seed-alerte-recup', title: 'Alerte de récupération incomplète', description: "Une vibration du bracelet quand la récupération n'est pas suffisante avant une voie dure.", category: 'bracelet' },
  { id: 'seed-mode-hors-ligne', title: 'Mode hors-ligne en salle sans réseau', description: 'Enregistrer la séance en local puis synchroniser une fois le réseau retrouvé.', category: 'app' },
  { id: 'seed-partage-cordee', title: 'Partager mes stats avec ma cordée', description: 'Comparer en douceur mes courbes avec les copains, façon feed privé.', category: 'communaute' },
]

async function run() {
  const seed = process.argv.includes('--seed')
  const reset = process.argv.includes('--reset')

  console.log('→ Création des tables et index…')
  for (const stmt of DDL) await sql.query(stmt)
  console.log('✓ Schéma prêt.')

  if (reset) {
    // Vide UNIQUEMENT les tables du board (cascade sur les votes). Aucune autre
    // table de la base n'est touchée.
    await sql`DELETE FROM roadmap_features`
    console.log('✓ Board remis à zéro (idées + votes effacés).')
  }

  if (seed) {
    const [{ count }] = await sql`SELECT count(*)::int AS count FROM roadmap_features`
    if (count > 0) {
      console.log(`↷ Seed ignoré : ${count} idée(s) déjà présentes.`)
    } else {
      for (const f of SEED) {
        await sql`
          INSERT INTO roadmap_features (id, title, description, category, status, is_approved)
          VALUES (${f.id}, ${f.title}, ${f.description}, ${f.category}, 'proposed', true)
          ON CONFLICT (id) DO NOTHING
        `
      }
      console.log(`✓ ${SEED.length} idées de départ insérées (édite-les via l'admin).`)
    }
  }

  console.log('\n✅ Terminé.')
}

run().catch((err) => {
  console.error('❌ Échec du setup :', err.message)
  process.exit(1)
})
