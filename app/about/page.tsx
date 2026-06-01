'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, MapPin, Mail, Phone, ExternalLink, Award, GraduationCap } from 'lucide-react'

const techStack: { label: string; items: string[] }[] = [
  { label: 'Cloud', items: ['AWS', 'GCP', 'Azure'] },
  { label: 'AI / LLM', items: ['MCP', 'A2A', 'RAG', 'LangGraph', 'LlamaIndex', 'Ollama', 'Bedrock', 'Vertex AI'] },
  { label: 'Languages', items: ['Python', 'FastAPI', 'PySpark', 'Boto3', 'PHP', 'JavaScript'] },
  { label: 'Infra & DevOps', items: ['Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'DynamoDB'] },
  { label: 'Integrations', items: ['Power Automate', 'SharePoint', 'ServiceNow', 'Axway'] },
]

const certifications = [
  '6× Anthropic AI Certifications (Agentic AI, MCP, Agent Frameworks)',
  'Google Associate Cloud Engineer',
  'AWS Certified Developer – Associate (DVA-C01)',
  'AWS Certified Cloud Practitioner (CLF-C01)',
  'Hugging Face LLM / Agent / MCP Course',
  'Data Analysis with PySpark — Coursera',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' } }),
}

export default function AboutPage() {
  return (
    <main className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="section-card surface-grid relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          {/* subtle glow */}
          <div className="ambient-orb -top-24 -right-24 h-72 w-72 bg-cyan-500/30" />
          <div className="ambient-orb bottom-0 left-10 h-44 w-44 bg-orange-400/25 [animation-delay:1.2s]" />

          <div className="relative flex flex-col sm:flex-row gap-6 sm:items-start">
            {/* Profile photo — drop your photo as /public/profile.jpg */}
            <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-800">
              <Image
                src="/photo.jpg"
                alt="Ritu Raj"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="flex-1">
              <p className="mb-1 text-xs uppercase tracking-[0.35em] text-cyan-400/70">Senior Engineer</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">Ritu Raj</h1>
              <p className="mt-1 text-base font-medium text-cyan-300/80">Cloud DevOps &amp; AI Solutions</p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-cyan-500" />Bangalore, India</span>
                <a href="mailto:riturajreso@gmail.com" className="flex items-center gap-1.5 hover:text-cyan-300 transition"><Mail size={14} className="text-cyan-500" />riturajreso@gmail.com</a>
                <span className="flex items-center gap-1.5"><Phone size={14} className="text-cyan-500" />+91-8582949025</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="relative mt-7 space-y-4 border-l-2 border-cyan-500/40 pl-5 text-sm leading-7 text-slate-300 sm:text-base">
            <p>
              I have 10+ years of experience in cloud infrastructure, AI systems, and DevOps automation. I focus on finding where teams waste time and money in their cloud operations, then building systems that fix those problems for good.
            </p>
            <p>
              At Ciena, I built <span className="text-cyan-300 font-medium">CloudIQ</span> from the ground up — the company&apos;s main AI platform for all cloud operations. It started as a cost advisory tool and grew into a full system covering vulnerability fixes, security reviews, multi-cloud guidance, and incident resolution.
            </p>
            <p>
              Right now, I am working on <span className="text-cyan-300 font-medium">Agentic AI</span> — building multi-agent systems where AI agents work together on complex cloud tasks using MCP and A2A protocols. I hold <span className="text-cyan-300 font-medium">6 Anthropic AI certifications</span> and lead 4 of the 9 AI initiatives at my organization.
            </p>
          </div>

        </motion.div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-card rounded-3xl p-8"
        >
          <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-400/70 mb-6">
            <span className="h-px w-6 bg-cyan-500/40" /> Technical Expertise
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((group, i) => (
              <motion.div key={group.label} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span key={item} className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications + Education ── */}
        <div className="grid gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="section-card rounded-3xl p-8"
          >
            <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-400/70 mb-6">
              <Award size={14} className="text-cyan-500" /> Certifications
            </h2>
            <ul className="space-y-3">
              {certifications.map(cert => (
                <li key={cert} className="flex gap-2.5 text-sm text-slate-300 leading-6">
                  <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-card rounded-3xl p-8 flex flex-col gap-6"
          >
            <div>
              <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-400/70 mb-6">
                <GraduationCap size={14} className="text-cyan-500" /> Education
              </h2>
              <p className="text-sm font-semibold text-slate-100">B.Tech — Information Technology</p>
              <p className="text-sm text-slate-400 mt-1">Techno India, Salt Lake · Class of 2016</p>
              <p className="text-xs text-cyan-300/70 mt-1">CGPA: 7.69</p>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-5">
              <a
                href="https://www.linkedin.com/in/riturajreso/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition"
              >
                <ExternalLink size={13} />
                linkedin.com/in/riturajreso
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 transition"
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>

          </motion.div>
        </div>

      </div>
    </main>
  )
}
