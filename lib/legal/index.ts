export * from './types';

import type { LegalDocument, LegalDocumentKey } from './types';
import { CGU } from './cgu';
import { PRIVACY_POLICY } from './privacyPolicy';
import { LEGAL_NOTICES } from './legalNotices';
import { COOKIES_POLICY } from './cookiesPolicy';

export const LEGAL_DOCUMENTS: Record<LegalDocumentKey, LegalDocument> = {
  cgu: CGU,
  privacy: PRIVACY_POLICY,
  legalNotices: LEGAL_NOTICES,
  cookies: COOKIES_POLICY,
};

export { CGU, PRIVACY_POLICY, LEGAL_NOTICES, COOKIES_POLICY };

/**
 * Mapping URL slug → document key — spécifique au SITE VITRINE.
 *
 * Diffère du repo coach qui utilise `/legal/{slug}`. Côté vitrine on garde
 * les slugs historiques pour préserver le SEO et les liens externes existants :
 * - /terms → CGU (au lieu de /legal/cgu côté coach)
 * - /privacy → Politique de Confidentialité
 * - /cookies → Politique Cookies
 * - /mentions-legales → Mentions Légales (nouveau, conformité LCEN 2004-575)
 */
export const LEGAL_SLUG_TO_KEY: Record<string, LegalDocumentKey> = {
  terms: 'cgu',
  privacy: 'privacy',
  cookies: 'cookies',
  'mentions-legales': 'legalNotices',
};

export const LEGAL_KEY_TO_SLUG: Record<LegalDocumentKey, string> = {
  cgu: 'terms',
  privacy: 'privacy',
  cookies: 'cookies',
  legalNotices: 'mentions-legales',
};

export function getLegalDocumentBySlug(slug: string): LegalDocument | null {
  const key = LEGAL_SLUG_TO_KEY[slug];
  return key ? LEGAL_DOCUMENTS[key] : null;
}
