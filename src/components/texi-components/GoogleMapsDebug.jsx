import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const GoogleMapsDebug = () => {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkGoogleMaps = () => {
      const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      setApiKey(key || 'Not set');

      if (window.google && window.google.maps) {
        setApiStatus('✅ Google Maps API is loaded');
        setError(null);
      } else {
        setApiStatus('❌ Google Maps API is not loaded');
        setError('Google Maps API is not available. Check your API key and internet connection.');
      }
    };

    // Check immediately
    checkGoogleMaps();

    // Check again after a delay to catch async loading
    const timer = setTimeout(checkGoogleMaps, 2000);
    return () => clearTimeout(timer);
  }, []);

  const testMapLoad = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=testCallback`;
    script.async = true;
    script.defer = true;
    
    window.testCallback = () => {
      setApiStatus('✅ Google Maps API loaded successfully');
      setError(null);
    };
    
    script.onerror = (error) => {
      setApiStatus('❌ Failed to load Google Maps API');
      setError('Failed to load Google Maps API. Check your API key and network connection.');
    };
    
    document.head.appendChild(script);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Google Maps API Debug
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          <strong>API Key:</strong> {apiKey}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Status:</strong> {apiStatus}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={testMapLoad}
          disabled={!process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          Test Map Load
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary">
        <strong>Setup Instructions:</strong><br/>
        1. Get a Google Maps API key from Google Cloud Console<br/>
        2. Enable Places API, Geocoding API, and Maps JavaScript API<br/>
        3. Create a .env file in the frontend directory<br/>
        4. Add: REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here<br/>
        5. Restart your development server
      </Typography>
    </Paper>
  );
};

export default GoogleMapsDebug;

