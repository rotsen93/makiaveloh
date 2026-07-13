import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/#projects' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/#about' },
  { label: 'Contact', path: '/#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  const handleNavClick = (path: string) => {
    setOpen(false)
    if (path.startsWith('/#')) {
      const id = path.slice(2)
      if (location.pathname !== '/') {
        window.location.href = '/' + path.slice(1)
        return
      }
      const el = document.querySelector(`#${id}`)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
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
            MAKIAVELOH
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className="px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase text-text-muted hover:text-accent transition-colors font-mono rounded-md hover:bg-surface/40"
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="block px-3 py-2.5 text-xs tracking-[0.25em] uppercase text-text-muted hover:text-accent transition-colors font-mono rounded-md hover:bg-surface/40"
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
