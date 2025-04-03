import { useState } from 'react';
import '../../styles/components/PriceCalculator.css';

const PriceCalculator = ({ estimate, bookingData, onBookNow }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} minutes`;
  };

  return (
    <div className="price-calculator">
      <div className="price-overview">
        <h3>Estimation de prix</h3>
        
        <div className="journey-details">
          <div className="detail-item">
            <i className="fas fa-route"></i>
            <span>{estimate.distanceInfo.text}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-clock"></i>
            <span>{formatTime(estimate.durationInfo.value)}</span>
          </div>
        </div>
        
        <div className="price-range">
          <span className="price-label">Prix estimé:</span>
          <span className="price">
            {formatPrice(estimate.minPrice)} - {formatPrice(estimate.maxPrice)}
          </span>
        </div>
        
        <button 
          className="toggle-breakdown"
          onClick={() => setShowBreakdown(!showBreakdown)}
        >
          {showBreakdown ? 'Masquer le détail' : 'Voir le détail'}
        </button>
      </div>
      
      {showBreakdown && (
        <div className="price-breakdown">
          <div className="breakdown-item">
            <span>Tarif de base</span>
            <span>{formatPrice(estimate.breakdown.baseFare)}</span>
          </div>
          <div className="breakdown-item">
            <span>Distance ({estimate.distanceInfo.text})</span>
            <span>{formatPrice(estimate.breakdown.distanceCharge)}</span>
          </div>
          <div className="breakdown-item">
            <span>Durée ({formatTime(estimate.durationInfo.value)})</span>
            <span>{formatPrice(estimate.breakdown.timeCharge)}</span>
          </div>
          
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
        </div>
      )}
      
      <div className="booking-actions">
        <button className="book-now-button" onClick={onBookNow}>
          Réserver maintenant
        </button>
        <button className="contact-driver-button">
          Contacter le chauffeur
        </button>
      </div>
    </div>
  );
};

export default PriceCalculator;