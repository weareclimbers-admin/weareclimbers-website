/**
 * Types partagés pour les documents légaux du site vitrine weareclimbers.fr.
 *
 * MIROIR du fichier `lib/legal/types.ts` du repo `weareclimbers-coach`.
 * Source de vérité = repo coach. Toute modification ici doit être répercutée là-bas
 * (et inversement) — coordonner les bumps de version avec l'agent webapp coach.
 *
 * Approche unifiée Nolio-like : un seul jeu de docs couvrant grimpeur (app mobile B2C)
 * ET coach (webapp B2B). Pas de duplication.
 */

export type LegalDocumentKey = 'cgu' | 'privacy' | 'legalNotices' | 'cookies';

export interface LegalSubsection {
  id: string;
  title: string;
  content: string;
}

export interface LegalSection {
  id: string;
  title: string;
  content?: string;
  subsections?: LegalSubsection[];
}

export interface LegalDocument {
  /** Identifiant stable pour ce doc (utilisé dans les URLs et dans le tracking) */
  key: LegalDocumentKey;
  /** Titre human-readable affiché en H1 sur la page */
  title: string;
  /** Sous-titre optionnel sous le H1 */
  subtitle?: string;
  /** Version semver-like (`1.0`, `1.1`, `2.0`). */
  version: string;
  /** Date ISO de dernière mise à jour substantielle (`YYYY-MM-DD`) */
  lastUpdated: string;
  /** Préambule optionnel affiché avant le sommaire */
  preamble?: string;
  sections: LegalSection[];
}

/**
 * Versions courantes des documents légaux à l'instant T.
 * Doit rester aligné avec le repo coach.
 */
export const CURRENT_LEGAL_VERSIONS = {
  cgu: '1.0',
  privacy: '1.0',
  legalNotices: '1.0',
  cookies: '1.0',
} as const satisfies Record<LegalDocumentKey, string>;
