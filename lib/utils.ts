import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Section utility classes for consistent borders and padding
export const horizontalPadding = 'px-6 md:px-8'

// Border utilities for consistent styling
export const whiteBorderOpacity = 'border-white/10'
export const defaultBorderOpacity = 'border-border'
export const mutedBorderOpacity = 'border-border/50'

// Border side combinations
export const topBorder = (borderColor: string = defaultBorderOpacity) => cn(borderColor, 'border-t')

export const sideBorders = (borderColor: string = defaultBorderOpacity) =>
  cn(borderColor, 'border-r border-l')

export const fullBorders = (borderColor: string = defaultBorderOpacity) => cn(borderColor, 'border')

// Section wrappers
export const sectionWrapper = (background?: string) => cn(topBorder(), background)

export const whiteBorderWrapper = (borderSides: string = 'border-r border-l') =>
  cn(whiteBorderOpacity, borderSides)

export const containerBorders = (borderColor: string = defaultBorderOpacity) =>
  cn('mx-auto max-w-7xl', sideBorders(borderColor))

export const sectionContainer = (
  background?: string,
  variant: 'default' | 'no-padding' = 'default'
) => {
  const baseClasses = cn(containerBorders(), background)
  const paddingClasses = variant === 'no-padding' ? '' : `${horizontalPadding} py-20`

  return cn(baseClasses, paddingClasses)
}
