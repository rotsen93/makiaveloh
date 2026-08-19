import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import { useThemeColors } from './hooks/useThemeColors'
import Navigation from './components/section/Navigation'
import About from './components/section/About'
import DotGrid from './components/ui/DotGrid'
import SectionDivider from './components/ui/SectionDivider'
import './App.css'

// Lazy load project pages - add your project page imports here
// Example: const MyProject = lazy(() => import('./pages/projects/MyProject'))
const FiaoControl = lazy(() => import('./pages/projects/FiaoControl'))
const Nest = lazy(() => import('./pages/projects/Nest'))
const Musify = lazy(() => import('./pages/projects/Musify'))
const Contact = lazy(() => import('./pages/Contact'))

// Lazy load below-the-fold components for better initial load
const Projects = lazy(() => import('./components/section/Projects'))
const Experience = lazy(() => import('./components/section/Experience'))
const Skills = lazy(() => import('./components/section/Skills'))
const Certifications = lazy(() => import('./components/section/Certifications'))
const Footer = lazy(() => import('./components/Footer'))

function HomePage() {

  return (
    <>
      <About />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Experience />
      </Suspense>
      {/* Technical Section Divider */}
      <SectionDivider label="SYS_MODULE // 04" moduleName="SKILLS & INFRASTRUCTURE" />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Certifications />
      </Suspense>
    </>
  )
}

function AppContent() {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  return (
    <>
      <Navigation />
      <div className="app transition-colors duration-300" style={{ backgroundColor: isDarkMode ? 'transparent' : undefined }}>
        {/* Dot grid background */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <DotGrid
            dotSize={2.5}
            gap={30}
            baseColor={themeColors.colors.pink[700]}
            activeColor={themeColors.colors.pink[300]}
            proximity={110}
            speedTrigger={80}
            shockRadius={220}
            shockStrength={4}
          />
        </div>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content" className="main-content">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/fiaocontrol" element={<FiaoControl />} />
              <Route path="/projects/nest" element={<Nest />} />
              <Route path="/projects/musify" element={<Musify />} />
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  )
}

export default App