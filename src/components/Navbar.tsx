import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../img/LOGO.png'

export interface NavLinkItem {
  label: string
  path: string
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'ACADEMY', path: '/academy' },
  { label: 'FOUNDER', path: '/founder' },
  { label: 'COURSES', path: '/courses' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'HONOURS & VOICES', path: '/voices' },
  { label: 'CONTACT', path: '/contact' },
]

interface NavbarProps {
  currentPath?: string
  onNavigate?: (path: string) => void
  onOpenEnrol?: () => void
}

export default function Navbar({
  currentPath = '/',
  onNavigate,
  onOpenEnrol,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleEnrolClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setMobileOpen(false)
    if (onOpenEnrol) {
      onOpenEnrol()
    }
    window.dispatchEvent(
      new CustomEvent('open-enquiry-modal', {
        detail: { course: 'Bharatanatyam', type: 'Course Enrolment' },
      })
    )
  }

  const handleLinkClick = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
    }
    setMobileOpen(false)
    if (onNavigate) {
      onNavigate(path)
    } else {
      window.history.pushState({}, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(22, 8, 17, 0.95)' : 'rgba(22, 8, 17, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(212, 175, 101, 0.3)' : '1px solid rgba(212, 175, 101, 0.15)',
        transition: 'all 0.4s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 3.5vw, 40px)',
          height: scrolled ? '68px' : '88px',
          maxWidth: '100%',
          transition: 'height 0.4s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <img
            src={logoImg}
            alt="Chathur Lakshana Academy Logo"
            style={{
              height: scrolled ? '46px' : '56px',
              width: 'auto',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'height 0.4s ease',
              filter: 'drop-shadow(0 0 10px rgba(212, 175, 101, 0.35))',
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              CHATHUR LAKSHANA
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
              }}
            >
              ACADEMY OF FINE ARTS
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 1.8vw, 28px)' }}>
          {NAV_LINKS.map((link) => {
            const isActive = currentPath === link.path
            return (
              <button
                key={link.label}
                type="button"
                onClick={(e) => handleLinkClick(link.path, e)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.14em',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                  padding: '6px 2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--accent-gold-light)'
                    e.currentTarget.style.borderBottom = '2px solid rgba(212, 175, 101, 0.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderBottom = '2px solid transparent'
                  }
                }}
              >
                {link.label}
              </button>
            )
          })}

          <button
            type="button"
            onClick={handleEnrolClick}
            className="btn-primary"
            style={{
              padding: '11px 24px',
              fontSize: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              marginLeft: '4px',
            }}
          >
            ENROL NOW
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'rgba(48, 19, 38, 0.6)',
            border: '1px solid rgba(212, 175, 101, 0.4)',
            cursor: 'pointer',
            width: '42px',
            height: '42px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            borderRadius: '2px',
          }}
          className="mobile-menu-btn"
        >
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              backgroundColor: 'var(--accent-gold)',
              transition: 'transform 0.3s ease',
              transform: mobileOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              backgroundColor: 'var(--accent-gold)',
              opacity: mobileOpen ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              backgroundColor: 'var(--accent-gold)',
              transition: 'transform 0.3s ease',
              transform: mobileOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'rgba(22, 8, 17, 0.98)',
              backdropFilter: 'blur(16px)',
              borderTop: '1px solid rgba(212, 175, 101, 0.25)',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0,0,0,0.7)',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.path
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={(e) => handleLinkClick(link.path, e)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 28px',
                    background: isActive ? 'rgba(212, 175, 101, 0.1)' : 'none',
                    border: 'none',
                    borderLeft: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.14em',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid rgba(212, 175, 101, 0.08)',
                  }}
                >
                  {link.label}
                </button>
              )
            })}
            <div style={{ padding: '16px 28px' }}>
              <button
                type="button"
                onClick={handleEnrolClick}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '13px' }}
              >
                ENROL NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 980px) {
          .mobile-menu-btn { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 981px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
