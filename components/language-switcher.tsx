'use client'

import { setLocale } from '@/i18n/locale'
import type { Locale } from '@/i18n/config'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const locale = useLocale()

  const handleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => handleChange('en')}
        className={cn(
          'rounded px-1.5 py-0.5 transition-colors',
          locale === 'en'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </button>
      <span className="text-muted-foreground/50">/</span>
      <button
        onClick={() => handleChange('sv')}
        className={cn(
          'rounded px-1.5 py-0.5 transition-colors',
          locale === 'sv'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        SV
      </button>
    </div>
  )
}
