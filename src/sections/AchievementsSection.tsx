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

// Authentic student testimonials provided directly by client (Vasundhara N., Aishwarya E., and Mangaiyarkarasi)
const testimonials = [
  {
    name: 'VASUNDHARA N',
    paragraphs: [
      'Learning at Chathur Lakshana is a joyful experience. At Chathur Lakshana, it feels like one big family, where everyone cheers each other on. Senior students guide the younger batches, which builds a lovely bond among us. We learn every gesture and movement along with its cultural, spiritual, and deeper meaning, so our understanding of the art goes beyond the performance itself. We don’t just learn the steps. Rather, we learn to feel them. Performance opportunities throughout the year let us put what we learn into practice, and with every show we grow in expression and confidence.',
      'Our Acharya is endlessly patient and gentle, and she treats us like her own children. She encourages us to bring our best to everything we do, whether on stage or in everyday life. Her deep knowledge of rhythm and expression makes every class engaging, insightful, and full of learning. Under her guidance, I have grown not just as a dancer, but as a more confident person.',
    ],
  },
  {
    name: 'AISHWARYA E',
    paragraphs: [
      'My experience in learning Dance here in Chathur Lakshana always gives me warmth and build clarity day by day.',
      'The space, which is created by our guru always creates hope and trust within ourselves to reach our goals. Also during performances and productions, I have learnt a lot of nuances not only in dancing but also how other things need to be taken care of which revolves around dancing.',
      'Lastly, the most beautiful feeling that I felt is, ‘Education without fear’.',
    ],
  },
  {
    name: 'MANGAIYARKARASI',
    paragraphs: [
      'Learning Bharatanatyam under the tutelage of Smt. Dr. Radhika is truly a blessing. It has been a wonderful experience learning padams, javalis, and varnams from her. I deeply admire the way she teaches the essence and core concepts of every composition. She guides us in bringing out the appropriate expressions and carefully points out what needs correction and what requires more emphasis.',
      'What makes her teaching exceptional is her attention to detail. She shares every nuance, from the intricacies of the thala kattu to the finer aspects of abhinaya, drawing from the rich experience she has gained throughout her artistic journey. She imparts her knowledge with immense love, generosity, and dedication. Learning from her is always a joy and a privilege. The only challenge for students is to continually upskill ourselves to keep pace with her energy, passion, and remarkable speed of teaching.',
    ],
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
              ✧ HONOURS, AWARDS &amp; STUDENT VOICES ✧
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
              Honours &amp; Authentic Student Voices
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
              A distinguished legacy of artistic mastery, cultural leadership, and authentic disciple reflections.
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
        <FadeIn delay={0.15}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 56px)' }}>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              ✧ AUTHENTIC STUDENT VOICES ✧
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4.5vw, 42px)',
                color: 'var(--text-primary)',
                fontWeight: 400,
                lineHeight: 1.2,
                margin: '0 0 12px',
              }}
            >
              Learning Beyond the Dance
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                maxWidth: '680px',
                margin: '0 auto',
                lineHeight: 1.5,
              }}
            >
              Reflections from genuine disciples on the warmth, depth, and transformative pedagogy of Chathur Lakshana.
            </p>
          </div>
        </FadeIn>

        {/* Testimonials Grid (3 Authentic Cards: Vasundhara N., Aishwarya E., and Mangaiyarkarasi) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(20px, 2.8vw, 32px)',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={0.15 + i * 0.12}>
              <div
                style={{
                  border: '1px solid rgba(212, 175, 101, 0.3)',
                  borderRadius: '2px',
                  padding: 'clamp(28px, 3.5vw, 38px) clamp(22px, 3vw, 32px)',
                  backgroundColor: '#301326',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow =
                    '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 20px rgba(212, 175, 101, 0.15)'
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
                    fontSize: '44px',
                    color: 'var(--accent-gold)',
                    lineHeight: 1,
                    marginBottom: '14px',
                    opacity: 0.85,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <div
                  style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginBottom: '24px',
                  }}
                >
                  {t.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(13.5px, 1.35vw, 15px)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.7,
                        margin: 0,
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: '1px solid rgba(212, 175, 101, 0.22)',
                    paddingTop: '16px',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span style={{ color: 'var(--accent-gold)', fontSize: '11px' }}>✦</span>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.name}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .testimonials-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
