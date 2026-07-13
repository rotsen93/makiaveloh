import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '../../lib/blog'

export function BlogListPage() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-2">
          // Blog
        </h1>
        <p className="text-text-muted text-xs md:text-sm font-mono tracking-wide">
          Thoughts, code, and philosophy from the lab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="block bento-cell rounded-xl p-6 h-full group"
            >
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-surface/40 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-sm md:text-base font-mono tracking-wide text-text-primary group-hover:text-accent transition-colors mb-3 leading-relaxed">
                {post.title}
              </h2>

              <p className="text-[11px] text-text-muted leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-text-muted" />
                  <span className="text-[9px] font-mono text-text-muted">{post.published}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-text-muted" />
                  <span className="text-[9px] font-mono text-text-muted">{post.readTime} min</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors ml-auto" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
