import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import Link from 'next/link'
import { JobPostingCard } from './job-posting-card'
import type { JobDisplay } from '@/lib/jobs'

interface JobsSectionProps {
  jobs: JobDisplay[]
}

export default function JobsSection({ jobs }: JobsSectionProps) {
  if (!jobs || jobs.length === 0) return null

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer('bg-muted')}>
        <div className="text-center">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Senaste uppdragen</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Se ett urval av aktuella uppdrag som matchas med unga talanger.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link href="/jobb">Se alla uppdrag</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
