import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import HowItWorksSection from '@/components/how-it-works-section'
import BlogSection from '@/components/blog-section'
import TestimonialSection from '@/components/testimonial-section'
import { getLatestJobs } from '@/lib/jobs'
// import { getCurrentRookie } from '@/lib/previous-rookies'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// import RookieOfMonthSection from '@/components/rookie-of-month-section'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const t = await getTranslations('pages.home')
  const tSeo = await getTranslations('seo')
  return {
    title: t('title'),
    description: tSeo('defaultDescription'),
    alternates: {
      canonical: `${prefix}/`,
      languages: {
        en: '/',
        sv: '/sv',
        'x-default': '/',
      },
    },
    openGraph: {
      url: `${prefix}/`,
      title: t('title'),
      description: tSeo('defaultDescription'),
    },
    twitter: {
      title: t('title'),
      description: tSeo('defaultDescription'),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('pages.home')
  const tCompanies = await getTranslations('pages.forCompanies')
  const jobs = await getLatestJobs(8)
  // const [jobs, rookie] = await Promise.all([getLatestJobs(8), getCurrentRookie()])

  return (
    <>
      <HeroSection jobs={jobs} />
      <HowItWorksSection />
      {/* <RookieOfMonthSection rookie={rookie} /> */}
      <BlogSection />
      <TestimonialSection
        quote={tCompanies('testimonialQuote')}
        role={tCompanies('testimonialRole')}
        company={tCompanies('testimonialCompany')}
      />
      <FooterSection />
    </>
  )
}
