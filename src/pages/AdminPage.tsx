import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, ShieldAlert } from 'lucide-react'
import { isSupabaseConfigured } from '../lib/supabase'

export function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8">
        <div className="bento-cell rounded-xl p-10 text-center max-w-md mx-auto">
          <ShieldAlert className="w-10 h-10 text-text-muted mx-auto mb-4" />
          <h1 className="text-sm font-mono tracking-wider text-text-primary mb-2">Panel No Disponible</h1>
          <p className="text-xs text-text-muted mb-4">
            Configura las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para habilitar el panel.
          </p>
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement Supabase auth login
    console.log('Login with:', email, password)
  }

  return (
    <motion.div
      className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="bento-cell rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-4 h-4 text-accent" />
          <h1 className="text-xs tracking-[0.3em] uppercase text-text-primary font-mono">
            Admin Access
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-text-muted font-mono mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface/30 border border-surface/60 rounded-lg px-3 py-2.5 text-xs text-text-primary font-mono outline-none focus:border-accent/50 transition-all duration-200"
              placeholder="admin@makiaveloh.com"
              required
            />
          </div>

          <div>
            <label className="block text-[9px] tracking-[0.3em] uppercase text-text-muted font-mono mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface/30 border border-surface/60 rounded-lg px-3 py-2.5 text-xs text-text-primary font-mono outline-none focus:border-accent/50 transition-all duration-200"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] tracking-[0.3em] uppercase font-mono hover:bg-accent/20 transition-all duration-200"
          >
            <Lock className="w-3 h-3" /> Access Panel
          </button>
        </form>
      </div>
    </motion.div>
  )
}
