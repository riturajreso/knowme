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

  backend "local" {
    path = "terraform.tfstate"
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

# Cloud Run Service (v2)
resource "google_cloud_run_v2_service" "knowme" {
  name     = var.service_name
  location = var.gcp_region

  template {
    containers {
      image = var.container_image == "" ? "us-docker.pkg.dev/cloudrun/container/hello:latest" : var.container_image

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

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    timeout = "300s"
  }

  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  depends_on = [google_project_service.cloud_run]
}

# IAM: Allow public access to Cloud Run service
resource "google_cloud_run_v2_service_iam_member" "invoker" {
  name     = google_cloud_run_v2_service.knowme.name
  location = google_cloud_run_v2_service.knowme.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Custom domain can be added later once rituraj.in is purchased.
# The app is accessible via the Cloud Run URL output.


resource "google_cloud_run_domain_mapping" "knowme" {
  name     = "know-rituraj.info"
  location = var.gcp_region

  metadata {
    namespace = var.gcp_project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.knowme.name
  }

  depends_on = [google_cloud_run_v2_service.knowme]
}

