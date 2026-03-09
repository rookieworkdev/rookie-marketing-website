'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { SparklesIcon } from '@heroicons/react/20/solid'

const floatingAvatars = [
  {
    initials: 'LK',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    className: '-left-24 bottom-4',
  },
  {
    initials: 'SJ',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    className: '-left-40 top-[38%]',
  },
  {
    initials: 'KS',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    className: '-right-40 top-[38%]',
  },
  {
    initials: 'SB',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
    className: '-right-24 bottom-4',
  },
  {
    initials: 'AE',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    className: '-left-16 top-0',
  },
  {
    initials: 'MR',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    className: '-right-16 top-0',
  },
] as const

interface MatchScoreProps {
  score?: number
  className?: string
}

export function MatchScore({ score = 85, className }: MatchScoreProps) {
  const radius = 120
  const strokeWidth = 10
  const centerX = 150
  const centerY = 140
  const startAngle = 180 // left (9 o'clock)
  const endAngle = 360 // right (3 o'clock)
  const totalAngle = endAngle - startAngle // 180 degrees — clean half circle

  const toRad = (deg: number) => (deg * Math.PI) / 180

  const pointOnArc = (angleDeg: number) => ({
    x: centerX + radius * Math.cos(toRad(angleDeg)),
    y: centerY + radius * Math.sin(toRad(angleDeg)),
  })

  // Build the half-circle arc path (sweeps from left to right along the top)
  const arcStart = pointOnArc(startAngle)
  const arcEnd = pointOnArc(endAngle)
  const backgroundArc = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 0 1 ${arcEnd.x} ${arcEnd.y}`

  const arcLength = (totalAngle / 360) * 2 * Math.PI * radius

  const fillLength = (score / 100) * arcLength
  const dashOffset = arcLength - fillLength

  // Needle (tapered: wide at base, sharp at tip)
  const needleAngle = startAngle + (score / 100) * totalAngle
  const needleLength = radius - 14
  const needleBaseWidth = 6
  const perpAngle = needleAngle + 90
  const needleTip = {
    x: centerX + needleLength * Math.cos(toRad(needleAngle)),
    y: centerY + needleLength * Math.sin(toRad(needleAngle)),
  }
  const needleBaseLeft = {
    x: centerX + needleBaseWidth * Math.cos(toRad(perpAngle)),
    y: centerY + needleBaseWidth * Math.sin(toRad(perpAngle)),
  }
  const needleBaseRight = {
    x: centerX - needleBaseWidth * Math.cos(toRad(perpAngle)),
    y: centerY - needleBaseWidth * Math.sin(toRad(perpAngle)),
  }

  const getScoreLabel = (s: number) => {
    if (s >= 80) return 'Stark match'
    if (s >= 60) return 'Bra match'
    if (s >= 40) return 'Medel'
    return 'Svag match'
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative w-full max-w-xl">
        {/* Floating avatars */}
        {floatingAvatars.map((av) => (
          <div key={av.initials} className={cn('absolute z-0', av.className)}>
            <Avatar size="lg" className="border-background !size-16 border-2 shadow-lg">
              <AvatarImage src={av.image} alt={av.initials} />
              <AvatarFallback className="text-sm font-medium">{av.initials}</AvatarFallback>
            </Avatar>
          </div>
        ))}

        <svg viewBox="-10 -10 320 185" className="relative z-10 w-full overflow-visible">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="oklch(0.58 0.22 27)" />
              <stop offset="30%" stopColor="oklch(0.75 0.18 75)" />
              <stop offset="60%" stopColor="oklch(0.80 0.16 95)" />
              <stop offset="100%" stopColor="oklch(0.648 0.2 131.684)" />
            </linearGradient>

            <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background arc track */}
          <path
            d={backgroundArc}
            fill="none"
            className="stroke-border"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Filled arc */}
          <path
            d={backgroundArc}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
            filter="url(#arcGlow)"
          />

          {/* Score number — centered in the half circle */}
          <text
            x={centerX}
            y={centerY - 56}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground"
            style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.05em' }}
          >
            {score}
          </text>

          {/* Needle */}
          <g>
            <path
              d={`M ${needleBaseLeft.x},${needleBaseLeft.y} L ${needleTip.x},${needleTip.y} L ${needleBaseRight.x},${needleBaseRight.y} Z`}
              className="fill-foreground stroke-foreground"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="12"
              className="fill-foreground stroke-background"
              strokeWidth="3"
            />
            <circle cx={centerX} cy={centerY} r="4" className="fill-background" />
          </g>
        </svg>
      </div>

      {/* Score label badges below the gauge */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <span className="bg-background text-muted-foreground border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm">
          <SparklesIcon className="text-primary size-4" />
          Kandidatprofil
        </span>
        <span className="bg-background text-muted-foreground border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm">
          <SparklesIcon className="text-primary size-4" />
          Erfarenhetsnivå
        </span>
        <span className="bg-background text-muted-foreground border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm">
          <SparklesIcon className="text-primary size-4" />
          Löneförväntning
        </span>
      </div>
    </div>
  )
}
