import { cn, containerBorders, horizontalPadding } from '@/lib/utils'

export default function Loading() {
  return (
    <div className="bg-background animate-pulse">
      <div className={cn(containerBorders(), horizontalPadding, 'py-16')}>
        <div className="bg-muted h-4 w-32 rounded" />
        <div className="bg-muted mt-8 h-10 w-2/3 rounded" />
        <div className="bg-muted mt-6 h-4 w-48 rounded" />
        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-muted h-4 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
