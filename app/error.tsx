'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-medium tracking-tight">
          Något gick fel
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Ett oväntat fel uppstod. Vi ber om ursäkt för besväret.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            Försök igen
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/">Gå till startsidan</a>
          </Button>
        </div>
        {error.digest && (
          <p className="text-muted-foreground mt-8 text-sm">
            Felkod: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
