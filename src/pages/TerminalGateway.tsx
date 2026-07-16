import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminal } from '../hooks/useTerminal'
import config from '../lib/config'
import { ArrowRight } from 'lucide-react'

export function TerminalGateway() {
  const [exiting, setExiting] = useState(false)
  const navigate = useNavigate()
  const { lines, execute, navigateHistory, currentInput } = useTerminal(50)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (currentInput) setInput(currentInput)
  }, [currentInput])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateHistory('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateHistory('down')
    }
  }

  return (
    <AnimatePresence onExitComplete={() => navigate('/home')}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 bg-void flex flex-col font-mono"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/20 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-error" />
              <span className="w-3 h-3 rounded-full bg-warning" />
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="ml-3 text-xs text-text-muted">
                {config.name.toLowerCase()}@nest:~ 
              </span>
            </div>
            <button
              onClick={() => setExiting(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-muted border border-border/30 rounded hover:border-accent/50 hover:text-accent transition-colors"
            >
              Enter Site
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div
            className="flex-1 p-5 overflow-y-auto text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => (
              <div key={line.id} className="leading-relaxed mb-0.5">
                {line.type === 'input' ? (
                  <span>
                    <span className="text-accent">{'>'}</span>{' '}
                    <span className="text-text-primary">{line.text}</span>
                  </span>
                ) : (
                  <span className="text-text-muted">{line.text}</span>
                )}
              </div>
            ))}

            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-accent">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-text-primary outline-none font-mono text-sm caret-accent"
                spellCheck={false}
                autoComplete="off"
                autoFocus
              />
            </div>

            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
