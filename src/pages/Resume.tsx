import React from 'react';
import Header from '../components/Header';
import ResumeHeader from '../components/resume/ResumeHeader';
import ResumeContent from '../components/resume/ResumeContent';
import ResumeDownload from '../components/resume/ResumeDownload';
import Footer from '../components/Footer';
import ScrollToTop from '../components/shared/ScrollToTop';
import '../styles/pages/Resume.scss';

const Resume: React.FC = () => {
  return (
    <div className="resume-page">
      <Header />
      <main className="resume-container">
        <div className="resume-grid">
          <div className="resume-left-column">
            <ResumeHeader />
            <ResumeDownload />
          </div>
          <div className="resume-right-column">
            <ResumeContent />
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Resume;
