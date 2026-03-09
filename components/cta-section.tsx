'use client'

import { Button } from '@/components/ui/button'
import { horizontalPadding, sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import Link from 'next/link'

interface CTAItem {
  title: string
  description: string
  buttonText: string
  buttonHref?: string
  buttonVariant?: 'default' | 'secondary'
  buttonOpenInNewTab?: boolean
}

interface CTASectionProps {
  variant?: 'single' | 'double'
  content?: CTAItem | [CTAItem, CTAItem]
}

export default function CTASection({ variant = 'single', content }: CTASectionProps) {
  const defaultSingleContent: CTAItem = {
    title: 'Kan vi hjälpa dig?',
    description:
      'Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
    buttonText: 'Kontakta oss',
    buttonHref: '/kontakt',
  }

  const defaultDoubleContent: [CTAItem, CTAItem] = [
    {
      title: 'Kan vi hjälpa dig?',
      description:
        'Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
      buttonText: 'Kontakta oss',
      buttonHref: '/kontakt',
    },
    {
      title: 'Guide',
      description: 'Avgörande steg för en effektivare rekryterings process av unga talanger',
      buttonText: 'Få tillgång',
      buttonHref: '/kontakt',
      buttonVariant: 'secondary',
    },
  ]

  const singleContent = content && !Array.isArray(content) ? content : defaultSingleContent
  const doubleContent = content && Array.isArray(content) ? content : defaultDoubleContent

  if (variant === 'double') {
    return (
      <section className={sectionWrapper('bg-background')}>
        <div className={sectionContainer()}>
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* First CTA Container */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex-1 overflow-hidden rounded-2xl p-6 shadow-xs md:p-8 lg:p-10"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)',
                }}
              />
              {/* Gradient overlay - solid top-left to transparent bottom-right */}
              <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/50 to-black/0" />

              {/* Content */}
              <div className="relative flex flex-col justify-between gap-8 md:min-h-[200px]">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
                    {doubleContent[0].title}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg text-white/80">
                    {doubleContent[0].description}
                  </p>
                </div>
                <div className="self-start">
                  <Button asChild size="lg" variant={doubleContent[0].buttonVariant || 'default'}>
                    <Link href={doubleContent[0].buttonHref || '/kontakt'} target={doubleContent[0].buttonOpenInNewTab ? '_blank' : undefined}>
                      <span className="text-nowrap">{doubleContent[0].buttonText}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Second CTA Container */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="bg-muted relative flex-1 overflow-hidden rounded-2xl p-6 shadow-xs md:p-8 lg:p-10"
            >
              {/* Content */}
              <div className="relative flex flex-col justify-between gap-8 md:min-h-[200px]">
                <div className="max-w-2xl">
                  <h2 className="text-foreground text-3xl font-medium tracking-tight md:text-3xl lg:text-4xl">
                    {doubleContent[1].title}
                  </h2>
                  <p className="text-foreground/80 mt-4 max-w-xl text-lg">
                    {doubleContent[1].description}
                  </p>
                </div>
                <div className="self-start">
                  <Button asChild size="lg" variant={doubleContent[1].buttonVariant || 'default'}>
                    <Link href={doubleContent[1].buttonHref || '/kontakt'} target={doubleContent[1].buttonOpenInNewTab ? '_blank' : undefined}>
                      <span className="text-nowrap">{doubleContent[1].buttonText}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  // Single variant (default)
  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer(undefined, 'no-padding')}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative overflow-hidden shadow-xs"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)',
            }}
          />
          {/* Gradient overlay - solid top-left to transparent bottom-right */}
          <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/50 to-black/0" />

          {/* Content */}
          <div
            className={`relative flex flex-col justify-between gap-8 ${horizontalPadding} py-20 md:min-h-[200px]`}
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl font-medium tracking-tight text-white md:text-3xl lg:text-4xl">
                {singleContent.title}
              </h2>
              <p className="mt-4 max-w-xl text-lg text-pretty text-white/80">
                {singleContent.description}
              </p>
            </div>
            <div className="self-start">
              <Button asChild size="lg" variant={singleContent.buttonVariant || 'default'}>
                <Link href={singleContent.buttonHref || '/kontakt'} target={singleContent.buttonOpenInNewTab ? '_blank' : undefined}>
                  <span className="text-nowrap">{singleContent.buttonText}</span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
