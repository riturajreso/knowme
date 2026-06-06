# knowMe — Personal Portfolio (Ritu Raj)

## Purpose
Personal portfolio + technical knowledge base for Ritu Raj, Senior Cloud DevOps & AI Solutions Engineer (Bangalore). Showcases CloudIQ AI platform, multi-agent MCP/A2A work, FinOps automation, 10+ yrs experience.

## Tech Stack
- **Next.js 15** App Router, TypeScript strict mode, React 18
- **Tailwind CSS v3** + custom terminal color theme (no custom CSS files)
- **Framer Motion v11** — component animations
- **Lucide React** — icons
- **Docker** (node:18-alpine, standalone output) → Google Artifact Registry → Cloud Run
- **Terraform v5** — GCP IaC (Cloud Run, CDN, DNS, SSL, Cloud Build CI/CD)

## Key Config
- `output: 'standalone'` in next.config.ts — required for Cloud Run, do NOT break
- `@/*` path alias maps to project root
- Tailwind custom colors: `terminal`, `terminalSurface`, `terminalAccent` (#8be9fd), `terminalBorder`
- Cloud Run: 1 CPU, 512Mi, 1-100 instances, PORT=3000

## Routes & Pages
| Route | File | Notes |
|-------|------|-------|
| `/` | app/page.tsx | Homepage + KB grid (client) |
| `/about` | app/about/page.tsx | Profile, certs, tech stack (client) |
| `/contact` | app/contact/page.tsx | Contact form via mailto (client) |
| `/knowledge-base` | app/knowledge-base/page.tsx | Full post listing (server) |
| `/knowledge-base/:slug` | app/knowledge-base/[slug]/page.tsx | Static post pages (server) |
| `GET/POST /api/activity` | app/api/activity/route.ts | Activity tracking |

## Components
- `components/Navbar.tsx` — sticky nav, mobile menu, Framer Motion links
- `components/ui/Button.tsx` — primary/ghost variants, optional href
- `components/ui/SectionHeading.tsx` — label + h2 layout
- `components/sections/TerminalHero.tsx` — CLI-style hero, staggered animations
- `components/sections/AboutSection.tsx` — about summary (server)
- `components/sections/ContactSection.tsx` — contact CTA (server)
- `components/sections/KnowledgeBaseSection.tsx` — topic cards (server)
- `components/analytics/ActivityTracker.tsx` — client-side page view POSTing

## Data & Content
- `content/posts.json` — 3 blog posts (CloudIQ, MCP/A2A, FinOps); fields: slug, title, detail, tag, imagePath, readTime, date, intro, sections[]
- `data/user-activity.json` — append-only activity log (UUID, type, path, postSlug, userAgent, ipAddress, createdAt)

## Lib
- `lib/posts.ts` — `getAllPosts()`, `getAllPostsMeta()`, `getPostBySlug(slug)`
- `lib/activity-store.ts` — `readActivities()`, `appendActivity()`, `ensureStore()` (Node fs/promises, server-side only)

## Deployment
- **GitHub Actions**: `.github/workflows/deploy.yml` (build → push to Artifact Registry → deploy Cloud Run), `lint.yml` (typecheck + eslint + build)
- **Dockerfile**: multi-stage, copies standalone + public + static
- **Terraform**: `terraform/` covers Cloud Run, DNS, SSL, CDN, CI/CD service accounts

## Design Language
- Terminal-first aesthetic (dark backgrounds, cyan accents, monospace)
- Framer Motion for all interactive animations
- shadcn/ui as first choice for UI primitives (partially adopted)
- Named exports preferred over default exports
- No `any` types — strict TypeScript enforced

## Add Content
To add a new post: append to `content/posts.json` with full post schema (slug, title, detail, tag, imagePath, readTime, date, intro, sections[]).