import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopLanding from '@/components/boutique/ShopLanding'
import FlashWaitlist from '@/components/boutique/FlashWaitlist'
import { isCheckoutOpen } from '@/lib/campaign'
import { countPaidPreorders } from '@/lib/preorder-count'
import { ULULE_BUYERS, CLIMBERS_EQUIPPED } from '@/lib/proof'
import { Metadata } from 'next'

/**
 * Boutique pré-commande V2 EN LIGNE (mise en live le 01/10/2026 : l'ancienne
 * page « liste d'attente / campagne atteinte » a été remplacée par la vraie
 * fiche produit + checkout Stripe, auparavant en préparation sur /boutique2).
 * /boutique2 redirige désormais vers /boutique (voir next.config.js).
 *
 * Pré-commandes closes (phase 'vente-flash-attente', lib/campaign.ts) : la même
 * URL affiche la liste d'attente de la vente flash de fin d'année.
 */

const FLASH_DESCRIPTION =
  'Vente flash de fin d’année sur le bracelet Polar 360 + l’app WAC : une semaine seulement, quantités très limitées. Inscris-toi pour être prévenu·e en premier.'

const flashMetadata: Metadata = {
  title: 'Vente flash de fin d’année — Bracelet Polar 360 + App | We Are Climbers',
  description: FLASH_DESCRIPTION,
  alternates: { canonical: 'https://www.weareclimbers.fr/boutique' },
  openGraph: {
    title: 'Vente flash de fin d’année — Bracelet Polar 360 + App | We Are Climbers',
    description: FLASH_DESCRIPTION,
    url: 'https://www.weareclimbers.fr/boutique',
  },
}

const shopMetadata: Metadata = {
  title: 'Pré-commande — Bracelet Polar 360 + App | We Are Climbers',
  description:
    'Précommande le bracelet Polar 360 haute précision (±1 BPM) et l’app WAC. Paiement sécurisé, livraison France, Belgique, Luxembourg, Suisse et outre-mer.',
  alternates: { canonical: 'https://www.weareclimbers.fr/boutique' },
  openGraph: {
    title: 'Pré-commande — Bracelet Polar 360 + App | We Are Climbers',
    description:
      'Précommande le bracelet Polar 360 (±1 BPM) et l’app WAC. Paiement sécurisé, livraison France, Belgique, Luxembourg, Suisse et outre-mer.',
    url: 'https://www.weareclimbers.fr/boutique',
  },
}

export const metadata: Metadata = isCheckoutOpen() ? shopMetadata : flashMetadata

// Page statique régénérée toutes les 5 min pour le compteur de précommandes —
// et immédiatement après chaque achat (revalidatePath dans le webhook Stripe).
export const revalidate = 300

export default async function Boutique() {
  // Ventes closes : chiffre figé (lib/proof.ts), plus d'appel Stripe.
  if (!isCheckoutOpen()) {
    return (
      <>
        <Header showCampaignBanner={false} />
        <FlashWaitlist climbersCount={CLIMBERS_EQUIPPED} />
        <Footer />
      </>
    )
  }

  const paid = await countPaidPreorders()
  const climbersCount = paid === null ? null : ULULE_BUYERS + paid

  return (
    <>
      {/* Pas de bandeau pré-commande ici : la page porte déjà son compte à
          rebours, et le bandeau ne ferait que renvoyer… vers cette page. */}
      <Header showCampaignBanner={false} />
      <ShopLanding climbersCount={climbersCount} />
      <Footer />
    </>
  )
}
