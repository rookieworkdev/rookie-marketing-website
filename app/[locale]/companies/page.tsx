import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import BenefitsSection from '@/components/benefits-section'
import TestimonialSection from '@/components/testimonial-section'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const t = await getTranslations('pages.forCompanies')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${prefix}/companies`,
      languages: {
        en: '/companies',
        sv: '/sv/companies',
        'x-default': '/companies',
      },
    },
    openGraph: {
      url: `${prefix}/companies`,
      title: t('metaTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle'),
      description: t('ogDescription'),
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
