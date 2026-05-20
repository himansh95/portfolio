import { HashRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import './App.css'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import CallToAction from './components/sections/CallToAction'
import Projects from './components/sections/Projects'
import Stats from './components/sections/Stats'
import Testimonials from './components/sections/Testimonials'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import BackToTop from './components/ui/BackToTop'
import Preloader from './components/ui/Preloader'
import ResumePage from './components/pages/ResumePage'

function PortfolioPage() {
  // Restore scroll position when returning from resume page
  useEffect(() => {
    const saved = sessionStorage.getItem('portfolioScrollY')
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10))
      sessionStorage.removeItem('portfolioScrollY')
    }
  }, [])

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <CallToAction />
        <Projects />
        <Stats />
        <Testimonials />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    })
  }, [])

  return (
    <HashRouter>
      <Preloader />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
