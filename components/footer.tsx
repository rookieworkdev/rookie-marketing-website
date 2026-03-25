'use client'

import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { setLocale } from '@/i18n/locale'
import type { Locale } from '@/i18n/config'
import { cn, containerBorders, horizontalPadding, sectionWrapper } from '@/lib/utils'
import { Building2, ChevronRight, GraduationCap } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface FooterSectionProps {
  hideCta?: boolean
}

export default function FooterSection({ hideCta }: FooterSectionProps = {}) {
  const t = useTranslations('footer')
  const tCta = useTranslations('cta')

  const discoveryLinks = [
    { title: t('forJobSeekers'), href: '/candidates' },
    { title: t('forCompanies'), href: '/companies' },
    { title: t('inspiration'), href: '/inspiration' },
    { title: t('privacyPolicy'), href: '/policy' },
  ]

  const locale = useLocale()

  const languages: { label: string; value: Locale }[] = [
    { label: t('english'), value: 'en' },
    { label: t('swedish'), value: 'sv' },
  ]

  return (
    <footer className={sectionWrapper('bg-background')}>
      <div className={cn(containerBorders(), horizontalPadding)}>
        {/* CTA */}
        {!hideCta && (
          <div className="pt-16">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                {tCta('readyTitle')}
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-lg">
                {tCta('readySubtitle')}
              </p>
            </motion.div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              >
                <Link
                  href="/personal"
                  className="group block rounded-2xl border p-6 transition-colors hover:bg-muted/50 md:p-8"
                >
                  <Building2 className="text-muted-foreground size-6" />
                  <h3 className="mt-4 text-lg font-semibold">{tCta('forCompanies')}</h3>
                  <p className="text-muted-foreground mt-2 text-base">
                    {tCta('forCompaniesDescription')}
                  </p>
                  <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    {tCta('forCompaniesLink')}
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                <Link
                  href="/candidates"
                  className="group block rounded-2xl border p-6 transition-colors hover:bg-muted/50 md:p-8"
                >
                  <GraduationCap className="text-muted-foreground size-6" />
                  <h3 className="mt-4 text-lg font-semibold">{tCta('forJobSeekers')}</h3>
                  <p className="text-muted-foreground mt-2 text-base">
                    {tCta('forJobSeekersDescription')}
                  </p>
                  <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    {tCta('forJobSeekersLink')}
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        )}

        {/* Footer content */}
        <div className="pt-16 pb-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="space-y-4">
              <Link href="/" aria-label="go home" className="block size-fit">
                <Logo />
              </Link>
              <p className="text-xl font-medium">
                {t('tagline')}
                <br />
                {t('taglineLine2')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t('discoverRookie')}</h3>
                <nav className="flex flex-col space-y-3">
                  {discoveryLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t('contact')}</h3>
                <div className="text-muted-foreground flex flex-col space-y-3">
                  <a
                    href="https://maps.google.com/?q=Drottninggatan+32,+111+51+Stockholm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors duration-150"
                  >
                    Drottninggatan 32, 8tr
                    <br />
                    111 51 Stockholm
                  </a>
                  <a
                    href="mailto:info@rookiework.se"
                    className="hover:text-foreground transition-colors duration-150"
                  >
                    info@rookiework.se
                  </a>
                  <a
                    href="tel:+46101296000"
                    className="hover:text-foreground transition-colors duration-150"
                  >
                    010 129 60 00
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t('language')}</h3>
                <div className="flex flex-col space-y-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => {
                        if (lang.value !== locale) {
                          setLocale(lang.value)
                        }
                      }}
                      className={cn(
                        'text-muted-foreground w-fit text-left transition-colors duration-150',
                        lang.value === locale
                          ? 'underline underline-offset-4 decoration-muted-foreground/20'
                          : 'hover:text-foreground cursor-pointer'
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 pt-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Rookie, All rights reserved
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
