interface SectionHeadingProps {
  title: string
  description: string
  id?: string
}

export function SectionHeading({ title, description, id }: SectionHeadingProps) {
  return (
    <div id={id} className="space-y-3">
      <p 
        className="text-xs uppercase tracking-widest font-patrick"
        style={{
          color: '#2d5da1',
          fontWeight: 700,
          letterSpacing: '0.15em'
        }}
      >
        ✓ {title}
      </p>
      <h2 
        className="text-4xl sm:text-5xl font-bold leading-tight"
        style={{
          fontFamily: '"Kalam", cursive',
          color: '#2d2d2d',
          lineHeight: 1.2,
        }}
      >
        {description}
      </h2>
    </div>
  )
}
