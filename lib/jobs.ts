import { createServerClient } from './supabase/server'
import { JobRow } from './supabase'

// Simplified job display type for the marketing site
export interface JobDisplay {
  id: string
  title: string
  companyName: string | null
  serviceType: string | null
  regionName: string | null
  location: string | null
}


/**
 * Fetches the latest published jobs for the marketing site preview.
 * Resolves company display (respects show_branding) and region names.
 */
export async function getLatestJobs(limit = 8): Promise<JobDisplay[]> {
  const supabase = createServerClient()

  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('id, title, location, service_type, companies(name, show_branding), regions(name_sv)' as never)
    .eq('is_published', true)
    .or('expires_at.is.null,expires_at.gt.now()')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error || !jobs?.length) {
    if (error) console.error('Error fetching latest jobs:', error)
    return []
  }

  type JobWithRelations = { id: string; title: string; location: string | null; service_type: string | null; companies: { name: string; show_branding: boolean } | null; regions: { name_sv: string } | null }

  return (jobs as unknown as JobWithRelations[]).map((job) => ({
    id: job.id,
    title: job.title,
    companyName: job.companies?.show_branding ? job.companies.name : null,
    serviceType: job.service_type ?? null,
    regionName: job.regions?.name_sv ?? null,
    location: job.location,
  }))
}

export interface Job {
  id: string
  title: string
  company: string
  description: string
  location: string
  category: string
  externalUrl: string
  postedDate: string
}

// Row type with joined companies relation
type JobWithCompany = JobRow & {
  companies: { name: string } | null
}

// Transform database row to Job interface
function transformJob(row: JobWithCompany): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.companies?.name ?? '',
    description: row.description ?? '',
    location: row.location ?? '',
    category: row.category ?? '',
    externalUrl: row.external_url ?? row.application_url ?? '',
    postedDate: row.posted_date ?? '',
  }
}

export async function getAvailableJobs(): Promise<Job[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(name)')
    .eq('is_published', true)
    .order('posted_date', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return (data || []).map(transformJob)
}

export async function getJobById(id: string): Promise<Job | null> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(name)')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    console.error('Error fetching job:', error)
    return null
  }

  return transformJob(data)
}

export async function getJobsByCategory(category: string): Promise<Job[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(name)')
    .eq('category', category)
    .eq('is_published', true)
    .order('posted_date', { ascending: false })

  if (error) {
    console.error('Error fetching jobs by category:', error)
    return []
  }

  return (data || []).map(transformJob)
}

export async function getJobsByLocation(location: string): Promise<Job[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(name)')
    .eq('location', location)
    .eq('is_published', true)
    .order('posted_date', { ascending: false })

  if (error) {
    console.error('Error fetching jobs by location:', error)
    return []
  }

  return (data || []).map(transformJob)
}

// Get unique categories from all jobs
export async function getJobCategories(): Promise<string[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('category')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching job categories:', error)
    return []
  }

  const categories = [...new Set((data || []).filter((job) => job.category != null).map((job) => job.category as string))]
  return categories.sort()
}

// Get unique locations from all jobs
export async function getJobLocations(): Promise<string[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('jobs')
    .select('location')
    .eq('is_published', true)

  if (error) {
    console.error('Error fetching job locations:', error)
    return []
  }

  const locations = [...new Set((data || []).filter((job) => job.location != null).map((job) => job.location as string))]
  return locations.sort()
}
