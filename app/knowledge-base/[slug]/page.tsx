import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { ActivityTracker } from '@/components/analytics/ActivityTracker'
import { MarkdownContent } from '@/components/MarkdownContent'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'
import { getAllPostsMeta, getPostBySlug } from '@/lib/posts'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostsMeta().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post not found | knowMe' }
  }

  return {
    title: `${post.title} | knowMe`,
    description: post.detail
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen text-pencil">
      <ActivityTracker type="post_view" path={`/knowledge-base/${post.slug}`} postSlug={post.slug} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <WobblyBorder size="xl">
          <article className="p-7 sm:p-10" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
            <Link href="/knowledge-base" className="inline-flex items-center gap-2 text-sm text-marker-blue transition hover:-translate-x-1">
              <ArrowLeft size={15} />
              Back to all posts
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border-2 border-pencil bg-paper-200 px-3 py-1 uppercase tracking-[0.24em] text-marker-blue">
                {post.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 text-pencil-light">
                <CalendarDays size={13} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-pencil-light">
                <Clock3 size={13} />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight text-pencil sm:text-4xl">{post.title}</h1>

            <div className="mt-6 overflow-hidden border-2 border-pencil" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
              <Image
                src={post.imagePath}
                alt={post.title}
                width={1200}
                height={630}
                className="h-56 w-full object-cover sm:h-72"
                priority
              />
            </div>

            <p className="mt-5 text-base leading-8 text-pencil-light">{post.detail}</p>

            <div className="mt-10 border-t-2 border-dashed border-pencil pt-8">
              <MarkdownContent content={post.content} />
            </div>
          </article>
        </WobblyBorder>
      </div>
    </main>
  )
}
