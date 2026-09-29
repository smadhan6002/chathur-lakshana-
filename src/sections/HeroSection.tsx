import { motion } from 'framer-motion'
import GoldParticles from '../components/GoldParticles'
import pose0 from '../assets/Purana Manjari 2019.jpg.jpeg'

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        background: 'var(--dark-plum)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={pose0}
          alt="Hero Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            filter: 'saturate(0.92) contrast(1.05)',
          }}
        />
      </div>

      {/* Cinematic overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(50, 20, 63, 0.4) 0%, rgba(50, 20, 63, 0.85) 100%)',
        pointerEvents: 'none',
      }} />
      <GoldParticles density={40} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: "var(--font-display)", fontSize: '24px', color: 'var(--gold)', marginBottom: '16px', opacity: 0.8 }}
        >
          ✧
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontFamily: "var(--font-body)", fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em', color: 'var(--champagne)', textTransform: 'uppercase', marginBottom: '24px' }}
        >
          TRADITIONAL ARTS ACADEMY
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hero-title"
          style={{ marginBottom: '0', color: 'var(--cream)', textShadow: '0 4px 20px rgba(36, 16, 45, 0.5)' }}
        >
          <span style={{ display: 'block' }}>Art &middot; Discipline &middot; Life</span>
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ width: '80px', height: '1.5px', background: 'var(--gold)', margin: '32px auto', boxShadow: '0 0 10px rgba(214, 168, 79, 0.5)' }} 
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontStyle: 'italic', color: 'var(--light-lavender)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto', textShadow: '0 2px 10px rgba(36, 16, 45, 0.5)' }}
        >
          Rooted in culture. Guided by gurus.<br/>
          Inspiring excellence in every learner.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="hero-cta-group"
          style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '56px', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            style={{ fontFamily: "var(--font-body)", fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '16px 40px', cursor: 'pointer', color: 'var(--deep-purple)', border: '1px solid var(--gold)' }}
          >
            EXPLORE COURSES
          </button>
          <button
            onClick={() => document.querySelector('#academy')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
            style={{ fontFamily: "var(--font-body)", fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '16px 40px', cursor: 'pointer', color: 'var(--cream)', borderColor: 'rgba(214, 168, 79, 0.5)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(214, 168, 79, 0.1)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.5)' }}
          >
            OUR ACADEMY
          </button>
        </motion.div>
      </div>
    </section>
  )
}
