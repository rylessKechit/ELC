import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import BookingConfirmation from './BookingConfirmation';
import BookingSuccess from './BookingSuccess';
import '../../styles/components/PriceCalculator.css';

const PriceCalculator = ({ estimate, bookingData, onBack }) => {
  const { error } = useBooking();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  
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
  
  // Vérifier si estimate existe avant d'accéder à ses propriétés
  if (!estimate) {
    return (
      <motion.div 
        className="price-calculator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="price-overview">
          <h3>Estimation de prix</h3>
          <p>Les données d'estimation ne sont pas disponibles.</p>
        </div>
      </motion.div>
    );
  }
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  const formatTime = (seconds) => {
    if (!seconds) return 'Non disponible';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} minutes`;
  };

  // Vérifier la présence des propriétés nécessaires
  const hasDistanceInfo = estimate.distanceInfo && estimate.distanceInfo.text;
  const hasDurationInfo = estimate.durationInfo && estimate.durationInfo.value;
  
  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };
  
  const handleBookingSuccess = (result) => {
    setBookingResult(result);
    setShowBookingForm(false);
  };
  
  const handleBookingCancel = () => {
    setShowBookingForm(false);
  };
  
  // Afficher le formulaire de réservation si l'utilisateur a cliqué sur "Réserver maintenant"
  if (showBookingForm) {
    return (
      <BookingConfirmation 
        bookingData={bookingData}
        priceEstimate={estimate}
        onSuccess={handleBookingSuccess}
        onCancel={handleBookingCancel}
      />
    );
  }
  
  // Afficher le message de succès si la réservation a été confirmée
  if (bookingResult) {
    return (
      <BookingSuccess bookingData={bookingResult.data || bookingResult} />
    );
  }

  return (
    <motion.div 
      className="price-calculator luxury-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="calculator-header">
        <motion.button 
          className="back-button"
          onClick={onBack}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.2 }}
        >
          <i className="fas fa-arrow-left"></i> Modifier
        </motion.button>
      </div>
      
      <motion.div className="price-overview" variants={itemVariants}>
        <h3>Estimation de votre trajet premium</h3>
        
        <div className="journey-details">
          {hasDistanceInfo && (
            <motion.div 
              className="detail-item"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="detail-icon">
                <i className="fas fa-route"></i>
              </div>
              <div className="detail-content">
                <span className="detail-label">Distance</span>
                <span className="detail-value">{estimate.distanceInfo.text}</span>
              </div>
            </motion.div>
          )}
          
          {hasDurationInfo && (
            <motion.div 
              className="detail-item"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="detail-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="detail-content">
                <span className="detail-label">Durée estimée</span>
                <span className="detail-value">{formatTime(estimate.durationInfo.value)}</span>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="price-range"
          variants={itemVariants}
          whileHover={{ 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
            scale: 1.02
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="price-label">Prix estimé:</span>
          <span className="price">
            {formatPrice(estimate.exactPrice)}
          </span>
        </motion.div>
        
        <motion.button 
          className="toggle-breakdown"
          onClick={() => setShowBreakdown(!showBreakdown)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {showBreakdown ? 'Masquer le détail' : 'Voir le détail du prix'}
        </motion.button>
      </motion.div>
      
      <AnimatePresence>
        {showBreakdown && estimate.breakdown && (
          <motion.div 
            className="price-breakdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="breakdown-item">
              <span>Tarif de base</span>
              <span>{formatPrice(estimate.breakdown.baseFare)}</span>
            </div>
            
            {hasDistanceInfo && (
              <div className="breakdown-item">
                <span>Distance ({estimate.distanceInfo.text})</span>
                <span>{formatPrice(estimate.breakdown.distanceCharge)}</span>
              </div>
            )}
            
            {hasDurationInfo && (
              <div className="breakdown-item">
                <span>Durée ({formatTime(estimate.durationInfo.value)})</span>
                <span>{formatPrice(estimate.breakdown.timeCharge)}</span>
              </div>
            )}
            
            {estimate.breakdown.luggageCharge > 0 && (
              <div className="breakdown-item">
                <span>Supplément bagages ({bookingData.luggage})</span>
                <span>{formatPrice(estimate.breakdown.luggageCharge)}</span>
              </div>
            )}
            
            {estimate.breakdown.nightRate && (
              <div className="breakdown-item highlight">
                <span>Tarif de nuit (22h-6h)</span>
                <span>+30%</span>
              </div>
            )}
            
            {estimate.breakdown.weekendRate && (
              <div className="breakdown-item highlight">
                <span>Tarif weekend</span>
                <span>+20%</span>
              </div>
            )}
            
            {estimate.breakdown.roundTripDiscount && (
              <div className="breakdown-item discount">
                <span>Réduction aller-retour</span>
                <span>-10%</span>
              </div>
            )}
            
            <div className="breakdown-total">
              <span>Total</span>
              <span>{formatPrice(estimate.exactPrice)}</span>
            </div>
            
            <p className="estimate-note">
              * Les prix sont estimatifs et peuvent varier en fonction du trafic et d'autres facteurs.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
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
        className="booking-actions"
        variants={itemVariants}
      >
        <motion.button 
          className="book-now-button"
          onClick={handleBookNowClick}
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.5)'
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
        >
          Réserver maintenant
        </motion.button>
        
        <motion.a 
          href={`tel:+33123456789`}
          className="contact-driver-button"
          whileHover={{ 
            scale: 1.03,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
        >
          <i className="fas fa-phone-alt"></i> Appeler le chauffeur
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default PriceCalculator;