'use client'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn, defaultBorderOpacity, horizontalPadding } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

export const HeroHeader = () => {
  const t = useTranslations('nav')
  const menuItems = [
    { name: t('forCompanies'), href: '/for-foretag' },
    { name: t('forCandidates'), href: '/for-jobbsokande' },
    { name: t('inspiration'), href: '/inspiration' },
  ]
  const [menuState, setMenuState] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus trap for mobile menu
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!menuState) return

      if (e.key === 'Escape') {
        setMenuState(false)
        menuButtonRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    },
    [menuState]
  )

  useEffect(() => {
    if (menuState) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus first menu item when opened
      const firstLink = menuRef.current?.querySelector<HTMLElement>('a[href]')
      firstLink?.focus()
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuState, handleKeyDown])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className={cn(
          'fixed z-20 w-full border-b',
          defaultBorderOpacity,
          'transition-all duration-300',
          scrolled && 'bg-background/80 backdrop-blur-lg'
        )}
      >
        <div className={`mx-auto max-w-7xl ${horizontalPadding} transition-all duration-300`}>
          <div className="relative flex items-center justify-between py-3 lg:py-4">
            {/* Logo — left */}
            <div className="flex items-center gap-2">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>
            </div>

            {/* Nav links — center (desktop) */}
            <div className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <ul className="flex gap-6 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground block font-medium duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side — language + sign in */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />

              {/* Mobile menu button */}
              <Button
                ref={menuButtonRef}
                variant="default"
                size="icon"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? t('closeMenu') : t('openMenu')}
                aria-expanded={menuState}
                aria-controls="mobile-menu"
                className="lg:hidden"
              >
                {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
              </Button>

              {/* Desktop sign in */}
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden lg:inline-flex"
              >
                <Link href="https://rookie-se.on.intelliplan.eu/">
                  <span>{t('login')}</span>
                </Link>
              </Button>
            </div>

            {/* Mobile menu */}
            <div
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal={menuState ? 'true' : undefined}
              aria-label={t('navigationMenu')}
              className="bg-background absolute left-0 top-full mb-6 hidden w-full flex-wrap items-center space-y-8 rounded-3xl border p-6 shadow-2xl in-data-[state=active]:block lg:hidden"
            >
              <ul className="space-y-6 text-base">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                >
                  <Link href="https://rookie-se.on.intelliplan.eu/">
                    <span>{t('login')}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
