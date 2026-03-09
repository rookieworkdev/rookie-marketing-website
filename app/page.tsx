import { CoopLogistikLogo } from '@/components/company-logos'
import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import { getCurrentRookie } from '@/lib/previous-rookies'
import { DEFAULT_DESCRIPTION } from '@/lib/seo'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic imports for below-the-fold components to reduce initial bundle
const AboutSection = dynamic(() => import('@/components/about-section'))
const EmployerSection = dynamic(() => import('@/components/employer-section'))
const JobseekerSection = dynamic(() => import('@/components/jobseeker-section'))
const TestimonialSection = dynamic(() => import('@/components/testimonial-section'))
const RookieOfMonthSection = dynamic(() => import('@/components/rookie-of-month-section'))
const CTASection = dynamic(() => import('@/components/cta-section'))

// Revalidate the homepage every day (86400 seconds)
// Homepage shows current rookie which changes monthly
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Vi matchar företag med unga talanger',
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: '/',
    title: 'Vi matchar företag med unga talanger - Rookie',
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    title: 'Vi matchar företag med unga talanger - Rookie',
    description: DEFAULT_DESCRIPTION,
  },
}

export default async function Page() {
  const currentRookie = await getCurrentRookie()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <EmployerSection />
      <JobseekerSection />
      <TestimonialSection
        quote="Det har varit ett smidigt samarbete och en träffsäkerhet i urval av rätt profiler. Det har bidragit till snabb tillsättning vid konsultbehov. Rekommenderas varmt!"
        authorName="Jesper Eriksson"
        authorTitle="Head of Finance & Business Control"
        authorImage="/avatars/jesper-eriksson.png"
        companyLogo={<CoopLogistikLogo />}
        companyName="Coop Logistik"
      />
      <RookieOfMonthSection rookie={currentRookie} />
      <CTASection
        content={{
          title: 'Kan vi hjälpa dig?',
          description:
            'Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
          buttonText: 'Kontakta oss',
          buttonHref: '/kontakt',
        }}
      />
      <FooterSection />
    </>
  )
}
