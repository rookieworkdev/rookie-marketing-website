import CTASection from '@/components/cta-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import JobsGridSection from '@/components/jobs-grid-section'
import { PageHeader } from '@/components/page-header'
import { getAvailableJobs } from '@/lib/jobs'
import { generateJobListingSchema } from '@/lib/seo'
import type { Metadata } from 'next'

// Revalidate this page every hour (3600 seconds)
// This ensures job listings stay fresh without requiring a full rebuild
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Lediga jobb',
  description:
    'Upptäck lediga jobb för unga talanger och nyexaminerade. Hitta din nästa karriärmöjlighet hos spännande företag.',
  alternates: {
    canonical: '/lediga-jobb',
  },
  openGraph: {
    url: '/lediga-jobb',
    title: 'Lediga jobb - Rookie',
    description:
      'Upptäck lediga jobb för unga talanger och nyexaminerade. Hitta din nästa karriärmöjlighet hos spännande företag.',
  },
  twitter: {
    title: 'Lediga jobb - Rookie',
    description:
      'Upptäck lediga jobb för unga talanger och nyexaminerade. Hitta din nästa karriärmöjlighet hos spännande företag.',
  },
}

export default async function LedigaJobbPage() {
  const jobs = await getAvailableJobs()

  const jobListingSchema = generateJobListingSchema(
    jobs.map((job) => ({
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      postedDate: job.postedDate,
      externalUrl: job.externalUrl,
    }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jobListingSchema }}
      />
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Lediga jobb' }]}
          title="Rookie matchar unga talanger med lediga jobb"
          description="Ta nästa steg i din karriär och hitta ditt nästa spännande jobb hos ett företag som söker nyexaminerade och juniora talanger."
          showButton={true}
          buttonText="Registrera dig här"
          buttonHref="https://rookie-se.intelliplan.net/jobb/9/ansok"
          buttonOpenInNewTab={true}
          imageSrc="/images/headers/man-working.jpg"
        />
        <JobsGridSection jobs={jobs} />
      </main>
      <CTASection
        content={{
          title: 'Redo att ta steget in i arbetslivet?',
          description:
            'Registrera dig här för att göra dig tillgänglig för hundratals arbetsgivare.',
          buttonText: 'Registrera dig här',
          buttonHref: 'https://rookie-se.intelliplan.net/jobb/9/ansok',
          buttonOpenInNewTab: true,
        }}
      />
      <FooterSection />
    </>
  )
}
