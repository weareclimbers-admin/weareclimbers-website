/**
 * Source de vérité de l'état commercial WAC.
 *
 * MODÈLE À PHASES — le site s'adapte automatiquement à la phase active :
 *   'ulule-live'        → campagne Accès Anticipé Ulule en cours (compte à rebours + CTA Ulule)
 *   'campaign-success'  → campagne terminée avec succès (preuve sociale + liste d'attente)
 *   'precommande-live'  → pré-commandes en propre ouvertes (checkout WAC)
 *   'vente-flash-attente' → checkout FERMÉ, liste d'attente de la précommande des
 *                         fêtes sur /boutique (avant le 30/11 9 h, et après le 06/12)
 *
 * Phase active = getPhase() : `CAMPAIGN.phase` (hors vente), SAUF pendant la
 * précommande des fêtes (FETES_SALE, lib/preorder.ts) où elle passe TOUTE SEULE
 * à 'precommande-live' — ouverture et fermeture automatiques, sans déploiement.
 * Les pages sont régénérées toutes les 5 min (revalidate du layout racine) pour
 * que le HTML suive la date. Le bandeau, les CTA et le copy se réalignent via les
 * helpers (getPrimaryCta / getBannerConfig).
 *
 * ⚠️ Terminologie : jamais "crowdfunding" / "early access" / "médical". On dit
 * "Accès Anticipé", "Pack Fondateur/Pionnier", "haute précision / ±1 BPM".
 */

import { FETES_SALE, PREORDER_PACK } from '@/lib/preorder';

export type CampaignPhase = 'ulule-live' | 'campaign-success' | 'precommande-live' | 'vente-flash-attente';

/**
 * Nature d'un appel à l'action, pour que chaque page sache comment le rendre :
 *   'waitlist'    → ouvre / scrolle vers le formulaire liste d'attente (Brevo)
 *   'ulule'       → lien externe vers Ulule
 *   'precommande' → lien interne vers le checkout en propre
 */
export interface Cta {
  label: string;
  kind: 'waitlist' | 'ulule' | 'precommande';
  /** Destination du CTA. Absent pour 'waitlist' = ancre #liste-attente de la page courante. */
  href?: string;
}

export const CAMPAIGN = {
  /** Phase du site HORS fenêtre de vente — la phase active se lit avec getPhase(). */
  phase: 'vente-flash-attente' as CampaignPhase,

  ululeUrl: 'https://www.ulule.fr/we-are-climbers',
  videoYoutubeId: '0AXX5vCajP8',

  /** Date de clôture Ulule (conservée pour l'historique / le compte à rebours en phase ulule-live). */
  endDate: '2026-07-10T23:59:59+02:00',

  /** Fin de la vente en cours — alimente le compte à rebours du bandeau en phase 'precommande-live'. */
  preorderEndDate: FETES_SALE.endDate,

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

/**
 * Vente flash de fin d'année (phase 'vente-flash-attente'). La liste d'attente vit
 * sur /boutique (même URL que la boutique → tous les liens déjà diffusés y
 * atterrissent). Inscriptions : NewsletterForm → /api/newsletter → liste Brevo
 * `BREVO_LIST_ID` (à faire pointer sur la nouvelle liste « vente flash »).
 *
 * Offre arrêtée le 02/11/2026 et annoncée dès la liste d'attente (accord Julien) :
 * dates, 10 bracelets à 159 €, livrés avant Noël — source : FETES_SALE (lib/preorder.ts).
 */
export const FLASH_SALE = {
  href: '/boutique#liste-attente',
  window: `du ${FETES_SALE.startLabel} au ${FETES_SALE.endLabel}`,
  formTitle: 'Précommande des fêtes',
  formSubtitle: `Du ${FETES_SALE.startLabel} au ${FETES_SALE.endLabel} : ${FETES_SALE.flash.units} bracelets à ${FETES_SALE.flash.priceTtc} € au lieu de ${PREORDER_PACK.priceTtc} €, livrés avant Noël. Au-delà, la précommande reste ouverte au prix de ${PREORDER_PACK.priceTtc} €. Inscris-toi pour être prévenu·e dès l’ouverture.`,
  buttonText: 'Préviens-moi',
} as const;

/**
 * Horloge de la vente. Pour tester l'ouverture / la clôture avant le jour J,
 * NEXT_PUBLIC_SALE_CLOCK (date ISO, ex. 2026-11-30T10:00:00+01:00) simule une
 * autre date — UNIQUEMENT en local et sur les aperçus Vercel : ignorée en
 * production (NEXT_PUBLIC_VERCEL_ENV = 'production').
 */
export function saleNow(): number {
  const fake = process.env.NEXT_PUBLIC_SALE_CLOCK;
  if (fake && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    const t = Date.parse(fake);
    if (!Number.isNaN(t)) return t;
  }
  return Date.now();
}

/**
 * Début du décompte des ventes (compteurs de la boutique) : l'ouverture réelle,
 * ou 0 quand l'horloge est simulée — les paiements de test sont datés du jour
 * du test, avant l'ouverture, et doivent compter pour vérifier les jauges.
 */
export function saleCountingSince(): number {
  const simulated = Boolean(process.env.NEXT_PUBLIC_SALE_CLOCK) && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';
  return simulated ? 0 : Math.floor(Date.parse(FETES_SALE.startDate) / 1000);
}

/** true pendant la précommande des fêtes (30/11 9 h → 06/12 23 h 59, heure de Paris). */
export function isFetesSaleOpen(now: number = saleNow()): boolean {
  return now >= Date.parse(FETES_SALE.startDate) && now <= Date.parse(FETES_SALE.endDate);
}

/** true une fois la précommande des fêtes close (la liste d'attente change de texte). */
export function isFetesSaleOver(now: number = saleNow()): boolean {
  return now > Date.parse(FETES_SALE.endDate);
}

/** Phase active du site, calculée à chaque rendu. */
export function getPhase(now: number = saleNow()): CampaignPhase {
  return isFetesSaleOpen(now) ? 'precommande-live' : CAMPAIGN.phase;
}

/**
 * Textes de la liste d'attente : annonce avant l'ouverture, remerciement après
 * la clôture (on ne promet plus une ouverture déjà passée).
 */
export function getWaitlistCopy(now: number = saleNow()): {
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
} {
  if (isFetesSaleOver(now)) {
    return {
      badge: 'Merci à la cordée',
      title: 'Précommande des fêtes terminée',
      subtitle: 'Les précommandes sont closes. Laisse ton email pour être prévenu·e en premier de la prochaine ouverture.',
      buttonText: 'Préviens-moi',
    };
  }
  return {
    badge: `${FLASH_SALE.window} · livrés avant Noël`,
    title: FLASH_SALE.formTitle,
    subtitle: FLASH_SALE.formSubtitle,
    buttonText: FLASH_SALE.buttonText,
  };
}

/**
 * Le checkout Stripe n'accepte de nouvelles commandes que dans une phase de vente.
 * Vérifié côté serveur par /api/checkout (la page ne suffit pas : une ancienne
 * page restée ouverte peut encore appeler l'API).
 */
export function isCheckoutOpen(now: number = saleNow()): boolean {
  return getPhase(now) === 'precommande-live';
}

/** CTA principal du site selon la phase active. */
export function getPrimaryCta(): Cta {
  switch (getPhase()) {
    case 'ulule-live':
      return { label: 'Je soutiens WAC sur Ulule', kind: 'ulule', href: CAMPAIGN.ululeUrl };
    case 'campaign-success':
      return { label: 'Préviens-moi du lancement', kind: 'waitlist' };
    case 'precommande-live':
      return { label: 'Je précommande', kind: 'precommande', href: '/boutique' };
    case 'vente-flash-attente':
      return { label: 'Je m’inscris', kind: 'waitlist', href: FLASH_SALE.href };
  }
}

/** Libellé du lien vers /boutique dans le header et le footer. */
export function getShopNavLabel(): string {
  return isFetesSaleOver() ? 'Liste d’attente' : 'Précommande des fêtes';
}

/** Contenu du bandeau haut de page selon la phase. */
export function getBannerConfig(): { text: string; cta: Cta } | null {
  switch (getPhase()) {
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
        text: `Précommande des fêtes jusqu'au ${FETES_SALE.endLabel}`,
        cta: getPrimaryCta(),
      };
    case 'vente-flash-attente':
      if (isFetesSaleOver()) return null;
      return {
        text: `Précommande des fêtes · ${FETES_SALE.flash.units} bracelets à ${FETES_SALE.flash.priceTtc} € · ${FLASH_SALE.window}`,
        cta: { ...getPrimaryCta(), label: 'Je m’inscris' },
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
