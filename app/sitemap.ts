import type { MetadataRoute } from 'next'

import { getAllSlugs } from '@/lib/inspiration'
import { buildLanguageAlternates, SITE_URL } from '@/lib/seo'

function absoluteAlternates(path: string) {
  const languages = buildLanguageAlternates(path)
  return {
    languages: Object.fromEntries(
      Object.entries(languages).map(([locale, relativePath]) => [
        locale,
        `${SITE_URL}${relativePath}`,
      ])
    ),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes = ['/', '/candidates', '/companies', '/inspiration', '/policy']

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
    alternates: absoluteAlternates(route),
  }))

  const inspirationSlugs = await getAllSlugs()
  const inspirationPages: MetadataRoute.Sitemap = inspirationSlugs.map((slug) => ({
    url: `${SITE_URL}/inspiration/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
    alternates: absoluteAlternates(`/inspiration/${slug}`),
  }))

  return [...staticPages, ...inspirationPages]
}
