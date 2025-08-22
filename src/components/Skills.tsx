import React, { useEffect, useState } from 'react';
import '../styles/components/Skills.scss';
import skillsData from '../data/skills.json';
import Icon from './shared/Icon';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsData {
  programmingLanguages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillsData>({
    programmingLanguages: [],
    frameworks: [],
    tools: []
  });

  useEffect(() => {
    // Load data from the JSON file
    setSkills(skillsData.skills);
  }, []);

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-title">
          <h2>My Skills</h2>
          <p>Here are my technical skills and proficiency levels</p>
        </div>
        
        <div className="skills-content">
          <div className="skills-category">
            <h3>Programming Languages</h3>
            <div className="skills-grid">
              {skills.programmingLanguages.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-icon">
                    <Icon iconClass={skill.icon} />
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <div className="skill-progress">
                      <div className="progress-bar" style={{ width: `${skill.level}%` }}>
                        <span className="progress-value">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h3>Frameworks & Libraries</h3>
            <div className="skills-grid">
              {skills.frameworks.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-icon">
                    <Icon iconClass={skill.icon} />
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <div className="skill-progress">
                      <div className="progress-bar" style={{ width: `${skill.level}%` }}>
                        <span className="progress-value">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h3>Tools & Technologies</h3>
            <div className="skills-grid">
              {skills.tools.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-icon">
                    <Icon iconClass={skill.icon} />
                  </div>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <div className="skill-progress">
                      <div className="progress-bar" style={{ width: `${skill.level}%` }}>
                        <span className="progress-value">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
