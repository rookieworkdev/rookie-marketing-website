import { cn } from '@/lib/utils'

interface GlowingBorderProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function GlowingBorder({
  children,
  className,
  duration = 5,
}: GlowingBorderProps) {
  return (
    <div
      className={cn('relative inline-flex rounded-full p-[3px]', className)}
    >
      {/* Spinning conic gradient — the "beam" */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        aria-hidden
      >
        <div
          className="absolute inset-[-50%]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, transparent 60%, var(--color-primary) 78%, oklch(1 0 0 / 90%) 82%, var(--color-primary) 86%, transparent 100%)',
            animation: `glow-spin ${duration}s linear infinite`,
          }}
        />
      </div>

      {/* Glow effect — subtle blurred shadow behind the beam */}
      <div
        className="absolute inset-[-2px] overflow-hidden rounded-full opacity-50 blur-sm"
        aria-hidden
      >
        <div
          className="absolute inset-[-50%]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, transparent 60%, var(--color-primary) 78%, oklch(1 0 0 / 90%) 82%, var(--color-primary) 86%, transparent 100%)',
            animation: `glow-spin ${duration}s linear infinite`,
          }}
        />
      </div>

      {/* Content — sits on top with its own border intact */}
      <div className="relative rounded-full">{children}</div>
    </div>
  )
}
