import { useState, useEffect } from 'react';
import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import PriceCalculator from './PriceCalculator';
import '../../styles/components/BookingForm.css';
import { priceService } from '../../services/api';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropoffAddress: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    luggage: 0,
    roundTrip: false,
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
    if (['pickupAddress', 'dropoffAddress', 'pickupDate', 'pickupTime', 'passengers', 'luggage', 'roundTrip'].includes(name)) {
      setPriceEstimate(null);
    }
  };
  
  const handleAddressSelect = (name, address, placeId) => {
    console.log(`Address selected for ${name}: ${address}, placeId: ${placeId}`);
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
      console.log("Envoi de la requête au serveur avec les données:", {
        pickupPlaceId: formData.pickupAddressPlaceId,
        dropoffPlaceId: formData.dropoffAddressPlaceId,
        pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        roundTrip: formData.roundTrip,
      });

      // Utiliser priceService pour faire la requête
      const response = await priceService.calculateEstimate({
        pickupPlaceId: formData.pickupAddressPlaceId,
        dropoffPlaceId: formData.dropoffAddressPlaceId,
        pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}`,
        passengers: parseInt(formData.passengers),
        luggage: parseInt(formData.luggage),
        roundTrip: formData.roundTrip,
      });
      
      // Vérifier et structurer la réponse du serveur
      console.log("Réponse du serveur:", response.data);
      
      if (response.data && response.data.success) {
        // Utiliser la structure de données correcte en fonction de la réponse API
        if (response.data.data && response.data.data.estimate) {
          setPriceEstimate(response.data.data.estimate);
        } else {
          console.warn("La réponse du serveur ne contient pas les données d'estimation attendues:", response.data);
          setError("Format de réponse inattendu du serveur.");
        }
      } else {
        setError(response.data?.error || "Erreur lors du calcul du prix.");
      }
    } catch (err) {
      console.error('Erreur lors du calcul du prix:', err);
      
      // Afficher les détails de l'erreur pour faciliter le débogage
      if (err.response) {
        console.error('Réponse du serveur:', err.response.status, err.response.data);
        setError(`Erreur ${err.response.status}: ${err.response.data.error || 'Erreur serveur'}`);
      } else if (err.request) {
        console.error('Pas de réponse reçue:', err.request);
        setError('Pas de réponse du serveur. Vérifiez que le serveur backend est en cours d\'exécution.');
      } else {
        console.error('Erreur de configuration:', err.message);
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setIsCalculating(false);
    }
  };
  
  const submitBooking = () => {
    // Implémentation future pour la soumission de réservation
    alert('Fonctionnalité de réservation à implémenter.');
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
            onChange={e => handleInputChange('passengers', e.target.value)}
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
            onChange={e => handleInputChange('luggage', e.target.value)}
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