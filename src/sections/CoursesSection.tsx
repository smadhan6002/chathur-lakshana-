import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const secondaryCourses = [
  {
    level: 'FOUNDATION → ADVANCED',
    title: 'Carnatic Vocal',
    desc: 'Sarali varisai through kritis, raga alapana and layam for dancers and singers alike.',
    details: 'Voice culture · Tala training · Concert preparation',
  },
  {
    level: 'SENIOR STUDENTS',
    title: 'Choreography & Theory',
    desc: 'Natya Shastra fundamentals, thematic production design and stagecraft.',
    details: 'Composition · Lighting & costume · Production management',
  },
  {
    level: 'ALL AGES',
    title: 'Fine Arts Studio',
    desc: 'Kolam, temple art and traditional painting as companions to the performing arts.',
    details: 'Weekend studio · Exhibitions · Festival installations',
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

// 3D Card with subtle perspective tilt on desktop, disabled on mobile/touch
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Subtle max 5 deg tilt
    const rx = -(y / (rect.height / 2)) * 4.5
    const ry = (x / (rect.width / 2)) * 4.5
    setTilt({ rx, ry })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`card-3d-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        ...style,
      }}
    >
      <div
        className="card-3d-inner"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out, box-shadow 0.4s ease',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface CoursesSectionProps {
  onOpenEnquire?: (course: string) => void
}

export default function CoursesSection({ onOpenEnquire }: CoursesSectionProps) {
  const handleEnquire = (courseName: string) => {
    if (onOpenEnquire) {
      onOpenEnquire(courseName)
    } else {
      window.dispatchEvent(new CustomEvent('open-enquiry-modal', { detail: { course: courseName } }))
    }
  }
  return (
    <section
      id="courses"
      style={{
        backgroundColor: '#160811', // Deep burgundy background
        padding: 'clamp(100px, 12vw, 150px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Decorative Gold Circles / Temple Lighting in Background */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '-80px',
          width: '320px',
          height: '320px',
          border: '1px solid rgba(212, 175, 101, 0.12)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          right: '-120px',
          width: '450px',
          height: '450px',
          border: '1px solid rgba(212, 175, 101, 0.08)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 84px)' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}>
              ✧ CLASSICAL CURRICULUM ✧
            </div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
              fontWeight: 500,
              color: '#F5DDA0',
              textShadow: '0 0 25px rgba(212, 175, 101, 0.45), 0 4px 15px rgba(0, 0, 0, 0.8)',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}>
              Courses Offered
            </h2>
            <div style={{
              width: '70px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              Graded, unhurried and rooted — every syllabus ends in performance.
            </p>
          </div>
        </FadeIn>

        {/* Featured Course: Bharatanatyam with Temple Frame & 3D Tilt */}
        <FadeIn delay={0.15}>
          <TiltCard style={{ marginBottom: '40px' }}>
            <div
              style={{
                backgroundColor: '#301326', // Specified card background
                border: '1.5px solid rgba(212, 175, 101, 0.45)',
                borderRadius: '3px',
                padding: 'clamp(36px, 6vw, 68px) clamp(24px, 5vw, 56px)',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 101, 0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Corner Gold Motifs */}
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

              {/* Inner Decorative Hairline Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '16px',
                  border: '1px solid rgba(212, 175, 101, 0.18)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  ✧ SIGNATURE COURSE ✧
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)',
                  fontWeight: 400,
                  color: '#FFF4E5',
                  textShadow: '0 0 20px rgba(212, 175, 101, 0.25)',
                  marginBottom: '20px',
                  lineHeight: 1.15,
                }}>
                  Bharatanatyam
                </h3>

                <div style={{
                  width: '60px',
                  height: '1.5px',
                  backgroundColor: 'var(--accent-gold)',
                  margin: '0 auto 24px',
                }} />

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '720px',
                  margin: '0 auto 32px',
                }}>
                  Adavus, alarippu to varnam, abhinaya and nattuvangam, taught in graded years.
                </p>

                {/* Highlights Strip */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '14.5px',
                    color: 'var(--accent-gold-light)',
                    lineHeight: 1.6,
                    letterSpacing: '0.04em',
                    marginBottom: '44px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                  className="highlights-wrapper"
                >
                  <span style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>Weekly Practical + Theory</span>
                  <span className="bullet-point" style={{ color: 'var(--accent-gold)' }}>✧</span>
                  <span style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>Annual Sabha Performance</span>
                  <span className="bullet-point" style={{ color: 'var(--accent-gold)' }}>✧</span>
                  <span style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>Arangetram Guidance</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnquire('Bharatanatyam')}
                  className="btn-primary"
                  style={{
                    padding: '16px 48px',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  ENQUIRE NOW
                </button>
              </div>
            </div>
          </TiltCard>
        </FadeIn>

        {/* Secondary Courses Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="secondary-courses-grid"
        >
          {secondaryCourses.map((course, i) => (
            <FadeIn key={course.title} delay={0.25 + (i * 0.1)}>
              <TiltCard style={{ height: '100%' }}>
                <div
                  style={{
                    backgroundColor: '#301326',
                    border: '1px solid rgba(212, 175, 101, 0.3)',
                    borderRadius: '2px',
                    padding: 'clamp(32px, 4vw, 44px) clamp(24px, 3vw, 34px)',
                    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                    e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 101, 0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.3)'
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.35)'
                  }}
                >
                  {/* Level Tag */}
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: 'var(--accent-gold)',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}>
                    {course.level}
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 'clamp(1.9rem, 2.5vw, 2.3rem)',
                    fontWeight: 400,
                    color: '#FFF4E5',
                    marginBottom: '14px',
                    lineHeight: 1.2,
                  }}>
                    {course.title}
                  </h3>

                  <div style={{
                    width: '32px',
                    height: '1.5px',
                    backgroundColor: 'var(--accent-gold)',
                    marginBottom: '20px',
                    opacity: 0.6,
                  }} />

                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '15.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                    flexGrow: 1,
                  }}>
                    {course.desc}
                  </p>

                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '13.5px',
                    color: 'var(--accent-gold-light)',
                    lineHeight: 1.55,
                    borderTop: '1px solid rgba(212, 175, 101, 0.18)',
                    paddingTop: '18px',
                    fontWeight: 500,
                    marginBottom: '16px',
                  }}>
                    {course.details}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEnquire(course.title)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px 0',
                      fontFamily: "var(--font-body)",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.25s ease',
                      marginTop: 'auto',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent-gold-light)'
                      e.currentTarget.style.letterSpacing = '0.24em'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--accent-gold)'
                      e.currentTarget.style.letterSpacing = '0.2em'
                    }}
                  >
                    <span>ENQUIRE FOR {course.title.toUpperCase()}</span>
                    <span>→</span>
                  </button>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .secondary-courses-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .secondary-courses-grid { grid-template-columns: 1fr !important; }
          .highlights-wrapper {
             flex-direction: column !important;
             gap: 8px !important;
          }
          .bullet-point { display: none !important; }
        }
      `}</style>
    </section>
  )
}
