import type { Metadata } from 'next'
import './globals.css'
import { Patrick_Hand, Kalam } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

const patrickHand = Patrick_Hand({ 
  subsets: ['latin'], 
  variable: '--font-patrick-hand',
  weight: '400'
})

const kalam = Kalam({
  subsets: ['latin'],
  variable: '--font-kalam',
  weight: ['300', '400', '700']
})

export const metadata: Metadata = {
  title: 'knowMe | Cloud and AI Portfolio',
  description: 'A modern portfolio with a technical knowledge base, professional profile, and direct contact experience.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${patrickHand.variable} ${kalam.variable}`}>
      <body className="text-pencil">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
