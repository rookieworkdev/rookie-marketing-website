import ContactSection from '@/components/contact-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontakta Rookie så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag. Ring oss på 010 129 60 00 eller maila info@rookiework.se',
  alternates: {
    canonical: '/kontakt',
  },
  openGraph: {
    url: '/kontakt',
    title: 'Kontakt - Rookie',
    description:
      'Kontakta Rookie så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
  },
  twitter: {
    title: 'Kontakt - Rookie',
    description:
      'Kontakta Rookie så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
  },
}

export default function KontaktPage() {
  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Kontakt' }]}
          title="Hör av dig till oss"
          description="Kontakta oss så berättar vi gärna mer om hur vi kan hjälpa dig."
          imageSrc="/images/headers/three-business-men.jpg"
        />
        <ContactSection
          variant="simple"
          subject="Allmän förfrågan"
          title="Skicka ett meddelande"
          description="Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag."
        />
      </main>
      <FooterSection />
    </>
  )
}
