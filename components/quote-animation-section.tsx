'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { motion } from 'motion/react'

interface QuoteAnimationSectionProps {
  quote: string
  author: string
  authorTitle: string
  authorImage?: string
}

export default function QuoteAnimationSection({
  quote,
  author,
  authorTitle,
  authorImage,
}: QuoteAnimationSectionProps) {
  // Split the quote into words for word-by-word animation
  const words = quote.split(' ')

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3 }}
          className="mx-auto flex max-w-4xl flex-col gap-8"
        >
          {/* Quote text with word-by-word animation */}
          <blockquote className="text-2xl leading-[1.3] font-medium md:text-3xl lg:text-4xl">
            <span className="sr-only">&quot;</span>
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: index * 0.03, // Stagger each word
                }}
                className="inline-block"
              >
                {word}
                {index < words.length - 1 && '\u00A0'}
              </motion.span>
            ))}
            <span className="sr-only">&quot;</span>
          </blockquote>

          {/* Author information */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: words.length * 0.03 + 0.2, // Wait for all words to animate
            }}
            className="flex items-center gap-4"
          >
            <Avatar className="size-18">
              {authorImage ? (
                <AvatarImage src={authorImage} alt={author} />
              ) : (
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <cite className="text-lg font-medium not-italic md:text-xl">{author}</cite>
              <p className="text-muted-foreground text-sm md:text-base">{authorTitle}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
