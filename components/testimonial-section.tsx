import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { sectionContainer, sectionWrapper } from '@/lib/utils'

interface TestimonialProps {
  quote: string
  role: string
  company: string
  authorName?: string
  authorTitle?: string
  authorImage?: string
  smallTitle?: boolean
}

export default function TestimonialSection({ quote, role, company }: TestimonialProps) {
  return (
    <section className={sectionWrapper()}>
      <div className={sectionContainer()}>
        <AnimateOnScroll margin="-100px" className="mx-auto max-w-5xl text-center">
          <div className="flex justify-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="size-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="mt-8 text-xl font-medium md:text-2xl lg:text-3xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="mt-8">
            <div className="font-medium">{role}</div>
            <div className="text-muted-foreground mt-1 text-sm">{company}</div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
