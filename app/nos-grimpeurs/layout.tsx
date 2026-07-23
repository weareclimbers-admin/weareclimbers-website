import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nos Grimpeurs — Athlètes, coachs et communauté | We Are Climbers",
  description: "Champion de France, athlètes de haut niveau, coachs fédéraux : celles et ceux qui valident WAC sur le terrain. Équipementier Officiel de la Ligue Nouvelle-Aquitaine FFME.",
  openGraph: {
    title: "Nos Grimpeurs — Athlètes, coachs et communauté",
    description: "Champion de France, athlètes de haut niveau, coachs fédéraux : celles et ceux qui valident WAC sur le terrain. Équipementier Officiel de la Ligue Nouvelle-Aquitaine FFME.",
    url: "https://www.weareclimbers.fr/nos-grimpeurs",
  },
}

export default function NosGrimpeursLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
