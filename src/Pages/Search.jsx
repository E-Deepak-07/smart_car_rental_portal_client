import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CarCard from '../Components/CarCard';
import { carAPI } from '../services/api';
import './Css/homepage.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carAPI.getAllCars();
      if (response.data.success) {
        setAllCars(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term) {
      const filtered = allCars.filter(car => 
        car.title?.toLowerCase().includes(term) ||
        car.brand?.toLowerCase().includes(term) ||
        car.model?.toLowerCase().includes(term) ||
        car.category?.toLowerCase().includes(term) ||
        car.fuelType?.toLowerCase().includes(term)
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars([]);
    }
  };

  return (
    <div className="homepage-container">
      <Header />
      
      <main className="main-content">
        <section className="car-section">
          <h2 className="section-title">🔍 Search Cars</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <input
              type="text"
              placeholder="Search by car name, type, or fuel..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '100%',
                maxWidth: '500px',
                padding: '1rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#ffffff'
              }}
            />
          </div>
          
          {loading ? (
            <p style={{ color: '#ffffff', textAlign: 'center' }}>Loading cars...</p>
          ) : error ? (
            <p style={{ color: '#ff6b35', textAlign: 'center' }}>{error}</p>
          ) : searchTerm ? (
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>
                Search Results ({filteredCars.length})
              </h3>
              {filteredCars.length > 0 ? (
                <div className="car-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {filteredCars.map(car => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
              ) : (
                <p style={{ color: '#ffffff', textAlign: 'center', marginTop: '2rem' }}>
                  No cars found matching "{searchTerm}"
                </p>
              )}
            </div>
          ) : allCars.length > 0 ? (
            <p style={{ color: '#ffffff', textAlign: 'center' }}>Start typing to search for cars... ({allCars.length} cars available)</p>
          ) : (
            <p style={{ color: '#ffffff', textAlign: 'center' }}>No cars available at the moment.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;