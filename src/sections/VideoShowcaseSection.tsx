import { motion } from 'framer-motion'
import homeVideo from '../assets/home.mp4'

export default function VideoShowcaseSection() {
  return (
    <section
      id="video-showcase"
      style={{
        width: '100%',
        padding: 'clamp(80px, 10vw, 130px) 24px',
        backgroundColor: '#160811',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(38, 13, 32, 0.7) 0%, rgba(22, 8, 17, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 54px)', position: 'relative', zIndex: 2 }}
      >
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          color: 'var(--accent-gold)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          ✧ GLIMPSE OF PERFECTION ✧
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
          color: 'var(--text-primary)',
          marginBottom: '20px',
          fontWeight: 400,
          lineHeight: 1.15,
        }}>
          Experience the Art
        </h2>
        <div style={{
          width: '70px',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
          margin: '0 auto',
        }} />
      </motion.div>

      {/* Temple-Framed Video Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '1040px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Subtle Ambient Gold Backlight Glow */}
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            background: 'radial-gradient(circle at center, rgba(212, 175, 101, 0.16) 0%, transparent 70%)',
            filter: 'blur(25px)',
            pointerEvents: 'none',
          }}
        />

        {/* Video Frame */}
        <div
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 101, 0.4)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 101, 0.1)',
            backgroundColor: '#0a0307',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Temple Corner Accents */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)', pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '12px', height: '12px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)', pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)', pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '12px', height: '12px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)', pointerEvents: 'none', zIndex: 3 }} />

          <video
            src={homeVideo}
            controls
            playsInline
            preload="metadata"
            aria-label="Classical Bharatanatyam recital demonstration"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '72vh',
              objectFit: 'contain',
              display: 'block',
              backgroundColor: '#000',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
