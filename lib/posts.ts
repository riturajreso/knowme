import 'server-only'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export interface Post {
  slug: string
  title: string
  detail: string
  tag: string
  imagePath: string
  readTime: string
  date: string
  content: string
}

export type PostMeta = Omit<Post, 'content'>

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))
}

export function getAllPosts(): Post[] {
  return getPostFiles()
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug, content, ...data } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content: _content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): Post | undefined {
  const filepath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filepath)) return undefined
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as Post
}
