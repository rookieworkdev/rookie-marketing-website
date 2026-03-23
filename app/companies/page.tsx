import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import dynamic from 'next/dynamic'
import { getTranslations } from 'next-intl/server'

// Dynamic imports for below-the-fold components
const BenefitsSection = dynamic(() => import('@/components/benefits-section'))
const TestimonialSection = dynamic(() => import('@/components/testimonial-section'))

export async function generateMetadata() {
  const t = await getTranslations('pages.forCompanies')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/companies' },
    openGraph: {
      url: '/companies',
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
          buttonHref="/skapa-uppdrag"
          showAvatarGraphic
          avatarVariant="companies"
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
          authorName={t('testimonialName')}
          authorTitle={t('testimonialTitle')}
          authorImage="/avatars/karl-rudarp.png"
          smallTitle
        />
      </main>
      <FooterSection
        ctaContent={{
          title: t('ctaTitle'),
          description: t('ctaDescription'),
          buttonText: t('ctaButton'),
          buttonHref: '/skapa-uppdrag',
        }}
      />
    </>
  )
}
