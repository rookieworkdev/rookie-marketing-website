import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { JobPostingCard } from './job-posting-card'
import type { JobDisplay } from '@/lib/jobs'

interface JobsSectionProps {
  jobs: JobDisplay[]
}

export default async function JobsSection({ jobs }: JobsSectionProps) {
  const t = await getTranslations('jobsSection')
  if (!jobs || jobs.length === 0) return null

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <AnimateOnScroll className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base">
              {t('subtitle')}
            </p>
          </div>
          <Button asChild>
            <Link href="https://app.rookiework.com/login">{t('viewAll')}</Link>
          </Button>
        </AnimateOnScroll>

        <div className="relative -mr-6 mt-12 md:-mr-8 sm:mr-0">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pr-6 md:pr-8 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pr-0 md:grid-cols-3 lg:grid-cols-4">
            {jobs.map((job, index) => (
              <AnimateOnScroll
                key={job.id}
                className="min-w-[75vw] shrink-0 snap-start sm:min-w-0 sm:shrink"
                delay={index * 0.1}
              >
                <JobPostingCard job={job} />
              </AnimateOnScroll>
            ))}
          </div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l to-transparent sm:hidden" />
        </div>
      </div>
    </section>
  )
}
