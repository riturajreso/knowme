variable "gcp_project_id" {
  description = "GCP Project ID"
  type        = string
  sensitive   = false
}

variable "gcp_region" {
  description = "GCP region for resources"
  type        = string
  default     = "us-central1"
}

variable "service_name" {
  description = "Name of the Cloud Run service"
  type        = string
  default     = "knowme"
}

variable "container_image" {
  description = "Docker image URL from GitHub Container Registry"
  type        = string
  # Example: ghcr.io/your-username/knowme:latest
}

variable "domain_name" {
  description = "Custom domain name for the service (e.g., knowme.com)"
  type        = string
}

variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
  default     = "production"
}

variable "enable_monitoring" {
  description = "Enable Cloud Monitoring alerts"
  type        = bool
  default     = true
}

variable "min_instances" {
  description = "Minimum number of Cloud Run instances"
  type        = number
  default     = 1
}

variable "max_instances" {
  description = "Maximum number of Cloud Run instances"
  type        = number
  default     = 100
}

variable "memory" {
  description = "Memory allocation for Cloud Run (256Mi, 512Mi, 1Gi, 2Gi, 4Gi, 6Gi, 8Gi)"
  type        = string
  default     = "512Mi"
}

variable "cpu" {
  description = "CPU allocation for Cloud Run (1, 2, 4, 6, 8)"
  type        = string
  default     = "1"
}

variable "labels" {
  description = "Labels to apply to resources"
  type        = map(string)
  default = {
    project     = "knowme"
    environment = "production"
  }
}
