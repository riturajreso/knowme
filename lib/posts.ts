import postsJson from '@/content/posts.json'

export interface PostSection {
  heading: string
  imagePath?: string
  paragraphs: string[]
  bullets?: string[]
}

export interface Post {
  slug: string
  title: string
  detail: string
  tag: string
  imagePath: string
  readTime: string
  date: string
  intro: string
  sections: PostSection[]
}

export type PostMeta = Omit<Post, 'intro' | 'sections'>

const posts = postsJson as Post[]

export function getAllPosts(): Post[] {
  return posts
}

export function getAllPostsMeta(): PostMeta[] {
  return posts.map(({ intro: _intro, sections: _sections, ...meta }) => meta)
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug)
}
