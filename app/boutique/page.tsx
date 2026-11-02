import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShopLanding from '@/components/boutique/ShopLanding'
import FlashWaitlist from '@/components/boutique/FlashWaitlist'
import { isCheckoutOpen, saleCountingSince } from '@/lib/campaign'
import { countPaidPreorders } from '@/lib/preorder-count'
import { getFlashStock } from '@/lib/flash-stock'
import { CLIMBERS_EQUIPPED } from '@/lib/proof'
import { Metadata } from 'next'

/**
 * Boutique pré-commande V2 EN LIGNE (mise en live le 01/10/2026 : l'ancienne
 * page « liste d'attente / campagne atteinte » a été remplacée par la vraie
 * fiche produit + checkout Stripe, auparavant en préparation sur /boutique2).
 * /boutique2 redirige désormais vers /boutique (voir next.config.js).
 *
 * Pré-commandes closes (phase 'vente-flash-attente', lib/campaign.ts) : la même
 * URL affiche la liste d'attente de la précommande des fêtes.
 */

const FLASH_DESCRIPTION =
  'Précommande des fêtes du 30 novembre au 6 décembre : 10 bracelets Polar 360 + app WAC à 159 € au lieu de 179 €, livrés avant Noël. Inscris-toi pour être prévenu·e dès l’ouverture.'

const flashMetadata: Metadata = {
  title: 'Précommande des fêtes — Bracelet Polar 360 + App | We Are Climbers',
  description: FLASH_DESCRIPTION,
  alternates: { canonical: 'https://www.weareclimbers.fr/boutique' },
  openGraph: {
    title: 'Précommande des fêtes — Bracelet Polar 360 + App | We Are Climbers',
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

  // Précommande des fêtes : 129 grimpeurs équipés à la clôture d'octobre + les
  // bracelets payés depuis l'ouverture du 30/11.
  const [paid, flashStock] = await Promise.all([
    countPaidPreorders(saleCountingSince()),
    getFlashStock(),
  ])
  const climbersCount = paid === null ? CLIMBERS_EQUIPPED : CLIMBERS_EQUIPPED + paid

  return (
    <>
      {/* Pas de bandeau pré-commande ici : la page porte déjà son compte à
          rebours, et le bandeau ne ferait que renvoyer… vers cette page. */}
      <Header showCampaignBanner={false} />
      <ShopLanding climbersCount={climbersCount} flashStock={flashStock} />
      <Footer />
    </>
  )
}
