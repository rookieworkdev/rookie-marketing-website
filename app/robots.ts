import type { MetadataRoute } from 'next'

import { INDEXING_ENABLED, SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  if (!INDEXING_ENABLED) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      host: SITE_URL,
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
