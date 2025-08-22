import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/Header.scss';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/">Himanshu</Link>
        </div>
        
        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            {isHomePage ? (
              <>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </>
            ) : (
              <li><Link to="/">Home</Link></li>
            )}
            {!isHomePage ? (
              <li className="active"><Link to="/resume">Resume</Link></li>
            ) : (
              <li><Link to="/resume">Resume</Link></li>
            )}
          </ul>
        </nav>

        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={isMobileMenuOpen ? 'active' : ''}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
