import { useState, useEffect } from 'react';
import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import PriceCalculator from './PriceCalculator';
import { useBooking } from '../../context/BookingContext';
import '../../styles/components/BookingForm.css';

const BookingForm = () => {
  const { calculatePrice, priceEstimate, loading, error } = useBooking();
  
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    luggage: 0,
    roundTrip: false,
    returnDate: '',
    returnTime: '',
    pickupAddressPlaceId: '',
    dropoffAddressPlaceId: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [calculationError, setCalculationError] = useState('');
  
  // Valider le formulaire
  const validateForm = () => {
    const errors = {};
    
    if (!formData.pickupAddress) errors.pickupAddress = 'Veuillez indiquer une adresse de départ';
    if (!formData.pickupAddressPlaceId) errors.pickupAddress = 'Veuillez sélectionner une adresse dans les suggestions';
    
    if (!formData.dropoffAddress) errors.dropoffAddress = 'Veuillez indiquer une adresse d\'arrivée';
    if (!formData.dropoffAddressPlaceId) errors.dropoffAddress = 'Veuillez sélectionner une adresse dans les suggestions';
    
    if (!formData.pickupDate) errors.pickupDate = 'Veuillez choisir une date';
    if (!formData.pickupTime) errors.pickupTime = 'Veuillez choisir une heure';
    
    // Validation pour l'aller-retour
    if (formData.roundTrip) {
      if (!formData.returnDate) errors.returnDate = 'Veuillez choisir une date de retour';
      if (!formData.returnTime) errors.returnTime = 'Veuillez choisir une heure de retour';
      
      // Vérifier que la date de retour est après la date de départ
      if (formData.returnDate && formData.returnTime && formData.pickupDate && formData.pickupTime) {
        const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
        const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`);
        
        if (returnDateTime <= pickupDateTime) {
          errors.returnDate = 'La date de retour doit être après la date de départ';
        }
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur correspondante si le champ est rempli
    if (value && formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Réinitialiser le calculateur de prix si un champ important change
    if (['pickupAddress', 'dropoffAddress', 'pickupDate', 'pickupTime', 'passengers', 'luggage', 'roundTrip'].includes(name)) {
      setCalculationError('');
    }
  };
  
  const handleAddressSelect = (name, address, placeId) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: address,
      [`${name}PlaceId`]: placeId
    }));
    
    // Effacer l'erreur correspondante
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Gérer l'activation/désactivation de l'option aller-retour
  useEffect(() => {
    if (!formData.roundTrip) {
      // Réinitialiser les champs de retour si l'option est désactivée
      setFormData(prev => ({
        ...prev,
        returnDate: '',
        returnTime: ''
      }));
      
      // Supprimer les erreurs liées au retour
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.returnDate;
        delete newErrors.returnTime;
        return newErrors;
      });
    } else if (formData.pickupDate && !formData.returnDate) {
      // Si l'option est activée et aucune date de retour n'est définie, utiliser la date de départ + 1 jour
      const pickupDate = new Date(formData.pickupDate);
      pickupDate.setDate(pickupDate.getDate() + 1);
      
      const returnDate = pickupDate.toISOString().split('T')[0];
      
      setFormData(prev => ({
        ...prev,
        returnDate,
        returnTime: prev.pickupTime // Même heure par défaut
      }));
    }
  }, [formData.roundTrip, formData.pickupDate]);
  
  const calculateTotalPrice = async () => {
    if (!validateForm()) return;
    
    setCalculationError('');
    
    try {
      const bookingData = {
        pickupPlaceId: formData.pickupAddressPlaceId,
        dropoffPlaceId: formData.dropoffAddressPlaceId,
        pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        roundTrip: formData.roundTrip,
      };
      
      if (formData.roundTrip && formData.returnDate && formData.returnTime) {
        bookingData.returnDateTime = `${formData.returnDate}T${formData.returnTime}`;
      }
      
      await calculatePrice(bookingData);
    } catch (err) {
      setCalculationError(err.message || 'Erreur lors du calcul du prix');
    }
  };
  
  return (
    <div className="booking-form-container">
      <h2>Réserver une course</h2>
      
      <div className="booking-form">
        <div className="form-group">
          <AddressInput 
            id="pickupAddress"
            label="Adresse de départ *"
            value={formData.pickupAddress}
            onChange={(value) => handleInputChange('pickupAddress', value)}
            onSelect={(address, placeId) => handleAddressSelect('pickupAddress', address, placeId)}
            placeholder="Entrez l'adresse de départ"
            error={formErrors.pickupAddress}
          />
        </div>
        
        <div className="form-group">
          <AddressInput 
            id="dropoffAddress"
            label="Adresse d'arrivée *"
            value={formData.dropoffAddress}
            onChange={(value) => handleInputChange('dropoffAddress', value)}
            onSelect={(address, placeId) => handleAddressSelect('dropoffAddress', address, placeId)}
            placeholder="Entrez l'adresse d'arrivée"
            error={formErrors.dropoffAddress}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <DateTimePicker 
              dateId="pickupDate"
              timeId="pickupTime"
              dateLabel="Date et heure de départ *"
              dateValue={formData.pickupDate}
              timeValue={formData.pickupTime}
              onDateChange={(value) => handleInputChange('pickupDate', value)}
              onTimeChange={(value) => handleInputChange('pickupTime', value)}
              dateError={formErrors.pickupDate}
              timeError={formErrors.pickupTime}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="passengers">Nombre de passagers *</label>
            <select 
              id="passengers" 
              value={formData.passengers}
              onChange={(e) => handleInputChange('passengers', e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="luggage">Nombre de bagages</label>
            <select 
              id="luggage" 
              value={formData.luggage}
              onChange={(e) => handleInputChange('luggage', e.target.value)}
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
              onChange={(e) => handleInputChange('roundTrip', e.target.checked)}
            />
            <span>Aller-retour</span>
          </label>
        </div>
        
        {formData.roundTrip && (
          <div className="form-row return-trip-row">
            <div className="form-group">
              <DateTimePicker 
                dateId="returnDate"
                timeId="returnTime"
                dateLabel="Date et heure de retour *"
                dateValue={formData.returnDate}
                timeValue={formData.returnTime}
                onDateChange={(value) => handleInputChange('returnDate', value)}
                onTimeChange={(value) => handleInputChange('returnTime', value)}
                dateError={formErrors.returnDate}
                timeError={formErrors.returnTime}
              />
            </div>
          </div>
        )}
        
        {(calculationError || error) && (
          <div className="error-message">
            {calculationError || error}
          </div>
        )}
        
        <button 
          className="calculate-button"
          onClick={calculateTotalPrice}
          disabled={loading}
        >
          {loading ? 'Calcul en cours...' : 'Calculer le prix'}
        </button>
      </div>
      
      {priceEstimate && (
        <PriceCalculator 
          estimate={priceEstimate} 
          bookingData={formData}
        />
      )}
    </div>
  );
};

export default BookingForm;