# Supabase Setup & Data Fetching Strategy

## Overview

This document explains our Supabase data fetching architecture and best practices for the Rookie website.

## Architecture Decision

We use **server-side data fetching** as the primary strategy for all read operations, with client-side interactions limited to form submissions and user interactions.

### Why Server-Side Fetching?

1. **Better SEO** - Content is fully rendered server-side and indexed by search engines
2. **Faster Initial Load** - No client-side hydration delay for data
3. **Smaller Bundle Size** - Data fetching code doesn't ship to the browser
4. **Better Security** - Database queries happen server-side
5. **Automatic Caching** - Next.js can cache and revalidate server-fetched data
6. **Static Generation** - Pages can be statically generated at build time

## Supabase Clients

We maintain two separate Supabase client configurations:

### Server Client (`lib/supabase/server.ts`)

Used for **Server Components**, **Server Actions**, and **Route Handlers**.

```typescript
import { createServerClient } from '@/lib/supabase/server'

// In a Server Component or Server Action
const supabase = createServerClient()
const { data, error } = await supabase.from('table_name').select('*')
```

**Features:**
- Session persistence disabled (not needed on server)
- Auto-refresh tokens disabled
- URL-based auth detection disabled
- Optimized for server-side execution

### Client Client (`lib/supabase/client.ts`)

Used **only** for **Client Components** that require user interaction.

```typescript
import { supabase } from '@/lib/supabase/client'

// In a Client Component (marked with 'use client')
const { data, error } = await supabase.from('table_name').select('*')
```

**Use Cases:**
- Real-time subscriptions (if needed in the future)
- Client-side authentication flows
- Interactive features requiring immediate feedback

## Data Fetching Patterns

### 1. Server Components (Recommended for all read operations)

All pages that display data use async Server Components:

```typescript
// app/lediga-jobb/page.tsx
export default async function LedigaJobbPage() {
  const jobs = await getAvailableJobs()
  
  return <JobsGridSection jobs={jobs} />
}
```

### 2. Server Actions (Recommended for write operations)

Database mutations use Server Actions:

```typescript
// lib/actions/example.ts
'use server'

export async function updateJobStatus(jobId: string, isActive: boolean) {
  const supabase = createServerClient()
  const { error } = await supabase
    .from('job_ads')
    .update({ is_active: isActive })
    .eq('id', jobId)
  return { success: !error }
}
```

Used in Client Components:

```typescript
// components/example.tsx
'use client'

import { updateJobStatus } from '@/lib/actions/example'

const result = await updateJobStatus(jobId, false)
```

**Note:** Contact form submissions use webhooks (not Supabase) - see `lib/actions/contact.ts`.

## Revalidation Strategy

We use Next.js Incremental Static Regeneration (ISR) to balance performance and freshness:

| Page Type | Revalidation Interval | Reason |
|-----------|----------------------|--------|
| **Jobs Listing** (`/lediga-jobb`) | 1 hour (3600s) | Jobs are added/updated frequently |
| **Inspiration Posts** (`/inspiration`) | 2 hours (7200s) | Content updated less frequently |
| **Individual Post** (`/inspiration/[slug]`) | 2 hours (7200s) | Content rarely changes after publish |
| **Rookie of Month** (`/manadens-rookie`) | 1 day (86400s) | Updates monthly |
| **Homepage** (`/`) | 1 day (86400s) | Features current rookie |

### Setting Revalidation

```typescript
// In any page.tsx
export const revalidate = 3600 // Revalidate every hour
```

### Manual Revalidation

If you need to immediately update content:

```typescript
// In a Server Action or Route Handler
import { revalidatePath } from 'next/cache'

revalidatePath('/lediga-jobb')
```

## Database Tables

### job_ads
- Active job listings
- Filtered by `is_active = true`
- Ordered by `posted_date DESC`
- Company name accessed via JOIN on `company_id` → `companies.name`

### website_inspiration
- Blog posts and inspiration content
- Filtered by `is_published = true`
- Ordered by `date DESC`

### website_rookies
- Current and previous Rookies of the Month
- Current rookie: `is_current = true`
- Previous rookies: `is_current = false`

## Data Transformation

All data fetching functions include transformation layers to convert database schemas to application-friendly interfaces:

```typescript
// Database type (snake_case) with joined company
type JobAdWithCompany = JobAd & {
  companies: { name: string } | null
}

// Application type (camelCase)
type Job = {
  id: string
  company: string
  externalUrl: string
  postedDate: string
  // ...
}

function transformJob(row: JobAdWithCompany): Job {
  return {
    id: row.id,
    company: row.companies?.name ?? '',
    externalUrl: row.external_url ?? '',
    postedDate: row.posted_date ?? '',
  }
}
```

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note:** These are prefixed with `NEXT_PUBLIC_` because they're used in both server and client contexts. Supabase Row Level Security (RLS) policies protect your data.

## Security Considerations

1. **RLS Policies**: Ensure all tables have appropriate Row Level Security policies in Supabase
2. **Server Actions**: All write operations use Server Actions to keep database logic server-side
3. **Type Safety**: TypeScript types are generated from Supabase schema
4. **Error Handling**: All queries include error handling and logging

## Common Patterns

### Fetching a List

```typescript
export async function getAvailableJobs(): Promise<Job[]> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('job_ads')
    .select('*, companies(name)')
    .eq('is_active', true)
    .order('posted_date', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  return (data || []).map(transformJob)
}
```

### Fetching a Single Item

```typescript
export async function getPostBySlug(slug: string): Promise<InspirationPost | null> {
  const supabase = createServerClient()
  
  const { data, error } = await supabase
    .from('website_inspiration')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    console.error('Error fetching post:', error)
    return null
  }

  return transformPost(data)
}
```

### Static Params Generation

```typescript
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

## Best Practices

1. ✅ **Always use `createServerClient()` in Server Components and Server Actions**
2. ✅ **Use Server Actions for all write operations (inserts, updates, deletes)**
3. ✅ **Add appropriate revalidation intervals based on data freshness requirements**
4. ✅ **Handle errors gracefully and return fallback data**
5. ✅ **Transform database types to application types**
6. ✅ **Use TypeScript for type safety**
7. ❌ **Don't use the client Supabase instance in Server Components**
8. ❌ **Don't perform database writes directly from Client Components**

## Troubleshooting

### Data not updating
- Check revalidation settings
- Use `revalidatePath()` or `revalidateTag()` for manual updates
- Verify Supabase data in the Supabase dashboard

### Build errors
- Ensure environment variables are set
- Check TypeScript types match database schema
- Regenerate types: `npx supabase gen types typescript`

### Performance issues
- Add appropriate database indexes in Supabase
- Use `.select()` to only fetch needed columns
- Implement pagination for large datasets

## Future Considerations

- **Real-time subscriptions**: If needed, implement using client-side Supabase
- **Caching strategy**: Consider adding Redis for high-traffic scenarios
- **Edge functions**: Move some server logic to Supabase Edge Functions if needed
- **Database pooling**: Monitor connection usage and implement pooling if needed

