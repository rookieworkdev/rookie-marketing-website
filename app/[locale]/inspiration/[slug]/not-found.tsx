import { HeroHeader } from '@/components/header'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
}

export default async function NotFound() {
  const t = await getTranslations('inspirationNotFound')

  return (
    <>
      <HeroHeader />
      <main className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            {t('description')}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link href="/inspiration">{t('backToInspiration')}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">{t('goHome')}</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
