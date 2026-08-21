import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Metadata } from 'next'
import { getStripe } from '@/lib/stripe'
import { PREORDER_FLOW } from '@/lib/preorder'

// Success URL du checkout Stripe (?session_id=...). Hors sitemap, noindex :
// on n'y arrive que depuis Stripe.
//
// Si l'achat vient d'un créateur partenaire (metadata grant_premium_months=3),
// on affiche l'email utilisé au paiement : c'est la clé d'appariement des
// 3 mois premium côté app (Cloud Functions Firebase). Un compte app créé avec
// une AUTRE adresse ne recevra jamais l'offre — d'où le filet ici et dans
// l'email de confirmation. Best-effort : sans session_id ou si Stripe est
// injoignable, la page de merci générique s'affiche normalement.

export const metadata: Metadata = {
  title: 'Merci — Pré-commande confirmée | We Are Climbers',
  robots: { index: false, follow: false },
}

async function getPremiumEmail(sessionId: string | undefined): Promise<string | null> {
  if (!sessionId?.startsWith('cs_')) return null
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.metadata?.flow !== PREORDER_FLOW) return null
    if (session.metadata?.grant_premium_months !== '3') return null
    return session.customer_details?.email ?? null
  } catch (err) {
    console.error('merci: session Stripe illisible, affichage générique', err)
    return null
  }
}

export default async function MerciPrecommande({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const premiumEmail = await getPremiumEmail(session_id)

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

              {premiumEmail && (
                <div
                  className="max-w-2xl mx-auto mb-10 p-6 md:p-8 text-left rounded-[20px]"
                  style={{
                    backgroundColor: 'var(--color-secondary-beige-light)',
                    border: '2px solid var(--color-secondary-orange)',
                  }}
                >
                  <p
                    className="text-lg md:text-xl mb-3 font-bold uppercase"
                    style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                  >
                    3 mois d&apos;abonnement premium offerts
                  </p>
                  <p
                    className="mb-3"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}
                  >
                    Crée ton compte We Are Climbers dans l&apos;app avec l&apos;adresse{' '}
                    <strong>{premiumEmail}</strong> : tes 3 mois s&apos;activeront
                    automatiquement à la connexion.
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', opacity: 0.8, lineHeight: 1.6 }}
                  >
                    C&apos;est un cadeau ? Transmets l&apos;email de confirmation à la personne
                    qui utilisera le bracelet — si son compte app utilise une autre adresse,
                    il lui suffira de nous écrire pour activer l&apos;offre.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/l-app" className="btn-secondary inline-block">
                  Découvrir l&apos;app en attendant
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
