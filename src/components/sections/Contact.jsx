import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import personal from '../../data/personal.json'
import SectionTitle from '../ui/SectionTitle'

// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_odr6au9'
const EMAILJS_TEMPLATE_ID = 'template_idhp6kh'
const EMAILJS_PUBLIC_KEY  = 'f4Pe9dm9Zto3xIh7T'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <SectionTitle title="Contact" subtitle="Get In Touch" />

        <div className="row mt-5">

          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>{personal.location}</p>
              </div>
              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p><a href={`mailto:${personal.email}`}>{personal.email}</a></p>
              </div>
              <div className="phone" style={{ marginTop: 40 }}>
                <i className="bx bxl-linkedin" style={{ background: '#ffc451', color: '#151515', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, fontSize: 20 }}></i>
                <h4>LinkedIn:</h4>
                {(() => {
                  const li = personal.social.find(s => s.label === 'LinkedIn')
                  return li ? (
                    <p><a href={li.url} target="_blank" rel="noreferrer">{li.url.replace('https://www.linkedin.com/in/', '')}</a></p>
                  ) : null
                })()}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8 mt-5 mt-lg-0">
            <form ref={formRef} onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="from_name" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" name="from_email" className="form-control" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" name="subject" className="form-control" placeholder="Subject" required />
              </div>
              <div className="form-group mt-3">
                <textarea name="message" className="form-control" rows="5" placeholder="Message" required></textarea>
              </div>

              <div className="my-3">
                {status === 'sending' && <div className="loading">Sending…</div>}
                {status === 'error'   && <div className="error-message" style={{ display: 'block' }}>Something went wrong. Please try again.</div>}
                {status === 'sent'    && <div className="sent-message"  style={{ display: 'block' }}>We have received your message and will get back to you shortly.</div>}
              </div>

              <div className="text-center">
                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
