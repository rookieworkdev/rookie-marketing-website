import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { Button } from '@/components/ui/button'
import { cn, horizontalPadding, whiteBorderWrapper } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <HeroHeader />
      <main>
        <section className="bg-muted relative min-h-screen">
          {/* Border container */}
          <div
            className={cn(
              'relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-center',
              whiteBorderWrapper()
            )}
          >
            <div className={cn('text-center', horizontalPadding)}>
              <p className="text-primary mb-4 text-lg font-medium">404</p>
              <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                Sidan kunde inte hittas
              </h1>
              <p className="text-muted-foreground mt-6 text-lg">
                Det verkar som att sidan du letar efter inte finns eller har flyttats.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/">Gå till startsidan</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/kontakt">Kontakta oss</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  )
}
