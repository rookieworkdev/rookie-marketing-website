'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GlowingBorder } from '@/components/ui/glowing-border'
import { cn } from '@/lib/utils'
import { SparklesIcon } from '@heroicons/react/20/solid'
import { animate as animateValue, motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef } from 'react'

const DIGIT_HEIGHT = 52

const digitMask = {
  maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
} as const

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
    className: '-left-36 top-[36%]',
  },
  {
    initials: 'KS',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    className: '-right-36 top-[36%]',
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
  const t = useTranslations('matchScore')
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -100px 0px' })

  const radius = 120
  const strokeWidth = 10
  const centerX = 150
  const centerY = 140
  const startAngle = 168 // slightly past 9 o'clock — dips below center
  const endAngle = 372 // slightly past 3 o'clock — dips below center
  const totalAngle = endAngle - startAngle // 204 degrees — more than a half circle

  const toRad = (deg: number) => (deg * Math.PI) / 180

  const round = (n: number) => Math.round(n * 1000) / 1000

  const pointOnArc = (angleDeg: number) => ({
    x: round(centerX + radius * Math.cos(toRad(angleDeg))),
    y: round(centerY + radius * Math.sin(toRad(angleDeg))),
  })

  // Build the arc path (sweeps from left to right through the top)
  const arcStart = pointOnArc(startAngle)
  const arcEnd = pointOnArc(endAngle)
  const largeArcFlag = totalAngle > 180 ? 1 : 0
  const backgroundArc = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEnd.x} ${arcEnd.y}`

  const arcLength = (totalAngle / 360) * 2 * Math.PI * radius

  const fillLength = (score / 100) * arcLength
  const dashOffset = arcLength - fillLength

  // Needle (tapered: wide at base, sharp at tip) — drawn at start position
  const needleLength = radius - 14
  const needleBaseWidth = 6
  const perpAngle = startAngle + 90
  const needleTip = {
    x: round(centerX + needleLength * Math.cos(toRad(startAngle))),
    y: round(centerY + needleLength * Math.sin(toRad(startAngle))),
  }
  const needleBaseLeft = {
    x: round(centerX + needleBaseWidth * Math.cos(toRad(perpAngle))),
    y: round(centerY + needleBaseWidth * Math.sin(toRad(perpAngle))),
  }
  const needleBaseRight = {
    x: round(centerX - needleBaseWidth * Math.cos(toRad(perpAngle))),
    y: round(centerY - needleBaseWidth * Math.sin(toRad(perpAngle))),
  }

  const animDuration = 1.2
  const needleRotation = (score / 100) * totalAngle
  const arcEase = [0.33, 1, 0.68, 1] as const

  // Animate needle using SVG-native rotate(angle, cx, cy) — no CSS transform-origin issues
  const needleRef = useRef<SVGGElement>(null)
  useEffect(() => {
    if (!isInView || !needleRef.current) return
    const controls = animateValue(0, needleRotation, {
      duration: animDuration,
      ease: arcEase as unknown as [number, number, number, number],
      onUpdate: (angle) => {
        needleRef.current?.setAttribute(
          'transform',
          `rotate(${angle}, ${centerX}, ${centerY})`
        )
      },
    })
    return () => controls.stop()
  }, [isInView, needleRotation])

  // Digit strips — each column only contains 0 → final digit value
  const tensDigit = Math.floor(score / 10)
  const onesDigit = score % 10
  const tensStrip = useMemo(() => Array.from({ length: tensDigit + 1 }, (_, i) => i), [tensDigit])
  const onesStrip = useMemo(() => Array.from({ length: onesDigit + 1 }, (_, i) => i), [onesDigit])

  const matchLabel =
    score >= 80 ? t('strongMatch') : score >= 60 ? t('goodMatch') : score >= 40 ? t('medium') : t('weak')

  return (
    <div ref={containerRef} className={cn('flex flex-col items-center', className)}>
      <div className="relative w-full max-w-2xl">
        {/* Floating avatars — staggered scale + blur/fade */}
        {floatingAvatars.map((av, i) => (
          <motion.div
            key={av.initials}
            className={cn('absolute z-0', av.className)}
            initial={{ scale: 0, opacity: 0, filter: 'blur(4px)' }}
            animate={isInView ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
          >
            <GlowingBorder duration={4.5 + i * 0.5} colorVariant={i % 2 === 0 ? 'green' : 'yellow'}>
              <Avatar size="lg" className="border-background !size-16 border-2 shadow-lg">
                <AvatarImage src={av.image} alt={av.initials} />
                <AvatarFallback className="text-sm font-medium">{av.initials}</AvatarFallback>
              </Avatar>
            </GlowingBorder>
          </motion.div>
        ))}

        <svg viewBox="-10 -10 320 200" className="relative z-10 w-full overflow-visible">
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

          {/* Filled arc — sweeps left to right */}
          <motion.path
            d={backgroundArc}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            filter="url(#arcGlow)"
            initial={{ strokeDashoffset: arcLength }}
            animate={isInView ? { strokeDashoffset: dashOffset } : undefined}
            transition={{ duration: animDuration, ease: arcEase }}
          />

          {/* Score number — rolling odometer digits */}
          <foreignObject
            x={centerX - 60}
            y={centerY - 86}
            width={120}
            height={60}
            style={{ overflow: 'visible' }}
          >
            <motion.div
              className="text-foreground flex h-full items-center justify-center"
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : undefined}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Tens digit */}
              <div className="relative h-[52px] w-[30px] overflow-hidden" style={digitMask}>
                <motion.div
                  initial={{ y: 0 }}
                  animate={isInView ? { y: -tensDigit * DIGIT_HEIGHT } : undefined}
                  transition={{ duration: animDuration, ease: arcEase }}
                >
                  {tensStrip.map((d, i) => (
                    <div
                      key={i}
                      className="flex h-[52px] w-[30px] items-center justify-center text-5xl font-bold"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      {d}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Ones digit — slight stagger, balanced speed */}
              <div className="relative h-[52px] w-[30px] overflow-hidden" style={digitMask}>
                <motion.div
                  initial={{ y: 0 }}
                  animate={isInView ? { y: -onesDigit * DIGIT_HEIGHT } : undefined}
                  transition={{
                    duration: animDuration * 0.85,
                    ease: arcEase,
                    delay: animDuration * 0.12,
                  }}
                >
                  {onesStrip.map((d, i) => (
                    <div
                      key={i}
                      className="flex h-[52px] w-[30px] items-center justify-center text-5xl font-bold"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      {d}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </foreignObject>

          {/* Needle — rotates from start to final position via SVG rotate(angle, cx, cy) */}
          <g ref={needleRef}>
            <path
              d={`M ${needleBaseLeft.x},${needleBaseLeft.y} L ${needleTip.x},${needleTip.y} L ${needleBaseRight.x},${needleBaseRight.y} Z`}
              className="fill-foreground stroke-foreground"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          {/* Center hub — fixed, not rotating */}
          <circle
            cx={centerX}
            cy={centerY}
            r="12"
            className="fill-foreground stroke-background"
            strokeWidth="3"
          />
          <circle cx={centerX} cy={centerY} r="4" className="fill-background" />

          {/* Bottom score bar — connects to arc endpoints */}
          <foreignObject
            x={arcStart.x - 20}
            y={arcStart.y - 3}
            width={arcEnd.x - arcStart.x + 40}
            height={26}
          >
            <motion.div
              className="bg-card border-border flex h-full items-center justify-center gap-1 overflow-hidden rounded-sm border shadow-xs"
              initial={{ opacity: 0, y: -4 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: animDuration * 0.5 }}
            >
              <SparklesIcon className="text-primary size-[11px] shrink-0" />
              <span className="text-muted-foreground text-[10px] font-semibold">
                {t('aiScore')}
              </span>
              <span className="text-primary text-[10px] font-semibold">{score}/100</span>
            </motion.div>
          </foreignObject>
        </svg>
      </div>
    </div>
  )
}
