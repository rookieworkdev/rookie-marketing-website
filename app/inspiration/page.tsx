import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import InspirationGridSection from '@/components/inspiration-grid-section'
import { PageHeader } from '@/components/page-header'
import { getAllPosts } from '@/lib/inspiration'
import type { Metadata } from 'next'

// Revalidate this page every 2 hours (7200 seconds)
// Inspiration posts are updated less frequently than jobs
export const revalidate = 7200

export const metadata: Metadata = {
  title: 'Inspiration',
  description:
    'Få inspiration från framgångsrika unga talanger och företag. Läs om karriärvägar, tips och insikter från rekryteringsvärlden.',
  alternates: {
    canonical: '/inspiration',
  },
  openGraph: {
    url: '/inspiration',
    title: 'Inspiration - Rookie',
    description:
      'Få inspiration från framgångsrika unga talanger och företag. Läs om karriärvägar, tips och insikter.',
  },
  twitter: {
    title: 'Inspiration - Rookie',
    description:
      'Få inspiration från framgångsrika unga talanger och företag. Läs om karriärvägar, tips och insikter.',
  },
}

export default async function InspirationPage() {
  const posts = await getAllPosts()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          title="Inspiration"
          description="Få inspiration från framgångsrika unga talanger och företag. Läs om karriärvägar, tips och insikter från rekryteringsvärlden."
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Inspiration' }]}
          imageSrc="/images/headers/woman-standing.jpg"
        />
        <InspirationGridSection posts={posts} />
      </main>
      <FooterSection />
    </>
  )
}
