import { useState, useCallback, useRef } from 'react'

interface TerminalLine {
  id: number
  type: 'input' | 'output'
  text: string
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    '  projects  — List active systems',
    '  status    — System status report',
    '  contact   — Contact information',
    '  skills    — Technical capabilities',
    '  about     — About MAKIAVELOH',
    '  whoami    — Current user identity',
    '  uptime    — System uptime',
    '  banner    — Display splash screen',
    '  date      — Current date and time',
    '  clear     — Clear terminal',
    '  help      — Show this message',
  ],
  projects: () => [
    'SYS_01 // FIAOCONTROL .............. [ACTIVE]',
    'SYS_02 // NEST ..................... [ACTIVE]',
    '',
    'Use "project <name>" for details.',
  ],
  status: () => [
    'System Status Report',
    '────────────────────────────',
    'Uptime:       99.97%',
    'Projects:     2 registered',
    'Active:       2',
    'Environment:  Production',
    'Last Deploy:  ' + new Date().toISOString().split('T')[0],
    'Kernel:       MAKIAVELOH v3.0.0',
  ],
  contact: () => [
    '────────────────────────────',
    '  Email:    hello@makiaveloh.com',
    '  Web:      makiaveloh.com',
    '  GitHub:   github.com/makiaveloh',
    '────────────────────────────',
  ],
  skills: () => [
    'Frontend:  React, Next.js, React Native, Tailwind',
    'Backend:   Node.js, Python, PostgreSQL, Supabase',
    'Mobile:    Kotlin, Jetpack Compose, Capacitor',
    'Tools:     Docker, Git, Firebase, Linux, Figma',
  ],
  about: () => [
    'MAKIAVELOH — Strategic Hub',
    '',
    'Constructor de sistemas digitales.',
    'Full-stack developer, UI engineer, creative mind.',
    'Código, música y filosofía como pilares.',
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
    '╔══════════════════════════════════╗',
    '║        MAKIAVELOH v3.0.0         ║',
    '║       Strategic Hub System       ║',
    '║   All Systems Fully Operational  ║',
    '╚══════════════════════════════════╝',
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
    { id: 0, type: 'output', text: '╔══════════════════════════════════╗' },
    { id: 1, type: 'output', text: '║     MAKIAVELOH Terminal v3.0.0     ║' },
    { id: 2, type: 'output', text: '╚══════════════════════════════════╝' },
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

      if (resolved === 'clear') {
        return [
          { id: nextId + 1, type: 'output', text: '╔══════════════════════════════════╗' },
          { id: nextId + 2, type: 'output', text: '║     MAKIAVELOH Terminal v3.0.0     ║' },
          { id: nextId + 3, type: 'output', text: '╚══════════════════════════════════╝' },
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
          text: `zsh: command not found: ${trimmed}. Type "help" for available commands.`,
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
