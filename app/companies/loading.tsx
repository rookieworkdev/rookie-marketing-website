import { cn, containerBorders, horizontalPadding } from '@/lib/utils'

export default function Loading() {
  return (
    <div className="bg-background animate-pulse">
      <div className={cn(containerBorders(), horizontalPadding, 'py-16')}>
        <div className="bg-muted h-4 w-32 rounded" />
        <div className="bg-muted mt-8 h-10 w-2/3 rounded" />
        <div className="bg-muted mt-4 h-5 w-96 rounded" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
