'use client'

import { motion } from 'motion/react'

interface AnimateOnScrollProps {
  children: React.ReactNode
  delay?: number
  className?: string
  margin?: string
}

export function AnimateOnScroll({
  children,
  delay = 0,
  className,
  margin = '0px 0px 200px 0px',
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
