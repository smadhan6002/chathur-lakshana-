import { motion } from 'framer-motion'
import homeVideo from '../assets/home.mp4'

export default function VideoShowcaseSection() {
  return (
    <section
      id="video-showcase"
      style={{
        width: '100%',
        padding: 'clamp(60px, 8vw, 100px) 24px',
        backgroundColor: 'var(--dark-plum)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(214, 168, 79, 0.15)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}
      >
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          color: 'var(--champagne)',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          Glimpse of Perfection
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: 'var(--cream)',
          marginBottom: '24px',
          fontWeight: 400
        }}>
          Experience the Art
        </h2>
        <div style={{
          width: '60px', height: '1.5px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          margin: '0 auto'
        }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          width: '100%',
          maxWidth: '1000px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(214, 168, 79, 0.3)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(214, 168, 79, 0.05)',
          backgroundColor: '#000',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <video
          src={homeVideo}
          controls
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '70vh',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </motion.div>
    </section>
  )
}
