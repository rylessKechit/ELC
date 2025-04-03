import { useState, useEffect } from 'react';

const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const loadScript = () => {
      if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => setLoadError(new Error('Failed to load Google Maps API'));
      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      // Cleanup if component unmounts before script loads
      const script = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return { isLoaded, loadError };
};

export default useGoogleMaps;