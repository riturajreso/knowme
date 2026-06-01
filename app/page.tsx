'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, BookOpenText, Sparkles } from 'lucide-react'
import { getAllPostsMeta } from '@/lib/posts'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export default function KnowledgeBasePage() {
  const knowledgeItems = getAllPostsMeta()

  return (
    <main className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-card surface-grid relative overflow-hidden rounded-2xl border-terminalBorder p-6 sm:rounded-3xl sm:p-8 lg:rounded-[2rem]"
        >
          <div className="ambient-orb -left-10 top-12 h-44 w-44 bg-cyan-500/40" />
          <div className="ambient-orb -right-10 bottom-8 h-40 w-40 bg-orange-400/35 [animation-delay:1.1s]" />

          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-300/85">
              <Sparkles size={12} />
              Knowledge Base
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Practical cloud and AI engineering notes from real production systems.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Long-form technical posts on cloud architecture, Agentic AI, FinOps, and DevOps. Clean structure, real numbers, and implementation details you can reuse.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/knowledge-base"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                <BookOpenText size={15} />
                View all posts
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-200"
              >
                About the author
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-3"
          >
            {knowledgeItems.map((item, index) => (
              <motion.article
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  boxShadow: '0 20px 60px -35px rgba(34, 211, 238, 0.3)'
                }}
                className="group cursor-pointer rounded-2xl border border-slate-700/80 bg-slate-950/75 p-5 transition hover:border-cyan-400/50 sm:rounded-3xl sm:p-6"
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
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 + index * 0.08 }}
                    className="text-xs uppercase tracking-[0.32em] text-cyan-300/80"
                  >
                    {item.tag}
                  </motion.p>
                  <span className="text-xs text-slate-500">{item.readTime}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-100 transition group-hover:text-cyan-100 sm:mt-4 sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300 sm:mt-3 sm:leading-7">{item.detail}</p>
                <Link href={`/knowledge-base/${item.slug}`} className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-400 transition group-hover:text-cyan-300 sm:mt-4">
                  <motion.span whileHover={{ x: 4 }} className="inline-flex items-center gap-2">
                    Read more
                    <ArrowUpRight size={14} />
                  </motion.span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
