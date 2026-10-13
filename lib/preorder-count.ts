import { getStripe } from '@/lib/stripe'
import { PREORDER_FLOW } from '@/lib/preorder'

/**
 * Compteur de la boutique : bracelets précommandés ET payés depuis l'ouverture
 * des pré-commandes en propre (validé par Julien le 13/10/2026 : affiché
 * cumulé avec les 102 grimpeurs de la campagne Ulule, cf. lib/proof.ts).
 *
 * SERVEUR UNIQUEMENT (clé Stripe). Lu par app/boutique/page.tsx, régénérée
 * toutes les 5 min et juste après chaque achat (revalidatePath dans le webhook).
 */

/** Mise en ligne de la boutique (01/10/2026) — les commandes test d'août sont avant. */
const PREORDERS_OPENED_AT = Math.floor(new Date('2026-10-01T00:00:00+02:00').getTime() / 1000)

/** Sessions payées à ne pas compter (commandes test remboursées). */
const EXCLUDED_SESSION_IDS: string[] = []

/**
 * Somme des quantités des sessions de pré-commande payées. null si Stripe n'est
 * pas configuré ou injoignable : la boutique affiche alors un libellé sans chiffre exact.
 */
export async function countPaidPreorders(): Promise<number | null> {
  if (!process.env.STRIPE_SECRET_KEY) return null
  try {
    let total = 0
    const sessions = getStripe().checkout.sessions.list({
      created: { gte: PREORDERS_OPENED_AT },
      status: 'complete',
      limit: 100,
      expand: ['data.line_items'],
    })
    for await (const session of sessions) {
      if (session.metadata?.flow !== PREORDER_FLOW) continue
      if (session.payment_status !== 'paid' || EXCLUDED_SESSION_IDS.includes(session.id)) continue
      total += (session.line_items?.data ?? []).reduce((sum, item) => sum + (item.quantity ?? 0), 0)
    }
    return total
  } catch (err) {
    console.error('preorder-count: comptage Stripe impossible', err)
    return null
  }
}
