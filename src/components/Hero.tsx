import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Hero.scss';
import personalInfoData from '../data/personalInfo.json';
import Typed from 'typed.js';
import Icon from './shared/Icon';
import { smoothScrollTo } from '../utils/smoothScroll';

interface PersonalInfo {
  name: string;
  title: string;
  summary: string;
  profileImage: string;
}

const Hero: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    title: '',
    summary: '',
    profileImage: ''
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    // Load data from the JSON file
    setPersonalInfo(personalInfoData.personalInfo);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [personalInfo.title, 'Web Developer', 'UI/UX Enthusiast', 'Problem Solver'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
      });

      return () => {
        if (typedInstance.current) {
          typedInstance.current.destroy();
        }
      };
    }
  }, [isLoaded, personalInfo.title]);

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fadeIn">
            <h1>Hi, I'm <span className="highlight">{personalInfo.name}</span></h1>
            <h2>I am a <span ref={typedRef}></span></h2>
            <p className="animate-slideInUp">{personalInfo.summary}</p>
            <div className="hero-buttons animate-slideInUp">
              <Link to="/resume" className="btn btn-primary">
                <Icon iconClass="fas fa-file-alt" /> View Resume
              </Link>
              <a href="#contact" className="btn btn-outline" onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('contact', 80);
              }}>
                <Icon iconClass="fas fa-envelope" /> Contact Me
              </a>
            </div>
          </div>
          <div className="hero-image animate-fadeIn">
            <div className="profile-img-container">
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.name} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll animate-bounce">
        <a href="#about" onClick={(e) => {
          e.preventDefault();
          smoothScrollTo('about', 80);
        }}>
          <Icon iconClass="fas fa-chevron-down" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
