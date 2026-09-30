/**
 * Identité produit de la pré-commande — source de vérité UNIQUE, partagée
 * entre le pixel navigateur (lib/meta-pixel.ts) et la Conversions API serveur
 * (lib/meta-capi.ts). Doit être identique partout (ViewContent /
 * InitiateCheckout / Purchase, pixel + CAPI) pour le retargeting et la
 * correspondance catalogue. Module sans dépendance runtime → importable des
 * deux côtés.
 */
export const SHOP_CONTENT = {
  content_ids: ['polar360-pack'],
  content_type: 'product',
  content_name: 'Bracelet Polar 360 + App WAC',
} as const

/**
 * ID du pixel/dataset dédié à la boutique (= aussi l'ID CAPI). Surchargable
 * par env (fallback = ID Meta). Neutre → utilisable client ET serveur.
 */
export const META_SHOP_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_SHOP_ID || '1424037446331441'
