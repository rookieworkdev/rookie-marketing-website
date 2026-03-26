import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*|pwa-icon-192|pwa-icon-512|apple-icon|icon|opengraph-image|twitter-image).*)',
  ],
}
