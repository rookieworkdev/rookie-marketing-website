import type { MetadataRoute } from 'next'

import { routing } from '@/i18n/routing'
import { getAllSlugs } from '@/lib/inspiration'
import { SITE_URL } from '@/lib/seo'

function getAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        locale === routing.defaultLocale
          ? `${SITE_URL}${path}`
          : `${SITE_URL}/${locale}${path}`,
      ])
    ),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes = [
    '',
    '/candidates',
    '/companies',
    '/inspiration',
    '/policy',
  ]

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
    alternates: getAlternates(route || '/'),
  }))

  const inspirationSlugs = await getAllSlugs()
  const inspirationPages: MetadataRoute.Sitemap = inspirationSlugs.map((slug) => ({
    url: `${SITE_URL}/inspiration/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: getAlternates(`/inspiration/${slug}`),
  }))

  return [...staticPages, ...inspirationPages]
}
