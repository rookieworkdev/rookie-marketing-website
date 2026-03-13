import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import RookieOfMonthSection from '@/components/rookie-of-month-section'
import { getCurrentRookie } from '@/lib/previous-rookies'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('pages.personal')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/personal' },
    openGraph: {
      url: '/personal',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function PersonalPage() {
  const t = await getTranslations('pages.personal')
  const tCommon = await getTranslations('common')
  const currentRookie = await getCurrentRookie()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('breadcrumb') }]}
          title={t('pageTitle')}
          description={t('pageDescription')}
        />
        <ContactSection
          variant="full"
          subject={t('contactSubject')}
          title={t('contactTitle')}
          description={t('contactDescription')}
        />
        <RookieOfMonthSection rookie={currentRookie} />
      </main>
      <FooterSection />
    </>
  )
}
