'use client'

import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
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
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Senaste uppdragen</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-base">
              Se ett urval av aktuella uppdrag som matchas med unga talanger.
            </p>
          </div>
          <Button asChild>
            <Link href="/jobb">Se alla uppdrag</Link>
          </Button>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px 200px 0px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
            >
              <JobPostingCard job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
