import CTASection from '@/components/cta-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import PreviousRookiesSection from '@/components/previous-rookies-section'
import RookieOfMonthSection from '@/components/rookie-of-month-section'
import { getCurrentRookie, getPreviousRookies } from '@/lib/previous-rookies'
import type { Metadata } from 'next'

// Revalidate this page every day (86400 seconds)
// Rookie of the month changes monthly, so daily checks are sufficient
// export const revalidate = 86400
export const revalidate = 1 

export const metadata: Metadata = {
  title: 'Månadens Rookie',
  description:
    'Vi hyllar och uppmärksammar de mest framstående studenterna från olika program och universitet. Baserat på studenters akademiska prestationer utser vi varje månad Månadens Rookie.',
  alternates: {
    canonical: '/manadens-rookie',
  },
  openGraph: {
    url: '/manadens-rookie',
    title: 'Månadens Rookie - Rookie',
    description:
      'Vi hyllar och uppmärksammar de mest framstående studenterna från olika program och universitet.',
  },
  twitter: {
    title: 'Månadens Rookie - Rookie',
    description:
      'Vi hyllar och uppmärksammar de mest framstående studenterna från olika program och universitet.',
  },
}

export default async function ManadensRookiePage() {
  const [currentRookie, previousRookies] = await Promise.all([
    getCurrentRookie(),
    getPreviousRookies(),
  ])

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Månadens Rookie' }]}
          title="Månadens mest lovande talang"
          description="Vi hyllar och uppmärksammar de mest framstående studenterna från olika program och universitet runt om i Sverige."
          imageSrc="/images/headers/woman-writing.jpg"
        />
        <RookieOfMonthSection rookie={currentRookie} />
        <PreviousRookiesSection rookies={previousRookies} />
        <CTASection
          content={{
            title: 'Kan vi hjälpa dig?',
            description:
              'Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
            buttonText: 'Kontakta oss',
            buttonHref: '/kontakt',
          }}
        />
      </main>
      <FooterSection />
    </>
  )
}
