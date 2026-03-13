import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { defaultLocale, type Locale, locales } from './config'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('locale')?.value

  let locale: Locale = defaultLocale

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale
  } else {
    // Browser language detection via Accept-Language header
    const headerStore = await headers()
    const acceptLanguage = headerStore.get('accept-language')
    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0].trim().toLowerCase())
      for (const lang of languages) {
        if (lang.startsWith('sv')) {
          locale = 'sv'
          break
        }
      }
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
