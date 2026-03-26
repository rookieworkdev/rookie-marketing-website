import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

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

export default async function AboutSection({
  title,
  description,
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
  imageAlt,
  items,
  ctaText,
  ctaHref,
  reversed = false,
}: AboutSectionProps) {
  const t = await getTranslations('about')
  const effectiveTitle = title || t('defaultTitle')
  const effectiveDescription = description || [t('defaultDescription1'), t('defaultDescription2'), t('defaultDescription3')]
  const effectiveImageAlt = imageAlt || t('defaultImageAlt')
  const descriptionArray = Array.isArray(effectiveDescription) ? effectiveDescription : [effectiveDescription]

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image container */}
          <AnimateOnScroll
            className={`bg-muted relative aspect-square w-full overflow-hidden rounded-2xl ${
              reversed ? 'lg:order-2' : ''
            }`}
          >
            <Image
              src={imageUrl}
              alt={effectiveImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </AnimateOnScroll>

          {/* Text container */}
          <AnimateOnScroll
            delay={0.1}
            className={`flex flex-col ${reversed ? 'lg:order-1' : ''}`}
          >
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              {effectiveTitle}
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
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
