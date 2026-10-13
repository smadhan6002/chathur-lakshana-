import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

interface CoursesPreviewSectionProps {
  onOpenEnquire: (course: string) => void
  onNavigateToCourses: () => void
}

const previewCourses = [
  {
    title: 'Bharatanatyam',
    badge: 'SIGNATURE DISCIPLINE',
    level: 'Foundational → Arangetram',
    desc: 'Pure adavus, alarippu to varnam, abhinaya, tala discipline and nattuvangam in the pristine Kalakshetra style.',
    highlights: ['Weekly Practical & Theory', 'Annual Sabha Performance', 'Arangetram Mentorship'],
    featured: true,
  },
  {
    title: 'Carnatic Vocal',
    badge: 'CLASSICAL MUSIC',
    level: 'Foundational → Advanced',
    desc: 'Voice culture, sarali varisai through kritis, raga alapana and layam for dancers and vocalists alike.',
    highlights: ['Voice Culture', 'Tala Training', 'Concert Repertoire'],
  },
  {
    title: 'Choreography & Theory',
    badge: 'ADVANCED STUDY',
    level: 'Senior Students & Teachers',
    desc: 'Natya Shastra fundamentals, thematic production design, lighting, stagecraft, and Sanskrit/Tamil aesthetics.',
    highlights: ['Thematic Composition', 'Stagecraft', 'Production Design'],
  },
  {
    title: 'Fine Arts Studio',
    badge: 'VISUAL ARTS',
    level: 'All Age Groups',
    desc: 'Traditional temple art, kolam design, and heritage painting as visual companions to classical dance.',
    highlights: ['Weekend Studio', 'Exhibitions', 'Heritage Workshops'],
  },
]

export default function CoursesPreviewSection({
  onOpenEnquire,
  onNavigateToCourses,
}: CoursesPreviewSectionProps) {
  return (
    <section
      id="courses-preview"
      style={{
        backgroundColor: '#160811', // Deep burgundy background
        padding: 'clamp(80px, 10vw, 130px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Decorative Gold Circles in Background */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          right: '-60px',
          width: '360px',
          height: '360px',
          border: '1px solid rgba(212, 175, 101, 0.08)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 7vw, 68px)' }}>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={14} />
            <span>DISCOVER OUR OFFERINGS</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5vw, 4.6rem)',
              fontWeight: 500,
              color: '#F5DDA0',
              textShadow: '0 0 25px rgba(212, 175, 101, 0.35)',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            Courses &amp; Enrolment
          </h2>

          <div
            style={{
              width: '70px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '0 auto 20px',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 1.9vw, 1.5rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Rooted, unhurried, and authentic classical training in the heart of Mylapore, Chennai.
          </p>
        </div>

        {/* Featured Signature Course Card */}
        <div
          style={{
            backgroundColor: '#301326',
            border: '1.5px solid rgba(212, 175, 101, 0.45)',
            borderRadius: '3px',
            padding: 'clamp(32px, 5vw, 54px) clamp(24px, 4vw, 48px)',
            marginBottom: '32px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 175, 101, 0.08)',
            position: 'relative',
          }}
        >
          {/* Corner Gold Motifs */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '36px',
              alignItems: 'center',
            }}
            className="signature-course-grid"
          >
            <div>
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
                ✦ SIGNATURE PROGRAMME &bull; MYLAPORE STUDIO &amp; ONLINE
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                  color: '#FFF4E5',
                  margin: '0 0 14px',
                  fontWeight: 400,
                  lineHeight: 1.15,
                }}
              >
                Bharatanatyam
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '22px',
                }}
              >
                Comprehensive classical training in the renowned Kalakshetra tradition under the guidance of Smt. Dr. Radhika Vairavelavan. Graded years encompassing foundational adavus, alarippu to full margam, expressive abhinaya, and nattuvangam.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '28px',
                }}
              >
                {previewCourses[0].highlights.map((h) => (
                  <div
                    key={h}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent-gold-light)',
                      fontSize: '13.5px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--accent-gold)" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => onOpenEnquire('Bharatanatyam')}
                  className="btn-primary"
                  style={{ padding: '14px 36px', fontSize: '13px', cursor: 'pointer' }}
                >
                  ENROL IN BHARATANATYAM
                </button>

                <button
                  type="button"
                  onClick={onNavigateToCourses}
                  className="btn-secondary"
                  style={{ padding: '14px 28px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>VIEW FULL CURRICULUM</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Quick Info Box */}
            <div
              style={{
                backgroundColor: 'rgba(22, 8, 17, 0.75)',
                border: '1px solid rgba(212, 175, 101, 0.3)',
                padding: '28px',
                borderRadius: '2px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--accent-gold)', marginBottom: '14px', fontWeight: 500 }}>
                Admissions Information
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Batches:</strong>
                  Children (Ages 5+), Teens, and Adult Beginners
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Class Schedule:</strong>
                  Tue–Thu 5–8 PM &bull; Sat &amp; Sun 8 AM–1 PM
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>Studio Location:</strong>
                  Mylapore, Chennai &amp; Global Live Interactive Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Courses Grid (3 Cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '40px',
          }}
          className="preview-secondary-grid"
        >
          {previewCourses.slice(1).map((c) => (
            <div
              key={c.title}
              style={{
                backgroundColor: '#301326',
                border: '1px solid rgba(212, 175, 101, 0.3)',
                borderRadius: '2px',
                padding: '30px 24px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.7)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.3)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                {c.badge}
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: '#FFF4E5',
                  margin: '0 0 10px',
                  fontWeight: 400,
                  lineHeight: 1.25,
                }}
              >
                {c.title}
              </h4>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                  flexGrow: 1,
                }}
              >
                {c.desc}
              </p>

              <button
                type="button"
                onClick={() => onOpenEnquire(c.title)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '6px 0',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: 'auto',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
              >
                <span>ENQUIRE FOR {c.title.toUpperCase()}</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

        {/* View All Courses Banner */}
        <div
          style={{
            textAlign: 'center',
            padding: '24px',
            backgroundColor: 'rgba(48, 19, 38, 0.45)',
            border: '1px solid rgba(212, 175, 101, 0.25)',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
            Looking for detailed syllabus, grade levels, and performance opportunities?
          </span>

          <button
            type="button"
            onClick={onNavigateToCourses}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>EXPLORE DEDICATED COURSES PAGE</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .signature-course-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .preview-secondary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
