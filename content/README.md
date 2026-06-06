# Adding a Blog Post

Drop a `.md` file in this folder. It will automatically appear in the knowledge base listing and get its own page at `/knowledge-base/<slug>`.

## File naming

The filename becomes the URL slug:

```
my-new-post.md  →  /knowledge-base/my-new-post
```

Use lowercase letters and hyphens only.

## Required frontmatter

Every post must start with a frontmatter block:

```markdown
---
title: "Your Post Title"
detail: "One sentence shown on the listing card."
tag: "DevOps"
imagePath: "/posts/your-image.svg"
readTime: "5 min"
date: "2026-06-06"
---

Your post content starts here...
```

| Field | Required | Description |
|---|---|---|
| `title` | ✓ | Full post title |
| `detail` | ✓ | Short description shown on listing card |
| `tag` | ✓ | Category badge (e.g. DevOps, FinOps, MCP, Security) |
| `imagePath` | ✓ | Cover image path under `/public/` |
| `readTime` | ✓ | Estimated read time (e.g. `5 min`) |
| `date` | ✓ | Publication date `YYYY-MM-DD` — controls sort order |

## Writing the post body

Standard markdown is fully supported:

```markdown
## Section heading

Paragraph text here.

- Bullet point one
- Bullet point two

**Bold text** and `inline code` work too.

![Alt text](/posts/my-diagram.png)

![External image](https://example.com/image.png)
```

Posts are sorted by `date` descending (newest first).

## Deploy

Push to `main` — the pipeline builds and deploys automatically. No other config needed.
