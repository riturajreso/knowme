'use client'

import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-cyan max-w-none
      prose-headings:text-slate-100 prose-headings:font-semibold
      prose-p:text-slate-300 prose-p:leading-8
      prose-li:text-slate-300
      prose-strong:text-slate-100
      prose-code:text-cyan-300 prose-code:bg-slate-800/60 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
      prose-pre:bg-slate-800/60 prose-pre:border prose-pre:border-slate-700/70
      prose-a:text-cyan-400
      prose-hr:border-slate-700
      prose-ul:text-slate-300
      prose-ol:text-slate-300">
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => (
            <span className="block overflow-hidden rounded-2xl border border-slate-700/70 my-6">
              <Image
                src={src ?? ''}
                alt={alt ?? ''}
                width={1200}
                height={630}
                className="w-full object-cover"
              />
            </span>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
