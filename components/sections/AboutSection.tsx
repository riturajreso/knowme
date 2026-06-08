import { SectionHeading } from '@/components/ui/SectionHeading'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'

export function AboutSection() {
  return (
    <section id="about" className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="About" description="A personal space that reflects who I am as a builder, engineer, and problem solver." />
        <div className="mt-12 space-y-8">
          <p className="text-lg leading-relaxed" style={{ color: '#5a5a5a' }}>
            This site is a digital representation of me: how I think, what I value, and the kind of work I enjoy building. It also shows the experience behind that story, including 10+ years of cloud infrastructure, AI workflows, and distributed systems.
          </p>
          
          {/* Core Focus Card */}
          <WobblyBorder size="lg">
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
                <li>🎨 A visual style that reflects personality, not just information</li>
                <li>⚡ Cloud infrastructure at scale (AWS, Azure, GCP)</li>
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
