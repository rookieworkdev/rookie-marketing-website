'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Job } from '@/lib/jobs'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'

interface JobCardProps {
  job: Job
  index?: number
  disableAnimation?: boolean
}

export function JobCard({ job, index = 0, disableAnimation = false }: JobCardProps) {
  const content = (
    <Link
      href={job.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="bg-background h-full shadow-xs ring-0 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-start justify-between gap-2 text-xl">
            <span>{job.title}</span>
            <ArrowUpRight className="text-muted-foreground size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </CardTitle>
          <CardDescription className="line-clamp-3 text-base">{job.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="gap-1">
              <MapPin className="size-3" />
              {job.location}
            </Badge>
            <Badge variant="secondary">{job.category}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  if (disableAnimation) {
    return <div>{content}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
    >
      {content}
    </motion.div>
  )
}
