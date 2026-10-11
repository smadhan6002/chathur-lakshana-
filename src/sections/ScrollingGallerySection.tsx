import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

// Dynamically import all images from 'src/img/scrolling imgs'
// Handles all filenames with spaces and various extensions
const imageModules = import.meta.glob<{ default: string }>(
  '../img/scrolling imgs/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}',
  { eager: true }
)

// Extract sorted image URLs for consistent ordering
const galleryImages: string[] = Object.entries(imageModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([_, module]) => module.default)

export default function ScrollingGallerySection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)

  const totalImages = galleryImages.length

  const openLightbox = (index: number) => {
    setSelectedIdx(index)
  }

  const closeLightbox = useCallback(() => {
    setSelectedIdx(null)
  }, [])

  const prevImage = useCallback(() => {
    setSelectedIdx((curr) => {
      if (curr === null) return 0
      return curr === 0 ? totalImages - 1 : curr - 1
    })
  }, [totalImages])

  const nextImage = useCallback(() => {
    setSelectedIdx((curr) => {
      if (curr === null) return 0
      return curr === totalImages - 1 ? 0 : curr + 1
    })
  }, [totalImages])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [selectedIdx])

  // Keyboard navigation
  useEffect(() => {
    if (selectedIdx === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevImage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIdx, closeLightbox, prevImage, nextImage])

  // Mobile swipe gestures inside lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const diff = touchStartX - touchEndX
    const swipeThreshold = 50
    if (diff > swipeThreshold) {
      // Swiped left -> Next image
      nextImage()
    } else if (diff < -swipeThreshold) {
      // Swiped right -> Prev image
      prevImage()
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  return (
    <section
      id="moments-of-grace"
      aria-label="Moments of Grace Infinite Gallery"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #160811 0%, #200a1a 50%, #160811 100%)',
        padding: '90px 0 100px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 101, 0.15)',
        borderBottom: '1px solid rgba(212, 175, 101, 0.15)',
      }}
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.08) 0%, rgba(38, 13, 32, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Section Header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto 48px',
          padding: '0 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 18px',
            borderRadius: '999px',
            background: 'rgba(212, 175, 101, 0.08)',
            border: '1px solid rgba(212, 175, 101, 0.25)',
            marginBottom: '16px',
          }}
        >
          <span style={{ color: 'var(--accent-gold)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
            Visual Anthology
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 400,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
            margin: '0 0 14px',
            lineHeight: 1.15,
          }}
        >
          Moments of Grace
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Celebrating the Beauty of Bharatanatyam — A continuous tapestry of devotional expression, intricate adavus, and sacred stage memories.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '18px',
            fontSize: '12px',
            color: 'rgba(212, 175, 101, 0.8)',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold)' }} />
          <span>Hover to pause &bull; Click to enlarge &bull; {totalImages} photographs</span>
        </div>
      </div>

      {/* Marquee Viewport with Left and Right Vignette Fade */}
      <div
        className="infinite-marquee-viewport"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          padding: '16px 0',
        }}
      >
        {/* Left subtle fade gradient */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 'clamp(30px, 8vw, 120px)',
            background: 'linear-gradient(to right, #160811 10%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Right subtle fade gradient */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 'clamp(30px, 8vw, 120px)',
            background: 'linear-gradient(to left, #160811 10%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Seamless Infinite Track containing two identical groups */}
        <div className="infinite-marquee-track">
          {/* Group 1: Primary set */}
          <div className="infinite-marquee-group">
            {galleryImages.map((src, index) => (
              <div
                key={`primary-${index}`}
                className="infinite-gallery-card"
                role="button"
                tabIndex={0}
                aria-label={`View photo ${index + 1} of ${totalImages}`}
                onClick={() => openLightbox(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(index)
                  }
                }}
              >
                <img
                  src={src}
                  alt={`Bharatanatyam moment ${index + 1}`}
                  loading="lazy"
                  draggable={false}
                />
                <div className="infinite-gallery-card-overlay">
                  <div className="infinite-gallery-card-badge">
                    <Maximize2 size={15} color="var(--accent-gold)" />
                    <span>View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Group 2: Seamless Duplicate for continuous 0% -> -50% loop */}
          <div className="infinite-marquee-group" aria-hidden="true">
            {galleryImages.map((src, index) => (
              <div
                key={`duplicate-${index}`}
                className="infinite-gallery-card"
                role="presentation"
                tabIndex={-1}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
                <div className="infinite-gallery-card-overlay">
                  <div className="infinite-gallery-card-badge">
                    <Maximize2 size={15} color="var(--accent-gold)" />
                    <span>View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Full-screen image viewer"
            className="infinite-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              // Clicking outside the image content closes the modal
              if (e.target === lightboxRef.current) {
                closeLightbox()
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Counter & Close Button */}
            <div className="infinite-lightbox-header" onClick={(e) => e.stopPropagation()}>
              <div className="infinite-lightbox-counter">
                <span className="gold-dot" />
                <span>
                  {selectedIdx + 1} / {totalImages}
                </span>
              </div>

              <button
                type="button"
                className="infinite-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close image viewer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Stage with Navigation Arrows and Contained Image */}
            <div
              className="infinite-lightbox-stage"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeLightbox()
                }
              }}
            >
              {/* Previous Button */}
              <button
                type="button"
                className="infinite-lightbox-nav prev"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Contained Image with smooth transition */}
              <div className="infinite-lightbox-img-wrapper" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  key={selectedIdx}
                  src={galleryImages[selectedIdx]}
                  alt={`Bharatanatyam moment ${selectedIdx + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="infinite-lightbox-image"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                className="infinite-lightbox-nav next"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                aria-label="Next photograph"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Caption / Instructions */}
            <div className="infinite-lightbox-caption" onClick={(e) => e.stopPropagation()}>
              <p className="caption-title">Chathur Lakshana Moments of Grace</p>
              <p className="caption-sub">
                Use arrow keys or swipe left/right to navigate &bull; Press Esc to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* --- Continuous Right-to-Left Infinite Marquee --- */
        .infinite-marquee-track {
          display: flex;
          width: max-content;
          animation: infiniteMarqueeScroll 110s linear infinite;
          will-change: transform;
        }

        /* Hover pauses smoothly and stays at exact position without jumping */
        .infinite-marquee-track:hover {
          animation-play-state: paused;
        }

        .infinite-marquee-group {
          display: flex;
          gap: 20px;
          padding-right: 20px; /* Exact match with gap for mathematically seamless loop */
        }

        @keyframes infiniteMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* Respect accessibility reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .infinite-marquee-track {
            animation-play-state: paused;
          }
        }

        /* --- Image Card Styling --- */
        .infinite-gallery-card {
          position: relative;
          width: 250px;
          height: 330px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background: #260D20;
          border: 1px solid rgba(212, 175, 101, 0.25);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
          user-select: none;
        }

        .infinite-gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .infinite-gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(22, 8, 17, 0.85) 0%, rgba(38, 13, 32, 0.2) 60%, transparent 100%);
          opacity: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 20px;
          transition: opacity 0.3s ease;
        }

        .infinite-gallery-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(22, 8, 17, 0.88);
          border: 1px solid rgba(212, 175, 101, 0.5);
          color: var(--accent-gold);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          transform: translateY(8px);
          transition: transform 0.3s ease;
        }

        .infinite-gallery-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(212, 175, 101, 0.7);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 24px rgba(212, 175, 101, 0.2);
          z-index: 2;
        }

        .infinite-gallery-card:hover img {
          transform: scale(1.05);
        }

        .infinite-gallery-card:hover .infinite-gallery-card-overlay {
          opacity: 1;
        }

        .infinite-gallery-card:hover .infinite-gallery-card-badge {
          transform: translateY(0);
        }

        .infinite-gallery-card:focus-visible {
          outline: 2px solid var(--accent-gold);
          outline-offset: 3px;
        }

        /* --- Fullscreen Lightbox Modal --- */
        .infinite-lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 4, 8, 0.94);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px 20px;
        }

        .infinite-lightbox-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 8px 0;
          z-index: 10;
        }

        .infinite-lightbox-counter {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-gold-light);
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.15em;
          font-weight: 500;
          text-transform: uppercase;
        }

        .infinite-lightbox-counter .gold-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-gold);
          box-shadow: 0 0 10px var(--accent-gold);
        }

        .infinite-lightbox-close {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(212, 175, 101, 0.3);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .infinite-lightbox-close:hover {
          background: rgba(212, 175, 101, 0.2);
          border-color: var(--accent-gold);
          color: var(--accent-gold);
          transform: scale(1.08);
        }

        .infinite-lightbox-stage {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1300px;
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          padding: 10px 0;
        }

        .infinite-lightbox-img-wrapper {
          max-width: 86vw;
          max-height: 76vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .infinite-lightbox-image {
          max-width: 100%;
          max-height: 76vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 6px;
          border: 1px solid rgba(212, 175, 101, 0.35);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(212, 175, 101, 0.15);
          user-select: none;
        }

        .infinite-lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(22, 8, 17, 0.82);
          border: 1px solid rgba(212, 175, 101, 0.4);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          z-index: 10;
          backdrop-filter: blur(8px);
        }

        .infinite-lightbox-nav.prev {
          left: 12px;
        }

        .infinite-lightbox-nav.next {
          right: 12px;
        }

        .infinite-lightbox-nav:hover {
          background: rgba(212, 175, 101, 0.25);
          border-color: var(--accent-gold);
          color: #FFF;
          box-shadow: 0 0 20px rgba(212, 175, 101, 0.4);
          transform: translateY(-50%) scale(1.1);
        }

        .infinite-lightbox-caption {
          text-align: center;
          padding: 8px 16px;
          z-index: 10;
        }

        .caption-title {
          font-family: var(--font-display);
          font-size: 16px;
          color: var(--text-primary);
          margin: 0 0 4px;
          letter-spacing: 0.04em;
        }

        .caption-sub {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          letter-spacing: 0.02em;
        }

        /* --- Tablet & Mobile Responsiveness --- */
        @media (max-width: 1024px) {
          .infinite-gallery-card {
            width: 210px;
            height: 280px;
          }
          .infinite-lightbox-img-wrapper {
            max-width: 92vw;
            max-height: 72vh;
          }
          .infinite-lightbox-image {
            max-height: 72vh;
          }
          .infinite-marquee-group {
            gap: 16px;
            padding-right: 16px;
          }
        }

        @media (max-width: 640px) {
          .infinite-gallery-card {
            width: 160px;
            height: 220px;
            border-radius: 8px;
          }
          .infinite-marquee-group {
            gap: 12px;
            padding-right: 12px;
          }
          .infinite-lightbox-backdrop {
            padding: 10px 12px;
          }
          .infinite-lightbox-nav {
            width: 42px;
            height: 42px;
          }
          .infinite-lightbox-nav.prev {
            left: 4px;
          }
          .infinite-lightbox-nav.next {
            right: 4px;
          }
          .infinite-lightbox-img-wrapper {
            max-width: 95vw;
            max-height: 68vh;
          }
          .infinite-lightbox-image {
            max-height: 68vh;
          }
          .caption-title {
            font-size: 14px;
          }
          .caption-sub {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  )
}
