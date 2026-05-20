import { useEffect, useRef, useState } from 'react'
import stats from '../../data/stats.json'

function useCountUp(end, duration = 2000, triggered = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    let start = 0
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [triggered, end, duration])
  return count
}

function StatBox({ stat, triggered }) {
  const count = useCountUp(stat.end, stat.duration * 1000, triggered)
  return (
    <div className="count-box">
      <i className={stat.icon}></i>
      <span>{count}+</span>
      <p><strong>{stat.label}</strong></p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="counts">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">

          <div className="col-xl-10 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div className="content d-flex flex-column align-items-center text-center w-100" ref={sectionRef}>
              <h3>Building great software, one idea at a time</h3>
              <p>A snapshot of my professional journey so far.</p>
              <div className="row justify-content-center w-100">
                {stats.map((stat) => (
                  <div key={stat.label} className="col-6 col-md-3 d-flex align-items-stretch">
                    <StatBox stat={stat} triggered={triggered} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
