import { NextRequest, NextResponse } from 'next/server'
import { searchRelayPoints } from '@/lib/mondialrelay'
import { getZone } from '@/lib/preorder'

// Recherche de points relais Mondial Relay pour la boutique pré-commande.
// GET /api/relay-points?zone=fr&country=FR&zip=64210
// La clé privée MR reste côté serveur — le client ne voit que cette route.
// Les pays autorisés par zone viennent de lib/preorder (relayCountries).

const ZIP_PATTERNS: Record<string, RegExp> = {
  FR: /^\d{5}$/,
  BE: /^\d{4}$/,
  LU: /^\d{4}$/,
}

export async function GET(request: NextRequest) {
  try {
    const zoneId = request.nextUrl.searchParams.get('zone') ?? ''
    const country = (request.nextUrl.searchParams.get('country') ?? '').toUpperCase()
    const zip = (request.nextUrl.searchParams.get('zip') ?? '').trim()

    const zone = getZone(zoneId)
    const allowedCountries = zone?.relayCountries?.map((c) => c.code)
    if (!zone || !allowedCountries?.length) {
      return NextResponse.json({ error: 'Zone sans point relais' }, { status: 400 })
    }
    if (!allowedCountries.includes(country)) {
      return NextResponse.json({ error: 'Pays invalide pour cette zone' }, { status: 400 })
    }
    if (!ZIP_PATTERNS[country]?.test(zip)) {
      return NextResponse.json({ error: 'Code postal invalide' }, { status: 400 })
    }

    const points = await searchRelayPoints({ country, zip })
    return NextResponse.json({ points }, { status: 200 })
  } catch (error) {
    console.error('relay-points API error:', error)
    return NextResponse.json(
      { error: 'Recherche de points relais indisponible. Réessaye dans quelques instants.' },
      { status: 502 },
    )
  }
}
