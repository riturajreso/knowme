import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'knowMe | Terminal Portfolio',
  description: 'A terminal-themed portfolio with knowledge base, about, and contact sections.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-terminal text-slate-100">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
