import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getAllPostsMeta } from '@/lib/posts'

export default function KnowledgeBasePage() {
  const knowledgeItems = getAllPostsMeta()

  return (
    <main className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <section className="section-card surface-grid relative overflow-hidden rounded-[2rem] border-terminalBorder p-8">
          <div className="ambient-orb -left-10 top-12 h-44 w-44 bg-cyan-500/30" />
          <div className="ambient-orb -right-10 bottom-8 h-40 w-40 bg-orange-400/25 [animation-delay:1.1s]" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Knowledge Base</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-100 sm:text-4xl">Deep dives from production cloud and AI systems</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              Practical content with architecture choices, implementation details, and measurable results.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {knowledgeItems.map((item) => (
              <article
                key={item.title}
                className="group rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)] transition hover:-translate-y-1 hover:border-cyan-400/50"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-slate-700/70">
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    width={640}
                    height={360}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">{item.tag}</p>
                  <span className="text-xs text-slate-500">{item.readTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
                <Link href={`/knowledge-base/${item.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400 transition hover:text-cyan-300">
                  Read more
                  <ArrowUpRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
