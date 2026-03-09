import type { MetadataRoute } from 'next'

import { getAllSlugs } from '@/lib/inspiration'
import { SITE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes = [
    '',
    'manadens-rookie',
    'for-jobbsokande',
    'for-foretag',
    'lediga-jobb',
    'om-oss',
    'inspiration',
    'kontakt',
    'integritetspolicy',
    'personal',
  ]

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route === '' ? SITE_URL : `${SITE_URL}/${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  // Fetch dynamic inspiration post slugs
  const inspirationSlugs = await getAllSlugs()
  const inspirationPages: MetadataRoute.Sitemap = inspirationSlugs.map((slug) => ({
    url: `${SITE_URL}/inspiration/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...inspirationPages]
}
