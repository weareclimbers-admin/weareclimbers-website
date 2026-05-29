import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Rejoins-nous - Accès Anticipé | We Are Climbers",
  description: "Fais partie des premiers grimpeurs à tester We Are Climbers. Rejoins notre communauté et accède en avant-première à la technologie.",
  openGraph: {
    title: "Rejoins-nous - Accès Anticipé",
    description: "Fais partie des premiers grimpeurs à tester We Are Climbers. Rejoins notre communauté et accède en avant-première à la technologie.",
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
