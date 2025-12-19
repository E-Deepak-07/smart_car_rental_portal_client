import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CarCard from '../Components/CarCard';
import { FaArrowRight, FaMapMarkerAlt, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { carAPI } from '../services/api';
import './Css/homepage.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carAPI.getAllCars();
      if (response.data.success) {
        setCars(response.data.data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {
    if (!bookingForm.pickupLocation || !bookingForm.pickupDate) {
      alert('Please select pickup location and date');
      return;
    }

    localStorage.setItem('searchData', JSON.stringify(bookingForm));
    navigate('/search');
  };



  return (
    <div className="homepage-container">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Let's find your <span className="highlight">perfect car</span></h1>
          </div>

          <div className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label>Pickup Location</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <select
                    name="pickupLocation"
                    value={bookingForm.pickupLocation}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select Pickup City</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Drop-off Location</label>
                <div className="input-with-icon">
                  <FaMapMarkerAlt className="input-icon" />
                  <select
                    name="dropoffLocation"
                    value={bookingForm.dropoffLocation}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select DropOff City</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pickup Date & Time</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="datetime-local"
                    name="pickupDate"
                    value={bookingForm.pickupDate}
                    onChange={handleInputChange}
                    className="form-input date-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Drop-off Date & Time</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="datetime-local"
                    name="dropoffDate"
                    value={bookingForm.dropoffDate}
                    onChange={handleInputChange}
                    className="form-input date-input"
                  />
                </div>
              </div>
            </div>

            <button className="search-button" onClick={handleSearch}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      <main className="main-content">
        <section className="car-section">
          <h2 className="section-title"><FaStar style={{ marginRight: '0.5rem', color: '#f39c12' }} /> Most Rented Cars</h2>
          <div className="car-grid" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
            {cars.map(car => (
              <CarCard key={car._id} car={car} showBookButton={false} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;