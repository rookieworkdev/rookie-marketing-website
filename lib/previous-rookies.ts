import { createServerClient } from './supabase/server'
import { WebsiteRookie } from './supabase'

export interface PreviousRookie {
  id: string
  name: string
  city: string
  studies: string
  school: string
  month: string
  year: number
  imageSrc?: string
}

export interface CurrentRookie extends PreviousRookie {
  isCurrent: true
}

// Transform database row to PreviousRookie interface
function transformRookie(row: WebsiteRookie): PreviousRookie {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    studies: row.studies,
    school: row.school,
    month: row.month,
    year: row.year,
    imageSrc: row.image_src ?? undefined,
  }
}

export async function getPreviousRookies(): Promise<PreviousRookie[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_rookies')
    .select('*')
    .eq('is_current', false)
    .order('year', { ascending: false })
    .order('month', { ascending: false })

  if (error) {
    console.error('Error fetching previous rookies:', error)
    return []
  }

  return (data || []).map(transformRookie)
}

export async function getCurrentRookie(): Promise<PreviousRookie | null> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_rookies')
    .select('*')
    .eq('is_current', true)
    .single()

  if (error || !data) {
    console.error('Error fetching current rookie:', error)
    return null
  }

  return transformRookie(data)
}

export async function getAllRookies(): Promise<PreviousRookie[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_rookies')
    .select('*')
    .order('year', { ascending: false })
    .order('month', { ascending: false })

  if (error) {
    console.error('Error fetching all rookies:', error)
    return []
  }

  return (data || []).map(transformRookie)
}

export async function getRookieById(id: string): Promise<PreviousRookie | null> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase.from('website_rookies').select('*').eq('id', id).single()

  if (error || !data) {
    console.error('Error fetching rookie:', error)
    return null
  }

  return transformRookie(data)
}
