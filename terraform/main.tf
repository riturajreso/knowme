terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
  
  cloud {
    organization = "YOUR_ORG_NAME"  # Replace with your Terraform Cloud org
    
    workspaces {
      name = "knowme-production"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

provider "google-beta" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# Enable required APIs
resource "google_project_service" "cloud_run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "container_registry" {
  service            = "containerregistry.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "compute" {
  service            = "compute.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "dns" {
  service            = "dns.googleapis.com"
  disable_on_destroy = false
}

# Cloud Run Service
resource "google_cloud_run_service" "knowme" {
  name     = var.service_name
  location = var.gcp_region

  template {
    spec {
      containers {
        image = var.container_image
        
        ports {
          container_port = 3000
        }
        
        env {
          name  = "NODE_ENV"
          value = "production"
        }
        
        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
      }
      
      service_account_email = google_service_account.cloud_run.email
      
      timeout_seconds = 300
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "100"
        "autoscaling.knative.dev/minScale" = "1"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.cloud_run]
}

# IAM: Allow public access to Cloud Run service
resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.knowme.name
  location = google_cloud_run_service.knowme.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Service Account for Cloud Run
resource "google_service_account" "cloud_run" {
  account_id   = "${var.service_name}-sa"
  display_name = "Cloud Run Service Account for ${var.service_name}"
}

# Artifact Registry Repository
resource "google_artifact_registry_repository" "knowme" {
  location      = var.gcp_region
  repository_id = "${var.service_name}-repo"
  description   = "Docker repository for knowMe portfolio"
  format        = "DOCKER"

  depends_on = [google_project_service.container_registry]
}

# IAM: Allow Cloud Run to pull from Artifact Registry
resource "google_artifact_registry_repository_iam_member" "cloud_run_pull" {
  location   = google_artifact_registry_repository.knowme.location
  repository = google_artifact_registry_repository.knowme.name
  role       = "roles/artifactregistry.reader"
  member     = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Cloud DNS Zone
resource "google_dns_managed_zone" "knowme" {
  name        = replace(var.domain_name, ".", "-")
  dns_name    = "${var.domain_name}."
  description = "DNS zone for knowMe portfolio"
}

# Cloud Run to Domain mapping
resource "google_cloud_run_domain_mapping" "knowme" {
  location = var.gcp_region
  name     = var.domain_name

  spec {
    route_name = google_cloud_run_service.knowme.name
  }

  depends_on = [google_cloud_run_service.knowme]
}

# DNS A record pointing to Cloud Run
resource "google_dns_record_set" "knowme_a" {
  name         = google_cloud_run_domain_mapping.knowme.name
  type         = "A"
  ttl          = 300
  managed_zone = google_dns_managed_zone.knowme.name
  rrdatas      = [google_cloud_run_domain_mapping.knowme.status[0].resource_records[0].rdata]

  depends_on = [google_cloud_run_domain_mapping.knowme]
}

# DNS AAAA record for IPv6
resource "google_dns_record_set" "knowme_aaaa" {
  name         = google_cloud_run_domain_mapping.knowme.name
  type         = "AAAA"
  ttl          = 300
  managed_zone = google_dns_managed_zone.knowme.name
  rrdatas      = [google_cloud_run_domain_mapping.knowme.status[0].resource_records[1].rdata]

  depends_on = [google_cloud_run_domain_mapping.knowme]
}

# Cloud Storage Bucket for backups/assets (optional)
resource "google_storage_bucket" "knowme_assets" {
  name          = "${var.gcp_project_id}-${var.service_name}-assets"
  location      = var.gcp_region
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }
}

# Monitoring Alert Policy
resource "google_monitoring_alert_policy" "cloud_run_high_latency" {
  display_name = "Cloud Run ${var.service_name} - High Latency Alert"

  conditions {
    display_name = "Response time > 1s"

    condition_threshold {
      filter          = "resource.type=\"cloud_run_revision\" AND metric.type=\"run.googleapis.com/request_latencies\" AND resource.labels.service_name=\"${google_cloud_run_service.knowme.name}\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 1000

      aggregations {
        alignment_period  = "60s"
        per_series_aligner = "ALIGN_DELTA"
      }
    }
  }

  notification_channels = []
  
  alert_strategy {
    notification_rate_limit {
      period = "300s"
    }
  }
}

# Monitoring Alert for Cloud Run errors
resource "google_monitoring_alert_policy" "cloud_run_errors" {
  display_name = "Cloud Run ${var.service_name} - High Error Rate"

  conditions {
    display_name = "Error rate > 5%"

    condition_threshold {
      filter          = "resource.type=\"cloud_run_revision\" AND metric.type=\"run.googleapis.com/request_count\" AND metric.labels.response_code_class=\"5xx\" AND resource.labels.service_name=\"${google_cloud_run_service.knowme.name}\""
      duration        = "60s"
      comparison      = "COMPARISON_GT"
      threshold_value = 50

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_RATE"
      }
    }
  }

  notification_channels = []

  alert_strategy {
    notification_rate_limit {
      period = "300s"
    }
  }
}
