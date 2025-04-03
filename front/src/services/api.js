import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
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

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., logout user, redirect to login)
      localStorage.removeItem('token');
      // Redirect logic would go here
    }
    return Promise.reject(error);
  }
);

// API service functions
export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id, data) => api.delete(`/bookings/${id}`, { data }),
};

export const priceService = {
  calculateEstimate: (routeData) => api.post('/price/estimate', routeData),
};

export const contactService = {
  sendMessage: (messageData) => api.post('/contact', messageData),
};

export const authService = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

export default api;