import skills from '../../data/skills.json'
import SectionTitle from '../ui/SectionTitle'

export default function Skills() {
  return (
    <section id="skills" className="features">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Skills" subtitle="My Technical Skills" />

        <div className="row">
          <div
            className="image col-lg-6"
            style={{ backgroundImage: 'url(/portfolio/assets/img/hero-bg.jpg)' }}
            data-aos="fade-right"
          ></div>

          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="100">
            {skills.map((group, i) => (
              <div
                className="icon-box mt-5 mt-lg-0"
                data-aos="zoom-in"
                data-aos-delay={100 + i * 50}
                key={group.category}
              >
                <i className={group.icon}></i>
                <h4>{group.category}</h4>
                <p>{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
