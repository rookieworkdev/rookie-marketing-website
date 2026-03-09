'use client'

import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { Battery, Laptop, Lightbulb, Rocket, Target, Users, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
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
      <div className={sectionContainer('bg-muted')}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">{title}</h2>
          <div className="mt-6 space-y-4">
            {descriptionArray.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Benefits grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon.toLowerCase()]
            if (!Icon) return null

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                className="bg-background flex flex-col gap-4 rounded-2xl p-6 shadow-xs"
              >
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-primary h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{benefit.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Optional CTA */}
        {ctaText && ctaHref && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            className="mt-12"
          >
            <Button asChild size="lg">
              <Link href={ctaHref}>
                <span className="text-nowrap">{ctaText}</span>
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
