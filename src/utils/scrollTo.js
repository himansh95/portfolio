/**
 * Smooth-scrolls to a section by id, preventing HashRouter from
 * treating "#section" as a route change.
 * Usage: <a href="#about" onClick={(e) => scrollTo(e, 'about')}>
 */
export function scrollTo(e, sectionId) {
  e.preventDefault()
  const el = document.getElementById(sectionId)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
