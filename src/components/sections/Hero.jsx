import personal from '../../data/personal.json'
import { scrollTo } from '../../utils/scrollTo'

const HERO_ICONS = [
  { icon: 'ri-cloud-line',         label: 'Salesforce Commerce Cloud' },
  { icon: 'ri-stack-line',         label: 'Full Stack Developer' },
  { icon: 'ri-code-s-slash-line',  label: 'React JS Enthusiast' },
  { icon: 'ri-database-2-line',    label: 'Java / Android / Node.js' },
  { icon: 'ri-tools-line',         label: 'Cloud & DevOps' },
]

export default function Hero() {
  return (
    <section id="hero" className="d-flex align-items-center justify-content-center">
      <div className="container" data-aos="fade-up">

        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
          <div className="col-xl-8 col-lg-10">
            <h1>{personal.name}<span>.</span></h1>
            <h2>{personal.tagline}</h2>
            <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
              <a href="#about" className="get-started-btn scrollto" onClick={(e) => scrollTo(e, 'about')}>About Me</a>
              <a href="#contact" className="get-started-btn scrollto" style={{ background: 'transparent', marginLeft: 8 }} onClick={(e) => scrollTo(e, 'contact')}>
                Hire Me
              </a>
            </div>
          </div>
        </div>

        <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay="250">
          {HERO_ICONS.map(({ icon, label }) => (
            <div className="col-xl-2 col-md-4" key={label}>
              <div className="icon-box">
                <i className={icon}></i>
                <h3><a href="#skills" onClick={(e) => scrollTo(e, 'skills')}>{label}</a></h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
