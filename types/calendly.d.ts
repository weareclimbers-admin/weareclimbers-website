/**
 * Widget Calendly — `window.Calendly` n'existe qu'après chargement du script
 * `widget.js` (injecté à la demande par components/coachs/CoachLeadForm.tsx).
 * Toujours l'appeler via `window.Calendly?.initPopupWidget(...)`, jamais de
 * manière inconditionnelle (le script peut être bloqué / pas encore chargé).
 */
export {}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget(options: {
        url: string
        prefill?: {
          name?: string
          firstName?: string
          lastName?: string
          email?: string
          // Réponses aux questions personnalisées de l'événement, indexées a1, a2, …
          customAnswers?: Record<string, string>
        }
        utm?: Record<string, string>
      }): void
      closePopupWidget?(): void
    }
  }
}
