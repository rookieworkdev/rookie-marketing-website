import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import BenefitsSection from '@/components/benefits-section'
import LargeImageSection from '@/components/large-image-section'
import TestimonialSection from '@/components/testimonial-section'
import {
  buildLanguageAlternates,
  localePrefixedPath,
  OG_IMAGE_PATH,
  SITE_NAME,
  TWITTER_IMAGE_PATH,
} from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('pages.forCompanies')
  const ogLocale = locale === 'sv' ? 'sv_SE' : 'en_US'
  const ogAlternateLocale = locale === 'sv' ? 'en_US' : 'sv_SE'
  const canonical = localePrefixedPath(locale, '/companies')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/companies'),
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

export default async function ForForetagPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('pages.forCompanies')
  const tCommon = await getTranslations('common')

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
          buttonHref="https://app.rookiework.com/request-access"
        />
        <BenefitsSection
          title={t('benefitsTitle')}
          description={t('benefitsDescription')}
          benefits={[
            { icon: 'target', title: t('benefit1Title'), description: t('benefit1Description') },
            { icon: 'rocket', title: t('benefit2Title'), description: t('benefit2Description') },
            { icon: 'users', title: t('benefit3Title'), description: t('benefit3Description') },
          ]}
        />
        <LargeImageSection
          title={t('largeImageTitle')}
          description={t('largeImageDescription')}
        />
        <BenefitsSection
          title={t('talentBenefitsTitle')}
          description={t('talentBenefitsDescription')}
          benefits={[
            {
              icon: 'target',
              title: t('talentBenefit1Title'),
              description: t('talentBenefit1Description'),
            },
            {
              icon: 'users',
              title: t('talentBenefit2Title'),
              description: t('talentBenefit2Description'),
            },
            {
              icon: 'lightbulb',
              title: t('talentBenefit3Title'),
              description: t('talentBenefit3Description'),
            },
            {
              icon: 'laptop',
              title: t('talentBenefit4Title'),
              description: t('talentBenefit4Description'),
            },
            {
              icon: 'rocket',
              title: t('talentBenefit5Title'),
              description: t('talentBenefit5Description'),
            },
            {
              icon: 'battery',
              title: t('talentBenefit6Title'),
              description: t('talentBenefit6Description'),
            },
          ]}
          ctaText={t('talentBenefitsCta')}
          ctaHref="https://app.rookiework.com/request-access"
        />
        <TestimonialSection
          quote={t('testimonialQuote')}
          role={t('testimonialRole')}
          company={t('testimonialCompany')}
        />
      </main>
      <FooterSection />
    </>
  )
}
