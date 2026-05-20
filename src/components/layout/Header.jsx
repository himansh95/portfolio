import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useActiveSection from '../../hooks/useActiveSection'
import personal from '../../data/personal.json'
import { scrollTo as scrollToSection } from '../../utils/scrollTo'

const NAV_LINKS = [
  { label: 'Home',           href: '#hero' },
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#portfolio' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const activeSection               = useActiveSection()
  const location                    = useLocation()
  const isResumePage                = location.pathname === '/resume'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on link click
  const handleNavClick = () => setMobileOpen(false)

  const scrollTo = (e, href) => {
    handleNavClick()
    scrollToSection(e, href.replace('#', ''))
  }

  return (
    <header id="header" className={`fixed-top${scrolled ? ' header-scrolled' : ''}`}>
      <div className="container d-flex align-items-center justify-content-lg-between">

        {/* Logo */}
        <h1 className="logo me-auto me-lg-0">
          {isResumePage
            ? <Link to="/">{personal.name.split(' ')[0]}<span>.</span></Link>
            : <a href="#hero">{personal.name.split(' ')[0]}<span>.</span></a>
          }
        </h1>

        {/* Nav */}
        <nav id="navbar" className={`navbar order-last order-lg-0${mobileOpen ? ' navbar-mobile' : ''}`}>
          <ul>
            {!isResumePage && NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '')
              const isActive  = activeSection === sectionId
              return (
                <li key={href}>
                  <a
                    className={`nav-link scrollto${isActive ? ' active' : ''}`}
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
            <li>
              <Link
                to="/resume"
                className={`nav-link${isResumePage ? ' active' : ''}`}
                onClick={() => {
                  sessionStorage.setItem('portfolioScrollY', window.scrollY)
                  handleNavClick()
                }}
              >
                Resume
              </Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <i
            className={`bi ${mobileOpen ? 'bi-x' : 'bi-list'} mobile-nav-toggle`}
            onClick={() => setMobileOpen(o => !o)}
          />
        </nav>

        {/* CTA button — only on portfolio page */}
        {!isResumePage && (
          <a href="#contact" className="get-started-btn scrollto" onClick={(e) => scrollTo(e, '#contact')}>
            Hire Me
          </a>
        )}
      </div>
    </header>
  )
}
