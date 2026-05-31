# Deployment Quick Start

## 1️⃣ Initial Setup (One-time)

### Create GCP Project
```bash
gcloud projects create knowme-portfolio --name="knowMe Portfolio"
export PROJECT_ID=$(gcloud config get-value project)
```

### Enable APIs
```bash
gcloud services enable run.googleapis.com \
  containerregistry.googleapis.com dns.googleapis.com \
  compute.googleapis.com artifactregistry.googleapis.com \
  monitoring.googleapis.com iam.googleapis.com sts.googleapis.com
```

### Setup Workload Identity (for GitHub Actions)
```bash
# Create pool and provider
gcloud iam workload-identity-pools create github-pool \
  --project=$PROJECT_ID --location=global --display-name=GitHub

gcloud iam workload-identity-providers create-oidc github-provider \
  --project=$PROJECT_ID --location=global --display-name=GitHub \
  --attribute-mapping='google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository' \
  --issuer-uri=https://token.actions.githubusercontent.com \
  --workload-identity-pool=github-pool

# Create service account
gcloud iam service-accounts create github-actions-sa --project=$PROJECT_ID

# Grant roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

# Allow GitHub to use service account
PROVIDER_NAME=$(gcloud iam workload-identity-providers describe github-provider \
  --project=$PROJECT_ID --location=global --format='value(name)')

gcloud iam service-accounts add-iam-policy-binding \
  github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com \
  --project=$PROJECT_ID \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_ID/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_USERNAME/knowme"
```

### Add GitHub Secrets
Go to GitHub → Settings → Secrets and add:
- `GCP_PROJECT_ID`: your-project-id
- `GCP_WORKLOAD_IDENTITY_PROVIDER`: (from above)
- `GCP_SERVICE_ACCOUNT`: github-actions-sa@your-project-id.iam.gserviceaccount.com

## 2️⃣ Deploy Infrastructure

### Deploy with Terraform
```bash
cd terraform
terraform init
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform plan
terraform apply
```

### Get nameservers and update domain
```bash
terraform output dns_zone_nameservers
# Update at your domain registrar
```

## 3️⃣ Push & Auto-Deploy

Just push to `main` branch:
```bash
git push origin main
```

GitHub Actions will automatically:
- Build Docker image
- Scan for vulnerabilities
- Deploy to Cloud Run
- Run health checks

Done! 🎉

## View Deployment

```bash
# Get service URL
gcloud run services describe knowme --region=us-central1 --format='value(status.url)'

# View logs
gcloud run logs read knowme --limit=50
```
