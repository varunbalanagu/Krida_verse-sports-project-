import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Thank you for contacting us! We will get back to you shortly.");
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-section">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with Aditya University Sports Council</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Your Message" 
          rows="5" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h3>Address</h3>
          <p>Aditya University Campus, Surampalem, Kakinada, AP, India</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <h3>Phone</h3>
          <p>+91 99897 76661</p>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h3>Email</h3>
          <p>sports@aditya.ac.in</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
