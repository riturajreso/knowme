import { SectionHeading } from '@/components/ui/SectionHeading'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'

export function AboutSection() {
  return (
    <section id="about" className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="About" description="A creative builder exploring cloud, AI, and systems design." />
        <div className="mt-12 space-y-8">
          <p className="text-lg leading-relaxed" style={{ color: '#5a5a5a' }}>
            This hand-drawn portfolio celebrates the human side of technical work—imperfect, playful, and unapologetically creative. It showcases 10+ years of experience building cloud infrastructure, AI workflows, and distributed systems.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#5a5a5a' }}>
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, with a design philosophy that rejects rigid geometry in favor of organic, sketched aesthetics.
          </p>
          
          {/* Core Focus Card */}
          <WobblyBorder size="lg" decoration="tack">
            <div className="p-8" style={{ borderRadius: BORDER_RADIUS.wobblyMd }}>
              <h3 
                className="text-2xl font-bold"
                style={{
                  fontFamily: '"Kalam", cursive',
                  color: '#2d2d2d',
                }}
              >
                What I Focus On
              </h3>
              <ul className="mt-6 space-y-3 text-base" style={{ color: '#5a5a5a' }}>
                <li>🎨 Hand-drawn aesthetic as first-class design citizen</li>
                <li>⚡ Cloud infrastructure at scale (GCP, multi-cloud)</li>
                <li>🤖 Multi-agent AI systems and MCP architectures</li>
                <li>💰 FinOps automation and cost optimization</li>
              </ul>
            </div>
          </WobblyBorder>
        </div>
      </div>
    </section>
  )
}
