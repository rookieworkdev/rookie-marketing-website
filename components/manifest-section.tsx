import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

interface Layer {
  token: string
  description: string
}

export default async function ManifestSection() {
  const t = await getTranslations('manifest')

  const layers: Layer[] = [
    { token: 'Prefer', description: t('layers.prefer.description') },
    { token: 'Preference', description: t('layers.preference.description') },
    { token: 'Eo', description: t('layers.eo.description') },
    { token: 'I / O', description: t('layers.io.description') },
    { token: '≻', description: t('layers.symbol.description') },
    { token: 'Prefeo™', description: t('layers.sum.description') },
  ]

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer('bg-muted/50')}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — the manifest */}
          <AnimateOnScroll className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
              {t('title')}
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-muted-foreground">{t('body1')}</p>
              <p className="text-muted-foreground">{t('body2')}</p>
            </div>
          </AnimateOnScroll>

          {/* Right — the semantic layers */}
          <AnimateOnScroll delay={0.1}>
            <dl className="divide-border divide-y">
              {layers.map((layer) => (
                <div key={layer.token} className="py-6 first:pt-0 last:pb-0">
                  <dt className="text-lg leading-tight font-medium text-[#8D0FF9]">
                    {layer.token}
                  </dt>
                  <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {layer.description}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
