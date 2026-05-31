import { SectionHeading } from '@/components/ui/SectionHeading'

const knowledgeItems = [
  {
    title: 'CLI-first design',
    detail: 'Build interfaces that feel like working inside a smart terminal with familiar command patterns.'
  },
  {
    title: 'Modern web stack',
    detail: 'Next.js, TypeScript, and Tailwind form the foundation for responsive terminal layouts.'
  },
  {
    title: 'Technical storytelling',
    detail: 'Explain your skills, tools, and projects in a way that reads like polished documentation.'
  }
]

export function KnowledgeBaseSection() {
  return (
    <section id="knowledge-base" className="section-card rounded-[2rem] border-terminalBorder p-8">
      <SectionHeading title="Knowledge Base" description="Terminal-inspired technical content." />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {knowledgeItems.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)]"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">topic</p>
            <h3 className="mt-4 text-xl font-semibold text-slate-100">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
