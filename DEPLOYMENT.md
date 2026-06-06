# Deployment Guide

## Architecture

```
git push main
      ↓
GitHub Actions (.github/workflows/deploy.yml)
  ├─ Build Docker image
  ├─ Push to Docker Hub (riturajreso/knowme)
  └─ Deploy to Google Cloud Run
            ↓
  https://knowme-eikvyph5ga-uc.a.run.app
```

**Cloud Run config:** 1 CPU, 512Mi RAM, scale-to-zero (min 0), max 10 instances, us-central1

---

## One-time Setup (Already Done)

### GCP Project
- Project ID: `project-c258a344-7759-4d29-aa0`
- APIs enabled: `run.googleapis.com`, `iamcredentials.googleapis.com`

### Workload Identity Federation (keyless GitHub → GCP auth)
```bash
# Pool + provider
gcloud iam workload-identity-pools create "github-pool" \
  --project="project-c258a344-7759-4d29-aa0" \
  --location="global"

gcloud iam workload-identity-pools providers create-oidc "github-provider" \
  --project="project-c258a344-7759-4d29-aa0" \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='riturajreso/knowme'"

# Service account
gcloud iam service-accounts create "github-actions-sa" \
  --project="project-c258a344-7759-4d29-aa0"

gcloud projects add-iam-policy-binding "project-c258a344-7759-4d29-aa0" \
  --member="serviceAccount:github-actions-sa@project-c258a344-7759-4d29-aa0.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding "project-c258a344-7759-4d29-aa0" \
  --member="serviceAccount:github-actions-sa@project-c258a344-7759-4d29-aa0.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

### GitHub Secrets (set in repo Settings → Secrets → Actions)
| Secret | Value |
|---|---|
| `GCP_PROJECT_ID` | `project-c258a344-7759-4d29-aa0` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/<number>/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `GCP_SERVICE_ACCOUNT` | `github-actions-sa@project-c258a344-7759-4d29-aa0.iam.gserviceaccount.com` |
| `DOCKERHUB_USERNAME` | `riturajreso` |
| `DOCKERHUB_TOKEN` | Docker Hub personal access token (Read & Write) |

---

## Deploy

Every push to `main` triggers the pipeline automatically:
```bash
git add -A
git commit -m "your message"
git push
```

Watch progress at: `https://github.com/riturajreso/knowme/actions`

---

## Terraform (Infrastructure)

State is stored locally in `terraform/terraform.tfstate`.

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

`terraform.tfvars` is gitignored. Re-create it if needed:
```hcl
gcp_project_id  = "project-c258a344-7759-4d29-aa0"
gcp_region      = "us-central1"
service_name    = "knowme"
container_image = ""
domain_name     = "knowme.rituraj.in"
min_instances   = 0
max_instances   = 10
```

---

## Custom Domain (Future)

When you buy `rituraj.in`:

1. Verify domain ownership at `https://search.google.com/search-console`
   - Add property → Domain → `rituraj.in`
   - Add the TXT record to your registrar's DNS
2. Uncomment the `google_cloud_run_domain_mapping` block in `terraform/main.tf`
3. Run `terraform apply`
4. Run `gcloud run domain-mappings describe --domain=knowme.rituraj.in --region=us-central1`
5. Add the A/AAAA records shown to your registrar's DNS
6. SSL certificate provisions automatically within ~15 minutes

---

## Adding Blog Posts

Edit `content/posts.json` — append a new object to the array:

```json
{
  "slug": "your-post-slug",
  "title": "Post Title",
  "detail": "Short description shown on listing card.",
  "tag": "DevOps",
  "imagePath": "/posts/your-image.svg",
  "readTime": "5 min",
  "date": "2026-06-06",
  "intro": "Opening paragraph of the post.",
  "sections": [
    {
      "heading": "Section Title",
      "paragraphs": [
        "Paragraph one.",
        "Paragraph two."
      ],
      "bullets": [
        "Optional bullet",
        "Another bullet"
      ]
    }
  ]
}
```

- `slug` becomes the URL: `/knowledge-base/your-post-slug`
- `bullets` is optional per section
- `imagePath` per section is optional
- Push to `main` to deploy

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Build and test Docker image locally:
```bash
docker build -t knowme .
docker run -p 3000:3000 knowme
```
