'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, MapPin, Mail, Phone, ExternalLink, Award, GraduationCap } from 'lucide-react'
import { ActivityTracker } from '@/components/analytics/ActivityTracker'
import { WobblyBorder } from '@/components/ui/Decorations'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BORDER_RADIUS } from '@/lib/design-tokens'

const techStack: { label: string; items: string[] }[] = [
  { label: 'Cloud', items: ['AWS', 'GCP', 'Azure'] },
  { label: 'AI / LLM', items: ['MCP', 'A2A', 'RAG', 'LangGraph', 'LlamaIndex', 'Ollama', 'Bedrock', 'Vertex AI'] },
  { label: 'Languages', items: ['Python', 'FastAPI', 'PySpark', 'Boto3', 'PHP', 'JavaScript'] },
  { label: 'Infra & DevOps', items: ['Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'DynamoDB'] },
  { label: 'Integrations', items: ['Power Automate', 'SharePoint', 'ServiceNow', 'Axway'] },
]

const certifications = [
  '6x Anthropic AI Certifications (Agentic AI, MCP, Agent Frameworks)',
  'Google Associate Cloud Engineer',
  'AWS Certified Developer - Associate (DVA-C01)',
  'AWS Certified Cloud Practitioner (CLF-C01)',
  'Hugging Face LLM / Agent / MCP Course',
  'Data Analysis with PySpark - Coursera',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' } }),
}

export default function AboutPage() {
  return (
    <main className="min-h-screen text-pencil">
      <ActivityTracker type="page_view" path="/about" />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading title="About" description="A personal view into how I think, build, and solve problems across cloud, AI, and systems engineering." />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <WobblyBorder size="lg" decoration="tape">
            <div className="p-8 sm:p-10" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
              <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
                <div className="shrink-0 w-20 h-20 overflow-hidden border-2 border-pencil bg-paper-200" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
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
                  <p className="mb-1 text-xs uppercase tracking-[0.35em] text-marker-blue">Senior Engineer</p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-pencil tracking-tight">Ritu Raj</h1>
                  <p className="mt-1 text-base font-medium text-marker-blue">Cloud DevOps & AI Solutions</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-pencil-light">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-marker-blue" />Bangalore, India</span>
                    <a href="mailto:riturajreso@gmail.com" className="flex items-center gap-1.5 hover:text-marker-blue transition"><Mail size={14} className="text-marker-blue" />riturajreso@gmail.com</a>
                    <span className="flex items-center gap-1.5"><Phone size={14} className="text-marker-blue" />+91-8582949025</span>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-4 border-l-[3px] border-marker-red pl-5 text-sm leading-7 text-pencil-light sm:text-base">
                <p>
                  I am a Senior Cloud DevOps and AI Solutions Engineer with 10+ years of experience building production-grade cloud platforms, automation systems, and AI-enabled operations.
                </p>
                <p>
                  Earlier in my career, I worked deeply on server architecture, primarily on AWS, and built a strong foundation in clean system design using SOLID principles.
                </p>
                <p>
                  Today, I focus on <span className="text-marker-blue font-medium">Agent Harness</span> and <span className="text-marker-blue font-medium">Agentic AI</span> with MCP and A2A patterns, while applying a zero-trust mindset and designing systems to reduce blast radius through strong isolation, least privilege, and safe rollout practices.
                </p>
              </div>
            </div>
          </WobblyBorder>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <WobblyBorder size="lg">
            <div className="p-8" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
              <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-marker-blue mb-6">
                <span className="h-px w-6 bg-marker-blue/50" /> Technical Expertise
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {techStack.map((group, i) => (
                  <motion.div key={group.label} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                    <p className="text-xs font-semibold uppercase tracking-widest text-pencil-light mb-2">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(item => (
                          <span key={item} className="rounded-full border-2 border-pencil bg-paper-200 px-3 py-1 text-xs text-pencil transition hover:-rotate-1">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </WobblyBorder>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <WobblyBorder size="lg" decoration="tape">
              <div className="p-8" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
                <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-marker-blue mb-6">
                  <Award size={14} className="text-marker-blue" /> Certifications
                </h2>
                <ul className="space-y-3">
                  {certifications.map(cert => (
                    <li key={cert} className="flex gap-2.5 text-sm text-pencil-light leading-6">
                      <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-marker-red" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </WobblyBorder>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <WobblyBorder size="lg">
              <div className="p-8 flex flex-col gap-6" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
                <div>
                  <h2 className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-marker-blue mb-6">
                    <GraduationCap size={14} className="text-marker-blue" /> Education
                  </h2>
                  <p className="text-sm font-semibold text-pencil">B.Tech - Information Technology</p>
                  <p className="text-sm text-pencil-light mt-1">Techno India, Salt Lake - Class of 2016</p>
                  <p className="text-xs text-marker-blue mt-1">CGPA: 7.69</p>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-2 border-dashed border-pencil bg-paper-200 p-5" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                  <a
                    href="https://www.linkedin.com/in/riturajreso/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-marker-blue hover:-rotate-1"
                  >
                    <ExternalLink size={13} />
                    linkedin.com/in/riturajreso
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-marker-red border-[3px] border-pencil shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px]"
                    style={{ borderRadius: BORDER_RADIUS.wobblySmall }}
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                </div>
              </div>
            </WobblyBorder>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
