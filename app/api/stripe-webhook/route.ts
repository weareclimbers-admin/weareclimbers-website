import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import { getStripe } from '@/lib/stripe'
import { PREORDER_FLOW, PREORDER_PACK } from '@/lib/preorder'

// Webhook Stripe DÉDIÉ au site (endpoint + whsec distincts des Cloud Functions
// coach — ne jamais partager). Les events Stripe sont broadcastés à tout le
// compte : on ne traite QUE les sessions portant metadata.flow = 'preorder_v2',
// tout le reste (abonnements coach, bracelet) est ignoré silencieusement en 200.
//
// Events à abonner sur l'endpoint (minimum nécessaire) :
//   checkout.session.completed
//   checkout.session.async_payment_succeeded
//   checkout.session.async_payment_failed
//
// Variables d'env requises : STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET (le whsec
// de CET endpoint). Optionnelles : BREVO_PREORDER_LIST_ID (liste « clients
// pré-commande »), PREORDER_NOTIFY_TO (fallback julien@weareclimbers.fr).

/** Infos de livraison — l'emplacement varie selon la version d'API Stripe
 *  (session.shipping_details → session.collected_information.shipping_details). */
interface ShippingInfo {
  name?: string | null
  address?: {
    line1?: string | null
    line2?: string | null
    postal_code?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
  } | null
}

function getShippingInfo(session: Stripe.Checkout.Session): ShippingInfo | undefined {
  const s = session as unknown as {
    collected_information?: { shipping_details?: ShippingInfo | null } | null
    shipping_details?: ShippingInfo | null
  }
  return s.collected_information?.shipping_details ?? s.shipping_details ?? undefined
}

function formatAddress(session: Stripe.Checkout.Session): string {
  // Mode relais : pas d'adresse de livraison collectée → adresse de facturation.
  const addr = getShippingInfo(session)?.address ?? session.customer_details?.address
  if (!addr) return '—'
  return (
    [addr.line1, addr.line2, `${addr.postal_code ?? ''} ${addr.city ?? ''}`.trim(), addr.country]
      .filter(Boolean)
      .join(', ') || '—'
  )
}

function formatEur(amountInCents: number | null | undefined): string {
  if (amountInCents === null || amountInCents === undefined) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amountInCents / 100)
}

/** Transport SMTP OVH partagé par les deux emails (interne + client). */
function getMailer(): { transporter: Mail; from: string } | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error('stripe-webhook: config SMTP manquante — emails non envoyés')
    return null
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: parseInt(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: true },
  })
  return { transporter, from: SMTP_FROM }
}

/** Données lues par API en complément du payload (line items + facture). */
interface OrderExtras {
  quantityLabel: string
  invoicePdfUrl: string | null
  invoiceHostedUrl: string | null
}

async function buildOrderExtras(session: Stripe.Checkout.Session): Promise<OrderExtras> {
  const extras: OrderExtras = { quantityLabel: '—', invoicePdfUrl: null, invoiceHostedUrl: null }

  try {
    const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 10 })
    extras.quantityLabel =
      lineItems.data.map((li) => `${li.quantity ?? 1} × ${li.description}`).join(' + ') || '—'
  } catch (err) {
    console.error('stripe-webhook: lecture line items impossible', err)
  }

  // Facture générée par invoice_creation (route checkout) — le PDF est hébergé
  // par Stripe, accessible sans authentification : on peut le lier dans l'email client.
  try {
    const invoiceId = typeof session.invoice === 'string' ? session.invoice : session.invoice?.id
    if (invoiceId) {
      const invoice = await getStripe().invoices.retrieve(invoiceId)
      extras.invoicePdfUrl = invoice.invoice_pdf ?? null
      extras.invoiceHostedUrl = invoice.hosted_invoice_url ?? null
    }
  } catch (err) {
    console.error('stripe-webhook: lecture facture impossible', err)
  }

  return extras
}

/**
 * Notification interne « nouvelle pré-commande » (même SMTP OVH et même gabarit
 * que coach-lead : best-effort, ne lève jamais — la commande est déjà payée côté
 * Stripe, un échec d'email ne doit rien casser).
 * ⚠️ Stripe rejoue les webhooks non-200 : un doublon d'email est possible et acceptable.
 */
async function notifyNewPreorder(
  session: Stripe.Checkout.Session,
  extras: OrderExtras,
  statusLine?: string,
) {
  const mailer = getMailer()
  if (!mailer) return
  const notifyTo = process.env.PREORDER_NOTIFY_TO || 'julien@weareclimbers.fr'

  try {
    const addr = getShippingInfo(session)?.address

    // Garde-fou zone : un client DOM qui choisit la zone « France métropolitaine »
    // (pays FR + code postal 97x/98x) paie la TVA métropole et le port métropole
    // à tort → à traiter à la main (ajustement/remboursement partiel).
    const zone = session.metadata?.zone ?? '—'
    const domLeak = zone === 'fr' && addr?.country === 'FR' && /^9[78]/.test(addr?.postal_code ?? '')

    const paymentIntentId =
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id

    const relayLabel = session.metadata?.relay_id
      ? `${session.metadata.relay_name || '—'} — ${session.metadata.relay_zip || ''} ${session.metadata.relay_city || ''} (n° ${session.metadata.relay_id}, ${session.metadata.relay_country || ''})`
      : null

    const rows: [string, string][] = [
      ['Client', getShippingInfo(session)?.name || session.customer_details?.name || '—'],
      ['Email', session.customer_details?.email || '—'],
      ['Téléphone', session.customer_details?.phone || '—'],
      ['Commande', extras.quantityLabel],
      ['Total payé', formatEur(session.amount_total)],
      ['Zone', session.metadata?.shipping_mode ? `${zone} · ${session.metadata.shipping_mode}` : zone],
      ...(relayLabel ? ([['Point relais', relayLabel]] as [string, string][]) : []),
      ['Adresse', formatAddress(session)],
      ['Facture', extras.invoiceHostedUrl || '—'],
      ['Paiement', paymentIntentId ? `https://dashboard.stripe.com/payments/${paymentIntentId}` : session.id],
    ]

    const alerts = [
      statusLine,
      domLeak
        ? '⚠️ Code postal 97x/98x avec la zone « France métropolitaine » : TVA et port métropole appliqués à tort — à régulariser à la main.'
        : undefined,
    ].filter(Boolean)

    const html = `
      <div style="font-family: Roboto, Arial, sans-serif; color: #265335; background:#F5ECE5; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#fff; border:2px solid #265335;">
          <div style="background:#265335; color:#F5ECE5; padding:20px 24px; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase;">
            Nouvelle pré-commande — Boutique WAC
          </div>
          ${alerts.map((a) => `<div style="padding:12px 24px; background:#FDF3E7; border-bottom:1px solid #E6D5C7; font-weight:700;">${a}</div>`).join('')}
          <table style="width:100%; border-collapse:collapse; padding:24px;">
            <tbody>
              ${rows
                .map(
                  ([k, v]) =>
                    `<tr>
                       <td style="padding:12px 24px; border-bottom:1px solid #E6D5C7; font-weight:700; width:120px;">${k}</td>
                       <td style="padding:12px 24px; border-bottom:1px solid #E6D5C7;">${v}</td>
                     </tr>`,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>`

    await mailer.transporter.sendMail({
      from: `"Boutique WAC" <${mailer.from}>`,
      to: notifyTo,
      replyTo: session.customer_details?.email || undefined,
      subject: `⛰️ Pré-commande — ${session.customer_details?.name || 'Client'} (${formatEur(session.amount_total)})`,
      html,
    })
  } catch (err) {
    console.error('stripe-webhook: échec envoi notification interne', err)
  }
}

/**
 * Email de confirmation CUSTOM au client (décision Julien 14/08) : récap de
 * commande + lien vers la facture Stripe (PDF hébergé par Stripe). On n'active
 * pas les emails automatiques du compte Stripe : réglage partagé avec le coach.
 * Best-effort : le reçu de paiement reste consultable côté Stripe quoi qu'il arrive.
 */
async function sendCustomerConfirmation(session: Stripe.Checkout.Session, extras: OrderExtras) {
  const mailer = getMailer()
  const customerEmail = session.customer_details?.email
  if (!mailer || !customerEmail) return

  try {
    const firstName = (session.customer_details?.name || '').trim().split(/\s+/)[0] || ''
    const invoiceLink = extras.invoicePdfUrl || extras.invoiceHostedUrl

    const relayLabel = session.metadata?.relay_id
      ? `Point relais ${session.metadata.relay_name || ''}, ${session.metadata.relay_zip || ''} ${session.metadata.relay_city || ''}`.trim()
      : null

    const rows: [string, string][] = [
      ['Commande', extras.quantityLabel],
      ['Total payé', formatEur(session.amount_total)],
      ['Livraison', relayLabel || formatAddress(session)],
      ...(PREORDER_PACK.deliveryWindow
        ? ([['Expédition estimée', PREORDER_PACK.deliveryWindow]] as [string, string][])
        : []),
    ]

    const html = `
      <div style="font-family: Roboto, Arial, sans-serif; color: #265335; background:#F5ECE5; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#fff; border:2px solid #265335;">
          <div style="background:#265335; color:#F5ECE5; padding:20px 24px; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase;">
            Ta pré-commande est confirmée
          </div>
          <div style="padding:24px; line-height:1.6;">
            <p style="margin:0 0 16px;">${firstName ? `Salut ${firstName},` : 'Salut,'}</p>
            <p style="margin:0 0 16px;">
              Merci de faire partie de la cordée ! Ta pré-commande est bien enregistrée
              et ton paiement confirmé. Voici le récapitulatif :
            </p>
          </div>
          <table style="width:100%; border-collapse:collapse;">
            <tbody>
              ${rows
                .map(
                  ([k, v]) =>
                    `<tr>
                       <td style="padding:12px 24px; border-top:1px solid #E6D5C7; font-weight:700; width:160px;">${k}</td>
                       <td style="padding:12px 24px; border-top:1px solid #E6D5C7;">${v}</td>
                     </tr>`,
                )
                .join('')}
            </tbody>
          </table>
          ${
            // Achat via créateur partenaire : l'octroi des 3 mois premium (Cloud
            // Functions app) s'apparie par EMAIL — si le compte app utilise une
            // autre adresse que celle du paiement, l'offre se perd en silence.
            // Ce bloc est le filet : dire à l'acheteur QUELLE adresse utiliser.
            session.metadata?.grant_premium_months === '3'
              ? `<div style="margin:24px 24px 0; padding:16px 20px; background:#F5ECE5; border-left:4px solid #D85A1A;">
                   <p style="margin:0 0 8px; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase; color:#D85A1A;">
                     3 mois d'abonnement premium offerts
                   </p>
                   <p style="margin:0 0 8px;">
                     Crée ton compte We Are Climbers dans l'app avec cette adresse —
                     <strong>${customerEmail}</strong> — et tes 3 mois s'activeront
                     automatiquement à la connexion.
                   </p>
                   <p style="margin:0; font-size:13px; opacity:.8;">
                     C'est un cadeau ? Transmets cet email à la personne qui utilisera le
                     bracelet — si son compte app utilise une autre adresse, il lui suffit
                     de répondre à cet email pour activer l'offre.
                   </p>
                 </div>`
              : ''
          }
          <div style="padding:24px; line-height:1.6;">
            ${
              invoiceLink
                ? `<p style="margin:0 0 20px;">
                     <a href="${invoiceLink}" style="display:inline-block; padding:14px 28px; background:#265335; color:#F5ECE5; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase; text-decoration:none;">
                       Télécharger ma facture (PDF)
                     </a>
                   </p>`
                : ''
            }
            <p style="margin:0 0 8px;">
              On te tiendra au courant de chaque étape, jusqu'à l'expédition de ton bracelet.
            </p>
            <p style="margin:0; font-size:13px; opacity:.7;">
              Une question ? Réponds simplement à cet email.<br/>
              Conditions Générales de Vente : <a href="https://www.weareclimbers.fr/cgv" style="color:#265335;">weareclimbers.fr/cgv</a> — rétractation possible 14 jours après réception.<br/>
              We Are Climbers — Grimpons mieux, plus longtemps.
            </p>
          </div>
        </div>
      </div>`

    await mailer.transporter.sendMail({
      from: `"We Are Climbers" <${mailer.from}>`,
      to: customerEmail,
      subject: '⛰️ Ta pré-commande We Are Climbers est confirmée',
      html,
    })
  } catch (err) {
    console.error('stripe-webhook: échec envoi confirmation client', err)
  }
}

/**
 * Ajout du client à la liste Brevo « clients pré-commande » (distincte de la
 * liste d'attente #11 et de la liste coachs #10). Nécessite BREVO_API_KEY +
 * BREVO_PREORDER_LIST_ID — skip silencieux (loggé) tant que la liste n'existe pas.
 */
async function addToBrevoPreorderList(session: Stripe.Checkout.Session) {
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_PREORDER_LIST_ID
  const email = session.customer_details?.email
  if (!email) return
  if (!apiKey || !listId) {
    const missing = [!apiKey && 'BREVO_API_KEY', !listId && 'BREVO_PREORDER_LIST_ID']
      .filter(Boolean)
      .join(' + ')
    // En local c'est attendu : BREVO_API_KEY ne vit que dans Vercel (choix post-purge git).
    console.error(`stripe-webhook: ${missing} absente(s) — client non ajouté à la liste Brevo`)
    return
  }

  try {
    const firstName = (session.customer_details?.name || '').trim().split(/\s+/)[0] || ''
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: { PRENOM: firstName },
        listIds: [parseInt(listId)],
        updateEnabled: true, // déjà en liste d'attente → le contact gagne juste la liste clients
      }),
    })
    if (!response.ok && response.status !== 204) {
      console.error('stripe-webhook: Brevo a refusé le contact', response.status, await response.text())
    }
  } catch (err) {
    console.error('stripe-webhook: échec ajout Brevo', err)
  }
}

async function handlePaidPreorder(session: Stripe.Checkout.Session) {
  const extras = await buildOrderExtras(session)
  // Chaque étape est best-effort : la commande est payée, rien ne doit lever.
  await notifyNewPreorder(session, extras)
  await sendCustomerConfirmation(session, extras)
  await addToBrevoPreorderList(session)
  // TODO(chantier Mondial Relay) : créer l'expédition via l'API Mondial Relay ici
  // (commande → colis/étiquette automatiques — sujet dédié à venir avec Julien).
}

export async function POST(request: NextRequest) {
  const whsec = process.env.STRIPE_WEBHOOK_SECRET
  if (!whsec) {
    console.error('stripe-webhook: STRIPE_WEBHOOK_SECRET manquante')
    return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Signature manquante' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const payload = await request.text()
    event = getStripe().webhooks.constructEvent(payload, signature, whsec)
  } catch (err) {
    console.error('stripe-webhook: signature invalide', err)
    return NextResponse.json({ error: 'Signature invalide' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.metadata?.flow !== PREORDER_FLOW) break // autre flux du compte → ignorer
        // completed avec payment_status 'unpaid' = moyen de paiement asynchrone :
        // on attend async_payment_succeeded pour considérer la commande payée.
        if (session.payment_status === 'paid') {
          await handlePaidPreorder(session)
        }
        break
      }
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.metadata?.flow !== PREORDER_FLOW) break
        await notifyNewPreorder(
          session,
          await buildOrderExtras(session),
          '❌ Paiement asynchrone ÉCHOUÉ — commande NON payée, ne pas expédier.',
        )
        break
      }
      default:
        // Event non géré (abonné par erreur ou ajouté plus tard) : 200 sans action.
        break
    }
  } catch (err) {
    // Erreur de traitement APRÈS signature valide : on log mais on renvoie 200 —
    // le paiement est déjà acté côté Stripe, et un 500 ferait rejouer l'event en
    // boucle (le traitement ici est de la notification best-effort, pas du critique).
    console.error('stripe-webhook: erreur de traitement', event.type, err)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
