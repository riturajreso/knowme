import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'
import { ArrowRight } from 'lucide-react'

const knowledgeItems = [
  {
    title: 'Cloud Architecture',
    detail: 'Multi-cloud strategies, GCP infrastructure, cost optimization, and scalable system design patterns.'
  },
  {
    title: 'AI & Automation',
    detail: 'Multi-agent systems, MCP protocols, RAG workflows, and intelligent automation at scale.'
  },
  {
    title: 'DevOps & Platform',
    detail: 'CI/CD pipelines, containerization, Infrastructure as Code, and observability practices.'
  }
]

export function KnowledgeBaseSection() {
  return (
    <section id="knowledge-base" className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Knowledge Base" description="Technical explorations and case studies." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {knowledgeItems.map((item, idx) => (
            <WobblyBorder 
              key={item.title}
              size="lg"
              decoration={idx === 0 ? 'tack' : idx === 1 ? 'tape' : 'none'}
              className="transition hover:-rotate-1"
            >
              <div className="p-6 sm:p-8 h-full flex flex-col" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
                <h3 
                  className="text-xl sm:text-2xl font-bold"
                  style={{
                    fontFamily: '"Kalam", cursive',
                    color: '#2d2d2d',
                  }}
                >
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed flex-grow" style={{ color: '#5a5a5a' }}>
                  {item.detail}
                </p>
                <Link 
                  href="/knowledge-base"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-bold transition hover:translate-x-1"
                  style={{ color: '#2d5da1' }}
                >
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </WobblyBorder>
          ))}
        </div>
      </div>
    </section>
  )
}
