import React, { useState } from 'react';
import { FaStar, FaHeart, FaShare, FaCar, FaGasPump, FaUsers } from 'react-icons/fa';
import { bookingAPI } from '../services/api';
import '../Pages/Css/carcard.css';

const CarCard = ({ car, showBookButton = true }) => {
  const [imageError, setImageError] = useState(false);

  const handleLike = () => {
    console.log('Liked car:', car.name);
  };

  const handleShare = () => {
    console.log('Shared car:', car.name);
  };

  const handleBook = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to book a car');
      return;
    }

    const searchData = JSON.parse(localStorage.getItem('searchData') || '{}');
    if (!searchData.pickupLocation || !searchData.pickupDate) {
      alert('Please select pickup details from home page first');
      return;
    }

    try {
      const response = await bookingAPI.createBooking({
        carId: car._id || car.id,
        startDate: searchData.pickupDate,
        endDate: searchData.dropoffDate,
        pickupLocation: searchData.pickupLocation,
        dropoffLocation: searchData.dropoffLocation
      });

      if (response.data.success) {
        alert('Car booked successfully!');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed: ' + (error.response?.data?.message || error.response?.data?.error || 'Server error'));
    }
  };



  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="car-card-container">
      <div className="car-image-placeholder">
        {car.images && car.images[0] && !imageError ? (
          <img src={car.images[0]} alt={car.title} onError={handleImageError} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <FaCar size={40} color="#bdc3c7" />
            <span style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>{car.title}</span>
          </div>
        )}
      </div>

      <div className="car-details">
        <h3 className="car-name">{car.title || `${car.brand} ${car.model}`}</h3>
        <p className="car-price">₹{car.pricePerDay}/day</p>

        <div className="car-rating" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <FaStar color="#f39c12" size={14} />
          <span style={{ fontSize: '0.9rem', color: '#2c3e50' }}>{car.rating || '0'}</span>
          <span style={{ fontSize: '0.8rem', color: '#95a5a6' }}>({car.totalRatings || '0'})</span>
        </div>

        <div className="car-info">
          <FaCar size={12} color="#7f8c8d" />
          <span>{car.category || car.transmission}</span>
        </div>
        <div className="car-info">
          <FaGasPump size={12} color="#7f8c8d" />
          <span>{car.fuelType}</span>
        </div>
        <div className="car-info">
          <FaUsers size={12} color="#7f8c8d" />
          <span>{car.seats} Seats</span>
        </div>

        <div className="car-actions">
          {showBookButton && (
            <button className="action-button primary" onClick={handleBook}>
              Book Now
            </button>
          )}
          <button className="action-button" onClick={handleLike}>
            <FaHeart size={12} />
          </button>
          <button className="action-button" onClick={handleShare}>
            <FaShare size={12} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CarCard;