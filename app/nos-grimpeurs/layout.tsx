import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nos Grimpeurs - La communauté We Are Climbers",
  description: "Découvre les grimpeurs qui testent déjà We Are Climbers. Témoignages, niveaux, et retours d'expérience de notre communauté beta.",
  openGraph: {
    title: "Nos Grimpeurs - La communauté We Are Climbers",
    description: "Découvre les grimpeurs qui testent déjà We Are Climbers. Témoignages, niveaux, et retours d'expérience de notre communauté beta.",
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
