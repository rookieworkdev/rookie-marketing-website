import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { PreviousRookie } from '@/lib/previous-rookies'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { GraduationCap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface PreviousRookiesSectionProps {
  rookies: PreviousRookie[]
}

export default async function PreviousRookiesSection({ rookies }: PreviousRookiesSectionProps) {
  const t = await getTranslations('previousRookies')
  return (
    <section id="utmarkelser" className={sectionWrapper()}>
      <div className={sectionContainer('bg-muted')}>
        {/* Section header */}
        <AnimateOnScroll margin="-100px" className="mb-12 flex flex-col items-start text-left">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-pretty">
            {t('description')}
          </p>
        </AnimateOnScroll>

        {/* Grid of previous rookies */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rookies.map((rookie, index) => (
            <AnimateOnScroll
              key={rookie.id}
              delay={index * 0.1}
              margin="-100px"
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
                    <dt className="text-muted-foreground mb-1 text-sm font-medium">{t('studies')}</dt>
                    <dd className="text-sm">{rookie.studies}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="flex-1">
                    <dt className="text-muted-foreground mb-1 text-sm font-medium">{t('school')}</dt>
                    <dd className="text-sm">{rookie.school}</dd>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
