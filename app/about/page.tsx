'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

const skillsData = [
  { label: 'Frontend', skills: 'React, Next.js, TypeScript, Tailwind' },
  { label: 'Backend', skills: 'Node.js, Express, REST APIs' },
  { label: 'DevOps', skills: 'Docker, Git, CI/CD pipelines' },
  { label: 'Tools', skills: 'VS Code, Terminal, Linux' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-terminal text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-12">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="section-card rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border-terminalBorder p-6 sm:p-8"
        >
          <SectionHeading 
            title="About Me" 
            description="A developer with terminal intuition and modern UX." 
          />
          
          <div className="mt-8 sm:mt-12 grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_350px]">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 sm:space-y-8 text-slate-300"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-3 sm:mb-4">Cover Letter</h3>
                <p className="leading-6 sm:leading-7 text-sm sm:text-base">
                  I'm a passionate full-stack developer with a deep love for clean, intuitive interfaces and robust backend systems. With expertise in modern web technologies like Next.js, TypeScript, and Tailwind CSS, I craft digital experiences that are both beautiful and performant.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <p className="leading-6 sm:leading-7 text-sm sm:text-base">
                  My philosophy centers on writing maintainable code, understanding user needs deeply, and embracing a terminal-first mindset for building scalable applications. I'm committed to continuous learning and staying at the forefront of web development trends.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-slate-100 mb-3 sm:mb-4">Core Skills</h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  {skillsData.map((skill, index) => (
                    <motion.div
                      key={skill.label}
                      whileHover={{ 
                        y: -2,
                        boxShadow: '0 10px 30px -20px rgba(34, 211, 238, 0.2)'
                      }}
                      className="rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-900/75 px-3 sm:px-4 py-2.5 sm:py-3 transition cursor-pointer"
                    >
                      <p className="text-xs sm:text-sm font-medium text-cyan-300">{skill.label}</p>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">{skill.skills}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <motion.div 
                whileHover={{ y: -4 }}
                className="rounded-2xl sm:rounded-3xl border border-terminalBorder bg-slate-950/80 overflow-hidden shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)]"
              >
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="h-40 sm:h-48 bg-gradient-to-br from-cyan-600/20 to-slate-900 flex items-center justify-center"
                >
                  <div className="text-5xl sm:text-6xl text-cyan-400/30">👨‍💻</div>
                </motion.div>
                <div className="p-4 sm:p-6 text-center">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-300/80">your name here</p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-400">Full-Stack Developer</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4 }}
                className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-slate-900/80 p-4 sm:p-6 transition"
              >
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-300/80 mb-3 sm:mb-4">Resume</p>
                <Button href="/resume.pdf" variant="primary" className="w-full justify-center text-sm sm:text-base">
                  Download PDF
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
