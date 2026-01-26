import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Documentation Nodemailer: https://nodemailer.com/about/
// Configuration SMTP OVH: https://docs.ovh.com/fr/emails/generalites-sur-les-emails-mutualises/

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    if (!email.includes('@') || email.length < 5) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Le message est trop court' },
        { status: 400 }
      )
    }

    // Récupération des variables d'environnement SMTP OVH
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM
    const smtpTo = process.env.SMTP_TO

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom || !smtpTo) {
      console.error('Missing SMTP configuration in environment variables')
      return NextResponse.json(
        { error: 'Configuration serveur manquante. Contacte-nous directement à contact@weareclimbers.fr' },
        { status: 500 }
      )
    }

    // Configuration du transporteur SMTP avec OVH
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // true pour 465 (SSL), false pour 587 (TLS)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Options additionnelles pour OVH
      tls: {
        rejectUnauthorized: true,
      },
    })

    // Vérification de la connexion SMTP
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Erreur de configuration email. Contacte-nous directement à contact@weareclimbers.fr' },
        { status: 500 }
      )
    }

    // Mapper le sujet à un libellé lisible
    const subjectLabels: { [key: string]: string } = {
      general: 'Question générale',
      support: 'Support technique',
      bracelet: 'Bracelets connectés',
      partnership: 'Partenariat',
      press: 'Presse',
      other: 'Autre',
    }
    const subjectLabel = subjectLabels[subject] || subject

    // Préparer l'email au format HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Roboto', Arial, sans-serif;
              line-height: 1.6;
              color: #265335;
              background-color: #F5ECE5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border: 2px solid #265335;
            }
            .header {
              background-color: #265335;
              color: #F5ECE5;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 700;
              text-transform: uppercase;
            }
            .content {
              padding: 30px;
            }
            .info-row {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #E6D5C7;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 700;
              color: #265335;
              margin-bottom: 5px;
            }
            .value {
              color: #265335;
            }
            .message-box {
              background-color: #F5ECE5;
              padding: 20px;
              border-left: 4px solid #F67931;
              margin-top: 20px;
            }
            .footer {
              background-color: #265335;
              color: #F5ECE5;
              padding: 20px;
              text-align: center;
              font-size: 12px;
            }
            .footer a {
              color: #F67931;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 Nouveau message de contact</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <div class="label">Nom :</div>
                <div class="value">${name}</div>
              </div>
              <div class="info-row">
                <div class="label">Email :</div>
                <div class="value"><a href="mailto:${email}" style="color: #F67931;">${email}</a></div>
              </div>
              <div class="info-row">
                <div class="label">Sujet :</div>
                <div class="value">${subjectLabel}</div>
              </div>
              <div class="info-row">
                <div class="label">Message :</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #E6D5C7; text-align: center;">
                <p style="margin: 0; color: #265335; font-size: 14px;">
                  📧 <strong>Pour répondre :</strong> Clique sur "Répondre" ou envoie un email à <a href="mailto:${email}" style="color: #F67931;">${email}</a>
                </p>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;">© ${new Date().getFullYear()} We Are Climbers</p>
              <p style="margin: 5px 0 0 0;">
                <a href="https://weareclimbers.fr">weareclimbers.fr</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    // Version texte simple (fallback)
    const emailText = `
Nouveau message de contact We Are Climbers

Nom : ${name}
Email : ${email}
Sujet : ${subjectLabel}

Message :
${message}

---
Pour répondre, envoyez un email à ${email}
    `

    // Envoi de l'email
    await transporter.sendMail({
      from: `"${name} (via We Are Climbers)" <${smtpFrom}>`, // Adresse d'expédition
      to: smtpTo, // Adresse de destination (contact@weareclimbers.fr)
      replyTo: email, // Adresse de réponse = email de l'utilisateur
      subject: `[WAC Contact] ${subjectLabel} - ${name}`,
      text: emailText,
      html: emailHtml,
    })

    // Succès
    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès ! Nous te répondrons dans les plus brefs délais.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)

    // Erreur détaillée en développement, générique en production
    const errorMessage =
      process.env.NODE_ENV === 'development'
        ? `Erreur serveur : ${error instanceof Error ? error.message : 'Unknown error'}`
        : 'Erreur lors de l\'envoi du message. Contacte-nous directement à contact@weareclimbers.fr'

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
