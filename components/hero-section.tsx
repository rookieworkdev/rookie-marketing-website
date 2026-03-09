'use client'

import { Button } from '@/components/ui/button'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { cn, containerBorders, horizontalPadding } from '@/lib/utils'
import Link from 'next/link'
import { HeroHeader } from './header'
import { MatchScore } from './match-score'

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section className="bg-background">
          <div
            className={cn(
              containerBorders(),
              'relative flex min-h-svh flex-col overflow-hidden pt-16'
            )}
          >
            {/* Flickering grid background — absolute fill, no gaps */}
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
            {/* Gradient overlay: solid background at top, transparent at bottom */}
            <div className="from-background absolute inset-0 bg-gradient-to-b from-30% to-transparent" />

            {/* Content */}
            <div
              className={cn(
                horizontalPadding,
                'relative mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center pb-12 text-center'
              )}
            >
              {/* Heading */}
              <div>
                <h1 className="text-foreground text-4xl font-medium tracking-tight md:text-5xl xl:text-6xl">
                  Match snabbt och enkelt
                </h1>
                <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg font-medium">
                  För människor som inte bara jobbar — de lyfter varandra
                </p>
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <Button asChild size="lg" className="min-w-[160px]">
                  <Link href="/skapa-uppdrag">
                    <span>Skapa uppdrag</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-w-[160px]">
                  <Link href="/skapa-profil">
                    <span>Skapa profil</span>
                  </Link>
                </Button>
              </div>

              {/* Match score indicator */}
              <div className="mt-6 w-full">
                <MatchScore score={85} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
