import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '../../lib/content'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        <div className="bento-cell rounded-xl p-12 text-center">
          <p className="text-4xl font-mono text-text-muted mb-4 font-bold">404</p>
          <p className="text-sm text-text-muted font-mono mb-6">Post not found</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-accent hover:text-accent/80 transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-text-muted hover:text-accent transition-colors font-mono mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
      </Link>

      <article className="bento-cell rounded-xl p-6 md:p-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {(post.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="text-[8px] tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-surface/40 text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-xl md:text-3xl font-bold tracking-[0.1em] uppercase mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-surface/40">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-[10px] font-mono text-text-muted">{post.date}</span>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </article>
    </motion.div>
  )
}
