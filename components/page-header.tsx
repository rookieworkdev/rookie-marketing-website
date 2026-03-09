'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { cn, horizontalPadding, whiteBorderWrapper } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title?: string
  description?: string
  imageSrc?: string
  buttonText?: string
  buttonHref?: string
  showButton?: boolean
  buttonOpenInNewTab?: boolean
  imageAlt?: string
  breadcrumbs?: BreadcrumbItem[]
  children?: React.ReactNode
  headingLevel?: 'h1' | 'h2' | 'p'
  videoDescription?: string
}

export function PageHeader({
  title,
  description,
  imageSrc = '/rookie-hero-video.mp4',
  buttonText,
  buttonHref,
  showButton = false,
  buttonOpenInNewTab = false,
  imageAlt = 'Header background',
  breadcrumbs,
  children,
  headingLevel = 'h1',
  videoDescription = 'Dekorativ bakgrundsvideo som visar professionell arbetsmiljö',
}: PageHeaderProps) {
  const HeadingTag = headingLevel === 'p' ? 'p' : headingLevel
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh]">
      {/* Full-bleed background image/video */}
      {imageSrc.endsWith('.mp4') ? (
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={videoDescription}
          aria-hidden="true"
        >
          <source src={imageSrc} type="video/mp4" />
          <track kind="descriptions" label="Beskrivning" srcLang="sv" />
        </video>
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="absolute inset-0 -z-20 object-cover"
          sizes="100vw"
          priority
        />
      )}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Border container wrapping entire section */}
      <div
        className={cn(
          'relative mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col justify-between md:min-h-[70vh]',
          whiteBorderWrapper()
        )}
      >
        {/* Breadcrumb at top */}
        <div className={`${horizontalPadding} pt-24`}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Breadcrumb>
                <BreadcrumbList className="text-white/80">
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="contents">
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href} className="text-white/80 hover:text-white">
                              {crumb.label}
                            </Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-white">{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="text-white/60" />
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          )}
        </div>

        {/* Title, description, and button group at bottom */}
        <div className={`${horizontalPadding} pb-12 md:pb-20`}>
          {children ? (
            children
          ) : (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              {title && (
                <HeadingTag className="text-4xl font-medium tracking-tight text-balance text-white md:text-5xl xl:text-6xl">
                  {title}
                </HeadingTag>
              )}
              {description && <p className="mt-6 max-w-2xl text-lg text-white/80">{description}</p>}

              {showButton && buttonText && buttonHref && (
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href={buttonHref} target={buttonOpenInNewTab ? '_blank' : undefined}>
                      <span className="text-nowrap">{buttonText}</span>
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
