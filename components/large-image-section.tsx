'use client'

import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'

interface LargeImageSectionProps {
  imageUrl?: string
  imageAlt?: string
  title: string
  description: string | string[]
}

export default function LargeImageSection({
  imageUrl = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&auto=format&fit=crop&q=80',
  imageAlt = 'Teamwork',
  title,
  description,
}: LargeImageSectionProps) {
  const descriptionArray = Array.isArray(description) ? description : [description]

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        {/* Two columns below: title and text */}
        <div className="mb-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Title column */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">{title}</h2>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px 200px 0px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {descriptionArray.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
        {/* Full-width image on bottom */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px 200px 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-muted relative aspect-video w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
