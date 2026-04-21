import { InspirationCard } from '@/components/inspiration-card'
import { Button } from '@/components/ui/button'
import { getAllPosts } from '@/lib/inspiration'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function BlogSection() {
  const t = await getTranslations('blogSection')
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 3)

  if (latestPosts.length === 0) return null

  return (
    <section className={sectionWrapper('bg-background')}>
      <div className={sectionContainer()}>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
          </div>
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/inspiration">{t('viewMore')}</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
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
        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild variant="outline" size="sm">
            <Link href="/inspiration">{t('viewMore')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
