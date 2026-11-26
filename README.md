# PixelCraft Web Studio (starter, in progress)

## Run locally
1. `npm install`
2. `cp .env.example .env.local` and fill in your Supabase URL and anon key
3. In Supabase, run `supabase/schema.sql` in the SQL Editor
4. `npm run dev` then open http://localhost:3000

## Deploy
Push to GitHub, import the repo in Vercel, and add the same environment variables.

## Done so far
Futuristic layer: interactive particle network, glow, glass cards with cursor spotlight, loading screen, scroll progress, back-to-top, staggered reveals (all respect reduced motion where noted).

Home, Contact (validated, saves to Supabase), 404, robots, sitemap, SEO metadata, `enquiries` table with RLS.

## Not built yet
About, Services, Portfolio and project pages, Pricing, multi-step Quote, FAQ, Blog, dark/light toggle, loading screen, email via Resend, /admin dashboard, and the projects, services, blog_posts and pricing_packages tables.

## Not yet verified
This starter was written without network access, so `npm install` and `npm run build` have not been run. Run them first and report any errors.
