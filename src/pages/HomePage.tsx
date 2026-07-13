import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeroModule } from '../components/HeroModule'
import { ProjectModule } from '../components/ProjectModule'
import { TelemetryModule } from '../components/TelemetryModule'
import { TerminalModule } from '../components/TerminalModule'
import { AboutModule } from '../components/AboutModule'
import { ContactModule } from '../components/ContactModule'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '../lib/blog'

function BlogPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const latest = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="scroll-mt-20">
      <motion.div
        ref={ref}
        className="bento-cell rounded-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono">
            // Latest from the Lab
          </h2>
          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-accent hover:text-accent/80 transition-colors font-mono"
          >
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block p-4 rounded-lg bg-surface/20 border border-surface/40 hover:border-accent/30 transition-all duration-200 group h-full"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-surface/40 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm font-mono tracking-wide text-text-primary group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[9px] font-mono text-text-muted">
                    {post.published}
                  </span>
                  <span className="text-[9px] font-mono text-text-muted">
                    {post.readTime} min
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    { label: 'Proyectos Activos', value: '2' },
    { label: 'Lenguajes', value: '5+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Líneas de Código', value: '50K+' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="bento-cell rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <p className="text-lg md:text-xl font-mono text-accent font-bold">{stat.value}</p>
          <p className="text-[9px] tracking-[0.25em] uppercase text-text-muted font-mono mt-1">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
      <section id="home" className="scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 auto-rows-auto">
          <div className="md:col-span-5">
            <HeroModule />
          </div>
          <div className="md:col-span-7">
            <ProjectModule />
          </div>
          <div className="md:col-span-5">
            <TelemetryModule />
          </div>
          <div className="md:col-span-7">
            <TerminalModule />
          </div>
        </div>
      </section>

      <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">
        <StatsBar />
        <BlogPreview />
        <AboutModule />
        <ContactModule />
      </div>
    </div>
  )
}
