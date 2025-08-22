import React, { useState } from 'react';
import '../styles/components/Contact.scss';
import personalInfoData from '../data/personalInfo.json';
import Icon from './shared/Icon';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  const { email, phone, location, social } = personalInfoData.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // In a real application, you would send the form data to a server here
    // This is just a simulation
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully!'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact Me</h2>
          <p>Get in touch for opportunities or inquiries</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <Icon iconClass="fas fa-envelope" />
              </div>
              <div className="info-details">
                <h4>Email</h4>
                <p><a href={`mailto:${email}`}>{email}</a></p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <Icon iconClass="fas fa-phone-alt" />
              </div>
              <div className="info-details">
                <h4>Phone</h4>
                <p><a href={`tel:${phone}`}>{phone}</a></p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <Icon iconClass="fas fa-map-marker-alt" />
              </div>
              <div className="info-details">
                <h4>Location</h4>
                <p>{location}</p>
              </div>
            </div>
            
            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-icons">
                {social.github && (
                  <a href={social.github} target="_blank" rel="noopener noreferrer">
                    <Icon iconClass="fab fa-github" />
                  </a>
                )}
                
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Icon iconClass="fab fa-linkedin-in" />
                  </a>
                )}
                
                {social.twitter && (
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <Icon iconClass="fab fa-twitter" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name *" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email *" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message *" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
              
              {formStatus.submitted && (
                <div className={`form-status ${formStatus.success ? 'success' : 'error'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
