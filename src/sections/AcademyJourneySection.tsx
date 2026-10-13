import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Landmark, Compass, Award, Globe, Users, Info } from 'lucide-react'

// Institutional Milestones of Chathur Lakshana Academy of Fine Arts
// Verified institutional history only — no invented dates; unconfirmed years flagged for client confirmation
const academyMilestones = [
  {
    period: 'Founding Inception',
    yearTag: '[Founding Year to be confirmed by client]',
    title: 'Establishment in Mylapore, Chennai',
    icon: Landmark,
    category: 'INSTITUTIONAL INCEPTION',
    desc: 'Chathur Lakshana Academy of Fine Arts was established by Smt. Dr. Radhika Vairavelavan in Mylapore, Chennai — the cultural heartland of South Indian classical arts. Founded to uphold the authentic Kalakshetra lineage and sacred Guru-Shishya parampara, the academy commenced with dedicated batches in foundational Bharatanatyam.',
  },
  {
    period: 'Curriculum Evolution',
    yearTag: '[Milestone Year to be confirmed by client]',
    title: 'Holistic Arts & Knowledge System',
    icon: Compass,
    category: 'PEDAGOGICAL EXPANSION',
    desc: 'Expanding beyond pure movement, the academy formalized its graded curriculum to treat art as a comprehensive knowledge system. Carnatic vocal training, tala recitation, nattuvangam (cymbals), and dance theory based on classical treatises were integrated into student development.',
  },
  {
    period: 'Sabha & Stage Traditions',
    yearTag: 'Annual Cycle',
    title: 'Student Stage Productions & Sabha Showcases',
    icon: Award,
    category: 'PERFORMANCE HERITAGE',
    desc: 'Establishing an unhurried, stage-ready performance ethos, the academy initiated annual student stage presentations across Chennai’s renowned sabhas and temple festivals, giving young learners first-hand exposure to live orchestra, abhinaya, and ensemble discipline.',
  },
  {
    period: 'Global Outreach',
    yearTag: 'Contemporary Expansion',
    title: 'Hybrid & International Classrooms',
    icon: Globe,
    category: 'GLOBAL REACH',
    desc: 'To accommodate eager learners across India and across the globe, the academy developed interactive online and hybrid classrooms. Individualized attention and adherence to Kalakshetra precision remain uncompromised regardless of geographic distance.',
  },
  {
    period: 'Present Day & Future',
    yearTag: 'Active Academy Era',
    title: 'Arangetram Guidance & Cultural Stewardship',
    icon: Users,
    category: 'CONTINUING MISSION',
    desc: 'Today, Chathur Lakshana Academy of Fine Arts stands as a nurturing institution training diverse learners — from foundational children’s batches to senior dancers completing their arangetram debuts and performing in major classical productions.',
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

export default function AcademyJourneySection() {
  return (
    <section
      id="academy-journey"
      style={{
        backgroundColor: '#160811', // Deep burgundy background
        padding: 'clamp(90px, 12vw, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 80px)' }}>
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
              ✧ INSTITUTIONAL EVOLUTION ✧
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 5.2vw, 5rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Our Academy Journey
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
                lineHeight: 1.6,
                maxWidth: '780px',
                margin: '0 auto',
              }}
            >
              The institutional story of Chathur Lakshana Academy of Fine Arts — from its founding in Mylapore to its present-day cultural stewardship.
            </p>
          </div>
        </FadeIn>

        {/* Client Confirmation Notice Card */}
        <FadeIn delay={0.1}>
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto 48px',
              padding: '16px 22px',
              backgroundColor: 'rgba(48, 19, 38, 0.55)',
              border: '1px dashed rgba(212, 175, 101, 0.4)',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <Info size={20} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--accent-gold-light)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              <strong>Institutional Verification Note:</strong> Key institutional milestone details are structured below based on verified academy records. Historical dates marked with brackets are awaiting exact client confirmation.
            </p>
          </div>
        </FadeIn>

        {/* Timeline Grid */}
        <div style={{ position: 'relative', maxWidth: '840px', margin: '0 auto', paddingLeft: '44px' }}>
          {/* Animated Gold Vertical Spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '10px',
              top: '16px',
              bottom: '16px',
              width: '1.5px',
              background: 'linear-gradient(to bottom, transparent, var(--accent-gold) 6%, var(--accent-gold) 94%, transparent)',
              transformOrigin: 'top',
              boxShadow: '0 0 10px rgba(212, 175, 101, 0.4)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {academyMilestones.map((m, idx) => {
              const IconComp = m.icon
              return (
                <FadeIn key={m.title} delay={0.15 + idx * 0.1}>
                  <div style={{ position: 'relative' }}>
                    {/* Gold Node Marker */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-42px',
                        top: '24px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#160811',
                        border: '2.5px solid var(--accent-gold)',
                        boxShadow: '0 0 12px rgba(212, 175, 101, 0.5), inset 0 0 6px rgba(212, 175, 101, 0.4)',
                        zIndex: 3,
                      }}
                    />

                    {/* Editorial Milestone Card */}
                    <div
                      style={{
                        backgroundColor: '#301326',
                        border: '1px solid rgba(212, 175, 101, 0.32)',
                        borderRadius: '2px',
                        padding: 'clamp(24px, 4vw, 36px)',
                        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(6px)'
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                        e.currentTarget.style.boxShadow =
                          '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(212, 175, 101, 0.15)'
                        e.currentTarget.style.backgroundColor = '#38162D'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)'
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.32)'
                        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.4)'
                        e.currentTarget.style.backgroundColor = '#301326'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.18em',
                            color: 'var(--accent-gold)',
                            textTransform: 'uppercase',
                          }}
                        >
                          <IconComp size={14} />
                          <span>{m.category}</span>
                        </div>

                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            color: 'var(--accent-gold-light)',
                            background: 'rgba(212, 175, 101, 0.12)',
                            padding: '3px 10px',
                            borderRadius: '2px',
                          }}
                        >
                          {m.yearTag}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(21px, 2.8vw, 26px)',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginBottom: '10px',
                          lineHeight: 1.25,
                        }}
                      >
                        {m.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(14px, 1.5vw, 15.5px)',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
