import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Verified Artistic Milestones & Productions from Client Document (Phase 5, Phase 7, Phase 9)
const timelineEvents = [
  {
    year: '1992',
    title: 'Arangetram Debut',
    desc: 'Trained under revered Guru Smt. Ambika Buch, marking the formal initiation and debut into classical Bharatanatyam.',
  },
  {
    year: '2001–2004',
    title: 'Kalakshetra Troupe & Major Classical Roles',
    desc: 'Awarded Diploma and Post Diploma with First Class from Kalakshetra College of Fine Arts. Performed with the Kalakshetra troupe across India and internationally, portraying leading roles including Sita in Ramayanam, Andal in Andal Charitram, Parvathi in Kumara Sambhavam, and Akka Mahadevi.',
  },
  {
    year: 'Productions',
    title: 'Acclaimed Thematic Choreographies',
    desc: 'Conceived and staged celebrated thematic dance productions celebrating heritage, womanhood, and sacred texts, including Women – from Earthenware to Software, Sthree – Women Through the Ages, Kuttrala Kuravanji, Vaggeya Bharatam, Upanisad Bharatam, SHE, Krishna Bharatam, Festivals of Tamil Nadu, and Suchinthai Maalai.',
  },
  {
    year: '2019 & 2024',
    title: 'Cleveland Aradhana Festival, USA',
    desc: 'Invited performances at the world-renowned Cleveland Thyagaraja Festival in the United States, representing authentic classical Bharatanatyam on the international stage.',
  },
  {
    year: 'Jan 16, 2025',
    title: 'Panniru Thingalum Pazhindridu Vizhakkalum',
    desc: 'Major thematic production choreographed and staged for Nada Sudha Trust, celebrating the sacred cycle of traditional temple festivals across the twelve Tamil months.',
  },
  {
    year: '2025–2026',
    title: 'Vani Kala Nipuna Conferred',
    desc: 'Prestigious title conferred for Bharatanatyam by Sri Thyaga Brahma Gana Sabha, honouring decades of unwavering performance, scholarly research, and teaching dedication.',
  },
]

function TimelineCard({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Gold Node Marker with Temple Glow */}
      <div
        style={{
          position: 'absolute',
          left: '-44px',
          top: '24px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: '#160811',
          border: '2.5px solid var(--accent-gold)',
          boxShadow: '0 0 14px rgba(212, 175, 101, 0.6), inset 0 0 6px rgba(212, 175, 101, 0.4)',
          zIndex: 3,
        }}
      />

      {/* Editorial Card */}
      <div
        style={{
          backgroundColor: '#301326',
          border: '1px solid rgba(212, 175, 101, 0.32)',
          borderRadius: '2px',
          padding: 'clamp(24px, 4vw, 36px) clamp(24px, 4vw, 40px)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateX(6px)'
          e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
          e.currentTarget.style.boxShadow = '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(212, 175, 101, 0.15)'
          e.currentTarget.style.backgroundColor = '#38162D'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateX(0)'
          e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.32)'
          e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.4)'
          e.currentTarget.style.backgroundColor = '#301326'
        }}
      >
        {/* Subtle Top Gold Highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20px',
            right: '20px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(212, 175, 101, 0.4), transparent)',
          }}
        />

        {/* Year Badge */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(24px, 3.5vw, 32px)',
            letterSpacing: '0.04em',
            color: 'var(--accent-gold)',
            marginBottom: '6px',
            fontWeight: 500,
            lineHeight: 1.1,
            textShadow: '0 0 16px rgba(212, 175, 101, 0.3)',
          }}
        >
          {event.year}
        </div>

        {/* Event Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(21px, 2.8vw, 26px)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '10px',
            lineHeight: 1.25,
          }}
        >
          {event.title}
        </h3>

        {/* Event Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(14px, 1.5vw, 15.5px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {event.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function TimelineSection() {
  return (
    <section
      id="journey"
      style={{
        backgroundColor: '#160811', // Primary deep burgundy background
        padding: 'clamp(100px, 12vw, 150px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Subtle Radial Atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(60px, 9vw, 96px)' }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            ✧ PRODUCTIONS &amp; ARTISTIC MILESTONES ✧
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            Artistic Journey &amp; Repertoire
          </h2>
          <div
            style={{
              width: '70px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '24px auto 0',
            }}
          />
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div style={{ position: 'relative', maxWidth: '780px', margin: '0 auto', paddingLeft: '48px' }}>
          {/* Animated Gold Vertical Spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '12px',
              top: '16px',
              bottom: '16px',
              width: '1.5px',
              background: 'linear-gradient(to bottom, transparent, var(--accent-gold) 6%, var(--accent-gold) 94%, transparent)',
              transformOrigin: 'top',
              boxShadow: '0 0 10px rgba(212, 175, 101, 0.4)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 5vw, 48px)' }}>
            {timelineEvents.map((event, i) => (
              <TimelineCard key={event.year + event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
