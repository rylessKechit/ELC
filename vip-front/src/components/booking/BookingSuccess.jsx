import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/components/BookingSuccess.css';

const BookingSuccess = ({ bookingData }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Formatage de la date et l'heure pour l'affichage
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div 
      className="booking-success luxury-card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="success-icon"
        variants={itemVariants}
      >
        <i className="fas fa-check-circle"></i>
      </motion.div>
      
      <motion.h3 variants={itemVariants}>Votre service VIP est confirmé</motion.h3>
      
      <motion.p 
        className="success-message"
        variants={itemVariants}
      >
        Votre réservation a été enregistrée avec succès. Un email de confirmation vous sera envoyé dans quelques instants.
      </motion.p>
      
      <motion.div 
        className="booking-details"
        variants={itemVariants}
      >
        <h4>Détails de votre service premium</h4>
        
        <div className="detail-group">
          <div className="detail-item">
            <div className="detail-icon">
              <i className="fas fa-ticket-alt"></i>
            </div>
            <div className="detail-content">
              <span className="detail-label">Référence</span>
              <span className="detail-value">{bookingData._id || bookingData.id || 'En attente'}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="detail-content">
              <span className="detail-label">Date et heure</span>
              <span className="detail-value">
                {bookingData.pickupDateTime ? formatDateTime(bookingData.pickupDateTime) : 'Non spécifié'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="detail-group">
          <div className="detail-item">
            <div className="detail-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="detail-content">
              <span className="detail-label">Départ</span>
              <span className="detail-value">{bookingData.pickupAddress?.text || bookingData.pickupAddress || 'Non spécifié'}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon">
              <i className="fas fa-map-pin"></i>
            </div>
            <div className="detail-content">
              <span className="detail-label">Destination</span>
              <span className="detail-value">{bookingData.dropoffAddress?.text || bookingData.dropoffAddress || 'Non spécifié'}</span>
            </div>
          </div>
        </div>
        
        <div className="detail-group service-details">
          <div className="detail-item">
            <div className="detail-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="detail-content">
              <span className="detail-label">Passagers</span>
              <span className="detail-value">{bookingData.passengers || 1}</span>
            </div>
          </div>
          
          {bookingData.luggage > 0 && (
            <div className="detail-item">
              <div className="detail-icon">
                <i className="fas fa-suitcase"></i>
              </div>
              <div className="detail-content">
                <span className="detail-label">Bagages</span>
                <span className="detail-value">{bookingData.luggage}</span>
              </div>
            </div>
          )}
          
          {bookingData.roundTrip && (
            <div className="detail-item">
              <div className="detail-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <div className="detail-content">
                <span className="detail-label">Aller-retour</span>
                <span className="detail-value">Oui</span>
              </div>
            </div>
          )}
        </div>
        
        {bookingData.price && (
          <div className="price-summary">
            <div className="detail-icon">
              <i className="fas fa-tag"></i>
            </div>
            <div className="detail-content">
              <span className="detail-label">Prix total</span>
              <span className="price-value">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: bookingData.price.currency || 'EUR'
                }).format(bookingData.price.amount)}
              </span>
            </div>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="next-steps"
        variants={itemVariants}
      >
        <p>Votre chauffeur personnel vous contactera très prochainement pour confirmer tous les détails de votre prise en charge.</p>
        <p>Notre service client VIP est à votre disposition 24h/24 pour répondre à toutes vos demandes.</p>
      </motion.div>
      
      <motion.div 
        className="success-actions"
        variants={itemVariants}
      >
        <motion.div 
          className="action-group"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="home-button">
            <i className="fas fa-home"></i> Retour à l'accueil
          </Link>
        </motion.div>
        
        <motion.div 
          className="action-group"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <a href="tel:+33123456789" className="contact-button">
            <i className="fas fa-phone-alt"></i> Service client VIP
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BookingSuccess;