import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getLatestJobs } from '@/lib/jobs'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'

export const revalidate = 86400

// Dynamic imports for below-the-fold components
const BenefitsSection = dynamic(() => import('@/components/benefits-section'))
const JobsSection = dynamic(() => import('@/components/jobs-section'))

export async function generateMetadata() {
  const t = await getTranslations('pages.forJobSeekers')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/candidates' },
    openGraph: {
      url: '/candidates',
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
          buttonHref="/skapa-profil"
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
      <FooterSection
        ctaContent={{
          title: t('ctaTitle'),
          description: t('ctaDescription'),
          buttonText: t('ctaButton'),
          buttonHref: '/skapa-profil',
        }}
      />
    </>
  )
}
