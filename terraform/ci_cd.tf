resource "google_project_service" "artifact_registry" {
  service            = "artifactregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloud_build" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

# Service Account for Cloud Build
resource "google_service_account" "cloud_build" {
  account_id   = "${var.service_name}-cloud-build"
  display_name = "Cloud Build Service Account for ${var.service_name}"
}

# IAM: Cloud Build can push to Artifact Registry
resource "google_project_iam_member" "cloud_build_artifact_writer" {
  project = var.gcp_project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

# IAM: Cloud Build can deploy to Cloud Run
resource "google_project_iam_member" "cloud_build_cloud_run_deployer" {
  project = var.gcp_project_id
  role    = "roles/run.admin"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

# IAM: Cloud Build can act as service account
resource "google_project_iam_member" "cloud_build_service_account_user" {
  project = var.gcp_project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

output "cloud_build_service_account" {
  description = "Cloud Build service account email"
  value       = google_service_account.cloud_build.email
}
