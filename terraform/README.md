# Terraform — knowMe Infrastructure

Manages GCP infrastructure for the knowMe portfolio.

## What it provisions

- **Cloud Run v2 service** — serverless Next.js container, scale-to-zero
- **Cloud Run IAM** — public (`allUsers`) invoker access
- API enablement: `run.googleapis.com`

## Resources NOT managed here

| Resource | Managed by |
|---|---|
| Docker image | GitHub Actions → Docker Hub |
| CI/CD pipeline | GitHub Actions |
| Domain mapping | Commented out (needs domain purchase + verification) |

## State

Stored locally in `terraform.tfstate` (gitignored). Keep this file safe — it tracks all GCP resources.

## Usage

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

## terraform.tfvars

Gitignored — create locally:

```hcl
gcp_project_id  = "project-c258a344-7759-4d29-aa0"
gcp_region      = "us-central1"
service_name    = "knowme"
container_image = ""
domain_name     = "knowme.rituraj.in"
min_instances   = 0
max_instances   = 10
```

`container_image = ""` uses the placeholder `us-docker.pkg.dev/cloudrun/container/hello:latest`. GitHub Actions updates the image on every deploy via `gcloud run deploy --image`.

## Adding custom domain (future)

1. Buy `rituraj.in` from any registrar
2. Verify ownership at https://search.google.com/search-console
3. Uncomment the `google_cloud_run_domain_mapping` block in `main.tf`
4. Run `terraform apply`
5. Get DNS records: `gcloud run domain-mappings describe --domain=knowme.rituraj.in --region=us-central1`
6. Add A/AAAA records to your registrar — SSL provisions automatically
