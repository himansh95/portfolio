import React from 'react';
import '../../styles/components/resume/ResumeDownload.scss';

const ResumeDownload: React.FC = () => {
  // In a real application, this would link to an actual PDF file
  const handleDownload = () => {
    alert('In a real application, this would download your resume as a PDF. You would need to create and host the actual PDF file.');
  };

  return (
    <div className="resume-download">
      <h3 className="section-title">Download Resume</h3>
      <p className="download-text">Download a copy of my resume for your reference.</p>
      <button className="download-btn" onClick={handleDownload}>
        <i className="fas fa-download"></i> Download PDF
      </button>
    </div>
  );
};

export default ResumeDownload;
