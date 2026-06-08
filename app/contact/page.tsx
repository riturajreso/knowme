'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'
import { ActivityTracker } from '@/components/analytics/ActivityTracker'
import { WobblyBorder } from '@/components/ui/Decorations'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BORDER_RADIUS } from '@/lib/design-tokens'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    window.location.href = `mailto:riturajreso@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 800)
  }

  return (
    <main className="min-h-screen text-pencil">
      <ActivityTracker type="page_view" path="/contact" />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <SectionHeading title="Contact" description="Let us build something useful together." />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <WobblyBorder size="lg" decoration="tape">
            <div className="p-8 sm:p-10" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
              <p className="text-xs uppercase tracking-[0.35em] text-marker-blue mb-2">Get in touch</p>
              <p className="mt-3 text-pencil-light text-sm sm:text-base leading-7 max-w-xl">
                I am open to discussions about cloud architecture, AI systems, collaborations, or technical workshops.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="mailto:riturajreso@gmail.com" className="inline-flex items-center gap-2 border-2 border-pencil bg-paper-100 px-4 py-2.5 text-sm text-pencil hover:-rotate-1" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                  <Mail size={14} className="text-marker-blue" />riturajreso@gmail.com
                </a>
                <a href="tel:+918582949025" className="inline-flex items-center gap-2 border-2 border-pencil bg-paper-100 px-4 py-2.5 text-sm text-pencil hover:rotate-1" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                  <Phone size={14} className="text-marker-blue" />+91-8582949025
                </a>
                <span className="inline-flex items-center gap-2 border-2 border-dashed border-pencil bg-paper-100 px-4 py-2.5 text-sm text-pencil-light" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                  <MapPin size={14} className="text-marker-blue" />Bangalore, India
                </span>
                <a href="https://www.linkedin.com/in/riturajreso/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-pencil bg-paper-100 px-4 py-2.5 text-sm text-pencil hover:-rotate-1" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                  <Linkedin size={14} className="text-marker-blue" />LinkedIn
                </a>
              </div>
            </div>
          </WobblyBorder>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <WobblyBorder size="lg">
              <div className="p-8" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
                <p className="text-xs uppercase tracking-[0.3em] text-marker-blue mb-6">Send a message</p>

                {status === 'sent' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <CheckCircle size={40} className="text-marker-blue" />
                    <p className="text-pencil font-semibold">Message ready to send.</p>
                    <p className="text-sm text-pencil-light">Your email client should have opened. Hit send there to complete it.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-xs text-marker-blue transition underline underline-offset-4"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs text-pencil-light mb-1.5">Your name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Jane Smith"
                          className="w-full border-2 border-pencil bg-white px-4 py-2.5 text-sm text-pencil placeholder:text-pencil-lighter focus:ring-2 focus:ring-marker-blue/20 focus:border-marker-blue focus:outline-none transition"
                          style={{ borderRadius: BORDER_RADIUS.wobblySmall }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-pencil-light mb-1.5">Your email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full border-2 border-pencil bg-white px-4 py-2.5 text-sm text-pencil placeholder:text-pencil-lighter focus:ring-2 focus:ring-marker-blue/20 focus:border-marker-blue focus:outline-none transition"
                          style={{ borderRadius: BORDER_RADIUS.wobblySmall }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-pencil-light mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="What would you like to discuss?"
                        className="w-full border-2 border-pencil bg-white px-4 py-2.5 text-sm text-pencil placeholder:text-pencil-lighter focus:ring-2 focus:ring-marker-blue/20 focus:border-marker-blue focus:outline-none transition resize-none"
                        style={{ borderRadius: BORDER_RADIUS.wobblySmall }}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-marker-red border-[3px] border-pencil shadow-hard transition hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-60"
                      style={{ borderRadius: BORDER_RADIUS.wobblySmall }}
                    >
                      <Send size={14} />
                      {status === 'sending' ? 'Opening email...' : 'Send Message'}
                    </motion.button>
                    <p className="text-xs text-pencil-light text-center">This opens your email client with the message pre-filled.</p>
                  </form>
                )}
              </div>
            </WobblyBorder>
          </motion.div>

          <div className="flex flex-col gap-5">
            {[
              { label: 'Response time', value: 'Within 24 hours' },
              { label: 'Best for', value: 'Cloud architecture, AI systems, and collaborations' },
              { label: 'Available', value: 'Mon - Fri, IST' },
            ].map(({ label, value }, i) => (
              <motion.div key={label} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                <WobblyBorder size="md" variant="dashed">
                  <div className="px-5 py-4" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                    <p className="text-xs uppercase tracking-widest text-pencil-light mb-1">{label}</p>
                    <p className="text-sm text-pencil">{value}</p>
                  </div>
                </WobblyBorder>
              </motion.div>
            ))}

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
              <WobblyBorder size="md">
                <div className="px-5 py-5 space-y-3" style={{ borderRadius: BORDER_RADIUS.wobblySmall }}>
                  <p className="text-xs uppercase tracking-widest text-pencil-light">Direct links</p>
                  <a href="mailto:riturajreso@gmail.com" className="flex items-center gap-2 text-sm text-marker-blue hover:translate-x-1 transition">
                    <Mail size={14} className="shrink-0" />riturajreso@gmail.com
                  </a>
                  <a href="https://www.linkedin.com/in/riturajreso/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-marker-blue hover:translate-x-1 transition">
                    <Linkedin size={14} className="shrink-0" />linkedin.com/in/riturajreso
                  </a>
                </div>
              </WobblyBorder>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
