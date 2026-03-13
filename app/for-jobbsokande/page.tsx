import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getAvailableJobs } from '@/lib/jobs'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'

// Dynamic imports for below-the-fold components
const AboutSection = dynamic(() => import('@/components/about-section'))
const LargeImageSection = dynamic(() => import('@/components/large-image-section'))
const JobsCarouselSection = dynamic(() => import('@/components/jobs-carousel-section'))

export async function generateMetadata() {
  const t = await getTranslations('pages.forJobSeekers')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/for-jobbsokande' },
    openGraph: {
      url: '/for-jobbsokande',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function ForJobbsokandePage() {
  const t = await getTranslations('pages.forJobSeekers')
  const tCommon = await getTranslations('common')
  const jobs = await getAvailableJobs()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
          title={t('pageTitle')}
          description={t('pageDescription')}
          showButton
          buttonText={t('findJobs')}
          buttonHref="https://rookie-se.intelliplan.net/jobb/9/ansok"
          buttonOpenInNewTab
        />
        <AboutSection
          title={t('aboutTitle')}
          description={t('aboutDescription')}
          imageAlt={t('aboutImageAlt')}
          ctaText={t('aboutCta')}
          ctaHref="/kontakt"
        />
        <LargeImageSection
          title={t('largeImageTitle')}
          description={t('largeImageDescription')}
        />
        <JobsCarouselSection jobs={jobs} maxJobs={6} showCTA />
      </main>
      <FooterSection
        ctaContent={{
          title: t('ctaTitle'),
          description: t('ctaDescription'),
          buttonText: t('ctaButton'),
          buttonHref: '/registrera-ditt-cv',
        }}
      />
    </>
  )
}
