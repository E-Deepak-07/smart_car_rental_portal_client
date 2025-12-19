import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { authAPI } from '../services/api';
import { FaUser, FaCalendarAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSignOutAlt, FaCar, FaStar, FaClock } from 'react-icons/fa';
import './Css/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ phone: user.phone || '' });
  };

  const handleSave = async () => {
    try {
      const response = await authAPI.updateProfile(editData);
      
      if (response.data.success) {
        setUser({ ...user, phone: editData.phone });
        localStorage.setItem('user', JSON.stringify({ ...user, phone: editData.phone }));
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ phone: user.phone || '' });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account information and bookings</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <h3><FaUser /> Personal Information</h3>
            
            <div className="profile-info">
              <div className="info-item">
                <div className="info-icon">
                  <FaUser />
                </div>
                <div className="info-content">
                  <div className="info-label">Username</div>
                  <div className="info-value">{user.name}</div>
                </div>
              </div>

              {user.dateOfBirth && (
                <div className="info-item">
                  <div className="info-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="info-content">
                    <div className="info-label">Date of Birth</div>
                    <div className="info-value">{user.dateOfBirth}</div>
                  </div>
                </div>
              )}

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <div className="info-label">Email</div>
                  <div className="info-value">{user.email || 'info@smartcarrental.com'}</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <div className="info-label">Phone</div>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  ) : (
                    <div className="info-value">{user.phone || 'Not provided'}</div>
                  )}
                </div>
              </div>


            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="action-btn edit-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className="action-btn logout-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="action-btn edit-btn" onClick={handleEdit}>
                    <FaEdit /> Edit Profile
                  </button>
                  <button className="action-btn logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="profile-card">
            <h3><FaCar /> Booking Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">12</div>
                <div className="stat-label">Total Bookings</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">4.8</div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">2</div>
                <div className="stat-label">Active Bookings</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;