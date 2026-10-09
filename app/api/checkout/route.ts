import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { PREORDER_FLOW, PREORDER_PACK, getZone, getMode } from '@/lib/preorder'
import { detectCreator, type CapturedUtm } from '@/lib/creator'
import { getPartnerOffer, type PartnerOffer } from '@/lib/offers'
import { sendCapiEvent, readClientSignals } from '@/lib/meta-capi'
import { SHOP_CONTENT } from '@/lib/meta-content'

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

/**
 * Offre partenaire (lib/offers.ts) : le coupon doit être encore valide dans
 * Stripe (`valid` passe à false quand max_redemptions ou redeem_by est atteint)
 * ET cohérent avec le prix annoncé sur la boutique (price − remise = priceTtc).
 * Coupon introuvable ou incohérent = erreur de config, loggée.
 */
async function isPartnerCouponUsable(stripe: Stripe, offer: PartnerOffer, priceId: string): Promise<boolean> {
  try {
    const [coupon, price] = await Promise.all([
      stripe.coupons.retrieve(offer.couponId),
      stripe.prices.retrieve(priceId),
    ])
    if (!coupon.valid) return false
    const expected = (price.unit_amount ?? 0) - offer.priceTtc * 100
    if (coupon.currency !== 'eur' || coupon.amount_off !== expected) {
      console.error(
        `checkout: coupon ${offer.couponId} incohérent avec l'offre « ${offer.slug} » ` +
          `(remise ${coupon.amount_off} ${coupon.currency}, attendu ${expected} eur)`,
      )
      return false
    }
    return true
  } catch (error) {
    console.error(`checkout: coupon ${offer.couponId} illisible (offre « ${offer.slug} »)`, error)
    return false
  }
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
  // Code point Boxtal (Shop2Shop) = alphanumérique (ex. « 2461Y », « 7910O »).
  if (!/^[A-Za-z0-9]{3,15}$/.test(id) || !allowedCountries.includes(country)) return null
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

    // Mode « relais » : le point Chronopost Shop2Shop choisi est OBLIGATOIRE et
    // voyage en metadata (relay_point_code) — l'expédition Boxtal sera créée en lot
    // au moment de l'envoi, pas au paiement.
    let relay: RelayInput | null = null
    let relayShipping: { name: string; line1: string; zip: string; city: string; country: string } | null = null
    if (mode.relay) {
      relay = parseRelay(body?.relay, zone.relayCountries?.map((c) => c.code) ?? [])
      if (!relay) {
        return NextResponse.json({ error: 'Choisis ton point relais Chronopost.' }, { status: 400 })
      }
      // Les données du point viennent de notre propre /api/relay-points (Boxtal,
      // réseau Shop2Shop) quelques secondes avant : on les reprend telles quelles
      // comme adresse de livraison affichée sur la facture.
      relayShipping = { name: relay.name, line1: relay.name, zip: relay.zip, city: relay.city, country: relay.country }
    }

    // Offre partenaire (lien ?offre=) : 1 bracelet par commande — remise fixe
    // appliquée une fois par commande, premium rattaché à l'email du paiement.
    const offer = getPartnerOffer(body?.offer)

    const requestedQty = Number(body?.quantity ?? 1)
    const quantity = offer
      ? 1
      : Number.isInteger(requestedQty)
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

    // Places épuisées / offre terminée : on le dit au client (la boutique retire
    // l'offre et il peut précommander au tarif normal) plutôt que de facturer
    // en silence un autre prix que celui affiché.
    if (offer && !(await isPartnerCouponUsable(stripe, offer, priceId))) {
      return NextResponse.json(
        {
          error:
            "L'offre partenaire n'est plus disponible (toutes les places sont parties ou l'offre est terminée). " +
            'Tu peux toujours précommander au tarif normal.',
          offerUnavailable: true,
        },
        { status: 409 },
      )
    }

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
    const premiumMonths = Math.max(creator ? 3 : 0, offer?.grantPremiumMonths ?? 0)

    // Meta CAPI (phase 2) : consentement marketing + event_id du pixel
    // InitiateCheckout + signaux navigateur (_fbp/_fbc/IP/UA) pour le dédup.
    const marketingConsent = body?.marketingConsent === true
    const metaEventId = typeof body?.metaEventId === 'string' ? body.metaEventId : ''
    const signals = readClientSignals(request)

    // Metadata métier posées sur la session ET le payment_intent (pattern bracelet :
    // la preuve business reste lisible dans Stripe > Payments même sans la session).
    // Les clés creator / grant_premium_months / utm_* sont attendues TELLES QUELLES
    // par les Cloud Functions Firebase (octroi des 3 mois premium) — ne pas renommer.
    const metadata: Record<string, string> = {
      flow: PREORDER_FLOW,
      zone: zone.id,
      shipping_mode: mode.id,
      creator,
      grant_premium_months: String(premiumMonths),
      utm_source: utmValue(utm.utm_source),
      utm_medium: utmValue(utm.utm_medium),
      utm_campaign: utmValue(utm.utm_campaign),
      utm_content: utmValue(utm.utm_content),
    }
    if (offer) metadata.partner_offer = offer.slug
    if (relay && relayShipping) {
      metadata.relay_point_code = relay.id
      metadata.relay_name = relayShipping.name
      metadata.relay_zip = relayShipping.zip
      metadata.relay_city = relayShipping.city
      metadata.relay_country = relayShipping.country
      metadata.relay_network = 'CHRP_NETWORK'
    }

    // Meta CAPI : le webhook (Purchase serveur) n'a pas accès aux cookies
    // _fbp/_fbc ni au consentement (Stripe → serveur). On les range ici pour
    // qu'il les relise. Signaux stockés uniquement si consentement marketing.
    metadata.fb_consent = marketingConsent ? 'granted' : 'denied'
    if (marketingConsent) {
      if (signals.fbp) metadata.fb_fbp = signals.fbp
      if (signals.fbc) metadata.fb_fbc = signals.fbc
      if (signals.clientIp) metadata.fb_client_ip = signals.clientIp
      if (signals.userAgent) metadata.fb_client_ua = signals.userAgent.slice(0, 500)
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'fr',
      line_items: [
        {
          price: priceId,
          quantity,
          ...(offer
            ? {}
            : { adjustable_quantity: { enabled: true, minimum: 1, maximum: PREORDER_PACK.maxQuantity } }),
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
      // Offre partenaire : coupon appliqué d'office (pas de champ code promo —
      // Stripe interdit de combiner `discounts` et `allow_promotion_codes`).
      // Sinon : champ code promo (code « liste d'attente » diffusé via Brevo).
      ...(offer ? { discounts: [{ coupon: offer.couponId }] } : { allow_promotion_codes: true }),
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
                    name: 'Point relais Chronopost',
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

    // Meta CAPI — InitiateCheckout serveur, dédoublonné avec le pixel via le
    // même event_id. Best-effort (ne lève jamais) ; on n'envoie rien sans
    // consentement ni event_id (dédup impossible). Pas d'email/nom à ce stade :
    // l'appariement repose sur _fbp/_fbc + IP + user-agent.
    if (marketingConsent && metaEventId) {
      const price = offer ? offer.priceTtc : PREORDER_PACK.priceTtc
      await sendCapiEvent({
        eventName: 'InitiateCheckout',
        eventId: metaEventId,
        eventSourceUrl: request.headers.get('referer') ?? `${siteUrl}/boutique`,
        userData: {
          clientIp: signals.clientIp,
          userAgent: signals.userAgent,
          fbp: signals.fbp,
          fbc: signals.fbc,
        },
        customData: {
          ...SHOP_CONTENT,
          num_items: quantity,
          ...(price !== null ? { value: price * quantity, currency: 'EUR' } : {}),
        },
      })
    }

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error('checkout API error:', error)
    return NextResponse.json({ error: 'Erreur serveur. Réessaye dans quelques instants.' }, { status: 500 })
  }
}
