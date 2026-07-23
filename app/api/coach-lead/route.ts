import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Lead B2B "WAC Coach" → Brevo (liste dédiée coachs, distincte de la liste B2C).
// Nécessite les variables d'env : BREVO_API_KEY + BREVO_COACH_LIST_ID.
// Notifie aussi l'équipe par email (SMTP OVH) — destinataire configurable via
// COACH_NOTIFY_TO (fallback SMTP_TO). Best-effort : n'échoue jamais la demande.

interface CoachLead {
  email: string
  name?: string
  structure?: string
  profil?: string
}

/**
 * Notification interne "nouvelle demande de démo coach".
 * Réutilise le SMTP OVH du formulaire de contact. Ne lève jamais d'exception :
 * le lead est déjà enregistré dans Brevo, un échec d'email ne doit pas casser la demande.
 */
async function notifyNewCoachLead(lead: CoachLead) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  // Destinataire par défaut (surchargeable via COACH_NOTIFY_TO sans redéploiement)
  const notifyTo = process.env.COACH_NOTIFY_TO || 'julien@weareclimbers.fr'

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
    console.error('coach-lead: notification email non envoyée (config SMTP manquante)')
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT),
      secure: parseInt(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: { rejectUnauthorized: true },
    })

    const rows: [string, string][] = [
      ['Prénom', lead.name || '—'],
      ['Structure', lead.structure || '—'],
      ['Profil', lead.profil || '—'],
      ['Email', lead.email],
    ]

    const html = `
      <div style="font-family: Roboto, Arial, sans-serif; color: #265335; background:#F5ECE5; padding:24px;">
        <div style="max-width:560px; margin:0 auto; background:#fff; border:2px solid #265335;">
          <div style="background:#265335; color:#F5ECE5; padding:20px 24px; font-family:'Syne',Arial,sans-serif; font-weight:700; text-transform:uppercase;">
            Nouvelle demande de démo — WAC Coach
          </div>
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
          <div style="padding:0 24px 24px; font-size:13px; opacity:.7;">
            Ce contact a été ajouté à la liste Brevo « Coachs ». Pense à le recontacter.
          </div>
        </div>
      </div>`

    await transporter.sendMail({
      from: `"WAC Coach" <${SMTP_FROM}>`,
      to: notifyTo,
      replyTo: lead.email,
      subject: `🎓 Demande de démo — ${lead.name || 'Coach'}${lead.structure ? ` (${lead.structure})` : ''}`,
      html,
    })
  } catch (err) {
    console.error('coach-lead: échec envoi notification email', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, structure, profil } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    const listId = process.env.BREVO_COACH_LIST_ID

    if (!apiKey || !listId) {
      console.error('Missing BREVO_API_KEY or BREVO_COACH_LIST_ID in environment variables')
      return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 })
    }

    const lead: CoachLead = { email: email.toLowerCase().trim(), name, structure, profil }

    const contactData = {
      email: lead.email,
      attributes: {
        PRENOM: name || '',
        STRUCTURE: structure || '',
        PROFIL_COACH: profil || '', // "Coach indépendant" | "Club"
      },
      listIds: [parseInt(listId)],
      updateEnabled: true, // un coach qui redemande une démo met à jour son contact
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(contactData),
    })

    if (response.ok || response.status === 204) {
      await notifyNewCoachLead(lead)
      return NextResponse.json(
        { success: true, message: 'Merci ! On te recontacte très vite pour ta démo.' },
        { status: 200 },
      )
    }

    let data: { code?: string; message?: string } = {}
    try {
      const text = await response.text()
      if (text) data = JSON.parse(text)
    } catch {
      /* réponse vide */
    }

    // Avec updateEnabled:true, un doublon renvoie normalement un 2xx. On ne traite
    // donc en "déjà inscrit" QUE les codes explicitement liés au doublon — tout
    // autre 400 (ex. attribut STRUCTURE/PROFIL_COACH manquant) doit remonter,
    // pas être masqué en faux succès.
    const isDuplicate =
      data.code === 'duplicate_parameter' ||
      (data.message ?? '').toLowerCase().includes('already exist')

    if (isDuplicate) {
      await notifyNewCoachLead(lead)
      return NextResponse.json(
        { success: true, message: 'Ta demande est déjà enregistrée. On te recontacte !' },
        { status: 200 },
      )
    }

    console.error('Brevo coach-lead error:', { status: response.status, code: data.code, message: data.message })
    return NextResponse.json(
      { error: 'Une erreur est survenue. Réessaye dans quelques instants.' },
      { status: response.status },
    )
  } catch (error) {
    console.error('coach-lead API error:', error)
    return NextResponse.json({ error: 'Erreur serveur. Réessaye dans quelques instants.' }, { status: 500 })
  }
}
