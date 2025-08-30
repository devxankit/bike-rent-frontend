import { useEffect } from 'react';

const GoogleMapsLoader = () => {
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if already loaded
      if (window.google && window.google.maps) {
        console.log('Google Maps already loaded');
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        console.log('Google Maps script already exists');
        return;
      }

      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('Google Maps API loaded successfully');
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Google Maps API:', error);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleMapsLoader;

