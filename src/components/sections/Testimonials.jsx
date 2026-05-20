import { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import testimonials from '../../data/testimonials.json'

export default function Testimonials() {
  const swiperRef = useRef(null)

  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      modules: [Pagination, Autoplay],
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      slidesPerView: 1,
      pagination: { el: '.swiper-pagination', clickable: true },
    })
    return () => swiper.destroy()
  }, [])

  return (
    <section id="testimonials" className="testimonials">
      <div className="container" data-aos="zoom-in">
        <div className="testimonials-slider swiper" ref={swiperRef} data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            {testimonials.map((t) => (
              <div className="swiper-slide" key={t.id}>
                <div className="testimonial-item">
                  <img src={t.photo} className="testimonial-img" alt={t.name} />
                  <h3>{t.name}</h3>
                  <h4>{t.role} &mdash; {t.company}</h4>
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                    {t.text}
                    <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}
