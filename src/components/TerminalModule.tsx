import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useTerminal } from '../hooks/useTerminal'

export function TerminalModule() {
  const { lines, execute, navigateHistory, currentInput } = useTerminal()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
    <motion.div
      ref={ref}
      className="bento-cell rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-surface/60">
        <Terminal className="w-3 h-3 text-text-muted" />
        <span className="text-[10px] tracking-[0.25em] uppercase text-text-muted font-mono">
          Terminal
        </span>
        <div className="flex gap-1.5 ml-auto">
          <div className="w-2 h-2 rounded-full bg-surface" />
          <div className="w-2 h-2 rounded-full bg-surface" />
          <div className="w-2 h-2 rounded-full bg-surface" />
        </div>
      </div>

      <div
        className="p-4 h-[260px] overflow-y-auto font-mono text-xs cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed">
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

        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-accent">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-text-primary outline-none font-mono text-xs caret-accent"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </motion.div>
  )
}
