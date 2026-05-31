import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

export function ContactSection() {
  return (
    <section id="contact" className="section-card rounded-[2rem] border-terminalBorder p-8">
      <SectionHeading title="Contact" description="Connect through a terminal-inspired channel." />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-slate-300">
          <p>
            Ready to turn your expertise into a strong personal brand? Share a project, ask a question, or request a technical write-up directly from the portfolio.
          </p>
          <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 text-sm text-slate-300">
            <p className="font-medium text-slate-100">Reach me at</p>
            <p className="mt-3 break-words text-cyan-200">hello@knowme.example</p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-6 shadow-[0_25px_75px_-45px_rgba(0,0,0,0.75)]">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">send a quick note</p>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            If you'd like, simply send a message to the address above or use a contact form integration later for immediate responses.
          </p>
          <Button href="mailto:hello@knowme.example" className="mt-6 w-full justify-center">
            Email me
          </Button>
        </div>
      </div>
    </section>
  )
}
