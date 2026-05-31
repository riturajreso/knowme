interface SectionHeadingProps {
  title: string
  description: string
  id?: string
}

export function SectionHeading({ title, description, id }: SectionHeadingProps) {
  return (
    <div id={id} className="space-y-3">
      <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">{title}</p>
      <h2 className="text-3xl font-semibold text-slate-100 sm:text-4xl">{description}</h2>
    </div>
  )
}
