'use client'

import { JobCard } from '@/components/job-card'
import { Job } from '@/lib/jobs'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'

interface JobsGridSectionProps {
  jobs: Job[]
}

export default function JobsGridSection({ jobs }: JobsGridSectionProps) {
  return (
    <section className={sectionWrapper()}>
      <div className={sectionContainer('bg-muted')}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 flex flex-col items-start text-left"
        >
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Lediga <em className="text-primary not-italic">tjänster</em>
          </h2>
        </motion.div>

        {/* Grid of jobs */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
