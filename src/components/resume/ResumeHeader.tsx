import React from 'react';
import personalInfoData from '../../data/personalInfo.json';
import '../../styles/components/resume/ResumeHeader.scss';

const ResumeHeader: React.FC = () => {
  const { name, title, email, phone, location, social, profileImage, summary } = personalInfoData.personalInfo;

  return (
    <div className="resume-header">
      <div className="profile-image">
        <img src={profileImage} alt={name} />
      </div>
      
      <div className="resume-title">
        <h1>{name}</h1>
        <h2>{title}</h2>
      </div>
      
      <div className="resume-contact">
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <span>{email}</span>
        </div>
        
        <div className="contact-item">
          <i className="fas fa-phone-alt"></i>
          <span>{phone}</span>
        </div>
        
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>{location}</span>
        </div>
      </div>
      
      <div className="resume-social">
        <div className="contact-item">
          <i className="fab fa-linkedin-in"></i>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        
        <div className="contact-item">
          <i className="fab fa-github"></i>
          <a href={social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        
        <div className="contact-item">
          <i className="fab fa-twitter"></i>
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
      
      <div className="resume-summary">
        <h3 className="section-title">About Me</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default ResumeHeader;
