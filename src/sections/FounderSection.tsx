import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import founderImage from '../assets/jayashree_srinivasann_5d04a935902545048f734fdb8f3b06ab.jpg'

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function FounderSection() {
  return (
    <section
      id="founder"
      style={{
        backgroundColor: '#260D20', // Secondary rich plum background
        padding: 'clamp(90px, 12vw, 150px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Subtle Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            gap: 'clamp(40px, 6vw, 84px)',
            alignItems: 'center',
          }}
          className="founder-grid"
        >
          {/* Portrait with Double Antique Gold Frame & Temple Corner Motifs */}
          <FadeIn delay={0.15}>
            <div
              style={{
                position: 'relative',
                padding: '16px',
                border: '1.5px solid rgba(212, 175, 101, 0.45)',
                background: 'rgba(22, 8, 17, 0.75)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(212, 175, 101, 0.1)',
                borderRadius: '2px',
              }}
            >
              {/* Corner Ornaments */}
              <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

              <div style={{ overflow: 'hidden', position: 'relative', border: '1px solid rgba(212, 175, 101, 0.2)' }}>
                <img
                  src={founderImage}
                  alt="Jayashree Srinivasann - Founder of Chathur Lakshana Academy of Fine Arts"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    objectPosition: 'center 18%',
                    display: 'block',
                    filter: 'contrast(1.08) saturate(0.96)',
                  }}
                />
              </div>
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn delay={0.25}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                ✧ FOUNDER &amp; ARTISTIC DIRECTOR ✧
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(2.8rem, 5vw, 4.6rem)',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '20px',
                }}
              >
                Jayashree Srinivasann
              </h2>
              <div
                style={{
                  width: '60px',
                  height: '1.5px',
                  background: 'var(--accent-gold)',
                  marginBottom: '32px',
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '36px',
                }}
              >
                Jayashree Srinivasann is a dedicated Bharatanatyam artist, teacher, and the visionary behind Chathur Lakshana Academy of Fine Arts. With decades of experience performing and imparting knowledge, she has nurtured countless students through the rigors and beauty of classical dance. Her holistic approach focuses on the Kalakshetra tradition, emphasizing both precise technique and profound artistic expression. Through her unwavering commitment, she continues to shape the next generation of artists, ensuring the spiritual and cultural depth of Bharatanatyam thrives.
              </p>

              {/* Callout Quote */}
              <div
                style={{
                  paddingLeft: '24px',
                  borderLeft: '2px solid var(--accent-gold)',
                  backgroundColor: 'rgba(48, 19, 38, 0.4)',
                  padding: '20px 24px',
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 'clamp(20px, 2.5vw, 24px)',
                    fontStyle: 'italic',
                    color: 'var(--accent-gold-light)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  "The stage is not just a place to perform, it is a school where character is shaped."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
        }
      `}</style>
    </section>
  )
}
