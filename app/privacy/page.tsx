'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const PRIVACY_POLICY_CONTENT = {
  title: "Politique de Confidentialité WeAreClimbers",
  lastUpdate: "Date de publication",
  version: "1.0",
  summary: {
    title: "Résumé de la Politique de Confidentialité",
    sections: [
      {
        title: "Collecte, Utilisation et Partage des Données",
        items: [
          { question: "Vendons-nous vos données personnelles ?", answer: "Non, jamais." },
          { question: "Vendons-nous des données agrégées ?", answer: "Non." },
          { question: "Partageons-nous vos informations avec des tiers ?", answer: "Non, durant la phase beta. À l'avenir, uniquement avec votre consentement explicite pour des partenariats de recherche scientifique approuvés par comité d'éthique (données anonymisées)." },
          { question: "Utilisons-nous vos données à des fins publicitaires ?", answer: "Non, WeAreClimbers ne diffuse aucune publicité." },
          { question: "Utilisons-nous des données de santé sensibles ?", answer: "Oui, avec votre consentement explicite (données cardiaques Polar : fréquence cardiaque, HRV, zones d'effort)." },
          { question: "Protections pour les mineurs ?", answer: "Oui, âge minimum 16 ans. Entre 16-18 ans : profil privé par défaut, restrictions messagerie." },
          { question: "Suppression de vos données ?", answer: "Oui, suppression complète et irréversible sur demande, sauf obligations légales." }
        ]
      },
      {
        title: "Paramètres de Confidentialité",
        items: [
          { question: "Contrôlez-vous qui voit vos activités ?", answer: "Oui (public, abonnés uniquement, privé)." },
          { question: "Contrôlez-vous votre géolocalisation ?", answer: "Oui, précision approximative + masquage zones sensibles." },
          { question: "Profil public par défaut ?", answer: "Non, profil privé par défaut pour tous les nouveaux utilisateurs." },
          { question: "Téléchargement et suppression de données ?", answer: "Oui, export complet + suppression en un clic." }
        ]
      },
      {
        title: "Suivi et Cookies",
        items: [
          { question: "Suivons-nous votre localisation dans l'application ?", answer: "Oui, uniquement pendant vos sessions d'escalade, avec votre consentement." },
          { question: "Suivons-nous votre localisation hors application ?", answer: "Non, jamais." },
          { question: "Utilisons-nous des cookies non essentiels ?", answer: "Oui, uniquement pour analytics internes (Firebase), avec votre consentement." },
          { question: "Suivons-nous votre navigation sur d'autres sites ?", answer: "Non." }
        ]
      }
    ]
  },
  sections: [
    {
      id: "1",
      title: "1. Introduction",
      subsections: [
        {
          id: "1.1",
          title: "Qui sommes-nous ?",
          content: `WeAreClimbers est une application mobile d'escalade qui combine un système d'entraînement scientifique et un réseau social spécialisé. Nous sommes basés en France et nous engageons à protéger votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD).

Responsable du traitement des données :
WeAreClimbers SAS
Capital social : 1 000 EUR
97 Allée Théodore Monod
64210 Bidart
France
SIRET : 98923006500017
TVA : FR39989230065
Email : privacy@weareclimbers.com
Support : support@weareclimbers.com
Téléphone : +33 6 40 75 00 80

Délégué à la Protection des Données (DPO) :
Fonction assurée en interne
Email : dpo@weareclimbers.com`
        },
        {
          id: "1.2",
          title: "À qui s'applique cette politique ?",
          content: `Cette politique s'applique à tous les utilisateurs de WeAreClimbers, où qu'ils se trouvent. Nous fournissons les mêmes protections de confidentialité à tous nos utilisateurs dans le monde entier.

Langue de référence : Cette politique a été rédigée en français. En cas de conflit avec une version traduite, la version française prévaut.`
        }
      ]
    },
    {
      id: "2",
      title: "2. Informations que Nous Collectons",
      content: `Nous collectons des informations lorsque vous utilisez WeAreClimbers. Les sources se divisent en trois catégories : informations que vous fournissez, informations collectées automatiquement, et informations provenant de sources tierces.`,
      subsections: [
        {
          id: "2.1",
          title: "2.1 Informations de Compte et Profil",
          content: `Ce que nous collectons :
• Nom et prénom (ou pseudonyme si vous préférez)
• Adresse email (utilisée comme identifiant unique)
• Date de naissance (pour vérifier l'âge minimum de 16 ans)
• Sexe (optionnel, pour calculs scientifiques personnalisés)
• Poids et taille (optionnels, pour calculs de calories et métriques)
• Mot de passe (stocké sous forme chiffrée)
• Photo de profil (optionnelle)
• Niveau d'escalade et historique d'entraînement

Pourquoi nous les collectons :
• Créer et sécuriser votre compte
• Personnaliser votre expérience d'entraînement
• Calculer des métriques scientifiques précises (calories, Foster Score, etc.)
• Vous identifier dans le réseau social

Base légale : Exécution du contrat (fourniture du service) + Consentement pour données optionnelles.`
        },
        {
          id: "2.2",
          title: "2.2 Données d'Activité et d'Entraînement",
          content: `Ce que nous collectons :
• Défis quotidiens : Complétions, durées, timestamps
• Sessions d'escalade : Date, heure, durée totale, temps d'effort
• Métriques manuelles actuelles : RPE (Rate of Perceived Exertion 1-10), E-WAC, S-WAC, pourcentage de réussite, CWAC, IWAC, FWAC
• Métriques calculées : Foster Score, monotonie, contraintes, points, niveaux, streaks
• Badges et accomplissements : Progression dans le système de gamification
• Photos et vidéos : Contenu que vous uploadez sur vos sessions
• Publications sociales : Posts, commentaires, likes, mentions

Pourquoi nous les collectons :
• Suivre votre progression et calculer vos performances
• Générer des recommandations d'entraînement personnalisées
• Vous permettre de partager vos accomplissements avec la communauté
• Créer des graphiques et analyses avancées

Base légale : Exécution du contrat + Consentement pour partage social.`
        },
        {
          id: "2.3",
          title: "2.3 Données de Santé Sensibles (Polar Integration)",
          content: `IMPORTANT : Données Particulièrement Sensibles

Ce que nous collectons via bracelets Polar (H10/Verity Sense) :
• Fréquence cardiaque en temps réel
• Heart Rate Variability (HRV)
• Zones d'effort (récupération, aérobie, anaérobie)
• Temps passé dans chaque zone
• Pics de fréquence cardiaque
• Données R-R intervals (pour calculs avancés)

IMPORTANT : Vous devez donner votre consentement explicite avant de pouvoir connecter un bracelet Polar et envoyer des données de santé à WeAreClimbers. Sans ce consentement, vous ne pourrez pas utiliser l'intégration Polar, mais vous pourrez continuer à utiliser l'application avec saisie manuelle des métriques.

Comment nous utilisons ces données :
• Calculer automatiquement votre RPE basé sur votre fréquence cardiaque
• Détecter automatiquement les phases d'effort et de repos
• Générer des recommandations d'intensité optimale
• Prédire votre niveau de fatigue via HRV
• Améliorer la précision de vos analyses de performance
• Enrichir les insights de notre système d'IA

Vous pouvez retirer votre consentement à tout moment dans Paramètres > Confidentialité > Données de Santé. Les futures sessions n'incluront plus de données cardiaques, mais les sessions passées conserveront les données conformément au consentement donné à ce moment-là.

Base légale : Consentement explicite (RGPD Article 9).`
        },
        {
          id: "2.4",
          title: "2.4 Données de Géolocalisation",
          content: `Ce que nous collectons :
• Localisation approximative des spots d'escalade (ville, région)
• Check-ins ponctuels sur des spots
• Localisation partagée temporairement avec d'autres grimpeurs (use case : retrouver des amis sur un spot)

Ce que nous NE collectons PAS :
• Votre position en temps réel en dehors de l'application
• L'historique complet de vos déplacements
• Votre adresse personnelle

Masquage automatique : Vous pouvez définir des "Zones de Confidentialité" (domicile, travail) qui seront automatiquement masquées sur vos activités visibles publiquement.

Pourquoi nous les collectons :
• Suggérer des salles et spots d'escalade à proximité
• Vous permettre de découvrir où grimpent d'autres utilisateurs
• Faciliter l'organisation de sorties collectives

Base légale : Consentement (permissions appareil).`
        },
        {
          id: "2.5",
          title: "2.5 Appareils et Applications Connectés",
          content: `Intégrations prévues à terme :
• Google Fit / Apple Health (export/import données)
• Autres apps fitness tierces
• App suivi de cycle menstruel (Flow, Clue)
• Apps des salles d'escalade (Social Boulder, WeClimb...)

Données Polar : Voir section 2.3. Polar n'a aucun accès à vos données WeAreClimbers. La connexion est unidirectionnelle : bracelet Polar → WeAreClimbers uniquement.

Base légale : Consentement lors de la connexion de chaque service.`
        },
        {
          id: "2.6",
          title: "2.6 Informations Techniques et Cookies",
          content: `Ce que nous collectons automatiquement :
• Appareil : Type, modèle, système d'exploitation, version de l'app
• Connexion : Adresse IP, fournisseur d'accès Internet
• Utilisation : Pages consultées, fonctionnalités utilisées, temps passé
• Logs techniques : Erreurs, crashes, performances

Cookies et technologies similaires :
• Cookies essentiels : Authentification, sécurité (obligatoires)
• Cookies analytics : Firebase Analytics pour comprendre l'usage (optionnels, avec consentement)
• Pas de cookies publicitaires : WeAreClimbers ne diffuse aucune publicité

Base légale : Intérêt légitime (sécurité, amélioration du service) + Consentement (cookies analytics).`
        },
        {
          id: "2.7",
          title: "2.7 Informations Provenant d'Autres Utilisateurs",
          content: `Nous collectons des informations vous concernant lorsque d'autres utilisateurs :
• Vous mentionnent dans des posts (@utilisateur)
• Commentent vos activités
• Vous envoient des demandes d'abonnement
• Vous signalent pour modération
• Partagent des défis ou challenges avec vous`
        }
      ]
    },
    {
      id: "3",
      title: "3. Comment Nous Utilisons Vos Informations",
      subsections: [
        {
          id: "3.1",
          title: "3.1 Fournir et Améliorer les Services",
          content: `Système d'entraînement :
• Tracker vos défis quotidiens et progression
• Calculer vos métriques scientifiques (Foster Score, monotonie, contraintes)
• Générer des graphiques et analyses de performance
• Attribuer des badges et gérer votre système de points
• Créer des recommandations d'entraînement personnalisées

Réseau social :
• Afficher vos publications aux utilisateurs autorisés (selon vos paramètres)
• Gérer vos abonnements et abonnés
• Envoyer des notifications (likes, commentaires, nouveaux abonnés)
• Faciliter les interactions dans les clubs et groupes

Intégration Polar (avec votre consentement) :
• Automatiser la collecte de métriques d'entraînement
• Remplacer la saisie manuelle par des données objectives
• Améliorer la précision de vos analyses`
        },
        {
          id: "3.2",
          title: "3.2 Intelligence Artificielle et Recommandations",
          content: `Nous utilisons des algorithmes d'apprentissage automatique pour :
• Analyser vos patterns de performance individuels
• Détecter les signaux de fatigue précoce
• Recommander des intensités d'entraînement optimales
• Suggérer des périodes de récupération
• Enrichir automatiquement vos sessions avec des insights
• Analyser l'impact de votre cycle menstruel sur vos performances (si activé)

Données utilisées : Historique de sessions, métriques cardiaques (si Polar activé), informations de cycle (si fournies), données de sommeil (si connectées).

Transparence IA : Toutes nos recommandations IA sont clairement identifiées comme telles et incluent une explication de leur logique.`
        },
        {
          id: "3.3",
          title: "3.3 Amélioration du Service et Recherche Scientifique Future",
          content: `Amélioration de l'application :
• Vos données anonymisées et agrégées sont utilisées pour améliorer nos algorithmes d'entraînement
• Ces données servent uniquement à optimiser l'expérience utilisateur et la précision de nos recommandations
• Aucune donnée personnelle identifiable n'est utilisée dans ce processus
• Les données sont traitées de manière strictement confidentielle au sein de WeAreClimbers

Recherche scientifique (fonctionnalité désactivée durant la phase beta) :
• WeAreClimbers prévoit de développer des partenariats de recherche universitaire sur l'escalade et la performance sportive
• Cette fonctionnalité sera activée uniquement après obtention d'une approbation par un comité d'éthique de la recherche (IRB - Institutional Review Board)
• Si cette fonctionnalité est activée à l'avenir, vous recevrez une notification et pourrez choisir d'y participer ou non via une option opt-in dédiée

Lorsque la fonctionnalité de recherche sera activée (post-beta) :
• Participation strictement volontaire avec consentement séparé
• Données anonymisées partagées uniquement avec partenaires universitaires approuvés
• Vos informations personnelles identifiables (nom, email, photos) systématiquement retirées
• Possibilité de retirer votre consentement à tout moment

Base légale : Intérêt légitime (amélioration service) + Consentement explicite séparé (recherche future).`
        },
        {
          id: "3.4",
          title: "3.4 Communication et Support",
          content: `Nous utilisons votre email pour :
• Confirmer la création de votre compte
• Réinitialiser votre mot de passe
• Vous informer de modifications importantes de nos services ou politiques
• Répondre à vos demandes d'assistance
• Envoyer des notifications importantes de sécurité

Communications marketing (opt-in) :
• Newsletters avec conseils d'entraînement
• Annonces de nouvelles fonctionnalités
• Invitations à des événements communautaires
• Offres d'abonnement premium (modèle freemium à venir)

Vous pouvez vous désabonner à tout moment via le lien dans chaque email ou dans Paramètres > Notifications.

Base légale : Exécution du contrat (emails essentiels) + Consentement (marketing).`
        },
        {
          id: "3.5",
          title: "3.5 Sécurité et Modération",
          content: `Nous utilisons vos informations pour :
• Détecter et prévenir les abus et violations de nos Conditions d'Utilisation
• Protéger les utilisateurs contre le harcèlement et le spam
• Traiter les signalements de contenu inapproprié
• Vérifier l'âge minimum de 16 ans
• Sécuriser les comptes contre les accès non autorisés
• Maintenir l'intégrité du système de points et badges

Outils automatisés : Nous utilisons des algorithmes pour détecter les comportements suspects (spam, contenus haineux), mais toutes les décisions de modération importantes sont prises par des humains.

Base légale : Intérêt légitime + Exécution du contrat.`
        }
      ]
    },
    {
      id: "4",
      title: "4. Partage de Vos Informations",
      content: `Principe fondamental : WeAreClimbers ne vend JAMAIS vos données personnelles et ne les partagera jamais à des fins publicitaires.`,
      subsections: [
        {
          id: "4.1",
          title: "4.1 Partage sur le Réseau Social (Selon Vos Paramètres)",
          content: `Informations potentiellement visibles par d'autres utilisateurs :
• Nom/pseudonyme et photo de profil
• Publications et activités (si publiques ou si l'utilisateur vous suit)
• Commentaires et likes sur du contenu public
• Appartenance à des clubs publics
• Position dans les classements de défis/challenges
• Statut en ligne (optionnel, désactivable)

Vous contrôlez TOUT : Chaque activité peut être publique, visible par vos abonnés uniquement, ou privée. Voir section 6.`
        },
        {
          id: "4.2",
          title: "4.2 Prestataires de Services",
          content: `Nous partageons certaines informations avec des prestataires techniques qui nous aident à fournir les services :

• Google Firebase : Hébergement base de données, authentification, analytics - Toutes données utilisateur - UE (Irlande)
• Google Cloud Storage : Stockage photos/vidéos - Images uploadées - UE
• Polar Electro : SDK bracelets cardiaques - Aucune (SDK local uniquement) - N/A
• Expo/EAS : Infrastructure application mobile - Logs techniques - UE/USA

Garanties : Tous nos prestataires sont soumis à des clauses contractuelles strictes de confidentialité et de protection des données conformes au RGPD. Ils ne peuvent utiliser vos données que pour nous fournir les services demandés.`
        },
        {
          id: "4.3",
          title: "4.3 Recherche Scientifique (Fonctionnalité Future)",
          content: `Statut actuel (Phase Beta) :
• La fonctionnalité de contribution à la recherche scientifique est actuellement désactivée
• Aucun partage de données avec des partenaires de recherche externe n'est effectué durant la phase beta

Lorsque la fonctionnalité sera activée (post-beta avec approbation IRB) :
• Participation strictement volontaire avec option opt-in dédiée
• Données anonymisées et agrégées uniquement
• Partenaires universitaires/laboratoires de recherche sélectionnés et approuvés
• Accords de confidentialité signés par les chercheurs
• Aucune donnée personnelle identifiable partagée`
        },
        {
          id: "4.4",
          title: "4.4 Obligations Légales",
          content: `Nous pouvons divulguer vos informations si requis par la loi :
• Répondre à une citation à comparaître ou décision judiciaire
• Se conformer à une loi, un règlement ou une demande gouvernementale
• Protéger nos droits, notre propriété ou notre sécurité
• Protéger les droits, la propriété ou la sécurité de nos utilisateurs`
        },
        {
          id: "4.5",
          title: "4.5 Transfert d'Entreprise",
          content: `En cas de fusion, acquisition, ou vente d'actifs, vos informations pourraient être transférées. Nous vous informerons avant tout transfert et vous offrirons la possibilité de supprimer votre compte.`
        }
      ]
    },
    {
      id: "5",
      title: "5. Protection de Vos Informations",
      subsections: [
        {
          id: "5.1",
          title: "5.1 Mesures de Sécurité Techniques",
          content: `Chiffrement :
• Connexions HTTPS/TLS pour toutes les communications
• Mots de passe chiffrés avec algorithmes modernes (bcrypt/Argon2)
• Données sensibles (santé) chiffrées au repos dans la base de données

Contrôles d'accès :
• Authentification multi-facteurs pour les comptes d'administration
• Principe du moindre privilège pour l'accès aux données
• Logs d'audit pour toutes les actions administratives

Infrastructure :
• Serveurs hébergés dans des datacenters certifiés (Firebase UE)
• Sauvegardes régulières et chiffrées
• Monitoring de sécurité 24/7`
        },
        {
          id: "5.2",
          title: "5.2 Mesures Organisationnelles",
          content: `• Formation de l'équipe sur la protection des données
• Procédures strictes de gestion des incidents de sécurité
• Audits de sécurité réguliers
• Politique de divulgation responsable des vulnérabilités`
        },
        {
          id: "5.3",
          title: "5.3 Votre Rôle",
          content: `Vous pouvez protéger votre compte en :
• Choisissant un mot de passe fort et unique
• Ne partageant jamais votre mot de passe
• Vous déconnectant sur appareils partagés
• Signalant rapidement toute activité suspecte

En cas de problème : Contactez immédiatement security@weareclimbers.com`
        }
      ]
    },
    {
      id: "6",
      title: "6. Vos Droits et Contrôles",
      subsections: [
        {
          id: "6.1",
          title: "6.1 Paramètres de Confidentialité",
          content: `Visibilité du profil :
• Public : Visible par tous, y compris non-utilisateurs sur Internet
• Abonnés uniquement : Visible seulement par vos abonnés approuvés
• Privé : Visible seulement par vous

Visibilité des activités (par défaut et par activité) :
• Public : Tout le monde peut voir
• Abonnés : Seulement vos abonnés
• Vous uniquement : Personne d'autre ne peut voir

Masquage de statistiques :
• Masquer la fréquence cardiaque sur activités spécifiques
• Masquer le poids ou d'autres métriques sensibles
• Masquer votre position exacte (Zones de Confidentialité)

Gérer vos paramètres : App > Paramètres > Confidentialité`
        },
        {
          id: "6.2",
          title: "6.2 Droits RGPD",
          content: `En tant que résident de l'UE, vous disposez des droits suivants :

Droit d'accès :
• Savoir quelles données nous détenons sur vous
• Obtenir une copie de vos données
• Comment : Paramètres > Télécharger Mes Données

Droit de rectification :
• Corriger des données inexactes
• Compléter des données incomplètes
• Comment : Modifiez directement dans l'app ou contactez-nous

Droit à l'effacement (droit à l'oubli) :
• Supprimer votre compte et toutes vos données
• Comment : Paramètres > Compte > Supprimer Mon Compte
• Délai : Suppression complète sous 45 jours maximum

Droit à la limitation du traitement :
• Restreindre comment nous utilisons vos données
• Comment : Contactez dpo@weareclimbers.com

Droit à la portabilité :
• Obtenir vos données dans un format lisible par machine (JSON)
• Transférer vos données vers un autre service
• Comment : Paramètres > Télécharger Mes Données

Droit d'opposition :
• Vous opposer au traitement basé sur l'intérêt légitime
• Vous opposer au marketing direct (désinscription en 1 clic)
• Comment : Paramètres > Notifications ou emails de désinscription

Droit de retirer le consentement :
• Retirer votre consentement pour données de santé Polar
• Retirer votre consentement pour recherche scientifique (lorsque la fonctionnalité sera activée post-beta)
• Comment : Paramètres > Confidentialité > [Option concernée]
• Note : Les données passées restent valides conformément au consentement donné à l'époque

Droit de déposer une plainte :
• Autorité compétente en France : CNIL (Commission Nationale de l'Informatique et des Libertés)
• Site web : https://www.cnil.fr
• Adresse : 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07`
        },
        {
          id: "6.3",
          title: "6.3 Exercer Vos Droits",
          content: `En ligne : La plupart de vos droits peuvent être exercés directement dans l'application.

Par email : Pour des demandes plus complexes, contactez dpo@weareclimbers.com avec :
• Votre nom et email de compte
• Votre demande précise
• Une preuve d'identité (si nécessaire pour vérification)

Délais de réponse : Nous répondons sous 1 mois maximum (prolongeable de 2 mois si complexe, avec notification).`
        }
      ]
    },
    {
      id: "7",
      title: "7. Conservation des Données",
      subsections: [
        {
          id: "7.1",
          title: "7.1 Durée de Conservation",
          content: `Compte actif :
• Données conservées tant que votre compte existe
• Vous pouvez supprimer des activités individuelles sans supprimer le compte

Après suppression du compte :
• Suppression complète et irréversible de vos données personnelles sous 45 jours
• Certaines données peuvent être conservées plus longtemps si :
  - Obligations légales : Factures/transactions (10 ans)
  - Litiges en cours : Jusqu'à résolution
  - Sécurité : Logs d'abus (6 mois après bannissement)

Données anonymisées :
• Après suppression, certaines données peuvent être anonymisées et agrégées (statistiques, amélioration du service)
• Ces données ne permettent plus de vous identifier personnellement
• Exemple : X% des utilisateurs ont complété le défi du lundi`
        },
        {
          id: "7.2",
          title: "7.2 Données Spécifiques",
          content: `Conservation selon le type de données :
• Profil et compte : Tant que compte actif - Supprimé sous 45j après suppression
• Sessions d'escalade : Tant que compte actif - Supprimé sous 45j
• Données Polar (HR/HRV) : Tant que compte actif - Supprimé sous 45j
• Photos/vidéos : Tant que compte actif - Supprimé sous 45j
• Messages privés : Tant que compte actif - Supprimé sous 45j
• Transactions/factures : 10 ans (obligation légale) - Conservé 10 ans
• Logs techniques : 12 mois - Anonymisé puis supprimé
• Données anonymisées : Indéfiniment - Non applicable (anonyme)`
        }
      ]
    },
    {
      id: "8",
      title: "8. Mineurs et Protection de l'Enfance",
      subsections: [
        {
          id: "8.1",
          title: "8.1 Âge Minimum : 16 ans",
          content: `WeAreClimbers est réservé aux personnes de 16 ans et plus. Nous appliquons des mesures techniques pour empêcher les personnes de moins de 16 ans de créer un compte.

Pourquoi 16 ans ?
• Conformité RGPD (Article 8) en France
• Protection des données de santé sensibles (fréquence cardiaque)
• Responsabilité éthique vis-à-vis des mineurs et du réseau social

Si vous avez moins de 16 ans : N'utilisez pas WeAreClimbers. Si nous découvrons qu'un utilisateur a moins de 16 ans, nous supprimerons immédiatement son compte.

Parents : Si vous pensez que votre enfant de moins de 16 ans a créé un compte, contactez-nous immédiatement à privacy@weareclimbers.com.`
        },
        {
          id: "8.2",
          title: "8.2 Protections pour les 16-18 ans",
          content: `Les utilisateurs âgés de 16 à 18 ans bénéficient de protections supplémentaires :

Paramètres par défaut :
• Profil en mode Abonnés uniquement (pas public)
• Activités en mode Abonnés uniquement par défaut
• Géolocalisation désactivée par défaut

Restrictions :
• Pas d'accès à la messagerie directe privée (prévention cyberharcèlement)
• Collecte limitée de données de santé (pas de HRV avancé)
• Modération renforcée des interactions

À 18 ans : Les restrictions sont levées automatiquement, mais vous gardez le contrôle total de votre confidentialité.`
        }
      ]
    },
    {
      id: "9",
      title: "9. Transferts Internationaux de Données",
      subsections: [
        {
          id: "9.1",
          title: "9.1 Hébergement Européen",
          content: `Localisation principale : Vos données sont stockées sur des serveurs Firebase situés dans l'Union Européenne (Irlande).

Conformité RGPD : Google Firebase applique les Clauses Contractuelles Types de la Commission Européenne pour garantir la protection de vos données.`
        },
        {
          id: "9.2",
          title: "9.2 Utilisateurs Français Uniquement (Phase Initiale)",
          content: `Actuellement : WeAreClimbers est disponible uniquement pour les utilisateurs résidant en France. Nous n'acceptons pas d'inscriptions depuis d'autres pays.

À l'avenir : Si nous étendons le service internationalement, nous mettrons à jour cette politique et vous en informerons.`
        },
        {
          id: "9.3",
          title: "9.3 Sous-Traitants Hors UE",
          content: `Certains prestataires techniques peuvent avoir des serveurs aux États-Unis (ex : Expo/EAS). Dans ce cas :
• Transferts limités à des données techniques non sensibles (logs d'erreurs)
• Clauses Contractuelles Types en place
• Pas de transfert de données de santé hors UE`
        }
      ]
    },
    {
      id: "10",
      title: "10. Cookies et Technologies Similaires",
      subsections: [
        {
          id: "10.1",
          title: "10.1 Types de Cookies",
          content: `Cookies strictement nécessaires (pas de consentement requis) :
• Authentification (vous garder connecté)
• Sécurité (prévenir attaques CSRF)
• Préférences de langue

Cookies analytics (consentement requis) :
• Firebase Analytics : Comprendre comment l'app est utilisée
• Données collectées : Pages vues, fonctionnalités utilisées, durée de session
• Objectif : Améliorer l'expérience utilisateur et corriger les bugs

Nous n'utilisons PAS :
• Cookies publicitaires
• Cookies de réseaux sociaux tiers (tracking cross-site)
• Cookies de profilage marketing`
        },
        {
          id: "10.2",
          title: "10.2 Gérer Vos Préférences",
          content: `Première visite : Nous vous demandons votre consentement via une bannière pour les cookies analytics.

Modifier vos choix : Paramètres > Confidentialité > Cookies

Refuser les cookies : Vous pouvez refuser les cookies analytics sans impacter l'utilisation de l'app (seule l'expérience pourrait être moins optimisée).`
        },
        {
          id: "10.3",
          title: "10.3 Technologies Mobiles Similaires",
          content: `Identifiants appareil :
• iOS : IDFA (Identifier for Advertisers) - Non utilisé
• Android : AAID (Android Advertising ID) - Non utilisé
• Identifiants techniques uniquement pour analytics internes avec consentement`
        }
      ]
    },
    {
      id: "11",
      title: "11. Intelligence Artificielle et Algorithmes",
      subsections: [
        {
          id: "11.1",
          title: "11.1 Transparence IA",
          content: `WeAreClimbers utilise l'intelligence artificielle pour améliorer votre expérience d'entraînement :

Utilisations IA :
• Conversion automatique données cardiaques → RPE calculé
• Détection de phases effort/repos dans vos sessions
• Prédictions de fatigue basées sur HRV
• Recommandations d'intensité personnalisées
• Analyse des corrélations entre entraînement et performance

Données utilisées :
• Historique de vos sessions (métriques, durées)
• Données cardiaques Polar (si activées)
• Informations de cycle menstruel (si fournies)
• Données de sommeil (si connectées)

Transparence :
• Toutes les recommandations IA sont clairement identifiées comme telles
• Vous pouvez voir l'explication de chaque recommandation
• Vous pouvez désactiver les recommandations IA dans Paramètres > IA`
        },
        {
          id: "11.2",
          title: "11.2 Amélioration des Modèles",
          content: `Comment nous améliorons nos algorithmes :
• Données agrégées et anonymisées de tous les utilisateurs
• Tests A/B sur nouvelles fonctionnalités (opt-out possible)
• Feedback utilisateur sur la pertinence des recommandations

Vos données personnelles identifiables ne sont JAMAIS utilisées pour entraîner des modèles IA externes (ex : OpenAI, Google) sans votre consentement explicite.`
        },
        {
          id: "11.3",
          title: "11.3 Décisions Automatisées",
          content: `Aucune décision significative automatisée : Nous n'utilisons pas l'IA pour prendre des décisions qui vous affecteraient significativement (ex : bannissement, refus d'accès) sans intervention humaine.

Modération assistée : Les signalements de contenu peuvent être pré-triés par IA, mais toutes les décisions finales sont prises par des modérateurs humains.`
        }
      ]
    },
    {
      id: "12",
      title: "12. Sécurité et Incidents",
      subsections: [
        {
          id: "12.1",
          title: "12.1 Notification de Violation de Données",
          content: `En cas de violation de sécurité affectant vos données :
• Notification à la CNIL sous 72 heures (obligation légale)
• Notification directe à vous sous 72 heures si risque élevé pour vos droits
• Communication transparente sur : nature de la violation, données affectées, mesures prises`
        },
        {
          id: "12.2",
          title: "12.2 Signaler une Vulnérabilité",
          content: `Programme de divulgation responsable :
• Email : security@weareclimbers.com
• Nous nous engageons à répondre sous 48 heures
• Pas de poursuites légales contre les chercheurs en sécurité agissant de bonne foi`
        }
      ]
    },
    {
      id: "13",
      title: "13. Modifications de cette Politique",
      subsections: [
        {
          id: "13.1",
          title: "13.1 Mises à Jour",
          content: `Nous pouvons modifier cette Politique de Confidentialité pour refléter :
• Nouvelles fonctionnalités (ex : intégration Polar)
• Évolutions réglementaires
• Retours utilisateurs et meilleures pratiques`
        },
        {
          id: "13.2",
          title: "13.2 Notification",
          content: `En cas de modification importante :
• Email à tous les utilisateurs au moins 30 jours avant
• Notification in-app
• Archive des anciennes versions accessible

En cas de modification mineure :
• Mise à jour de la date d'entrée en vigueur
• Notification in-app

Votre choix : Si vous n'acceptez pas les nouvelles conditions, vous pouvez supprimer votre compte avant leur entrée en vigueur.`
        }
      ]
    },
    {
      id: "14",
      title: "14. Nous Contacter",
      content: `Questions sur la Confidentialité

Délégué à la Protection des Données (DPO) :
Fonction assurée en interne
Email : dpo@weareclimbers.com

Support général :
Email : support@weareclimbers.com
Téléphone : +33 6 40 75 00 80
Site web : https://support.weareclimbers.com

Sécurité :
Email : security@weareclimbers.com

Adresse postale :
WeAreClimbers SAS
97 Allée Théodore Monod
64210 Bidart
France

Autorité de Protection des Données

CNIL (Commission Nationale de l'Informatique et des Libertés)
Adresse : 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
Téléphone : 01 53 73 22 22
Site web : https://www.cnil.fr
Formulaire de plainte : https://www.cnil.fr/fr/plaintes`
    },
    {
      id: "15",
      title: "15. Versions Précédentes",
      content: `Consultez les versions précédentes de cette politique : [Lien vers archive]`
    }
  ],
  footer: `Dernière mise à jour : [Date]
Version : 1.0

© 2025 WeAreClimbers. Tous droits réservés.`
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section className="py-20 bg-primary-green text-primary-beige">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl mb-6 font-syne">
                {PRIVACY_POLICY_CONTENT.title}
              </h1>
              <p className="text-lg md:text-xl font-roboto">
                Votre vie privée est notre priorité absolue
              </p>
            </div>
          </div>
        </section>

        {/* Metadata */}
        <section className="py-8 bg-secondary-beige-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4 font-roboto text-primary-green">
              <div>
                <span className="font-bold">Version :</span> {PRIVACY_POLICY_CONTENT.version}
              </div>
              <div>
                <span className="font-bold">Dernière mise à jour :</span> {PRIVACY_POLICY_CONTENT.lastUpdate}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary Section */}
        <section className="py-16 bg-primary-beige">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-12 text-primary-green font-syne">
              {PRIVACY_POLICY_CONTENT.summary.title}
            </h2>

            <div className="space-y-12">
              {PRIVACY_POLICY_CONTENT.summary.sections.map((summarySection) => (
                <div key={summarySection.title} className="p-8 shadow-md" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                  <h3 className="text-2xl mb-6 text-secondary-orange font-syne">
                    {summarySection.title}
                  </h3>

                  <div className="space-y-4">
                    {summarySection.items.map((item) => (
                      <div key={item.question} className="border-l-4 border-secondary-orange pl-4">
                        <p className="font-roboto font-bold text-primary-green mb-2">
                          {item.question}
                        </p>
                        <p className="font-roboto text-primary-green">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="py-16 bg-primary-beige">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="space-y-12">
              {PRIVACY_POLICY_CONTENT.sections.map((section) => (
                <div key={section.id} id={`section-${section.id}`} className="p-8 shadow-md" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
                  <h2 className="text-3xl mb-6 text-primary-green font-syne">
                    {section.title}
                  </h2>

                  {section.content && (
                    <p className="font-roboto text-primary-green mb-8 whitespace-pre-wrap">
                      {section.content}
                    </p>
                  )}

                  {section.subsections && (
                    <div className="space-y-8">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.id} className="border-l-4 border-secondary-orange pl-6">
                          <h3 className="text-xl mb-4 text-secondary-orange font-syne">
                            {subsection.title}
                          </h3>
                          <p className="font-roboto text-primary-green whitespace-pre-wrap leading-relaxed">
                            {subsection.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="py-12 bg-secondary-beige-light">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="font-roboto text-primary-green whitespace-pre-wrap text-center">
              {PRIVACY_POLICY_CONTENT.footer}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
