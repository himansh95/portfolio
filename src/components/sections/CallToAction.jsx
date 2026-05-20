import { Link } from 'react-router-dom'
import personal from '../../data/personal.json'
import { scrollTo } from '../../utils/scrollTo'

export default function CallToAction() {
  return (
    <section id="cta" className="cta">
      <div className="container" data-aos="zoom-in">
        <div className="text-center">
          <h3>Looking for a dedicated developer?</h3>
          <p>
            I'm available for freelance and full-time opportunities. Whether you need a Salesforce SME,
            a full-stack developer, or a technical lead — let's build something great together.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <a href="#contact" className="cta-btn scrollto" onClick={(e) => scrollTo(e, 'contact')}>Get In Touch</a>
            <Link to="/resume" className="cta-btn" onClick={() => sessionStorage.setItem('portfolioScrollY', window.scrollY)}>View Resume</Link>
            <a href={personal.resumeUrl} download className="cta-btn">
              <i className="bi bi-download me-1"></i> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
