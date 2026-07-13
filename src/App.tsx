import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CursorGlow } from './components/CursorGlow'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/projects/ProjectPage'
import { BlogListPage } from './pages/blog/BlogListPage'
import { BlogPostPage } from './pages/blog/BlogPostPage'
import { AdminPage } from './pages/AdminPage'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  return (
    <div className="min-h-screen bg-void relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,194,102,0.03),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(77,138,240,0.02),transparent_50%)]" />
      </div>

      <CursorGlow />
      <Navbar />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
