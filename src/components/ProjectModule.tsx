import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { projects } from '../lib/projects'

const statusColors: Record<string, string> = {
  active: 'bg-accent',
  paused: 'bg-yellow-500',
  archived: 'bg-zinc-600',
}

export function ProjectModule() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <motion.div
      ref={ref}
      className="bento-cell rounded-xl p-5 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono">
          Systems in Execution
        </h2>
        <span className="text-[10px] text-text-muted font-mono tracking-wider">
          {projects.filter(p => p.status === 'active').length} ACTIVE
        </span>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div key={project.id}>
            <button
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              className="w-full flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-surface/40 transition-colors duration-200 group cursor-pointer"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusColors[project.status]}`} />
              <span className="text-text-muted text-xs font-mono tracking-wider">{project.code}</span>
              <span className="text-text-primary text-sm font-mono tracking-wide">
                // {project.name}
              </span>
              <ChevronRight
                className={`ml-auto w-3.5 h-3.5 text-text-muted transition-transform duration-300 ${
                  expanded === project.id ? 'rotate-90' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {expanded === project.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-4 pt-1">
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-surface/40 text-text-muted border border-surface/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 5 && (
                        <span className="text-[9px] tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-surface/40 text-text-muted">
                          +{project.stack.length - 5}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/projects/${project.slug}`)}
                        className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-mono px-3 py-1.5 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-200 border border-accent/20"
                      >
                        <ExternalLink className="w-3 h-3" /> View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
