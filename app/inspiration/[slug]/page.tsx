import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { InspirationCard } from '@/components/inspiration-card'
import { PageHeader } from '@/components/page-header'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/inspiration'
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { sectionContainer, sectionWrapper } from '@/lib/utils'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

// Revalidate this page every 2 hours (7200 seconds)
// Individual posts are updated less frequently
export const revalidate = 7200

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    const t = await getTranslations('pages.inspirationPost')
    return {
      title: t('notFound'),
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/inspiration/${slug}`,
    },
    openGraph: {
      url: `/inspiration/${slug}`,
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [post.image],
      card: 'summary_large_image',
    },
  }
}

export default async function InspirationPostPage({ params }: PageProps) {
  const { slug } = await params
  const [post, t, tPost] = await Promise.all([
    getPostBySlug(slug),
    getTranslations('common'),
    getTranslations('pages.inspirationPost'),
  ])

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.category, 3)

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    slug: slug,
    date: post.date,
    author: post.author,
    image: post.image,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('home'), url: '/' },
    { name: 'Inspiration', url: '/inspiration' },
    { name: post.title, url: `/inspiration/${slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <HeroHeader />
      <main>
        {/* Hero Image Section with PageHeader */}
        <PageHeader
          breadcrumbs={[
            { label: t('home'), href: '/' },
            { label: 'Inspiration', href: '/inspiration' },
            { label: post.title },
          ]}
          image={post.image}
          imageAlt={post.title}
        >
          <div className="mt-auto max-w-4xl">
            <h1 className="text-foreground text-3xl font-medium tracking-tighter md:text-4xl xl:text-5xl">
              {post.title}
            </h1>
            <div className="text-muted-foreground mt-6 flex items-center gap-3">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('sv-SE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </div>
        </PageHeader>

        {/* Article Content */}
        <article className={sectionWrapper('bg-background')}>
          <div className={sectionContainer()}>
            <div className="mx-auto max-w-4xl">
              <div className="prose prose-lg prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-2xl prose-h4:mb-2 prose-h4:mt-6 prose-h4:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline prose-a:transition-colors hover:prose-a:underline prose-strong:font-semibold prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-pre:bg-muted prose-pre:p-4 prose-img:rounded-lg prose-hr:my-8 max-w-none [&>:last-child]:mb-0">
                <MDXRemote source={post.content} />
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className={sectionWrapper('bg-background')}>
            <div className={sectionContainer()}>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                {tPost('relatedPosts')}
              </h2>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <InspirationCard
                    key={relatedPost.slug}
                    slug={relatedPost.slug}
                    title={relatedPost.title}
                    description={relatedPost.description}
                    date={relatedPost.date}
                    author={relatedPost.author}
                    image={relatedPost.image}
                    category={relatedPost.category}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <FooterSection />
    </>
  )
}
