import type { LegalDocument } from './types';

/**
 * Politique de Confidentialité WeAreClimbers — webapp coach + app mobile.
 *
 * MIROIR de `lib/legal/privacyPolicy.ts` du repo weareclimbers-coach.
 * Source de vérité = repo coach. Coordonner les bumps des deux côtés.
 */
export const PRIVACY_POLICY: LegalDocument = {
  key: 'privacy',
  title: 'Politique de Confidentialité',
  subtitle: 'RGPD — Traitement de vos données personnelles',
  version: '1.0',
  lastUpdated: '2026-05-19',
  preamble: `WeAreClimbers SAS attache une grande importance à la protection de vos données personnelles. La présente politique décrit les données collectées, les finalités, les bases légales, les durées de conservation, vos droits, et les modalités d'exercice de ces droits, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 dite « Informatique et Libertés ».`,
  sections: [
    {
      id: '1',
      title: '1. Responsable du traitement',
      content: `WeAreClimbers SAS, SIRET 98923006500017, dont le siège social est situé 97 Allée Théodore Monod, 64210 Bidart, France.

DPO (Délégué à la Protection des Données) : Julien Salvadori (fonction assurée en interne).
Contact : dpo@weareclimbers.fr.`,
    },
    {
      id: '2',
      title: '2. Données collectées',
      subsections: [
        {
          id: '2.1',
          title: '2.1 Données d\'identification',
          content: `Email, mot de passe (haché), nom et prénom, date de naissance (chiffrée AES-256 côté client), photo de profil optionnelle.

Pour les coachs : également le numéro de carte professionnelle d'éducateur sportif, type de diplôme, photo de la carte (stockage chiffré côté Firebase Storage avec accès admin restreint).`,
        },
        {
          id: '2.2',
          title: "2.2 Données d'usage",
          content: `Identifiants techniques (UID Firebase), historique de connexions, préférences utilisateur, paramètres de partage, identifiants des relations coach↔élève.`,
        },
        {
          id: '2.3',
          title: "2.3 Données d'entraînement (sessions)",
          content: `Date et heure des séances, durée totale et durée d'effort, type de séance (escalade bloc/voie/renfo), nombre de mouvements et de tentatives, RPE (Rate of Perceived Exertion), zones et localisations (optionnelles), photos optionnelles.

Indicateurs dérivés : Foster Score, monotonie, contraintes, TSB, État de forme (« Ready to Climb »), densité d'effort, sollicitation avant-bras.`,
        },
        {
          id: '2.4',
          title: '2.4 Données de santé — catégorie particulière (art. 9 RGPD)',
          content: `Si vous connectez un bracelet Polar : fréquence cardiaque, variabilité cardiaque (HRV), zones d'effort, sommeil nocturne, recharge nocturne. Ces données sont qualifiées de catégorie particulière au sens de l'article 9 du RGPD et nécessitent votre consentement explicite préalable.

Si vous activez le suivi du cycle menstruel : phase actuelle, jour du cycle, longueur du cycle. La date des dernières règles est chiffrée AES-256 côté client et n'est pas accessible aux serveurs WeAreClimbers en clair.

Indicateurs Hooper : sensation de fatigue, sommeil, courbatures, stress (échelles auto-déclarées).`,
        },
        {
          id: '2.5',
          title: "2.5 Données partagées coach↔élève",
          content: `Si vous êtes élève et acceptez une invitation coach, vous choisissez via des toggles granulaires quelles données partager avec votre coach :
- Séances futures (par défaut : oui)
- Historique des séances passées (par défaut : non, configurable à 1 mois / 3 mois / illimité)
- Données de cycle menstruel (par défaut : non)

Vous pouvez modifier ces choix ou révoquer entièrement l'accès à tout moment depuis l'application mobile (Paramètres → Mon Coach).`,
        },
      ],
    },
    {
      id: '3',
      title: '3. Finalités et bases légales',
      content: `- Fournir le service (création de compte, accès aux fonctionnalités) : exécution du contrat (art. 6.1.b RGPD)
- Données de santé (Polar, cycle) : consentement explicite (art. 6.1.a + 9.2.a RGPD)
- Partage coach↔élève : consentement explicite révocable de l'élève (art. 6.1.a + 9.2.a RGPD)
- Communications de service (email transactionnel, notifications) : exécution du contrat
- Sécurité du service, prévention de la fraude, modération : intérêt légitime (art. 6.1.f RGPD)
- Recherche scientifique anonymisée future (optionnel) : consentement séparé`,
    },
    {
      id: '4',
      title: '4. Durée de conservation',
      content: `- Compte actif : tant que le compte existe
- Après suppression : suppression effective à l'issue d'un délai de rétractation (7 jours pour les comptes grimpeur, 30 jours pour les comptes coach)
- Logs techniques : 12 mois
- Données comptables et de facturation (post-bêta) : 10 ans (obligation légale)
- Données de coaching liées à un mineur : suppression alignée sur le compte du mineur, avec possibilité pour le représentant légal de demander une suppression anticipée`,
    },
    {
      id: '5',
      title: '5. Vos droits',
      content: `Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès à vos données
- Droit de rectification
- Droit à l'effacement (« droit à l'oubli »)
- Droit à la limitation du traitement
- Droit à la portabilité (export de vos données dans un format structuré)
- Droit d'opposition
- Droit de retirer votre consentement à tout moment (sans effet rétroactif)
- Droit de déposer une plainte auprès de la CNIL (https://www.cnil.fr/fr/plaintes)

Exercice de vos droits :
- Application mobile : Paramètres → Mes données
- Webapp coach : Paramètres → Mes données
- Email : dpo@weareclimbers.fr

Délai de réponse : 30 jours maximum (1 mois RGPD).`,
    },
    {
      id: '6',
      title: '6. Mineurs',
      content: `Conformément à l'article 45 de la loi Informatique et Libertés :
- Mineurs de moins de 15 ans : consentement parental obligatoire, recueilli par email lors de l'inscription via un lien de confirmation envoyé au représentant légal. Le compte est créé mais l'accès est bloqué tant que le consentement n'est pas confirmé. Le parent peut révoquer ce consentement à tout moment, ce qui entraîne la suspension immédiate du compte.
- Mineurs de 15 à 17 ans : consentement donné par le mineur lui-même. Certaines fonctionnalités sociales peuvent être restreintes par défaut.

Information du représentant légal : pour les mineurs sous coaching, l'information sur les données partagées avec le coach est délivrée tant au mineur qu'à son représentant légal.`,
    },
    {
      id: '7',
      title: '7. Sécurité',
      content: `- Chiffrement des communications (HTTPS/TLS)
- Authentification sécurisée via Firebase Authentication
- Chiffrement AES-256 côté client pour les données sensibles (cycle menstruel, date de naissance)
- Règles d'accès Firestore strictes (rules versionnées et auditées)
- Sauvegardes régulières
- Monitoring de sécurité 24/7

En cas de violation de données : notification CNIL sous 72h et notification utilisateurs concernés si risque élevé.`,
    },
    {
      id: '8',
      title: '8. Sous-traitants et transferts hors UE',
      content: `Nous faisons appel aux sous-traitants suivants :
- Google LLC (Firebase Auth, Firestore, Storage, Cloud Functions) — données stockées en europe-west9 (Paris, France), pas de transfert hors UE en production
- Vercel Inc. (hébergement webapp coach) — région Paris (Europe)
- Resend (envoi d'emails transactionnels) — UE
- Polar Electro Oy (SDK bracelets) — données traitées localement sur votre appareil, pas de transfert serveur Polar par défaut

Lorsque des transferts hors UE sont nécessaires (États-Unis), ils sont encadrés par les Clauses Contractuelles Types de la Commission Européenne et/ou par des certifications type Data Privacy Framework.`,
    },
    {
      id: '9',
      title: '9. Cookies',
      content: `La webapp coach utilise des cookies strictement nécessaires au fonctionnement (session, préférences). Des cookies analytics optionnels peuvent être activés via votre consentement explicite (bandeau cookies). Voir Politique Cookies pour le détail.`,
    },
    {
      id: '10',
      title: '10. Modifications de la présente politique',
      content: `Toute modification substantielle vous sera notifiée par email et/ou bandeau dans l'application/webapp, et vous serez invité à la ré-accepter au prochain login.

Dernière mise à jour : 19 mai 2026 — Version 1.0`,
    },
  ],
};
