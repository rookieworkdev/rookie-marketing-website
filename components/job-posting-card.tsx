'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { JobDisplay } from '@/lib/jobs'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface JobPostingCardProps {
  job: JobDisplay
}

export function JobPostingCard({ job }: JobPostingCardProps) {
  const t = useTranslations('jobCard')
  const locationLabel = job.regionName || job.location

  return (
    <Link href="https://app.rookiework.com/login" className="group block">
      <Card className="border-border hover:border-primary cursor-pointer border transition-colors">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="line-clamp-1 text-base font-medium">{job.title}</h3>
              {job.companyName && (
                <p className="text-muted-foreground text-sm">{job.companyName}</p>
              )}
              {job.serviceType && (
                <p className="text-muted-foreground text-sm">
                  {job.serviceType.charAt(0).toUpperCase() + job.serviceType.slice(1)}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              {locationLabel ? <Badge variant="outline">{locationLabel}</Badge> : <div />}
              <span className="text-primary text-sm font-medium group-hover:underline">
                {t('apply')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
