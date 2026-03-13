import AboutSection from '@/components/about-section'
import CeoTestimonialSection from '@/components/ceo-testimonial-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('pages.about')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: '/om-oss' },
    openGraph: {
      url: '/om-oss',
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle') + ' - Rookie',
      description: t('ogDescription'),
    },
  }
}

export default async function OmOssPage() {
  const t = await getTranslations('pages.about')
  const tCommon = await getTranslations('common')

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: tCommon('home'), href: '/' }, { label: t('metaTitle') }]}
          title={t('pageTitle')}
          description={t('pageDescription')}
        />
        <AboutSection
          title={t('aboutTitle')}
          description={[
            t('aboutDescription1'),
            t('aboutDescription2'),
          ]}
          imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
          imageAlt={t('aboutImageAlt')}
          items={[t('aboutItem1'), t('aboutItem2')]}
          ctaText={t('aboutCta')}
          ctaHref="/kontakt"
        />
        <CeoTestimonialSection
          quote={t('ceoQuote')}
          authorName={t('ceoName')}
          authorTitle={t('ceoTitle')}
          authorImage="/images/content/hakan-olsson.jpeg"
        />
      </main>
      <FooterSection />
    </>
  )
}
