## Project: Personal Portfolio Website

### Tech Stack
- **Framework**: Next.js 15 (App Router) with TypeScript. Use server components by default;
  add `"use client"` only when needed for interactivity or browser APIs.
- **Styling**: Tailwind CSS v3 + shadcn/ui component library. No custom CSS files unless
  absolutely necessary. All styling via Tailwind utility classes.
- **Animations**:
  - Framer Motion — for component-level animations: scroll reveals with `useInView`,
    page transitions with `AnimatePresence`, hover/tap effects with `whileHover`/`whileTap`.
  - GSAP + ScrollTrigger — for complex timeline animations: career timeline, pinned scroll
    sequences, character-by-character text reveals. Always register ScrollTrigger plugin.
- **3D** (optional): React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
  for WebGL hero section and particle effects. Only used in client components.
- **Icons**: Lucide React.
- **Deployment**: Docker (multi-stage, node:18-alpine base) → Google Artifact Registry →
  Google Cloud Run → Custom domain. Next.js `output: 'standalone'` is set in next.config.ts.

### Folder Structure
app/
  layout.tsx          # Root layout with font + ThemeProvider
  page.tsx            # Single-page portfolio (all sections)
  api/contact/        # Contact form API route
components/
  sections/           # Hero, About, Skills, Projects, Resume, Contact
  ui/                 # shadcn/ui components
  animations/         # Reusable Framer Motion wrappers (FadeIn, SlideUp, etc.)
public/
  resume.pdf

### Conventions
- All animation wrapper components live in `components/animations/` and accept `children`
  + optional `delay` and `duration` props.
- Framer Motion variants are defined outside components to avoid re-creation on render.
- GSAP animations always run inside `useLayoutEffect` with a cleanup `ctx.revert()`.
- shadcn/ui components are the first choice for any UI primitive (Button, Card, Dialog, etc.).
- Images use Next.js `<Image>` component — never raw `<img>` tags.
- Environment variables for API keys use `NEXT_PUBLIC_` prefix only if needed on the client.
- TypeScript strict mode is enabled. No `any` types.
- Prefer named exports over default exports for components.

### Docker Context
- `output: 'standalone'` is set — do not suggest changes that break standalone output.
- Cloud Run injects `PORT` env var. The app runs on port 3000.
- Do not add runtime dependencies that aren't in package.json — the standalone build won't
  include them.