import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink, Globe } from 'lucide-react'
import { getProjects, type Project } from '../lib/content'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="bento-cell rounded-xl p-6 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
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

      <h2 className="text-sm md:text-base font-mono tracking-wide text-text-primary mb-3">
        {project.title}
      </h2>

      <p className="text-[11px] text-text-muted leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

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

export function ProjectsPage() {
  const allProjects = getProjects()
  const completed = allProjects.filter((p) => p.status === 'completed')

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    completed.forEach((p) => (p.tags ?? []).forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [completed])

  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = activeTag
    ? completed.filter((p) => (p.tags ?? []).includes(activeTag))
    : completed

  if (completed.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        <div className="bento-cell rounded-xl p-12 text-center">
          <p className="text-4xl font-mono text-text-muted mb-4 font-bold">[ ]</p>
          <p className="text-sm text-text-muted font-mono mb-2">
            No completed projects yet.
          </p>
          <p className="text-xs text-text-muted font-mono">
            Check the{' '}
            <Link to="/playground" className="text-accent hover:text-accent/80 underline">
              playground
            </Link>{' '}
            for works in progress.
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
          // Projects
        </h1>
        <p className="text-text-muted text-xs md:text-sm font-mono tracking-wide">
          Completed systems. Production-grade.
        </p>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`text-[10px] tracking-wider uppercase font-mono px-3 py-1.5 rounded-md border transition-all duration-200 cursor-pointer ${
                activeTag === tag
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-surface/20 text-text-muted border-surface/40 hover:border-accent/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
        {filtered.length === 0 && activeTag && (
          <div className="col-span-full bento-cell rounded-xl p-12 text-center">
            <p className="text-sm text-text-muted font-mono">
              No projects tagged &ldquo;{activeTag}&rdquo;.
            </p>
            <button
              onClick={() => setActiveTag(null)}
              className="mt-2 text-[10px] tracking-wider uppercase text-accent hover:text-accent/80 font-mono cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
