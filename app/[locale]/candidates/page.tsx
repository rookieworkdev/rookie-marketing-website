import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import AboutSection from '@/components/about-section'
import BenefitsSection from '@/components/benefits-section'
import JobsSection from '@/components/jobs-section'
import { getLatestJobs } from '@/lib/jobs'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const t = await getTranslations('pages.forJobSeekers')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${prefix}/candidates`,
      languages: {
        en: '/candidates',
        sv: '/sv/candidates',
        'x-default': '/candidates',
      },
    },
    openGraph: {
      url: `${prefix}/candidates`,
      title: t('metaTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle'),
      description: t('ogDescription'),
    },
  }
}

export default async function ForJobbsokandePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('pages.forJobSeekers')
  const tCommon = await getTranslations('common')
  const jobs = await getLatestJobs(8)

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
          eyebrow={t('eyebrow')}
          title={t('pageTitle')}
          description={t('pageDescription')}
          showButton
          buttonText={t('ctaButton')}
          buttonHref="https://app.rookiework.com/login"
        />
        <AboutSection
          title={t('aboutTitle')}
          description={[t('aboutDescription1'), t('aboutDescription2')]}
          ctaText={t('aboutCta')}
          ctaHref="https://app.rookiework.com/signup"
        />
        <BenefitsSection
          title={t('benefitsTitle')}
          description={t('benefitsDescription')}
          benefits={[
            { icon: 'target', title: t('benefit1Title'), description: t('benefit1Description') },
            { icon: 'users', title: t('benefit2Title'), description: t('benefit2Description') },
            { icon: 'rocket', title: t('benefit3Title'), description: t('benefit3Description') },
          ]}
        />
        <JobsSection jobs={jobs} />
      </main>
      <FooterSection />
    </>
  )
}
