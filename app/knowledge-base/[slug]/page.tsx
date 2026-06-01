import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { ActivityTracker } from '@/components/analytics/ActivityTracker'
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
    <main className="min-h-screen text-slate-100">
      <ActivityTracker type="post_view" path={`/knowledge-base/${post.slug}`} postSlug={post.slug} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="section-card surface-grid relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="ambient-orb -left-8 top-10 h-36 w-36 bg-cyan-500/30" />
          <div className="ambient-orb -right-8 bottom-12 h-32 w-32 bg-orange-400/25 [animation-delay:1.1s]" />

          <div className="relative">
            <Link href="/knowledge-base" className="inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200">
              <ArrowLeft size={15} />
              Back to all posts
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full border border-cyan-500/35 bg-cyan-500/10 px-3 py-1 uppercase tracking-[0.24em] text-cyan-300">
                {post.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <CalendarDays size={13} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <Clock3 size={13} />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-100 sm:text-4xl">{post.title}</h1>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700/70">
              <Image
                src={post.imagePath}
                alt={post.title}
                width={1200}
                height={630}
                className="h-56 w-full object-cover sm:h-72"
                priority
              />
            </div>

            <p className="mt-5 text-base leading-8 text-slate-300">{post.intro}</p>

            <div className="mt-10 space-y-10">
              {post.sections.map(section => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-slate-100">{section.heading}</h2>

                  {section.imagePath && (
                    <div className="overflow-hidden rounded-2xl border border-slate-700/70">
                      <Image
                        src={section.imagePath}
                        alt={section.heading}
                        width={1200}
                        height={700}
                        className="h-52 w-full object-cover sm:h-64"
                      />
                    </div>
                  )}

                  {section.paragraphs.map(paragraph => (
                    <p key={paragraph} className="text-sm leading-8 text-slate-300 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 pt-1">
                      {section.bullets.map(bullet => (
                        <li key={bullet} className="flex gap-3 text-sm leading-7 text-slate-300 sm:text-base">
                          <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
