import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { WobblyBorder } from '@/components/ui/Decorations'
import { BORDER_RADIUS } from '@/lib/design-tokens'

export function ContactSection() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Contact" description="Let's collaborate on something creative." />
        <div className="mt-12 grid gap-8 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: '#5a5a5a' }}>
              Have an idea? Want to discuss cloud architecture, AI systems, or DevOps practices? I'm always open to conversations with creative teams, technical collaborators, and fellow builders.
            </p>
            <div>
              <p className="text-sm uppercase tracking-widest" style={{ color: '#2d5da1', fontWeight: 700 }}>✉️ Email</p>
              <p className="text-xl font-bold mt-2" style={{ color: '#2d2d2d' }}>riturajreso@gmail.com</p>
            </div>
          </div>

          {/* CTA Card */}
          <WobblyBorder size="lg" decoration="tape">
            <div className="p-8 space-y-6" style={{ borderRadius: BORDER_RADIUS.wobblyMd, background: '#fff9c4' }}>
              <div>
                <p className="text-sm uppercase tracking-widest" style={{ color: '#2d5da1', fontWeight: 700 }}>→ quick start</p>
                <h3 
                  className="text-2xl font-bold mt-2"
                  style={{
                    fontFamily: '"Kalam", cursive',
                    color: '#2d2d2d',
                  }}
                >
                  Send me a message
                </h3>
              </div>
              <p className="text-base" style={{ color: '#5a5a5a' }}>
                Drop a line about your project, question, or collaboration idea. I'll respond within 48 hours.
              </p>
              <Button href="mailto:riturajreso@gmail.com" variant="primary" className="w-full justify-center">
                Email me
              </Button>
            </div>
          </WobblyBorder>
        </div>
      </div>
    </section>
  )
}
