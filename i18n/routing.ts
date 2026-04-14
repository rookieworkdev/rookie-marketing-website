import { defineRouting } from 'next-intl/routing'

const isProd = process.env.NODE_ENV === 'production'

export const routing = defineRouting({
  locales: ['en', 'sv'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'locale',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    ...(isProd ? { domain: '.rookiework.com', secure: true } : {}),
  },
})
