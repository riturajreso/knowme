import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-paper text-pencil px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8 text-pencil-light">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-marker-red text-white font-bold rounded-lg hover:shadow-lg transition"
        >
          <ArrowLeft size={20} />
          Back home
        </Link>
      </div>
    </main>
  )
}
