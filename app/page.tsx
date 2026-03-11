import CTASection from '@/components/cta-section'
import FooterSection from '@/components/footer'
import HeroSection from '@/components/hero-section'
import HowItWorksSection from '@/components/how-it-works-section'
import JobsSection from '@/components/jobs-section'
import { getLatestJobs } from '@/lib/jobs'
import { DEFAULT_DESCRIPTION } from '@/lib/seo'
import type { Metadata } from 'next'

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
  const jobs = await getLatestJobs(8)

  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <JobsSection jobs={jobs} />
      <CTASection
        content={{
          title: 'Redo att komma igång?',
          description:
            'Skapa ett konto och börja matcha med rätt kandidater eller uppdrag redan idag.',
          buttonText: 'Kom igång',
          buttonHref: '/kontakt',
        }}
      />
      <FooterSection />
    </>
  )
}
