import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { TerminalGateway } from './pages/TerminalGateway'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { BlogListPage } from './pages/blog/BlogListPage'
import { BlogPostPage } from './pages/blog/BlogPostPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
  const location = useLocation()
  const isTerminal = location.pathname === '/'

  return (
    <div className="min-h-screen bg-void">
      {!isTerminal && <Navbar />}

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<TerminalGateway />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!isTerminal && <Footer />}
    </div>
  )
}
