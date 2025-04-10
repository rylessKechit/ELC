import { createContext, useState, useContext } from 'react';
import { bookingService, priceService } from '../services/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Calculer une estimation de prix
  const calculatePrice = async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await priceService.calculateEstimate(bookingData);
      const estimate = response.data.data;
      setPriceEstimate(estimate);
      return estimate;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors du calcul du prix';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Créer une réservation
  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    setBookingSuccess(false);
    
    try {
      const response = await bookingService.createBooking(bookingData);
      const newBooking = response.data.data;
      setCurrentBooking(newBooking);
      setBookingSuccess(true);
      return newBooking;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors de la réservation';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer une réservation par ID
  const getBookingById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getBookingById(id);
      const booking = response.data.data;
      setCurrentBooking(booking);
      return booking;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors de la récupération de la réservation';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer toutes les réservations (pour l'admin)
  const getAllBookings = async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getAllBookings(params);
      const bookingList = response.data.data;
      setBookings(bookingList);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors de la récupération des réservations';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le statut d'une réservation
  const updateBookingStatus = async (id, statusData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.updateBookingStatus(id, statusData);
      const updatedBooking = response.data.data;
      
      // Mettre à jour la réservation actuelle si c'est celle qui a été modifiée
      if (currentBooking && currentBooking._id === id) {
        setCurrentBooking(updatedBooking);
      }
      
      // Mettre à jour la liste des réservations si elle existe
      if (bookings.length > 0) {
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === id ? updatedBooking : booking
          )
        );
      }
      
      return updatedBooking;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Une erreur est survenue lors de la mise à jour de la réservation';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Annuler une réservation
  const cancelBooking = async (id, data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.cancelBooking(id, data);
      
      // Mettre à jour la réservation actuelle si c'est celle qui a été annulée
      if (currentBooking && currentBooking._id === id) {
        setCurrentBooking(null);
      }
      
      // Mettre à jour la liste des réservations si elle existe
      if (bookings.length > 0) {
        setBookings(prevBookings => 
          prevBookings.filter(booking => booking._id !== id)
        );
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Une erreur est survenue lors de l'annulation";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Réinitialiser l'état
  const resetBookingState = () => {
    setCurrentBooking(null);
    setPriceEstimate(null);
    setError(null);
    setBookingSuccess(false);
  };

  const values = {
    currentBooking,
    bookings,
    priceEstimate,
    loading,
    error,
    bookingSuccess,
    calculatePrice,
    createBooking,
    getBookingById,
    getAllBookings,
    updateBookingStatus,
    cancelBooking,
    resetBookingState,
  };

  return (
    <BookingContext.Provider value={values}>
      {children}
    </BookingContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de réservation
export const useBooking = () => useContext(BookingContext);

export default BookingContext;