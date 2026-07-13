export interface Project {
  id: string
  slug: string
  code: string
  name: string
  tagline: string
  description: string
  problem: string
  solution: string
  longDescription: string
  stack: string[]
  status: 'active' | 'paused' | 'archived'
  repo?: string
  live?: string
  android?: string
  screenshots: string[]
  color: string
  features: { title: string; desc: string }[]
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'fiaocontrol',
    code: 'SYS_01',
    name: 'FIAOCONTROL',
    tagline: 'Cuaderno digital de fiaos para colmados dominicanos',
    description: 'Sistema de gestión de crédito para colmados con ledger digital, abonos y envío de comprobantes por WhatsApp.',
    problem: 'Los colmados dominicanos aún usan libretas físicas para anotar fiados, lo que genera pérdidas, errores y disputas con los clientes.',
    solution: 'Una app web + Android que permite registrar fiados y abonos en segundos, ver balances en tiempo real y enviar comprobantes por WhatsApp.',
    longDescription: 'FiaoControl reemplaza la libreta física de los colmados con un sistema digital. El dueño registra un fiado o abono en segundos, el balance se actualiza automáticamente, y puede enviar un comprobante al cliente vía WhatsApp. Construido con Next.js, Supabase y una app nativa en Kotlin.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind', 'Kotlin', 'Jetpack Compose'],
    status: 'active',
    repo: '#',
    live: '#',
    android: '#',
    screenshots: [],
    color: '#5BC266',
    features: [
      { title: 'Registro Express', desc: 'Añade fiados o abonos en menos de 5 segundos con botones de montos predefinidos.' },
      { title: 'Balances en Tiempo Real', desc: 'Vista SQL que calcula el balance de cada cliente automáticamente.' },
      { title: 'WhatsApp Integration', desc: 'Envía comprobantes de cada movimiento con un solo clic vía wa.me.' },
      { title: 'Dashboard', desc: 'Panel con deuda total, top deudores, resumen diario y acceso rápido.' },
      { title: 'App Android Nativa', desc: 'App en Kotlin + Jetpack Compose con la misma base de datos compartida.' },
      { title: 'Multi-negocio', desc: 'Soporte para múltiples colmados por usuario con aislamiento por negocio.' },
    ],
  },
  {
    id: '2',
    slug: 'nest',
    code: 'SYS_02',
    name: 'NEST',
    tagline: 'Productividad para mentes neurodivergentes',
    description: 'Suite de productividad diseñada para ADHD: tareas, pomodoro, hábitos, mood tracker, mind maps y más.',
    problem: 'Las apps de productividad tradicionales no están diseñadas para cerebros con ADHD — son rígidas, abrumadoras y no mantienen el interés.',
    solution: 'NEST es una app que abraza la neurodivergencia con micro-interacciones, gamificación, modos zen y diseño sensorial amigable.',
    longDescription: 'NEST combina task manager, pomodoro timer, habit tracker, mood/energy tracker, mind maps, brain dump y un sistema de logros gamificado. Todo en una experiencia offline-first con soporte bilingüe, temas personalizables y modo simple. Construido con React, Firebase y Capacitor para Android.',
    stack: ['React', 'TypeScript', 'Vite', 'Firebase', 'Capacitor', 'Tailwind', 'Framer Motion'],
    status: 'active',
    repo: '#',
    live: '#',
    android: '#',
    screenshots: [],
    color: '#4D8AF0',
    features: [
      { title: 'Task Manager', desc: 'Tareas con prioridades, subtareas, streak tracking y time estimation.' },
      { title: 'Pomodoro Timer', desc: 'Focus sessions con intervalos custom y soundscapes ambientales.' },
      { title: 'Habit Tracker', desc: 'Card-stack UI con calendario semanal y rachas.' },
      { title: 'Mood & Energy', desc: 'Registro diario de ánimo, energía, enfoque y ansiedad con historial.' },
      { title: 'Mind Maps', desc: 'Mapas mentales visuales con nodos draggables, colores e imágenes.' },
      { title: 'Ataraxia Mode', desc: 'Modo zen sin distracciones para enfoque profundo.' },
    ],
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
