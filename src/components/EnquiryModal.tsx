import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Sparkles, Send, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export const AVAILABLE_COURSES = [
  'Bharatanatyam',
  'Carnatic Vocal',
  'Choreography & Theory',
  'Fine Arts Studio',
] as const

export const LEARNING_MODES = [
  'In-Person (Mylapore Studio)',
  'Online (Live Interactive)',
  'Hybrid (In-Person & Online)',
] as const

interface EnquiryModalProps {
  isOpen: boolean
  initialCourse?: string
  onClose: () => void
}

const ADMIN_WHATSAPP_NUMBER = '919840000000'

export default function EnquiryModal({ isOpen, initialCourse = 'Bharatanatyam', onClose }: EnquiryModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState(initialCourse)
  const [learningMode, setLearningMode] = useState<string>(LEARNING_MODES[0])
  const [message, setMessage] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)

  // Update selected course whenever initialCourse changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialCourse && AVAILABLE_COURSES.includes(initialCourse as any)) {
        setCourse(initialCourse)
      } else {
        setCourse('Bharatanatyam')
      }
      setErrors({})
      setIsSuccess(false)
    }
  }, [isOpen, initialCourse])

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }
  }, [isOpen])

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!name.trim()) {
      errs.name = 'Please enter your full name.'
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '')
    if (!phone.trim()) {
      errs.phone = 'Please provide a contact phone number.'
    } else if (cleanPhone.length < 8) {
      errs.phone = 'Please enter a valid phone number (minimum 8 digits).'
    }

    if (!email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!course) {
      errs.course = 'Please select a course.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Attempt optional Supabase persistence if table/credentials exist
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (supabaseUrl && !supabaseUrl.includes('your-project') && supabase) {
        await supabase.from('enquiries').insert([
          {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            course,
            learning_mode: learningMode,
            message: message.trim(),
            created_at: new Date().toISOString(),
          },
        ])
      }
    } catch {
      // Continue to WhatsApp without blocking user enquiry
    }

    // Format clean WhatsApp message for academy admin
    const whatsappText = `Hello Chathur Lakshana Academy,

I would like to enquire about admissions.

━━━━━━━━━━━━━━━━
• Full Name: ${name.trim()}
• Phone: ${phone.trim()}
• Email: ${email.trim()}
• Course: ${course}
• Learning Mode: ${learningMode}

• Additional Details:
${message.trim() || 'No additional note'}
━━━━━━━━━━━━━━━━

Submitted via Chathur Lakshana Academy website.`

    const encodedText = encodeURIComponent(whatsappText)
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedText}`

    // Open WhatsApp link in new tab
    window.open(whatsappUrl, '_blank')

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset fields after a delay
    setTimeout(() => {
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
          className="enquiry-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(10, 4, 8, 0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            overflowY: 'auto',
          }}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: '#1E0918',
              backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(212, 175, 101, 0.12) 0%, rgba(30, 9, 24, 0) 70%)',
              border: '1px solid rgba(212, 175, 101, 0.35)',
              borderRadius: '4px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 101, 0.12)',
              padding: 'clamp(28px, 5vw, 42px)',
              margin: 'auto',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Corner Decorative Accents */}
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry modal"
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 101, 0.25)',
                color: 'var(--accent-gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                zIndex: 2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 101, 0.2)'
                e.currentTarget.style.borderColor = 'var(--accent-gold)'
                e.currentTarget.style.color = '#FFF'
                e.currentTarget.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.25)'
                e.currentTarget.style.color = 'var(--accent-gold-light)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              /* Success Confirmation View */
              <div style={{ textAlign: 'center', padding: '30px 10px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212, 175, 101, 0.12)',
                    border: '1px solid var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: 'var(--accent-gold)',
                    boxShadow: '0 0 25px rgba(212, 175, 101, 0.3)',
                  }}
                >
                  <CheckCircle size={32} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(26px, 3.5vw, 32px)',
                    color: 'var(--text-primary)',
                    margin: '0 0 10px',
                    fontWeight: 400,
                  }}
                >
                  Enquiry Prepared
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    maxWidth: '420px',
                    margin: '0 auto 24px',
                  }}
                >
                  Thank you, <strong style={{ color: 'var(--accent-gold-light)' }}>{name || 'Artiste'}</strong>! Your enquiry for{' '}
                  <strong style={{ color: 'var(--accent-gold)' }}>{course}</strong> has been opened. Our academy will assist you shortly.
                </p>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary"
                  style={{ padding: '12px 36px', fontSize: '13px', cursor: 'pointer' }}
                >
                  DONE
                </button>
              </div>
            ) : (
              /* Form View */
              <div>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '26px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent-gold)',
                      fontSize: '11px',
                      letterSpacing: '0.22em',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '8px',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>Admissions &bull; 2026</span>
                  </div>

                  <h3
                    id="enquiry-modal-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 4vw, 36px)',
                      color: 'var(--text-primary)',
                      margin: '0 0 8px',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                    }}
                  >
                    Begin Your Journey
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Tell us a little about yourself and the course you're interested in.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="enquiry-name"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        fontWeight: 600,
                        color: 'var(--accent-gold)',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
                      }}
                      placeholder="e.g. Priyadarshini Sundaram"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(22, 8, 17, 0.75)',
                        border: `1px solid ${errors.name ? '#FF6B6B' : 'rgba(212, 175, 101, 0.35)'}`,
                        borderRadius: '2px',
                        padding: '12px 14px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14.5px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease',
                      }}
                    />
                    {errors.name && (
                      <span style={{ display: 'block', color: '#FF8585', fontSize: '11.5px', marginTop: '4px', fontFamily: 'var(--font-body)' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '14px',
                      marginBottom: '16px',
                    }}
                    className="enquiry-two-col"
                  >
                    <div>
                      <label
                        htmlFor="enquiry-phone"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          letterSpacing: '0.2em',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        Phone Number *
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                        }}
                        placeholder="e.g. +91 98400 12345"
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(22, 8, 17, 0.75)',
                          border: `1px solid ${errors.phone ? '#FF6B6B' : 'rgba(212, 175, 101, 0.35)'}`,
                          borderRadius: '2px',
                          padding: '12px 14px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14.5px',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.3s ease',
                        }}
                      />
                      {errors.phone && (
                        <span style={{ display: 'block', color: '#FF8585', fontSize: '11.5px', marginTop: '4px', fontFamily: 'var(--font-body)' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-email"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          letterSpacing: '0.2em',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        Email Address *
                      </label>
                      <input
                        id="enquiry-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
                        }}
                        placeholder="e.g. priya@example.com"
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(22, 8, 17, 0.75)',
                          border: `1px solid ${errors.email ? '#FF6B6B' : 'rgba(212, 175, 101, 0.35)'}`,
                          borderRadius: '2px',
                          padding: '12px 14px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14.5px',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.3s ease',
                        }}
                      />
                      {errors.email && (
                        <span style={{ display: 'block', color: '#FF8585', fontSize: '11.5px', marginTop: '4px', fontFamily: 'var(--font-body)' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Course & Learning Mode Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1fr',
                      gap: '14px',
                      marginBottom: '16px',
                    }}
                    className="enquiry-two-col"
                  >
                    <div>
                      <label
                        htmlFor="enquiry-course"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          letterSpacing: '0.2em',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        Course Selection *
                      </label>
                      <select
                        id="enquiry-course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#1E0918',
                          border: '1px solid rgba(212, 175, 101, 0.35)',
                          borderRadius: '2px',
                          padding: '12px 14px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                        }}
                      >
                        {AVAILABLE_COURSES.map((c) => (
                          <option key={c} value={c} style={{ backgroundColor: '#260D20', color: '#FFF' }}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="enquiry-mode"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          letterSpacing: '0.2em',
                          fontWeight: 600,
                          color: 'var(--accent-gold)',
                          textTransform: 'uppercase',
                          marginBottom: '6px',
                        }}
                      >
                        Learning Mode
                      </label>
                      <select
                        id="enquiry-mode"
                        value={learningMode}
                        onChange={(e) => setLearningMode(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: '#1E0918',
                          border: '1px solid rgba(212, 175, 101, 0.35)',
                          borderRadius: '2px',
                          padding: '12px 14px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'var(--text-primary)',
                          outline: 'none',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                        }}
                      >
                        {LEARNING_MODES.map((m) => (
                          <option key={m} value={m} style={{ backgroundColor: '#260D20', color: '#FFF' }}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '22px' }}>
                    <label
                      htmlFor="enquiry-message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        fontWeight: 600,
                        color: 'var(--accent-gold)',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      Message or Additional Details
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your age group, prior dance experience, or specific questions..."
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(22, 8, 17, 0.75)',
                        border: '1px solid rgba(212, 175, 101, 0.35)',
                        borderRadius: '2px',
                        padding: '12px 14px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '15px',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.75 : 1,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>PROCESSING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>SUBMIT ENQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>

          <style>{`
            @media (max-width: 600px) {
              .enquiry-two-col {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
