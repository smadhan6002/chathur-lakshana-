import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import academyImage from '../img/imp 2.jpeg'

const values = [
  {
    label: 'TRADITION',
    text: 'Rooted in the Pandanallur and Vazhuvoor bani — authentic, uncompromised and handed down with reverence.',
  },
  {
    label: 'VISION',
    text: 'An academy where every student becomes both a complete artiste and a confident individual.',
  },
  {
    label: 'PHILOSOPHY',
    text: 'Nurturing artistic excellence alongside personality development — the stage as a school of character.',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function AcademySection() {
  return (
    <section
      id="academy"
      style={{
        backgroundColor: '#260D20', // Rich secondary burgundy-plum background
        padding: 'clamp(90px, 12vw, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Subtle Temple Arch Background Texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to bottom, rgba(22, 8, 17, 0.9), transparent)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 84px)' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(11px, 1.4vw, 12.5px)',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}>
              ✧ ABOUT THE ACADEMY ✧
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.6rem, 5.2vw, 5rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}>
              A lineage kept alive, one adavu<br />at a time
            </h2>
            <div style={{
              width: '70px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '750px',
              margin: '0 auto',
            }}>
              Chathur Lakshana — the four marks of a complete artiste: form, rhythm, emotion, devotion.
            </p>
          </div>
        </FadeIn>

        {/* Two Column Layout: Authentic Imagery + Core Values */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
          className="academy-grid"
        >
          {/* Left: Image with Temple Frame & Corner Accents */}
          <FadeIn delay={0.15}>
            <div
              style={{
                position: 'relative',
                backgroundColor: '#301326',
                padding: '12px',
                border: '1px solid rgba(212, 175, 101, 0.35)',
                borderRadius: '2px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 101, 0.08)',
              }}
            >
              {/* Corner Gold Motifs */}
              <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <motion.img
                  src={academyImage}
                  alt="Drishti Bhedam — Bharatanatyam dancer abhinaya and eye discipline"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    filter: 'contrast(1.06) saturate(0.96)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 20px 16px',
                    background: 'linear-gradient(to top, rgba(22, 8, 17, 0.95) 0%, rgba(22, 8, 17, 0.6) 60%, transparent 100%)',
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 'clamp(14px, 1.8vw, 17px)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'var(--accent-gold-light)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    "Drishti bhedam — the discipline of the gaze, taught before the feet ever move."
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Pillars & Values Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {values.map((v, i) => (
              <FadeIn key={v.label} delay={0.25 + i * 0.12}>
                <div
                  style={{
                    backgroundColor: '#301326', // Specified card background
                    border: '1px solid rgba(212, 175, 101, 0.28)',
                    padding: 'clamp(24px, 4vw, 32px) clamp(24px, 4vw, 36px)',
                    position: 'relative',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.65)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 101, 0.15)'
                    e.currentTarget.style.backgroundColor = '#38162D'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.35)'
                    e.currentTarget.style.backgroundColor = '#301326'
                  }}
                >
                  {/* Subtle Gold Accent Left Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      background: 'linear-gradient(to bottom, var(--accent-gold), transparent)',
                    }}
                  />
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    color: 'var(--accent-gold)',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <span>✦</span> {v.label}
                  </div>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 'clamp(15px, 1.6vw, 17px)',
                    fontWeight: 400,
                    color: 'var(--text-primary)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .academy-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
