import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const GoogleMapsAutocomplete = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  iconColor = '#8BC34A',
  onPlaceSelect 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const suggestionsRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Google Maps API configuration
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log('Google Maps API already available');
        setIsGoogleMapsLoaded(true);
        return Promise.resolve();
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        console.log('Google Maps script already exists, waiting for load...');
        return new Promise((resolve) => {
          const checkGoogleMaps = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
              console.log('Google Maps API loaded from existing script');
              setIsGoogleMapsLoaded(true);
              resolve();
            } else {
              setTimeout(checkGoogleMaps, 100);
            }
          };
          checkGoogleMaps();
        });
      }

      // Load Google Maps API
      console.log('Loading Google Maps API...');
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        
        // Global callback function
        window.initGoogleMaps = () => {
          console.log('Google Maps API loaded successfully via callback');
          setIsGoogleMapsLoaded(true);
          resolve();
        };
        
        script.onerror = (error) => {
          console.error('Error loading Google Maps API:', error);
          setIsGoogleMapsLoaded(false);
          reject(error);
        };
        
        document.head.appendChild(script);
      });
    };

    loadGoogleMapsAPI().catch(error => {
      console.error('Error loading Google Maps API:', error);
      setIsGoogleMapsLoaded(false);
    });
  }, [GOOGLE_MAPS_API_KEY]);

  // Initialize autocomplete when Google Maps is loaded
  useEffect(() => {
    if (window.google && window.google.maps && inputRef.current && !autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'in' }
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChange(place.formatted_address);
          setShowSuggestions(false);
          if (onPlaceSelect) {
            onPlaceSelect({
              place_id: place.place_id,
              description: place.formatted_address,
              main_text: place.name || place.formatted_address,
              secondary_text: place.formatted_address,
              geometry: place.geometry
            });
          }
        }
      });

      autocompleteRef.current = autocomplete;
    }
  }, [onChange, onPlaceSelect]);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Search function using Google Places API
  const searchPlaces = (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    if (!window.google || !window.google.maps || !window.google.maps.places) {
      // Fallback to mock data if Google Maps API is not loaded
      const mockSuggestions = [
        { place_id: '1', description: 'Connaught Place, New Delhi, Delhi, India', main_text: 'Connaught Place', secondary_text: 'New Delhi, Delhi, India' },
        { place_id: '2', description: 'India Gate, New Delhi, Delhi, India', main_text: 'India Gate', secondary_text: 'New Delhi, Delhi, India' },
        { place_id: '3', description: 'Red Fort, Old Delhi, Delhi, India', main_text: 'Red Fort', secondary_text: 'Old Delhi, Delhi, India' },
        { place_id: '4', description: 'Indira Gandhi International Airport, New Delhi, Delhi, India', main_text: 'Indira Gandhi International Airport', secondary_text: 'New Delhi, Delhi, India' },
        { place_id: '5', description: 'New Delhi Railway Station, New Delhi, Delhi, India', main_text: 'New Delhi Railway Station', secondary_text: 'New Delhi, Delhi, India' }
      ];

      setIsLoading(true);
      setTimeout(() => {
        const filteredSuggestions = mockSuggestions.filter(suggestion =>
          suggestion.description.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.main_text.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5));
        setIsLoading(false);
      }, 200);
      return;
    }

    setIsLoading(true);
    
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({
      input: query,
      types: ['geocode'],
      componentRestrictions: { country: 'in' }
    }, (predictions, status) => {
      setIsLoading(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions.map(prediction => ({
          place_id: prediction.place_id,
          description: prediction.description,
          main_text: prediction.structured_formatting?.main_text || prediction.description,
          secondary_text: prediction.structured_formatting?.secondary_text || ''
        })));
      } else {
        setSuggestions([]);
      }
    });
  };

  // Debounced search
  const debouncedSearch = debounce(searchPlaces, 300);

  // Handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
    debouncedSearch(newValue);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
    if (onPlaceSelect) {
      onPlaceSelect(suggestion);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (value && value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  // Handle map icon click
  const handleMapClick = () => {
    // Check if Google Maps is actually available
    if (window.google && window.google.maps) {
      setMapError(null);
      setIsGoogleMapsLoaded(true);
    } else {
      setMapError('Google Maps API is not loaded. Please check your API key configuration.');
      setIsGoogleMapsLoaded(false);
    }
    setLocationError(null); // Clear any previous location errors
    setMapOpen(true);
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        console.log('Current location:', lat, lng);
        
        // Update map center to current location
        if (mapInstanceRef.current) {
          const newCenter = { lat, lng };
          mapInstanceRef.current.setCenter(newCenter);
          mapInstanceRef.current.setZoom(15);
          
          // Add marker at current location
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }
          
          markerRef.current = new window.google.maps.Marker({
            position: newCenter,
            map: mapInstanceRef.current,
            title: 'Your Current Location',
            animation: window.google.maps.Animation.DROP
          });
          
          setSelectedLocation(newCenter);
        }
        
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        let errorMessage = 'Unable to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Initialize map when modal opens
  useEffect(() => {
    if (mapOpen) {
      const initializeMap = () => {
        console.log('Modal opened - attempting to initialize map...');
        console.log('Google Maps available:', !!window.google);
        console.log('Google Maps object available:', !!window.google?.maps);
        console.log('Map container available:', !!mapRef.current);
        console.log('Map container dimensions:', mapRef.current ? {
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight
        } : 'No container');
        
        if (!window.google || !window.google.maps) {
          console.error('Google Maps API not loaded');
          setMapError('Google Maps API is not loaded. Please check your API key and internet connection.');
          setIsGoogleMapsLoaded(false);
          return;
        }

        if (!mapRef.current) {
          console.error('Map container not available');
          setMapError('Map container not available');
          setIsGoogleMapsLoaded(false);
          return;
        }

        // Check if container has dimensions
        if (mapRef.current.offsetWidth === 0 || mapRef.current.offsetHeight === 0) {
          console.error('Map container has no dimensions');
          setMapError('Map container has no dimensions');
          setIsGoogleMapsLoaded(false);
          return;
        }

        try {
          console.log('Creating Google Map instance...');
          setMapError(null);
          setIsGoogleMapsLoaded(true);
          
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 22.7196, lng: 75.8577 }, // Indore coordinates
            zoom: 12,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
              }
            ]
          });

          mapInstanceRef.current = map;
          console.log('Google Map created successfully');

          // Trigger resize to ensure proper rendering
          setTimeout(() => {
            if (window.google && window.google.maps && map) {
              window.google.maps.event.trigger(map, 'resize');
              console.log('Map resize triggered');
            }
          }, 100);

          // Add click listener to map
          map.addListener('click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            
            console.log('Map clicked at:', lat, lng);
            
            // Remove existing marker
            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            // Add new marker
            markerRef.current = new window.google.maps.Marker({
              position: { lat, lng },
              map: map,
              title: 'Selected Location',
              animation: window.google.maps.Animation.DROP
            });

            setSelectedLocation({ lat, lng });
          });

          console.log('Map initialization completed successfully');
        } catch (error) {
          console.error('Error initializing map:', error);
          setMapError('Failed to initialize map: ' + error.message);
          setIsGoogleMapsLoaded(false);
        }
      };

      // Wait for modal to be fully rendered and visible
      const timer = setTimeout(initializeMap, 500);
      return () => clearTimeout(timer);
    } else {
      // Clean up when modal closes
      if (mapInstanceRef.current) {
        console.log('Cleaning up map instance');
        mapInstanceRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current = null;
      }
      setSelectedLocation(null);
      setMapError(null);
    }
  }, [mapOpen]);

  // Handle map selection confirm
  const handleMapConfirm = () => {
    if (selectedLocation && window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: selectedLocation }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const address = results[0].formatted_address;
          onChange(address);
          if (onPlaceSelect) {
            onPlaceSelect({
              place_id: results[0].place_id,
              description: address,
              main_text: results[0].formatted_address,
              secondary_text: '',
              geometry: { location: { lat: selectedLocation.lat, lng: selectedLocation.lng } }
            });
          }
        }
        setMapOpen(false);
        setSelectedLocation(null);
      });
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Box position="relative" ref={suggestionsRef}>
        <TextField
          ref={inputRef}
          fullWidth
          size="small"
          label={label}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          InputLabelProps={{ style: { color: '#666', fontWeight: 600, fontSize: 15 } }}
          InputProps={{
            style: { fontSize: 15, background: 'white', borderRadius: 2, height: 48 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleMapClick}
                  sx={{ mr: 0.5, p: 0.5 }}
                >
                  <MapIcon sx={{ color: iconColor, fontSize: 18 }} />
                </IconButton>
                <LocationOnIcon sx={{ color: iconColor, fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{ '.MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' } }}
        />
        
        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              bgcolor: 'white',
              border: '1px solid #ddd',
              borderRadius: 2,
              mt: 0.5,
              maxHeight: 250,
              overflowY: 'auto',
              boxShadow: 3
            }}
          >
            {isLoading ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="#666">
                  Loading suggestions...
                </Typography>
              </Box>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <Box
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    borderBottom: index < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                    '&:hover': { bgcolor: '#f5f5f5' },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <Typography variant="body2" fontWeight={600} color="#333">
                    {suggestion.main_text}
                  </Typography>
                  <Typography variant="caption" color="#666">
                    {suggestion.secondary_text}
                  </Typography>
                </Box>
              ))
            ) : value && value.length >= 2 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="#666">
                  No suggestions found
                </Typography>
              </Box>
            ) : null}
          </Box>
        )}
      </Box>

      {/* Map Selection Modal */}
      <Dialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: { 
            borderRadius: window.innerWidth < 600 ? 0 : 3,
            maxHeight: window.innerWidth < 600 ? '100vh' : '75vh',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            m: window.innerWidth < 600 ? 0 : 2
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          py: window.innerWidth < 600 ? 1.5 : 2,
          px: window.innerWidth < 600 ? 2 : 3
        }}>
          <Typography 
            variant={window.innerWidth < 600 ? "subtitle1" : "h6"} 
            fontWeight={600} 
            color="#2c3e50"
            sx={{ fontSize: window.innerWidth < 600 ? '1rem' : '1.25rem' }}
          >
            Select Location on Map
          </Typography>
          <IconButton 
            onClick={() => setMapOpen(false)}
            size={window.innerWidth < 600 ? "small" : "medium"}
            sx={{ 
              color: '#6c757d',
              '&:hover': { 
                bgcolor: '#e9ecef',
                color: '#495057'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
                <DialogContent sx={{ 
          p: 0, 
          minHeight: window.innerWidth < 600 ? 'calc(100vh - 200px)' : '320px',
          overflow: 'hidden',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}>
          <Box
            ref={mapRef}
            sx={{
              width: '100%',
              height: window.innerWidth < 600 ? 'calc(100vh - 200px)' : '320px',
              minHeight: window.innerWidth < 600 ? 'calc(100vh - 200px)' : '320px',
              borderRadius: 0,
              position: 'relative',
              bgcolor: '#f5f5f5',
              border: 'none',
              display: 'block',
              overflow: 'visible'
            }}
          >
            {mapError && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  p: 3,
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: 2,
                  maxWidth: '80%',
                  zIndex: 1000
                }}
              >
                <Typography variant="h6" color="error" gutterBottom>
                  Map Not Available
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {mapError}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Please add your Google Maps API key to enable map selection.
                </Typography>
              </Box>
            )}
            
                         {!mapError && !isGoogleMapsLoaded && (
               <Box
                 sx={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                   textAlign: 'center',
                   p: 3,
                   bgcolor: 'white',
                   borderRadius: 2,
                   boxShadow: 2,
                   maxWidth: '80%',
                   zIndex: 1000
                 }}
               >
                 <Typography variant="h6" gutterBottom>
                   Loading Map...
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                   Please wait while the map loads.
                 </Typography>
               </Box>
             )}
             
           </Box>
           
           {/* Current Location Button - Positioned over map area */}
           {isGoogleMapsLoaded && !mapError && (
             <Fab
               color="primary"
               size={window.innerWidth < 600 ? "small" : "medium"}
               onClick={getCurrentLocation}
               disabled={isGettingLocation}
               sx={{
                 position: 'absolute',
                 bottom: window.innerWidth < 600 ? 100 : 80, // Adjust for mobile
                 left: 16,
                 bgcolor: '#2196F3',
                 boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                 '&:hover': { 
                   bgcolor: '#1976D2',
                   boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)'
                 },
                 '&:disabled': { 
                   bgcolor: '#ccc',
                   boxShadow: 'none'
                 },
                 zIndex: 9999
               }}
             >
               {isGettingLocation ? (
                 <CircularProgress size={window.innerWidth < 600 ? 20 : 24} color="inherit" />
               ) : (
                 <MyLocationIcon />
               )}
             </Fab>
           )}
          <Box sx={{ 
            p: window.innerWidth < 600 ? 1.5 : 2, 
            bgcolor: '#f8f9fa',
            borderTop: '1px solid #e9ecef'
          }}>
            <Typography 
              variant="body2" 
              color="#6c757d" 
              sx={{ 
                fontSize: window.innerWidth < 600 ? '0.8rem' : '0.875rem',
                lineHeight: window.innerWidth < 600 ? 1.4 : 1.5
              }}
            >
              {isGoogleMapsLoaded && !mapError
                ? "📍 Tap on the map to select your location. A marker will appear at the selected point."
                : mapError
                ? "⚠️ Map selection is not available. Please configure your Google Maps API key."
                : "⏳ Loading map..."
              }
            </Typography>
            {locationError && (
              <Typography 
                variant="body2" 
                color="error" 
                sx={{ 
                  mt: 1, 
                  fontSize: window.innerWidth < 600 ? '0.8rem' : '0.875rem',
                  lineHeight: window.innerWidth < 600 ? 1.4 : 1.5
                }}
              >
                {locationError}
              </Typography>
            )}
          </Box>
        </DialogContent>
                         <DialogActions sx={{ 
          p: window.innerWidth < 600 ? 1.5 : 2, 
          bgcolor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          justifyContent: 'space-between',
          flexDirection: window.innerWidth < 600 ? 'column' : 'row',
          gap: window.innerWidth < 600 ? 1 : 0
        }}>
          <Button 
            onClick={() => setMapOpen(false)}
            fullWidth={window.innerWidth < 600}
            size={window.innerWidth < 600 ? "large" : "medium"}
            sx={{
              color: '#6c757d',
              fontWeight: 500,
              py: window.innerWidth < 600 ? 1.5 : 1,
              '&:hover': { 
                bgcolor: '#e9ecef',
                color: '#495057'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleMapConfirm}
            disabled={!selectedLocation || !isGoogleMapsLoaded}
            fullWidth={window.innerWidth < 600}
            size={window.innerWidth < 600 ? "large" : "medium"}
            sx={{
              bgcolor: iconColor,
              fontWeight: 600,
              px: window.innerWidth < 600 ? 2 : 3,
              py: window.innerWidth < 600 ? 1.5 : 1,
              '&:hover': { bgcolor: iconColor, opacity: 0.9 },
              '&:disabled': { bgcolor: '#ccc', color: '#666' }
            }}
          >
            Confirm Location
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoogleMapsAutocomplete;
