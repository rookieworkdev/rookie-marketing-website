import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getAvailableJobs } from '@/lib/jobs'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic imports for below-the-fold components
const AboutSection = dynamic(() => import('@/components/about-section'))
const LargeImageSection = dynamic(() => import('@/components/large-image-section'))
const JobsCarouselSection = dynamic(() => import('@/components/jobs-carousel-section'))
const CTASection = dynamic(() => import('@/components/cta-section'))

export const metadata: Metadata = {
  title: 'För jobbsökande',
  description:
    'Är du i början av din karriär? Då har du kommit helt rätt. Upptäck lediga jobb och ladda enkelt upp ditt CV för att göra dig synlig för spännande företag.',
  alternates: {
    canonical: '/for-jobbsokande',
  },
  openGraph: {
    url: '/for-jobbsokande',
    title: 'För jobbsökande - Rookie',
    description:
      'Upptäck lediga jobb och ladda enkelt upp ditt CV för att göra dig synlig för spännande företag.',
  },
  twitter: {
    title: 'För jobbsökande - Rookie',
    description:
      'Upptäck lediga jobb och ladda enkelt upp ditt CV för att göra dig synlig för spännande företag.',
  },
}

export default async function ForJobbsokandePage() {
  const jobs = await getAvailableJobs()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'För jobbsökande' }]}
          title="Kickstarta din karriär idag"
          description="Är du i början av din karriär? Då har du kommit helt rätt."
          showButton
          buttonText="Hitta jobb"
          buttonHref="/lediga-jobb"
          imageSrc="/images/headers/young-creative.jpg"
        />
        <AboutSection
          title="Hitta ditt nästa jobb"
          description="Rookie hjälper dig som är nyexaminerad eller i början av din karriär att komma igång genom att koppla ihop dig med spännande företag som söker unga talanger och drivna kollegor. På vår plattform tar du del av nya lediga tjänster och kan söka jobb genom att ladda upp ditt CV som gör dig tillgänglig för hundratals arbetsgivare. Oavsett om du är ute efter en deltid- eller heltidstjänst."
          imageAlt="Hitta rätt kollegor"
          ctaText="Registrera ditt CV"
          ctaHref="/kontakt"
        />
        <LargeImageSection
          title="Rekrytera snabbare och smidigare"
          description="Vi nischar oss helt mot att matcha ihop unga talanger med företag. Vilket gör det enklare för dig att hitta lediga tjänster som passar din profil. Dessutom slipper du tävla mot de som har lång erfarenhet och många år av arbete i bagaget."
        />
        <JobsCarouselSection jobs={jobs} maxJobs={6} showCTA />
        <CTASection
          content={{
            title: 'Är du ute efter jobb?',
            description:
              'Ladda enkelt upp ditt CV för att göra dig synlig för spännande företag och unika jobbmöjligheter.',
            buttonText: 'Registrera ditt CV',
            buttonHref: '/registrera-ditt-cv',
          }}
        />
      </main>
      <FooterSection />
    </>
  )
}
