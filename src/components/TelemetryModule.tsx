import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools'
}

const skills: Skill[] = [
  { name: 'React / TS', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 88, category: 'frontend' },
  { name: 'React Native', level: 82, category: 'frontend' },
  { name: 'Tailwind CSS', level: 93, category: 'frontend' },
  { name: 'Node.js', level: 87, category: 'backend' },
  { name: 'Python', level: 78, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'backend' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Git / Linux', level: 90, category: 'tools' },
  { name: 'Figma', level: 72, category: 'tools' },
]

const categoryColors: Record<Skill['category'], string> = {
  frontend: '#5BC266',
  backend: '#4D8AF0',
  tools: '#FF5F5F',
}

function WaveformSVG({ value, color }: { value: number; color: string }) {
  const points = Array.from({ length: 20 }).map((_, i) => {
    const x = (i / 19) * 100
    const amplitude = (value / 100) * 12
    const y = 14 - Math.sin(i * 0.6) * amplitude * (0.5 + Math.random() * 0.5)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox="0 0 100 28" className="w-full h-6" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

export function TelemetryModule() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="bento-cell rounded-xl p-5 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-xs tracking-[0.3em] uppercase text-text-muted font-mono mb-5">
        Performance Telemetry
      </h2>

      <div className="space-y-3">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            className="group"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + idx * 0.04 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: categoryColors[skill.category] }}
                />
                <span className="text-[11px] font-mono tracking-wider text-text-muted group-hover:text-text-primary transition-colors">
                  {skill.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-text-muted">
                {skill.level}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-[3px] bg-surface/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: categoryColors[skill.category] }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="w-16 hidden sm:block">
                <WaveformSVG value={skill.level} color={categoryColors[skill.category]} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-surface/60">
        {(['frontend', 'backend', 'tools'] as const).map((cat) => (
          <div key={cat} className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: categoryColors[cat] }}
            />
            <span className="text-[9px] tracking-wider uppercase font-mono text-text-muted">
              {cat}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
