import AboutSection from '@/components/about-section'
import CTASection from '@/components/cta-section'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import QuoteAnimationSection from '@/components/quote-animation-section'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Om oss',
  description:
    'Rookie är dedikerade till att underlätta rekryteringsprocessen för både företag och unga jobbsökande genom att matcha rätt kompetens med rätt möjligheter.',
  alternates: {
    canonical: '/om-oss',
  },
  openGraph: {
    url: '/om-oss',
    title: 'Om oss - Rookie',
    description:
      'Rookie är dedikerade till att underlätta rekryteringsprocessen för både företag och unga jobbsökande.',
  },
  twitter: {
    title: 'Om oss - Rookie',
    description:
      'Rookie är dedikerade till att underlätta rekryteringsprocessen för både företag och unga jobbsökande.',
  },
}

export default function OmOssPage() {
  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Om oss' }]}
          title="Vi matchar unga talanger med företag"
          description="Rookie underlättar rekryteringsprocessen för företag och unga jobbsökande genom att matcha rätt kompetens med rätt möjligheter."
          imageSrc="/images/headers/two-professionals.jpg"
        />
        <AboutSection
          title="Experter på att matcha unga talanger med företag"
          description={[
            'Vad gör oss unika? Vårt fokus på den unga generationens potential. Vår styrka är att matcha nyexaminerade och juniora talanger med företag som vill hitta passionerade och engagerade medarbetare. Vi förstår att unga talanger inte bara är framtiden, de är även nyckeln till att driva innovation och tillväxt i dagens organisationer.',
            'Vår expertis inom rekrytering och matchning tillsammans med ett omfattande nätverk av både företag och unga arbetssökande gör oss till den perfekta partnern vid rekrytering.',
          ]}
          imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
          imageAlt="Unga talanger samarbetar"
          items={['Hitta talanger snabbare', 'Underlätta ditt jobbsökande']}
          ctaText="Kontakta oss"
          ctaHref="/kontakt"
        />
        <QuoteAnimationSection
          quote="Vår mission är att göra rekryteringsprocessen enklare och att få fler företag att se den otroliga potential som finns hos unga. Om fler vågar investera i den yngre arbetskraften så skapar vi en arbetsmarknad som är rustad för att möta framtidens utmaningar."
          author="Håkan Olsson"
          authorTitle="VD och grundare av Rookie AB"
          authorImage="/avatars/hakan-olsson.jpeg"
        />
        <CTASection />
      </main>
      <FooterSection />
    </>
  )
}
