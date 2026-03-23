import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import HowItWorksSection from '@/components/how-it-works-section'
import { getLatestJobs } from '@/lib/jobs'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'

const TestimonialSection = dynamic(() => import('@/components/testimonial-section'))

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
  const tCompanies = await getTranslations('pages.forCompanies')
  const jobs = await getLatestJobs(8)

  return (
    <>
      <HeroSection jobs={jobs} />
      <HowItWorksSection />
      <TestimonialSection
        quote={tCompanies('testimonialQuote')}
        authorName={tCompanies('testimonialName')}
        authorTitle={tCompanies('testimonialTitle')}
        authorImage="/avatars/karl-rudarp.png"
        smallTitle
      />
      <FooterSection />
    </>
  )
}
