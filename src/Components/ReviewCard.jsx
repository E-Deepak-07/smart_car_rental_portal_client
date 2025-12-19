import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        color={index < rating ? '#ffff00' : '#333333'}
        size={14}
      />
    ));
  };

  return (
    <div style={{
      backgroundColor: '#111111',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #333333',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '0.25rem' }}>
            {review.carName}
          </h4>
          <p style={{ color: '#cccccc', fontSize: '0.8rem' }}>
            by {review.userName}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1px' }}>
          {renderStars(review.rating)}
        </div>
      </div>
      
      <p style={{ color: '#ffffff', fontSize: '0.9rem', lineHeight: '1.4' }}>
        {review.comment}
      </p>
      
      {review.date && (
        <p style={{ color: '#666666', fontSize: '0.7rem', marginTop: '0.5rem' }}>
          {review.date}
        </p>
      )}
    </div>
  );
};

export default ReviewCard;