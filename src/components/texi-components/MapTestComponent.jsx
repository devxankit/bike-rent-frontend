import React, { useState } from 'react';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const MapTestComponent = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Google Maps Integration Test
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <GoogleMapsAutocomplete
          label="Pickup Location"
          value={pickupLocation}
          onChange={setPickupLocation}
          placeholder="Enter pickup location"
          iconColor="#8BC34A"
          onPlaceSelect={(place) => {
            console.log('Pickup selected:', place);
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <GoogleMapsAutocomplete
          label="Drop Location"
          value={dropLocation}
          onChange={setDropLocation}
          placeholder="Enter drop location"
          iconColor="#F44336"
          onPlaceSelect={(place) => {
            console.log('Drop selected:', place);
          }}
        />
      </Box>

      <Typography variant="body2" color="text.secondary">
        <strong>Instructions:</strong><br/>
        1. Type in the fields to see autocomplete suggestions<br/>
        2. Click the map icon (🗺️) to open interactive map selection<br/>
        3. Click anywhere on the map to place a marker<br/>
        4. Click "Confirm Location" to select that point
      </Typography>
    </Paper>
  );
};

export default MapTestComponent;

