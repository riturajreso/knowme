'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function TerminalHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-terminalBorder bg-terminalSurface/90 p-6 shadow-terminal sm:p-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">terminal portfolio</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
          knowMe — your technical knowledge base.
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-3xl border border-terminalBorder bg-[#04121f] p-6 shadow-[0_0_0_1px_rgba(56,189,248,0.12)]"
        >
          <div className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="ml-auto text-xs uppercase tracking-[0.25em] text-slate-500">bash</span>
          </div>
          <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">
            <code className="block text-slate-200">
              <span className="text-cyan-300">$</span> echo "Welcome to knowMe"
            </code>
            <code className="block text-slate-400">Building portfolios with a terminal-first design language.</code>
            <code className="block text-slate-200 mt-4">$</code>
            <code className="block text-slate-400">explore the knowledge base, about me, and get in touch.</code>
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: 'easeOut' }}
          className="rounded-3xl border border-terminalBorder bg-slate-950/40 p-6 shadow-terminal"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">quick commands</p>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <Link href="/knowledge-base" className="block rounded-2xl border border-slate-700 bg-slate-900/75 px-4 py-3 hover:border-cyan-400/50 transition">
              <span className="font-mono text-cyan-300">cd /knowledge-base</span>
              <p className="mt-2 text-slate-400">Explore curated topics and technical patterns.</p>
            </Link>
            <Link href="/about" className="block rounded-2xl border border-slate-700 bg-slate-900/75 px-4 py-3 hover:border-cyan-400/50 transition">
              <span className="font-mono text-cyan-300">cat about.md</span>
              <p className="mt-2 text-slate-400">See my story, skills, and background.</p>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" className="rounded-full">
              Contact me
            </Button>
            <Link
              href="/knowledge-base"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              Explore knowledge
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
