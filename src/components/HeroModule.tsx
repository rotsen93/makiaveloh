import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal } from 'lucide-react'
import config from '../lib/config'

const TAGLINE_PARTS = config.sections.map((s) => s.heading).join(' \u00b7 ')

export function HeroModule() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="bento-cell rounded-xl p-6 md:p-8 flex flex-col justify-between min-h-[220px]"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-accent" />
          <span className="text-[8px] tracking-[0.35em] uppercase text-text-muted font-mono">
            Digital Space
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.2em] uppercase leading-tight">
          {config.name}
        </h1>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-accent text-xs tracking-[0.3em] uppercase font-mono">
            System: Active
          </span>
        </div>

        <p className="text-text-secondary text-[10px] md:text-xs font-mono tracking-wide leading-relaxed">
          {TAGLINE_PARTS}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-surface/60">
        <p className="text-text-muted text-[10px] tracking-[0.25em] uppercase font-mono">
          v{config.version} // {new Date().getFullYear()} // All Systems Operational
        </p>
      </div>
    </motion.div>
  )
}
