import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Sparkles } from 'lucide-react'

interface StatItem {
  target: number
  suffix: string
  label: string
}

// Existing displayed metrics preserved per Phase 10 instructions; flagged for client confirmation in audit report
const stats: StatItem[] = [
  { target: 15, suffix: '+', label: 'YEARS OF TEACHING' },
  { target: 300, suffix: '+', label: 'STUDENTS TRAINED' },
  { target: 40, suffix: '+', label: 'STAGE PRODUCTIONS' },
  { target: 25, suffix: '+', label: 'ARANGETRAMS GUIDED' },
]

// Verified Awards and Recognitions from Client Document (Phase 9)
const awards = [
  {
    title: 'Vani Kala Nipuna for Bharatanatyam',
    organization: 'Sri Thyaga Brahma Gana Sabha',
    year: '2025–2026',
    highlight: true,
  },
  {
    title: 'Best Humanity Award 2024',
    organization: 'International Achievers Foundation',
    year: 'November 23, 2024',
  },
  {
    title: 'Abhyasa Nritya Vardhani',
    organization: 'Abhyasa Academy of Classical Dance, Coimbatore',
    year: 'October 2023',
  },
  {
    title: 'Golden Achiever Award',
    organization: 'International Achievers Foundation',
    year: 'September 25, 2022',
  },
  {
    title: 'Best Bharatanatyam Artist for 2021',
    organization: "People's Forum of India",
    year: '2021',
  },
  {
    title: 'Natya Chemmal',
    organization: 'Sanganath Chemmal Kayal Shaik Muhammad Trust',
  },
  {
    title: 'Natya Kalavani',
    organization: 'All India All Press and Media Reporters Association',
  },
  {
    title: 'Sangeetha Bhakthi Prachara Samman',
    organization: 'Tapas Cultural Foundation',
  },
  {
    title: 'Vasanthalakshmi Narasimhachari & Narasimhachari Endowment Award',
    organization: 'Natyarangam (Award for Junior Dancer)',
  },
  {
    title: 'Rashtrapathi Puraskar',
    organization: 'Bharath Scouts and Guides Movement',
  },
  {
    title: 'Best Out Going Student',
    organization: 'Kalakshetra College of Fine Arts',
  },
]

// Existing testimonials preserved per Phase 12; verified to address Radhika ma'am
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
    quote: 'One of the most disciplined young ensembles on the Chennai sabha circuit today.',
    name: 'R. KRISHNAMURTHY',
    role: 'Sabha secretary',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
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

// Premium animated count-up number component
function AnimatedCounter({
  target,
  suffix = '+',
  duration = 1.9,
  delay = 0,
  inView,
}: {
  target: number
  suffix?: string
  duration?: number
  delay?: number
  inView: boolean
}) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target)
      hasAnimated.current = true
      return
    }

    hasAnimated.current = true

    let startTimestamp: number | null = null
    let frameId: number
    const delayMs = delay * 1000

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp

      if (elapsed < delayMs) {
        frameId = requestAnimationFrame(step)
        return
      }

      const progress = Math.min((elapsed - delayMs) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.min(target, Math.floor(easeOut * target))

      setCount(current)

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [inView, target, duration, delay])

  return (
    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-flex',
        alignItems: 'baseline',
        justifyContent: 'center',
      }}
    >
      <span>{count}</span>
      <span style={{ color: 'var(--accent-gold)' }}>{suffix}</span>
    </span>
  )
}

export default function AchievementsSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(212, 175, 101, 0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 84px)' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              ✧ AWARDS &amp; RECOGNITION ✧
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                lineHeight: 1.15,
              }}
            >
              Honours, Recognition &amp; Voices
            </h2>
            <div
              style={{
                width: '70px',
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                margin: '0 auto 24px',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
              }}
            >
              A distinguished legacy of artistic mastery, cultural leadership, and academic distinction.
            </p>
          </div>
        </FadeIn>

        {/* Animated Stats Grid with Staggered Card Reveals */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            marginBottom: 'clamp(64px, 8vw, 96px)',
          }}
          className="stats-grid"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                border: '1px solid rgba(212, 175, 101, 0.32)',
                borderRadius: '4px',
                padding: 'clamp(32px, 4vw, 44px) 20px',
                textAlign: 'center',
                backgroundColor: '#301326',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.75)'
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 101, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.32)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '6px',
                  height: '6px',
                  borderTop: '1px solid var(--accent-gold)',
                  borderRight: '1px solid var(--accent-gold)',
                  opacity: 0.6,
                }}
              />

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 5vw, 4.6rem)',
                  fontWeight: 400,
                  color: 'var(--accent-gold)',
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(212, 175, 101, 0.3)',
                }}
              >
                <AnimatedCounter
                  target={s.target}
                  suffix={s.suffix}
                  duration={1.8}
                  delay={i * 0.12}
                  inView={statsInView}
                />
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  fontWeight: 600,
                  color: 'var(--accent-gold-light)',
                  textTransform: 'uppercase',
                  marginTop: '16px',
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified Awards & Recognitions Grid (Phase 9) */}
        <FadeIn delay={0.2}>
          <div style={{ marginBottom: 'clamp(64px, 8vw, 96px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                <Award size={14} />
                <span>Prestigious Accolades</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(26px, 4vw, 36px)',
                  color: 'var(--text-primary)',
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                Awards &amp; Felicitations Conferred
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '20px',
              }}
            >
              {awards.map((a) => (
                <div
                  key={a.title}
                  style={{
                    backgroundColor: '#301326',
                    border: a.highlight
                      ? '1.5px solid var(--accent-gold)'
                      : '1px solid rgba(212, 175, 101, 0.28)',
                    borderRadius: '2px',
                    padding: '24px 22px',
                    position: 'relative',
                    boxShadow: a.highlight
                      ? '0 12px 35px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,101,0.15)'
                      : '0 10px 25px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = a.highlight
                      ? 'var(--accent-gold)'
                      : 'rgba(212, 175, 101, 0.28)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                        Recognition
                      </span>
                    </div>
                    {a.year && (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          color: 'var(--accent-gold-light)',
                          background: 'rgba(212, 175, 101, 0.12)',
                          padding: '2px 8px',
                          borderRadius: '2px',
                        }}
                      >
                        {a.year}
                      </span>
                    )}
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      color: 'var(--text-primary)',
                      margin: '0 0 8px',
                      fontWeight: 500,
                      lineHeight: 1.25,
                    }}
                  >
                    {a.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--accent-gold-light)',
                      margin: 0,
                      marginTop: 'auto',
                      lineHeight: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {a.organization}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Testimonials Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            ✧ STUDENT &amp; COMMUNITY VOICES ✧
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 4vw, 36px)',
              color: 'var(--text-primary)',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Words from Parents &amp; Artistes
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={0.25 + i * 0.1}>
              <div
                style={{
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 20px rgba(212, 175, 101, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '52px',
                    color: 'var(--accent-gold)',
                    lineHeight: 1,
                    marginBottom: '12px',
                    opacity: 0.85,
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                    flexGrow: 1,
                  }}
                >
                  {t.quote}
                </p>
                <div
                  style={{
                    borderTop: '1px solid rgba(212, 175, 101, 0.18)',
                    paddingTop: '16px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      fontWeight: 400,
                    }}
                  >
                    {t.role}
                  </div>
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
