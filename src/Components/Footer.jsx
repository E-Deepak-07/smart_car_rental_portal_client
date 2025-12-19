import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';
import '../Pages/Css/footer.css';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="footer-container">
      <div className="footer-nav">
        <Link to="/search">
          <button className="footer-button">
            <FaSearch />
            Search
          </button>
        </Link>
        
        <Link to="/">
          <button className={`footer-button ${location.pathname === '/' ? 'active' : ''}`}>
            <FaHome />
            Home
          </button>
        </Link>
        
        <Link to="/contact">
          <button className="footer-button">
            <FaEnvelope />
            Contact
          </button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;