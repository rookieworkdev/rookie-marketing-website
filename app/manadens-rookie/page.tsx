import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import PreviousRookiesSection from '@/components/previous-rookies-section'
import RookieOfMonthSection from '@/components/rookie-of-month-section'
import { getCurrentRookie, getPreviousRookies } from '@/lib/previous-rookies'
import { getTranslations } from 'next-intl/server'

// Revalidate this page every day (86400 seconds)
// Rookie of the month changes monthly, so daily checks are sufficient
// export const revalidate = 86400
export const revalidate = 1

export async function generateMetadata() {
  const t = await getTranslations('pages.rookieOfMonth')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/manadens-rookie' },
    openGraph: {
      url: '/manadens-rookie',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function ManadensRookiePage() {
  const t = await getTranslations('pages.rookieOfMonth')
  const tCommon = await getTranslations('common')
  const [currentRookie, previousRookies] = await Promise.all([
    getCurrentRookie(),
    getPreviousRookies(),
  ])

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
          title={t('pageTitle')}
          description={t('pageDescription')}
        />
        <RookieOfMonthSection rookie={currentRookie} />
        <PreviousRookiesSection rookies={previousRookies} />
      </main>
      <FooterSection />
    </>
  )
}
