import { VolvoLogo } from '@/components/company-logos'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { getCurrentRookie } from '@/lib/previous-rookies'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

// Dynamic imports for below-the-fold components
const AboutSection = dynamic(() => import('@/components/about-section'))
const LargeImageSection = dynamic(() => import('@/components/large-image-section'))
const BenefitsSection = dynamic(() => import('@/components/benefits-section'))
const TestimonialSection = dynamic(() => import('@/components/testimonial-section'))
const RookieOfMonthSection = dynamic(() => import('@/components/rookie-of-month-section'))
const CTASection = dynamic(() => import('@/components/cta-section'))

export const metadata: Metadata = {
  title: 'För företag',
  description:
    'Rookie är specialiserade på unga talanger. Vi har ett starkt nätverk av kvalitetssäkrade unga människor. Oavsett om ditt företag är i behov av hyrrekrytering, konsult eller rekrytering av en framtida kollega så är vi partnern för dig.',
  alternates: {
    canonical: '/for-foretag',
  },
  openGraph: {
    url: '/for-foretag',
    title: 'För företag - Rookie',
    description: 'Vi har ett starkt nätverk av kvalitetssäkrade unga talanger och nyutexaminerade.',
  },
  twitter: {
    title: 'För företag - Rookie',
    description: 'Vi har ett starkt nätverk av kvalitetssäkrade unga talanger och nyutexaminerade.',
  },
}

export default async function ForForetagPage() {
  const currentRookie = await getCurrentRookie()

  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'För företag' }]}
          title="Hitta kvalitetssäkrade unga talanger"
          description="Rookie är specialiserade på unga talanger och har ett starkt nätverk av kvalitetssäkrade nyexaminerade och juniora profiler."
          showButton
          buttonText="Hitta personal"
          buttonHref="/personal"
          imageSrc="/images/headers/professionals-at-work.jpg"
        />
        <AboutSection
          title="Hitta rätt kollegor"
          description="Gör ert företag synligt för unga arbetssökande och lista era lediga tjänster hos Rookie. Med vårt nätverk av ambitiösa arbetssökande och vår erfarenhet hjälper vi er landa rätt rekrytering. Oavsett om ditt företag är ute efter en hyrrekrytering, konsult eller vill rekrytera nya kollegor till teamet"
          imageAlt="Hitta rätt kollegor"
          ctaText="Hitta personal"
          ctaHref="/personal"
        />
        <LargeImageSection
          title="Rekrytera snabbare och smidigare"
          description="Rookie är det självklara valet för företag som vill växa och utvecklas med de bästa och mest lovande kandidaterna på arbetsmarknaden. Vi förstår kraften och potentialen hos unga vuxna. Upptäck möjligheterna ni också och hitta er nästa kandidat enklare och snabbare med hjälp av vår plattform."
        />
        <BenefitsSection
          title="Öppna dörren för unga talanger"
          description="Genom att fokusera på rekrytering av nyexaminerade och young professionals, öppnar vi dörrar till nya möjligheter och främjar tillväxt och innovation på arbetsmarknaden. Upptäck fördelarna med att anställa early talent och hur det kan vara nyckeln till framgång för ert företag."
          benefits={[
            {
              icon: 'target',
              title: 'Målmedvetna och ambitiösa',
              description:
                'Unga talanger har en stark drivkraft och tydliga mål för sin karriär, vilket gör dem till engagerade och fokuserade medarbetare.',
            },
            {
              icon: 'users',
              title: 'Formbar arbetskraft',
              description:
                'Med en öppenhet för att lära och utvecklas anpassar sig unga medarbetare snabbt till företagets kultur och arbetssätt.',
            },
            {
              icon: 'lightbulb',
              title: 'Nya perspektiv till teamet',
              description:
                'Unga medarbetare bidrar med fräscha idéer och innovativa lösningar som kan driva företaget framåt och skapa nya möjligheter.',
            },
            {
              icon: 'laptop',
              title: 'Hög teknologisk kompetens',
              description:
                'Uppvuxna i den digitala eran har unga talanger en naturlig förståelse för ny teknik och digitala verktyg som driver innovation.',
            },
            {
              icon: 'rocket',
              title: 'Hungriga på att kicka igång',
              description:
                'Med ett starkt engagemang och vilja att bevisa sig själva ger unga medarbetare allt för att lyckas i sin första roll och växa.',
            },
            {
              icon: 'battery',
              title: 'Energi och entusiasm',
              description:
                'Unga talanger tar med sig en positiv energi och entusiasm som kan inspirera hela teamet och skapa en dynamisk arbetsmiljö.',
            },
          ]}
          ctaText="Hitta personal"
          ctaHref="/personal"
        />
        <TestimonialSection
          quote="Jag har använt mig av Håkan för rekrytering i flera roller och hos flera arbetsgivare. Anledningen är att Håkan arbetar hårt, levererar högkvalitativa kandidater och är mycket enkel att ha att göra med."
          authorName="Karl Rudarp"
          authorTitle="Head of Volvo Cars Financial Services"
          authorImage="/avatars/karl-rudarp.png"
          companyLogo={<VolvoLogo />}
          companyName="Volvo Cars Financial Services"
        />
        <RookieOfMonthSection rookie={currentRookie} />
        <CTASection
          variant="double"
          content={[
            {
              title: 'Kan vi hjälpa dig?',
              description:
                'Kontakta oss så berättar vi gärna mer om hur vi matchar unga talanger med rätt företag.',
              buttonText: 'Kontakta oss',
              buttonHref: '/kontakt',
            },
            {
              title: 'Guide',
              description:
                'Avgörande steg för en effektivare rekryterings process av unga talanger',
              buttonText: 'Få tillgång',
              buttonHref: '/kontakt',
              buttonVariant: 'secondary',
            },
          ]}
        />
      </main>
      <FooterSection />
    </>
  )
}
