import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDocumentRenderer from '@/components/LegalDocumentRenderer'
import type { LegalDocument } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Supprimer votre compte — WeAreClimbers',
  description:
    "Comment supprimer votre compte WeAreClimbers et les données associées : procédure dans l'application, demande par e-mail, données supprimées et durées de conservation.",
}

/**
 * Page dédiée « Suppression de compte » — exigence Google Play (Sécurité des
 * données → URL de suppression de compte) : la page doit citer le nom de
 * l'appli, afficher de manière bien distincte la procédure de suppression,
 * et préciser les types de données supprimées/conservées + durées.
 *
 * Hors du système LEGAL_DOCUMENTS (pas un doc légal versionné/mirroré coach) :
 * le doc est local à la page. Le champ `key` n'est pas lu par le renderer.
 */
const ACCOUNT_DELETION_DOC: LegalDocument = {
  key: 'privacy',
  title: 'Supprimer votre compte',
  subtitle: 'Application mobile WeAreClimbers — suppression du compte et des données associées',
  version: '1.0',
  lastUpdated: '2026-08-14',
  preamble: `Cette page décrit comment supprimer votre compte WeAreClimbers et l'ensemble des données associées, conformément à l'article 17 du RGPD (« droit à l'oubli »). La suppression est définitive à l'issue du délai de rétractation décrit ci-dessous.`,
  sections: [
    {
      id: '1',
      title: '1. Supprimer votre compte depuis l\'application (recommandé)',
      content: `1. Ouvrez l'application WeAreClimbers et connectez-vous.
2. Allez dans Réglages (depuis votre profil).
3. Ouvrez la section « Confidentialité & Sécurité ».
4. Touchez « Supprimer mon compte » (« Effacer définitivement toutes vos données »).
5. Confirmez la demande (une double confirmation vous est demandée).

Votre compte passe immédiatement en attente de suppression, puis est définitivement supprimé à l'issue du délai de rétractation (voir section 3).`,
    },
    {
      id: '2',
      title: '2. Sans accès à l\'application',
      content: `Si vous ne pouvez plus accéder à l'application (téléphone perdu, application désinstallée, mot de passe oublié), envoyez un e-mail à dpo@weareclimbers.fr depuis l'adresse e-mail associée à votre compte, avec pour objet « Suppression de mon compte ».

Nous traitons votre demande sous 30 jours maximum (délai RGPD), avec une vérification d'identité si nécessaire.

Comptes coach : la suppression est également accessible depuis la webapp coach (Paramètres → Mes données) ou par e-mail à la même adresse.`,
    },
    {
      id: '3',
      title: '3. Délai de rétractation et annulation',
      content: `Un délai de rétractation s'applique avant la suppression définitive :
- Comptes grimpeur (application mobile) : 7 jours
- Comptes coach : 30 jours

Pendant ce délai, si vous changez d'avis, reconnectez-vous simplement à l'application : elle vous proposera d'annuler la demande de suppression. Passé ce délai, la suppression est exécutée automatiquement et est irréversible.`,
    },
    {
      id: '4',
      title: '4. Données supprimées',
      content: `À l'issue du délai de rétractation, sont définitivement supprimés de nos serveurs (base de données et stockage de fichiers) :
- Votre compte d'authentification (e-mail, identifiants)
- Votre profil (nom, prénom, date de naissance, photo de profil, préférences)
- Vos séances d'escalade et d'entraînement, et toutes les statistiques dérivées
- Vos données de santé (fréquence cardiaque, variabilité cardiaque, sommeil, suivi du cycle menstruel, check-ins)
- Vos publications, commentaires et photos partagées dans la communauté
- Vos relations coach↔élève et les partages de données associés
- Vos consentements et paramètres de confidentialité, y compris les consentements parentaux le cas échéant`,
    },
    {
      id: '5',
      title: '5. Données conservées et durées',
      content: `Certaines données sont conservées de façon limitée après la suppression du compte :
- Journal d'audit horodaté de la demande de suppression : conservé comme preuve de l'exercice de vos droits (obligation de traçabilité RGPD)
- Logs techniques : 12 mois maximum
- Données comptables et de facturation, le cas échéant : 10 ans (obligation légale)
- Données déjà anonymisées (statistiques agrégées) : non rattachables à votre personne, non concernées par la suppression

L'historique de vos achats effectués via l'App Store (Apple) ou Google Play est conservé par Apple ou Google selon leurs propres politiques de confidentialité, indépendamment de WeAreClimbers.`,
    },
    {
      id: '6',
      title: '6. Abonnements en cours',
      content: `Important : la suppression de votre compte WeAreClimbers ne résilie pas automatiquement un abonnement en cours. Les abonnements sont gérés par votre store :
- iOS : Réglages → votre nom → Abonnements
- Android : application Google Play → Profil → Paiements et abonnements → Abonnements

Pensez à résilier votre abonnement pour éviter tout renouvellement après la suppression de votre compte.`,
    },
    {
      id: '7',
      title: '7. Supprimer une partie de vos données sans supprimer votre compte',
      content: `Vous pouvez également, sans supprimer votre compte :
- Supprimer individuellement vos séances ou vos publications depuis l'application
- Retirer votre consentement aux données de santé (bracelet, Apple Santé / Health Connect) ou aux statistiques d'usage à tout moment dans les Réglages
- Exporter l'ensemble de vos données (droit à la portabilité) : Réglages → Confidentialité & Sécurité → « Exporter mes données »

Pour en savoir plus sur le traitement de vos données : https://www.weareclimbers.fr/privacy — contact : dpo@weareclimbers.fr.`,
    },
  ],
}

export default function AccountDeletionPage() {
  return (
    <>
      <Header />
      <LegalDocumentRenderer doc={ACCOUNT_DELETION_DOC} />
      <Footer />
    </>
  )
}