# knowMe — Static Site (S3 + CloudFront)

A fully static, hand-drawn-style portfolio and knowledge base for **Ritu Raj** — ported from the original Next.js `knowme-main` app into plain HTML/CSS/JS with **zero build step**, so it can be hosted directly from an S3 bucket behind a CDN.

## Structure

```
index.html                 Home (profile, projects and featured posts)
about.html                 Experience, skills and certifications
contact.html               Contact page (mailto form, no backend)
knowledge-base.html        Full post listing
knowledge-base/*.html      7 individual post pages (pre-rendered from markdown)
404.html                   Custom error page
robots.txt / sitemap.xml
assets/css/style.css       Default Static design system
assets/css/themes.css      Theme selector and scoped Mithila styles
assets/js/theme.js         Early theme restoration and preference persistence
assets/js/main.js          Navigation, article filters, mailto form and reading progress
assets/img/                Portrait, article images and Mithila artwork
assets/resume.pdf          Downloadable resume
```

There is no Next.js, no React, no npm install required to run this site — every page is plain HTML that links to shared CSS/JS. Content changes mean editing HTML/CSS directly (see "Updating content" below).

## Themes

The theme toggle switches between **Static** (default, switch off) and **Mithila** (switch on) on every page without navigating away or resetting forms, filters or expanded projects. The icon-only switch has a **Change theme** tooltip and accessible label, with mouse, touch, Enter and Space support. Mithila adapts the separate edition's typography, technical motifs and patterned borders to the same content.

The choice is stored in `localStorage` under `knowme-theme`, restored before styles render, and synchronized across tabs on the same origin. If browser storage is unavailable, switching still works on the current page but cannot persist. Without JavaScript, the default Static theme and page content remain available.

Upload only this folder's contents. The separate `knowme-mithila` folder is not required. Both themes share the same URLs and cached HTML; no cookies, backend, CDN redirects or theme-specific cache keys are needed. Google Fonts remains an external dependency, with fallback fonts if unavailable.

## Local preview

```bash
cd knowme-static
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to AWS S3 + CloudFront

### 1. Create the S3 bucket (private, origin-only)

```bash
aws s3 mb s3://YOUR_BUCKET_NAME --region us-east-1

aws s3api put-public-access-block \
  --bucket YOUR_BUCKET_NAME \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

Keep the bucket **private** — CloudFront will access it via Origin Access Control (OAC), not public bucket policy.

### 2. Sync the site

```bash
aws s3 sync . s3://YOUR_BUCKET_NAME \
  --exclude ".git/*" --exclude ".github/*" --exclude "*.md" \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*.html" --exclude "sitemap.xml" --exclude "robots.txt"

# HTML/robots/sitemap should revalidate more often
aws s3 sync . s3://YOUR_BUCKET_NAME \
  --exclude "*" --include "*.html" --include "sitemap.xml" --include "robots.txt" \
  --cache-control "public, max-age=0, must-revalidate"
```

These asset filenames are not content-hashed, so do not give them year-long `immutable` caching. CSS/JS references include `?v=themes-3` to bypass browser copies cached under the previous URLs; bump this version when changing those assets. Invalidate CloudFront after deployment as shown below. If files were previously uploaded with different cache metadata, `sync` will not update unchanged files: use `aws s3 cp . s3://YOUR_BUCKET_NAME --recursive --exclude ".git/*" --exclude ".github/*" --exclude "*.md" --cache-control "public, max-age=0, must-revalidate"` once to refresh all objects' metadata.

### 3. Create a CloudFront distribution

- **Origin**: the S3 bucket, using **Origin Access Control (OAC)** (not a website endpoint — this keeps the bucket private).
- **Origin path**: leave blank (files are at bucket root).
- **Default root object**: `index.html`
- **Viewer protocol policy**: Redirect HTTP → HTTPS
- **Cache policy**: minimum TTL `0`, so CloudFront respects revalidation headers. The theme preference is browser-local and must not be added to the cache key.
- **Custom error responses**: map `403`/`404` → `/404.html` with response code `404`
- Attach the generated bucket policy CloudFront gives you (grants `cloudfront.amazonaws.com` `s3:GetObject` scoped to the distribution's ARN).

```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### 4. Invalidate cache after deploys

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 5. (Optional) Custom domain + TLS

- Request/validate an ACM certificate **in `us-east-1`** for your domain.
- Attach it to the CloudFront distribution as an alternate domain name (CNAME).
- Point your DNS (Route 53 or external registrar) at the CloudFront distribution domain (ALIAS/CNAME).

## GitHub Actions deployment

The workflow at `.github/workflows/deploy.yml` runs for site changes pushed to `main`, or manually through **Actions → Deploy knowMe to S3 and CloudFront → Run workflow** on `main`.

Publish the **contents of `knowme-static` as the repository root**, including `.github`. GitHub only discovers workflows under the repository's root `.github/workflows` directory. If using a monorepo instead, move the workflow to that root, scope its push paths to `knowme-static/`, and set the job's `defaults.run.working-directory` to `knowme-static`.

1. Create the private S3 bucket and CloudFront distribution described above.
2. In AWS IAM, add the GitHub OIDC provider `https://token.actions.githubusercontent.com` with audience `sts.amazonaws.com`.
3. Create an IAM role with the trust and permission policies below, replacing all placeholders.
4. In GitHub, create a **production** environment, restrict its deployment branches to `main`, and optionally require approval. Under its **Environment variables**, add:

| Variable | Value |
| --- | --- |
| `AWS_ROLE_ARN` | ARN of the GitHub OIDC deployment role |
| `AWS_REGION` | Region containing the S3 bucket |
| `S3_BUCKET` | Bucket name only, without `s3://` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Distribution ID, not its hostname or ARN |

No AWS access-key secrets are needed. The role's trust policy must match the environment-based subject, not a branch-based subject:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"},
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {"StringEquals": {
      "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
      "token.actions.githubusercontent.com:sub": "repo:OWNER/REPOSITORY:environment:production"
    }}
  }]
}
```

Deployment role permissions (separate from CloudFront's OAC bucket policy):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:AbortMultipartUpload"],
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation", "cloudfront:GetInvalidation"],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

If the bucket uses a customer-managed KMS key, also grant the role the required KMS permissions and key-policy access. The workflow expects an existing bucket and distribution; it does not provision infrastructure.

The workflow validates JavaScript, stages only public site files, uploads assets before pages with revalidation headers, and waits for CloudFront invalidation to complete. It excludes repository metadata and documentation, preserves existing bucket objects, and never performs a bucket-wide delete. Obsolete published files must be removed separately when intended.

## Updating content

- **New blog post**: duplicate any file in `knowledge-base/`, edit the `<h1>`, meta tags, `.post-meta-row`, hero image, and body inside `.prose`. Add a matching card to `knowledge-base.html` and (optionally) `index.html`'s featured grid.
- **About / Contact copy**: edit directly in `about.html` / `contact.html`.
- **Resume**: replace `assets/resume.pdf`.
- **Design tokens**: colors, fonts, radii, and shadows are all CSS custom properties at the top of `assets/css/style.css`.
- **Mithila theme**: scoped overrides live in `assets/css/themes.css`. Keep the early `theme.js` script, both stylesheet links and the theme selector when creating a new page; nested article paths use `../assets/`.

## What changed vs. the Next.js version

- No server, no API routes, no build step — the `/api/activity` tracking endpoint and Docker/Cloud Run/Terraform deployment were dropped since there's no backend in a static S3 + CDN setup.
- Blog post markdown (`content/posts/*.md` in `knowme-main`) was pre-rendered once into static HTML pages under `knowledge-base/`.
- The contact form now composes a `mailto:` link client-side (same behavior the Next.js version already used — no server round-trip either way).
- Framer Motion animations were replaced with lightweight CSS transitions; content remains visible without JavaScript and respects reduced-motion preferences.
