/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/early-access',
        destination: '/rejoins-nous',
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
