import { Metadata } from 'next'
import RoadmapAdmin from '@/components/roadmap/RoadmapAdmin'

/** Console de modération — interne, jamais indexée ni liée depuis le site. */
export const metadata: Metadata = {
  title: 'Roadmap — Modération',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function RoadmapAdminPage() {
  return <RoadmapAdmin />
}
