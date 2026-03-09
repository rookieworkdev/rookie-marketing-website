import { Logo } from '@/components/logo'

import { cn, containerBorders, horizontalPadding, sectionWrapper } from '@/lib/utils'
import Link from 'next/link'

const discoveryLinks = [
  {
    title: 'Månadens Rookie',
    href: '/manadens-rookie',
  },
  {
    title: 'För jobbsökande',
    href: '/for-jobbsokande',
  },
  {
    title: 'För företag',
    href: '/for-foretag',
  },
  {
    title: 'Om oss',
    href: '/om-oss',
  },
  {
    title: 'Inspiration',
    href: '/inspiration',
  },
  {
    title: 'Kontakt',
    href: '/kontakt',
  },
  {
    title: 'Integritetspolicy',
    href: '/integritetspolicy',
  },
]

export default function FooterSection() {
  return (
    <footer className={sectionWrapper('bg-background')}>
      <div className={cn(containerBorders(), horizontalPadding, 'pt-16 pb-8')}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Half - Logo and Tagline */}
          <div className="space-y-4">
            <Link href="/" aria-label="go home" className="block size-fit">
              <Logo />
            </Link>
            <p className="text-xl font-medium">
              Matchar unga talanger
              <br />
              med företag
            </p>
          </div>

          {/* Right Half - Two Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Upptäck Rookie Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upptäck Rookie</h3>
              <nav className="flex flex-col space-y-3">
                {discoveryLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Kontakt Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kontakt</h3>
              <div className="text-muted-foreground flex flex-col space-y-3">
                <a
                  href="https://maps.google.com/?q=Drottninggatan+32,+111+51+Stockholm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors duration-150"
                >
                  Drottninggatan 32, 8tr, 111 51 Stockholm
                </a>
                <a
                  href="mailto:info@rookiework.se"
                  className="hover:text-foreground transition-colors duration-150"
                >
                  info@rookiework.se
                </a>
                <a
                  href="tel:+46101296000"
                  className="hover:text-foreground transition-colors duration-150"
                >
                  010 129 60 00
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright, Site by Stormfors, and Theme Toggle */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Rookie, All rights reserved
            </span>
            {/*
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <a
              href="https://stormfors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
            >
              Site by Stormfors
            </a>
            */}
          </div>
        </div>
      </div>
    </footer>
  )
}
