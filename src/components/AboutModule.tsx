import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Sparkles, Terminal } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    label: 'Full-Stack Developer',
    desc: 'Arquitecturas modernas con React, Node y cloud.',
  },
  {
    icon: Sparkles,
    label: 'UI / UX Engineering',
    desc: 'Interfaces funcionales con enfoque en experiencia.',
  },
  {
    icon: Terminal,
    label: 'Automation & DevOps',
    desc: 'Infraestructura como código y CI/CD.',
  },
]

export function AboutModule() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="scroll-mt-20">
      <motion.div
        ref={ref}
        className="bento-cell rounded-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono mb-6">
          // About
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <div className="aspect-square rounded-xl bg-surface/40 border border-surface/60 flex items-center justify-center overflow-hidden">
              <span className="text-6xl font-mono text-text-muted/30 select-none">
                {'{ }'}
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <p className="text-text-secondary text-sm leading-relaxed">
              Constructor de sistemas digitales con experiencia en desarrollo
              full-stack, automatización y diseño de interfaces. Cada proyecto
              es una oportunidad para optimizar, simplificar y crear algo
              funcionalmente sólido.
            </p>
            <p className="text-text-muted text-xs leading-relaxed">
              Especializado en ecosistemas JavaScript/TypeScript, con
              incursiones en Python y Kotlin. Creo en el código limpio, la
              documentación clara y las herramientas que resuelven problemas
              reales.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'Docker', 'PostgreSQL', 'Python', 'Kotlin'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-[9px] tracking-wider uppercase font-mono px-2.5 py-1 rounded-md bg-surface/40 text-text-muted border border-surface/60"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-surface/60">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-lg bg-surface/20"
            >
              <item.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-text-primary font-mono mb-1">
                  {item.label}
                </p>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
