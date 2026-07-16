import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FlaskConical, Wrench, TestTube, ExternalLink, Globe } from 'lucide-react'
import { getProjects, type Project } from '../lib/content'

const STATUS_BADGE: Record<
  string,
  { label: string; className: string; Icon: typeof FlaskConical }
> = {
  wip: {
    label: 'WIP',
    className:
      'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Icon: Wrench,
  },
  experimental: {
    label: 'Experimental',
    className:
      'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Icon: FlaskConical,
  },
  sandbox: {
    label: 'Sandbox',
    className:
      'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Icon: TestTube,
  },
}

function PlaygroundCard({ project, index }: { project: Project; index: number }) {
  const badge = STATUS_BADGE[project.status]
  const BadgeIcon = badge?.Icon

  return (
    <motion.div
      className="bento-cell rounded-xl p-6 flex flex-col h-full border-dashed"
      style={project.color ? { borderColor: `${project.color}40` } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 mb-4">
        {BadgeIcon && <BadgeIcon className="w-4 h-4 text-text-muted" />}
        <span
          className={`text-[9px] tracking-wider uppercase font-mono px-2 py-0.5 rounded border ${badge?.className ?? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'}`}
        >
          {badge?.label ?? project.status}
        </span>
      </div>

      <h2 className="text-sm md:text-base font-mono tracking-wide text-text-primary mb-3">
        {project.title}
      </h2>

      <p className="text-[11px] text-text-muted leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(project.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="text-[8px] tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-surface/40 text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-surface/40 mt-auto">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] text-text-muted hover:text-accent transition-colors font-mono"
          >
            <ExternalLink className="w-3 h-3" /> Repo
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] text-accent hover:text-accent/80 transition-colors font-mono"
          >
            <Globe className="w-3 h-3" /> Live
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function PlaygroundPage() {
  const allProjects = getProjects()
  const playground = allProjects.filter(
    (p) => p.status === 'wip' || p.status === 'experimental' || p.status === 'sandbox',
  )

  if (playground.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        <div className="bento-cell rounded-xl p-12 text-center border-dashed">
          <p className="text-4xl font-mono text-text-muted mb-4 font-bold">~</p>
          <p className="text-sm text-text-muted font-mono mb-2">
            The playground is empty.
          </p>
          <p className="text-xs text-text-muted font-mono">
            <Link to="/projects" className="text-accent hover:text-accent/80 underline">
              View completed projects
            </Link>{' '}
            instead.
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-2">
          ~/playground
        </h1>
        <p className="text-text-muted text-xs md:text-sm font-mono tracking-wide">
          Experiments, drafts, and sandbox environments. Things in motion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {playground.map((project, i) => (
          <PlaygroundCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
