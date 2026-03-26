'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

function getThemeCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(/(?:^|; )theme=([^;]*)/)
  return match ? match[1] : undefined
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const cookieTheme = getThemeCookie()

  return (
    <NextThemesProvider
      {...props}
      {...(cookieTheme ? { forcedTheme: undefined, defaultTheme: cookieTheme } : {})}
    >
      {children}
    </NextThemesProvider>
  )
}

