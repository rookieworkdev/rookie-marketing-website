import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        'bg-linear-to-r from-green-700 to-yellow-400 bg-clip-text pr-1 text-2xl font-black tracking-wide text-transparent italic',
        className
      )}
    >
      ROOKIE
    </span>
  )
}
