import React, { useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { FaCog } from 'react-icons/fa';
import './Css/settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    smsAlerts: true,
    language: 'English',
    currency: 'INR',
    autoLogout: '30'
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <Header />
      
      <div className="settings-container">
        <div className="settings-header">
          <h1 className="settings-title"><FaCog style={{ marginRight: '0.5rem' }} /> Settings</h1>
          <p className="settings-subtitle">Manage your account preferences and app settings</p>
        </div>

        <div className="settings-content">
          <div className="settings-card">
            <h3>Notifications</h3>
            
            <div className="setting-item">
              <div className="setting-label">
                <strong>Push Notifications</strong>
                <span>Receive booking updates and offers</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <strong>Email Alerts</strong>
                <span>Get booking confirmations via email</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.emailAlerts}
                  onChange={() => handleToggle('emailAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <strong>SMS Alerts</strong>
                <span>Receive SMS for important updates</span>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.smsAlerts}
                  onChange={() => handleToggle('smsAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-card">
            <h3>Preferences</h3>
            
            <div className="setting-item">
              <div className="setting-label">
                <strong>Language</strong>
                <span>Choose your preferred language</span>
              </div>
              <select 
                className="settings-select"
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-label">
                <strong>Currency</strong>
                <span>Display prices in your currency</span>
              </div>
              <select 
                className="settings-select"
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>

          <div className="settings-card">
            <h3>Security</h3>
            
            <div className="setting-item">
              <div className="setting-label">
                <strong>Auto Logout</strong>
                <span>Automatically logout after inactivity</span>
              </div>
              <select 
                className="settings-select"
                value={settings.autoLogout}
                onChange={(e) => handleChange('autoLogout', e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>

          <button className="save-button" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;