import { NextRequest, NextResponse, after } from 'next/server'
import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import { getStripe } from '@/lib/stripe'
import { verifyWebhookSignature } from '@/lib/boxtal'

// Webhook Boxtal — suivi des colis (TRACKING_CHANGED) et documents (DOCUMENT_CREATED).
// Sécurité : en-tête `x-bxt-signature` = HMAC SHA256 du corps BRUT, secret =
// BOXTAL_WEBHOOK_SECRET (le même fourni à la souscription, cf. scripts/setup-boxtal-webhooks.mjs).
// Boxtal exige une réponse 2xx en < 2 s → on répond tout de suite et l'email de
// suivi part APRÈS la réponse via after(). Une souscription ne reçoit que les
// events des commandes créées par la MÊME app API v3.
//
// ⚠️ Non testable en localhost (Boxtal doit joindre une URL publique) : à valider
// en preview/prod, après avoir créé la souscription avec le script dédié.

/** Statuts de suivi qui déclenchent un email au client (jalons utiles seulement). */
const NOTIFY_STATUSES: Record<string, { subject: string; title: string; intro: string }> = {
  SHIPPED: {
    subject: '📦 Ton colis We Are Climbers est en route',
    title: 'Ton colis est en route',
    intro: 'Bonne nouvelle : ton bracelet vient d’être pris en charge par le transporteur.',
  },
  DELIVERED: {
    subject: '✅ Ton colis We Are Climbers est livré',
    title: 'Ton colis est livré',
    intro: 'Ton bracelet est arrivé ! On espère que tu vas l’adorer.',
  },
}

function getMailer(): { transporter: Mail; from: string } | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error('boxtal-webhook: config SMTP manquante — email non envoyé')
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

interface BoxtalTrackingEvent {
  type?: string
  shipmentExternalId?: string
  shippingOrderId?: string
  payload?: {
    trackings?: {
      status?: string
      message?: string
      trackingNumber?: string
      packageTrackingUrl?: string
    }[]
  }
}

/** Retrouve l'email + prénom du client via l'id PaymentIntent (= shipmentExternalId). */
async function findCustomer(externalId: string): Promise<{ email: string; firstName: string } | null> {
  try {
    const sessions = await getStripe().checkout.sessions.list({ payment_intent: externalId, limit: 1 })
    const session = sessions.data[0]
    const email = session?.customer_details?.email
    if (!email) return null
    const firstName = (session.customer_details?.name || '').trim().split(/\s+/)[0] || ''
    return { email, firstName }
  } catch (err) {
    console.error('boxtal-webhook: lookup client impossible', err)
    return null
  }
}

async function notifyTracking(event: BoxtalTrackingEvent) {
  const tracking = event.payload?.trackings?.[0]
  const tpl = NOTIFY_STATUSES[tracking?.status ?? '']
  if (!tpl) return // statut intermédiaire (IN_TRANSIT, etc.) → pas d'email

  const externalId = event.shipmentExternalId
  if (!externalId) return
  const customer = await findCustomer(externalId)
  if (!customer) return

  const mailer = getMailer()
  if (!mailer) return

  const trackLink = tracking?.packageTrackingUrl
  const html = `
    <div style="font-family: Roboto, Arial, sans-serif; color:#265335; background:#F5ECE5; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#fff; border:2px solid #265335;">
        <div style="background:#265335; color:#F5ECE5; padding:20px 24px; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase;">
          ${tpl.title}
        </div>
        <div style="padding:24px; line-height:1.6;">
          <p style="margin:0 0 16px;">${customer.firstName ? `Salut ${customer.firstName},` : 'Salut,'}</p>
          <p style="margin:0 0 16px;">${tpl.intro}</p>
          ${
            tracking?.trackingNumber
              ? `<p style="margin:0 0 8px;">Numéro de suivi : <strong>${tracking.trackingNumber}</strong></p>`
              : ''
          }
          ${
            trackLink
              ? `<p style="margin:16px 0;"><a href="${trackLink}" style="display:inline-block; padding:14px 28px; background:#265335; color:#F5ECE5; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase; text-decoration:none;">Suivre mon colis</a></p>`
              : ''
          }
          <p style="margin:16px 0 0; font-size:13px; opacity:.7;">
            Une question ? Réponds simplement à cet email.<br/>
            We Are Climbers — Grimpons mieux, plus longtemps.
          </p>
        </div>
      </div>
    </div>`

  await mailer.transporter.sendMail({
    from: `"We Are Climbers" <${mailer.from}>`,
    to: customer.email,
    subject: tpl.subject,
    html,
  })
}

export async function POST(request: NextRequest) {
  const secret = process.env.BOXTAL_WEBHOOK_SECRET
  if (!secret) {
    console.error('boxtal-webhook: BOXTAL_WEBHOOK_SECRET manquante')
    return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
  }

  const raw = await request.text()
  const signature = request.headers.get('x-bxt-signature')
  if (!verifyWebhookSignature(raw, signature, secret)) {
    return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
  }

  let event: BoxtalTrackingEvent
  try {
    event = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Corps illisible' }, { status: 400 })
  }

  // Réponse rapide (< 2 s exigé par Boxtal) : l'email part APRÈS la réponse.
  if (event.type === 'TRACKING_CHANGED') {
    after(() => notifyTracking(event).catch((err) => console.error('boxtal-webhook: échec notif suivi', err)))
  }
  // DOCUMENT_CREATED : non traité ici (étiquettes récupérées par le script d'expédition).

  return NextResponse.json({ received: true }, { status: 200 })
}
