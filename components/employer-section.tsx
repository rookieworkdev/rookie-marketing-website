'use client'

import { Button } from '@/components/ui/button'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    title: 'Unga talanger',
    description:
      'Med Rookie så får du fokus, vi rekryterar inte alla typer av kandidater utan vår laserfokus på unga innebär att du får de bästa inom just den kravprofilen.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Hitta rätt kollegor',
    description:
      'Vi har en tydligt segmenterad och kvalitétssäkrad talangpool som gör att vi lättare hittar helt rätt person för er organisation.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
  },
  {
    title: 'Snabbt och smidigt',
    description:
      'Med 20 års erfarenhet av rekrytering vet vi att snabbhet är avgörande. Med Rookie får du snabb start och en enkel process utan att tappa kvalité.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80',
  },
]

export default function EmployerSection() {
  return (
    <section className={sectionWrapper()}>
      <div className={sectionContainer('bg-muted')}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            Rookie som arbetsgivare
          </h2>
          <p className="text-muted-foreground mt-6">
            Rookie är specialiserade på unga talanger. Vi har ett starkt nätverk av kvalitetssäkrade
            nyexaminerade och juniora profiler. Oavsett om ditt företag är i behov av
            hyrrekrytering, konsult eller rekrytering av en framtida kollega så är vi partnern för
            dig.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px 200px 0px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="bg-background flex flex-col rounded-2xl p-2 shadow-xs"
            >
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="px-2 py-4">
                <h3 className="text-xl font-medium">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="mt-12"
        >
          <Button asChild size="lg">
            <Link href="/personal">
              <span className="text-nowrap">Hitta personal</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
