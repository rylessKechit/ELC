import { useState, useEffect } from 'react';
import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import PriceCalculator from './PriceCalculator';
import '../../styles/components/BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    luggage: 0,
    roundTrip: false,
  });
  
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Reset price estimate when inputs change
    if (['pickupAddress', 'dropoffAddress'].includes(name)) {
      setPriceEstimate(null);
    }
  };
  
  const handleAddressSelect = (name, address, placeId) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: address,
      [`${name}PlaceId`]: placeId
    }));
    setPriceEstimate(null);
  };
  
  const calculatePrice = async () => {
    // Validate form
    if (!formData.pickupAddress || !formData.dropoffAddress || !formData.pickupDate || !formData.pickupTime) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    try {
      // Call to backend API to calculate price
      const response = await fetch('/api/price/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupPlaceId: formData.pickupAddressPlaceId,
          dropoffPlaceId: formData.dropoffAddressPlaceId,
          pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
          passengers: formData.passengers,
          luggage: formData.luggage,
          roundTrip: formData.roundTrip,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to calculate price');
      }
      
      const data = await response.json();
      setPriceEstimate(data);
    } catch (err) {
      setError('Une erreur est survenue lors du calcul du prix');
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };
  
  const submitBooking = async () => {
    // Implementation for booking submission
    // Will be connected to the backend
  };
  
  return (
    <div className="booking-form-container">
      <h2>Simulateur de course</h2>
      
      <div className="form-group">
        <label htmlFor="pickupAddress">Adresse de départ *</label>
        <AddressInput 
          id="pickupAddress"
          value={formData.pickupAddress}
          onChange={value => handleInputChange('pickupAddress', value)}
          onSelect={(address, placeId) => handleAddressSelect('pickupAddress', address, placeId)}
          placeholder="Entrez l'adresse de départ"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="dropoffAddress">Adresse d'arrivée *</label>
        <AddressInput 
          id="dropoffAddress"
          value={formData.dropoffAddress}
          onChange={value => handleInputChange('dropoffAddress', value)}
          onSelect={(address, placeId) => handleAddressSelect('dropoffAddress', address, placeId)}
          placeholder="Entrez l'adresse d'arrivée"
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pickupDate">Date et heure de départ *</label>
          <DateTimePicker 
            dateId="pickupDate"
            timeId="pickupTime"
            dateValue={formData.pickupDate}
            timeValue={formData.pickupTime}
            onDateChange={value => handleInputChange('pickupDate', value)}
            onTimeChange={value => handleInputChange('pickupTime', value)}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="passengers">Nombre de passagers *</label>
          <select 
            id="passengers" 
            value={formData.passengers}
            onChange={e => handleInputChange('passengers', parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="luggage">Nombre de bagages *</label>
          <select 
            id="luggage" 
            value={formData.luggage}
            onChange={e => handleInputChange('luggage', parseInt(e.target.value))}
          >
            {[0, 1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group checkbox">
        <label>
          <input 
            type="checkbox"
            checked={formData.roundTrip}
            onChange={e => handleInputChange('roundTrip', e.target.checked)}
          />
          Aller-retour ?
        </label>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        className="calculate-button"
        onClick={calculatePrice}
        disabled={isCalculating}
      >
        {isCalculating ? 'Calcul en cours...' : 'Calculer le prix'}
      </button>
      
      {priceEstimate && (
        <PriceCalculator 
          estimate={priceEstimate} 
          bookingData={formData}
          onBookNow={submitBooking}
        />
      )}
    </div>
  );
};

export default BookingForm;