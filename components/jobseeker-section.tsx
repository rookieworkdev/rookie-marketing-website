'use client'

import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { carouselItems } from '@/lib/career-carousel-data'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function JobseekerSection() {
  const t = useTranslations('jobseeker')
  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        {/* Header with text and CTA */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-6">
              {t('description')}
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="shrink-0">
            <Link href="https://rookie-se.intelliplan.net/jobb/9/ansok" target="_blank">
              <span className="text-nowrap">{t('findJobs')}</span>
            </Link>
          </Button>
        </motion.div>
        {/* Full-width carousel */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative mt-12"
        >
          <InfiniteSlider speed={50} gap={24} className="mx-[-32px]">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square w-72 shrink-0 overflow-hidden rounded-2xl"
              >
                {item.type === 'image' ? (
                  <>
                    <Image
                      src={item.image}
                      alt={item.label || ''}
                      fill
                      className="object-cover"
                      sizes="288px"
                      loading="lazy"
                    />
                    {item.label && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-background/90 rounded-full px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`flex h-full w-full flex-col justify-end p-6 ${item.color}`}>
                    <span className="text-5xl font-bold tracking-tight text-white">
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </InfiniteSlider>
          {/* Fade overlays for edges */}
          <div className="from-background/80 via-background/40 via-background/10 pointer-events-none absolute inset-y-0 left-0 mx-[-32px] w-24 bg-gradient-to-r to-transparent" />
          <div className="from-background/80 via-background/40 via-background/10 pointer-events-none absolute inset-y-0 right-0 mx-[-32px] w-24 bg-gradient-to-l to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
