import type React from 'react'
import { ArrowRight } from 'lucide-react'
import { BORDER_RADIUS, SHADOWS } from '@/lib/design-tokens'

type ButtonProps =
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      variant?: 'primary' | 'secondary'
      className?: string
      children?: React.ReactNode
    })
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: 'primary' | 'secondary'
      className?: string
      children?: React.ReactNode
    })

const baseStyles = {
  borderRadius: BORDER_RADIUS.wobbly,
  border: '3px solid #2d2d2d',
  fontFamily: '"Patrick Hand", cursive',
  fontSize: '1rem',
  fontWeight: 500,
  padding: '12px 24px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  boxShadow: SHADOWS.hard,
  transition: 'all 100ms ease-out',
}

export function Button({ href, variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const isPrimary = variant === 'primary'
  
  const variantStyles = isPrimary
    ? {
        backgroundColor: '#ffffff',
        color: '#2d2d2d',
      }
    : {
        backgroundColor: '#e5e0d8',
        color: '#2d2d2d',
      }

  const hoverStyles = `
    hover:bg-red-500 hover:text-white hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px]
    ${!isPrimary ? 'hover:bg-blue-600 hover:text-white' : ''}
  `

  const activeStyles = `
    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
  `

  if (href) {
    return (
      <a
        className={`${hoverStyles} ${activeStyles} ${className}`}
        href={href}
        style={Object.assign({}, baseStyles, variantStyles)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        <ArrowRight className="h-4 w-4" />
      </a>
    )
  }

  return (
    <button
      className={`${hoverStyles} ${activeStyles} ${className}`}
      style={Object.assign({}, baseStyles, variantStyles)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}
