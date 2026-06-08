'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { WobblyBorder, DashedDivider } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'

export function TerminalHero() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Hero Container */}
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Left: Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Label */}
            <div className="inline-block">
              <p 
                className="text-sm uppercase tracking-widest font-patrick"
                style={{
                  color: '#2d5da1',
                  fontWeight: 700,
                  letterSpacing: '0.15em'
                }}
              >
                ✏️ hand-drawn portfolio
              </p>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 
                className="text-5xl sm:text-6xl leading-tight font-bold"
                style={{
                  fontFamily: '"Kalam", cursive',
                  color: '#2d2d2d',
                  lineHeight: 1.2,
                }}
              >
                Know{' '}
                <span 
                  style={{
                    color: '#ff4d4d',
                    display: 'inline-block',
                    transform: 'rotate(-3deg)',
                  }}
                >
                  Me.
                </span>
              </h1>
              <p 
                className="text-lg sm:text-xl leading-relaxed"
                style={{
                  color: '#5a5a5a',
                  fontFamily: '"Patrick Hand", cursive',
                  maxWidth: '90%'
                }}
              >
                Your technical knowledge base, experience story, and direct line to a Senior Cloud DevOps & AI Solutions Engineer.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button href="/knowledge-base" variant="primary">
                Explore knowledge
              </Button>
              <Button href="/contact" variant="secondary">
                Get in touch
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="pt-8 space-y-4">
              <DashedDivider className="my-4" />
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-bold text-lg" style={{ color: '#ff4d4d' }}>10+</p>
                  <p style={{ color: '#5a5a5a' }}>Years Experience</p>
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: '#2d5da1' }}>50+</p>
                  <p style={{ color: '#5a5a5a' }}>Projects Built</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="space-y-4 lg:space-y-6"
          >
            {/* Quick Links Card */}
            <WobblyBorder size="lg" decoration="tape">
              <div 
                className="p-6 sm:p-8 space-y-4"
                style={{
                  borderRadius: BORDER_RADIUS.wobblyMd,
                }}
              >
                <h3 
                  className="text-xl font-bold"
                  style={{
                    fontFamily: '"Kalam", cursive',
                    color: '#2d2d2d',
                  }}
                >
                  Quick Access
                </h3>
                
                <div className="space-y-3">
                  {/* Knowledge Base Link */}
                  <Link 
                    href="/knowledge-base"
                    className="block p-4 rounded-xl transition hover:-rotate-1"
                    style={{
                      background: '#fff9c4',
                      border: '2px solid #2d2d2d',
                      borderRadius: BORDER_RADIUS.wobblySmall,
                      color: '#2d2d2d',
                    }}
                  >
                    <p className="font-bold text-sm">📚 Knowledge Base</p>
                    <p className="text-xs mt-1" style={{ color: '#5a5a5a' }}>
                      Curated posts on cloud, AI, and DevOps patterns
                    </p>
                  </Link>

                  {/* About Link */}
                  <Link 
                    href="/about"
                    className="block p-4 rounded-xl transition hover:rotate-1"
                    style={{
                      background: '#ffffff',
                      border: '2px dashed #2d2d2d',
                      borderRadius: BORDER_RADIUS.wobblySmall,
                      color: '#2d2d2d',
                    }}
                  >
                    <p className="font-bold text-sm">👤 About Me</p>
                    <p className="text-xs mt-1" style={{ color: '#5a5a5a' }}>
                      Story, skills, and technical background
                    </p>
                  </Link>
                </div>
              </div>
            </WobblyBorder>

            {/* Featured Stat Card */}
            <WobblyBorder size="lg" decoration="tack">
              <div 
                className="p-6 sm:p-8 text-center"
                style={{
                  background: '#fff9c4',
                  borderRadius: BORDER_RADIUS.wobblyMd,
                }}
              >
                <p className="text-xs uppercase tracking-widest" style={{ color: '#5a5a5a' }}>
                  Currently Building
                </p>
                <h2 
                  className="text-2xl font-bold mt-2"
                  style={{
                    fontFamily: '"Kalam", cursive',
                    color: '#2d2d2d',
                  }}
                >
                  Multi-Agent AI Systems
                </h2>
                <p className="text-sm mt-3" style={{ color: '#5a5a5a' }}>
                  Exploring MCP architectures and A2A cloud automation
                </p>
              </div>
            </WobblyBorder>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
