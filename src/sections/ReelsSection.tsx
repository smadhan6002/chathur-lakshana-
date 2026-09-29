import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { fetchActiveMedia } from '../lib/mediaService'
import type { MediaItem } from '../lib/mediaService'
import { detectReelUrlType, getYouTubeEmbedUrl } from '../lib/mediaService'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
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
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'var(--cream)', margin: '0 0 8px', lineHeight: 1.3 }}>
            {reel.title}
          </h3>
          {reel.description && (
            <p style={{ fontFamily: "var(--font-body)", fontSize: '14px', color: 'var(--light-lavender)', lineHeight: 1.6, opacity: 0.85, margin: 0 }}>
              {reel.description}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Instagram Reel or direct video — show as link card (Instagram blocks cross-origin embed on many browsers)
  return (
    <a
      href={reel.media_url}
      target="_blank"
      rel="noopener noreferrer"
      className="reel-card"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        backgroundColor: 'var(--royal-purple)',
        border: '1px solid rgba(214, 168, 79, 0.2)',
        padding: '32px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      }} className="reel-card-inner">

        {/* Icon & Title Row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div className="reel-icon" style={{ color: 'var(--champagne)', flexShrink: 0, transition: 'transform 0.3s ease, color 0.3s ease' }}>
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
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--cream)', margin: 0, lineHeight: 1.3 }}>
            {reel.title}
          </h3>
        </div>

        {reel.description && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: '15px', color: 'var(--light-lavender)', lineHeight: 1.6, marginBottom: '32px', flexGrow: 1, opacity: 0.8 }}>
            {reel.description}
          </p>
        )}

        <div style={{
          marginTop: 'auto',
          fontFamily: "var(--font-body)",
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em',
          color: 'var(--gold)', textTransform: 'uppercase',
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
        backgroundColor: 'var(--deep-purple)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--champagne)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ LATEST FROM OUR ACADEMY ✧</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400,
              color: 'var(--cream)', marginBottom: '20px',
            }}>Reels &amp; Moments</h2>
            <div style={{ width: '60px', height: '1.5px', background: 'var(--gold)', margin: '0 auto 24px' }} />
            <p style={{ fontFamily: "var(--font-body)", fontSize: '18px', fontStyle: 'italic', color: 'var(--light-lavender)' }}>
              Follow our journey through performances, rehearsals, and special moments.
            </p>
          </div>
        </FadeIn>

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--light-lavender)', fontFamily: "var(--font-body)" }}>
            Loading reels...
          </div>
        )}

        {!isLoading && reels.length === 0 ? (
          <FadeIn delay={0.2}>
            <div style={{
              textAlign: 'center', padding: '80px 20px',
              border: '1px dashed rgba(214, 168, 79, 0.3)',
              borderRadius: '2px', backgroundColor: 'rgba(50, 20, 63, 0.3)'
            }}>
              <div style={{ color: 'var(--gold)', marginBottom: '16px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: '16px', color: 'var(--light-lavender)', marginBottom: '24px' }}>
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
          background-color: var(--royal-purple);
          border: 1px solid rgba(214, 168, 79, 0.2);
          padding: 0 0 24px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .reel-card-youtube:hover {
          border-color: var(--gold);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }
        .reel-card-youtube > div:last-child {
          padding: 16px 20px 0;
        }

        .reel-card:hover .reel-card-inner {
          transform: translateY(-5px);
          border-color: var(--gold);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          background-color: rgba(75, 31, 94, 0.8);
        }
        .reel-card:hover .reel-icon {
          color: var(--gold);
          transform: scale(1.1);
        }
        .reel-card:hover .arrow { transform: translateX(4px); }

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
