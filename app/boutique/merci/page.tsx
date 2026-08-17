import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'

// Success URL du checkout Stripe (?session_id=...). Version minimale posée avec
// les fondations — à enrichir en phase de propagation (récap de commande via
// l'API Stripe si souhaité). Hors sitemap, noindex : on n'y arrive que depuis Stripe.

export const metadata: Metadata = {
  title: 'Merci — Pré-commande confirmée | We Are Climbers',
  robots: { index: false, follow: false },
}

export default function MerciPrecommande() {
  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        <section
          className="pt-32 pb-24 md:py-40"
          style={{ backgroundColor: 'var(--color-primary-beige)' }}
        >
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p
                className="text-sm md:text-base mb-4 font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-syne)',
                  color: 'var(--color-secondary-orange)',
                  letterSpacing: '0.15em',
                }}
              >
                Pré-commande confirmée
              </p>

              <h1
                className="text-4xl md:text-6xl mb-6"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.1',
                }}
              >
                Merci. On grimpe ensemble.
              </h1>

              <p
                className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
                style={{
                  fontFamily: 'var(--font-roboto)',
                  color: 'var(--color-primary-green)',
                  lineHeight: '1.6',
                }}
              >
                Ton paiement est bien passé — tu vas recevoir un email de confirmation
                avec le récapitulatif de ta commande. On te tiendra au courant de chaque
                étape, jusqu'à la livraison de ton bracelet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/l-app" className="btn-secondary inline-block">
                  Découvrir l'app en attendant
                </Link>
                <Link href="/contact" className="btn-beige inline-block">
                  Une question ? Écris-nous
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
