import { cn, containerBorders, horizontalPadding } from '@/lib/utils'

export default function Loading() {
  return (
    <div className="bg-background animate-pulse">
      <div className={cn(containerBorders(), horizontalPadding, 'py-16')}>
        <div className="bg-muted h-8 w-48 rounded" />
        <div className="bg-muted mt-4 h-5 w-96 rounded" />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="bg-muted aspect-video rounded-xl" />
              <div className="bg-muted mt-4 h-6 w-3/4 rounded" />
              <div className="bg-muted mt-2 h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
