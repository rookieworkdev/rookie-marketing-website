'use client'

import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('error')

  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-medium tracking-tight">
          {t('title')}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          {t('description')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            {t('tryAgain')}
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/">{t('goHome')}</a>
          </Button>
        </div>
        {error.digest && (
          <p className="text-muted-foreground mt-8 text-sm">
            {t('errorCode')} {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
