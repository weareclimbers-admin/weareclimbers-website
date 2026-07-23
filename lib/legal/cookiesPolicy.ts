import type { LegalDocument } from './types';

/**
 * Politique Cookies — SITE VITRINE weareclimbers.fr.
 *
 * ⚠️ Ce document DIVERGE VOLONTAIREMENT du miroir coach (repo weareclimbers-coach).
 * La webapp coach est cookieless (Sentry/PostHog/Vercel Analytics) ; le SITE VITRINE
 * a sa propre réalité de traceurs, décrite ici :
 *   - Umami Cloud EU (mesure d'audience, sans cookie tiers, opt-in)
 *   - Meta Pixel / Facebook (marketing, cookies tiers, opt-in strict)
 * NE PAS resynchroniser aveuglément avec le repo coach.
 *
 * v1.0 (2026-05-19) : miroir initial coach (obsolète — décrivait Plausible/Posthog).
 * v1.1 (2026-07-22) : réécriture spécifique site — traceurs réels (Umami Cloud EU +
 *   Meta Pixel opt-in), suppression des mentions webapp coach / Firebase / Plausible.
 *   Cohérence avec components/CookieBanner.tsx (bandeau de consentement CNIL).
 */
export const COOKIES_POLICY: LegalDocument = {
  key: 'cookies',
  title: 'Politique Cookies',
  subtitle: 'Cookies et technologies similaires',
  version: '1.1',
  lastUpdated: '2026-07-22',
  preamble: `Le site vitrine weareclimbers.fr utilise des cookies et technologies similaires pour fonctionner, mesurer son audience et, avec votre accord, mesurer ses campagnes publicitaires. Cette page décrit les types de cookies utilisés, leurs finalités et la manière de gérer vos préférences.`,
  sections: [
    {
      id: '1',
      title: '1. Qu\'est-ce qu\'un cookie ?',
      content: `Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone) lors de la consultation d'un site web. Il permet notamment d'identifier votre terminal, de mémoriser vos préférences ou de mesurer l'audience du site.

Nous utilisons également des technologies similaires : local storage du navigateur, session storage.`,
    },
    {
      id: '2',
      title: '2. Cookies strictement nécessaires (consentement non requis)',
      content: `Ces cookies et traceurs sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.

- Mémorisation de votre choix de consentement aux cookies (stocké dans le local storage sous « wac_cookie_consent »)
- Sécurité et bon fonctionnement des formulaires (contact, inscription liste d'attente)
- Fonctionnement de la plateforme d'hébergement (Next.js / Vercel)

Durée : le choix de consentement est conservé 13 mois maximum, conformément aux recommandations de la CNIL.`,
    },
    {
      id: '3',
      title: '3. Cookies de mesure d\'audience (consentement requis)',
      content: `Pour comprendre comment le site est utilisé et l'améliorer, nous utilisons un outil de mesure d'audience respectueux de la vie privée, chargé uniquement après votre consentement (opt-in) :

- Umami Cloud EU (https://umami.is) — solution européenne, sans cookie tiers, sans collecte d'identifiant personnel. Données mesurées : pages visitées et parcours, type d'appareil et navigateur (anonymisés), pays de provenance (sans localisation précise), durée de visite. Les données sont hébergées dans l'Union Européenne et ne sont jamais revendues.

Vous pouvez à tout moment refuser ou révoquer votre consentement via le bandeau de gestion des cookies.`,
    },
    {
      id: '4',
      title: '4. Cookies marketing (consentement requis)',
      content: `Avec votre accord explicite (opt-in), nous mesurons la performance de nos campagnes publicitaires et effectuons du remarketing via :

- Meta Pixel (Facebook) — édité par Meta Platforms. Ce traceur dépose des cookies tiers permettant un suivi cross-site et la mesure de nos publicités. Le pixel n'est chargé QUE si vous acceptez la catégorie « Marketing » dans le bandeau de consentement : aucun appel n'est effectué tant que ce consentement n'est pas donné.

Transfert hors UE : l'utilisation du Meta Pixel peut entraîner un transfert de données vers les États-Unis (Meta Platforms, Inc.), encadré par les Clauses Contractuelles Types de la Commission Européenne et le Data Privacy Framework UE–États-Unis.

Vous pouvez refuser ou révoquer ce consentement à tout moment via le bandeau de gestion des cookies. Politique cookies de Meta : https://www.facebook.com/policies/cookies/`,
    },
    {
      id: '5',
      title: '5. Cookies tiers de contenus embarqués',
      content: `Certaines pages peuvent intégrer des contenus tiers (lecteurs vidéo, cartes, publications réseaux sociaux) susceptibles de déposer leurs propres cookies. Nous n'avons pas de contrôle direct sur ces cookies. Vous pouvez consulter les politiques cookies de ces tiers, par exemple :
- Meta (Facebook / Instagram) : https://www.facebook.com/policies/cookies/
- Google (YouTube) : https://policies.google.com/technologies/cookies`,
    },
    {
      id: '6',
      title: '6. Durée de conservation',
      content: `- Choix de consentement (local storage) : 13 mois maximum
- Cookies de mesure d'audience (Umami, si consentement) : Umami fonctionne sans cookie tiers ; aucune durée de conservation de cookie ne s'y applique
- Cookies marketing (Meta Pixel, si consentement) : jusqu'à 13 mois, conformément aux recommandations CNIL`,
    },
    {
      id: '7',
      title: '7. Gestion de vos préférences',
      content: `Vous pouvez gérer vos préférences cookies à tout moment :

- Via le bandeau de consentement du site : « Accepter tout », « Tout refuser » ou « Personnaliser mes choix » (analytics et marketing indépendants)
- Depuis votre navigateur : la plupart des navigateurs permettent de bloquer ou supprimer les cookies (voir l'aide de votre navigateur)
- Outil d'opposition proposé par la CNIL : https://www.cnil.fr/fr/cookies-et-autres-traceurs/comment-se-proteger/maitriser-mon-navigateur

Note : le refus des cookies analytics et marketing n'a aucun impact sur votre navigation. Ces catégories sont désactivées par défaut : rien n'est chargé sans votre accord.`,
    },
    {
      id: '8',
      title: '8. Modifications',
      content: `La présente politique peut être modifiée à tout moment. En cas de modification substantielle, vous serez informé par le bandeau lors de votre prochaine visite.

Dernière mise à jour : 22 juillet 2026 — Version 1.1`,
    },
  ],
};
