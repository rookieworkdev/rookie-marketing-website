import { InspirationCard } from '@/components/inspiration-card'
import { InspirationPost } from '@/lib/inspiration'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

interface InspirationGridSectionProps {
  posts: InspirationPost[]
}

export default async function InspirationGridSection({ posts }: InspirationGridSectionProps) {
  const t = await getTranslations('inspirationGrid')

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <InspirationCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                author={post.author}
                image={post.image}
                category={post.category}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <p>{t('noPosts')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
