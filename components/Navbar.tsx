'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/', label: 'Knowledge Base' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <nav className="border-b border-slate-700 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 md:py-4 lg:px-12">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-base sm:text-lg font-bold text-cyan-400 hover:text-cyan-300 transition"
          >
            &gt; knowMe
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex gap-4 md:gap-8">
            {links.map(link => {
              const isActive = pathname === link.href
              return (
                <motion.li 
                  key={link.href}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    className={`text-sm md:text-base transition ${
                      isActive
                        ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1'
                        : 'text-slate-300 hover:text-cyan-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              )
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-lg border border-slate-700 text-cyan-400 hover:bg-slate-900/50 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, height: 'auto' },
            closed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden sm:hidden"
        >
          <motion.ul 
            variants={navVariants}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            className="flex flex-col gap-3 mt-4 pb-2"
          >
            {links.map(link => {
              const isActive = pathname === link.href
              return (
                <motion.li 
                  key={link.href}
                  variants={linkVariants}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? 'text-cyan-400 font-semibold bg-slate-900/50 border-l-2 border-cyan-400'
                        : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-900/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </motion.div>
      </div>
    </nav>
  )
}
