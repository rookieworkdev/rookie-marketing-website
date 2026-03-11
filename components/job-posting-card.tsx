import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/20/solid'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { JobDisplay } from '@/lib/jobs'

interface JobPostingCardProps {
  job: JobDisplay
}

export function JobPostingCard({ job }: JobPostingCardProps) {
  const locationLabel = job.regionName || job.location

  return (
    <Link href={`/jobb/${job.id}`} className="group block">
      <Card className="hover:border-primary cursor-pointer transition-colors">
        <CardContent>
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="line-clamp-1 text-base font-semibold">{job.title}</h3>
              {job.companyName && (
                <p className="text-muted-foreground mt-0.5 text-sm">{job.companyName}</p>
              )}
              {job.salary && <p className="text-muted-foreground mt-1 text-sm">{job.salary}</p>}
            </div>

            <div className="flex items-center justify-between">
              {locationLabel ? (
                <Badge variant="outline">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  {locationLabel}
                </Badge>
              ) : (
                <div />
              )}
              <span className="text-primary text-sm font-medium group-hover:underline">Ansök</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
