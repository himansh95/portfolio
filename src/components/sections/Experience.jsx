import experience from '../../data/experience.json'
import SectionTitle from '../ui/SectionTitle'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const [year, month] = dateStr.split('-')
  return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function Experience() {
  return (
    <section id="experience" className="services">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Experience" subtitle="My Work Experience" />

        <div className="row">
          {experience.map((job, i) => (
            <div
              key={job.id}
              className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4"
              data-aos="zoom-in"
              data-aos-delay={100 + i * 100}
            >
              <div className="icon-box w-100">
                <div className="icon">
                  {job.icon
                    ? <i className={job.icon} style={{ fontSize: 32 }}></i>
                    : <i className="bx bx-briefcase"></i>
                  }
                </div>
                <h4>
                  <a href="#experience">{job.role}</a>
                </h4>
                <p style={{ color: '#ffc451', fontWeight: 600, marginBottom: 4 }}>
                  {job.company} &nbsp;·&nbsp; {formatDate(job.startDate)} – {formatDate(job.endDate)}
                </p>
                <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
                  <i className="bi bi-geo-alt me-1"></i>{job.location}
                </p>
                <ul style={{ paddingLeft: 18, fontSize: 14, color: '#555' }}>
                  {job.bullets.map((b, j) => <li key={j} style={{ marginBottom: 4 }}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
