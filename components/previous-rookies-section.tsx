'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PreviousRookie } from '@/lib/previous-rookies'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { GraduationCap } from 'lucide-react'
import { motion } from 'motion/react'

interface PreviousRookiesSectionProps {
  rookies: PreviousRookie[]
}

export default function PreviousRookiesSection({ rookies }: PreviousRookiesSectionProps) {
  return (
    <section id="utmarkelser" className={sectionWrapper()}>
      <div className={sectionContainer('bg-muted')}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12 flex flex-col items-start text-left"
        >
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Tidigare utmärkelser
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-pretty">
            Här är några av de tidigare rookies som har blivit månadens mest lovande talang
          </p>
        </motion.div>

        {/* Grid of previous rookies */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rookies.map((rookie, index) => (
            <motion.div
              key={rookie.id}
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="bg-background flex aspect-4/3 flex-col justify-between rounded-xl p-6 shadow-xs"
            >
              {/* Avatar, Name, and City grouped */}
              <div className="mb-6 flex flex-col items-center text-center">
                <Avatar className="mb-4 size-24">
                  <AvatarImage src={rookie.imageSrc} alt={rookie.name} />
                  <AvatarFallback className="text-2xl">
                    {rookie.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mb-2 text-xl font-semibold">{rookie.name}</h3>
                <Badge variant="default">{rookie.city}</Badge>
              </div>

              {/* Studies and School with icons */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="flex-1">
                    <dt className="text-muted-foreground mb-1 text-sm font-medium">Studier</dt>
                    <dd className="text-sm">{rookie.studies}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="flex-1">
                    <dt className="text-muted-foreground mb-1 text-sm font-medium">Skola</dt>
                    <dd className="text-sm">{rookie.school}</dd>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
