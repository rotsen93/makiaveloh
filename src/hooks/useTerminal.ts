import { useState, useCallback, useRef } from 'react'
import config from '../lib/config'
import { getProjects, getPosts } from '../lib/content'

interface TerminalLine {
  id: number
  type: 'input' | 'output'
  text: string
}

function buildCommands(): Record<string, () => string[]> {
  return {
    help: () => [
      'Available commands:',
      '  projects  — List registered systems',
      '  blog      — Recent posts',
      '  status    — System status report',
      '  contact   — Contact information',
      '  skills    — Technical capabilities',
      '  about     — About this system',
      '  whoami    — Current user identity',
      '  uptime    — System uptime',
      '  banner    — Display splash screen',
      '  date      — Current date and time',
      '  clear     — Clear terminal',
      '  help      — Show this message',
    ],
    projects: () => {
      const projects = getProjects()
      if (projects.length === 0) return ['No projects registered yet.']
      return projects.map(
        (p) =>
          `SYS_${String(projects.indexOf(p) + 1).padStart(2, '0')} // ${p.title.padEnd(24, ' ')} [${p.status.toUpperCase()}]`,
      )
    },
    blog: () => {
      const posts = getPosts()
      if (posts.length === 0) return ['No posts published yet.']
      return posts.slice(0, 5).map((p) => `${p.date}  ${p.title}`)
    },
    status: () => [
      'System Status Report',
      '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      `Kernel:       ${config.name} v${config.version}`,
      `Projects:     ${getProjects().length} registered`,
      `Posts:        ${getPosts().length} published`,
      `Environment:  Production`,
    ],
    contact: () => {
      const lines: string[] = [
        '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
      ]
      if (config.socials.email) lines.push(`  Email:    ${config.socials.email}`)
      if (config.socials.github) lines.push(`  GitHub:   ${config.socials.github}`)
      if (config.socials.instagram) lines.push(`  Instagram: ${config.socials.instagram}`)
      lines.push('\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500')
      return lines
    },
    skills: () => [
      'Frontend:  React, Next.js, React Native, Tailwind',
      'Backend:   Node.js, Python, PostgreSQL, Supabase',
      'Mobile:    Kotlin, Jetpack Compose, Capacitor',
      'Tools:     Docker, Git, Firebase, Linux, Figma',
    ],
    about: () => [
      `${config.name} \u2014 Strategic Hub`,
      '',
      'Constructor de sistemas digitales.',
      'Full-stack developer, UI engineer, creative mind.',
      'C\u00f3digo, m\u00fasica y filosof\u00eda como pilares.',
      '',
      'Frase actual: "Crear herramientas que importan."',
    ],
    whoami: () => [
      'makiaveloh',
      'Role:        System Architect & Creative Developer',
      'Status:      Online',
      'Session:     Active',
    ],
    uptime: () => [
      `System uptime: ${Math.floor(Math.random() * 365)} days, ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} minutes`,
      'Load average: 0.42, 0.31, 0.28',
    ],
    banner: () => [
      '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557',
      `\u2551        ${config.name} v${config.version}         \u2551`,
      '\u2551       Strategic Hub System       \u2551',
      '\u2551   All Systems Fully Operational  \u2551',
      '\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d',
    ],
    date: () => [
      new Date().toLocaleString('es-DO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Santo_Domingo',
      }),
    ],
  }
}

const ALIASES: Record<string, string> = {
  h: 'help',
  p: 'projects',
  s: 'status',
  c: 'contact',
  k: 'skills',
  a: 'about',
  cls: 'clear',
}

export function useTerminal(maxLines = 50) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: 'output', text: '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557' },
    { id: 1, type: 'output', text: `\u2551     ${config.name} Terminal v${config.version}     \u2551` },
    { id: 2, type: 'output', text: '\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d' },
    { id: 3, type: 'output', text: 'Type "help" for available commands.' },
  ])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const counterRef = useRef(4)

  const execute = useCallback((input: string) => {
    const trimmed = input.trim()
    if (!trimmed) return

    const nextId = counterRef.current++
    setHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)

    setLines((prev) => {
      const newLines = [...prev, { id: nextId, type: 'input' as const, text: trimmed }]

      const cmd = trimmed.toLowerCase()
      const resolved = ALIASES[cmd] ?? cmd

      const COMMANDS = buildCommands()

      if (resolved === 'clear') {
        return [
          { id: nextId + 1, type: 'output', text: '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557' },
          { id: nextId + 2, type: 'output', text: `\u2551     ${config.name} Terminal v${config.version}     \u2551` },
          { id: nextId + 3, type: 'output', text: '\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d' },
          { id: nextId + 4, type: 'output', text: 'Type "help" for available commands.' },
        ]
      }

      const handler = COMMANDS[resolved]
      if (handler) {
        const output = handler()
        output.forEach((text, i) => {
          newLines.push({ id: nextId + i + 1, type: 'output', text })
        })
        counterRef.current = nextId + output.length + 1
      } else if (trimmed) {
        newLines.push({
          id: nextId + 1,
          type: 'output',
          text: `Command not found: ${trimmed}. Type "help" for available commands.`,
        })
        counterRef.current = nextId + 2
      }

      return newLines.slice(-maxLines)
    })
  }, [maxLines])

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setHistory((prev) => {
      if (direction === 'up') {
        const next = Math.min(historyIndex + 1, prev.length - 1)
        setHistoryIndex(next)
      } else {
        const next = Math.max(historyIndex - 1, -1)
        setHistoryIndex(next)
      }
      return prev
    })
  }, [historyIndex])

  const clear = useCallback(() => {
    setLines([])
    counterRef.current = 0
  }, [])

  const currentInput = historyIndex >= 0 ? history[historyIndex] ?? '' : ''

  return { lines, execute, navigateHistory, clear, currentInput }
}
