import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Rejoins-nous — Liste d'attente préventes | We Are Climbers",
  description: "L'objectif de campagne est atteint à 100 %. Rejoins la liste d'attente pour être prévenu·e en premier de l'ouverture des préventes du bracelet et de l'app WAC.",
  openGraph: {
    title: "Rejoins-nous — Liste d'attente préventes",
    description: "L'objectif de campagne est atteint à 100 %. Rejoins la liste d'attente pour être prévenu·e en premier de l'ouverture des préventes WAC.",
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
