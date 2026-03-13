import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { Button } from '@/components/ui/button'
import { cn, horizontalPadding, whiteBorderWrapper } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  const tCommon = await getTranslations('common')

  return (
    <>
      <HeroHeader />
      <main>
        <section className="bg-muted relative min-h-screen">
          {/* Border container */}
          <div
            className={cn(
              'relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center',
              whiteBorderWrapper()
            )}
          >
            <div className={cn('text-center', horizontalPadding)}>
              <p className="text-primary mb-4 text-lg font-medium">404</p>
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="text-muted-foreground mt-6 text-lg">
                {t('description')}
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/">{t('goHome')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/kontakt">{t('contactUs')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  )
}
