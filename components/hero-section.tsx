'use client'

import { Button } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import type { JobDisplay } from '@/lib/jobs'
import { cn, containerBorders, horizontalPadding } from '@/lib/utils'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { HeroHeader } from './header'
import { JobPostingCard } from './job-posting-card'

interface HeroSectionProps {
  jobs: JobDisplay[]
}

export default function HeroSection({ jobs }: HeroSectionProps) {
  const t = useTranslations('hero')
  const tJobs = useTranslations('jobsSection')
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="bg-background">
          <div className={cn(containerBorders(), 'relative flex flex-col overflow-hidden pt-16')}>
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
                'relative mx-auto flex max-w-5xl flex-col items-center justify-center py-24 text-center'
              )}
            >
              {/* Stats bar */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="border-border mb-8 inline-flex items-center rounded-full border p-1 shadow-xs"
              >
                <div className="flex items-center gap-2 px-3 py-1">
                  <span className="text-foreground text-sm font-medium">Direktrekrytering</span>
                </div>
                <div className="bg-border h-4 w-px" />
                <div className="flex items-center gap-2 px-3 py-1">
                  <span className="text-foreground text-sm font-medium">Hyrrekrytering</span>
                </div>
                <div className="bg-border h-4 w-px" />
                <div className="flex items-center gap-2 px-3 py-1">
                  <span className="text-foreground text-sm font-medium">Bemanning</span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              >
                <h1 className="text-foreground text-3xl font-medium tracking-tighter md:text-4xl xl:text-5xl">
                  {t('matchQuickly')}
                </h1>
                <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base">
                  {t('subtitle')}
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className="mt-8 flex items-center justify-center gap-4"
              >
                <Button asChild size="default" className="min-w-[160px]">
                  <Link href="#">
                    <span>{t('findTalents')}</span>
                  </Link>
                </Button>
                <Button asChild size="default" variant="outline" className="min-w-[160px]">
                  <Link href="#">
                    <span>{t('findJobs')}</span>
                  </Link>
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                className="text-muted-foreground mt-4 text-sm"
              >
                {t('benefitsText')}
              </motion.p>
            </div>

            {/* Available positions */}
            {jobs && jobs.length > 0 && (
              <div className={cn(horizontalPadding, 'relative w-full pb-16 text-left')}>
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                  className="flex items-center justify-between"
                >
                  <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                    {tJobs('title')}
                  </h2>
                  <Link
                    href="/jobb"
                    className="text-primary text-sm font-medium underline underline-offset-4 hover:opacity-80"
                  >
                    {tJobs('viewAll')}
                  </Link>
                </motion.div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 + index * 0.04 }}
                    >
                      <JobPostingCard job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Logo carousel — hidden */}
          </div>
        </section>
      </main>
    </>
  )
}
