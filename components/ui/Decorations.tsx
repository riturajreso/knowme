import React from 'react'
import { BORDER_RADIUS, SHADOWS } from '@/lib/design-tokens'

/**
 * WobblyBorder Component
 * Wraps content with irregular wobbly borders for hand-drawn effect
 */
interface WobblyBorderProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  style?: React.CSSProperties
  variant?: 'default' | 'dashed'
  decoration?: 'tape' | 'tack' | 'none'
}

export function WobblyBorder({
  children,
  size = 'md',
  className = '',
  style = {},
  variant = 'default',
  decoration = 'none',
}: WobblyBorderProps) {
  const radiusMap = {
    sm: BORDER_RADIUS.wobblySmall,
    md: BORDER_RADIUS.wobblyMd,
    lg: BORDER_RADIUS.wobbly,
    xl: BORDER_RADIUS.wobblyXl,
  }

  const borderStyle = variant === 'dashed' ? 'dashed' : 'solid'

  return (
    <div
      className={`relative bg-white shadow-subtle ${className}`}
      style={{
        borderRadius: radiusMap[size],
        border: `2px ${borderStyle} #2d2d2d`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {decoration === 'tape' && (
        <div
          className="absolute -top-1.5 left-1/2 h-3 w-24 -translate-x-1/2 transform"
          style={{
            background: 'rgba(150, 150, 150, 0.15)',
            borderRadius: '4px',
            transform: 'translateX(-50%) rotate(-2deg)',
          }}
        />
      )}
      {decoration === 'tack' && (
        <div
          className="absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 transform rounded-full"
          style={{
            background: '#ff4d4d',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
      )}
      {children}
    </div>
  )
}

/**
 * HardShadow Component
 * Applies consistent hard offset shadow effects
 */
interface HardShadowProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function HardShadow({ children, size = 'md', className = '' }: HardShadowProps) {
  const shadows = {
    sm: SHADOWS.hardSm,
    md: SHADOWS.hard,
    lg: SHADOWS.hardLg,
    xl: SHADOWS.hardXl,
  }

  return (
    <div className={className} style={{ boxShadow: shadows[size] }}>
      {children}
    </div>
  )
}

/**
 * Tape Decoration
 * Simulates a piece of tape on a surface (often used on cards)
 */
interface TapeProps {
  className?: string
  rotation?: number
}

export function Tape({ className = '', rotation = -2 }: TapeProps) {
  return (
    <div
      className={`absolute -top-1.5 left-1/2 h-3 w-24 -translate-x-1/2 transform ${className}`}
      style={{
        background: 'rgba(150, 150, 150, 0.15)',
        borderRadius: '4px',
        transform: `translateX(-50%) rotate(${rotation}deg)`,
        boxShadow: 'inset 0 0.5px 0 rgba(255, 255, 255, 0.5)',
      }}
    />
  )
}

/**
 * Thumbtack Decoration
 * Simulates a red circular thumbtack pinning something
 */
interface ThumbTackProps {
  className?: string
}

export function ThumbTack({ className = '' }: ThumbTackProps) {
  return (
    <div
      className={`absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 transform rounded-full ${className}`}
      style={{
        background: '#ff4d4d',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), inset -1px -1px 0 rgba(0, 0, 0, 0.1)',
      }}
    />
  )
}

/**
 * Dashed Divider
 * Hand-drawn style divider using dashed border
 */
interface DashedDividerProps {
  className?: string
  vertical?: boolean
}

export function DashedDivider({ className = '', vertical = false }: DashedDividerProps) {
  return (
    <div
      className={`border-dashed border-pencil ${vertical ? 'border-l' : 'border-t'} ${className}`}
      style={{
        opacity: 0.5,
      }}
    />
  )
}
