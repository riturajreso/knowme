# README for Terraform Configuration

## Overview
This Terraform configuration sets up a complete infrastructure for the knowMe portfolio website on Google Cloud Platform, including:

- **Cloud Run**: Serverless container deployment
- **Artifact Registry**: Private Docker registry
- **Cloud DNS**: Domain name management
- **Cloud Monitoring**: Alerts and monitoring
- **Cloud Storage**: Asset storage
- **SSL Certificate**: HTTPS support
- **Load Balancing**: CDN and traffic distribution

## Prerequisites

1. **Google Cloud Account**
   ```bash
   gcloud init
   gcloud auth application-default login
   ```

2. **Terraform** (v1.0+)
   ```bash
   terraform --version
   ```

3. **GCP Project Setup**
   ```bash
   gcloud projects create knowme --name="knowMe Portfolio"
   export PROJECT_ID=$(gcloud config get-value project)
   gcloud config set project $PROJECT_ID
   ```

4. **Enable Required APIs**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   gcloud services enable dns.googleapis.com
   gcloud services enable compute.googleapis.com
   gcloud services enable artifactregistry.googleapis.com
   gcloud services enable monitoring.googleapis.com
   ```

## Setup Instructions

### 1. Initialize Terraform

```bash
cd terraform
terraform init
```

### 2. Configure Variables

Copy the example file and update with your values:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars`:
```hcl
gcp_project_id   = "your-gcp-project-id"
gcp_region       = "us-central1"
container_image  = "us-central1-docker.pkg.dev/your-project-id/knowme-repo/knowme:latest"
domain_name      = "knowme.com"
```

### 3. Plan Deployment

```bash
terraform plan -out=tfplan
```

Review the proposed changes.

### 4. Apply Configuration

```bash
terraform apply tfplan
```

### 5. Update Domain DNS

After applying, get the nameservers from Terraform output:

```bash
terraform output dns_zone_nameservers
```

Update your domain registrar to use these nameservers.

## Docker Image

Build and push your image to Artifact Registry:

```bash
# Configure Docker authentication
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build image
docker build -t us-central1-docker.pkg.dev/$PROJECT_ID/knowme-repo/knowme:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/$PROJECT_ID/knowme-repo/knowme:latest

# Update Terraform variable
terraform apply -var="container_image=us-central1-docker.pkg.dev/$PROJECT_ID/knowme-repo/knowme:latest"
```

## Monitoring

View logs:
```bash
gcloud run logs read knowme --region=us-central1 --limit=50
```

View metrics:
```bash
gcloud monitoring dashboards list
```

## Cleanup

To destroy all infrastructure:

```bash
terraform destroy
```

## Important Files

- `main.tf` - Main infrastructure resources
- `variables.tf` - Input variables
- `outputs.tf` - Output values
- `load_balancer.tf` - CDN and load balancing
- `ci_cd.tf` - CI/CD infrastructure
- `terraform.tfvars` - **DO NOT COMMIT** - Local configuration

## Security Best Practices

1. **Never commit `terraform.tfvars`** - Add to `.gitignore`
2. **Use Terraform Cloud** for remote state management
3. **Restrict IAM permissions** to least privilege
4. **Enable VPC Service Controls** for additional security
5. **Rotate service account keys** regularly
6. **Use secrets management** for sensitive data

## Troubleshooting

### Issue: Cloud Run service not responding
```bash
gcloud run services describe knowme --region=us-central1
gcloud run logs read knowme --region=us-central1
```

### Issue: Domain not resolving
```bash
# Check DNS propagation
nslookup knowme.com
dig knowme.com

# Check Cloud Run domain mapping
gcloud run domain-mappings list
```

### Issue: SSL certificate pending
SSL certificates can take up to 15 minutes to issue. Monitor at:
```bash
gcloud compute ssl-certificates list
```

## Cost Optimization

- Cloud Run charges for invocations and compute time
- Use CDN caching for static assets
- Set appropriate min/max instances
- Monitor Cloud Logging for errors
- Use Cloud Monitoring to track usage

## References

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Terraform Google Provider](https://registry.terraform.io/providers/hashicorp/google)
- [Cloud DNS Documentation](https://cloud.google.com/dns/docs)
