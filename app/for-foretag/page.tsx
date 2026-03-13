import { VolvoLogo } from '@/components/company-logos'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getCurrentRookie } from '@/lib/previous-rookies'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'

// Dynamic imports for below-the-fold components
const AboutSection = dynamic(() => import('@/components/about-section'))
const LargeImageSection = dynamic(() => import('@/components/large-image-section'))
const BenefitsSection = dynamic(() => import('@/components/benefits-section'))
const TestimonialSection = dynamic(() => import('@/components/testimonial-section'))
const RookieOfMonthSection = dynamic(() => import('@/components/rookie-of-month-section'))

export async function generateMetadata() {
  const t = await getTranslations('pages.forCompanies')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/for-foretag' },
    openGraph: {
      url: '/for-foretag',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function ForForetagPage() {
  const t = await getTranslations('pages.forCompanies')
  const tCommon = await getTranslations('common')
  const currentRookie = await getCurrentRookie()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
          title={t('pageTitle')}
          description={t('pageDescription')}
          showButton
          buttonText={t('findStaff')}
          buttonHref="/personal"
        />
        <AboutSection
          title={t('aboutTitle')}
          description={t('aboutDescription')}
          imageAlt={t('aboutImageAlt')}
          ctaText={t('aboutCta')}
          ctaHref="/personal"
        />
        <LargeImageSection
          title={t('largeImageTitle')}
          description={t('largeImageDescription')}
        />
        <BenefitsSection
          title={t('benefitsTitle')}
          description={t('benefitsDescription')}
          benefits={[
            { icon: 'target', title: t('benefit1Title'), description: t('benefit1Description') },
            { icon: 'users', title: t('benefit2Title'), description: t('benefit2Description') },
            { icon: 'lightbulb', title: t('benefit3Title'), description: t('benefit3Description') },
            { icon: 'laptop', title: t('benefit4Title'), description: t('benefit4Description') },
            { icon: 'rocket', title: t('benefit5Title'), description: t('benefit5Description') },
            { icon: 'battery', title: t('benefit6Title'), description: t('benefit6Description') },
          ]}
          ctaText={t('findStaff')}
          ctaHref="/personal"
        />
        <TestimonialSection
          quote={t('testimonialQuote')}
          authorName={t('testimonialName')}
          authorTitle={t('testimonialTitle')}
          authorImage="/avatars/karl-rudarp.png"
          companyLogo={<VolvoLogo />}
          companyName="Volvo Cars Financial Services"
        />
        <RookieOfMonthSection rookie={currentRookie} />
      </main>
      <FooterSection
        ctaVariant="double"
        ctaContent={[
          {
            title: t('ctaHelpTitle'),
            description: t('ctaHelpDescription'),
            buttonText: t('ctaHelpButton'),
            buttonHref: '/kontakt',
          },
          {
            title: t('ctaGuideTitle'),
            description: t('ctaGuideDescription'),
            buttonText: t('ctaGuideButton'),
            buttonHref: '/kontakt',
            buttonVariant: 'secondary',
          },
        ]}
      />
    </>
  )
}
