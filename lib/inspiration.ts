import { createServerClient } from './supabase/server'
import { WebsiteInspiration } from './supabase'

export interface InspirationPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  category: string
  content: string
}

// Transform database row to InspirationPost interface
function transformPost(row: WebsiteInspiration): InspirationPost {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    author: row.author,
    image: row.image,
    category: row.category,
    content: row.content,
  }
}

export async function getAllPosts(): Promise<InspirationPost[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_inspiration')
    .select('*')
    .eq('is_published', true)
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching inspiration posts:', error)
    return []
  }

  return (data || []).map(transformPost)
}

export async function getPostBySlug(slug: string): Promise<InspirationPost | null> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_inspiration')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    console.error('Error fetching inspiration post:', error)
    return null
  }

  return transformPost(data)
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_inspiration')
    .select('slug')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching slugs:', error)
    return []
  }

  return (data || []).map((post) => post.slug)
}

export async function getPostsByCategory(category: string): Promise<InspirationPost[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_inspiration')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }

  return (data || []).map(transformPost)
}

export async function getCategories(): Promise<string[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_inspiration')
    .select('category')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  const categories = [...new Set((data || []).map((post) => post.category))]
  return categories.sort()
}
