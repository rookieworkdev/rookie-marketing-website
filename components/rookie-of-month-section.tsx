'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PreviousRookie } from '@/lib/previous-rookies'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { GraduationCap, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

interface RookieOfMonthSectionProps {
  rookie: PreviousRookie | null
}

export default function RookieOfMonthSection({ rookie }: RookieOfMonthSectionProps) {
  const t = useTranslations('rookieOfMonth')
  if (!rookie) {
    return null
  }

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Employee card - Left side */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-muted flex flex-col justify-between rounded-xl p-6 shadow-xs md:p-8 dark:bg-gradient-to-br"
          >
            {/* Avatar, Name, and City grouped */}
            <div className="mb-8 flex flex-col items-center text-center">
              <Avatar className="mb-4 size-16 md:size-20">
                <AvatarImage src={rookie.imageSrc} alt={rookie.name} />
                <AvatarFallback className="bg-linear-to-br from-green-700 via-green-600 to-yellow-400">
                  <User className="size-8 text-white md:size-10" strokeWidth={1.5} />
                </AvatarFallback>
              </Avatar>
              <h3 className="mb-3 text-2xl font-semibold md:text-3xl">{rookie.name}</h3>
              <Badge variant="default">{rookie.city}</Badge>
            </div>

            {/* Studies and School with icons */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="text-primary mt-0.5 size-5 shrink-0" />
                <div className="flex-1">
                  <dt className="text-muted-foreground mb-1 font-medium">{t('studies')}</dt>
                  <dd className="text-base">{rookie.studies}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="text-primary mt-0.5 size-5 shrink-0" />
                <div className="flex-1">
                  <dt className="text-muted-foreground mb-1 font-medium">{t('school')}</dt>
                  <dd className="text-base">{rookie.school}</dd>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text container - Right side */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="flex flex-col"
          >
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              {/* Månadens rookie för <em className="text-primary not-italic">{rookie.month}</em> */}
              {t('titlePrefix')}{' '}
              <em className="bg-linear-to-br from-green-700 via-green-600 to-yellow-400 bg-clip-text text-transparent not-italic">
                {rookie.month}
              </em>
            </h2>
            <p className="text-muted-foreground mt-6">
              {t('description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
