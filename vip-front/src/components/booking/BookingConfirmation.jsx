import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import '../../styles/components/BookingConfirmation.css';

const BookingConfirmation = ({ bookingData, priceEstimate, onSuccess, onCancel }) => {
  const { createBooking, loading, error } = useBooking();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.name) errors.name = 'Veuillez indiquer votre nom';
    if (!customerInfo.email) errors.email = 'Veuillez indiquer votre email';
    if (!customerInfo.phone) errors.phone = 'Veuillez indiquer votre numéro de téléphone';
    
    // Validation email simple
    if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Adresse email invalide';
    }
    
    // Validation téléphone simple (format français)
    if (customerInfo.phone && !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(customerInfo.phone)) {
      errors.phone = 'Numéro de téléphone invalide';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur correspondante si le champ est rempli
    if (value && formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Préparer les données de réservation
      const bookingRequestData = {
        pickupAddress: bookingData.pickupAddress,
        pickupPlaceId: bookingData.pickupAddressPlaceId,
        dropoffAddress: bookingData.dropoffAddress,
        dropoffPlaceId: bookingData.dropoffAddressPlaceId,
        pickupDateTime: `${bookingData.pickupDate}T${bookingData.pickupTime}`,
        passengers: parseInt(bookingData.passengers),
        luggage: parseInt(bookingData.luggage),
        roundTrip: bookingData.roundTrip,
        price: {
          amount: priceEstimate.exactPrice,
          currency: priceEstimate.currency || 'EUR'
        },
        customerInfo
      };
      
      // Si c'est un aller-retour et qu'il y a une date de retour définie
      if (bookingData.roundTrip && bookingData.returnDate && bookingData.returnTime) {
        bookingRequestData.returnDateTime = `${bookingData.returnDate}T${bookingData.returnTime}`;
      }
      
      // Appel à l'API pour créer la réservation
      const result = await createBooking(bookingRequestData);
      
      // Informer le parent du succès
      onSuccess(result);
      
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', err);
      // Les erreurs sont gérées par le contexte
    }
  };
  
  return (
    <motion.div 
      className="booking-confirmation luxury-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants}>Réservation de votre service VIP</motion.h3>
      
      <form onSubmit={handleSubmit}>
        <motion.div className="booking-details" variants={itemVariants}>
          <h4>Détails de votre trajet</h4>
          
          <div className="detail-group">
            <div className="detail-row">
              <div className="detail-label">Départ</div>
              <div className="detail-value">{bookingData.pickupAddress}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Destination</div>
              <div className="detail-value">{bookingData.dropoffAddress}</div>
            </div>
          </div>
          
          <div className="detail-group">
            <div className="detail-row">
              <div className="detail-label">Date et heure</div>
              <div className="detail-value">
                {new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`).toLocaleString('fr-FR', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </div>
            </div>
            
            {bookingData.roundTrip && bookingData.returnDate && bookingData.returnTime && (
              <div className="detail-row">
                <div className="detail-label">Retour</div>
                <div className="detail-value">
                  {new Date(`${bookingData.returnDate}T${bookingData.returnTime}`).toLocaleString('fr-FR', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
              </div>
            )}
          </div>
          
          <div className="detail-group">
            <div className="detail-row">
              <div className="detail-label">Passagers</div>
              <div className="detail-value">{bookingData.passengers}</div>
            </div>
            
            {bookingData.luggage > 0 && (
              <div className="detail-row">
                <div className="detail-label">Bagages</div>
                <div className="detail-value">{bookingData.luggage}</div>
              </div>
            )}
          </div>
          
          <div className="detail-row price-row">
            <div className="detail-label">Prix estimé</div>
            <div className="detail-value price-value">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: priceEstimate.currency || 'EUR'
              }).format(priceEstimate.exactPrice)}
            </div>
          </div>
        </motion.div>
        
        <motion.div className="customer-info-form" variants={itemVariants}>
          <h4>Vos informations personnelles</h4>
          
          <div className="form-group">
            <label htmlFor="name">Nom complet *</label>
            <motion.input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              placeholder="Entrez votre nom"
              className={formErrors.name ? 'error' : ''}
              whileFocus={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
              required
            />
            {formErrors.name && (
              <motion.div 
                className="input-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formErrors.name}
              </motion.div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <motion.input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="Entrez votre email"
              className={formErrors.email ? 'error' : ''}
              whileFocus={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
              required
            />
            {formErrors.email && (
              <motion.div 
                className="input-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formErrors.email}
              </motion.div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Téléphone *</label>
            <motion.input
              type="tel"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="Entrez votre numéro de téléphone"
              className={formErrors.phone ? 'error' : ''}
              whileFocus={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
              required
            />
            {formErrors.phone && (
              <motion.div 
                className="input-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formErrors.phone}
              </motion.div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="specialRequests">Demandes spéciales</label>
            <motion.textarea
              id="specialRequests"
              name="specialRequests"
              value={customerInfo.specialRequests}
              onChange={handleInputChange}
              placeholder="Informations complémentaires pour votre confort"
              rows="3"
              whileFocus={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
            ></motion.textarea>
          </div>
        </motion.div>
        
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        
        <motion.div 
          className="confirmation-actions"
          variants={itemVariants}
        >
          <motion.button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Retour
          </motion.button>
          
          <motion.button 
            type="submit" 
            className="confirm-button"
            disabled={loading}
            whileHover={{ 
              scale: loading ? 1 : 1.03,
              boxShadow: loading ? 'none' : '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.5)'
            }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <span className="loading-text">
                <i className="fas fa-spinner fa-spin"></i> Traitement en cours...
              </span>
            ) : (
              'Confirmer ma réservation'
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default BookingConfirmation;