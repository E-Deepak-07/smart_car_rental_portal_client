import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog } from 'react-icons/fa';
import '../Pages/Css/header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-left">
        <img 
          src="/src/assets/carlogo.png" 
          alt="Logo" 
          className="header-logo"
        />
      </div>
      
      <div className="header-center">
        <h1 className="header-title">SMART CAR RENTAL PORTAL</h1>
      </div>
      
      <nav className="header-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/cars" className="nav-link">Cars</Link>
        <Link to="/login" className="nav-link">Signin</Link>
      </nav>
      
      <div className="header-right">
        <Link to="/profile">
          <button className="header-icon">
            <FaUser />
          </button>
        </Link>
        <Link to="/settings">
          <button className="header-icon">
            <FaCog />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;