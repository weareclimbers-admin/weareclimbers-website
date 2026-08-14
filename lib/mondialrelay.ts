import { createHash } from 'node:crypto'

/**
 * Client Mondial Relay côté serveur — recherche de points relais (WSI4).
 * La création d'expéditions (étiquettes) se fera dans un script d'expédition
 * dédié au moment de l'envoi des colis (novembre), pas au paiement.
 *
 * API SOAP officielle : https://api.mondialrelay.com/Web_Services.asmx
 * Sécurité : signature MD5 majuscule de la concaténation des paramètres
 * (dans l'ordre du WSDL) suivie de la clé privée.
 *
 * Env : MONDIAL_RELAY_ENSEIGNE + MONDIAL_RELAY_PRIVATE_KEY.
 * En dev, utiliser le compte de test public MR : BDTEST13 / PRIVATETESTKEY.
 * ⚠️ La clé privée ne doit JAMAIS atteindre le client (pas de NEXT_PUBLIC_*).
 */

// Surchargeable via env — le sandbox MR documente WebService.asmx, l'API
// historique Web_Services.asmx ; les deux répondent (vérifié le 14/08).
const MR_ENDPOINT = process.env.MONDIAL_RELAY_API_URL || 'https://api.mondialrelay.com/Web_Services.asmx'
const MR_NS = 'http://www.mondialrelay.fr/webservice/'

export interface RelayPoint {
  /** Numéro du point relais (référence MR, sert à l'expédition). */
  id: string
  name: string
  address: string
  zip: string
  city: string
  country: string
  /** Distance en mètres depuis le code postal recherché. */
  distanceMeters: number | null
  /** URL du plan d'accès Mondial Relay (page publique). */
  mapUrl: string | null
}

function getCredentials(): { enseigne: string; privateKey: string } {
  const enseigne = process.env.MONDIAL_RELAY_ENSEIGNE
  const privateKey = process.env.MONDIAL_RELAY_PRIVATE_KEY
  if (!enseigne || !privateKey) {
    throw new Error('MONDIAL_RELAY_ENSEIGNE / MONDIAL_RELAY_PRIVATE_KEY manquantes (voir .env.example)')
  }
  return { enseigne, privateKey }
}

function md5Upper(value: string): string {
  return createHash('md5').update(value, 'utf8').digest('hex').toUpperCase()
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Extrait le contenu texte de la première balise `tag` d'un fragment XML. */
function tag(xml: string, name: string): string {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))
  return m ? m[1].trim() : ''
}

/**
 * Recherche des points relais autour d'un code postal (WSI4_PointRelais_Recherche).
 * `country` : code ISO à 2 lettres du réseau MR (FR / BE / LU pour nos zones).
 */
export async function searchRelayPoints({
  country,
  zip,
  count = 8,
}: {
  country: string
  zip: string
  count?: number
}): Promise<RelayPoint[]> {
  return wsi4Search({ country, zip, count })
}

/**
 * Détails d'un point relais précis par son numéro — utilisé par la route
 * checkout pour poser l'adresse OFFICIELLE du relais (vérifiée chez MR) comme
 * adresse de livraison Stripe, au lieu de faire confiance au navigateur.
 */
export async function getRelayPoint(country: string, relayId: string): Promise<RelayPoint | null> {
  const points = await wsi4Search({ country, relayId, count: 1 })
  return points.find((p) => p.id === relayId) ?? points[0] ?? null
}

async function wsi4Search({
  country,
  zip = '',
  relayId = '',
  count = 8,
}: {
  country: string
  zip?: string
  relayId?: string
  count?: number
}): Promise<RelayPoint[]> {
  const { enseigne, privateKey } = getCredentials()

  // Paramètres dans l'ordre EXACT du WSDL — l'ordre fait partie de la signature.
  const params: [string, string][] = [
    ['Enseigne', enseigne],
    ['Pays', country],
    ['NumPointRelais', relayId],
    ['Ville', ''],
    ['CP', zip],
    ['Latitude', ''],
    ['Longitude', ''],
    ['Taille', ''],
    ['Poids', ''],
    ['Action', ''],
    ['DelaiEnvoi', '0'],
    ['RayonRecherche', zip ? '20' : ''],
    ['TypeActivite', ''],
    ['NACE', ''],
    ['NombreResultats', String(count)],
  ]

  const security = md5Upper(params.map(([, v]) => v).join('') + privateKey)

  const body = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI4_PointRelais_Recherche xmlns="${MR_NS}">
${params.map(([k, v]) => `      <${k}>${xmlEscape(v)}</${k}>`).join('\n')}
      <Security>${security}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`

  const response = await fetch(MR_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `"${MR_NS}WSI4_PointRelais_Recherche"`,
    },
    body,
  })

  if (!response.ok) {
    throw new Error(`Mondial Relay HTTP ${response.status}`)
  }

  const xml = await response.text()
  const stat = tag(xml, 'STAT')
  if (stat !== '0') {
    // Codes STAT documentés par MR (ex. 8 = signature invalide, 9 = ville/CP inconnus)
    throw new Error(`Mondial Relay STAT ${stat}`)
  }

  const blocks = xml.match(/<PointRelais_Details>[\s\S]*?<\/PointRelais_Details>/g) ?? []
  return blocks.map((block) => {
    const distance = tag(block, 'Distance')
    return {
      id: tag(block, 'Num'),
      name: tag(block, 'LgAdr1'),
      address: [tag(block, 'LgAdr3'), tag(block, 'LgAdr4')].filter(Boolean).join(', '),
      zip: tag(block, 'CP'),
      city: tag(block, 'Ville'),
      country: tag(block, 'Pays'),
      distanceMeters: distance ? parseInt(distance, 10) : null,
      mapUrl: tag(block, 'URL_Plan') || null,
    }
  })
}
