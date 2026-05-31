import { SectionHeading } from '@/components/ui/SectionHeading'

export function AboutSection() {
  return (
    <section id="about" className="section-card rounded-[2rem] border-terminalBorder p-8">
      <SectionHeading title="About" description="A developer with terminal intuition and modern UX." />
      <div className="mt-8 space-y-6 text-slate-300">
        <p>
          This portfolio is inspired by terminal interfaces, with crisp code-like visuals, clear structure, and content that feels like your personal command center.
        </p>
        <p>
          It is built with Next.js App Router, TypeScript, Tailwind CSS, and a minimal terminal theme that centers your technical abilities and knowledge base.
        </p>
        <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Core focus</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>Terminal-first visual language</li>
            <li>Clean, responsive layout</li>
            <li>Knowledge sharing with clarity</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
