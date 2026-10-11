import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Animate progress from 0 to 100 over ~1.8s
    const start = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 600)
        }, 200)
      }
    }
    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#160811',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {/* CL Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{
              width: '76px',
              height: '76px',
              border: '1.5px solid rgba(212, 175, 101, 0.65)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '30px',
              fontWeight: 500,
              color: '#D4AF65',
              letterSpacing: '0.05em',
              boxShadow: '0 0 35px rgba(212, 175, 101, 0.25), inset 0 0 15px rgba(212, 175, 101, 0.1)',
            }}>
              CL
            </div>
            <div style={{
              fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              color: '#D4AF65',
              textTransform: 'uppercase',
            }}>
              CHATHUR LAKSHANA
            </div>
          </motion.div>

          {/* Gold Progress Bar */}
          <div style={{ width: '220px', position: 'relative' }}>
            <div style={{
              width: '100%',
              height: '1.5px',
              backgroundColor: 'rgba(212, 175, 101, 0.2)',
            }} />
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '1.5px',
                backgroundColor: '#D4AF65',
                boxShadow: '0 0 10px rgba(212, 175, 101, 0.8)',
                width: `${progress}%`,
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#C9B5BD',
              textTransform: 'uppercase',
            }}
          >
            ENTERING THE WORLD OF CLASSICAL ARTS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
