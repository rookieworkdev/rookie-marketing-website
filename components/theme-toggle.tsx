'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon-sm" className="shadow-none">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="cursor-pointer shadow-none"
      onClick={() => {
        const next = resolvedTheme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.cookie = `theme=${next};path=/;domain=.rookiework.com;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
      }}
    >
      {resolvedTheme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
