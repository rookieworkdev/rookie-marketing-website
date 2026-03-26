import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import InspirationGridSection from '@/components/inspiration-grid-section'
import { PageHeader } from '@/components/page-header'
import { getAllPosts } from '@/lib/inspiration'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// Revalidate this page every 2 hours (7200 seconds)
// Inspiration posts are updated less frequently than jobs
export const revalidate = 7200

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const t = await getTranslations('pages.inspiration')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${prefix}/inspiration`,
      languages: {
        en: '/inspiration',
        sv: '/sv/inspiration',
        'x-default': '/inspiration',
      },
    },
    openGraph: {
      url: `${prefix}/inspiration`,
      title: t('metaTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle'),
      description: t('ogDescription'),
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
