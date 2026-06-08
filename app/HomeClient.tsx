'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, BookOpenText } from 'lucide-react'
import { ActivityTracker } from '@/components/analytics/ActivityTracker'
import { TerminalHero } from '@/components/sections/TerminalHero'
import { AboutSection } from '@/components/sections/AboutSection'
import { KnowledgeBaseSection } from '@/components/sections/KnowledgeBaseSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'
import type { PostMeta } from '@/lib/posts'

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

export default function KnowledgeBasePage({ knowledgeItems }: { knowledgeItems: PostMeta[] }) {

  return (
    <main className="min-h-screen bg-paper-50" style={{ color: '#2d2d2d' }}>
      <ActivityTracker type="page_view" path="/" />
      
      {/* Hero Section */}
      <TerminalHero />
      
      {/* Featured Posts Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <p 
              className="text-xs uppercase tracking-widest font-patrick"
              style={{ color: '#2d5da1', fontWeight: 700 }}
            >
              ✨ Featured Posts
            </p>
            <h2 
              className="text-4xl sm:text-5xl font-bold leading-tight mt-3"
              style={{
                fontFamily: '"Kalam", cursive',
                color: '#2d2d2d',
                lineHeight: 1.2,
              }}
            >
              Latest from the Knowledge Base
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {knowledgeItems.slice(0, 6).map((item, index) => (
              <motion.article
                key={item.slug}
                variants={itemVariants}
                className="group relative transition hover:-rotate-1"
              >
                <WobblyBorder size="lg" className="h-full transition-shadow group-hover:shadow-hard-lg">
                  <Link
                    href={`/knowledge-base/${item.slug}`}
                    aria-label={`Open post: ${item.title}`}
                    className="flex flex-col h-full p-0 rounded-[inherit]"
                  >
                    {item.imagePath && (
                      <div 
                        className="relative h-40 w-full overflow-hidden"
                        style={{ borderRadius: '253px 15px 225px 15px / 15px 225px 15px 253px' }}
                      >
                        <Image
                          src={item.imagePath}
                          alt={item.title}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <div className="flex-grow flex flex-col p-6" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
                      <div className="flex items-center justify-between mb-4">
                        <p 
                          className="text-xs uppercase tracking-widest font-bold"
                          style={{ color: '#2d5da1' }}
                        >
                          {item.tag}
                        </p>
                        <span className="text-xs" style={{ color: '#5a5a5a' }}>{item.readTime}</span>
                      </div>
                      
                      <h3 
                        className="text-lg sm:text-xl font-bold mb-2"
                        style={{
                          fontFamily: '"Kalam", cursive',
                          color: '#2d2d2d',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="text-sm leading-6 flex-grow mb-4"
                        style={{ color: '#5a5a5a' }}
                      >
                        {item.detail}
                      </p>
                      <div className="flex items-center gap-1 font-bold transition group-hover:translate-x-1" style={{ color: '#2d5da1' }}>
                        Read more <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </Link>
                </WobblyBorder>
              </motion.article>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link 
              href="/knowledge-base"
              className="inline-flex items-center gap-2 px-6 py-3 text-lg font-bold transition hover:translate-y-[-2px]"
              style={{
                color: '#ffffff',
                background: '#ff4d4d',
                border: '3px solid #2d2d2d',
                borderRadius: BORDER_RADIUS.wobbly,
                boxShadow: '4px 4px 0px 0px #2d2d2d',
              }}
            >
              <BookOpenText size={18} />
              View all posts
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <AboutSection />
      
      {/* Knowledge Base Teaser */}
      <KnowledgeBaseSection />
      
      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
