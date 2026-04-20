import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RookieOfMonth } from '@/lib/rookie-of-month'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { GraduationCap, User } from 'lucide-react'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'

interface RookieOfMonthSectionProps {
  rookie: RookieOfMonth | null
}

export default async function RookieOfMonthSection({ rookie }: RookieOfMonthSectionProps) {
  const t = await getTranslations('rookieOfMonth')
  const locale = await getLocale()

  if (!rookie) {
    return null
  }

  const fullName = `${rookie.firstName} ${rookie.lastName}`
  const studies = `${rookie.degree}, ${rookie.fieldOfStudy}`
  const currentMonth = new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date())

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Employee card - Left side */}
          <AnimateOnScroll
            margin="-100px"
            className="bg-muted flex flex-col justify-between rounded-xl p-6 shadow-xs md:p-8 dark:bg-gradient-to-br"
          >
            {/* Avatar, Name, and City grouped */}
            <div className="mb-8 flex flex-col items-center text-center">
              <Avatar className="mb-4 size-16 md:size-20">
                <AvatarImage src={rookie.avatarUrl} alt={fullName} />
                <AvatarFallback className="bg-foreground">
                  <User className="text-background size-8 md:size-10" strokeWidth={1.5} />
                </AvatarFallback>
              </Avatar>
              <h3 className="mb-3 text-2xl font-semibold md:text-3xl">{fullName}</h3>
              <Badge variant="default">{rookie.city}</Badge>
            </div>

            {/* Studies and School with icons */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="text-primary mt-0.5 size-5 shrink-0" />
                <div className="flex-1">
                  <dt className="text-muted-foreground mb-1 font-medium">{t('studies')}</dt>
                  <dd className="text-base">{studies}</dd>
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
          </AnimateOnScroll>

          {/* Text container - Right side */}
          <AnimateOnScroll delay={0.1} margin="-100px" className="flex flex-col">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              {t('titlePrefix')}{' '}
              <em className="bg-linear-to-br from-green-700 via-green-600 to-yellow-400 bg-clip-text text-transparent not-italic">
                {currentMonth}
              </em>
            </h2>
            <p className="text-muted-foreground mt-6">
              {t('description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="default">
                <Link href="https://app.rookiework.com/request-access">
                  {t('registerCompany')}
                </Link>
              </Button>
              <Button asChild size="default" variant="outline">
                <Link href="https://app.rookiework.com/signup">
                  {t('registerCandidate')}
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
