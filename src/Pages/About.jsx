import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCar, FaShieldAlt, FaUsers } from 'react-icons/fa';
import './Css/about.css';

const About = () => {
  return (
    <div className="about-container">
      <Header />
      
      <div className="about-header">
        <h1 className="about-title">About Us</h1>
        <div className="about-description">
          <p>
            We offer a varied fleet of cars, ranging from the compact. All our vehicles have air 
            conditioning, power steering, electric windows. All our vehicles are bought and maintained at 
            official dealerships only. Automatic transmission cars are available in every booking class.
          </p>
          
          <p>
            Our mission is to be recognised as the global leader in Car Rental for companies and the 
            public and private sector by partnering with our clients to provide the best and most efficient 
            Car Rental solutions and to achieve service excellence.
          </p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <FaCar />
          </div>
          <h3>Quality Fleet</h3>
          <p>Modern, well-maintained vehicles with air conditioning, power steering, and electric windows for your comfort.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaShieldAlt />
          </div>
          <h3>Trusted Service</h3>
          <p>All vehicles are bought and maintained at official dealerships, ensuring reliability and safety for every journey.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaUsers />
          </div>
          <h3>Customer Focus</h3>
          <p>Dedicated to providing excellent customer service and the best car rental solutions for all your needs.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;