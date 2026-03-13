import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import InspirationGridSection from '@/components/inspiration-grid-section'
import { PageHeader } from '@/components/page-header'
import { getAllPosts } from '@/lib/inspiration'
import { getTranslations } from 'next-intl/server'

// Revalidate this page every 2 hours (7200 seconds)
// Inspiration posts are updated less frequently than jobs
export const revalidate = 7200

export async function generateMetadata() {
  const t = await getTranslations('pages.inspiration')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/inspiration' },
    openGraph: {
      url: '/inspiration',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function InspirationPage() {
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
