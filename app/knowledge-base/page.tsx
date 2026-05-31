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
  },
  {
    title: 'Advanced state management',
    detail: 'Master patterns for handling complex application state with Redux, Zustand, or Context API.'
  },
  {
    title: 'Performance optimization',
    detail: 'Learn techniques for code splitting, lazy loading, and rendering optimization in modern frameworks.'
  },
  {
    title: 'DevOps essentials',
    detail: 'Understand Docker, CI/CD pipelines, and deployment strategies for production applications.'
  }
]

export default function KnowledgeBasePage() {
  return (
    <main className="min-h-screen bg-terminal text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <section className="section-card rounded-[2rem] border-terminalBorder p-8">
          <SectionHeading 
            title="Knowledge Base" 
            description="A collection of terminal-inspired technical topics and resources." 
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {knowledgeItems.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)] hover:border-cyan-400/50 transition"
              >
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">topic</p>
                <h3 className="mt-4 text-xl font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
                <a href="#" className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300 transition">
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
