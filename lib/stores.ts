/**
 * Liens officiels vers les stores — source de vérité unique pour les CTA
 * « Télécharger l'app » du site (home, /l-app, …).
 *
 * NB : la page /start (onboarding colis) garde sa propre config historique
 * dans lib/onboarding.ts (elle gère un état « Bientôt » pré-lancement).
 * À unifier si besoin un jour.
 */
export const STORES = {
  appStoreUrl: 'https://apps.apple.com/fr/app/we-are-climbers/id6760418771',
  playStoreUrl:
    'https://play.google.com/store/apps/details?id=com.juliensalvadori.WeAreClimbersClean',
} as const
