# knowMe

Personal portfolio and technical knowledge base for **Ritu Raj** — Senior Cloud DevOps & AI Solutions Engineer.

Live: `https://knowme-eikvyph5ga-uc.a.run.app`

## What's inside

- **Terminal-styled portfolio** — showcasing 10+ years of Cloud, DevOps & AI work
- **Knowledge base** — curated technical posts on CloudIQ, MCP/A2A agents, FinOps
- **Activity tracking** — lightweight page view logging
- **Fully automated CI/CD** — push to `main` → live in minutes

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | Tailwind CSS v3 (terminal theme) |
| Animations | Framer Motion v11 |
| Icons | Lucide React |
| Container Registry | Docker Hub (`riturajreso/knowme`) |
| Hosting | Google Cloud Run (serverless, scale-to-zero) |
| IaC | Terraform v5 (GCP) |
| CI/CD | GitHub Actions |

## Architecture

```
git push main
      ↓
GitHub Actions
  ├─ Build Docker image
  ├─ Push to Docker Hub (riturajreso/knowme)
  └─ Deploy to Google Cloud Run
            ↓
  https://knowme-eikvyph5ga-uc.a.run.app
```

## Quick links

- [How to deploy →](DEPLOYMENT.md)
- [How to add a blog post →](DEPLOYMENT.md#adding-blog-posts)
- [Terraform infrastructure →](terraform/README.md)
