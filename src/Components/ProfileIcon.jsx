import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileIcon = ({ user }) => {
  return (
    <Link to="/profile">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        backgroundColor: '#000000',
        borderRadius: '4px',
        cursor: 'pointer',
        border: '1px solid #333333'
      }}>
        <FaUser color="#ffffff" />
        {user && (
          <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
            {user.username}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProfileIcon;