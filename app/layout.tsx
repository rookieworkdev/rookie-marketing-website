import { ThemeProvider } from '@/components/theme-provider'
import {
  metadataBase,
  OG_IMAGE_PATH,
  SITE_NAME,
  structuredData,
  TWITTER_IMAGE_PATH,
} from '@/lib/seo'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import './globals.css'

// Local Inter font for better performance (no external requests)
const inter = localFont({
  src: [
    { path: './fonts/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Inter-Italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/Inter-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Inter-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Inter-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Inter-Black.woff2', weight: '900', style: 'normal' },
    { path: './fonts/Inter-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    images: [TWITTER_IMAGE_PATH],
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
