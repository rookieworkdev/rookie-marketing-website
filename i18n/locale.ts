'use server'

import { cookies, headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { type Locale, locales, defaultLocale } from './config'

export async function setLocale(locale: Locale) {
  if (!locales.includes(locale)) return
  const cookieStore = await cookies()
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  revalidatePath('/', 'layout')
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get('locale')?.value

  if (value && locales.includes(value as Locale)) {
    return value as Locale
  }

  // Check browser's Accept-Language header
  const headerStore = await headers()
  const acceptLanguage = headerStore.get('accept-language')
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
    for (const lang of languages) {
      if (lang.startsWith('sv')) return 'sv'
    }
  }

  return defaultLocale
}
