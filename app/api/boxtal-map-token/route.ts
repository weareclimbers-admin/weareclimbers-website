import { NextResponse } from 'next/server'

// Génère un access token (JWT) pour le composant Carte Boxtal (app WACMAPPROD).
// Le composant carte s'authentifie en `Bearer <token>` côté client — mais il faut
// un VRAI JWT (obtenu via l'IAM Boxtal avec accessKey:secretKey), PAS la clé brute
// (qui provoque un 500). La clé secrète reste ICI (serveur) et ne fuite jamais.
// Token valable ~1h → petit cache mémoire par instance pour ne pas spammer l'IAM.

// La carte est un service PROD (maps.boxtal.com) → token depuis l'IAM prod par défaut.
const TOKEN_URL = process.env.BOXTAL_MAP_TOKEN_URL || 'https://api.boxtal.com/iam/account-app/token'

let cache: { token: string; exp: number } | null = null

export async function GET() {
  const access = process.env.BOXTAL_MAP_ACCESS_KEY
  const secret = process.env.BOXTAL_MAP_SECRET_KEY
  if (!access || !secret) {
    console.error('boxtal-map-token: BOXTAL_MAP_ACCESS_KEY / BOXTAL_MAP_SECRET_KEY manquantes')
    return NextResponse.json({ error: 'Configuration carte manquante' }, { status: 500 })
  }

  const now = Date.now()
  if (cache && cache.exp > now + 60_000) {
    return NextResponse.json({ accessToken: cache.token })
  }

  try {
    const auth = 'Basic ' + Buffer.from(`${access}:${secret}`, 'utf8').toString('base64')
    const res = await fetch(TOKEN_URL, { method: 'POST', headers: { Authorization: auth } })
    if (!res.ok) throw new Error(`IAM HTTP ${res.status}`)
    const data = await res.json()
    const token = data?.accessToken
    if (!token) throw new Error('accessToken absent de la réponse IAM')
    cache = { token, exp: now + (Number(data.expiresIn) || 3600) * 1000 }
    return NextResponse.json({ accessToken: token })
  } catch (err) {
    console.error('boxtal-map-token:', err)
    return NextResponse.json({ error: 'Token carte indisponible' }, { status: 502 })
  }
}
