'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GlowingBorder } from '@/components/ui/glowing-border'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

type AvatarVariant = 'companies' | 'candidates'

const avatarImages = [
  {
    initials: 'LK',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'KS',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'SB',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'MR',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'JD',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'TH',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'RP',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face',
  },
  {
    initials: 'AE',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
]

const layouts: Record<AvatarVariant, { size: 'sm' | 'md' | 'lg'; style: React.CSSProperties }[]> = {
  companies: [
    { size: 'lg', style: { top: '0%', left: '20%' } },
    { size: 'sm', style: { top: '6%', left: '58%' } },
    { size: 'md', style: { top: '2%', right: '4%' } },
    { size: 'sm', style: { top: '36%', left: '14%' } },
    { size: 'lg', style: { top: '32%', right: '12%' } },
    { size: 'md', style: { top: '60%', left: '28%' } },
    { size: 'sm', style: { top: '72%', right: '6%' } },
    { size: 'md', style: { top: '88%', left: '50%' } },
  ],
  candidates: [
    { size: 'md', style: { top: '0%', right: '4%' } },
    { size: 'lg', style: { top: '6%', left: '24%' } },
    { size: 'sm', style: { top: '4%', left: '58%' } },
    { size: 'lg', style: { top: '30%', left: '14%' } },
    { size: 'sm', style: { top: '40%', right: '0%' } },
    { size: 'sm', style: { top: '64%', left: '30%' } },
    { size: 'md', style: { top: '76%', right: '4%' } },
    { size: 'lg', style: { top: '46%', left: '54%' } },
  ],
}

function getAvatars(variant: AvatarVariant) {
  const layout = layouts[variant]
  return avatarImages.map((img, i) => ({ ...img, ...layout[i] }))
}

const glowPattern: ('green' | 'yellow')[] = [
  'green', 'yellow', 'yellow', 'green', 'yellow', 'green', 'green', 'yellow',
]

const sizeClasses = {
  sm: '!size-10',
  md: '!size-14',
  lg: '!size-18',
}

export function FloatingAvatarsGraphic({
  className,
  variant = 'companies',
}: {
  className?: string
  variant?: AvatarVariant
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const avatars = getAvatars(variant)

  return (
    <div ref={ref} className={cn('relative h-full w-full', className)}>
      {avatars.map((av, i) => (
        <motion.div
          key={av.initials}
          className="absolute"
          style={av.style}
          initial={{ scale: 0, opacity: 0, filter: 'blur(6px)' }}
          animate={isInView ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : undefined}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: 0.1 + i * 0.07,
          }}
        >
          <GlowingBorder duration={4.5 + i * 0.4} colorVariant={glowPattern[i]}>
            <Avatar
              size="lg"
              className={cn('border-background border-2 shadow-lg', sizeClasses[av.size])}
            >
              <AvatarImage src={av.image} alt={av.initials} />
              <AvatarFallback className="text-sm font-medium">{av.initials}</AvatarFallback>
            </Avatar>
          </GlowingBorder>
        </motion.div>
      ))}
    </div>
  )
}
