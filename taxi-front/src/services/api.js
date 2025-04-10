import axios from 'axios';

// Création d'une instance axios avec la bonne URL de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur de requête pour ajouter le token d'authentification
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

// Intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Gestion des erreurs d'authentification
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Redirection vers la page de connexion
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Services API
export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  getAllBookings: (params) => api.get('/bookings', { params }),
  updateBookingStatus: (id, data) => api.put(`/bookings/${id}`, data),
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