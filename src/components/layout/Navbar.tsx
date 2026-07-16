import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'
import config from '../../lib/config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const location = useLocation()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  useEffect(() => {
    if (location.pathname !== '/home') {
      setActiveSection('')
      return
    }

    const sectionIds = config.sections.map((s) => s.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0.15 },
    )

    elements.forEach((el) => observerRef.current!.observe(el))

    return () => observerRef.current?.disconnect()
  }, [location.pathname])

  const isLinkActive = (href: string) => {
    if (location.pathname === href) return true
    if (href === '/home' && location.pathname === '/home' && activeSection) return true
    return false
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-xl border-b border-surface/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-text-secondary hover:text-accent transition-colors font-mono"
          >
            <Terminal className="w-3.5 h-3.5 text-accent" />
            {config.name}
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {config.navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase transition-colors font-mono rounded-md hover:bg-surface/40 ${
                  isLinkActive(link.href)
                    ? 'text-accent bg-surface/40'
                    : 'text-text-muted hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-text-muted hover:text-accent transition-colors"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-surface/60 bg-void/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {config.navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-3 py-2.5 text-xs tracking-[0.25em] uppercase transition-colors font-mono rounded-md hover:bg-surface/40 ${
                    isLinkActive(link.href)
                      ? 'text-accent bg-surface/40'
                      : 'text-text-muted hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
