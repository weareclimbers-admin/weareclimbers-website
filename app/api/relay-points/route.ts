import { NextRequest, NextResponse } from 'next/server'
import { searchParcelPoints } from '@/lib/boxtal'
import { getZone } from '@/lib/preorder'

// Recherche de points relais Chronopost Shop2Shop pour la boutique pré-commande.
// GET /api/relay-points?zone=fr&country=FR&zip=64210
// Réseau Boxtal CHRP_NETWORK (Shop2Shop). Les identifiants Boxtal restent côté serveur.
// La réponse conserve la forme historique { points: [{ id, name, address, zip, city,
// country, distanceMeters }] } pour ne rien changer côté ShopLanding (id = code point Boxtal).

const ZIP_PATTERNS: Record<string, RegExp> = {
  FR: /^\d{5}$/,
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

    const found = await searchParcelPoints({
      countryIsoCode: country,
      postalCode: zip,
      networks: ['CHRP_NETWORK'],
    })
    const points = found.map((p) => ({
      id: p.code,
      name: p.name,
      address: p.street,
      zip: p.zip,
      city: p.city,
      country: p.country,
      distanceMeters: p.distanceMeters,
    }))
    return NextResponse.json({ points }, { status: 200 })
  } catch (error) {
    console.error('relay-points API error:', error)
    return NextResponse.json(
      { error: 'Recherche de points relais indisponible. Réessaye dans quelques instants.' },
      { status: 502 },
    )
  }
}
