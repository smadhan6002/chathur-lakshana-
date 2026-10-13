import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, Phone, Mail, MapPin, Clock, Send, Sparkles } from 'lucide-react'
import contactImage from '../img/imp 1.jpeg'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

interface ContactSectionProps {
  onOpenEnquiry?: (course?: string, type?: 'Course Enrolment' | 'General Enquiry') => void
}

export default function ContactSection({ onOpenEnquiry }: ContactSectionProps) {
  const handleOpenGeneralEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry('General / Multiple Courses', 'General Enquiry')
    }
    window.dispatchEvent(
      new CustomEvent('open-enquiry-modal', {
        detail: { course: 'General / Multiple Courses', type: 'General Enquiry' },
      })
    )
  }

  const handleOpenCourseEnrolment = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry('Bharatanatyam', 'Course Enrolment')
    }
    window.dispatchEvent(
      new CustomEvent('open-enquiry-modal', {
        detail: { course: 'Bharatanatyam', type: 'Course Enrolment' },
      })
    )
  }

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#160811', // Primary deep burgundy background
        padding: 'clamp(100px, 12vw, 150px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Background Radial Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 84px)' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ ADMISSIONS &amp; STUDIO ENQUIRIES ✧</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.8rem, 5vw, 4.8rem)', fontWeight: 400,
              color: 'var(--text-primary)', marginBottom: '20px',
              lineHeight: 1.15,
            }}>Connect with the Academy</h2>
            <div style={{
              width: '70px', height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', fontStyle: 'italic',
              color: 'var(--text-secondary)', lineHeight: 1.6,
            }}>
              New batches open every quarter for children, youth, and adult disciples in Mylapore, Chennai.
            </p>
          </div>
        </FadeIn>

        {/* Two Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }} className="contact-grid">
          {/* Left: Studio Information & Photography */}
          <FadeIn delay={0.15}>
            <div>
              <div style={{
                position: 'relative',
                padding: '12px',
                border: '1.5px solid rgba(212, 175, 101, 0.35)',
                background: '#301326',
                borderRadius: '2px',
                boxShadow: '0 16px 45px rgba(0, 0, 0, 0.5)',
                marginBottom: '32px',
              }}>
                {/* Corner Gold Motifs */}
                <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
                <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
                <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
                <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

                <div style={{ overflow: 'hidden' }}>
                  <img
                    src={contactImage}
                    alt="Bharatanatyam ensemble at Chathur Lakshana Academy studio"
                    style={{
                      width: '100%', aspectRatio: '4/3',
                      objectFit: 'cover', display: 'block',
                      filter: 'contrast(1.06) saturate(0.96)',
                    }}
                  />
                </div>
              </div>

              {/* Studio Info Details */}
              <div style={{
                backgroundColor: '#301326',
                border: '1px solid rgba(212, 175, 101, 0.28)',
                padding: '28px 32px',
                borderRadius: '2px',
                marginBottom: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "var(--font-body)",
                  fontSize: '11.5px', letterSpacing: '0.22em', fontWeight: 600,
                  color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  <MapPin size={14} />
                  <span>STUDIO LOCATION</span>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 400,
                  marginBottom: '20px',
                }}>
                  Chathur Lakshana Academy of Fine Arts,<br/>Mylapore, Chennai 600004, Tamil Nadu, India
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "var(--font-body)",
                  fontSize: '11.5px', letterSpacing: '0.22em', fontWeight: 600,
                  color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px',
                }}>
                  <Clock size={14} />
                  <span>CLASS HOURS</span>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0,
                }}>
                  Tuesday – Thursday: 5:00 PM – 8:00 PM<br/>Saturday &amp; Sunday: 8:00 AM – 1:00 PM
                </p>
              </div>

              {/* Contact Information Boxes */}
              <div className="contact-boxes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <a
                  href="tel:+919962260779"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    border: '1px solid rgba(212, 175, 101, 0.28)',
                    padding: '20px 22px',
                    backgroundColor: '#301326',
                    borderRadius: '2px',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "var(--font-body)",
                      fontSize: '11px', letterSpacing: '0.2em', fontWeight: 600,
                      color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px',
                    }}>
                      <Phone size={12} />
                      <span>DIRECT PHONE</span>
                    </div>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '14.5px', color: 'var(--text-primary)', fontWeight: 500,
                      wordBreak: 'break-word',
                    }}>+91 99622 60779</div>
                  </div>
                </a>

                <a
                  href="mailto:info@chathurlakshana.in"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    border: '1px solid rgba(212, 175, 101, 0.28)',
                    padding: '20px 22px',
                    backgroundColor: '#301326',
                    borderRadius: '2px',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: "var(--font-body)",
                      fontSize: '11px', letterSpacing: '0.2em', fontWeight: 600,
                      color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px',
                    }}>
                      <Mail size={12} />
                      <span>OFFICIAL EMAIL</span>
                    </div>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '14.5px', color: 'var(--text-primary)', fontWeight: 500,
                      wordBreak: 'break-word',
                    }}>info@chathurlakshana.in</div>
                  </div>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right: Unified Enquiry Hub Action Card */}
          <FadeIn delay={0.25}>
            <div style={{
              backgroundColor: '#301326',
              border: '1.5px solid rgba(212, 175, 101, 0.38)',
              borderRadius: '2px',
              padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 44px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.55), 0 0 30px rgba(212, 175, 101, 0.08)',
              position: 'relative',
            }}>
              {/* Corner Gold Motifs */}
              <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: '12px', letterSpacing: '0.25em', fontWeight: 600,
                color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '18px',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Sparkles size={14} />
                <span>ONLINE ADMISSIONS &amp; ENQUIRIES</span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(28px, 3.5vw, 36px)',
                color: 'var(--text-primary)',
                fontWeight: 400,
                lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                Begin Your Journey with Chathur Lakshana
              </h3>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}>
                Whether you are seeking classical Bharatanatyam training, Carnatic vocal music, choreography theory, or fine arts studio mentorship, our academy provides personalized guidance for beginners to advanced artistes.
              </p>

              <div style={{
                backgroundColor: 'rgba(22, 8, 17, 0.6)',
                border: '1px solid rgba(212, 175, 101, 0.25)',
                padding: '20px',
                borderRadius: '2px',
                marginBottom: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold-light)', fontSize: '13.5px', fontFamily: 'var(--font-body)' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✦</span>
                  <span>Unified enquiry for all courses &amp; levels</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold-light)', fontSize: '13.5px', fontFamily: 'var(--font-body)' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✦</span>
                  <span>Direct guidance from Smt. Dr. Radhika Vairavelavan</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold-light)', fontSize: '13.5px', fontFamily: 'var(--font-body)' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✦</span>
                  <span>In-person Mylapore studio batches &amp; live interactive online options</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <button
                  type="button"
                  onClick={handleOpenCourseEnrolment}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <Send size={15} />
                  <span>ENROL IN A COURSE</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenGeneralEnquiry}
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <MessageSquare size={15} />
                  <span>SUBMIT GENERAL ENQUIRY</span>
                </button>
              </div>

              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
                textAlign: 'center', marginTop: '20px', marginBottom: 0, opacity: 0.85,
              }}>
                ✦ Clicking either button opens our official enquiry form with instant WhatsApp &amp; administrative connection.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
        }
        @media (max-width: 580px) {
          .contact-boxes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
