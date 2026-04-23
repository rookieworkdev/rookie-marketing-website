import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        'bg-linear-[128deg] from-[#599200] from-20% to-[#D4D702] to-80% bg-clip-text pr-1 text-2xl font-black tracking-wide text-transparent italic',
        className
      )}
    >
      ROOKIE
    </span>
  )
}
