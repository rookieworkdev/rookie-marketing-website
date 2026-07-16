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
      <div className={sectionContainer()}>
        {/* Title */}
        <AnimateOnScroll className="max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
            {t('title')}
          </h2>
          <div className="mt-6 space-y-4 italic">
            <p className="text-muted-foreground">{t('body1')}</p>
            <p className="text-muted-foreground">{t('body2')}</p>
            <p className="text-muted-foreground">{t('body3')}</p>
          </div>
        </AnimateOnScroll>

        {/* Semantic layers as cards below the title (3 columns × 2 rows) */}
        <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer, index) => (
            <AnimateOnScroll
              key={layer.token}
              delay={index * 0.1}
              className="bg-muted flex flex-col gap-2 rounded-2xl p-6"
            >
              <dt
                className="w-fit text-lg leading-tight font-medium"
                style={{
                  backgroundImage: 'linear-gradient(128deg, #093CDF 20%, #8D0FF9 80%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {layer.token}
              </dt>
              <dd className="text-muted-foreground text-sm leading-relaxed">
                {layer.description}
              </dd>
            </AnimateOnScroll>
          ))}
        </dl>
      </div>
    </section>
  )
}
