output "cloud_run_url" {
  description = "URL of the Cloud Run service"
  value       = google_cloud_run_service.knowme.status[0].url
}

output "domain_mapping_url" {
  description = "Custom domain URL"
  value       = "https://${var.domain_name}"
}

output "dns_zone_nameservers" {
  description = "Nameservers for the DNS zone"
  value       = google_dns_managed_zone.knowme.name_servers
}

output "artifact_registry_repository" {
  description = "Artifact Registry repository URL"
  value       = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.knowme.repository_id}"
}

output "service_account_email" {
  description = "Service account email for Cloud Run"
  value       = google_service_account.cloud_run.email
}

output "storage_bucket_name" {
  description = "Cloud Storage bucket name for assets"
  value       = google_storage_bucket.knowme_assets.name
}

output "dns_zone_name" {
  description = "Cloud DNS zone name"
  value       = google_dns_managed_zone.knowme.name
}
