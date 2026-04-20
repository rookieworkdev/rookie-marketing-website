import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { carouselItems } from '@/lib/career-carousel-data'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export default async function JobseekerSection() {
  const t = await getTranslations('jobseeker')
  const tCategories = await getTranslations('careerCategories')
  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <AnimateOnScroll className="max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground mt-6">{t('description')}</p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={0.2} className="relative mt-12">
          <InfiniteSlider speed={35} gap={24} className="mx-[-32px]">
            {carouselItems.map((item) => (
              <div
                key={item.key}
                className="relative aspect-square w-72 shrink-0 overflow-hidden rounded-2xl"
              >
                <div className={`flex h-full w-full flex-col justify-end p-6 ${item.color}`}>
                  <span className="bg-linear-to-br from-green-700 via-green-600 to-yellow-400 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                    {tCategories(item.key)}
                  </span>
                </div>
              </div>
            ))}
          </InfiniteSlider>
          <div className="from-background/80 via-background/40 via-background/10 pointer-events-none absolute inset-y-0 left-0 mx-[-32px] w-24 bg-gradient-to-r to-transparent" />
          <div className="from-background/80 via-background/40 via-background/10 pointer-events-none absolute inset-y-0 right-0 mx-[-32px] w-24 bg-gradient-to-l to-transparent" />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
