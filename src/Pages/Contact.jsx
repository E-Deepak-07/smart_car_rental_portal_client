import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Css/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  return (
    <div>
      <Header />
      
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-description">
            Smart Car Rental is a top-rated choice for anyone looking to rent a car in India. Known for our commitment to quality and customer satisfaction, we offer fully licensed self-drive rental cars with flexible pickup and drop-off options. Whether you're traveling for business, leisure, or local commutes, Smart Car Rental ensures a smooth, affordable, and dependable travel experience across India and nearby areas.
          </p>
        </div>

        <div className="contact-card">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Ready to rent a car in India? Whether you're exploring the city, traveling for business or planning a getaway, Smart Car Rental is here to make your journey easy and enjoyable.
            </p>
            
            <p>
              Smart Car Rental - Best Car Rental Service in India. Drive your preferred vehicle with confidence. Enjoy affordable rates, flexible bookings, and unmatched customer service.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <FaPhone />
                <span>+91 7373732086</span>
              </div>
              <div className="contact-item">
                <FaWhatsapp />
                <span>+91 7373732019</span>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <span>info@smartcarrental.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <div>Smart Car Rental Portal</div>
                  <div>Mumbai, Delhi, Bangalore</div>
                  <div>India 400001</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="phone-group">
                  <select className="country-select">
                    <option>India (+91)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile No"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write here your messages"
                  className="form-textarea"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;