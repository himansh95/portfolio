import { Link } from 'react-router-dom'
import personal from '../../data/personal.json'
import skills from '../../data/skills.json'
import { scrollTo } from '../../utils/scrollTo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">

            {/* Brand + contact info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-info">
                <h3>{personal.name.split(' ')[0]}<span>.</span></h3>
                <p>
                  {personal.location}<br /><br />
                  <strong>Email:</strong> <a href={`mailto:${personal.email}`}>{personal.email}</a>
                </p>
                <div className="social-links mt-3">
                  {personal.social.map(({ label, url, icon }) => (
                    <a key={label} href={url} target="_blank" rel="noreferrer">
                      <i className={icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a href="#hero"       onClick={(e) => scrollTo(e, 'hero')}>Home</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#about"      onClick={(e) => scrollTo(e, 'about')}>About</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#skills"     onClick={(e) => scrollTo(e, 'skills')}>Skills</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#experience" onClick={(e) => scrollTo(e, 'experience')}>Experience</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#portfolio"  onClick={(e) => scrollTo(e, 'portfolio')}>Projects</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#contact"    onClick={(e) => scrollTo(e, 'contact')}>Contact</a></li>
              </ul>
            </div>

            {/* Services / expertise — driven from skills.json */}
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Expertise</h4>
              <ul>
                {skills.map((group) => (
                  <li key={group.category}>
                    <i className="bx bx-chevron-right"></i>
                    <a href="#skills" onClick={(e) => scrollTo(e, 'skills')}>{group.category}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resume CTA */}
            <div className="col-lg-3 col-md-6 footer-newsletter">
              <h4>My Resume</h4>
              <p>Want to know more about my background? Download my resume or view it online.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                <Link
                  to="/resume"
                  onClick={() => sessionStorage.setItem('portfolioScrollY', window.scrollY)}
                  style={{
                    background: '#ffc451',
                    color: '#151515',
                    padding: '8px 18px',
                    borderRadius: 4,
                    fontWeight: 700,
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: 14,
                  }}
                >
                  View Resume
                </Link>
                <a
                  href={personal.resumeUrl}
                  download
                  style={{
                    border: '2px solid #ffc451',
                    color: '#ffc451',
                    padding: '8px 18px',
                    borderRadius: 4,
                    fontWeight: 700,
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: 14,
                  }}
                >
                  Download PDF
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; {year} <strong><span>{personal.name}</span></strong>. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
