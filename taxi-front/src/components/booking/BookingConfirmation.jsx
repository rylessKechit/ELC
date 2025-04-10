import { useState } from 'react';
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
    <div className="booking-confirmation">
      <h3>Finaliser votre réservation</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="booking-details">
          <h4>Détails de votre trajet</h4>
          
          <div className="detail-row">
            <div className="detail-label">Départ</div>
            <div className="detail-value">{bookingData.pickupAddress}</div>
          </div>
          
          <div className="detail-row">
            <div className="detail-label">Destination</div>
            <div className="detail-value">{bookingData.dropoffAddress}</div>
          </div>
          
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
          
          <div className="detail-row price-row">
            <div className="detail-label">Prix estimé</div>
            <div className="detail-value">
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: priceEstimate.currency || 'EUR'
              }).format(priceEstimate.exactPrice)}
            </div>
          </div>
        </div>
        
        <div className="customer-info-form">
          <h4>Vos coordonnées</h4>
          
          <div className="form-group">
            <label htmlFor="name">Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              placeholder="Entrez votre nom"
              className={formErrors.name ? 'error' : ''}
              required
            />
            {formErrors.name && <div className="input-error">{formErrors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="Entrez votre email"
              className={formErrors.email ? 'error' : ''}
              required
            />
            {formErrors.email && <div className="input-error">{formErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Téléphone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="Entrez votre numéro de téléphone"
              className={formErrors.phone ? 'error' : ''}
              required
            />
            {formErrors.phone && <div className="input-error">{formErrors.phone}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="specialRequests">Demandes spéciales</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={customerInfo.specialRequests}
              onChange={handleInputChange}
              placeholder="Informations complémentaires (optionnel)"
              rows="3"
            ></textarea>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="confirmation-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
          >
            Retour
          </button>
          
          <button 
            type="submit" 
            className="confirm-button"
            disabled={loading}
          >
            {loading ? 'Traitement en cours...' : 'Confirmer la réservation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingConfirmation;