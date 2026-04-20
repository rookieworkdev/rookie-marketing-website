import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import InspirationGridSection from '@/components/inspiration-grid-section'
import { PageHeader } from '@/components/page-header'
import { getAllPosts } from '@/lib/inspiration'
import {
  buildLanguageAlternates,
  localePrefixedPath,
  OG_IMAGE_PATH,
  SITE_NAME,
  TWITTER_IMAGE_PATH,
} from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// Revalidate this page every 2 hours (7200 seconds)
// Inspiration posts are updated less frequently than jobs
export const revalidate = 7200

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('pages.inspiration')
  const ogLocale = locale === 'sv' ? 'sv_SE' : 'en_US'
  const ogAlternateLocale = locale === 'sv' ? 'en_US' : 'sv_SE'
  const canonical = localePrefixedPath(locale, '/inspiration')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/inspiration'),
    },
    openGraph: {
      url: canonical,
      title: t('metaTitle'),
      description: t('ogDescription'),
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      title: t('metaTitle'),
      description: t('ogDescription'),
      images: [TWITTER_IMAGE_PATH],
    },
  }
}

export default async function InspirationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('pages.inspiration')
  const tCommon = await getTranslations('common')
  const posts = await getAllPosts()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          title={t('pageTitle')}
          description={t('pageDescription')}
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
        />
        <InspirationGridSection posts={posts} />
      </main>
      <FooterSection />
    </>
  )
}
