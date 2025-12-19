import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CarCard from '../Components/CarCard';
import { FaCar } from 'react-icons/fa';
import { carAPI } from '../services/api';
import './Css/homepage.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await carAPI.getAllCars();
        if (response.data.success) {
          setCars(response.data.data);
        }
      } catch (err) {
        setError('Failed to fetch cars');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="homepage-container">
      <Header />

      <main className="main-content">
        <section className="car-section">
          <h2 className="section-title"><FaCar style={{ marginRight: '0.5rem', color: '#ff6b35' }} /> Indian Car Fleet</h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading cars...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {cars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cars;