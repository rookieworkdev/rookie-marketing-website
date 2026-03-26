import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { cn, containerBorders, topBorder } from '@/lib/utils'
import { routing } from '@/i18n/routing'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const t = await getTranslations('pages.privacyPolicy')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${prefix}/policy`,
      languages: {
        en: '/policy',
        sv: '/sv/policy',
        'x-default': '/policy',
      },
    },
    openGraph: {
      url: `${prefix}/policy`,
      title: t('metaTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      title: t('metaTitle'),
      description: t('ogDescription'),
    },
  }
}

export default async function IntegritetspolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('pages.privacyPolicy')
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
        <article className={cn('bg-background', topBorder())}>
          <div className={cn(containerBorders(), 'px-6 py-16')}>
            <div className="mx-auto max-w-4xl">
              <div className="prose prose-lg prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mb-8 prose-h1:mt-16 prose-h1:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-2xl prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline prose-a:transition-colors hover:prose-a:underline prose-strong:font-semibold prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-pre:bg-muted prose-pre:p-4 prose-img:rounded-lg prose-hr:my-8 max-w-none">
                <h1>{t('title')}</h1>
                <p>{t('intro')}</p>

                <h2>{t('section1Title')}</h2>
                <p>{t('section1Text')}</p>

                <h2>{t('section2Title')}</h2>
                <p>{t('section2Text')}</p>

                <h2>{t('section3Title')}</h2>
                <h3>{t('section3_1Title')}</h3>
                <p>{t('section3_1Text')}</p>

                <h3>{t('section3_2Title')}</h3>
                <h4>{t('section3_2_1Title')}</h4>
                <p>{t('section3_2_1Text1')}</p>
                <p>{t('section3_2_1Text2')}</p>
                <p>{t('section3_2_1Text3')}</p>
                <p>{t('section3_2_1Text4')}</p>
                <p>{t('section3_2_1Text5')}</p>
                <p>{t('section3_2_1Text6')}</p>

                <h4>{t('section3_2_2Title')}</h4>
                <p>{t('section3_2_2Text1')}</p>
                <p>{t('section3_2_2Text2')}</p>

                <h4>{t('section3_2_3Title')}</h4>
                <p>{t('section3_2_3Text1')}</p>
                <p>{t('section3_2_3Text2')}</p>
                <p>{t('section3_2_3Text3')}</p>

                <h3>{t('section3_3Title')}</h3>
                <h4>{t('section3_3_1Title')}</h4>
                <p>{t('section3_3_1Text')}</p>

                <h4>{t('section3_3_2Title')}</h4>
                <p>{t('section3_3_2Text1')}</p>
                <p>{t('section3_3_2Text2')}</p>

                <h4>{t('section3_3_3Title')}</h4>
                <p>{t('section3_3_3Text')}</p>

                <h3>{t('section3_4Title')}</h3>
                <h4>{t('section3_4_1Title')}</h4>
                <p>{t('section3_4_1Text')}</p>

                <h4>{t('section3_4_2Title')}</h4>
                <p>{t('section3_4_2Text')}</p>

                <h4>{t('section3_4_3Title')}</h4>
                <p>{t('section3_4_3Text')}</p>

                <h2>{t('section4Title')}</h2>
                <p>{t('section4Text')}</p>

                <h2>{t('section5Title')}</h2>
                <h3>{t('section5_1Title')}</h3>
                <p>{t('section5_1Text')}</p>

                <h3>{t('section5_2Title')}</h3>
                <p>{t('section5_2Text1')}</p>
                <p>{t('section5_2Text2')}</p>
                <p>{t('section5_2Text3')}</p>
                <p>{t('section5_2Text4')}</p>

                <h3>{t('section5_3Title')}</h3>
                <p>{t('section5_3Text1')}</p>
                <p>{t('section5_3Text2')}</p>

                <h3>{t('section5_4Title')}</h3>
                <p>{t('section5_4Text1')}</p>
                <p>{t('section5_4Text2')}</p>
                <p>{t('section5_4Text3')}</p>
                <p>{t('section5_4Text4')}</p>
                <p>{t('section5_4Text5')}</p>

                <h2>{t('section6Title')}</h2>
                <p>{t('section6Text1')}</p>
                <ul>
                  <li>{t('section6Right1')}</li>
                  <li>{t('section6Right2')}</li>
                  <li>{t('section6Right3')}</li>
                  <li>{t('section6Right4')}</li>
                  <li>{t('section6Right5')}</li>
                  <li>{t('section6Right6')}</li>
                </ul>
                <p>{t('section6Text2')}</p>
                <p>{t('section6Text3')}</p>

                <h2>{t('section7Title')}</h2>
                <p>{t('section7Text')}</p>

                <h2>{t('section8Title')}</h2>
                <p>{t('section8Text')}</p>

                <h2>{t('section9Title')}</h2>
                <p>{t('section9Text1')}</p>
                <p>{t('section9Text2')}</p>
                <p>{t('section9Text3')}</p>
                <p>{t('section9Text4')}</p>

                <h2>{t('section10Title')}</h2>
                <p>{t('section10Text1')}</p>
                <p>{t('section10Text2')}</p>

                <h2>{t('questionsTitle')}</h2>
                <p>{t('questionsText')}</p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  )
}
