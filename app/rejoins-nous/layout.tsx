import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Rejoins-nous — Liste d'attente pré-commandes | We Are Climbers",
  description: "L'objectif de campagne est atteint à 100 %. Rejoins la liste d'attente pour être prévenu·e en premier de l'ouverture des pré-commandes du bracelet et de l'app WAC.",
  openGraph: {
    title: "Rejoins-nous — Liste d'attente pré-commandes",
    description: "L'objectif de campagne est atteint à 100 %. Rejoins la liste d'attente pour être prévenu·e en premier de l'ouverture des pré-commandes WAC.",
    url: "https://www.weareclimbers.fr/rejoins-nous",
  },
}

export default function RejoinsNousLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
