'use client'

import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { Check } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

interface AboutSectionProps {
  title?: string
  description?: string | string[]
  imageUrl?: string
  imageAlt?: string
  items?: string[]
  ctaText?: string
  ctaHref?: string
  reversed?: boolean
}

export default function AboutSection({
  title = 'Ung kraft och starka möjligheter',
  description = [
    'Rookie är dedikerade till att underlätta rekryteringsprocessen för både företag och unga jobbsökande genom att matcha rätt kompetens med rätt möjligheter. Vi förstår vikten av att anställa nyexaminerade och juniora profiler för att skapa en dynamisk och framåtriktad arbetsmiljö.',
    'Unga talanger är redo att ta sig an nya utmaningar och bidrar med nya perspektiv till teamet som kan vara avgörande för att främja innovation och kreativitet inom organisationen.',
    'Upptäck hur vi kan hjälpa dig att forma din framtid eller att hitta de bästa unga talangerna för ditt företag.',
  ],
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
  imageAlt = 'Unga talanger samarbetar',
  items,
  ctaText,
  ctaHref,
  reversed = false,
}: AboutSectionProps) {
  const descriptionArray = Array.isArray(description) ? description : [description]

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image container */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`bg-muted relative aspect-square w-full overflow-hidden rounded-2xl ${
              reversed ? 'lg:order-2' : ''
            }`}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>

          {/* Text container */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className={`flex flex-col ${reversed ? 'lg:order-1' : ''}`}
          >
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>

            {/* Description paragraphs */}
            {descriptionArray.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground mb-6">
                {paragraph}
              </p>
            ))}

            {/* Optional items list with checkmarks */}
            {items && items.length > 0 && (
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Optional CTA button */}
            {ctaText && ctaHref && (
              <div className={items && items.length > 0 ? 'mt-6' : 'mt-2'}>
                <Button asChild size="lg">
                  <Link href={ctaHref}>
                    <span className="text-nowrap">{ctaText}</span>
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
