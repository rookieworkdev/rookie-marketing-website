# Go-Live Action Plan: rookiework.se → rookiework.com

Migration from the current WordPress site at rookiework.se to the new Next.js site at rookiework.com.

---

## Pre-launch checklist

Before touching any DNS or domains, make sure these are done:

- [ ] All pages reviewed and approved (home, candidates, companies, inspiration, policy)
- [ ] All 30 inspiration articles verified in Supabase (published and rendering correctly)
- [ ] Swedish translations complete and reviewed (`/sv` routes)
- [ ] Contact email still uses info@rookiework.se — decide if this stays or moves to @rookiework.com
- [ ] Environment variables set in Vercel production (NEXT_PUBLIC_SITE_URL, Supabase keys, etc.)
- [ ] Supabase project accessible from production (no IP restrictions, correct API keys)
- [ ] Test the Vercel subdomain deployment end-to-end

---

## Phase 1: Launch rookiework.com

**Goal:** Get the new site live on rookiework.com while the old .se site continues running.

1. **Add rookiework.com as custom domain in Vercel**
   - Vercel Dashboard → Project → Settings → Domains → Add `rookiework.com`
   - Vercel will provide DNS records (either A record or CNAME)

2. **Update rookiework.com DNS**
   - Point `rookiework.com` to Vercel (A record: `76.76.21.21` or CNAME to `cname.vercel-dns.com`)
   - Point `www.rookiework.com` to Vercel as well (the config redirects www → non-www)
   - SSL certificate is provisioned automatically by Vercel

3. **Verify rookiework.com is working**
   - Check all pages load: `/`, `/sv`, `/candidates`, `/sv/candidates`, `/companies`, `/sv/companies`, `/inspiration`, `/sv/inspiration`, `/policy`, `/sv/policy`
   - Check a few article pages in both locales
   - Confirm `www.rookiework.com` redirects to `rookiework.com`
   - Confirm sitemap is accessible at `rookiework.com/sitemap.xml`

At this point both sites run in parallel. No SEO impact on the old site yet.

---

## Phase 2: Migrate rookiework.se traffic

**Goal:** Point .se traffic to the new site. This is the point of no return for the WordPress site.

1. **Add rookiework.se domains in Vercel**
   - Add `rookiework.se` and `www.rookiework.se` as domains in the same Vercel project
   - Do NOT set either as primary — `rookiework.com` remains primary

2. **Update rookiework.se DNS to point to Vercel**
   - Change A/CNAME records for `rookiework.se` and `www.rookiework.se` to point to Vercel
   - This takes the WordPress site offline — the new site handles all traffic
   - DNS propagation can take up to 48 hours, though usually much faster

3. **Verify redirects are working**
   - `rookiework.se/` → `rookiework.com/sv`
   - `rookiework.se/for-foretag/` → `rookiework.com/sv/companies`
   - `rookiework.se/for-jobbsokande/` → `rookiework.com/sv/candidates`
   - `rookiework.se/inspiration/arbetsintervju` → `rookiework.com/sv/inspiration/arbetsintervju`
   - `rookiework.se/integritetspolicy/` → `rookiework.com/sv/policy`
   - `rookiework.se/om-oss/` → `rookiework.com/sv`
   - `rookiework.se/some-random-page` → `rookiework.com/sv` (catch-all)
   - All redirects should return HTTP 301 (permanent)

---

## Phase 3: Google Search Console and SEO

**Goal:** Tell Google about the migration so search rankings transfer cleanly.

1. **Add and verify rookiework.com in Google Search Console**
   - Add as a new property (domain-level verification preferred)
   - Submit the sitemap: `https://rookiework.com/sitemap.xml`

2. **Use the Change of Address tool**
   - In Google Search Console for the rookiework.se property
   - Go to Settings → Change of Address
   - Select rookiework.com as the new site
   - This signals to Google that the site has moved and rankings should transfer

3. **Monitor the migration**
   - Check the "Coverage" report in Search Console for both properties over the next few weeks
   - Old .se URLs should show as "Page with redirect" (this is normal and expected)
   - New .com URLs should start appearing in the index
   - Watch for any crawl errors or 404s on the new site

4. **Update external references**
   - Google Business Profile — update website URL to rookiework.com
   - LinkedIn company page
   - Any other directory listings or partner sites linking to rookiework.se

---

## Phase 4: Post-launch cleanup

**After 3-6 months, once Google has fully reindexed:**

- [ ] Verify in Search Console that .se URLs are no longer being served in search results
- [ ] Cancel WordPress hosting (the old site's server)
- [ ] Keep the rookiework.se domain registered and DNS pointing to Vercel — do not let it expire
- [ ] Keep the redirects in `next.config.ts` permanently — old bookmarks and backlinks will use them indefinitely

---

## Redirect reference

All redirects are configured in `next.config.ts`. Here's what's mapped:

### Pages

| rookiework.se path | rookiework.com destination |
|---|---|
| `/` | `/sv` |
| `/for-foretag` | `/sv/companies` |
| `/sok-personal` | `/sv/companies` |
| `/for-jobbsokande` | `/sv/candidates` |
| `/sok-jobb` | `/sv/candidates` |
| `/lediga-jobb` | `/sv/candidates` |
| `/kontakt` | `/sv` |
| `/om-oss` | `/sv` |
| `/manadens-rookie` | `/sv` |
| `/guide-rekrytering` | `/sv/inspiration` |
| `/integritetspolicy` | `/sv/policy` |
| `/visselblasning` | `/sv/policy` |
| `/inspiration` | `/sv/inspiration` |
| `/inspiration/category/*` | `/sv/inspiration` |

### Articles (30 total, same slugs)

Pattern: `/inspiration/:slug` → `/sv/inspiration/:slug`

### Catch-all

Any other `.se` path → `/sv`

### www

`www.rookiework.com/*` → `rookiework.com/*`

---

## Important notes

- The .se domain must stay registered and pointing to Vercel for as long as there are backlinks to it (ideally forever)
- All redirects are 301 (permanent) which is correct for a domain migration
- The old WordPress site can be shut down once .se DNS points to Vercel — the WordPress server is no longer needed
- If new pages are added to the old .se site before migration, add corresponding redirects in `next.config.ts`
