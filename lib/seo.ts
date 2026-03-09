export const SITE_NAME = 'Rookie'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rookiework.se').replace(
  /\/$/,
  ''
)

export const DEFAULT_DESCRIPTION =
  'Rookie är dedikerade till att underlätta rekryteringsprocessen för både företag och unga jobbsökande genom att matcha rätt kompetens med rätt möjligheter.'

export const DEFAULT_KEYWORDS = [
  'rekrytering',
  'jobb',
  'karriär',
  'unga talanger',
  'nyexaminerade',
  'junior',
  'jobbsökande',
  'arbetsgivare',
  'Stockholm',
  'Sverige',
  'hyrrekrytering',
  'konsult',
  'trainee',
]

export const metadataBase = new URL(SITE_URL)

export const OG_IMAGE_PATH = '/opengraph-image'
export const TWITTER_IMAGE_PATH = '/twitter-image'

export const structuredData = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: 'info@rookiework.se',
    telephone: '010 129 60 00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Drottninggatan 32, 8tr',
      postalCode: '111 51',
      addressLocality: 'Stockholm',
      addressCountry: 'SE',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
  },
])

export interface ArticleSchemaProps {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image: string
}

export function generateArticleSchema(article: ArticleSchemaProps): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/inspiration/${article.slug}`,
    },
  })
}

export interface JobSchemaProps {
  title: string
  description: string
  company: string
  location: string
  postedDate: string
  externalUrl: string
}

export function generateJobPostingSchema(job: JobSchemaProps): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'SE',
      },
    },
    employmentType: 'FULL_TIME',
    url: job.externalUrl,
  })
}

export function generateJobListingSchema(jobs: JobSchemaProps[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.postedDate,
        hiringOrganization: {
          '@type': 'Organization',
          name: job.company,
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: job.location,
            addressCountry: 'SE',
          },
        },
        url: job.externalUrl,
      },
    })),
  })
}
