'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

interface InspirationCardProps {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  category: string
  index?: number
}

export function InspirationCard({
  slug,
  title,
  description,
  date,
  author,
  image,
  category,
  index = 0,
}: InspirationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px 200px 0px' }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
    >
      <Link href={`/inspiration/${slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="pt-4">
          <h3 className="group-hover:text-primary line-clamp-2 text-xl font-semibold transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-3 text-base">{description}</p>
        </div>
      </Link>
    </motion.div>
  )
}
