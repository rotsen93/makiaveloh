import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, GitBranch, Smartphone, CheckCircle2 } from 'lucide-react'
import { projectBySlug } from '../../lib/projects'

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projectBySlug(slug) : undefined

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        <div className="bento-cell rounded-xl p-12 text-center">
          <p className="text-4xl font-mono text-text-muted mb-4">404</p>
          <p className="text-sm text-text-muted font-mono mb-6">Project not found</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-accent hover:text-accent/80 transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const statusColor = project.status === 'active' ? 'bg-accent' : project.status === 'paused' ? 'bg-yellow-500' : 'bg-zinc-600'

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-text-muted hover:text-accent transition-colors font-mono mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
      </Link>

      <div className="bento-cell rounded-xl p-6 md:p-10 mb-6" style={{ borderColor: `${project.color}33` }}>
        <div className="flex items-center gap-3 mb-4">
          <span className={`w-2 h-2 rounded-full ${statusColor}`} />
          <span className="text-text-muted text-xs font-mono tracking-wider">{project.code}</span>
          <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-surface/40 text-text-muted">
            {project.status}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.15em] uppercase mb-3" style={{ color: project.color }}>
          {project.name}
        </h1>
        <p className="text-text-secondary text-sm md:text-base font-mono tracking-wide">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-surface/40 text-text-muted border border-surface/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-mono px-3 py-1.5 rounded-md bg-surface/30 text-text-muted hover:text-accent hover:bg-surface/50 transition-all duration-200 border border-surface/60">
              <GitBranch className="w-3 h-3" /> Repo
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-mono px-3 py-1.5 rounded-md bg-surface/30 text-text-muted hover:text-secondary hover:bg-surface/50 transition-all duration-200 border border-surface/60">
              <ExternalLink className="w-3 h-3" /> Live
            </a>
          )}
          {project.android && (
            <a href={project.android} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-mono px-3 py-1.5 rounded-md bg-surface/30 text-text-muted hover:text-brand-red hover:bg-surface/50 transition-all duration-200 border border-surface/60">
              <Smartphone className="w-3 h-3" /> Android
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <motion.div
          className="bento-cell rounded-xl p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-[9px] tracking-[0.3em] uppercase text-brand-red font-mono mb-3">// Problem</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
        </motion.div>
        <motion.div
          className="bento-cell rounded-xl p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-[9px] tracking-[0.3em] uppercase text-accent font-mono mb-3">// Solution</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
        </motion.div>
      </div>

      <motion.div
        className="bento-cell rounded-xl p-6 md:p-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono mb-4">// Overview</h2>
        <p className="text-sm text-text-secondary leading-relaxed">{project.longDescription}</p>
      </motion.div>

      <motion.div
        className="bento-cell rounded-xl p-6 md:p-8 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono mb-6">// Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="flex gap-3 p-4 rounded-lg bg-surface/20 border border-surface/40"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: project.color }} />
              <div>
                <h3 className="text-xs font-mono tracking-wide text-text-primary mb-1">{feature.title}</h3>
                <p className="text-[11px] text-text-muted leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
