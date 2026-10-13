import Image from 'next/image'
import type { ReactNode } from 'react'

/**
 * Réassurances de commande, en pictos (demandées par Julien le 13/10/2026) :
 * affichées sous le bouton de paiement (OrderForm) et sous le bouton
 * « Je précommande » de la fiche sur mobile.
 *
 * ⚠️ Rétractation : 14 jours À COMPTER DE LA RÉCEPTION (art. L.221-18 Code de
 * la consommation, CGV §9), plus l'annulation gratuite jusqu'à l'expédition
 * (CGV §4.2). Ne jamais écrire « 14 jours après la commande » : c'est moins que
 * le droit du client, donc trompeur.
 *
 * Badge Klarna officiel (x.klarnacdn.net) hébergé chez nous : aucune requête
 * vers Klarna avant le paiement.
 */

function StrokeIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const ITEMS: { icon: ReactNode; title: string; detail?: string; badge?: boolean }[] = [
  {
    icon: (
      <StrokeIcon>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </StrokeIcon>
    ),
    title: 'Paiement sécurisé via Stripe',
  },
  {
    icon: <Image src="/images/paiement/klarna.svg" alt="Klarna" width={48} height={20} unoptimized />,
    badge: true,
    title: 'Paie en plusieurs fois avec Klarna',
    detail: 'depuis la page de paiement',
  },
  {
    icon: (
      <StrokeIcon>
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
        <path d="m3 8 9 5 9-5" />
        <path d="M12 13v8" />
      </StrokeIcon>
    ),
    title: 'Livraison gratuite en France',
    detail: 'métropolitaine, en point relais ou à domicile',
  },
  {
    icon: (
      <StrokeIcon>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </StrokeIcon>
    ),
    title: 'Bracelet garanti 2 ans',
    detail: 'Annulation gratuite jusqu’à l’expédition, puis 14 jours de rétractation après réception',
  },
]

export default function Reassurance() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
      {ITEMS.map((item) => (
        <li key={item.title} className="flex items-center gap-3">
          <span
            className="flex-none w-12 h-12 flex items-center justify-center rounded-full"
            style={
              item.badge
                ? undefined
                : {
                    color: 'var(--color-primary-green)',
                    backgroundColor: 'var(--color-secondary-beige-light)',
                    border: '2px solid var(--color-primary-green)',
                  }
            }
          >
            {item.icon}
          </span>
          <span style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-green)', lineHeight: 1.35 }}>
            <span className="block text-[15px] font-bold">{item.title}</span>
            {item.detail && (
              <span className="block text-xs mt-0.5" style={{ opacity: 0.75 }}>
                {item.detail}
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
