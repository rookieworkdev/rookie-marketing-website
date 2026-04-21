import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import HowItWorksSection from '@/components/how-it-works-section'
import BenefitsSection from '@/components/benefits-section'
import BlogSection from '@/components/blog-section'
import TestimonialSection from '@/components/testimonial-section'
import { getLatestJobs } from '@/lib/jobs'
import { fetchRookieOfMonth } from '@/lib/rookie-of-month'
import {
  buildLanguageAlternates,
  localePrefixedPath,
  OG_IMAGE_PATH,
  SITE_NAME,
  TWITTER_IMAGE_PATH,
} from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import RookieOfMonthSection from '@/components/rookie-of-month-section'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('pages.home')
  const ogLocale = locale === 'sv' ? 'sv_SE' : 'en_US'
  const ogAlternateLocale = locale === 'sv' ? 'en_US' : 'sv_SE'
  const canonical = localePrefixedPath(locale, '/')
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/'),
    },
    openGraph: {
      url: canonical,
      title: t('metaTitle'),
      description: t('ogDescription'),
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      title: t('metaTitle'),
      description: t('ogDescription'),
      images: [TWITTER_IMAGE_PATH],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const tHome = await getTranslations('pages.home')
  const tCompanies = await getTranslations('pages.forCompanies')
  const [jobs, rookie] = await Promise.all([getLatestJobs(8), fetchRookieOfMonth()])

  return (
    <>
      <HeroSection jobs={jobs} />
      <HowItWorksSection />
      <BenefitsSection
        title={tHome('talentTitle')}
        description={tHome('talentDescription')}
        benefits={[
          {
            icon: 'target',
            title: tHome('talent1Title'),
            description: tHome('talent1Description'),
          },
          {
            icon: 'rocket',
            title: tHome('talent2Title'),
            description: tHome('talent2Description'),
          },
          {
            icon: 'laptop',
            title: tHome('talent3Title'),
            description: tHome('talent3Description'),
          },
          {
            icon: 'lightbulb',
            title: tHome('talent4Title'),
            description: tHome('talent4Description'),
          },
          {
            icon: 'users',
            title: tHome('talent5Title'),
            description: tHome('talent5Description'),
          },
          {
            icon: 'battery',
            title: tHome('talent6Title'),
            description: tHome('talent6Description'),
          },
        ]}
        ctaText={tHome('talentCta')}
        ctaHref="/companies"
        secondaryCtaText={tHome('candidatesCta')}
        secondaryCtaHref="/candidates"
      />
      <BlogSection />
      <TestimonialSection
        quote={tCompanies('testimonialQuote')}
        role={tCompanies('testimonialRole')}
        company={tCompanies('testimonialCompany')}
      />
      <RookieOfMonthSection rookie={rookie} />
      <FooterSection />
    </>
  )
}
