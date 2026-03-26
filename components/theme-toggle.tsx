'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="size-9 shadow-none">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 cursor-pointer shadow-none"
      onClick={() => {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.cookie = `theme=${next};path=/;domain=.rookiework.com;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
      }}
    >
      {theme === 'dark' ? <Moon className="size-5" /> : <Sun className="size-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
