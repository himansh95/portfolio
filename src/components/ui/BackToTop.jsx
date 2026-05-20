import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#hero"
      className={`back-to-top d-flex align-items-center justify-content-center${active ? ' active' : ''}`}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  )
}
