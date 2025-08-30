import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const GooglePlacesAutocomplete = ({ 
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
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions for demonstration
  const mockSuggestions = [
    { place_id: '1', description: 'Connaught Place, New Delhi, Delhi, India', main_text: 'Connaught Place', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '2', description: 'India Gate, New Delhi, Delhi, India', main_text: 'India Gate', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '3', description: 'Red Fort, Old Delhi, Delhi, India', main_text: 'Red Fort', secondary_text: 'Old Delhi, Delhi, India' },
    { place_id: '4', description: 'Indira Gandhi International Airport, New Delhi, Delhi, India', main_text: 'Indira Gandhi International Airport', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '5', description: 'New Delhi Railway Station, New Delhi, Delhi, India', main_text: 'New Delhi Railway Station', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '6', description: 'Rajiv Chowk Metro Station, New Delhi, Delhi, India', main_text: 'Rajiv Chowk Metro Station', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '7', description: 'Lotus Temple, New Delhi, Delhi, India', main_text: 'Lotus Temple', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '8', description: 'Akshardham Temple, New Delhi, Delhi, India', main_text: 'Akshardham Temple', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '9', description: 'Chandni Chowk, Old Delhi, Delhi, India', main_text: 'Chandni Chowk', secondary_text: 'Old Delhi, Delhi, India' },
    { place_id: '10', description: 'Jama Masjid, Old Delhi, Delhi, India', main_text: 'Jama Masjid', secondary_text: 'Old Delhi, Delhi, India' },
    { place_id: '11', description: 'Humayun\'s Tomb, New Delhi, Delhi, India', main_text: 'Humayun\'s Tomb', secondary_text: 'New Delhi, Delhi, India' },
    { place_id: '12', description: 'Qutub Minar, New Delhi, Delhi, India', main_text: 'Qutub Minar', secondary_text: 'New Delhi, Delhi, India' }
  ];

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

  // Search function with mock data
  const searchPlaces = (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filteredSuggestions = mockSuggestions.filter(suggestion =>
        suggestion.description.toLowerCase().includes(query.toLowerCase()) ||
        suggestion.main_text.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(filteredSuggestions.slice(0, 6)); // Limit to 6 suggestions
      setIsLoading(false);
    }, 200);
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
          style: { fontSize: 15, background: '#f8f8f8', borderRadius: 2, height: 48 },
          endAdornment: (
            <InputAdornment position="end">
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
  );
};

export default GooglePlacesAutocomplete;

