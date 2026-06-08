'use client'

import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose max-w-none
      prose-headings:text-pencil prose-headings:font-bold
      prose-p:text-pencil-light prose-p:leading-8
      prose-li:text-pencil-light
      prose-strong:text-pencil
      prose-code:text-marker-blue prose-code:bg-paper-300 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-paper-300 prose-pre:border prose-pre:border-pencil prose-pre:text-pencil
      prose-a:text-marker-blue
      prose-hr:border-pencil
      prose-ul:text-pencil-light
      prose-ol:text-pencil-light">
      <ReactMarkdown
        components={{
          img: ({ src, alt }) => (
            <span className="block overflow-hidden border-2 border-pencil my-6" style={{ borderRadius: '225px 20px 200px 20px / 20px 200px 20px 225px' }}>
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
