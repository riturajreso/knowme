import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'knowMe | Cloud and AI Portfolio',
  description: 'A modern portfolio with a technical knowledge base, professional profile, and direct contact experience.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="text-slate-100">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
