import { useState, useEffect, useRef } from 'react';
import '../../styles/components/AddressInput.css';

const AddressInput = ({ id, value, onChange, onSelect, placeholder }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  
  useEffect(() => {
    if (!window.google) {
      // Load Google Maps script if not already loaded
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initAutocomplete();
    }
  }, []);
  
  const initAutocomplete = () => {
    if (window.google && window.google.maps && inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'fr' },
        fields: ['address_components', 'formatted_address', 'place_id', 'geometry']
      });
      
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    }
  };
  
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    
    if (!place.geometry) {
      return;
    }
    
    const address = place.formatted_address;
    onChange(address);
    onSelect(address, place.place_id);
  };
  
  return (
    <div className="address-input">
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="address-field"
      />
    </div>
  );
};

export default AddressInput;