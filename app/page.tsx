import CeoTestimonialSection from '@/components/ceo-testimonial-section'
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
      <CeoTestimonialSection
        quote="Vår mission är att göra rekryteringsprocessen enklare och att få fler företag att se den otroliga potential som finns hos unga. Om fler vågar investera i den yngre arbetskraften så skapar vi en arbetsmarknad som är rustad för att möta framtidens utmaningar."
        authorName="Håkan Olsson"
        authorTitle="VD och grundare av Rookie AB"
        authorImage="/images/content/hakan-olsson.jpeg"
      />
      <FooterSection />
    </>
  )
}
