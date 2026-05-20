import { useEffect, useState } from 'react'

const NAV_SECTIONS = ['hero', 'about', 'companies', 'skills', 'experience', 'portfolio', 'stats', 'testimonials', 'certifications', 'contact']

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + 80 // offset for fixed header

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i])
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_SECTIONS[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return activeSection
}
