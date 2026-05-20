import personal from '../../data/personal.json'
import SectionTitle from '../ui/SectionTitle'

const HIGHLIGHTS = [
  '8+ years building enterprise Salesforce Commerce Cloud and full-stack solutions',
  'Certified Salesforce B2C Commerce Developer & Oracle Java Associate',
  'Passionate about clean code, performance, and great developer experience',
  'Experience working with global teams',
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">

          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src="/portfolio/assets/img/og-image.jpg" className="img-fluid" alt={personal.name} />
          </div>

          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
            <SectionTitle title="About" subtitle={`About ${personal.name}`} />
            <h3>Full Stack Developer &amp; Salesforce Commerce Cloud SME</h3>
            <p className="fst-italic">{personal.bio}</p>
            <ul>
              {HIGHLIGHTS.map((item, i) => (
                <li key={i}>
                  <i className="ri-check-double-line"></i> {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 d-flex gap-3 flex-wrap">
              {personal.social.map(({ label, url, icon }) => (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="about-social-btn">
                  <i className={icon}></i> {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
