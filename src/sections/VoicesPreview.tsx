import { ArrowRight, Sparkles } from 'lucide-react'

interface VoicesPreviewProps {
  onNavigateToVoices: () => void
}

export default function VoicesPreview({ onNavigateToVoices }: VoicesPreviewProps) {
  return (
    <section
      id="voices-preview"
      style={{
        backgroundColor: '#260D20', // Secondary rich plum background
        padding: 'clamp(80px, 10vw, 130px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
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
            <span>AUTHENTIC EXPERIENCES</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            Student Voices &amp; Recognition
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
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Every composition has a soul. Discover how disciples flourish under Dr. Radhika's mentorship.
          </p>
        </div>

        {/* 2 Featured Testimonials Preview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px',
            maxWidth: '1100px',
            margin: '0 auto 40px',
          }}
          className="voices-preview-cards"
        >
          {/* Card 1: Mangaiyarkarasi excerpt */}
          <div
            style={{
              backgroundColor: '#301326',
              border: '1px solid rgba(212, 175, 101, 0.3)',
              borderRadius: '2px',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--accent-gold)', lineHeight: 1, marginBottom: '12px' }}>
              &ldquo;
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: 'var(--text-primary)', lineHeight: 1.7, margin: '0 0 20px', flexGrow: 1 }}>
              "Learning Bharatanatyam under the tutelage of Smt. Dr. Radhika is truly a blessing. What makes her teaching exceptional is her attention to detail. She shares every nuance, from the intricacies of the thala kattu to the finer aspects of abhinaya..."
            </p>
            <div style={{ borderTop: '1px solid rgba(212, 175, 101, 0.2)', paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '11px' }}>✦</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                MANGAIYARKARASI
              </span>
            </div>
          </div>

          {/* Card 2: Vasundhara N excerpt */}
          <div
            style={{
              backgroundColor: '#301326',
              border: '1px solid rgba(212, 175, 101, 0.3)',
              borderRadius: '2px',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--accent-gold)', lineHeight: 1, marginBottom: '12px' }}>
              &ldquo;
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: 'var(--text-primary)', lineHeight: 1.7, margin: '0 0 20px', flexGrow: 1 }}>
              "At Chathur Lakshana, it feels like one big family. We don’t just learn the steps. Rather, we learn to feel them. Performance opportunities throughout the year let us put what we learn into practice, and with every show we grow in expression and confidence..."
            </p>
            <div style={{ borderTop: '1px solid rgba(212, 175, 101, 0.2)', paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-gold)', fontSize: '11px' }}>✦</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                VASUNDHARA N
              </span>
            </div>
          </div>
        </div>

        {/* View All Testimonials Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNavigateToVoices}
            className="btn-secondary"
            style={{
              padding: '14px 36px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>READ ALL TESTIMONIALS &amp; AWARDS</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .voices-preview-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
