import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { fetchActiveMedia } from '../lib/mediaService'
import type { MediaItem } from '../lib/mediaService'
import { detectReelUrlType, getYouTubeEmbedUrl } from '../lib/mediaService'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

// Renders a reel card preview based on URL type
function ReelCard({ reel }: { reel: MediaItem }) {
  const urlType = detectReelUrlType(reel.media_url)
  const embedUrl = (urlType === 'youtube' || urlType === 'youtube_short') ? getYouTubeEmbedUrl(reel.media_url) : null

  if (urlType === 'youtube' || urlType === 'youtube_short') {
    return (
      <div className="reel-card-youtube">
        {/* YouTube embedded player */}
        {embedUrl && (
          <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000', marginBottom: '20px' }}>
            <iframe
              src={embedUrl}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={reel.title}
              loading="lazy"
            />
          </div>
        )}
        <div style={{ padding: '0 4px' }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(19px, 2.5vw, 24px)', color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.3 }}>
            {reel.title}
          </h3>
          {reel.description && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {reel.description}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Instagram Reel or direct video — show as link card
  return (
    <a
      href={reel.media_url}
      target="_blank"
      rel="noopener noreferrer"
      className="reel-card"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        backgroundColor: '#301326',
        border: '1px solid rgba(212, 175, 101, 0.3)',
        borderRadius: '2px',
        padding: '32px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
      }} className="reel-card-inner">

        {/* Icon & Title Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div className="reel-icon" style={{ color: 'var(--accent-gold)', flexShrink: 0, transition: 'transform 0.3s ease, color 0.3s ease' }}>
            {urlType === 'instagram' ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            )}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(20px, 2.5vw, 25px)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>
            {reel.title}
          </h3>
        </div>

        {reel.description && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1 }}>
            {reel.description}
          </p>
        )}

        <div style={{
          marginTop: 'auto',
          fontFamily: "var(--font-body)",
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em',
          color: 'var(--accent-gold)', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '8px',
        }} className="watch-btn">
          {urlType === 'instagram' ? 'VIEW ON INSTAGRAM' : 'WATCH VIDEO'} <span style={{ transition: 'transform 0.3s ease' }} className="arrow">→</span>
        </div>
      </div>
    </a>
  )
}

export default function ReelsSection() {
  const [reels, setReels] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadReels = useCallback(async () => {
    try {
      const data = await fetchActiveMedia('reel')
      setReels(data)
    } catch (err) {
      console.error('Failed to load reels from Supabase:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadReels()
    const handleFocus = () => loadReels()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [loadReels])

  return (
    <section
      id="instagram-reels"
      style={{
        backgroundColor: '#160811', // Deep burgundy background
        padding: 'clamp(90px, 12vw, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 72px)' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ LATEST FROM OUR ACADEMY ✧</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.8rem, 5vw, 4.6rem)', fontWeight: 400,
              color: 'var(--text-primary)', marginBottom: '20px',
              lineHeight: 1.15,
            }}>Reels &amp; Moments</h2>
            <div style={{ width: '70px', height: '1.5px', background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)', margin: '0 auto 24px' }} />
            <p style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              Follow our journey through performances, rehearsals, and special moments.
            </p>
          </div>
        </FadeIn>

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)', fontFamily: "var(--font-body)" }}>
            Loading reels...
          </div>
        )}

        {!isLoading && reels.length === 0 ? (
          <FadeIn delay={0.2}>
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              border: '1px dashed rgba(212, 175, 101, 0.35)',
              borderRadius: '2px', backgroundColor: 'rgba(48, 19, 38, 0.3)'
            }}>
              <div style={{ color: 'var(--accent-gold)', marginBottom: '16px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                No recent reels to display. Check back later for updates.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="reels-grid">
            {reels.map((reel, i) => (
              <FadeIn key={reel.id} delay={0.1 * (i % 3)}>
                <ReelCard reel={reel} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .reels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .reel-card-youtube {
          background-color: #301326;
          border: 1px solid rgba(212, 175, 101, 0.3);
          border-radius: 2px;
          padding: 0 0 24px;
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 12px 35px rgba(0,0,0,0.35);
        }
        .reel-card-youtube:hover {
          border-color: rgba(212, 175, 101, 0.7);
          box-shadow: 0 18px 45px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 101, 0.15);
        }
        .reel-card-youtube > div:last-child {
          padding: 16px 20px 0;
        }

        .reel-card:hover .reel-card-inner {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 101, 0.7);
          box-shadow: 0 18px 45px rgba(0,0,0,0.55), 0 0 20px rgba(212, 175, 101, 0.15);
          background-color: #38162D;
        }
        .reel-card:hover .reel-icon {
          color: var(--accent-gold-light);
          transform: scale(1.08);
        }
        .reel-card:hover .arrow { transform: translateX(5px); }

        @media (max-width: 1024px) {
          .reels-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .reels-grid { grid-template-columns: 1fr; }
          .reel-card-inner { padding: 24px !important; }
        }
      `}</style>
    </section>
  )
}
