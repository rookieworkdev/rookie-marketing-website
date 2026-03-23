'use client'

import { FloatingAvatarsGraphic } from '@/components/floating-avatars-graphic'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { cn, containerBorders, horizontalPadding } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  eyebrow?: string
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  showButton?: boolean
  buttonOpenInNewTab?: boolean
  breadcrumbs?: BreadcrumbItem[]
  children?: React.ReactNode
  headingLevel?: 'h1' | 'h2' | 'p'
  showAvatarGraphic?: boolean
  avatarVariant?: 'companies' | 'candidates'
  image?: string
  imageAlt?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  buttonText,
  buttonHref,
  showButton = false,
  buttonOpenInNewTab = false,
  breadcrumbs,
  children,
  headingLevel = 'h1',
  showAvatarGraphic = false,
  avatarVariant = 'companies',
  image,
  imageAlt,
}: PageHeaderProps) {
  const HeadingTag = headingLevel === 'p' ? 'p' : headingLevel
  return (
    <section className="bg-background">
      <div className={cn(containerBorders(), 'relative overflow-hidden')}>
        {/* Flickering grid background */}
        <FlickeringGrid
          squareSize={3}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(0, 0, 0)"
          maxOpacity={0.15}
          className="absolute inset-0 dark:hidden"
        />
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(255, 255, 255)"
          maxOpacity={0.15}
          className="absolute inset-0 hidden dark:block"
        />
        {/* Gradient overlay: top-left to bottom-right */}
        <div className="from-background absolute inset-0 bg-gradient-to-br from-25% to-transparent" />

        <div
          className={cn(
            horizontalPadding,
            'relative flex min-h-[680px] flex-col pt-28 pb-16 md:pt-32'
          )}
        >
          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="contents">
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink asChild>
                            <Link href={crumb.href}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          )}

          {/* Content */}
          {children && image ? (
            <div className="mt-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="mb-8 lg:mb-0"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt={imageAlt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {children}
              </motion.div>
            </div>
          ) : children ? (
            children
          ) : (
            <div
              className={cn(
                'mt-auto',
                showAvatarGraphic && 'lg:grid lg:grid-cols-2 lg:items-end lg:gap-12',
                image && 'lg:grid lg:grid-cols-2 lg:items-end lg:gap-12'
              )}
            >
              {image && (
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="mb-8 lg:mb-0"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={image}
                      alt={imageAlt || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                {eyebrow && (
                  <span className="text-primary mb-6 flex items-center gap-1.5 text-base font-medium">
                    <Sparkles className="h-4 w-4" />
                    {eyebrow}
                  </span>
                )}
                {title && (
                  <HeadingTag className="text-foreground text-3xl font-medium tracking-tighter text-balance md:text-4xl xl:text-5xl">
                    {title}
                  </HeadingTag>
                )}
                {description && (
                  <p className="text-muted-foreground mt-6 max-w-2xl text-base">{description}</p>
                )}

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

              {showAvatarGraphic && (
                <div className="hidden lg:block">
                  <FloatingAvatarsGraphic className="h-[320px] xl:h-[380px]" variant={avatarVariant} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
