import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted font-mono mb-6">
              runtime exception
            </p>
            <h1 className="text-xl font-bold tracking-[0.1em] uppercase text-text-primary mb-4">
              algo se rompi&oacute;
            </h1>
            <p className="text-sm text-text-muted font-mono leading-relaxed mb-8">
              un error inesperado ocurri&oacute;. recarg&aacute; la p&aacute;gina o
              volv&eacute; al inicio.
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-accent hover:text-accent/80 transition-colors font-mono"
            >
              volver al inicio
              <span className="text-accent/50">&rarr;</span>
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
