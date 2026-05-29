import type { LegalDocument } from './types';

/**
 * Conditions Générales d'Utilisation WeAreClimbers — webapp coach + app mobile.
 *
 * MIROIR de `lib/legal/cgu.ts` du repo weareclimbers-coach. Source de vérité = repo coach.
 * Toute modification doit être répercutée des deux côtés.
 *
 * Approche unifiée : couvre grimpeur (B2C app mobile) ET coach (B2B webapp).
 */
export const CGU: LegalDocument = {
  key: 'cgu',
  title: "Conditions Générales d'Utilisation",
  subtitle: 'Applicables aux grimpeurs et aux coachs WeAreClimbers',
  version: '1.0',
  lastUpdated: '2026-05-19',
  preamble: `Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'utilisation des services WeAreClimbers, exploités par WeAreClimbers SAS, immatriculée au RCS de Bayonne sous le numéro 989 230 065, dont le siège social est situé 97 Allée Théodore Monod, 64210 Bidart. Elles s'appliquent à tous les utilisateurs : grimpeurs (application mobile) et coachs (webapp).`,
  sections: [
    {
      id: '1',
      title: '1. Objet et acceptation',
      content: `WeAreClimbers édite (i) une application mobile à destination des grimpeurs permettant de suivre leur entraînement, et (ii) une webapp à destination des coachs d'escalade leur permettant d'accompagner leurs élèves.

L'inscription au service implique l'acceptation pleine et entière des présentes CGU, de la Politique de Confidentialité et de la Politique Cookies. Vous pouvez consulter ces documents à tout moment depuis votre compte ou depuis le pied de page de la webapp.

Toute utilisation du service implique également le respect de la législation française en vigueur.`,
    },
    {
      id: '2',
      title: '2. Inscription et compte',
      subsections: [
        {
          id: '2.1',
          title: '2.1 Inscription grimpeur (application mobile)',
          content: `Âge minimum : 15 ans (conformément à l'article 45 de la loi n° 78-17 dite « Informatique et Libertés »).

Pour les mineurs de moins de 15 ans, l'inscription nécessite le consentement préalable d'un titulaire de l'autorité parentale, recueilli par email via un lien de confirmation envoyé au représentant légal. Tant que ce consentement n'est pas confirmé, le compte est créé mais l'accès au service est bloqué.

Pour les mineurs de 15 à 17 ans : le mineur consent seul à l'inscription. Certaines fonctionnalités sociales (profil public, messagerie directe, géolocalisation) peuvent être restreintes par défaut.

L'inscription se fait via email + mot de passe (Firebase Auth) ou via un fournisseur d'identité tiers (Apple, Google).`,
        },
        {
          id: '2.2',
          title: "2.2 Inscription coach (webapp)",
          content: `L'inscription comme coach est ouverte aux personnes physiques majeures justifiant d'une carte professionnelle d'éducateur sportif en cours de validité (article L.212-1 du Code du sport), ou en cours d'obtention.

Lors de l'inscription, le coach est invité à fournir : nom, prénom, email, mot de passe, et à fournir ultérieurement son numéro de carte professionnelle pour validation manuelle par WeAreClimbers SAS.

Le coach accepte que son compte puisse être suspendu ou résilié s'il ne peut justifier de sa qualification professionnelle dans les délais raisonnables.`,
        },
        {
          id: '2.3',
          title: '2.3 Compte unique et confidentialité',
          content: `Chaque utilisateur dispose d'un compte personnel. Le partage de compte est interdit. Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité réalisée depuis votre compte.

En cas de soupçon de compromission, contactez immédiatement security@weareclimbers.fr.`,
        },
      ],
    },
    {
      id: '3',
      title: '3. Description des services',
      content: `Le service WeAreClimbers comprend notamment :
- Pour les grimpeurs : enregistrement des séances d'escalade, intégration optionnelle de bracelets Polar (fréquence cardiaque, HRV, sommeil), suivi du cycle menstruel (sur option), indicateurs d'état de forme et de charge d'entraînement, partage social, défis communautaires.
- Pour les coachs : tableau de bord agrégé des élèves, fiches individuelles, charts d'analyse (état de forme, monotonie, contraintes, vitalité, cycle, renforcement), invitations par code, programmation de séances (« reverse loop »), bibliothèque d'exercices et modèles de séance.

WeAreClimbers se réserve le droit de modifier, suspendre ou enrichir les fonctionnalités à tout moment, avec ou sans préavis.`,
    },
    {
      id: '4',
      title: '4. Tarification',
      content: `Pour la phase bêta, l'accès à la webapp coach est gratuit. La gratuité pourra être remplacée par un modèle d'abonnement (mensuel ou annuel) post-bêta. Les utilisateurs existants seront informés au moins 30 jours avant toute introduction de tarification, avec possibilité de continuer à utiliser le service à son tarif promotionnel pendant une période d'engagement.

L'application mobile grimpeur reste gratuite dans le cadre de cette version.`,
    },
    {
      id: '5',
      title: "5. Données et partage coach↔élève",
      content: `Les données générées par les grimpeurs (sessions, indicateurs, données Polar) restent leur propriété. Le partage avec un coach se fait uniquement après acceptation explicite de l'invitation par le grimpeur, qui peut à tout moment révoquer l'accès depuis l'application mobile (Paramètres → Mon Coach → Arrêter de partager).

Le coach s'engage à utiliser ces données exclusivement à des fins pédagogiques liées au suivi de l'élève et à ne pas les communiquer à des tiers sans autorisation expresse de l'élève.

Voir la Politique de Confidentialité pour le détail des données collectées, des finalités, des durées de conservation et de vos droits.`,
    },
    {
      id: '6',
      title: '6. Responsabilité',
      content: `WeAreClimbers SAS n'est pas un dispositif médical. Les métriques et recommandations affichées sont des estimations à valeur informative, jamais des prescriptions médicales. Consultez un professionnel de santé avant tout programme d'entraînement intensif ou en cas de problème cardiovasculaire connu.

Le coach reste pleinement responsable de la pertinence et de la sécurité des séances qu'il programme pour ses élèves, ainsi que de l'interprétation des données affichées.

Voir Mentions Légales section 5 pour le détail complet des limitations de responsabilité.`,
    },
    {
      id: '7',
      title: '7. Comportement attendu',
      content: `Sont notamment interdits : tout propos ou contenu illicite, haineux, discriminatoire, harcelant, à caractère sexuel non sollicité, dénigrant ou trompeur ; toute tentative de contourner les mécanismes de sécurité ; tout usage automatisé non autorisé (scraping, bots).

WeAreClimbers se réserve le droit de suspendre ou résilier sans préavis tout compte ne respectant pas ces règles. Voir Politique de Modération pour le détail des sanctions.`,
    },
    {
      id: '8',
      title: '8. Résiliation',
      content: `Vous pouvez supprimer votre compte à tout moment depuis Paramètres → Mes données → Supprimer mon compte. Un délai de rétractation de 30 jours s'applique : pendant cette période, vous pouvez annuler la suppression. À l'issue de ce délai, vos données seront supprimées définitivement (sauf obligations légales de conservation — voir Politique de Confidentialité).

WeAreClimbers peut résilier votre compte en cas de manquement aux CGU, après mise en demeure restée infructueuse sous 7 jours (sauf manquement grave justifiant une suspension immédiate).`,
    },
    {
      id: '9',
      title: '9. Modifications des CGU',
      content: `WeAreClimbers se réserve le droit de modifier les présentes CGU à tout moment. Toute modification substantielle vous sera notifiée par email et/ou par un bandeau dans l'application, et vous serez invité à les ré-accepter au prochain login.

En cas de refus d'accepter les nouvelles CGU, vous pouvez supprimer votre compte. La poursuite de l'utilisation du service après notification vaut acceptation.`,
    },
    {
      id: '10',
      title: '10. Droit applicable et juridiction',
      content: `Les présentes CGU sont régies par le droit français. En cas de litige, voir Mentions Légales section 6 (médiation, juridiction compétente).

Dernière mise à jour : 19 mai 2026 — Version 1.0`,
    },
  ],
};
