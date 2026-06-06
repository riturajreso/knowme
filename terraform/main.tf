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
        "autoscaling.knative.dev/maxScale" = tostring(var.max_instances)
        "autoscaling.knative.dev/minScale" = tostring(var.min_instances)
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


