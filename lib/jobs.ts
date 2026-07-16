import { createServerClient } from './supabase/server'

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
