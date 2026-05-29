import type { LegalDocument } from './types';

/**
 * Politique Cookies WeAreClimbers — webapp coach + app mobile.
 *
 * MIROIR de `lib/legal/cookiesPolicy.ts` du repo weareclimbers-coach.
 * Source de vérité = repo coach. Coordonner les bumps des deux côtés.
 */
export const COOKIES_POLICY: LegalDocument = {
  key: 'cookies',
  title: 'Politique Cookies',
  subtitle: 'Cookies et technologies similaires',
  version: '1.0',
  lastUpdated: '2026-05-19',
  preamble: `La webapp coach WeAreClimbers utilise des cookies et technologies similaires pour fournir, sécuriser et améliorer ses services. Cette page décrit les types de cookies utilisés, leurs finalités et la manière de gérer vos préférences.`,
  sections: [
    {
      id: '1',
      title: '1. Qu\'est-ce qu\'un cookie ?',
      content: `Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone) lors de la consultation d'un site web ou d'une application. Il permet notamment d'identifier votre terminal, de mémoriser vos préférences ou de mesurer l'audience du site.

Nous utilisons également des technologies similaires : local storage du navigateur, session storage, identifiants de session côté serveur.`,
    },
    {
      id: '2',
      title: '2. Cookies strictement nécessaires (consentement non requis)',
      content: `Ces cookies sont indispensables au fonctionnement du service. Ils ne peuvent pas être désactivés.

- Cookies d'authentification (Firebase Auth) : maintien de votre session connectée
- Cookies de préférences UX : largeur sidebar, dernier onglet visité dans la fiche élève, etc.
- Tokens de sécurité CSRF (Cross-Site Request Forgery)
- Cookies de session Next.js / Vercel

Durée : session ou jusqu'à déconnexion.`,
    },
    {
      id: '3',
      title: '3. Cookies de mesure d\'audience (consentement requis)',
      content: `Pour comprendre comment les coachs utilisent la webapp et améliorer le produit, nous pouvons utiliser un outil de mesure d'audience respectueux de la vie privée :

- Plausible Analytics (https://plausible.io) — outil européen, sans cookie tiers, sans collecte d'identifiants personnels, conforme RGPD par design. Pas de bandeau de consentement requis selon les recommandations CNIL (mesure d'audience exemptée).

OU (alternativement, sur consentement explicite uniquement) :
- Posthog (https://posthog.com) — outil d'analyse produit avec session replay. Soumis à consentement explicite (bandeau cookies).

Vous pouvez à tout moment refuser ou révoquer votre consentement via le pied de page → « Gérer mes préférences cookies ».`,
    },
    {
      id: '4',
      title: '4. Cookies tiers',
      content: `La webapp peut intégrer des contenus tiers qui déposent leurs propres cookies (par exemple, fournisseurs OAuth Google et Apple pour le login). Nous n'avons pas de contrôle direct sur ces cookies. Vous pouvez consulter les politiques cookies de ces tiers :
- Google : https://policies.google.com/technologies/cookies
- Apple : https://www.apple.com/legal/privacy/`,
    },
    {
      id: '5',
      title: '5. Durée de conservation',
      content: `- Cookies de session : supprimés à la fermeture du navigateur ou à la déconnexion
- Cookies de préférences : 12 mois
- Cookies de mesure d'audience (si consentement) : 13 mois maximum, conformément aux recommandations CNIL`,
    },
    {
      id: '6',
      title: '6. Gestion de vos préférences',
      content: `Vous pouvez gérer vos préférences cookies à tout moment :

- Depuis le pied de page de la webapp : « Gérer mes préférences cookies »
- Depuis votre navigateur : la plupart des navigateurs permettent de bloquer ou supprimer les cookies (voir l'aide de votre navigateur)
- Outil d'opposition globale : https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-mon-navigateur

Note : le refus des cookies analytics n'a aucun impact sur votre utilisation de la webapp. Le refus des cookies strictement nécessaires peut empêcher l'accès à certaines fonctionnalités (notamment le maintien de votre session).`,
    },
    {
      id: '7',
      title: '7. Modifications',
      content: `La présente politique peut être modifiée à tout moment. En cas de modification substantielle, vous serez informé par bandeau lors de votre prochaine visite.

Dernière mise à jour : 19 mai 2026 — Version 1.0`,
    },
  ],
};
