/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // Boutique mise en live le 01/10/2026 : /boutique2 (page de préparation)
        // remplace désormais /boutique. On redirige l'ancienne URL de travail.
        source: '/boutique2',
        destination: '/boutique',
        permanent: true, // 301 redirect
      },
      {
        // Pré-commandes en propre ouvertes : la liste d'attente n'existe plus,
        // tout le funnel converge vers la boutique.
        source: '/rejoins-nous',
        destination: '/boutique',
        permanent: true, // 301 redirect
      },
      {
        source: '/early-access',
        destination: '/boutique',
        permanent: true, // 301 redirect
      },
      {
        source: '/mission',
        destination: '/nos-grimpeurs',
        permanent: true, // 301 redirect
      },
      {
        source: '/capteurs',
        destination: '/le-bracelet',
        permanent: true, // 301 redirect
      },
      {
        source: '/specifications-techniques',
        destination: '/le-bracelet',
        permanent: true, // 301 redirect
      },
      {
        source: '/roadmap-rse',
        destination: '/engagements',
        permanent: true, // 301 redirect
      },
      {
        // Page temporaire « grille tarifaire à venir », retirée : la grille vit sur la webapp coach
        source: '/coachs/offres',
        destination: 'https://coach.weareclimbers.fr/tarifs',
        permanent: true, // 301 redirect
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
