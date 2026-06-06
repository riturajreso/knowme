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

output "service_account_email" {
  description = "Service account email for Cloud Run"
  value       = google_service_account.cloud_run.email
}

output "dns_zone_name" {
  description = "Cloud DNS zone name"
  value       = google_dns_managed_zone.knowme.name
}
