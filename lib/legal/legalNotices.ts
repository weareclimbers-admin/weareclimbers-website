import type { LegalDocument } from './types';

/**
 * Mentions légales WeAreClimbers SAS — webapp coach + app mobile + site vitrine.
 *
 * MIROIR de `lib/legal/legalNotices.ts` du repo weareclimbers-coach.
 * Source de vérité = repo coach. Coordonner les bumps des deux côtés.
 */
export const LEGAL_NOTICES: LegalDocument = {
  key: 'legalNotices',
  title: 'Mentions Légales',
  subtitle: 'WeAreClimbers SAS',
  version: '1.0',
  lastUpdated: '2026-07-22',
  preamble: `Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique et du Code de la consommation, nous vous informons des mentions légales suivantes.`,
  sections: [
    {
      id: '1',
      title: '1. Informations Légales',
      subsections: [
        {
          id: '1.1',
          title: "1.1 Éditeur de l'application et de la webapp",
          content: `Raison sociale : WeAreClimbers
Forme juridique : SAS (Société par Actions Simplifiée)
Capital social : 1 000 €
Siège social : 97 Allée Théodore Monod, 64210 Bidart, France

Numéro SIRET : 98923006500017
Numéro TVA intracommunautaire : FR39989230065
Code APE/NAF : 3230Z

Directeur de la publication : Julien Salvadori (Président)

Contact :
- Email : contact@weareclimbers.fr
- Support : support@weareclimbers.fr
- Téléphone : +33 6 40 75 00 80`,
        },
        {
          id: '1.2',
          title: "1.2 Hébergement",
          content: `Site vitrine (weareclimbers.fr) :
- Hébergeur : Vercel Inc., 340 S Lemon Ave #4133, Walnut CA 91789, États-Unis
- Site : https://vercel.com
- Région de déploiement : Europe

Webapp coach (weareclimbers-coach) :
- Hébergeur : Vercel Inc., 340 S Lemon Ave #4133, Walnut CA 91789, États-Unis
- Site : https://vercel.com
- Régions de déploiement : Europe (Frankfurt, Paris)

Backend partagé (base de données, authentification, stockage) :
- Hébergeur : Google LLC (Firebase), 1600 Amphitheatre Parkway, Mountain View CA 94043, États-Unis
- Localisation des données : région europe-west9 (Paris, France)
- Site : https://firebase.google.com
- Conformité RGPD assurée par les Clauses Contractuelles Types de la Commission Européenne

Application mobile (iOS + Android) — stores de distribution :
- Apple App Store : Apple Inc., One Apple Park Way, Cupertino CA 95014, États-Unis
- Google Play Store : Google LLC, 1600 Amphitheatre Parkway, Mountain View CA 94043, États-Unis`,
        },
        {
          id: '1.3',
          title: "1.3 Délégué à la Protection des Données (DPO)",
          content: `Conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), WeAreClimbers a désigné un Délégué à la Protection des Données :

Fonction assurée en interne par Julien Salvadori.

Contact :
- Email : dpo@weareclimbers.fr
- Adresse postale : WeAreClimbers — DPO, 97 Allée Théodore Monod, 64210 Bidart, France`,
        },
      ],
    },
    {
      id: '2',
      title: '2. Propriété Intellectuelle',
      subsections: [
        {
          id: '2.1',
          title: '2.1 Droits de Propriété',
          content: `L'ensemble des éléments constituant l'application WeAreClimbers et la webapp coach est protégé par le droit de la propriété intellectuelle.

Sont notamment protégés :
- Le nom « WeAreClimbers », les logos, marques, graphismes
- Le code source, l'architecture logicielle, les algorithmes
- Les bases de données et leur structure
- Les contenus éditoriaux (articles, tutoriels, descriptions de défis, modèles de séance pré-faits)
- Le design, l'interface utilisateur, l'ergonomie
- Les métriques scientifiques et leurs calculs (Foster Score, monotonie, contraintes, État de forme, sollicitation, etc.)

Titulaire des droits : WeAreClimbers SAS. Tous droits réservés.`,
        },
        {
          id: '2.2',
          title: '2.2 Utilisation Autorisée',
          content: `L'utilisation de WeAreClimbers (application mobile et webapp coach) est régie par nos Conditions Générales d'Utilisation.

Vous êtes autorisé à :
- Utiliser le service à des fins personnelles ou professionnelles (coachs)
- Créer du contenu (photos, vidéos, textes, modèles de séance, exercices custom) et le publier ou le partager selon les CGU

Vous n'êtes pas autorisé à :
- Reproduire, copier, modifier ou distribuer tout ou partie du service
- Effectuer de l'ingénierie inverse du code source
- Utiliser les marques, logos sans autorisation écrite préalable
- Extraire massivement des données (scraping)
- Créer des applications dérivées ou concurrentes`,
        },
        {
          id: '2.3',
          title: '2.3 Marques de Tiers',
          content: `Les marques suivantes appartiennent à leurs propriétaires respectifs :

- Polar® : Polar Electro Oy (Finlande)
- Firebase® : Google LLC
- Apple®, App Store®, iOS® : Apple Inc.
- Android®, Google Play® : Google LLC
- Vercel® : Vercel Inc.
- Strava® : Strava, Inc.

Leur mention dans le service n'implique aucune affiliation, partenariat ou approbation de leur part sauf indication contraire.`,
        },
        {
          id: '2.4',
          title: '2.4 Contenu Utilisateur',
          content: `Vous conservez tous les droits de propriété intellectuelle sur le contenu que vous créez et publiez (photos, vidéos, textes, sessions d'escalade, modèles de séance coach, exercices custom).

En publiant du contenu sur WeAreClimbers, vous nous accordez une licence d'utilisation conformément à nos Conditions Générales d'Utilisation et selon vos paramètres de confidentialité.`,
        },
        {
          id: '2.5',
          title: '2.5 Signalement de Violation',
          content: `Si vous estimez que votre propriété intellectuelle a été violée sur WeAreClimbers, contactez-nous :

Email : legal@weareclimbers.fr

Fournissez les informations suivantes :
- Vos coordonnées complètes
- Description précise de l'œuvre protégée
- Localisation du contenu litigieux dans l'app ou la webapp
- Preuve de vos droits (liens, registres, etc.)
- Déclaration sur l'honneur de bonne foi`,
        },
      ],
    },
    {
      id: '3',
      title: '3. Protection des Données Personnelles',
      subsections: [
        {
          id: '3.1',
          title: '3.1 Responsable de Traitement',
          content: `WeAreClimbers SAS est responsable du traitement de vos données personnelles au sens du RGPD (Règlement UE 2016/679).

Pour toute information sur :
- Les données collectées
- Les finalités de traitement
- Vos droits (accès, rectification, effacement, etc.)
- Les mesures de sécurité

Consultez notre Politique de Confidentialité complète.`,
        },
        {
          id: '3.2',
          title: '3.2 Données de Santé partagées coach↔élève',
          content: `Les coachs accèdent, avec le consentement explicite et révocable de l'élève, à certaines données de santé (HRV, sommeil, fréquence cardiaque, cycle menstruel sur option). Ces données sont qualifiées de catégorie particulière au sens de l'article 9 du RGPD.

Base légale : consentement explicite de l'élève (art. 9.2.a RGPD), avec toggle granulaire et révocable à tout moment depuis l'application mobile.

Voir Politique de Confidentialité pour le détail (durée, finalités, droits).`,
        },
        {
          id: '3.3',
          title: '3.3 Autorité de Contrôle',
          content: `Vous avez le droit de déposer une plainte auprès de l'autorité de protection des données compétente :

CNIL — Commission Nationale de l'Informatique et des Libertés
3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
Téléphone : 01 53 73 22 22
Site : https://www.cnil.fr
Formulaire de plainte : https://www.cnil.fr/fr/plaintes`,
        },
        {
          id: '3.4',
          title: '3.4 Cookies',
          content: `Le service WeAreClimbers utilise des cookies et technologies similaires. Pour plus d'informations, consultez notre Politique Cookies.

Gestion de vos préférences :
- Application mobile : Paramètres → Confidentialité → Cookies
- Webapp coach : Footer → Politique Cookies → Gérer mes préférences`,
        },
      ],
    },
    {
      id: '4',
      title: "4. Si vous êtes coach (statut professionnel)",
      content: `Cette section s'ajoute aux dispositions générales pour les utilisateurs ayant un compte coach sur la webapp WeAreClimbers.`,
      subsections: [
        {
          id: '4.1',
          title: '4.1 Statut d\'éducateur sportif',
          content: `En vous inscrivant comme coach, vous déclarez :
- Détenir une carte professionnelle d'éducateur sportif en cours de validité (article L.212-1 du Code du sport) OU être en cours d'obtention
- Avoir souscrit une assurance responsabilité civile professionnelle adaptée à votre activité
- Respecter les obligations déontologiques de votre profession

WeAreClimbers se réserve le droit de demander à tout moment la justification de ces éléments et de suspendre ou résilier le compte d'un coach ne pouvant les justifier.`,
        },
        {
          id: '4.2',
          title: '4.2 Responsabilité pédagogique',
          content: `Le coach utilise la webapp WeAreClimbers comme un outil d'aide à la programmation et au suivi. Il reste pleinement responsable de :
- La pertinence et la sécurité des séances qu'il programme pour ses élèves
- L'adaptation des recommandations au profil, niveau et état de santé de chaque élève
- L'interprétation des données affichées par la webapp (HRV, état de forme, monotonie, etc.)

WeAreClimbers SAS ne se substitue pas au coach dans son rôle de prescripteur d'entraînement. Les analyses et indicateurs affichés sont des estimations à valeur informative, jamais des prescriptions.`,
        },
        {
          id: '4.3',
          title: "4.3 Données des élèves",
          content: `Le coach accède aux données de ses élèves uniquement après leur consentement explicite (acceptation de l'invitation + toggles de partage granulaires côté mobile).

Le coach s'engage à :
- Utiliser ces données exclusivement à des fins pédagogiques liées au suivi de l'élève
- Ne pas les partager avec des tiers sans autorisation expresse de l'élève
- Respecter le retrait de consentement (l'accès est révoqué automatiquement par la rule Firestore dès que l'élève archive la relation)
- Signaler à WeAreClimbers SAS toute violation de données dont il aurait connaissance`,
        },
        {
          id: '4.4',
          title: '4.4 Mineurs sous coaching',
          content: `Si le coach invite un élève mineur de moins de 15 ans, l'élève passe par un workflow de consentement parental obligatoire au moment de son inscription mobile (validation par email du représentant légal). Le coach n'a aucun accès aux données de cet élève tant que le consentement parental n'est pas confirmé.

Pour les mineurs de 15 à 17 ans, le consentement est donné par le mineur lui-même conformément à l'article 45 de la loi Informatique et Libertés.

Le coach reste responsable du respect des dispositions spécifiques applicables aux mineurs dans le cadre de l'enseignement sportif.`,
        },
      ],
    },
    {
      id: '5',
      title: '5. Limitation de Responsabilité',
      subsections: [
        {
          id: '5.1',
          title: '5.1 Contenu Utilisateur',
          content: `WeAreClimbers est une plateforme de partage. Nous ne sommes pas responsables :
- Du contenu publié par les utilisateurs
- De l'exactitude, la légalité ou la qualité du Contenu Utilisateur
- Des interactions entre utilisateurs (conflits, rencontres, etc.)

Signalement : Utilisez le bouton « Signaler » dans l'app ou contactez moderation@weareclimbers.fr`,
        },
        {
          id: '5.2',
          title: '5.2 Données de Santé et Entraînement',
          content: `⚠️ AVERTISSEMENT IMPORTANT :
- WeAreClimbers n'est pas un dispositif médical certifié
- Les données de fréquence cardiaque (Polar) sont informatives uniquement
- Les métriques calculées (RPE, Foster Score, monotonie, État de forme, etc.) sont des estimations
- Les recommandations d'entraînement ne remplacent pas un avis médical professionnel
- Les analyses IA sont des suggestions, pas des prescriptions médicales

Consultez un médecin :
- Avant de commencer tout programme d'entraînement intensif
- Si vous avez des problèmes de santé cardiovasculaire
- Si vous ressentez des douleurs, vertiges ou symptômes inhabituels

Nous déclinons toute responsabilité pour :
- Les blessures liées à l'utilisation de nos programmes d'entraînement
- Les problèmes de santé résultant d'une utilisation inappropriée
- Les décisions médicales prises uniquement sur la base de nos données`,
        },
        {
          id: '5.3',
          title: '5.3 Appareils Tiers',
          content: `Intégration Polar :
- Nous ne sommes pas responsables du dysfonctionnement des bracelets Polar
- La précision des données dépend de la qualité du matériel et de son utilisation
- Pour tout problème matériel, contactez directement Polar Electro : https://support.polar.com

Autres intégrations tierces : Apple Health, Google Fit, Strava (à venir) — leurs conditions s'appliquent. Nous ne contrôlons pas ces services.`,
        },
        {
          id: '5.4',
          title: '5.4 Limitation Légale',
          content: `Dans les limites autorisées par la loi française, notre responsabilité totale ne pourra excéder :
- Le montant payé par vous au cours des 12 derniers mois
- Ou 100 € si vous utilisez la version gratuite

Dommages exclus : pertes de profits, revenus, données, opportunités, dommages indirects, consécutifs ou accessoires, préjudice moral (sauf en cas de faute lourde ou intentionnelle).`,
        },
        {
          id: '5.5',
          title: '5.5 Cas de Force Majeure',
          content: `Nous ne serons pas tenus responsables des manquements résultant d'événements de force majeure : catastrophes naturelles, pannes d'infrastructures tierces (Firebase, Vercel, stores, réseaux), cyberattaques majeures, guerres, émeutes, épidémies, modifications réglementaires imprévisibles.`,
        },
      ],
    },
    {
      id: '6',
      title: '6. Litiges et Médiation',
      subsections: [
        {
          id: '6.1',
          title: '6.1 Droit Applicable',
          content: `Les présentes mentions légales et l'ensemble des relations contractuelles avec WeAreClimbers SAS sont régies par le droit français.`,
        },
        {
          id: '6.2',
          title: '6.2 Médiation de la Consommation',
          content: `Conformément aux articles L.612-1 et suivants du Code de la consommation, vous avez le droit de recourir gratuitement à un service de médiation en cas de litige.

Médiateur compétent (à confirmer après inscription officielle) :
CM2C — Centre de Médiation de la Consommation de Conciliateurs de Justice
14 rue Saint-Jean, 75017 Paris
Email : cm2c@cm2c.net — Site : https://www.cm2c.net

Plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr/`,
        },
        {
          id: '6.3',
          title: '6.3 Juridiction Compétente',
          content: `En cas d'échec de la médiation, les tribunaux français sont compétents.

Pour les consommateurs (particuliers) :
- Le tribunal du lieu de votre domicile
- Le tribunal du siège social de WeAreClimbers SAS (Bayonne)
- Le tribunal du lieu de livraison effective (si applicable)

Pour les professionnels (coachs) : seuls les tribunaux de Bayonne, France, sont compétents.`,
        },
      ],
    },
    {
      id: '7',
      title: '7. Sécurité et Signalements',
      subsections: [
        {
          id: '7.1',
          title: "7.1 Sécurité du service",
          content: `Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :
- Chiffrement des communications (HTTPS/TLS)
- Authentification sécurisée (Firebase Auth)
- Chiffrement AES-256 des données sensibles côté client (cycle menstruel, date de naissance)
- Sauvegardes régulières
- Monitoring de sécurité 24/7

En cas de violation de données : notification CNIL sous 72h et notification utilisateurs concernés si risque élevé.`,
        },
        {
          id: '7.2',
          title: '7.2 Signaler une Vulnérabilité',
          content: `Programme de divulgation responsable. Si vous découvrez une faille de sécurité :

Email : security@weareclimbers.fr

Nous nous engageons à : répondre sous 48 heures, investiguer rapidement, corriger les vulnérabilités confirmées, vous créditer publiquement (si vous le souhaitez), ne pas engager de poursuites contre les chercheurs de bonne foi.`,
        },
        {
          id: '7.3',
          title: '7.3 Signalements Divers',
          content: `- Contenu inapproprié : moderation@weareclimbers.fr ou bouton « Signaler » dans l'app
- Violation propriété intellectuelle : legal@weareclimbers.fr
- Problème technique : support@weareclimbers.fr
- Réclamation générale : contact@weareclimbers.fr`,
        },
      ],
    },
    {
      id: '8',
      title: '8. Accessibilité',
      content: `Nous nous efforçons de rendre WeAreClimbers accessible au plus grand nombre. Bien que nous ne soyons pas soumis aux obligations du RGAA (Référentiel Général d'Amélioration de l'Accessibilité), nous appliquons les bonnes pratiques :
- Support VoiceOver (iOS) et TalkBack (Android)
- Vue tableau accessible WCAG AAA pour les graphiques de la webapp coach (alternative aux charts visuels)
- Contrastes vérifiés
- Navigation au clavier sur la webapp

Signaler un problème d'accessibilité : accessibility@weareclimbers.fr`,
    },
    {
      id: '9',
      title: '9. Contact et Réclamations',
      subsections: [
        {
          id: '9.1',
          title: '9.1 Service Client',
          content: `Email principal : contact@weareclimbers.fr
Support technique : support@weareclimbers.fr
Téléphone : +33 6 40 75 00 80

Horaires : Lundi au Vendredi, 9h-18h (heure de Paris)
Délai de réponse : 48 heures ouvrées maximum`,
        },
        {
          id: '9.2',
          title: '9.2 Adresse Postale',
          content: `WeAreClimbers SAS
97 Allée Théodore Monod
64210 Bidart
France`,
        },
      ],
    },
    {
      id: '10',
      title: '10. Mises à Jour des Mentions Légales',
      content: `Dernière modification : 22 juillet 2026
Version : 1.0

Nous pouvons modifier ces mentions légales à tout moment. Les modifications entrent en vigueur dès leur publication. En cas de modification substantielle, vous serez invité à les ré-accepter au prochain login.

Consultez régulièrement cette page pour vous tenir informé des éventuelles modifications.`,
    },
  ],
};
