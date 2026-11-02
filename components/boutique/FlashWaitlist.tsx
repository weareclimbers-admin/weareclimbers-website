import Image from 'next/image'
import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'
import { FLASH_SALE } from '@/lib/campaign'
import { APP_PROOF } from '@/lib/proof'
import { PREORDER_PACK, FETES_SALE } from '@/lib/preorder'

/**
 * /boutique en phase 'vente-flash-attente' (lib/campaign.ts) : pré-commandes
 * closes le 31/10/2026, checkout fermé, liste d'attente de la précommande des
 * fêtes (FETES_SALE, lib/preorder.ts). Même URL que la boutique : les liens déjà diffusés (bio, créateurs,
 * emails) atterrissent ici, et l'ancre #liste-attente cible le formulaire.
 *
 */

const PROMISES: { title: string; text: string }[] = [
  {
    title: `${FETES_SALE.flash.units} bracelets à ${FETES_SALE.flash.priceTtc} €`,
    text: `Au lieu de ${PREORDER_PACK.priceTtc} €, pour les ${FETES_SALE.flash.units} premiers seulement. Au-delà, la précommande reste ouverte au prix de ${PREORDER_PACK.priceTtc} €.`,
  },
  {
    title: 'Livrés avant Noël',
    text: `Les ${FETES_SALE.flash.units} bracelets à ${FETES_SALE.flash.priceTtc} € sont livrés ${FETES_SALE.flash.delivery}.`,
  },
  {
    title: 'Une semaine, pas plus',
    text: `Précommande ouverte ${FLASH_SALE.window} à 23 h 59. Ensuite, c’est fermé.`,
  },
]

export default function FlashWaitlist({ climbersCount }: { climbersCount: number }) {
  const proofs: { big: string; small: string }[] = [
    { big: String(climbersCount), small: 'grimpeurs ont déjà choisi WAC' },
    { big: APP_PROOF.storeRating, small: 'note de l’app sur l’App Store et Google Play' },
    { big: APP_PROOF.activeUsers, small: 'grimpeurs actifs sur l’app' },
    { big: APP_PROOF.sessions, small: 'séances déjà enregistrées' },
  ]

  return (
    <main>
      {/* ───────────── HAUT DE PAGE + FORMULAIRE ───────────── */}
      <section
        className="pt-36 md:pt-44 pb-16 md:pb-20"
        style={{ backgroundColor: 'var(--color-primary-green)', color: 'var(--color-primary-beige)' }}
      >
        <div className="container-custom text-center max-w-4xl mx-auto">
          <p
            className="text-xs md:text-sm mb-5 font-bold uppercase"
            style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)', letterSpacing: '0.15em' }}
          >
            Du {FETES_SALE.startLabel} au {FETES_SALE.endLabel}
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl mb-6"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: '1.08',
              textWrap: 'balance',
            }}
          >
            Précommande des fêtes
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-10"
            style={{ fontFamily: 'var(--font-roboto)', lineHeight: '1.6' }}
          >
            <strong style={{ color: 'var(--color-secondary-orange)' }}>
              {FETES_SALE.flash.units} bracelets à {FETES_SALE.flash.priceTtc}&nbsp;€
            </strong>{' '}
            au lieu de {PREORDER_PACK.priceTtc}&nbsp;€, livrés avant Noël. Le bracelet Polar 360 et l&apos;app WAC,
            une semaine seulement. Au-delà des {FETES_SALE.flash.units}, la précommande reste ouverte au prix de {PREORDER_PACK.priceTtc}&nbsp;€.
            Inscris-toi pour être prévenu·e dès l&apos;ouverture, le {FETES_SALE.startLabel} à 9&nbsp;h.
          </p>

          {/* Cible des liens de campagne (/boutique#liste-attente) — ne pas supprimer cet id. */}
          <div id="liste-attente" className="scroll-mt-32">
            <NewsletterForm variant="footer" buttonText={FLASH_SALE.buttonText} askFullName />
          </div>
        </div>
      </section>

      {/* ───────────── CE QUI T'ATTEND ───────────── */}
      <section className="py-14 md:py-16" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PROMISES.map((item) => (
              <li
                key={item.title}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: 'var(--color-primary-beige)', border: '2px solid var(--color-secondary-orange)' }}
              >
                <p
                  className="text-lg mb-2 font-bold uppercase"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)' }}
                >
                  {item.title}
                </p>
                <p style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── LE PACK ───────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="rounded-[20px] overflow-hidden" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
            <Image
              src="/téléchargement (1).png"
              alt="Bracelet Polar 360 We Are Climbers — vue produit"
              width={640}
              height={640}
              className="object-contain w-full aspect-square"
            />
          </div>
          <div>
            <h2
              className="text-3xl md:text-4xl mb-5"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
            >
              Projet ou récup&nbsp;? Ton corps te le dit.
            </h2>
            <p className="text-lg mb-6" style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}>
              Le bracelet Polar 360 mesure ton corps à ±1&nbsp;BPM. Chaque matin, l&apos;app WAC en tire ton État
              de Forme : tu sais si c&apos;est un jour pour ton projet ou un jour pour récupérer, et tu repères la
              surcharge d&apos;entraînement avant qu&apos;elle ne s&apos;installe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/le-bracelet" className="btn-primary inline-block text-center">
                Le bracelet
              </Link>
              <Link href="/l-app" className="btn-beige inline-block text-center">
                L&apos;app
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PREUVES ───────────── */}
      <section className="py-10" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
        <div className="container-custom">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 max-w-5xl mx-auto">
            {proofs.map((item) => (
              <li key={item.small} className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-secondary-orange)' }}
                >
                  {item.big}
                </p>
                <p
                  className="text-xs uppercase font-bold"
                  style={{ fontFamily: 'var(--font-syne)', color: 'var(--color-primary-green)', letterSpacing: '0.08em', lineHeight: 1.5 }}
                >
                  {item.small}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── DÉJÀ CLIENT ───────────── */}
      <section className="py-14" style={{ backgroundColor: 'var(--color-primary-beige)' }}>
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl mb-4"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-green)' }}
          >
            Tu as précommandé&nbsp;?
          </h2>
          <p style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.6 }}>
            Ta commande est bien enregistrée, rien à faire de ton côté. Livraison estimée la{' '}
            {PREORDER_PACK.estimatedDelivery} : on t&apos;écrit à chaque étape. Une question ?{' '}
            <Link href="/contact" className="underline font-bold">
              Écris-nous
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
