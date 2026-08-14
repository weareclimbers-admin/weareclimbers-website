import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { PREORDER_FLOW, PREORDER_PACK, getZone } from '@/lib/preorder'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    const zone = getZone(body?.zone)
    if (!zone) {
      return NextResponse.json({ error: 'Zone de livraison invalide' }, { status: 400 })
    }

    const requestedQty = Number(body?.quantity ?? 1)
    const quantity = Number.isInteger(requestedQty)
      ? Math.min(Math.max(requestedQty, 1), PREORDER_PACK.maxQuantity)
      : 1

    const priceId = process.env.STRIPE_PRICE_PREORDER
    const shippingRateId = process.env[zone.shippingRateEnv]
    if (!priceId || !shippingRateId) {
      console.error(
        `checkout: config Stripe manquante (STRIPE_PRICE_PREORDER ou ${zone.shippingRateEnv})`,
      )
      return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
    }

    const stripe = getStripe()
    await assertPriceInclusive(stripe, priceId)

    // Fallback sur l'origine de la requête : en dev, Stripe redirige bien vers
    // localhost (sinon → 404 sur le site prod, vécu le 14/08) ; en prod l'origine
    // EST le domaine public.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin

    // Metadata métier posées sur la session ET le payment_intent (pattern bracelet :
    // la preuve business reste lisible dans Stripe > Payments même sans la session).
    const metadata = { flow: PREORDER_FLOW, zone: zone.id }

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
      shipping_address_collection: {
        allowed_countries:
          zone.allowedCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: [{ shipping_rate: shippingRateId }],
      phone_number_collection: { enabled: true }, // requis par les transporteurs
      allow_promotion_codes: true, // code « liste d'attente » diffusé via Brevo
      customer_creation: 'always', // les acheteurs restent visibles dans Stripe > Customers
      metadata,
      payment_intent_data: { metadata },
      // Facture Stripe générée automatiquement à chaque commande — son PDF est lié
      // dans l'email de confirmation custom (webhook). On n'active PAS les emails
      // de facture côté compte Stripe : réglage partagé avec le SaaS coach.
      invoice_creation: { enabled: true, invoice_data: { metadata } },
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
