import React, { useEffect, useState } from 'react';
import '../styles/components/About.scss';
import aboutData from '../data/about.json';

interface AboutData {
  title: string;
  description: string;
  details: string[];
  keyAreas: string[];
}

const About: React.FC = () => {
  const [about, setAbout] = useState<AboutData>({
    title: '',
    description: '',
    details: [],
    keyAreas: []
  });

  useEffect(() => {
    // Load data from the JSON file
    setAbout(aboutData.about);
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>{about.title}</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">{about.description}</p>
            
            <ul className="about-details">
              {about.details.map((detail, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="about-expertise">
            <h3>Areas of Expertise</h3>
            <div className="expertise-items">
              {about.keyAreas.map((area, index) => (
                <div className="expertise-item" key={index}>
                  <div className="expertise-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>{area}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
