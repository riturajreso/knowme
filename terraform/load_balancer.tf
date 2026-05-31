resource "google_compute_backend_service" "knowme" {
  name            = "${var.service_name}-backend"
  protocol        = "HTTP"
  port_name       = "http"
  health_checks   = [google_compute_health_check.knowme.id]
  
  load_balancing_scheme = "EXTERNAL"
  
  session_affinity = "NONE"
  
  enable_cdn = true
  
  cdn_policy {
    cache_mode = "CACHE_ALL_STATIC"
    
    client_ttl = 3600
    default_ttl = 3600
    max_ttl = 86400
    
    negative_caching = true
    negative_caching_policy {
      code = 404
      ttl  = 600
    }
  }
}

resource "google_compute_health_check" "knowme" {
  name        = "${var.service_name}-health-check"
  description = "Health check for knowMe portfolio"

  timeout_sec         = 10
  check_interval_sec  = 30
  healthy_threshold   = 1
  unhealthy_threshold = 3

  http_health_check {
    port      = 3000
    path      = "/"
    use_serving_port = false
  }
}

# SSL Certificate
resource "google_compute_managed_ssl_certificate" "knowme" {
  name = "${var.service_name}-ssl-cert"

  managed {
    domains = [var.domain_name, "www.${var.domain_name}"]
  }
}

# URL Map
resource "google_compute_url_map" "knowme" {
  name            = "${var.service_name}-url-map"
  default_service = google_compute_backend_service.knowme.id

  host_rule {
    hosts        = [var.domain_name, "www.${var.domain_name}"]
    path_matcher = "knowme-paths"
  }

  path_matcher {
    name            = "knowme-paths"
    default_service = google_compute_backend_service.knowme.id
  }
}

# HTTPS Proxy
resource "google_compute_target_https_proxy" "knowme" {
  name             = "${var.service_name}-https-proxy"
  url_map          = google_compute_url_map.knowme.id
  ssl_certificates = [google_compute_managed_ssl_certificate.knowme.id]
}

# Global Forwarding Rule
resource "google_compute_global_forwarding_rule" "knowme" {
  name       = "${var.service_name}-forwarding-rule"
  target     = google_compute_target_https_proxy.knowme.id
  port_range = "443"
  ip_protocol = "TCP"
}

# Firewall rules
resource "google_compute_firewall" "knowme_allow_https" {
  name    = "${var.service_name}-allow-https"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["${var.service_name}-load-balanced"]
}

resource "google_compute_firewall" "knowme_allow_http" {
  name    = "${var.service_name}-allow-http"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["${var.service_name}-load-balanced"]
}
