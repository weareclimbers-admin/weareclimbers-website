/**
 * Config du parcours de démarrage /start (QR code glissé dans les colis).
 *
 * Page volontairement invisible : noindex, absente du sitemap et de la nav.
 * C'est LE fichier à remplir quand le contenu existe — IDs YouTube et liens
 * stores — aucun autre fichier à toucher.
 */

export type OnboardingVideo = {
  /**
   * Clé interne STABLE — sert à mémoriser la progression du visiteur
   * (localStorage). Ne pas la renommer une fois la page en ligne, sinon les
   * visiteurs déjà passés perdent leur avancement.
   */
  key: string
  /**
   * ID YouTube = la partie après `watch?v=` dans l'URL de la vidéo.
   * `null` = vidéo pas encore publiée → la page affiche un placeholder et
   * l'étape se débloque toute seule (le parcours reste testable de bout en bout).
   */
  youtubeId: string | null
  title: string
  description: string
}

export const ONBOARDING = {
  /** Étape 1 — le mot de remerciement */
  merci: {
    video: {
      key: 'merci',
      youtubeId: null,
      title: "Un mot de l'équipe",
      description: 'Deux minutes pour te dire merci — et te raconter la suite.',
    } satisfies OnboardingVideo,
  },

  /** Étape 2 — présentation du bracelet (regardées dans l'ordre affiché) */
  bracelet: {
    videos: [
      {
        key: 'bracelet-premiers-pas',
        youtubeId: null,
        title: 'Premiers pas avec ton bracelet',
        description: 'Déballage, mise en charge, mise en route : le tour du propriétaire.',
      },
      {
        key: 'bracelet-etats',
        youtubeId: null,
        title: 'Comprendre ses états',
        description: "Ce que le bracelet te dit selon ses signaux — et ce qu'il fait en ce moment.",
      },
      {
        key: 'bracelet-connexion',
        youtubeId: null,
        title: "Le connecter à l'app",
        description: "Création du compte, Bluetooth, appairage : la connexion pas à pas.",
      },
    ] satisfies OnboardingVideo[],
  },

  /** Étape 3 — téléchargement de l'app. `null` = pas encore en ligne → bouton "Bientôt". */
  stores: {
    appStoreUrl: null as string | null,
    playStoreUrl: null as string | null,
  },

  /** Contact support affiché en fin de parcours */
  supportEmail: 'contact@weareclimbers.fr',
} as const
