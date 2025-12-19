import axios from 'axios';

const API_BASE_URL = 'https://smart-car-rental-portal-server.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Car API calls
export const carAPI = {
  getAllCars: (params) => api.get('/cars', { params }),
  getCarById: (id) => api.get(`/cars/${id}`),
  addCar: (carData) => api.post('/cars', carData),
  updateCar: (id, carData) => api.put(`/cars/${id}`, carData),
  deleteCar: (id) => api.delete(`/cars/${id}`),
  getUserCars: () => api.get('/cars/user/my-cars'),
};

// Booking API calls
export const bookingAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/my-bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  updateBookingStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
  getAllBookings: (params) => api.get('/bookings/admin/all', { params }),
};

export default api;