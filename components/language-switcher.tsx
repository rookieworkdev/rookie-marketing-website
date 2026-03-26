'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1 text-sm">
      <Link
        href={pathname}
        locale="en"
        className={cn(
          'rounded px-1.5 py-0.5 transition-colors',
          locale === 'en'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        EN
      </Link>
      <span className="text-muted-foreground/50">/</span>
      <Link
        href={pathname}
        locale="sv"
        className={cn(
          'rounded px-1.5 py-0.5 transition-colors',
          locale === 'sv'
            ? 'text-foreground font-medium'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        SV
      </Link>
    </div>
  )
}
