import React from 'react';
import { FaStar } from 'react-icons/fa';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './Css/homepage.css';

const Reviews = () => {
  const topReviews = [
    {
      id: 1,
      carName: 'Tesla Model S',
      userName: 'John Doe',
      rating: 5,
      comment: 'Amazing electric car! Silent and smooth ride. Perfect for long trips.',
      date: '2024-01-15'
    },
    {
      id: 2,
      carName: 'BMW X5',
      userName: 'Sarah Wilson',
      rating: 4,
      comment: 'Great SUV for family trips. Spacious and comfortable.',
      date: '2024-01-12'
    },
    {
      id: 3,
      carName: 'Audi A4',
      userName: 'Mike Johnson',
      rating: 5,
      comment: 'Luxury at its best! Excellent performance and style.',
      date: '2024-01-10'
    },
    {
      id: 4,
      carName: 'Mercedes C-Class',
      userName: 'Emily Davis',
      rating: 4,
      comment: 'Smooth driving experience. Premium interior quality.',
      date: '2024-01-08'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        color={index < rating ? '#ffff00' : '#333333'}
        size={16}
      />
    ));
  };

  return (
    <div className="homepage-container">
      <Header />
      
      <main className="main-content">
        <section className="car-section">
          <h2 className="section-title">⭐ Top Reviews</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {topReviews.map(review => (
              <div
                key={review.id}
                style={{
                  backgroundColor: '#111111',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #333333'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      {review.carName}
                    </h3>
                    <p style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                      by {review.userName} • {review.date}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <p style={{ color: '#ffffff', lineHeight: '1.5' }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;