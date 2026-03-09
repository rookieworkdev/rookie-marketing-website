import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import RookieOfMonthSection from '@/components/rookie-of-month-section'
import { getCurrentRookie } from '@/lib/previous-rookies'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hitta Personal',
  description:
    'Kontakta Rookie så hjälper vi dig hitta rätt unga talanger och nyexaminerade för ditt företag. Vi matchar kvalitetssäkrade juniora profiler med din verksamhet.',
  alternates: {
    canonical: '/personal',
  },
  openGraph: {
    url: '/personal',
    title: 'Hitta Personal - Rookie',
    description: 'Kontakta Rookie så hjälper vi dig hitta rätt unga talanger och nyexaminerade för ditt företag.',
  },
  twitter: {
    title: 'Hitta Personal - Rookie',
    description: 'Kontakta Rookie så hjälper vi dig hitta rätt unga talanger och nyexaminerade för ditt företag.',
  },
}

export default async function PersonalPage() {
  const currentRookie = await getCurrentRookie()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Hitta personal' }]}
          title="Hitta rätt personal för ditt företag"
          description="Ert företag är nu ett steg närmare att signa nästa kandidat. Fyll i formuläret och berätta om ert personalbehov så återkommer vi inom kort!"
          imageSrc="/images/headers/working-men.jpg"
        />
        <ContactSection
          variant="full"
          subject="Rekryteringsförfrågan"
          title="Skicka en rekryteringsförfrågan"
          description="Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag."
        />
        <RookieOfMonthSection rookie={currentRookie} />
      </main>
      <FooterSection />
    </>
  )
}
