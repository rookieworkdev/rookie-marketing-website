import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('pages.contact')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/kontakt' },
    openGraph: {
      url: '/kontakt',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function KontaktPage() {
  const t = await getTranslations('pages.contact')
  const tCommon = await getTranslations('common')

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
          title={t('pageTitle')}
          description={t('pageDescription')}
        />
        <ContactSection
          variant="simple"
          subject={t('contactSubject')}
          title={t('contactTitle')}
          description={t('contactDescription')}
        />
      </main>
      <FooterSection />
    </>
  )
}
