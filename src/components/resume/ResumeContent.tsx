import React, { useEffect, useState } from 'react';
import '../../styles/components/resume/ResumeContent.scss';
import resumeData from '../../data/resume.json';
import skillsData from '../../data/skills.json';

interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ResumeData {
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  projects: Project[];
}

const ResumeContent: React.FC = () => {
  const [resume, setResume] = useState<ResumeData>({
    education: [],
    experience: [],
    certifications: [],
    projects: []
  });

  const [skills, setSkills] = useState<{
    programmingLanguages: Array<{ name: string; level: number; icon: string }>;
    frameworks: Array<{ name: string; level: number; icon: string }>;
    tools: Array<{ name: string; level: number; icon: string }>;
  }>({
    programmingLanguages: [],
    frameworks: [],
    tools: []
  });

  useEffect(() => {
    // Load data from JSON files
    setResume(resumeData.resume);
    
    // Cast the skills data to the expected type
    const typedSkills = skillsData.skills as {
      programmingLanguages: Array<{ name: string; level: number; icon: string }>;
      frameworks: Array<{ name: string; level: number; icon: string }>;
      tools: Array<{ name: string; level: number; icon: string }>;
    };
    
    setSkills(typedSkills);
  }, []);

  return (
    <div className="resume-content">
      <section className="resume-section">
        <h3 className="section-title">Work Experience</h3>
        <div className="section-content">
          {resume.experience.map((exp, index) => (
            <div className="resume-item" key={index}>
              <div className="item-header">
                <h4>{exp.position}</h4>
                <span className="period">{exp.period}</span>
              </div>
              <h5>{exp.company}, {exp.location}</h5>
              <ul className="responsibilities">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      
      <section className="resume-section">
        <h3 className="section-title">Education</h3>
        <div className="section-content">
          {resume.education.map((edu, index) => (
            <div className="resume-item" key={index}>
              <div className="item-header">
                <h4>{edu.degree}</h4>
                <span className="period">{edu.period}</span>
              </div>
              <h5>{edu.institution}, {edu.location}</h5>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="resume-section">
        <h3 className="section-title">Skills</h3>
        <div className="section-content">
          <div className="skills-group">
            <h4>Programming Languages</h4>
            <div className="skills-list">
              {skills.programmingLanguages.map((skill, index) => (
                <span className="skill-tag" key={index}>{skill.name}</span>
              ))}
            </div>
          </div>
          
          <div className="skills-group">
            <h4>Frameworks & Libraries</h4>
            <div className="skills-list">
              {skills.frameworks.map((skill, index) => (
                <span className="skill-tag" key={index}>{skill.name}</span>
              ))}
            </div>
          </div>
          
          <div className="skills-group">
            <h4>Tools & Technologies</h4>
            <div className="skills-list">
              {skills.tools.map((skill, index) => (
                <span className="skill-tag" key={index}>{skill.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="resume-section">
        <h3 className="section-title">Certifications</h3>
        <div className="section-content">
          {resume.certifications.map((cert, index) => (
            <div className="resume-item certification" key={index}>
              <h4>{cert.name}</h4>
              <p>{cert.issuer} • {cert.date}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="resume-section">
        <h3 className="section-title">Projects</h3>
        <div className="section-content">
          {resume.projects.map((project, index) => (
            <div className="resume-item" key={index}>
              <div className="item-header">
                <h4>{project.name}</h4>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fab fa-github"></i> View Project
                </a>
              </div>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.technologies.map((tech, idx) => (
                  <span className="tech-tag" key={idx}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeContent;
