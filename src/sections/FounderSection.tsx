import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Briefcase, Sparkles, BookOpen } from 'lucide-react'
import founderImage from '../assets/jayashree_srinivasann_5d04a935902545048f734fdb8f3b06ab.jpg'

// Verified Educational Qualifications from Client Document (Phase 3)
const qualifications = [
  {
    degree: 'Ph.D. Bharatanatyam',
    institution: 'Bharathiar University',
    year: '2019',
    note: 'Interdisciplinary research conducted through the Tamil Department.',
    highlight: 'Doctorate',
  },
  {
    degree: 'MFA Bharatanatyam',
    institution: 'Bharathidasan University',
    year: '2007',
    grade: 'First Class',
    note: 'Master of Fine Arts with specialization in classical performance and dance theory.',
  },
  {
    degree: 'Post Diploma in Bharatanatyam',
    institution: 'Kalakshetra College of Fine Arts',
    year: '2004',
    grade: 'First Class',
    note: 'Advanced classical repertoire, abhinaya, nattuvangam, and troupe performance training.',
  },
  {
    degree: 'Diploma in Bharatanatyam',
    institution: 'Kalakshetra College of Fine Arts',
    year: '2001',
    grade: 'First Class',
    note: 'Foundational Kalakshetra discipline, adavus, tala systems, and traditional margam.',
  },
  {
    degree: 'B.Sc. (Hons) Physics',
    institution: 'Sri Sathya Sai Institute of Higher Learning',
    year: '1998',
    grade: 'A Grade',
    note: 'Rigorous scientific foundation, reflecting analytical acumen and scholarly depth.',
  },
]

// Verified Institutional & Academic Roles (Phase 5)
const currentRoles = [
  {
    role: 'Founder-Director',
    organization: 'Chathur Lakshana Academy of Fine Arts, Chennai',
    desc: 'Artistic guidance, curriculum development, and staging major thematic Bharatanatyam productions.',
  },
  {
    role: 'Guest Faculty',
    organization: 'University of Madras, Chennai',
    desc: 'Lecturing and mentoring university students in advanced classical dance theory and practice.',
  },
  {
    role: 'Doctoral Committee Member',
    organization: 'VELS University, Chennai',
    desc: 'Guiding and evaluating doctoral research scholars in classical performing arts.',
  },
  {
    role: 'Member of the Board of Studies',
    organization: 'Alliance University, Bangalore',
    desc: 'Contributing to academic syllabus design and performing arts curriculum standards.',
  },
]

const formerRoles = [
  {
    role: 'Guest Faculty (2018–2019)',
    organization: 'Rukmini Devi College of Fine Arts, Kalakshetra Foundation, Chennai',
    desc: 'Imparted practical and theoretical training at the premier institution of Bharatanatyam.',
  },
  {
    role: 'Part-time Lecturer & Centre Coordinator',
    organization: 'Kalai Kaviri College of Fine Arts, Tiruchirappalli',
    desc: 'Coordinated academic activities under its Off-Campus Degree Programme.',
  },
  {
    role: 'B Grade Artist',
    organization: 'Doordarshan',
    desc: 'Auditioned and graded national broadcast television performing artiste.',
  },
]

// Verified Other Artistic Skills from Client Document (Phase 6)
const artisticSkills = [
  {
    title: 'Carnatic Music & Vocal',
    desc: 'Extensive classical vocal training under revered gurus Bhagavathulu Sri Seetharama Sharma and Sri S. Rajaram. Sings Carnatic vocals for student dance performances.',
  },
  {
    title: 'Nattuvangam',
    desc: 'Skilled in conducting cymbals (nattuvangam) and rhythmic recitation for student stage performances and major thematic productions.',
  },
  {
    title: 'Jaltarang Instrument',
    desc: 'Accomplished proficiency in performing the rare classical acoustic water-porcelain instrument, Jaltarang.',
  },
  {
    title: 'Kalaripaittu & Yoga',
    desc: 'Trained in traditional Kerala martial art Kalaripaittu and classical Yoga, integrating physical stamina, core balance, and posture into dance pedagogy.',
  },
  {
    title: 'Acting in Cinema & Television',
    desc: 'Experienced in performing dramatic roles in films and television serials, enriching abhinaya and character portrayal on the dance stage.',
  },
  {
    title: 'Tap Dance',
    desc: 'Versatile exploration in Western tap dance rhythms, expanding cross-cultural rhythmic understanding.',
  },
]

// Verified Books, Articles & Research Publications (Phase 8)
const publications = [
  {
    title: 'The Rasa Concept of Kuutanuul',
    desc: 'A scholarly translation with detailed analytical commentary of the ancient Tamil treatise Cuvainuul.',
    tag: 'Translation & Commentary',
  },
  {
    title: "Dancer's Physical Problems and Remedial Measures",
    desc: 'MFA dissertation examining physical strain, ergonomics, and corrective conditioning for classical performers.',
    year: '2007',
    tag: 'MFA Dissertation',
  },
  {
    title: 'Nayikas in Sanskrit and Tamil Traditions – Meeting of the Parallels in Bhakthi Movement',
    desc: 'Presented at the prestigious Natyakala Conference, exploring comparative devotional literature and heroine archetypes.',
    year: '2012',
    tag: 'Natyakala Conference',
  },
  {
    title: 'Kannaki – The Nayika',
    desc: 'Scholarly research paper presented at Kalai Kaviri College of Fine Arts, Tiruchirappalli.',
    year: '2012',
    tag: 'Academic Research',
  },
  {
    title: 'Devadasis – The Empowered Women',
    desc: 'Historical research monograph presented for the Steel Authority of India (SAIL).',
    year: '2015',
    tag: 'Historical Monograph',
  },
  {
    title: 'Auchityam in Bharatanatyam',
    desc: 'Scholarly analytical essay published in Madal, the esteemed annual journal of Prayatnam.',
    tag: 'Prayatnam (Madal)',
  },
]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
  const [activeTab, setActiveTab] = useState<'qualifications' | 'experience' | 'skills' | 'research'>('qualifications')

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
        {/* Main Founder Profile Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            gap: 'clamp(40px, 6vw, 84px)',
            alignItems: 'center',
            marginBottom: 'clamp(64px, 8vw, 96px)',
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
                  alt="Dr. Radhika Vairavelavan - Founder-Director of Chathur Lakshana Academy of Fine Arts, Chennai"
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

              {/* Founder Credential Badges Below Portrait */}
              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '8px',
                  flexWrap: 'wrap',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                }}
              >
                <span>✦ Ph.D. Bharatanatyam</span>
                <span>✦ Kalakshetra Alumna</span>
                <span>✦ Doordarshan B-Grade</span>
              </div>
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn delay={0.25}>
            <div>
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
                ✧ FOUNDER-DIRECTOR ✧
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.6rem, 4.8vw, 4.4rem)',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '10px',
                }}
              >
                Dr. Radhika Vairavelavan
              </h2>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'var(--accent-gold-light)',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                Director, Chathur Lakshana Academy of Fine Arts, Chennai
              </div>
              <div
                style={{
                  width: '60px',
                  height: '1.5px',
                  background: 'var(--accent-gold)',
                  marginBottom: '28px',
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.98rem, 1.35vw, 1.12rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '22px',
                }}
              >
                Dr. Radhika Vairavelavan is a distinguished Bharatanatyam exponent, scholar, and the Founder-Director of Chathur Lakshana Academy of Fine Arts, Chennai. She underwent rigorous classical training under Guru Smt. Ambika Buch and performed her Arangetram in 1992. An alumna of the renowned Kalakshetra College of Fine Arts (Diploma &amp; Post Diploma in First Class), she has performed extensively with the Kalakshetra troupe in India and abroad, portraying seminal classical roles including Sita in <em>Ramayanam</em>, Andal in <em>Andal Charitram</em>, Parvathi in <em>Kumara Sambhavam</em>, and <em>Akka Mahadevi</em>.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.98rem, 1.35vw, 1.12rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                }}
              >
                A graded B-Grade artist at Doordarshan and an invited performer at the prestigious Cleveland Aradhana Festival (USA) in both 2019 and 2024, Dr. Radhika brings deep interdisciplinary scholarly inquiry to her dance pedagogy. Holding an MFA in Bharatanatyam (First Class) and a Ph.D. from Bharathiar University through research with the Tamil Department, she blends immaculate Kalakshetra technique with rich literary scholarship.
              </p>

              {/* Verified Quote / Callout */}
              <div
                style={{
                  borderLeft: '2px solid var(--accent-gold)',
                  backgroundColor: 'rgba(48, 19, 38, 0.45)',
                  padding: '18px 24px',
                  borderRadius: '0 2px 2px 0',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(18px, 2.2vw, 22px)',
                    fontStyle: 'italic',
                    color: 'var(--accent-gold-light)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  "Art with beauty as a knowledge system — nurturing classical discipline and cultural heritage for posterity."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Interactive Tabbed Detail Section (Qualifications, Experience, Skills, Publications) */}
        <FadeIn delay={0.2}>
          <div
            style={{
              backgroundColor: '#1E0918',
              border: '1px solid rgba(212, 175, 101, 0.35)',
              borderRadius: '4px',
              padding: 'clamp(28px, 5vw, 48px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55), 0 0 30px rgba(212, 175, 101, 0.08)',
              position: 'relative',
            }}
          >
            {/* Header / Tabs Nav */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: '1px solid rgba(212, 175, 101, 0.25)',
                paddingBottom: '24px',
                marginBottom: '36px',
              }}
            >
              {[
                { id: 'qualifications', label: 'Qualifications', icon: GraduationCap },
                { id: 'experience', label: 'Academic & Professional Roles', icon: Briefcase },
                { id: 'skills', label: 'Artistic Versatility', icon: Sparkles },
                { id: 'research', label: 'Research & Publications', icon: BookOpen },
              ].map((tab) => {
                const IconComponent = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: isActive ? 'rgba(212, 175, 101, 0.18)' : 'rgba(48, 19, 38, 0.5)',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid rgba(212, 175, 101, 0.25)',
                      borderRadius: '2px',
                      padding: '10px 22px',
                      color: isActive ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 0 16px rgba(212, 175, 101, 0.2)' : 'none',
                    }}
                  >
                    <IconComponent size={14} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* TAB CONTENT: Educational Qualifications */}
            {activeTab === 'qualifications' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    ✧ ACADEMIC &amp; CLASSICAL PEDIGREE ✧
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 32px)', color: 'var(--text-primary)', margin: 0, fontWeight: 400 }}>
                    Educational Qualifications
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {qualifications.map((q) => (
                    <div
                      key={q.degree}
                      style={{
                        backgroundColor: '#301326',
                        border: '1px solid rgba(212, 175, 101, 0.3)',
                        borderRadius: '2px',
                        padding: '24px 22px',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: 'var(--accent-gold)' }}>
                          {q.year}
                        </span>
                        {q.grade && (
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent-gold-light)', background: 'rgba(212, 175, 101, 0.12)', padding: '2px 8px', borderRadius: '2px' }}>
                            {q.grade}
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 6px', fontWeight: 500, lineHeight: 1.25 }}>
                        {q.degree}
                      </h4>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--accent-gold-light)', marginBottom: '10px' }}>
                        {q.institution}
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                        {q.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Academic & Professional Experience */}
            {activeTab === 'experience' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    ✧ PEDAGOGICAL &amp; INSTITUTIONAL LEADERSHIP ✧
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 32px)', color: 'var(--text-primary)', margin: 0, fontWeight: 400 }}>
                    Professional &amp; Academic Experience
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="experience-cols">
                  {/* Current Positions */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✦</span> CURRENT APPOINTMENTS
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {currentRoles.map((r) => (
                        <div key={r.role + r.organization} style={{ backgroundColor: '#301326', border: '1px solid rgba(212, 175, 101, 0.28)', padding: '18px 20px', borderRadius: '2px' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '4px' }}>
                            {r.role}
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--accent-gold-light)', fontWeight: 500, marginBottom: '6px' }}>
                            {r.organization}
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {r.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Former Roles & Artist Status */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✦</span> PREVIOUS FACULTY ROLES &amp; ARTIST RECOGNITION
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {formerRoles.map((r) => (
                        <div key={r.role + r.organization} style={{ backgroundColor: '#301326', border: '1px solid rgba(212, 175, 101, 0.28)', padding: '18px 20px', borderRadius: '2px' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '4px' }}>
                            {r.role}
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--accent-gold-light)', fontWeight: 500, marginBottom: '6px' }}>
                            {r.organization}
                          </div>
                          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {r.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Other Artistic Skills */}
            {activeTab === 'skills' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    ✧ MULTI-DISCIPLINARY MASTERY ✧
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 32px)', color: 'var(--text-primary)', margin: 0, fontWeight: 400 }}>
                    Other Artistic Skills &amp; Training
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {artisticSkills.map((s) => (
                    <div
                      key={s.title}
                      style={{
                        backgroundColor: '#301326',
                        border: '1px solid rgba(212, 175, 101, 0.28)',
                        borderRadius: '2px',
                        padding: '24px 22px',
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--accent-gold)', margin: '0 0 10px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>✦</span> {s.title}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.65 }}>
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Publications & Research */}
            {activeTab === 'research' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.22em', color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    ✧ SCHOLARLY CONTRIBUTIONS ✧
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.5vw, 32px)', color: 'var(--text-primary)', margin: 0, fontWeight: 400 }}>
                    Books, Articles &amp; Research
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {publications.map((p) => (
                    <div
                      key={p.title}
                      style={{
                        backgroundColor: '#301326',
                        border: '1px solid rgba(212, 175, 101, 0.28)',
                        borderRadius: '2px',
                        padding: '24px 22px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent-gold-light)', textTransform: 'uppercase', background: 'rgba(212, 175, 101, 0.12)', padding: '3px 8px', borderRadius: '2px' }}>
                          {p.tag}
                        </span>
                        {p.year && (
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--accent-gold)', fontWeight: 600 }}>
                            {p.year}
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text-primary)', margin: '0 0 10px', fontWeight: 500, lineHeight: 1.3 }}>
                        {p.title}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, marginTop: 'auto' }}>
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          .experience-cols { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  )
}
