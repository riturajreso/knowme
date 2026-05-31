'use client'

import { motion } from 'framer-motion'
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
  return (
    <main className="min-h-screen bg-terminal text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-card rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border-terminalBorder p-6 sm:p-8"
        >
          <SectionHeading 
            title="Knowledge Base" 
            description="A collection of terminal-inspired technical topics and resources." 
          />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {knowledgeItems.map((item, index) => (
              <motion.article
                key={item.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 20px 60px -35px rgba(34, 211, 238, 0.3)'
                }}
                className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 sm:p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)] hover:border-cyan-400/50 transition cursor-pointer"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-xs sm:text-sm uppercase tracking-[0.32em] text-cyan-300/80"
                >
                  topic
                </motion.p>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm leading-6 sm:leading-7 text-slate-300">{item.detail}</p>
                <motion.a 
                  href="#" 
                  whileHover={{ x: 4 }}
                  className="mt-3 sm:mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300 transition"
                >
                  Read more →
                </motion.a>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
