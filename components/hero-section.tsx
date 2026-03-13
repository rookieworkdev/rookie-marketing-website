'use client'

import { Button } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn, containerBorders, horizontalPadding } from '@/lib/utils'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { AutolivLogo, CoopLogistikLogo, KlarnaLogo, SkandiaLogo } from './company-logos'
import { HeroHeader } from './header'
import { MatchScore } from './match-score'

export default function HeroSection() {
  const t = useTranslations('hero')
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="bg-background">
          <div
            className={cn(containerBorders(), 'relative flex min-h-svh flex-col overflow-hidden')}
          >
            {/* Flickering grid background — absolute fill, no gaps */}
            <FlickeringGrid
              squareSize={3}
              gridGap={6}
              flickerChance={0.3}
              color="rgb(0, 0, 0)"
              maxOpacity={0.15}
              className="absolute inset-0 dark:hidden"
            />
            <FlickeringGrid
              squareSize={4}
              gridGap={6}
              flickerChance={0.3}
              color="rgb(255, 255, 255)"
              maxOpacity={0.15}
              className="absolute inset-0 hidden dark:block"
            />
            {/* Gradient overlay: solid background at top, transparent at bottom */}
            <div className="from-background absolute inset-0 bg-gradient-to-b from-25% to-transparent" />

            {/* Content */}
            <div
              className={cn(
                horizontalPadding,
                'relative mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center text-center'
              )}
            >
              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="border-border mb-8 inline-flex items-center rounded-full border p-1 shadow-xs"
              >
                <div className="flex items-center gap-2 px-3 py-1">
                  <span className="text-muted-foreground text-sm">{t('aiReviewedAssignments')}</span>
                  <span className="text-foreground text-sm font-semibold">1 400+</span>
                </div>
                <div className="bg-border h-4 w-px" />
                <div className="flex items-center gap-2 px-3 py-1">
                  <span className="text-muted-foreground text-sm">{t('assignmentsAnalyzed')}</span>
                  <span className="text-foreground text-sm font-semibold">1 700+</span>
                </div>
                <div className="bg-border h-4 w-px" />
                <div className="flex items-center gap-2 px-3 py-1">
                  <span className="text-muted-foreground text-sm">{t('companiesInNetwork')}</span>
                  <span className="text-foreground text-sm font-semibold">1 100+</span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              >
                <h1 className="text-foreground text-3xl font-medium tracking-tight md:text-4xl xl:text-5xl">
                  {t('matchQuickly')}{' '}
                  <span className="bg-linear-to-br from-green-700 via-green-600 to-yellow-400 bg-clip-text text-transparent">
                    {t('withAI')}
                  </span>
                </h1>
                <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base font-medium">
                  {t('subtitle')}
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="mt-8 flex items-center justify-center gap-3"
              >
                <Button asChild size="default" className="min-w-[140px]">
                  <Link href="/skapa-uppdrag">
                    <span>{t('createAssignment')}</span>
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="min-w-[140px]">
                  <Link href="/skapa-profil">
                    <span>{t('createProfile')}</span>
                  </Link>
                </Button>
              </motion.div>

              {/* Match score indicator */}
              <div className="mt-8 w-full max-w-lg">
                <MatchScore score={85} />
              </div>
            </div>

            {/* Logo carousel — absolute bottom */}
            <div className="border-border/50 absolute inset-x-0 bottom-0 border-t py-6">
              {/* Solid background fade + blur on left */}
              <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r to-transparent" />
              <ProgressiveBlur
                className="pointer-events-none absolute top-0 left-0 z-10 h-full w-28"
                direction="left"
                blurIntensity={1}
              />
              {/* Solid background fade + blur on right */}
              <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-l to-transparent" />
              <ProgressiveBlur
                className="pointer-events-none absolute top-0 right-0 z-10 h-full w-28"
                direction="right"
                blurIntensity={1}
              />
              <InfiniteSlider speedOnHover={10} speed={20} gap={112}>
                <div className="flex items-center justify-center">
                  <CoopLogistikLogo />
                </div>
                <div className="flex items-center justify-center">
                  <KlarnaLogo />
                </div>
                <div className="flex items-center justify-center">
                  <SkandiaLogo />
                </div>
                <div className="flex items-center justify-center">
                  <AutolivLogo />
                </div>
              </InfiniteSlider>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
