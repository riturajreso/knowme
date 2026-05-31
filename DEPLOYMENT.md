# DevOps Infrastructure Setup Guide

## Overview

This DevOps infrastructure enables:
- ✅ Automated deployment via GitHub Actions
- ✅ Container orchestration on Google Cloud Run
- ✅ Custom domain with managed SSL certificates
- ✅ CDN and load balancing for performance
- ✅ Monitoring and alerting
- ✅ Infrastructure as Code with Terraform

## Architecture

```
GitHub Repository (Push to main)
         ↓
GitHub Actions CI/CD Pipeline
    ├─ Build Docker Image
    ├─ Push to Artifact Registry
    ├─ Security Scanning (Trivy)
    └─ Deploy to Cloud Run
         ↓
Google Cloud Run (Serverless)
    ├─ Auto-scaling (1-100 instances)
    ├─ Custom Domain (knowme.com)
    └─ Cloud DNS + SSL Certificate
         ↓
Cloud CDN (Content Delivery Network)
    └─ Cache static assets globally
```

## Prerequisites

### 1. GCP Account Setup

```bash
# Create GCP project
gcloud projects create knowme-portfolio

# Set project as default
export PROJECT_ID=$(gcloud config get-value project)

# Enable billing
gcloud billing projects link $PROJECT_ID --billing-account=BILLING_ACCOUNT_ID
```

### 2. Workload Identity Federation (OIDC)

This allows GitHub Actions to authenticate with GCP without storing long-lived credentials.

```bash
# Enable required APIs
gcloud services enable iap.googleapis.com
gcloud services enable sts.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
gcloud services enable iam.googleapis.com

# Create Workload Identity Pool
gcloud iam workload-identity-pools create github-pool \
  --project=$PROJECT_ID \
  --location=global \
  --display-name=GitHub

# Create Workload Identity Provider
gcloud iam workload-identity-providers create-oidc github-provider \
  --project=$PROJECT_ID \
  --location=global \
  --display-name=GitHub \
  --attribute-mapping=google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner \
  --issuer-uri=https://token.actions.githubusercontent.com \
  --workload-identity-pool=github-pool

# Get pool and provider info
WORKLOAD_IDENTITY_PROVIDER=$(gcloud iam workload-identity-providers describe github-provider \
  --project=$PROJECT_ID \
  --location=global \
  --format='value(name)')

echo "Workload Identity Provider: $WORKLOAD_IDENTITY_PROVIDER"
```

### 3. Service Account Setup

```bash
# Create service account for GitHub Actions
gcloud iam service-accounts create github-actions-sa \
  --project=$PROJECT_ID \
  --display-name="GitHub Actions Service Account"

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/compute.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/dns.admin"

# Allow GitHub to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding \
  github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com \
  --project=$PROJECT_ID \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_ID/locations/global/workloadIdentityPools/github-pool/attribute.repository/riturajreso/knowme"

SERVICE_ACCOUNT_EMAIL="github-actions-sa@$PROJECT_ID.iam.gserviceaccount.com"
echo "Service Account: $SERVICE_ACCOUNT_EMAIL"
```

## GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

1. **GCP_PROJECT_ID**
   ```
   your-gcp-project-id
   ```

2. **GCP_WORKLOAD_IDENTITY_PROVIDER**
   ```
   projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider
   ```

3. **GCP_SERVICE_ACCOUNT**
   ```
   github-actions-sa@PROJECT_ID.iam.gserviceaccount.com
   ```

Replace `PROJECT_NUMBER` and `PROJECT_ID` with your actual values.

## Terraform Deployment

### Step 1: Initialize Terraform

```bash
cd terraform
terraform init
```

### Step 2: Configure Variables

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
gcp_project_id   = "your-project-id"
container_image  = "us-central1-docker.pkg.dev/your-project-id/knowme-repo/knowme:latest"
domain_name      = "knowme.com"
```

### Step 3: Review and Apply

```bash
# Review changes
terraform plan

# Deploy infrastructure
terraform apply
```

### Step 4: Get Nameservers

```bash
terraform output dns_zone_nameservers
```

Update your domain registrar with these nameservers.

## Docker Image Build & Push

```bash
# Authenticate Docker
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build image (from repo root, not terraform/)
docker build -t us-central1-docker.pkg.dev/$PROJECT_ID/knowme-repo/knowme:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/$PROJECT_ID/knowme-repo/knowme:latest
```

## Deployment Workflow

### Automatic Deployment (via GitHub Actions)

```
1. Push to main branch
   ↓
2. GitHub Actions triggers:
   - Builds Docker image
   - Scans for security vulnerabilities (Trivy)
   - Pushes to Artifact Registry
   - Deploys to Cloud Run
   - Runs health checks
   ↓
3. Service available at https://knowme.com
```

### Manual Deployment

```bash
# Deploy specific image
gcloud run deploy knowme \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/knowme-repo/knowme:latest \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 100
```

## Monitoring & Logging

### View Logs

```bash
# Real-time logs
gcloud run logs read knowme --limit=50 --region=us-central1

# Detailed logs
gcloud run logs read knowme --region=us-central1 --format=json
```

### View Metrics

```bash
# Check service status
gcloud run services describe knowme --region=us-central1

# Get service URL
gcloud run services describe knowme --region=us-central1 --format='value(status.url)'
```

### Create Alerts

Terraform automatically creates alerts for:
- **High latency** (>1s response time)
- **High error rate** (>5% 5xx errors)

View alerts:
```bash
gcloud alpha monitoring policies list
```

## Cost Optimization

1. **Cloud Run**: Pay per invocation (~$0.40 per million requests)
2. **Artifact Registry**: $0.40 per GB stored
3. **Cloud DNS**: $0.20 per zone per month
4. **Cloud CDN**: $0.085 per GB cache egress
5. **Cloud Storage**: $0.020 per GB per month

### Reduce Costs

```bash
# Lower minimum instances
terraform apply -var="min_instances=0"

# Set memory to 256Mi (minimum)
gcloud run deploy knowme --memory 256Mi

# Enable CDN caching
# Already configured in load_balancer.tf
```

## Cleanup

```bash
# Destroy infrastructure
terraform destroy

# Delete GCP project (if desired)
gcloud projects delete $PROJECT_ID
```

## Troubleshooting

### GitHub Actions failing

```bash
# Check workflow logs in GitHub Actions tab
# Common issues:
# - Service account not configured correctly
# - Workload Identity Provider path incorrect
# - Missing GCP secrets
```

### Cloud Run service not responding

```bash
# Check service status
gcloud run services describe knowme --region=us-central1

# View recent logs
gcloud run logs read knowme --limit=20

# Check for errors
gcloud run logs read knowme --region=us-central1 | grep ERROR
```

### Domain not working

```bash
# Check DNS records
nslookup knowme.com
dig knowme.com

# Verify Cloud Run domain mapping
gcloud run domain-mappings list

# Check SSL certificate status
gcloud compute ssl-certificates list
```

### Image won't build

```bash
# Check Docker daemon
docker ps

# Build locally first
docker build .

# View build output
docker build --progress=plain .
```

## Security Best Practices

1. ✅ **Workload Identity Federation**: No long-lived credentials
2. ✅ **Image Scanning**: Trivy scans for vulnerabilities
3. ✅ **Least Privilege IAM**: Service account has minimal required roles
4. ✅ **HTTPS/SSL**: Managed certificate on custom domain
5. ✅ **VPC Service Controls**: Optional additional layer
6. ✅ **Secrets Management**: Use GCP Secret Manager for sensitive data

```bash
# Store secrets in GCP Secret Manager
echo -n "my-secret" | gcloud secrets create my-secret --data-file=-

# Reference in Cloud Run
gcloud run deploy knowme \
  --set-secrets MY_SECRET=my-secret:latest
```

## Next Steps

1. Update domain registrar with nameservers from `terraform output`
2. Wait 24-48 hours for DNS propagation
3. Verify SSL certificate is active: https://knowme.com
4. Configure monitoring alerts with email/Slack
5. Set up backup strategy for Cloud Storage

## Useful Commands

```bash
# Deploy latest image
./scripts/deploy.sh

# View real-time logs
gcloud run logs read knowme --stream

# Scale service
gcloud run services update knowme --max-instances 200

# Check deployment history
gcloud run revisions list

# Rollback to previous revision
gcloud run services update-traffic knowme --to-revisions=REVISION_NAME=100
```

## References

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Cloud DNS Setup](https://cloud.google.com/dns/docs)
