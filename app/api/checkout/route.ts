import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { getRelayPoint } from '@/lib/mondialrelay'
import { PREORDER_FLOW, PREORDER_PACK, getZone, getMode } from '@/lib/preorder'
import { detectCreator, type CapturedUtm } from '@/lib/creator'

// Pré-commande V2 → création d'une session Stripe Checkout (hébergé, mode payment).
// Le client envoie sa zone de livraison (choisie sur /boutique) ; la session borne
// les pays autorisés et le frais de port à cette zone, puis on redirige vers
// l'URL Stripe retournée. Aucune clé publishable côté client (redirect pur).
//
// Variables d'env requises : STRIPE_SECRET_KEY (clé restreinte website),
// STRIPE_PRICE_PREORDER, et le shipping rate de chaque zone (voir .env.example).

/**
 * Garde-fou convention compte (incident « Pro Early » vécu côté coach) : toutes
 * les prices du compte sont TTC (`tax_behavior: 'inclusive'`, immuable après
 * création). On vérifie par API avant le premier checkout — une price mal créée
 * facturerait la TVA EN PLUS du prix affiché. Vérif mémoïsée par instance.
 */
const verifiedInclusivePrices = new Set<string>()

async function assertPriceInclusive(stripe: Stripe, priceId: string): Promise<void> {
  if (verifiedInclusivePrices.has(priceId)) return
  const price = await stripe.prices.retrieve(priceId)
  if (price.tax_behavior !== 'inclusive') {
    throw new Error(
      `Price ${priceId} : tax_behavior "${price.tax_behavior}" au lieu de "inclusive" (prix TTC). ` +
        `Checkout refusé — recréer la price (tax_behavior immuable).`,
    )
  }
  verifiedInclusivePrices.add(priceId)
}

interface RelayInput {
  id: string
  name: string
  zip: string
  city: string
  country: string
}

function parseRelay(raw: unknown, allowedCountries: string[]): RelayInput | null {
  if (!allowedCountries.length || typeof raw !== 'object' || raw === null) return null
  const r = raw as Record<string, unknown>
  const id = typeof r.id === 'string' ? r.id.trim() : ''
  const country = typeof r.country === 'string' ? r.country.toUpperCase() : ''
  if (!/^\d{4,8}$/.test(id) || !allowedCountries.includes(country)) return null
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max) : '')
  return { id, country, name: str(r.name, 100), zip: str(r.zip, 10), city: str(r.city, 60) }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const zone = getZone(body?.zone)
    if (!zone) {
      return NextResponse.json({ error: 'Zone de livraison invalide' }, { status: 400 })
    }
    const mode = getMode(zone, body?.mode)
    if (!mode) {
      return NextResponse.json({ error: 'Mode de livraison invalide' }, { status: 400 })
    }

    // Mode « relais » : le point Mondial Relay choisi est OBLIGATOIRE et voyage
    // en metadata — l'expédition MR sera créée en lot au moment de l'envoi
    // (novembre), pas au paiement.
    let relay: RelayInput | null = null
    let relayShipping: { name: string; line1: string; zip: string; city: string; country: string } | null = null
    if (mode.relay) {
      relay = parseRelay(body?.relay, zone.relayCountries?.map((c) => c.code) ?? [])
      if (!relay) {
        return NextResponse.json({ error: 'Choisis ton point relais Mondial Relay.' }, { status: 400 })
      }
      // Adresse OFFICIELLE du relais re-vérifiée chez Mondial Relay (par numéro) :
      // c'est elle qui devient l'adresse de livraison du paiement et de la facture.
      try {
        const verified = await getRelayPoint(relay.country, relay.id)
        if (verified) {
          relayShipping = {
            name: verified.name || relay.name,
            line1: verified.address || verified.name || relay.name,
            zip: verified.zip || relay.zip,
            city: verified.city || relay.city,
            country: relay.country,
          }
        }
      } catch (err) {
        console.error('checkout: vérification du relais chez MR impossible, fallback client', err)
      }
      // Fallback si l'API MR est indisponible : les données affichées au client
      // (elles viennent de notre propre /api/relay-points quelques secondes avant).
      if (!relayShipping) {
        relayShipping = { name: relay.name, line1: relay.name, zip: relay.zip, city: relay.city, country: relay.country }
      }
    }

    const requestedQty = Number(body?.quantity ?? 1)
    const quantity = Number.isInteger(requestedQty)
      ? Math.min(Math.max(requestedQty, 1), PREORDER_PACK.maxQuantity)
      : 1

    const priceId = process.env.STRIPE_PRICE_PREORDER
    const shippingRateId = process.env[mode.shippingRateEnv]
    if (!priceId || !shippingRateId) {
      console.error(
        `checkout: config Stripe manquante (STRIPE_PRICE_PREORDER ou ${mode.shippingRateEnv})`,
      )
      return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
    }

    const stripe = getStripe()
    await assertPriceInclusive(stripe, priceId)

    // Fallback sur l'origine de la requête : en dev, Stripe redirige bien vers
    // localhost (sinon → 404 sur le site prod, vécu le 14/08) ; en prod l'origine
    // EST le domaine public.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin

    // Attribution créateur UGC + UTM, capturées côté client (UtmCapture) et
    // transmises par la boutique. Valeurs déclaratives → bornées.
    const utm: CapturedUtm =
      typeof body?.utm === 'object' && body.utm !== null ? (body.utm as CapturedUtm) : {}
    const utmValue = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, 200) : '')
    const creator = detectCreator(body?.creator, utm)

    // Metadata métier posées sur la session ET le payment_intent (pattern bracelet :
    // la preuve business reste lisible dans Stripe > Payments même sans la session).
    // Les clés creator / grant_premium_months / utm_* sont attendues TELLES QUELLES
    // par les Cloud Functions Firebase (octroi des 3 mois premium) — ne pas renommer.
    const metadata: Record<string, string> = {
      flow: PREORDER_FLOW,
      zone: zone.id,
      shipping_mode: mode.id,
      creator,
      grant_premium_months: creator ? '3' : '0',
      utm_source: utmValue(utm.utm_source),
      utm_medium: utmValue(utm.utm_medium),
      utm_campaign: utmValue(utm.utm_campaign),
      utm_content: utmValue(utm.utm_content),
    }
    if (relay && relayShipping) {
      metadata.relay_id = relay.id
      metadata.relay_name = relayShipping.name
      metadata.relay_zip = relayShipping.zip
      metadata.relay_city = relayShipping.city
      metadata.relay_country = relayShipping.country
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'fr',
      line_items: [
        {
          price: priceId,
          quantity,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: PREORDER_PACK.maxQuantity },
        },
      ],
      automatic_tax: { enabled: true },
      // Mode relais : le relais EST l'adresse de livraison (posée sur le paiement
      // et la facture) — Stripe ne collecte que l'adresse de FACTURATION.
      // Mode domicile : collecte classique de l'adresse de livraison, bornée
      // aux pays de la zone.
      ...(relayShipping
        ? { billing_address_collection: 'required' as const }
        : {
            shipping_address_collection: {
              allowed_countries:
                zone.allowedCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
            },
          }),
      shipping_options: [{ shipping_rate: shippingRateId }],
      phone_number_collection: { enabled: true }, // requis par les transporteurs
      allow_promotion_codes: true, // code « liste d'attente » diffusé via Brevo
      customer_creation: 'always', // les acheteurs restent visibles dans Stripe > Customers
      metadata,
      // NB : impossible de poser le relais en `payment_intent_data.shipping` —
      // incompatible avec automatic_tax (erreur Stripe vérifiée le 14/08). Le
      // relais vit donc en metadata + champ dédié sur la facture.
      payment_intent_data: { metadata },
      // Facture Stripe générée automatiquement à chaque commande — son PDF est lié
      // dans l'email de confirmation custom (webhook). On n'active PAS les emails
      // de facture côté compte Stripe : réglage partagé avec le SaaS coach.
      // En mode relais, le point relais apparaît sur la facture (champ dédié).
      invoice_creation: {
        enabled: true,
        invoice_data: {
          metadata,
          ...(relayShipping && relay
            ? {
                custom_fields: [
                  {
                    name: 'Livraison en point relais',
                    value: `${relayShipping.name}, ${relayShipping.zip} ${relayShipping.city} (n° ${relay.id})`.slice(0, 140),
                  },
                ],
              }
            : {}),
        },
      },
      success_url: `${siteUrl}/boutique/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/boutique`,
    })

    if (!session.url) {
      console.error('checkout: session créée sans URL', session.id)
      return NextResponse.json({ error: 'Erreur serveur. Réessaye dans quelques instants.' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error('checkout API error:', error)
    return NextResponse.json({ error: 'Erreur serveur. Réessaye dans quelques instants.' }, { status: 500 })
  }
}
