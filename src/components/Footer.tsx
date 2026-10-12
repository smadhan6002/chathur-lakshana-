export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#160811', // Primary deep burgundy-black background
        borderTop: '1px solid rgba(212, 175, 101, 0.25)',
        padding: 'clamp(70px, 9vw, 110px) clamp(16px, 4vw, 48px) 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle traditional dots/mandala accents */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '3px', height: '3px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-gold)',
          opacity: 0.25,
          top: `${15 + (i * 10) % 70}%`,
          left: `${8 + i * 12}%`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          marginBottom: 'clamp(48px, 6vw, 72px)',
        }} className="footer-grid">
          {/* Brand Column */}
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: '22px', fontWeight: 600, letterSpacing: '0.15em',
              color: 'var(--text-primary)', textTransform: 'uppercase', marginBottom: '8px',
            }}>CHATHUR LAKSHANA</div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '11px', letterSpacing: '0.22em', fontWeight: 600,
              color: 'var(--accent-gold)',
              textTransform: 'uppercase', marginBottom: '22px',
            }}>ACADEMY OF FINE ARTS</div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '14.5px', fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.7, maxWidth: '340px', margin: '0 0 14px',
            }}>
              Preserving tradition, inspiring excellence, and celebrating Bharatanatyam from the heart of Mylapore, Chennai.
            </p>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px',
              color: 'var(--accent-gold-light)',
              letterSpacing: '0.05em',
            }}>
              <strong>Founder-Director:</strong> Dr. Radhika Vairavelavan
            </div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px',
              color: 'var(--accent-gold)',
              marginTop: '6px',
            }}>
              <a href="tel:+919962260779" style={{ color: 'inherit', textDecoration: 'none' }}>
                ✦ +91 99622 60779
              </a>
            </div>
          </div>

          {/* Academy Navigation Column */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '11.5px', letterSpacing: '0.22em', fontWeight: 600,
              color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '22px',
            }}>✧ ACADEMY</div>
            {['About', 'Founder', 'Courses'].map(link => (
              <div key={link} style={{ marginBottom: '14px' }}>
                <button
                  onClick={() => {
                    const map: Record<string, string> = { About: '#academy', Founder: '#founder', Courses: '#courses' }
                    document.querySelector(map[link])?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "var(--font-body)", fontWeight: 500,
                    fontSize: '14.5px', color: 'var(--text-secondary)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    padding: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-gold-light)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >{link}</button>
              </div>
            ))}
          </div>

          {/* Experience Column */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '11.5px', letterSpacing: '0.22em', fontWeight: 600,
              color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '22px',
            }}>✧ EXPERIENCE</div>
            {[
              { label: 'Performances', href: '#gallery' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Contact', href: '#contact' },
              { label: 'Admin Login', href: '/admin' },
            ].map(link => (
              <div key={link.label} style={{ marginBottom: '14px' }}>
                <button
                  onClick={() => {
                    if (link.href.startsWith('/')) {
                      window.location.href = link.href;
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "var(--font-body)", fontWeight: 500,
                    fontSize: '14.5px', color: 'var(--text-secondary)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    padding: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent-gold-light)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >{link.label}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider & Shloka Bar */}
        <div style={{
          borderTop: '1px solid rgba(212, 175, 101, 0.2)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{
            fontFamily: "var(--font-body)", fontWeight: 400,
            fontSize: '13px', color: 'var(--text-muted)',
          }}>
            © {new Date().getFullYear()} Chathur Lakshana Academy of Fine Arts, Chennai.
          </div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: '15px', fontStyle: 'italic', fontWeight: 400,
            color: 'var(--accent-gold-light)',
            letterSpacing: '0.02em',
          }}>
            Angikam bhuvanam yasya — the world is his body.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}
