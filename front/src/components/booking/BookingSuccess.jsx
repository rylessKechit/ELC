import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/BookingSuccess.css';

const BookingSuccess = ({ bookingData }) => {
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
    <div className="booking-success">
      <div className="success-icon">
        <i className="fas fa-check-circle"></i>
      </div>
      
      <h3>Réservation confirmée !</h3>
      
      <p className="success-message">
        Votre réservation a été enregistrée avec succès. Vous recevrez bientôt un email de confirmation.
      </p>
      
      <div className="booking-details">
        <h4>Détails de votre réservation</h4>
        
        <div className="detail-item">
          <span className="detail-label">Référence:</span>
          <span className="detail-value">{bookingData._id || bookingData.id || 'En attente'}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Date et heure:</span>
          <span className="detail-value">
            {bookingData.pickupDateTime ? formatDateTime(bookingData.pickupDateTime) : 'Non spécifié'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Départ:</span>
          <span className="detail-value">{bookingData.pickupAddress?.text || bookingData.pickupAddress || 'Non spécifié'}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Destination:</span>
          <span className="detail-value">{bookingData.dropoffAddress?.text || bookingData.dropoffAddress || 'Non spécifié'}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Passagers:</span>
          <span className="detail-value">{bookingData.passengers || 1}</span>
        </div>
        
        {bookingData.roundTrip && (
          <div className="detail-item">
            <span className="detail-label">Aller-retour:</span>
            <span className="detail-value">Oui</span>
          </div>
        )}
        
        {bookingData.price && (
          <div className="detail-item">
            <span className="detail-label">Prix:</span>
            <span className="detail-value">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: bookingData.price.currency || 'EUR'
              }).format(bookingData.price.amount)}
            </span>
          </div>
        )}
      </div>
      
      <div className="next-steps">
        <p>Un de nos chauffeurs vous contactera bientôt pour confirmer votre réservation.</p>
        <p>Pour toute question, n'hésitez pas à nous contacter au <a href="tel:+33600000000">+33 6 00 00 00 00</a>.</p>
      </div>
      
      <div className="success-actions">
        <Link to="/" className="home-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;