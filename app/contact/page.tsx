'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'

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
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    window.location.href = `mailto:riturajreso@gmail.com?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 800)
  }

  return (
    <main className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-card surface-grid relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="ambient-orb -left-24 -top-24 h-72 w-72 bg-cyan-500/30" />
          <div className="ambient-orb -bottom-8 right-8 h-40 w-40 bg-orange-400/25 [animation-delay:1.4s]" />
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-400/70 mb-2">Get in touch</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-50 tracking-tight">Contact Me</h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-7 max-w-xl">
            I am open to discussions about cloud architecture, AI systems, collaborations, or just a technical chat. Pick any channel below.
          </p>

          <div className="relative mt-7 flex flex-wrap gap-3">
            <a href="mailto:riturajreso@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 transition">
              <Mail size={14} className="text-cyan-500" />riturajreso@gmail.com
            </a>
            <a href="tel:+918582949025" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 transition">
              <Phone size={14} className="text-cyan-500" />+91-8582949025
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-400">
              <MapPin size={14} className="text-cyan-500" />Bangalore, India
            </span>
            <a href="https://www.linkedin.com/in/riturajreso/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-300 hover:border-cyan-500/60 hover:text-cyan-300 transition">
              <Linkedin size={14} className="text-cyan-500" />LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Form + sidebar */}
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="section-card rounded-3xl p-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70 mb-6">Send a message</p>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <CheckCircle size={40} className="text-cyan-400" />
                <p className="text-slate-100 font-semibold">Message ready to send!</p>
                <p className="text-sm text-slate-400">Your email client should have opened. Hit send there to complete it.</p>
                <button onClick={() => setStatus('idle')} className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition underline underline-offset-4">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Your name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Your email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="What would you like to discuss?"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition resize-none" />
                </div>
                <motion.button type="submit" disabled={status === 'sending'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400 disabled:opacity-60">
                  <Send size={14} />
                  {status === 'sending' ? 'Opening email...' : 'Send Message'}
                </motion.button>
                <p className="text-xs text-slate-500 text-center">This opens your email client with the message pre-filled.</p>
              </form>
            )}
          </motion.div>

          <div className="flex flex-col gap-5">
            {[
              { label: 'Response time', value: 'Within 24 hours' },
              { label: 'Best for', value: 'Cloud architecture, AI systems, and collaborations' },
              { label: 'Available', value: 'Mon - Fri, IST' },
            ].map(({ label, value }, i) => (
              <motion.div key={label} custom={i} variants={fadeUp} initial="hidden" animate="visible" className="section-card rounded-2xl px-5 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                <p className="text-sm text-slate-300">{value}</p>
              </motion.div>
            ))}

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="section-card rounded-2xl px-5 py-5 space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-500">Direct links</p>
              <a href="mailto:riturajreso@gmail.com" className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 transition">
                <Mail size={14} className="text-cyan-500 shrink-0" />riturajreso@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/riturajreso/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 transition">
                <Linkedin size={14} className="text-cyan-500 shrink-0" />linkedin.com/in/riturajreso
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  )
}
