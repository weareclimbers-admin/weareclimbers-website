/**
 * Souscription aux webhooks Boxtal — à lancer UNE FOIS après déploiement (URL publique).
 *
 *   node scripts/setup-boxtal-webhooks.mjs --url https://www.weareclimbers.fr   → crée
 *   node scripts/setup-boxtal-webhooks.mjs --list                              → liste
 *   node scripts/setup-boxtal-webhooks.mjs --delete <id>                       → supprime
 *
 * Crée la souscription TRACKING_CHANGED → <url>/api/boxtal-webhook, avec
 * BOXTAL_WEBHOOK_SECRET comme secret de signature (le même que lit la route webhook).
 *
 * ⚠️ Une souscription ne reçoit que les events des commandes créées par la MÊME
 * app API v3 (mêmes BOXTAL_API_ACCESS_KEY/SECRET) → utiliser les clés PROD en prod.
 * Env : BOXTAL_API_ACCESS_KEY, BOXTAL_API_SECRET_KEY, BOXTAL_WEBHOOK_SECRET,
 * BOXTAL_API_BASE_URL (prod = https://api.boxtal.com), NEXT_PUBLIC_SITE_URL (fallback --url).
 */
import fs from 'node:fs'

function loadEnv() {
  const out = { ...process.env }
  try {
    for (const line of fs.readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
      const i = line.indexOf('=')
      if (i > 0 && /^[A-Z0-9_]+$/i.test(line.slice(0, i)) && out[line.slice(0, i)] === undefined) {
        out[line.slice(0, i)] = line.slice(i + 1).trim()
      }
    }
  } catch {
    /* pas de .env.local (CI) */
  }
  return out
}
const env = loadEnv()
for (const k of ['BOXTAL_API_ACCESS_KEY', 'BOXTAL_API_SECRET_KEY']) {
  if (!env[k]) throw new Error(`${k} manquante`)
}

const BASE = env.BOXTAL_API_BASE_URL || 'https://api.boxtal.build'
const AUTH =
  'Basic ' + Buffer.from(`${env.BOXTAL_API_ACCESS_KEY}:${env.BOXTAL_API_SECRET_KEY}`, 'utf8').toString('base64')

async function api(path, init) {
  const res = await fetch(new URL(path, BASE), {
    method: init?.method || 'GET',
    headers: {
      Authorization: AUTH,
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  })
  const text = await res.text()
  const data = text ? JSON.parse(text) : null
  if (!res.ok) {
    const codes = (data?.errors ?? []).map((e) => e.code).join(', ') || `HTTP ${res.status}`
    throw new Error(`Boxtal ${init?.method || 'GET'} ${path} : ${codes}`)
  }
  return data
}

const args = process.argv.slice(2)

if (args.includes('--list')) {
  const r = await api('/shipping/v3.1/subscription')
  console.log(JSON.stringify(r?.content ?? r, null, 2))
  process.exit(0)
}

const delIdx = args.indexOf('--delete')
if (delIdx !== -1) {
  const id = args[delIdx + 1]
  if (!id) throw new Error('--delete <id> requis')
  await api(`/shipping/v3.1/subscription/${encodeURIComponent(id)}`, { method: 'DELETE' })
  console.log(`✅ souscription ${id} supprimée`)
  process.exit(0)
}

// Création
const urlIdx = args.indexOf('--url')
const url = (urlIdx !== -1 ? args[urlIdx + 1] : env.NEXT_PUBLIC_SITE_URL) || ''
if (!/^https:\/\//.test(url)) {
  throw new Error('URL publique requise : --url https://www.weareclimbers.fr (Boxtal doit pouvoir la joindre)')
}
const secret = env.BOXTAL_WEBHOOK_SECRET
if (!secret) throw new Error('BOXTAL_WEBHOOK_SECRET manquante (secret de signature partagé avec la route webhook)')

const callbackUrl = url.replace(/\/$/, '') + '/api/boxtal-webhook'
console.log(`Base Boxtal : ${BASE}\nCallback : ${callbackUrl}\n`)

for (const eventType of ['TRACKING_CHANGED']) {
  const r = await api('/shipping/v3.1/subscription', {
    method: 'POST',
    body: { eventType, callbackUrl, webhookSecret: secret },
  })
  console.log(`✅ souscription ${eventType} créée (id ${r?.content?.id ?? '—'})`)
}
