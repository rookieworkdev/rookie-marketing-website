import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { PageHeader } from '@/components/page-header'
import { cn, containerBorders, topBorder } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description:
    'Läs om hur Rookie hanterar personuppgifter och integritet. Vi värnar om din integritet och följer gällande dataskyddslagar.',
  alternates: {
    canonical: '/integritetspolicy',
  },
  openGraph: {
    url: '/integritetspolicy',
    title: 'Integritetspolicy - Rookie',
    description:
      'Läs om hur Rookie hanterar personuppgifter och integritet. Vi värnar om din integritet.',
  },
  twitter: {
    title: 'Integritetspolicy - Rookie',
    description:
      'Läs om hur Rookie hanterar personuppgifter och integritet. Vi värnar om din integritet.',
  },
}

export default function IntegritetspolicyPage() {
  return (
    <>
      <HeroHeader />
      <main>
        <PageHeader
          breadcrumbs={[{ label: 'Hem', href: '/' }, { label: 'Integritetspolicy' }]}
          title="Hur vi hanterar dina personuppgifter"
          description="Vi värnar om din integritet och följer gällande dataskyddslagar."
          imageSrc="/images/headers/woman-professional.jpg"
        />
        <article className={cn('bg-background', topBorder())}>
          <div className={cn(containerBorders(), 'px-6 py-16')}>
            <div className="mx-auto max-w-4xl">
              <div className="prose prose-lg prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h1:mb-8 prose-h1:mt-16 prose-h1:text-4xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-2xl prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline prose-a:transition-colors hover:prose-a:underline prose-strong:font-semibold prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-pre:bg-muted prose-pre:p-4 prose-img:rounded-lg prose-hr:my-8 max-w-none">
                <h1>Integritetspolicy</h1>
                <p>
                  Denna personuppgiftspolicy innehåller regler och riktlinjer för den behandling av
                  personuppgifter som görs av Rookie AB i egenskap av personuppgiftsansvarig samt
                  personuppgiftsbiträde, oavsett vilken typ av personuppgifter det är fråga om och
                  vems personuppgifter det rör.
                </p>

                <h2>1. Personuppgiftsansvarig</h2>
                <p>
                  Rookie AB, organisationsnummer 559476-5207, telefonnummer 010 129 60 00,
                  Drottninggatan 32, 111 51 Stockholm, info@rookiework.se
                </p>

                <h2>2. Personuppgiftsombud</h2>
                <p>
                  Ombud är Håkan Olsson med kontaktuppgifter hakan.olsson@rookiework.se eller 010
                  129 60 00
                </p>

                <h2>3. Vilka personuppgifter behandlar vi, hur länge och för vilket ändamål?</h2>
                <h3>3.1 Allmänt</h3>
                <p>
                  Rookie AB (nedan Rookie, oss eller vi) samlar in och behandlar personuppgifter
                  inom de områden och funktioner som listas nedan. Med personuppgifter avses all
                  slags information som direkt eller indirekt kan hänföras till en fysisk person.
                </p>

                <h3>3.2 Rekrytering</h3>
                <h4>3.2.1 Vilken är den lagliga grunden för behandlingen?</h4>
                <p>
                  Den information som Du lämnar till oss genom att registrera ditt CV eller ansöka
                  om en specifik tjänst registreras, behandlas och används av oss för att kunna
                  skapa en eventuell anställning eller i förekommande fall ett konsultuppdrag för
                  Dig hos Rookies uppdragsgivare samt för att vi ska kunna genomföra urval,
                  intervjuer och bedömningar.
                </p>
                <p>
                  Vi använder Ditt samtycke som rättslig grund för behandlingen av Dina
                  personuppgifter och i vissa fall en intresseavvägning.
                </p>
                <p>
                  När Du registrerar Ditt CV hos Rookie behöver du samtycka till att vi kommer att
                  behandla dina personuppgifter i enlighet med dataskyddslagstiftning, särskilt den
                  allmänna dataskyddsförordningen (GDPR) samt annan tillämplig lagstiftning.
                </p>
                <p>
                  Genom att lämna Ditt fullständiga samtycke godkänner Du att uppgifterna i Din
                  ansökan eller i Ditt CV används av oss för att matcha Dig mot de specifika jobb
                  eller i förekommande fall konsultuppdrag som Du söker genom oss samt att få
                  möjligheten till att bli presenterad för potentiella arbetsgivare och
                  uppdragsgivare som finns i Rookies nätverk.
                </p>
                <p>
                  Du kan också lämna ett begränsat samtycke vilket endast ger oss rätt att använda
                  de uppgifter Du lämnat i Din ansökan mot det specifika jobb eller det specifika
                  uppdrag som Du söker.
                </p>
                <p>
                  Observera att Du när som helst kan återkalla ditt samtycke genom att kontakta oss
                  (se punkt 2).
                </p>

                <h4>3.2.2 Vilka personuppgifter behandlas och vem är mottagare?</h4>
                <p>
                  Personuppgifterna som vi behandlar är huvudsakligen namn, adress, personnummer,
                  titel, underlag för ersättning och förmåner, information om närstående,
                  kvalifikationer, referenser från tidigare arbetsgivare, erfarenhet och utveckling.
                  Alla uppgifter som finns med i Ditt CV och Din ansökan kommer att behandlas.
                </p>
                <p>
                  Dina personuppgifter kommer att mottas och användas av Rookies medarbetare samt
                  kommuniceras med Rookies uppdragsgivare, huvudsakligen HR-ansvariga, chefer och i
                  förekommande fall myndigheter (när så erfordras).
                </p>

                <h4>3.2.3 För vilka ändamål behandlas personuppgifterna?</h4>
                <p>
                  Vi begär in och behandlar Dina personuppgifter i syfte att uppfylla lagstadgade
                  eller avtalsenliga krav samt krav som är nödvändiga för oss eller våra
                  uppdragsgivare för att ingå ett avtal med Dig som anställd hos uppdragsgivaren
                  eller som konsult. Huvudsakligen ansökningar, intervjuer och beslutsfattande i ett
                  rekryteringsförfarande. Uppgifterna kan även komma att användas i samband med
                  marknadsundersökningar.
                </p>
                <p>
                  I kommunikationen med Rookie (genom exempelvis e-post eller telefonsamtal) kan vi
                  komma att spara information i sådan kommunikation för att kunna utföra och
                  förbättra våra tjänster.
                </p>
                <p>
                  Vi lämnar inte ut uppgifter till tredje part om samtycke inte lämnas eller om vi
                  är skyldiga att göra det enligt lag, författning eller till följd av ett domstols-
                  eller myndighetsbeslut. Lämnar Du Ditt fullständiga samtycke kommer vi att
                  presentera Ditt CV och de personuppgifter som där framgår för potentiella
                  arbetsgivare eller uppdragsgivare som finns i vårt nätverk.
                </p>

                <h3>3.3 Anställda, konsulter och bemanning</h3>
                <h4>3.3.1 Vilken är den lagliga grunden för behandlingen?</h4>
                <p>
                  Våra anställdas och konsulters personuppgifter inhämtas och behandlas för att
                  fullgöra skyldigheter enligt lag, kollektivavtal och/eller för ingåendet och
                  fullgörandet av enskilda avtal och bemanningsuppdrag.
                </p>

                <h4>3.3.2 Vilka personuppgifter behandlas och vem är mottagare?</h4>
                <p>
                  Den information som Du lämnar till oss genom att registrera ditt CV eller ansöka
                  om en tjänst hos oss eller ett bemanningsuppdrag hos någon av våra uppdragsgivare
                  registreras, behandlas och används av oss för att fullgöra skyldigheter enligt
                  lag, kollektivavtal och/eller för ingåendet och fullgörandet av enskilda
                  anställningsavtal eller konsultavtal.
                </p>
                <p>
                  De som mottar uppgifterna är HR-ansvariga hos oss samt våra uppdragsgivares
                  HR-ansvariga, chefer och i förekommande fall myndigheter (när så erfordras).
                </p>

                <h4>3.3.3 För vilka ändamål behandlas personuppgifterna?</h4>
                <p>
                  Personuppgifter krävs bland annat för utbetalning av ersättningar och förmåner,
                  personaladministration (inklusive arbetsmiljö, pensioner, livförsäkring och hälso-
                  och sjukvårdsförsäkring), tidrapportering, arvoden, upprätthålla beredskaps- och
                  katastrofplanering, närmast anhörig kontakt, företagshälsovård, semester, frånvaro
                  och också mer generellt för att säkerställa uppfyllelse av legala skyldigheter
                  (inklusive, men inte begränsat till, inkomstskatt och
                  socialförsäkringslagstiftning och arbetsrättslig lagstiftning).
                </p>

                <h3>3.4 Uppdragsgivare</h3>
                <h4>3.4.1 Vilken är den lagliga grunden för behandlingen?</h4>
                <p>
                  För att kunna ingå och hantera avtal med våra uppdragsgivare behandlar vi
                  personuppgifter tillhörande de personer som företräder Rookies uppdragsgivare.
                  Vissa personuppgifter kan behandlas på grund av att vi är skyldiga att göra det,
                  exempelvis personuppgifter på fakturor till följd av bokföringsskyldighet.
                </p>

                <h4>3.4.2 Vilka personuppgifter behandlas och vem är mottagare?</h4>
                <p>
                  Vi behandlar personuppgifter för företrädare till bolag som vi har
                  avtalsrelationer med. Personuppgifter som behandlas kan bland annat vara namn,
                  telefonnummer, e-post, personnummer. Vi kan även behandla personuppgifter avseende
                  företrädare till bolag som är potentiella kunder. Personuppgifter som behandlas
                  kan exempelvis vara namn, telefonnummer, adress och e-post. De som mottar
                  uppgifterna är huvudsakligen för avtalsrelationen relevanta företrädare för oss.
                </p>

                <h4>3.4.3 För vilka ändamål behandlas personuppgifterna?</h4>
                <p>
                  Vi behandlar enbart personuppgifter som är relevanta för förhållandet med
                  uppdragsgivaren eller för en potentiell uppdragsgivare och som krävs för
                  fullgörandet av ett avtal. Personuppgifter så som företrädares namn, e-post och
                  telefonnummer behandlas för att kunna kommunicera med uppdragsgivaren.
                  Företrädares personuppgifter kan även behandlas för ändamålet att skicka
                  intressanta erbjudanden till uppdragsgivaren.
                </p>

                <h2>4. Källa varifrån uppgifterna hämtats</h2>
                <p>
                  Utöver de personuppgifter som lämnats i Din ansökan eller registrering av Ditt CV
                  hos oss kan vi komma att komplettera med information som lämnats i eller framgår
                  av offentliga källor och på sociala medier (ex. Linkedin).
                </p>

                <h2>5. Lagringstid</h2>
                <h3>5.1 Allmänt</h3>
                <p>
                  Dina personuppgifter lagras inte längre än det är nödvändigt för att kunna
                  uppfylla ändamålen med behandlingen såsom den beskrivs i denna
                  personuppgiftspolicy.
                </p>

                <h3>5.2 Rekrytering</h3>
                <p>
                  Lagringen av Dina personuppgifter kommer att ske så länge det är nödvändigt för
                  att kunna utföra den tjänst för vilket Du lämnat oss Ditt samtycke. Av denna orsak
                  gallras uppgifterna i en rekrytering när ett specifikt anställningsförfarande har
                  avslutats, denna gallring sker löpande men aldrig senare än efter sex månader.
                </p>
                <p>
                  Om det dock finns rättsliga krav på att Rookie ska bevara personuppgifterna, så
                  bevarar vi dessa. Exempel på sådana fall är att en kandidat (som lämnat ett
                  begränsat samtycke för en specifik jobbansökan) överklagar ett beslut om att denne
                  inte fick jobbet.
                </p>
                <p>
                  För att vi ska kunna använda de personuppgifter Du lämnat i samband med en ansökan
                  eller en registrering av ett CV för en längre tid, exempelvis för framtida
                  rekryteringar, så måste Du ha lämnat oss Ditt fullständiga samtycke.
                </p>
                <p>
                  Information med ett sådant val lämnas via e-post efter avslutat
                  anställningsförfarande samt i samband med registrering av Ditt CV.
                </p>

                <h3>5.3 Anställda, konsulter och bemanning</h3>
                <p>
                  När en anställning eller ett uppdrag upphör finns som utgångspunkt ingen anledning
                  att spara den f.d. anställdes/uppdragtagarens personuppgifter. Detta inkluderar
                  det e-postkonto och uppgifter om den anställde/uppdragstagaren på vår webbplats.
                  Gallring ska i sådana fall ske snarast möjligt efter anställningens upphörande.
                  Från detta finns undantag. För att uppfylla åtaganden i enlighet med
                  arbetsrättslig, skatterättslig och socialförsäkringsrättslig lagstiftning behöver
                  vi spara vissa uppgifter om ex. en anställd även under en period efter
                  anställningens upphörande. Exempelvis måste uppgifter sparas för att uppfylla
                  rättsliga skyldigheter avseende beskattning eller bokföring, åligganden rörande
                  den anställdes företrädesrätt till återanställning i lag (1982:80) om
                  anställningsskydd samt för att hantera rättsliga krav som kan tänkas riktas mot
                  oss. Det krävs ibland också att uppgifter bevaras för utbetalning av exempelvis
                  pension eller avgångsvederlag. Vi kan även komma att behandla uppgifter i samband
                  med medarbetarundersökningar. Sådana undersökningar genomförs för att vi ska kunna
                  identifiera brister och därefter kunna arbeta med och säkerställa en bättre
                  arbetsmiljö. I dessa fall kan automatiserat beslutsfattande, inbegripet
                  profilering, förekomma.
                </p>
                <p>
                  Vissa av de personuppgifter vi behandlar till följd av anställningen kan utgöra
                  känsliga uppgifter. Häribland kan nämnas sjukdomstillstånd eller facklig
                  tillhörighet.
                </p>

                <h3>5.4 Uppdragsgivare</h3>
                <p>
                  Vi lagrar uppgifter så länge det är nödvändigt med hänsyn till ändamålen med
                  behandlingen. Vi genomför därför regelbundna gallringar bland lagrade
                  personuppgifter och tar bort de uppgifter som inte längre behövs efter det att
                  relationen med uppdragsgivaren upphört.
                </p>
                <p>
                  Vi kan dock behöva lagra personuppgifterna efter det att relationen med
                  uppdragsgivaren upphört, bland annat för att administrera ex. reklamationsfrister
                  eller rättsliga krav som kan tänkas riktas mot oss eller för att marknadsföra oss
                  och skicka erbjudanden som vi tror kan vara av intresse för.
                </p>
                <p>
                  Tidigare uppdragsgivare. Undantagsvis sparas därför personuppgifter viss tid efter
                  kundförhållandets upphörande eller tills att personen invänt mot marknadsföring.
                </p>
                <p>
                  Personuppgifter avseende företrädare för potentiella uppdragsgivare tas bort när
                  dialogen upphört, under förutsättning att inget uppdrag inletts, eller direkt om
                  personen invänder mot marknadsföring.
                </p>
                <p>
                  Personuppgifter kan också mer generellt behöva lagras för att säkerställa
                  uppfyllelse av legala skyldigheter, exempelvis avseende bokföring. Om sådan
                  skyldighet föreligger kan personuppgifterna sparas i upp till 10 år.
                </p>

                <h2>6. Dina rättigheter</h2>
                <p>
                  Du har bland annat följande rättigheter enligt gällande dataskyddslagstiftning:
                </p>
                <ul>
                  <li>
                    rätt till tillgång till information rörande behandlingen av Dina
                    personuppgifter,
                  </li>
                  <li>rätt att korrigera felaktiga personuppgifter,</li>
                  <li>
                    rätt att få Dina personuppgifter raderade om de inte längre krävs för att
                    uppfylla ändamålet,
                  </li>
                  <li>rätt att begränsa behandlingen av Dina personuppgifter,</li>
                  <li>
                    rätt att motsätta dig behandling av Dina personuppgifter för direkt
                    marknadsföring; samt,
                  </li>
                  <li>
                    rätt att invända mot behandlingen av Dina personuppgifter och begära begränsad
                    behandling av Dina personuppgifter.
                  </li>
                </ul>
                <p>
                  Det kan finnas associerade villkor och begränsningar rörande dessa rättigheter.
                </p>
                <p>
                  För att utöva Dina rättigheter eller om Du har frågor om vår behandling av Dina
                  personuppgifter, vänligen kontakta oss (se punkt 2).
                </p>
                <p>
                  Om och när personuppgiftsbehandlingen grundar sig på den registrerades samtycke
                  kan Du när som helst återkalla Ditt samtycke.
                </p>

                <h2>7. Automatiserat beslutsfattande</h2>
                <p>Vi använder oss inte av ett automatiserat beslutsfattande.</p>

                <h2>8. Personuppgiftsbiträden</h2>
                <p>
                  Vi använder oss stundtals av underbiträden och leverantörer för vissa tjänster och
                  för ex. moln och databaslösningar. Vi förbinder oss att ha
                  personuppgiftsbiträdesavtal med sådana underbiträden när så erfordras där det
                  framgår att även dessa följer gällande dataskyddslagstiftning och i synnerhet
                  GDPR.
                </p>

                <h2>9. Särskilt om känsliga uppgifter</h2>
                <p>
                  Med känsliga uppgifter avses i denna policy sådana personuppgifter som avslöjar
                  ras eller etniskt ursprung, personliga åsikter, religion eller medlemskap i
                  fackförening, uppgifter om hälsa eller uppgifter om en fysisk persons sexualliv
                  eller sexuell läggning mm.
                </p>
                <p>
                  Vi behandlar aldrig känsliga uppgifter utan samtycke från den registrerade eller
                  utan att det finns stöd i lag, exempelvis för att fullgöra skyldigheter eller
                  utöva särskilda rättigheter inom arbetsrätt, social trygghet och skydd eller när
                  behandlingen är nödvändig för att skydda den registrerades eller annans
                  grundläggande intressen, när registrerad är fysiskt eller rättsligt förhindrad att
                  ge samtycke, i vissa fall inom ramen för facklig verksamhet, om uppgifterna redan
                  offentliggjorts av den registrerade, om det är nödvändigt med hänsyn till ett
                  viktigt allmänt intresse, om det är nödvändigt av skäl som hör samman med bland
                  annat bedömning av arbetstagares arbetskapacitet eller tillhandahållande av hälso-
                  och sjukvård eller om det är nödvändigt med hänsyn till statistiska ändamål.
                </p>
                <p>
                  Vid varje behandling av känsliga uppgifter vidtar vi lämpliga säkerhetsåtgärder
                  för att skydda uppgifterna.
                </p>
                <p>
                  Personuppgifter är aldrig tillgängliga för fler personer än vad som är nödvändigt.
                  Detta gäller när vi agerar personuppgiftsansvarig såväl som personuppgiftsbiträde.
                </p>

                <h2>10. Ändringar i policyn</h2>
                <p>Vi kan komma att ändra och uppdatera denna policy.</p>
                <p>
                  Vid ingripande förändringar eller om information ska behandlas på annat sätt än
                  vad som anges i policyn så kommer vi att informera om detta till de som berörs av
                  ändringarna.
                </p>

                <h2>Har du frågor?</h2>
                <p>
                  Kontakta oss gärna för att veta mer kring vår personuppgiftspolicy eller övriga
                  frågor.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  )
}
