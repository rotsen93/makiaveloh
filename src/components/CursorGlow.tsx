import { useEffect, useState } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 hidden md:block"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(91,194,102,0.04), transparent 60%)`,
      }}
    />
  )
}
