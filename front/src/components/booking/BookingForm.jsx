import { useState, useEffect } from 'react';
import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import '../../styles/components/BookingForm.css';
import { priceService } from '../../services/api';

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 2,
    luggage: 1,
    vehicleType: 'sedan',
    roundTrip: false,
    returnDate: '',
    returnTime: '',
    pickupAddressPlaceId: '',
    dropoffAddressPlaceId: '',
  });
  
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  // Initialiser les champs de date et heure
  useEffect(() => {
    // Date de demain
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = formatDate(tomorrow);
    
    // Heure actuelle + 2 heures
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 2);
    const formattedTime = formatTime(defaultTime);
    
    setFormData(prev => ({
      ...prev,
      pickupDate: formattedDate,
      pickupTime: formattedTime
    }));
  }, []);
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset price estimate when inputs change
    if (['pickupAddress', 'dropoffAddress', 'pickupDate', 'pickupTime', 'passengers', 'luggage', 'vehicleType', 'roundTrip'].includes(name)) {
      setPriceEstimate(null);
    }
    
    // If roundTrip is toggled to false, clear return date/time
    if (name === 'roundTrip' && value === false) {
      setFormData(prev => ({ ...prev, returnDate: '', returnTime: '' }));
    }
    
    // If roundTrip is toggled to true, set default return date/time
    if (name === 'roundTrip' && value === true && !formData.returnDate) {
      // Default return date is pickup date + 3 days
      const returnDate = new Date(formData.pickupDate);
      returnDate.setDate(returnDate.getDate() + 3);
      
      setFormData(prev => ({ 
        ...prev, 
        returnDate: formatDate(returnDate),
        returnTime: formData.pickupTime
      }));
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
    // Validation du formulaire
    if (!formData.pickupAddress || !formData.dropoffAddress || !formData.pickupDate || !formData.pickupTime) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!formData.pickupAddressPlaceId || !formData.dropoffAddressPlaceId) {
      setError('Veuillez sélectionner des adresses valides dans les suggestions');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    try {
      // Utiliser priceService pour faire la requête
      const response = await priceService.calculateEstimate({
        pickupPlaceId: formData.pickupAddressPlaceId,
        dropoffPlaceId: formData.dropoffAddressPlaceId,
        pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        vehicleType: formData.vehicleType,
        roundTrip: formData.roundTrip,
        returnDateTime: formData.roundTrip && formData.returnDate ? `${formData.returnDate}T${formData.returnTime}` : null
      });
      
      if (response.data && response.data.success) {
        if (response.data.data && response.data.data.estimate) {
          setPriceEstimate(response.data.data.estimate);
          setCurrentStep(2); // Avancer à l'étape 2 après le calcul
        } else {
          console.warn("La réponse du serveur ne contient pas les données d'estimation attendues:", response.data);
          setError("Format de réponse inattendu du serveur.");
        }
      } else {
        setError(response.data?.error || "Erreur lors du calcul du prix.");
      }
    } catch (err) {
      console.error('Erreur lors du calcul du prix:', err);
      
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data.error || 'Erreur serveur'}`);
      } else if (err.request) {
        setError('Pas de réponse du serveur. Vérifiez que le serveur backend est en cours d\'exécution.');
      } else {
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setIsCalculating(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      calculatePrice();
    } else {
      // Logique pour l'étape 2 (confirmation de réservation)
      // Implement your booking confirmation logic here
      console.log("Réservation confirmée avec les données:", formData);
      alert("Votre réservation a été enregistrée avec succès. Nous vous contacterons sous peu pour confirmer les détails.");
    }
  };
  
  const goBack = () => {
    setCurrentStep(1);
  };
  
  const vehicleOptions = [
    { id: 'sedan', name: 'Berline de Luxe', desc: 'Mercedes Classe E ou similaire', capacity: 'Jusqu\'à 3 passagers' },
    { id: 'premium', name: 'Berline Premium', desc: 'Mercedes Classe S ou similaire', capacity: 'Jusqu\'à 3 passagers' },
    { id: 'suv', name: 'SUV de Luxe', desc: 'BMW X5 ou similaire', capacity: 'Jusqu\'à 5 passagers' },
    { id: 'van', name: 'Van VIP', desc: 'Mercedes Classe V ou similaire', capacity: 'Jusqu\'à 7 passagers' }
  ];
  
  // Formater le prix pour l'affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  return (
    <div className="booking-form-container">
      <div className="booking-form-header">
        <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Détails du trajet</span>
        </div>
        <div className="step-line"></div>
        <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Confirmation</span>
        </div>
      </div>

      {error && <div className="booking-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className="booking-step">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pickupAddress">Adresse de départ <span className="required">*</span></label>
                <AddressInput 
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={value => handleInputChange('pickupAddress', value)}
                  onSelect={(address, placeId) => handleAddressSelect('pickupAddress', address, placeId)}
                  placeholder="Entrez l'adresse de départ"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dropoffAddress">Adresse d'arrivée <span className="required">*</span></label>
                <AddressInput 
                  id="dropoffAddress"
                  value={formData.dropoffAddress}
                  onChange={value => handleInputChange('dropoffAddress', value)}
                  onSelect={(address, placeId) => handleAddressSelect('dropoffAddress', address, placeId)}
                  placeholder="Entrez l'adresse d'arrivée"
                />
              </div>
            </div>
            
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="pickupDate">Date et heure de départ <span className="required">*</span></label>
                <DateTimePicker 
                  dateId="pickupDate"
                  timeId="pickupTime"
                  dateValue={formData.pickupDate}
                  timeValue={formData.pickupTime}
                  onDateChange={value => handleInputChange('pickupDate', value)}
                  onTimeChange={value => handleInputChange('pickupTime', value)}
                />
              </div>
              
              <div className="form-group checkbox-group">
                <div className="switch-container">
                  <label className="switch">
                    <input 
                      type="checkbox"
                      checked={formData.roundTrip}
                      onChange={e => handleInputChange('roundTrip', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                  <span className="switch-label">Aller-retour</span>
                </div>
                
                {formData.roundTrip && (
                  <div className="return-datetime">
                    <label htmlFor="returnDate">Date et heure de retour <span className="required">*</span></label>
                    <DateTimePicker 
                      dateId="returnDate"
                      timeId="returnTime"
                      dateValue={formData.returnDate}
                      timeValue={formData.returnTime}
                      onDateChange={value => handleInputChange('returnDate', value)}
                      onTimeChange={value => handleInputChange('returnTime', value)}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="passengers">Nombre de passagers <span className="required">*</span></label>
                <div className="counter-input">
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.passengers > 1 && handleInputChange('passengers', formData.passengers - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="counter-value">{formData.passengers}</span>
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.passengers < 7 && handleInputChange('passengers', formData.passengers + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="luggage">Nombre de bagages <span className="required">*</span></label>
                <div className="counter-input">
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.luggage > 0 && handleInputChange('luggage', formData.luggage - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="counter-value">{formData.luggage}</span>
                  <button 
                    type="button" 
                    className="counter-btn"
                    onClick={() => formData.luggage < 10 && handleInputChange('luggage', formData.luggage + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Sélectionnez votre véhicule <span className="required">*</span></label>
                <div className="vehicle-options">
                  {vehicleOptions.map(vehicle => (
                    <div 
                      key={vehicle.id}
                      className={`vehicle-option ${formData.vehicleType === vehicle.id ? 'selected' : ''}`}
                      onClick={() => handleInputChange('vehicleType', vehicle.id)}
                    >
                      <div className="vehicle-icon">
                        <i className={`fas fa-${vehicle.id === 'van' ? 'shuttle-van' : 'car'}`}></i>
                      </div>
                      <div className="vehicle-info">
                        <h4>{vehicle.name}</h4>
                        <p>{vehicle.desc}</p>
                        <span className="vehicle-capacity">
                          <i className="fas fa-users"></i> {vehicle.capacity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <span className="spinner"></span>
                    Calcul en cours...
                  </>
                ) : 'Calculer le prix'}
              </button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && priceEstimate && (
          <div className="booking-step confirmation-step">
            <div className="booking-summary">
              <h3>Résumé de votre réservation</h3>
              
              <div className="summary-row">
                <div className="summary-item">
                  <span className="summary-label">Départ</span>
                  <div className="summary-value">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{formData.pickupAddress}</span>
                  </div>
                </div>
                
                <div className="summary-item">
                  <span className="summary-label">Arrivée</span>
                  <div className="summary-value">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{formData.dropoffAddress}</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-row">
                <div className="summary-item">
                  <span className="summary-label">Date et heure</span>
                  <div className="summary-value">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{new Date(`${formData.pickupDate}T${formData.pickupTime}`).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
                
                <div className="summary-item">
                  <span className="summary-label">Véhicule</span>
                  <div className="summary-value">
                    <i className={`fas fa-${formData.vehicleType === 'van' ? 'shuttle-van' : 'car'}`}></i>
                    <span>{vehicleOptions.find(v => v.id === formData.vehicleType)?.name}</span>
                  </div>
                </div>
              </div>
              
              {formData.roundTrip && (
                <div className="summary-row">
                  <div className="summary-item">
                    <span className="summary-label">Retour</span>
                    <div className="summary-value">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{new Date(`${formData.returnDate}T${formData.returnTime}`).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="price-details">
                <div className="price-row">
                  <span>Prix de base</span>
                  <span>{formatPrice(priceEstimate.breakdown?.baseFare + priceEstimate.breakdown?.distanceCharge || 0)}</span>
                </div>
                
                <div className="price-row">
                  <span>Service et taxes</span>
                  <span>{formatPrice(priceEstimate.breakdown?.timeCharge || 0)}</span>
                </div>
                
                {priceEstimate.breakdown?.luggageCharge > 0 && (
                  <div className="price-row">
                    <span>Supplément bagages ({formData.luggage})</span>
                    <span>{formatPrice(priceEstimate.breakdown.luggageCharge)}</span>
                  </div>
                )}
                
                {formData.roundTrip && (
                  <div className="price-row discount">
                    <span>Réduction aller-retour</span>
                    <span>-10%</span>
                  </div>
                )}
                
                <div className="price-row total">
                  <span>Prix total</span>
                  <span>{formatPrice(priceEstimate.exactPrice)}</span>
                </div>
              </div>
            </div>
            
            <div className="booking-actions">
              <button 
                type="button" 
                className="btn-back"
                onClick={goBack}
              >
                <i className="fas fa-arrow-left"></i>
                Retour
              </button>
              
              <button 
                type="submit" 
                className="btn-submit"
              >
                Confirmer la réservation
                <i className="fas fa-check"></i>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;