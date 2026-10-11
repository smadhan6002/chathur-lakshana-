import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { num: '15+', label: 'YEARS OF TEACHING' },
  { num: '300+', label: 'STUDENTS TRAINED' },
  { num: '40+', label: 'STAGE PRODUCTIONS' },
  { num: '25+', label: 'ARANGETRAMS GUIDED' },
]

const testimonials = [
  {
    quote: "Radhika ma'am teaches character before choreography. My daughter walks differently since she joined.",
    name: 'LAKSHMI SUNDARAM',
    role: 'Parent, Mylapore',
  },
  {
    quote: 'My arangetram felt less like an exam and more like a blessing. Every adavu had been earned.',
    name: 'ANUSHA IYER',
    role: 'Senior student',
  },
  {
    quote: "One of the most disciplined young ensembles on the Chennai sabha circuit today.",
    name: 'R. KRISHNAMURTHY',
    role: 'Sabha secretary',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

export default function AchievementsSection() {
  return (
    <section
      id="recognition"
      style={{
        position: 'relative',
        padding: 'clamp(100px, 12vw, 150px) 0',
        overflow: 'hidden',
        backgroundColor: '#260D20', // Secondary rich plum background
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Background Radial Glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(212, 175, 101, 0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 84px)' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ RECOGNITION &amp; HERITAGE ✧</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.8rem, 5vw, 4.8rem)', fontWeight: 400,
              color: 'var(--text-primary)', marginBottom: '20px',
              lineHeight: 1.15,
            }}>Achievements &amp; Voices</h2>
            <div style={{
              width: '70px', height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', fontStyle: 'italic',
              color: 'var(--text-secondary)',
            }}>
              Measured not in trophies, but in artistes who keep dancing.
            </p>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: 'clamp(56px, 8vw, 80px)',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div style={{
                border: '1px solid rgba(212, 175, 101, 0.32)',
                borderRadius: '2px',
                padding: 'clamp(32px, 4vw, 44px) 20px',
                textAlign: 'center',
                backgroundColor: '#301326',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 20px rgba(212, 175, 101, 0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.32)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)'
              }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(3.2rem, 5vw, 4.6rem)', fontWeight: 400,
                  color: 'var(--accent-gold)', lineHeight: 1,
                  textShadow: '0 0 20px rgba(212, 175, 101, 0.3)',
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '12px', letterSpacing: '0.18em', fontWeight: 600,
                  color: 'var(--accent-gold-light)',
                  textTransform: 'uppercase', marginTop: '16px',
                }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={0.25 + i * 0.1}>
              <div style={{
                border: '1px solid rgba(212, 175, 101, 0.3)',
                borderRadius: '2px',
                padding: 'clamp(32px, 4vw, 44px) clamp(24px, 3vw, 36px)',
                backgroundColor: '#301326',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 20px rgba(212, 175, 101, 0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)'
              }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: '52px', color: 'var(--accent-gold)',
                  lineHeight: 1, marginBottom: '12px', opacity: 0.85,
                }}>"</div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)', fontStyle: 'italic',
                  color: 'var(--text-primary)',
                  lineHeight: 1.7, marginBottom: '32px', flexGrow: 1,
                }}>{t.quote}</p>
                <div style={{
                  borderTop: '1px solid rgba(212, 175, 101, 0.18)',
                  paddingTop: '16px',
                }}>
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em',
                    color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '4px',
                  }}>{t.name}</div>
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 400,
                  }}>{t.role}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
