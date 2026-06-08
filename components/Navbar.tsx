'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BORDER_RADIUS } from '@/lib/design-tokens'

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
    <nav 
      className="sticky top-0 z-50 border-b-2 border-pencil bg-paper-50/95"
      style={{
        borderRadius: '0 0 20px 20px',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 md:py-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold transition hover:-rotate-1"
            style={{
              fontFamily: '"Kalam", cursive',
              color: '#2d2d2d',
              textDecoration: 'underline wavy #ff4d4d',
              textUnderlineOffset: '4px',
              textDecorationThickness: '2px',
            }}
          >
            knowMe
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex gap-6 md:gap-10">
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
                    className="text-sm md:text-base font-patrick transition hover:-rotate-1"
                    style={{
                      color: isActive ? '#ff4d4d' : '#2d2d2d',
                      fontWeight: isActive ? 700 : 400,
                      borderBottom: isActive ? '3px dashed #ff4d4d' : 'none',
                      paddingBottom: isActive ? '4px' : '0',
                    }}
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
            className="sm:hidden p-2 transition hover:rotate-1"
            style={{
              border: `2px solid #2d2d2d`,
              borderRadius: BORDER_RADIUS.wobblySmall,
              background: '#ffffff',
              color: '#2d2d2d',
              cursor: 'pointer',
            }}
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
            className="flex flex-col gap-3 mt-4 pb-4"
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
                    className="block px-4 py-3 rounded-xl text-sm font-patrick transition hover:rotate-1"
                    style={{
                      background: isActive ? '#fff9c4' : '#ffffff',
                      border: `2px ${isActive ? 'solid' : 'dashed'} #2d2d2d`,
                      color: '#2d2d2d',
                      fontWeight: isActive ? 700 : 400,
                      borderRadius: BORDER_RADIUS.wobblySmall,
                    }}
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
