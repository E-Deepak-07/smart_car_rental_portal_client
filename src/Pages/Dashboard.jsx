import React, { useState, useEffect } from 'react';
import { carAPI, bookingAPI } from '../services/api';
import { FaCar, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'cars') {
        const response = await carAPI.getUserCars();
        setCars(response.data.data);
      } else if (activeTab === 'bookings') {
        const response = await bookingAPI.getUserBookings();
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carAPI.deleteCar(carId);
        fetchData();
        alert('Car deleted successfully');
      } catch (error) {
        alert('Error deleting car');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome, {user?.name}
          </h1>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'cars'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => setActiveTab('cars')}
            >
              <FaCar className="inline mr-2" />
              My Cars
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'bookings'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              My Bookings
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'add-car'
                  ? 'bg-yellow-400 text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
              onClick={() => setActiveTab('add-car')}
            >
              <FaPlus className="inline mr-2" />
              Add Car
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <>
              {/* My Cars Tab */}
              {activeTab === 'cars' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Cars ({cars.length})</h2>
                  {cars.length === 0 ? (
                    <div className="text-center py-8">
                      <FaCar className="mx-auto text-6xl text-gray-300 mb-4" />
                      <p className="text-gray-600">No cars added yet</p>
                      <button
                        onClick={() => setActiveTab('add-car')}
                        className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
                      >
                        Add Your First Car
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cars.map((car) => (
                        <div key={car._id} className="bg-gray-50 rounded-lg p-4 border">
                          <img
                            src={car.images[0] || '/placeholder-car.jpg'}
                            alt={car.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h3 className="font-bold text-lg mb-2">{car.title}</h3>
                          <p className="text-gray-600 mb-2">{car.brand} {car.model} ({car.year})</p>
                          <p className="text-yellow-600 font-bold mb-4">₹{car.pricePerDay}/day</p>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600">
                              <FaEye className="inline mr-1" /> View
                            </button>
                            <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600">
                              <FaEdit className="inline mr-1" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car._id)}
                              className="flex-1 bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600"
                            >
                              <FaTrash className="inline mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* My Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Bookings ({bookings.length})</h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No bookings yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking._id} className="bg-gray-50 rounded-lg p-6 border">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{booking.car.title}</h3>
                              <p className="text-gray-600">{booking.car.brand} {booking.car.model}</p>
                              <p className="text-sm text-gray-500 mt-2">
                                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-500">
                                Pickup: {booking.pickupLocation}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-yellow-600">₹{booking.totalAmount}</p>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Add Car Tab */}
              {activeTab === 'add-car' && (
                <AddCarForm onCarAdded={fetchData} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Add Car Form Component
const AddCarForm = ({ onCarAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    category: '',
    transmission: '',
    fuelType: '',
    seats: '',
    pricePerDay: '',
    location: {
      city: '',
      state: '',
      address: ''
    },
    images: [''],
    features: [''],
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await carAPI.addCar(formData);
      alert('Car added successfully!');
      onCarAdded();
      // Reset form
      setFormData({
        title: '',
        brand: '',
        model: '',
        year: '',
        category: '',
        transmission: '',
        fuelType: '',
        seats: '',
        pricePerDay: '',
        location: { city: '', state: '', address: '' },
        images: [''],
        features: [''],
        description: ''
      });
    } catch (error) {
      alert('Error adding car: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            placeholder="Car Title"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.model}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
          <select
            name="category"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Economy">Economy</option>
            <option value="Compact">Compact</option>
            <option value="Mid-size">Mid-size</option>
            <option value="Full-size">Full-size</option>
            <option value="Premium">Premium</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van</option>
          </select>
          <select
            name="transmission"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.transmission}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <select
            name="fuelType"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.fuelType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            min="2"
            max="8"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.seats}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Price per Day (₹)"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location.city"
            placeholder="City"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.location.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="location.state"
            placeholder="State"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={formData.location.state}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <input
          type="text"
          name="location.address"
          placeholder="Full Address"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={formData.location.address}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="url"
          name="images"
          placeholder="Image URL"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={formData.images[0]}
          onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
          required
        />
        
        <textarea
          name="description"
          placeholder="Car Description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-500 transition-colors duration-200"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default Dashboard;