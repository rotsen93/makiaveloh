import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Hash } from 'lucide-react'

interface PillarSectionProps {
  id: string
  heading: string
  description: string
  ctaLink: string
  ctaText: string
}

export function PillarSection({ id, heading, description, ctaLink, ctaText }: PillarSectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} className="scroll-mt-20">
      <motion.div
        ref={ref}
        className="bento-cell rounded-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-3.5 h-3.5 text-accent" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-text-muted font-mono">
            {id}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-bold tracking-[0.1em] uppercase mb-3 text-text-primary">
          {heading}
        </h2>

        <p className="text-sm text-text-muted font-mono leading-relaxed max-w-2xl">
          {description}
        </p>

        {ctaLink && ctaText && (
          <div className="mt-5 pt-4 border-t border-surface/40">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-accent hover:text-accent/80 transition-colors font-mono"
            >
              {ctaText}
              <span className="text-accent/50">&rarr;</span>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  )
}
