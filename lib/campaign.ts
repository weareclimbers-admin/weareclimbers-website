/**
 * Source de vérité de l'état commercial WAC.
 *
 * MODÈLE À PHASES — le site s'adapte automatiquement à la phase active :
 *   'ulule-live'        → campagne Accès Anticipé Ulule en cours (compte à rebours + CTA Ulule)
 *   'campaign-success'  → campagne terminée avec succès (preuve sociale + liste d'attente)   ← ACTUEL
 *   'precommande-live'  → pré-commandes en propre ouvertes (checkout WAC)
 *
 * Pour changer de phase : modifier `CAMPAIGN.phase`. Le bandeau, les CTA et le copy
 * se réalignent via les helpers (getPrimaryCta / getBannerConfig).
 *
 * ⚠️ Terminologie : jamais "crowdfunding" / "early access" / "médical". On dit
 * "Accès Anticipé", "Pack Fondateur/Pionnier", "haute précision / ±1 BPM".
 */

export type CampaignPhase = 'ulule-live' | 'campaign-success' | 'precommande-live';

/**
 * Nature d'un appel à l'action, pour que chaque page sache comment le rendre :
 *   'waitlist'    → ouvre / scrolle vers le formulaire liste d'attente (Brevo)
 *   'ulule'       → lien externe vers Ulule
 *   'precommande' → lien interne vers le checkout en propre
 */
export interface Cta {
  label: string;
  kind: 'waitlist' | 'ulule' | 'precommande';
  /** Destination pour les CTA de type lien (ulule / precommande). Absent pour 'waitlist'. */
  href?: string;
}

export const CAMPAIGN = {
  /** Phase active du site. */
  phase: 'campaign-success' as CampaignPhase,

  ululeUrl: 'https://www.ulule.fr/we-are-climbers',
  videoYoutubeId: '0AXX5vCajP8',

  /** Date de clôture Ulule (conservée pour l'historique / le compte à rebours en phase ulule-live). */
  endDate: '2026-07-10T23:59:59+02:00',

  /**
   * Preuve sociale publique. On communique UNIQUEMENT l'atteinte de l'objectif à 100%.
   * (Le nombre de contributeurs et le montant collecté ne sont pas affichés publiquement.)
   */
  goalReached: true,
} as const;

/**
 * Liste d'attente (entre la fin d'Ulule et l'ouverture des pré-commandes en propre).
 * Le formulaire réel est `NewsletterForm` (→ /api/newsletter → Brevo).
 * `anchor` = cible vers laquelle les CTA "waitlist" pointent (section formulaire).
 */
export const WAITLIST = {
  anchor: '#liste-attente',
  formTitle: 'Sois aux premières loges',
  formSubtitle:
    "Les pré-commandes en propre arrivent. Laisse ton email : tu seras prévenu·e en premier, avant tout le monde.",
  buttonText: 'Préviens-moi du lancement',
} as const;

/** CTA principal du site selon la phase active. */
export function getPrimaryCta(): Cta {
  switch (CAMPAIGN.phase) {
    case 'ulule-live':
      return { label: 'Je soutiens WAC sur Ulule', kind: 'ulule', href: CAMPAIGN.ululeUrl };
    case 'campaign-success':
      return { label: 'Préviens-moi du lancement', kind: 'waitlist' };
    case 'precommande-live':
      return { label: 'Je précommande', kind: 'precommande', href: '/boutique' };
  }
}

/** Contenu du bandeau haut de page selon la phase. */
export function getBannerConfig(): { text: string; cta: Cta } | null {
  switch (CAMPAIGN.phase) {
    case 'ulule-live':
      return {
        text: buildBannerStockLine(),
        cta: { label: 'Je soutiens WAC', kind: 'ulule', href: CAMPAIGN.ululeUrl },
      };
    case 'campaign-success':
      return {
        text: 'Objectif 100 % atteint — merci ! Les pré-commandes en propre arrivent bientôt.',
        cta: getPrimaryCta(),
      };
    case 'precommande-live':
      return {
        text: 'Les pré-commandes sont ouvertes.',
        cta: getPrimaryCta(),
      };
  }
}

export interface Pack {
  id: string;
  name: string;
  price: number;
  ululeUrl: string;
  imageUrl: string;
  imageAlt: string;
  soldOut: boolean;
  /** null = stock illimité ou non communiqué (la contrepartie reste disponible toute la campagne) */
  stockLeft: number | null;
  perks: string[];
  /** Si true, la carte est mise en avant (border orange) sur la boutique et /rejoins-nous */
  highlight: boolean;
}

/**
 * Contreparties de la campagne Ulule (historique).
 * Conservées pour la page boutique tant que le checkout en propre n'est pas en ligne.
 * En phase 'campaign-success', la campagne Ulule est close : tout est considéré terminé.
 */
export const CONTREPARTIES: Pack[] = [
  {
    id: 'standard',
    name: 'Membre de la cordée',
    price: 160,
    ululeUrl: 'https://fr.ulule.com/we-are-climbers/?reward=2082132',
    imageUrl: '/images/packs/pack-standard.png',
    imageAlt: 'Membre de la cordée — 160€',
    soldOut: false,
    stockLeft: null,
    perks: [
      'Bracelet Polar 360',
      'Adhésion au WAC Club',
      "Les 27 prochains contributeurs participent au tirage au sort : 1 an d'abonnement à l'app WAC à gagner",
    ],
    highlight: true,
  },
  {
    id: 'fondateur',
    name: 'Pack Fondateur',
    price: 120,
    ululeUrl: CAMPAIGN.ululeUrl,
    imageUrl: '/images/packs/pack-fondateur.png',
    imageAlt: 'Pack Fondateur — 120€',
    soldOut: true,
    stockLeft: 0,
    perks: [
      'Bracelet Polar 360',
      "Accès à vie à l'app WAC sans abonnement",
      'Livraison prioritaire',
      'Ton nom dans les crédits (optionnel)',
    ],
    highlight: false,
  },
  {
    id: 'pionnier',
    name: 'Pack Pionnier',
    price: 140,
    ululeUrl: 'https://fr.ulule.com/we-are-climbers/?reward=2071995',
    imageUrl: '/images/packs/pack-pionnier.png',
    imageAlt: 'Pack Pionnier — 140€',
    soldOut: true,
    stockLeft: 0,
    perks: [
      'Bracelet Polar 360',
      "Accès à vie à l'app WAC sans abonnement",
      'Livraison prioritaire',
      'Participation au tirage au sort — événement de clôture',
    ],
    highlight: false,
  },
  {
    id: 'salon',
    name: 'Pack Salon',
    price: 160,
    ululeUrl: 'https://fr.ulule.com/we-are-climbers/?reward=5602370',
    imageUrl: '/images/packs/pack-salon.png',
    imageAlt: 'Pack Salon — 160€',
    soldOut: true,
    stockLeft: 0,
    perks: [
      'Bracelet Polar 360',
      'Adhésion au WAC Club',
      "1 place 2 jours pour le Salon de l'escalade — 7ᵉ édition, janvier 2027",
    ],
    highlight: false,
  },
  {
    id: 'crux',
    name: 'Pack Crux',
    price: 178,
    ululeUrl: 'https://fr.ulule.com/we-are-climbers/?reward=5588694',
    imageUrl: '/images/packs/pack-crux.png',
    imageAlt: 'Pack Crux — 178€',
    soldOut: false,
    stockLeft: null,
    perks: [
      'Bracelet Polar 360',
      'Adhésion au WAC Club',
      '5 barres énergétiques et protéinées Crux Nutrition',
    ],
    highlight: false,
  },
];

/** Contreparties encore disponibles (non épuisées) — pertinent en phase ulule-live uniquement. */
export function getActiveContreparties(): Pack[] {
  return CONTREPARTIES.filter((p) => !p.soldOut);
}

/**
 * Texte court "stock restant" pour le bandeau home (phase ulule-live).
 * Exemples :
 *   - "Plus que 9 Pack Salon + Pack Crux"
 *   - "Pack Crux disponible"
 *   - "Soutiens-nous sur Ulule" (si tout est épuisé)
 */
export function buildBannerStockLine(): string {
  const active = getActiveContreparties();
  if (active.length === 0) return 'Soutiens-nous sur Ulule';

  const parts = active.map((p) => {
    if (p.stockLeft !== null && p.stockLeft > 0) {
      return `Plus que ${p.stockLeft} ${p.name}`;
    }
    return p.name;
  });

  return parts.join(' + ');
}
