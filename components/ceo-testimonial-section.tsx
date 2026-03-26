import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import Image from 'next/image'

interface CeoTestimonialSectionProps {
  quote: string
  authorName: string
  authorTitle: string
  authorImage: string
}

export default function CeoTestimonialSection({
  quote,
  authorName,
  authorTitle,
  authorImage,
}: CeoTestimonialSectionProps) {
  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <AnimateOnScroll className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr]">
          {/* Author image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <Image
              src={authorImage}
              alt={authorName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Quote card */}
          <div className="bg-foreground flex flex-col justify-between rounded-2xl p-6 md:p-8 lg:p-10">
            <blockquote className="text-background text-xl font-medium md:text-2xl lg:text-3xl">
              &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Author info */}
            <p className="text-background/70 text-sm font-medium md:text-base">
              {authorName} &ndash; {authorTitle}
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
