/**
 * Données de la campagne Ulule "Accès Anticipé" WAC.
 *
 * Pour mettre à jour les chiffres pendant la campagne :
 * - `percentReached` : pourcentage atteint (affiché sur la home et /rejoins-nous)
 * - `CONTREPARTIES[].stockLeft` : nombre restant (null = stock illimité / non communiqué)
 * - `CONTREPARTIES[].soldOut` : passer à true quand épuisé
 *
 * Pour ajouter une nouvelle contrepartie : pousser un objet dans CONTREPARTIES.
 * La home (bandeau), /boutique et /rejoins-nous se synchronisent automatiquement.
 */

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

export const CAMPAIGN = {
  ululeUrl: 'https://www.ulule.fr/we-are-climbers',
  videoYoutubeId: '0AXX5vCajP8',
  endDate: '2026-06-24T23:59:59+02:00',
  percentReached: 32,
} as const;

export const CONTREPARTIES: Pack[] = [
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
    soldOut: false,
    stockLeft: 9,
    perks: [
      'Bracelet Polar 360',
      'Adhésion au WAC Club',
      "1 place 2 jours pour le Salon de l'escalade — 7ᵉ édition, janvier 2027",
    ],
    highlight: true,
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

/** Contreparties encore disponibles (non épuisées) */
export function getActiveContreparties(): Pack[] {
  return CONTREPARTIES.filter((p) => !p.soldOut);
}

/**
 * Texte court "stock restant" pour le bandeau home.
 * Exemples :
 *   - "Plus que 9 Pack Salon + Pack Crux"
 *   - "Plus que 9 Pack Salon"
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
