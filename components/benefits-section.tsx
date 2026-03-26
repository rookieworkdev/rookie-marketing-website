import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { Battery, Laptop, Lightbulb, Rocket, Target, Users, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  users: Users,
  lightbulb: Lightbulb,
  laptop: Laptop,
  rocket: Rocket,
  battery: Battery,
}

interface Benefit {
  icon: string
  title: string
  description: string
}

interface BenefitsSectionProps {
  title: string
  description: string | string[]
  benefits: Benefit[]
  ctaText?: string
  ctaHref?: string
}

export default function BenefitsSection({
  title,
  description,
  benefits,
  ctaText,
  ctaHref,
}: BenefitsSectionProps) {
  const descriptionArray = Array.isArray(description) ? description : [description]

  return (
    <section className={sectionWrapper()}>
      <div className={sectionContainer()}>
        {/* Header */}
        <AnimateOnScroll className="max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
          <div className="mt-6 space-y-4">
            {descriptionArray.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Benefits grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon.toLowerCase()]
            if (!Icon) return null

            return (
              <AnimateOnScroll
                key={benefit.title}
                delay={index * 0.1}
                className="bg-muted flex flex-col gap-4 rounded-2xl p-6"
              >
                <div className="bg-background flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-primary h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{benefit.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{benefit.description}</p>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>

        {/* Optional CTA */}
        {ctaText && ctaHref && (
          <AnimateOnScroll delay={0.2} className="mt-12">
            <Button asChild size="lg">
              <Link href={ctaHref}>
                <span className="text-nowrap">{ctaText}</span>
              </Link>
            </Button>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  )
}
