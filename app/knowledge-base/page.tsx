import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ActivityTracker } from '@/components/analytics/ActivityTracker'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'
import { getAllPostsMeta } from '@/lib/posts'

export default function KnowledgeBasePage() {
  const knowledgeItems = getAllPostsMeta()

  return (
    <main className="min-h-screen text-pencil">
      <ActivityTracker type="page_view" path="/knowledge-base" />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading title="Knowledge Base" description="Deep dives from production cloud and AI systems." />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {knowledgeItems.map((item, i) => (
            <WobblyBorder
              key={item.slug}
              size="lg"
              className="group relative transition hover:-rotate-1 hover:shadow-hard-lg"
            >
              <article className="h-full">
                <Link
                  href={`/knowledge-base/${item.slug}`}
                  aria-label={`Open post: ${item.title}`}
                  className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marker-blue/40"
                  style={{ borderRadius: BORDER_RADIUS.wobblyMd }}
                />

                {item.imagePath && (
                  <div className="mb-4 overflow-hidden border-2 border-pencil" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                    <Image
                      src={item.imagePath}
                      alt={item.title}
                      width={640}
                      height={360}
                      className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="p-6" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.32em] text-marker-blue">{item.tag}</p>
                    <span className="text-xs text-pencil-light">{item.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-pencil">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-pencil-light">{item.detail}</p>
                  <span className="relative z-20 mt-4 inline-flex items-center gap-2 text-sm text-marker-blue transition group-hover:translate-x-1">
                    Read more
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            </WobblyBorder>
          ))}
        </div>
      </div>
    </main>
  )
}
