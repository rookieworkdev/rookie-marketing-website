'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

interface TestimonialProps {
  quote: string
  authorName: string
  authorTitle: string
  authorImage: string
  companyLogo?: ReactNode
  companyName?: string
  smallTitle?: boolean
}

export default function TestimonialSection({
  quote,
  authorName,
  authorTitle,
  authorImage,
  companyLogo,
  companyName,
  smallTitle,
}: TestimonialProps) {
  const t = useTranslations('testimonial')
  return (
    <section className={sectionWrapper()}>
      <div className={sectionContainer()}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h2
            className={
              smallTitle
                ? 'text-3xl font-medium tracking-tight md:text-4xl'
                : 'text-3xl font-medium tracking-tight md:text-4xl'
            }
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className={cn('bg-muted dark:bg-card mt-12 rounded-2xl p-8 shadow-xs md:p-12')}
        >
          {/* Company logo — hidden */}

          {/* Quote */}
          <blockquote className="text-xl font-medium md:text-2xl lg:text-3xl">
            &ldquo;{quote}&rdquo;
          </blockquote>

          {/* Author info */}
          <div className="mt-8 flex items-center gap-4">
            <Avatar className="size-12">
              <AvatarImage src={authorImage} alt={authorName} />
              <AvatarFallback>
                {authorName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{authorName}</div>
              <div className="text-muted-foreground text-sm">{authorTitle}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
