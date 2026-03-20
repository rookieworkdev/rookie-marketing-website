import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import HowItWorksSection from '@/components/how-it-works-section'
import JobsSection from '@/components/jobs-section'
import { getLatestJobs } from '@/lib/jobs'
import { getTranslations } from 'next-intl/server'

export const revalidate = 86400

export async function generateMetadata() {
  const t = await getTranslations('pages.home')
  const tSeo = await getTranslations('seo')
  return {
    title: t('title'),
    description: tSeo('defaultDescription'),
    alternates: { canonical: '/' },
    openGraph: {
      url: '/',
      title: t('title') + ' - Rookie',
      description: tSeo('defaultDescription'),
    },
    twitter: {
      title: t('title') + ' - Rookie',
      description: tSeo('defaultDescription'),
    },
  }
}

export default async function Page() {
  const t = await getTranslations('pages.home')
  const jobs = await getLatestJobs(8)

  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <JobsSection jobs={jobs} />
      <FooterSection />
    </>
  )
}
