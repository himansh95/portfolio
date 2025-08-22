import React, { useEffect, useState, useCallback, useRef } from 'react';
import '../styles/components/Testimonials.scss';
import testimonialsData from '../data/testimonials.json';
import Icon from './shared/Icon';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  text: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load data from the JSON file
    setTestimonials(testimonialsData.testimonials);
  }, []);

  // Auto-play testimonials
  useEffect(() => {
    if (isPlaying && testimonials.length > 0) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, testimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      } else if (e.key === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const nextTestimonial = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  }, [testimonials.length, isPlaying]);

  const prevTestimonial = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  }, [testimonials.length, isPlaying]);

  const goToTestimonial = (index: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setActiveIndex(index);
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Testimonials</h2>
          <p>What people say about my work</p>
        </div>
        
        <div className="testimonials-content">
          {testimonials.length > 0 && (
            <div className="testimonials-slider">
              <div className="testimonial-item">
                <div className="testimonial-icon">
                  <Icon iconClass="fas fa-quote-left" />
                </div>
                <p className="testimonial-text">{testimonials[activeIndex].text}</p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                  </div>
                  <div className="author-info">
                    <h4>{testimonials[activeIndex].name}</h4>
                    <p>{testimonials[activeIndex].position}</p>
                  </div>
                </div>
              </div>
              
              <div className="testimonial-controls">
                <button className="control-btn prev" onClick={prevTestimonial} aria-label="Previous testimonial">
                  <Icon iconClass="fas fa-arrow-left" />
                </button>
                <div className="testimonial-dots">
                  {testimonials.map((_, index) => (
                    <span 
                      key={index} 
                      className={`dot ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => goToTestimonial(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    ></span>
                  ))}
                </div>
                <button className="control-btn next" onClick={nextTestimonial} aria-label="Next testimonial">
                  <Icon iconClass="fas fa-arrow-right" />
                </button>
                <button 
                  className="control-btn play-pause" 
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  <Icon iconClass={isPlaying ? "fas fa-pause" : "fas fa-play"} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
