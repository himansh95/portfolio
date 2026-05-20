import { useEffect, useRef, useState } from 'react'
import GLightbox from 'glightbox'
import staticProjects from '../../data/projects.json'
import SectionTitle from '../ui/SectionTitle'
import useGitHubRepos from '../../hooks/useGitHubRepos'

const GITHUB_USERNAME = 'himansh95'

export default function Projects() {
  const [active, setActive] = useState('All')
  const lightboxRef = useRef(null)
  const { repos, loading, error } = useGitHubRepos(GITHUB_USERNAME, 20)

  // Merge: static projects first, then GitHub repos (dedup by repoUrl)
  const staticRepoUrls = new Set(staticProjects.map(p => p.repoUrl).filter(Boolean))
  const githubProjects = repos.filter(r => !staticRepoUrls.has(r.repoUrl))
  const allProjects = [...staticProjects, ...githubProjects]

  const filters = ['All', ...new Set(allProjects.map(p => p.category))]
  const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.category === active)

  useEffect(() => {
    lightboxRef.current = GLightbox({ selector: '.portfolio-lightbox' })
    return () => lightboxRef.current?.destroy()
  }, [filtered])

  return (
    <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Projects" subtitle="My Recent Projects" />

        {/* Filters */}
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              {filters.map(f => (
                <li
                  key={f}
                  className={active === f ? 'filter-active' : ''}
                  onClick={() => setActive(f)}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grid */}
        <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
          {loading && (
            <div className="col-12 text-center py-4">
              <p>Loading GitHub projects…</p>
            </div>
          )}
          {error && (
            <div className="col-12 text-center py-2">
              <small className="text-muted">Could not load GitHub repos: {error}</small>
            </div>
          )}
          {filtered.map(project => (
            <div key={project.id} className="col-lg-4 col-md-6 portfolio-item">
              <div className="project-card">
                {/* Card header — image or colour banner */}
                <div className="project-card-header">
                  {project.image ? (
                    <img src={project.image} className="img-fluid" alt={project.title} />
                  ) : (
                    <div className="project-card-banner">
                      <i className={project.icon || 'bx bxl-github'}></i>
                    </div>
                  )}
                  <span className="project-category-badge">{project.category}</span>
                </div>

                {/* Card body */}
                <div className="project-card-body">
                  <h4 className="project-card-title">{project.title}</h4>

                  {project.description && (
                    <p className="project-card-desc">{project.description}</p>
                  )}

                  <div className="project-card-footer">
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-tech-list">
                        <i className="bx bx-code-alt"></i> 
                        {project.technologies.map(tech => (
                          <span key={tech} className="project-tech-chip">{tech}</span>
                        ))}
                      </div>
                    )}
                    {project.language && !project.technologies?.length && (
                      <div className="project-tech-list">
                        <i className="bx bx-code-alt"></i>
                        <span className="project-tech-chip">{project.language}</span>
                      </div>
                    )}
                    <div className="project-card-links ms-auto">
                      {project.stars > 0 && (
                        <span className="project-stars">
                          <i className="bx bxs-star"></i> {project.stars}
                        </span>
                      )}
                      {project.image && (
                        <a href={project.image} className="portfolio-lightbox" title="Preview">
                          <i className="bx bx-zoom-in"></i>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" title="Live Demo">
                          <i className="bx bx-link-external"></i>
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" title="Source Code">
                          <i className="bx bxl-github"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
