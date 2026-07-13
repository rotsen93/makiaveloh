import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Send, Mail, GitFork, Globe } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export function ContactModule() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setError('')

    if (isSupabaseConfigured() && supabase) {
      const { error: err } = await supabase
        .from('contact_messages')
        .insert({ name: form.name, email: form.email, message: form.message })

      if (err) {
        setError('Error sending message. Please try again.')
        return
      }
    }

    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="scroll-mt-20">
      <motion.div
        ref={ref}
        className="bento-cell rounded-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono mb-6">
          // Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-text-muted font-mono mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-surface/30 border border-surface/60 rounded-lg px-3 py-2.5 text-xs text-text-primary font-mono outline-none focus:border-accent/50 focus:bg-surface/50 transition-all duration-200"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.3em] uppercase text-text-muted font-mono mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface/30 border border-surface/60 rounded-lg px-3 py-2.5 text-xs text-text-primary font-mono outline-none focus:border-accent/50 focus:bg-surface/50 transition-all duration-200"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] tracking-[0.3em] uppercase text-text-muted font-mono mb-1.5">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-surface/30 border border-surface/60 rounded-lg px-3 py-2.5 text-xs text-text-primary font-mono outline-none focus:border-accent/50 focus:bg-surface/50 transition-all duration-200 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              {error && (
                <p className="text-brand-red text-[10px] font-mono">{error}</p>
              )}

              <motion.button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] tracking-[0.3em] uppercase font-mono hover:bg-accent/20 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={sent}
              >
                {sent ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Sent
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    Send
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="text-text-muted text-xs leading-relaxed">
              ¿Tienes un proyecto en mente o solo quieres conectar? Déjame un
              mensaje y te responderé a la brevedad.
            </p>

            <div className="space-y-2">
              {[
                { icon: Mail, label: 'Email', value: 'hello@makiaveloh.com' },
                { icon: GitFork, label: 'GitHub', value: 'github.com/makiaveloh' },
                { icon: Globe, label: 'Web', value: 'makiaveloh.com' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-surface/20"
                >
                  <item.icon className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <div>
                    <p className="text-[9px] tracking-[0.25em] uppercase text-text-muted font-mono">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-text-secondary font-mono">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
