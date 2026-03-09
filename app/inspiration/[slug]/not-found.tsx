import { HeroHeader } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <HeroHeader />
      <main className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Inlägget hittades inte</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Det verkar som att det inlägg du letar efter inte finns eller har tagits bort.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link href="/inspiration">Tillbaka till inspiration</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Startsida</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
