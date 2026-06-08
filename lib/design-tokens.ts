/**
 * Hand-Drawn Design System Tokens
 * Centralized design values for consistent application across components
 */

export const COLORS = {
  // Core Palette
  background: '#fdfbf7', // Warm Paper
  foreground: '#2d2d2d', // Soft Pencil Black
  muted: '#e5e0d8', // Old Paper / Erased Pencil
  accent: '#ff4d4d', // Red Correction Marker
  border: '#2d2d2d', // Pencil Lead
  secondaryAccent: '#2d5da1', // Blue Ballpoint Pen
  
  // Variants
  white: '#ffffff',
  postItYellow: '#fff9c4',
  
  // Text Overlays (for dark areas)
  text: {
    primary: '#2d2d2d',
    secondary: '#5a5a5a',
    muted: 'rgba(45, 45, 45, 0.4)', // For placeholders
  },
  
  // Decorative Elements
  tapeGray: 'rgba(150, 150, 150, 0.15)',
  thumbtackRed: '#ff4d4d',
} as const

export const FONTS = {
  heading: 'Kalam, cursive', // wght 700
  body: 'Patrick Hand, cursive', // wght 400
  mono: 'monospace',
} as const

export const BORDER_RADIUS = {
  // Wobbly border radius values for hand-drawn effect
  // Format: horizontal / vertical (for organic ellipses)
  wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
  wobblyMd: '225px 20px 200px 20px / 20px 200px 20px 225px',
  wobblyLg: '280px 25px 220px 25px / 25px 220px 25px 280px',
  wobblyXl: '300px 30px 250px 30px / 30px 250px 30px 300px',
  // Subtle wobbly for smaller elements
  wobblySmall: '200px 10px 210px 10px / 10px 210px 10px 200px',
} as const

export const SHADOWS = {
  // Hard offset shadows (no blur) for cut-paper effect
  hard: '4px 4px 0px 0px #2d2d2d',
  hardLg: '8px 8px 0px 0px #2d2d2d',
  hardSm: '2px 2px 0px 0px #2d2d2d',
  hardXl: '12px 12px 0px 0px #2d2d2d',
  
  // Subtle shadow for cards (with slight transparency)
  subtle: '3px 3px 0px 0px rgba(45, 45, 45, 0.1)',
  
  // Hover state shadows (reduced offset)
  hover: '2px 2px 0px 0px #2d2d2d',
  
  // Active state (no shadow - button "presses flat")
  active: 'none',
} as const

export const SPACING = {
  // Standard spacing scale
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const

export const ANIMATION = {
  // Transition speeds
  fast: 'duration-100',
  normal: 'duration-200',
  slow: 'duration-300',
  
  // Transform values
  jiggle: 'rotate-1 md:rotate-2',
  jiggleHover: 'hover:rotate-1 hover:md:rotate-2',
  jiggleInverse: '-rotate-1 md:-rotate-2',
} as const

export const GRADIENTS = {
  // Paper texture pattern (radial dots)
  paperTexture: 'radial-gradient(#e5e0d8 1px, transparent 1px)',
  paperTextureSize: '24px 24px',
} as const

/**
 * Utility function to generate wobbly button styles
 */
export function getWobblyButtonStyle() {
  return {
    borderRadius: BORDER_RADIUS.wobbly,
  }
}

/**
 * Utility function to generate hard shadow styles
 */
export function getHardShadowStyle(size: 'sm' | 'md' | 'lg' | 'xl' = 'md') {
  const shadows = {
    sm: SHADOWS.hardSm,
    md: SHADOWS.hard,
    lg: SHADOWS.hardLg,
    xl: SHADOWS.hardXl,
  }
  return {
    boxShadow: shadows[size],
  }
}
