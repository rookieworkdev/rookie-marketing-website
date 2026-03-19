'use client'

import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { setLocale } from '@/i18n/locale'
import type { Locale } from '@/i18n/config'
import { cn, containerBorders, horizontalPadding, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface CTAItem {
  title: string
  description: string
  buttonText: string
  buttonHref?: string
  buttonVariant?: 'default' | 'secondary'
  buttonOpenInNewTab?: boolean
  secondaryButtonText?: string
  secondaryButtonHref?: string
  secondaryButtonOpenInNewTab?: boolean
}

interface FooterSectionProps {
  ctaVariant?: 'single' | 'double'
  ctaContent?: CTAItem | [CTAItem, CTAItem]
}

function CTADouble({ content }: { content: [CTAItem, CTAItem] }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex-1 overflow-hidden rounded-2xl p-6 shadow-xs md:p-8 lg:p-10"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/60 to-black/10" />
        <div className="relative flex flex-col justify-between gap-8 md:min-h-[200px]">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
              {content[0].title}
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/80">{content[0].description}</p>
          </div>
          <div className="self-start">
            <Button asChild size="default" variant={content[0].buttonVariant || 'default'}>
              <Link
                href={content[0].buttonHref || '/kontakt'}
                target={content[0].buttonOpenInNewTab ? '_blank' : undefined}
              >
                <span className="text-nowrap">{content[0].buttonText}</span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="bg-muted relative flex-1 overflow-hidden rounded-2xl p-6 shadow-xs md:p-8 lg:p-10"
      >
        <div className="relative flex flex-col justify-between gap-8 md:min-h-[200px]">
          <div className="max-w-2xl">
            <h2 className="text-foreground text-3xl font-medium tracking-tight md:text-3xl lg:text-4xl">
              {content[1].title}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-base">{content[1].description}</p>
          </div>
          <div className="self-start">
            <Button asChild size="default" variant={content[1].buttonVariant || 'default'}>
              <Link
                href={content[1].buttonHref || '/kontakt'}
                target={content[1].buttonOpenInNewTab ? '_blank' : undefined}
              >
                <span className="text-nowrap">{content[1].buttonText}</span>
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CTASingle({ content }: { content: CTAItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl shadow-xs"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-black/90 via-black/60 to-black/10" />
      <div className="relative flex flex-col justify-between gap-8 p-6 md:min-h-[200px] md:p-8 lg:p-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-xl text-base text-pretty text-white/80">{content.description}</p>
        </div>
        <div className="flex flex-wrap gap-3 self-start">
          <Button asChild size="default" variant={content.buttonVariant || 'default'}>
            <Link
              href={content.buttonHref || '/kontakt'}
              target={content.buttonOpenInNewTab ? '_blank' : undefined}
            >
              <span className="text-nowrap">{content.buttonText}</span>
            </Link>
          </Button>
          {content.secondaryButtonText && (
            <Button
              asChild
              size="default"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link
                href={content.secondaryButtonHref || '/kontakt'}
                target={content.secondaryButtonOpenInNewTab ? '_blank' : undefined}
              >
                <span className="text-nowrap">{content.secondaryButtonText}</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function FooterSection({
  ctaVariant = 'single',
  ctaContent,
}: FooterSectionProps = {}) {
  const t = useTranslations('footer')
  const tCta = useTranslations('cta')

  const defaultSingleContent: CTAItem = {
    title: t('getStarted'),
    description: t('getStartedDescription'),
    buttonText: t('registerCompany'),
    buttonHref: '/personal',
    secondaryButtonText: t('loginAsCandidate'),
    secondaryButtonHref: '/candidates',
  }

  const defaultDoubleContent: [CTAItem, CTAItem] = [
    {
      title: tCta('canWeHelp'),
      description: tCta('canWeHelpDescription'),
      buttonText: tCta('contactUs'),
      buttonHref: '/kontakt',
    },
    {
      title: tCta('guide'),
      description: tCta('guideDescription'),
      buttonText: tCta('getAccess'),
      buttonHref: '/kontakt',
      buttonVariant: 'secondary',
    },
  ]

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

  const singleContent = ctaContent && !Array.isArray(ctaContent) ? ctaContent : defaultSingleContent
  const doubleContent = ctaContent && Array.isArray(ctaContent) ? ctaContent : defaultDoubleContent

  return (
    <footer className={sectionWrapper('bg-background')}>
      <div className={cn(containerBorders(), horizontalPadding)}>
        {/* CTA */}
        <div className="pt-16">
          {ctaVariant === 'double' ? (
            <CTADouble content={doubleContent} />
          ) : (
            <CTASingle content={singleContent} />
          )}
        </div>

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
