'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'

const contactMethods = [
  {
    label: 'Email',
    contact: 'hello@knowme.example',
    href: 'mailto:hello@knowme.example',
    buttonText: 'Send Email'
  },
  {
    label: 'Phone',
    contact: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    buttonText: 'Call Me'
  }
]

const infoItems = [
  { title: 'Response Time', value: 'Within 24 hours' },
  { title: 'Preferred Contact', value: 'Email for detailed inquiries' },
  { title: 'Available', value: 'Mon - Fri, 9AM - 5PM EST' }
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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

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
            title="Contact" 
            description="Get in touch through your preferred channel." 
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2"
          >
            <div className="space-y-4 sm:space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 sm:p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)] transition"
                >
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-300/80 mb-3 sm:mb-4"
                  >
                    {method.label}
                  </motion.p>
                  <p className="text-xl sm:text-2xl font-mono text-cyan-200 break-all mb-3 sm:mb-4">{method.contact}</p>
                  <Button href={method.href} variant="primary" className="w-full justify-center text-sm sm:text-base">
                    {method.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 sm:p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.75)] transition"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-300/80 mb-4 sm:mb-6">Quick message</p>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-xs sm:text-sm text-slate-300 mb-2">Your Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-3 sm:px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition text-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-xs sm:text-sm text-slate-300 mb-2">Your Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com" 
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-3 sm:px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition text-sm"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-xs sm:text-sm text-slate-300 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..." 
                    rows={3}
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 px-3 sm:px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition text-sm"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full justify-center text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl border border-slate-700/80 bg-slate-900/50 p-5 sm:p-6"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-300/80 mb-4 sm:mb-6">Quick Info</p>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 text-xs sm:text-sm text-slate-300"
            >
              {infoItems.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-3 sm:p-4"
                >
                  <p className="text-cyan-300 font-medium mb-1 sm:mb-2">{item.title}</p>
                  <p className="text-slate-400">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
