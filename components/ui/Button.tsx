import type React from 'react'
import { ArrowRight } from 'lucide-react'

type ButtonProps =
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      variant?: 'primary' | 'ghost'
      className?: string
      children?: React.ReactNode
    })
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: 'primary' | 'ghost'
      className?: string
      children?: React.ReactNode
    })

export function Button({ href, variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
    variant === 'primary'
      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400'
      : 'border border-slate-600 text-slate-100 hover:border-cyan-400 hover:text-cyan-200'
  } ${className}`

  if (href) {
    return (
      <a className={classes} href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        <ArrowRight className="h-4 w-4" />
      </a>
    )
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}
