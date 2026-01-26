import { NextRequest, NextResponse } from 'next/server'

// Documentation Brevo API: https://developers.brevo.com/reference/createcontact

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    // Validation des données
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Récupération des variables d'environnement
    const apiKey = process.env.BREVO_API_KEY
    const listId = process.env.BREVO_LIST_ID

    if (!apiKey || !listId) {
      console.error('Missing BREVO_API_KEY or BREVO_LIST_ID in environment variables')
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // Préparation des données pour Brevo
    const contactData = {
      email: email.toLowerCase().trim(),
      attributes: {
        PRENOM: name || '',
        // On peut ajouter d'autres attributs ici plus tard
        // SOURCE: 'Website Early Access',
        // SIGNUP_DATE: new Date().toISOString()
      },
      listIds: [parseInt(listId)], // Ajout à la liste "Early Supporters WAC"
      updateEnabled: false // Force une erreur si le contact existe déjà
    }

    // Appel à l'API Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(contactData)
    })

    // Gestion de la réponse JSON (peut être vide)
    let data: any = {}
    try {
      const text = await response.text()
      if (text) {
        data = JSON.parse(text)
      }
    } catch (parseError) {
      console.error('Error parsing Brevo response:', parseError)
    }

    // Gestion des réponses Brevo
    if (response.ok) {
      // Succès : contact créé
      return NextResponse.json(
        {
          success: true,
          message: 'Inscription réussie !'
        },
        { status: 200 }
      )
    }

    // Détection des doublons (plusieurs formats possibles de Brevo)
    // Si status 400 et pas de data claire, on considère que c'est probablement un doublon
    const isDuplicate =
      response.status === 400 && (
        !data.code || // Pas de code = réponse vide = probablement doublon
        data.code === 'duplicate_parameter' ||
        data.code === 'invalid_parameter' ||
        data.message?.toLowerCase().includes('already exist') ||
        data.message?.toLowerCase().includes('contact already') ||
        data.message?.toLowerCase().includes('duplicate')
      )

    if (isDuplicate) {
      // Contact déjà existant - on essaie de le mettre à jour
      try {
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email.toLowerCase().trim())}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey
          },
          body: JSON.stringify({
            attributes: contactData.attributes,
            listIds: contactData.listIds
          })
        })

        if (updateResponse.ok) {
          return NextResponse.json(
            {
              success: true,
              message: 'Inscription confirmée ! Tu fais déjà partie du mouvement.'
            },
            { status: 200 }
          )
        } else {
          // Même si la mise à jour échoue, le contact existe déjà dans la liste
          return NextResponse.json(
            {
              success: true,
              message: 'Tu fais déjà partie du mouvement !'
            },
            { status: 200 }
          )
        }
      } catch (updateError) {
        console.error('Update contact error:', updateError)
        // Le contact existe déjà, donc on retourne quand même un succès
        return NextResponse.json(
          {
            success: true,
            message: 'Tu fais déjà partie du mouvement !'
          },
          { status: 200 }
        )
      }
    }

    // Erreur Brevo
    console.error('Brevo API error:', {
      status: response.status,
      code: data.code,
      message: data.message,
      fullData: data
    })
    return NextResponse.json(
      {
        error: 'Une erreur est survenue lors de l\'inscription. Réessaye dans quelques instants.',
        details: data.message || 'Unknown error'
      },
      { status: response.status }
    )

  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur. Réessaye dans quelques instants.' },
      { status: 500 }
    )
  }
}
