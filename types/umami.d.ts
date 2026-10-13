/**
 * Tracker Umami Cloud — `window.umami` n'existe qu'après consentement
 * « Analytics » (script injecté par components/CookieBanner.tsx) et peut être
 * absent même après consentement (bloqueur de pub) : toujours appeler via
 * `window.umami?.track(...)`, jamais de manière inconditionnelle.
 */
export {}

declare global {
  interface Window {
    umami?: {
      // Le tracker renvoie la promesse de l'envoi (attendue avant une redirection, lib/umami.ts).
      track(event: string, data?: Record<string, string | number | boolean>): void | Promise<unknown>
    }
  }
}
