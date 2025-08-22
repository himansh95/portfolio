import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import './utils/fontawesome'; // Import FontAwesome configuration
import { initSmoothScroll } from './utils/smoothScroll';

// Pages
import Home from './pages/Home';
import Resume from './pages/Resume';

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll(80); // 80px offset for the fixed header
  }, []);

  return (
    <Router basename="/portfolio">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
