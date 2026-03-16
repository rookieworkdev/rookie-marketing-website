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
            'relative flex min-h-[680px] flex-col pt-28 pb-16 md:pt-32 md:pb-20'
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
          {children ? (
            children
          ) : (
            <div
              className={cn(
                'mt-auto',
                showAvatarGraphic && 'lg:grid lg:grid-cols-2 lg:items-end lg:gap-12'
              )}
            >
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
                  <HeadingTag className="text-foreground text-4xl font-medium tracking-tighter text-balance md:text-5xl xl:text-6xl">
                    {title}
                  </HeadingTag>
                )}
                {description && (
                  <p className="text-muted-foreground mt-6 max-w-2xl text-lg">{description}</p>
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
