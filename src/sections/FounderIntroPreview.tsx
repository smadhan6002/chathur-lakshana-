import { ArrowRight, Sparkles } from 'lucide-react'
import founderImage from '../assets/jayashree_srinivasann_5d04a935902545048f734fdb8f3b06ab.jpg'

interface FounderIntroPreviewProps {
  onNavigateToFounder: () => void
}

export default function FounderIntroPreview({ onNavigateToFounder }: FounderIntroPreviewProps) {
  return (
    <section
      id="founder-preview"
      style={{
        backgroundColor: '#160811', // Deep burgundy background
        padding: 'clamp(80px, 10vw, 130px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            gap: 'clamp(36px, 5vw, 72px)',
            alignItems: 'center',
          }}
          className="founder-preview-grid"
        >
          {/* Left: Founder Portrait Frame */}
          <div
            style={{
              position: 'relative',
              padding: '14px',
              border: '1.5px solid rgba(212, 175, 101, 0.45)',
              background: '#301326',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(212, 175, 101, 0.1)',
              borderRadius: '2px',
            }}
          >
            {/* Corner Ornaments */}
            <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

            <div style={{ overflow: 'hidden' }}>
              <img
                src={founderImage}
                alt="Dr. Radhika Vairavelavan"
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

            <div
              style={{
                marginTop: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontFamily: 'var(--font-body)',
                color: 'var(--accent-gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              <span>✦ Ph.D. Bharatanatyam</span>
              <span>✦ Kalakshetra Alumna</span>
              <span>✦ Doordarshan B-Grade</span>
            </div>
          </div>

          {/* Right: Brief Narrative */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={14} />
              <span>MEET THE FOUNDER-DIRECTOR</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '8px',
              }}
            >
              Dr. Radhika Vairavelavan
            </h2>

            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--accent-gold-light)',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Director, Chathur Lakshana Academy of Fine Arts, Chennai
            </div>

            <div style={{ width: '60px', height: '1.5px', background: 'var(--accent-gold)', marginBottom: '24px' }} />

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                marginBottom: '18px',
              }}
            >
              Dr. Radhika Vairavelavan is a distinguished Bharatanatyam exponent, Kalakshetra alumna, and researcher holding an MFA and Ph.D. from Bharathiar University. Having performed her Arangetram in 1992 under Guru Smt. Ambika Buch and danced leading roles with the Kalakshetra troupe worldwide, she integrates pristine classical technique with deep literary scholarship.
            </p>

            <div
              style={{
                borderLeft: '2px solid var(--accent-gold)',
                backgroundColor: 'rgba(48, 19, 38, 0.45)',
                padding: '16px 20px',
                borderRadius: '0 2px 2px 0',
                marginBottom: '30px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: 'var(--accent-gold-light)',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                "Art with beauty as a knowledge system — nurturing classical discipline and cultural heritage for posterity."
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateToFounder}
              className="btn-primary"
              style={{
                padding: '14px 34px',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>VIEW FULL BIOGRAPHY &amp; ARTISTIC MILESTONES</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-preview-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
