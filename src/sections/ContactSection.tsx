import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(22, 8, 17, 0.65)',
  border: '1px solid rgba(212, 175, 101, 0.28)',
  borderRadius: '2px',
  padding: '14px 16px',
  fontFamily: "var(--font-body)",
  fontSize: '15px',
  color: 'var(--text-primary)',
  outline: 'none',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: '11.5px',
  letterSpacing: '0.22em',
  fontWeight: 600,
  color: 'var(--accent-gold)',
  textTransform: 'uppercase' as const,
  display: 'block',
  marginBottom: '8px',
}

const ADMIN_WHATSAPP_NUMBER = "919962260779";

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('Bharatanatyam')
  const [message, setMessage] = useState('')
  
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const whatsappText = `Hello Chathur Lakshana Academy,

I would like to make an enquiry.

━━━━━━━━━━━━━━━━

Name: ${name}
Phone: ${phone || 'Not provided'}
Email: ${email}
Course: ${course}

Message:
${message || 'No additional message'}

━━━━━━━━━━━━━━━━

This enquiry was submitted through the Chathur Lakshana Academy website.
Thank you.`

    const encodedText = encodeURIComponent(whatsappText)
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedText}`
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank")
    
    // Show instruction state
    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after a delay
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setCourse('Bharatanatyam')
    }, 6000)
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
            }}>✧ ADMISSIONS &amp; ENROLMENT ✧</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.8rem, 5vw, 4.8rem)', fontWeight: 400,
              color: 'var(--text-primary)', marginBottom: '20px',
              lineHeight: 1.15,
            }}>Begin Your Journey</h2>
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
              New batches open every quarter for children and adults alike.
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
                  fontFamily: "var(--font-body)",
                  fontSize: '11.5px', letterSpacing: '0.22em', fontWeight: 600,
                  color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px',
                }}>✦ STUDIO LOCATION</div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 400,
                  marginBottom: '20px',
                }}>
                  Chathur Lakshana Academy of Fine Arts,<br/>Mylapore, Chennai 600004
                </p>

                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11.5px', letterSpacing: '0.22em', fontWeight: 600,
                  color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px',
                }}>✦ CLASS HOURS</div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0,
                }}>
                  Tue–Thu 5–8 pm · Sat &amp; Sun 8 am–1 pm
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
                      fontFamily: "var(--font-body)",
                      fontSize: '11px', letterSpacing: '0.2em', fontWeight: 600,
                      color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px',
                    }}>✦ DIRECT PHONE</div>
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
                      fontFamily: "var(--font-body)",
                      fontSize: '11px', letterSpacing: '0.2em', fontWeight: 600,
                      color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px',
                    }}>✦ OFFICIAL EMAIL</div>
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

          {/* Right: Enquiry Form */}
          <FadeIn delay={0.25}>
            <div style={{
              backgroundColor: '#301326', // Specified card background
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
                color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '32px',
              }}>✧ SEND AN ENQUIRY ✧</div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center', padding: '50px 20px',
                    fontFamily: "var(--font-display)",
                    fontSize: '26px', color: 'var(--accent-gold-light)',
                  }}
                >
                  ✦ Opening WhatsApp...<br />
                  <span style={{ fontSize: '15px', color: 'var(--text-secondary)', fontStyle: 'italic', fontFamily: 'var(--font-body)', display: 'block', marginTop: '16px', lineHeight: 1.6 }}>
                    Your enquiry has been pre-filled.<br/>Please review the message and press Send in WhatsApp.
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sundaram"
                      style={inputStyle}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 101, 0.25)'
                        e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.9)'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.65)'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row-2">
                    <div>
                      <label style={labelStyle}>EMAIL *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        style={inputStyle}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={e => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold)'
                          e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 101, 0.25)'
                          e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.9)'
                        }}
                        onBlur={e => {
                          e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                          e.currentTarget.style.boxShadow = 'none'
                          e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.65)'
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>PHONE NUMBER</label>
                      <input
                        type="tel"
                        placeholder="+91 99622 60779"
                        style={inputStyle}
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onFocus={e => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold)'
                          e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 101, 0.25)'
                          e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.9)'
                        }}
                        onBlur={e => {
                          e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                          e.currentTarget.style.boxShadow = 'none'
                          e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.65)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>COURSE OF INTEREST</label>
                    <select
                      value={course}
                      onChange={e => setCourse(e.target.value)}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23D4AF65' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        paddingRight: '36px',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 101, 0.25)'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <option style={{ background: '#301326', color: '#FFF4E5' }}>Bharatanatyam</option>
                      <option style={{ background: '#301326', color: '#FFF4E5' }}>Carnatic Vocal</option>
                      <option style={{ background: '#301326', color: '#FFF4E5' }}>Choreography &amp; Theory</option>
                      <option style={{ background: '#301326', color: '#FFF4E5' }}>Fine Arts Studio</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>MESSAGE / QUERY</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the student's age, background, or goals..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)'
                        e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 101, 0.25)'
                        e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.9)'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.backgroundColor = 'rgba(22, 8, 17, 0.65)'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '18px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontSize: '13.5px',
                      marginTop: '8px',
                    }}
                  >
                    {isSubmitting ? 'PREPARING ENQUIRY...' : 'SEND ENQUIRY'}
                  </button>

                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5,
                    textAlign: 'center', margin: 0, opacity: 0.85,
                  }}>
                    ✦ This form will securely connect to WhatsApp with your pre-filled details.
                  </p>
                </form>
              )}
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
          .form-row-2 { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  )
}
