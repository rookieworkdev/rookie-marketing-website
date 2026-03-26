import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { Button } from '@/components/ui/button'
import { cn, containerBorders, horizontalPadding } from '@/lib/utils'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
}

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <>
      <HeroHeader />
      <main>
        <section className="bg-background">
          <div
            className={cn(containerBorders(), 'relative flex min-h-svh flex-col items-center justify-center overflow-hidden')}
          >
            {/* Flickering grid background */}
            <FlickeringGrid
              squareSize={3}
              gridGap={6}
              flickerChance={0.3}
              color="rgb(0, 0, 0)"
              maxOpacity={0.15}
              className="absolute inset-0 dark:hidden"
            />
            <FlickeringGrid
              squareSize={4}
              gridGap={6}
              flickerChance={0.3}
              color="rgb(255, 255, 255)"
              maxOpacity={0.15}
              className="absolute inset-0 hidden dark:block"
            />
            {/* Gradient overlay */}
            <div className="from-background absolute inset-0 bg-gradient-to-b from-25% to-transparent" />

            <div className={cn('relative text-center', horizontalPadding)}>
              <p className="text-primary mb-4 text-lg font-medium">404</p>
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <p className="text-muted-foreground mt-6 text-lg">
                {t('description')}
              </p>
              <div className="mt-10">
                <Button asChild size="lg">
                  <Link href="/">{t('goHome')}</Link>
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
