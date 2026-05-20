import certifications from '../../data/certifications.json'
import SectionTitle from '../ui/SectionTitle'

export default function Certifications() {
  return (
    <section id="certifications" className="team">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Certifications" subtitle="My Certifications &amp; Awards" />

        <div className="row">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="col-lg-3 col-md-6 d-flex align-items-stretch"
            >
              <div className="member w-100" data-aos="fade-up" data-aos-delay={100 + i * 100}>
                <div className="member-img">
                  <img src={cert.image} className="img-fluid" alt={cert.name} />
                  {cert.credentialUrl && (
                    <div className="social">
                      <a href={cert.credentialUrl} target="_blank" rel="noreferrer" title="View Credential">
                        <i className="bi bi-patch-check"></i>
                      </a>
                    </div>
                  )}
                </div>
                <div className="member-info">
                  <h4>{cert.name}</h4>
                  <span>{cert.issuer} &nbsp;·&nbsp; {new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
