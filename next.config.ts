import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import { INDEXING_ENABLED } from '@/lib/seo'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  ...(INDEXING_ENABLED
    ? []
    : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    const seHosts = [
      { type: 'host' as const, value: 'rookiework.se' },
      { type: 'host' as const, value: 'www.rookiework.se' },
    ]

    // Specific page redirects from old Swedish site to new Swedish routes
    const sePageRedirects = seHosts.flatMap((host) => [
      {
        source: '/',
        has: [host],
        destination: 'https://prefeo.se/sv',
        permanent: true,
      },
      {
        source: '/for-foretag',
        has: [host],
        destination: 'https://prefeo.se/sv/companies',
        permanent: true,
      },
      {
        source: '/sok-personal',
        has: [host],
        destination: 'https://prefeo.se/sv/companies',
        permanent: true,
      },
      {
        source: '/for-jobbsokande',
        has: [host],
        destination: 'https://prefeo.se/sv/candidates',
        permanent: true,
      },
      {
        source: '/sok-jobb',
        has: [host],
        destination: 'https://prefeo.se/sv/candidates',
        permanent: true,
      },
      {
        source: '/lediga-jobb',
        has: [host],
        destination: 'https://prefeo.se/sv/candidates',
        permanent: true,
      },
      {
        source: '/kontakt',
        has: [host],
        destination: 'https://prefeo.se/sv',
        permanent: true,
      },
      {
        source: '/om-oss',
        has: [host],
        destination: 'https://prefeo.se/sv',
        permanent: true,
      },
      {
        source: '/manadens-rookie',
        has: [host],
        destination: 'https://prefeo.se/sv',
        permanent: true,
      },
      {
        source: '/guide-rekrytering',
        has: [host],
        destination: 'https://prefeo.se/sv/inspiration',
        permanent: true,
      },
      {
        source: '/integritetspolicy',
        has: [host],
        destination: 'https://prefeo.se/sv/policy',
        permanent: true,
      },
      {
        source: '/visselblasning',
        has: [host],
        destination: 'https://prefeo.se/sv/policy',
        permanent: true,
      },
      // Inspiration category pages
      {
        source: '/inspiration/category/:path*',
        has: [host],
        destination: 'https://prefeo.se/sv/inspiration',
        permanent: true,
      },
      // Inspiration listing page
      {
        source: '/inspiration',
        has: [host],
        destination: 'https://prefeo.se/sv/inspiration',
        permanent: true,
      },
      // Individual articles — same slugs, redirect to Swedish route
      {
        source: '/inspiration/:slug',
        has: [host],
        destination: 'https://prefeo.se/sv/inspiration/:slug',
        permanent: true,
      },
      // Catch-all fallback for any other old .se pages
      {
        source: '/:path*',
        has: [host],
        destination: 'https://prefeo.se/sv',
        permanent: true,
      },
    ])

    return [
      ...sePageRedirects,
      // Legacy rookiework.com (apex + www) → new prefeo.se domain
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: 'rookiework.com' }],
        destination: 'https://prefeo.se/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: 'www.rookiework.com' }],
        destination: 'https://prefeo.se/:path*',
        permanent: true,
      },
      // Canonical host: www.prefeo.se → prefeo.se (preserve path as-is)
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: 'www.prefeo.se' }],
        destination: 'https://prefeo.se/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
