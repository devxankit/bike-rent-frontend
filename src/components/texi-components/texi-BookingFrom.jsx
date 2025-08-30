import React, { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete';

const isValidDayjs = val => val && typeof val.isValid === 'function' && val.isValid();

const TexiBookingForm = () => {
  // Form state
  const [tripType, setTripType] = useState('round-trip');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pickDate, setPickDate] = useState(dayjs());
  const [pickTime, setPickTime] = useState(dayjs());
  const [dropDate, setDropDate] = useState(dayjs());
  const [dropTime, setDropTime] = useState(dayjs());

    // Picker open states
  const [pickDateOpen, setPickDateOpen] = useState(false);
  const [pickTimeOpen, setPickTimeOpen] = useState(false);
  const [dropDateOpen, setDropDateOpen] = useState(false);
  const [dropTimeOpen, setDropTimeOpen] = useState(false);

  // Defensive onChange for DatePicker/TimePicker
  const handleDayjsChange = setter => val => setter(isValidDayjs(val) ? val : null);

  // Calculate duration
  let durationDisplay = '-';
  if (isValidDayjs(pickDate) && isValidDayjs(dropDate)) {
    const start = pickDate.startOf('day');
    const end = dropDate.startOf('day');
    const diffDays = end.diff(start, 'day');
    if (diffDays > 0) {
      durationDisplay = `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
    } else if (diffDays === 0 && isValidDayjs(pickTime) && isValidDayjs(dropTime)) {
      const startTime = pickTime.hour();
      const endTime = dropTime.hour();
      const hourDiff = endTime - startTime;
      if (hourDiff > 0) {
        durationDisplay = `${hourDiff} Hour${hourDiff > 1 ? 's' : ''}`;
      } else {
        durationDisplay = '-';
      }
    } else {
      durationDisplay = '-';
    }
  }

  // Handle form submission
  const handleFindRide = () => {
    if (!pickupLocation || !dropLocation || !vehicleType) {
      alert('Please fill in all required fields');
      return;
    }

    const bookingData = {
      tripType,
      pickupLocation,
      dropLocation,
      vehicleType,
      pickDate: pickDate.format('YYYY-MM-DD'),
      pickTime: pickTime.format('HH:mm'),
      dropDate: dropDate.format('YYYY-MM-DD'),
      dropTime: dropTime.format('HH:mm'),
      duration: durationDisplay
    };

    console.log('Taxi Booking Data:', bookingData);
    // Here you would typically send the data to your backend API
  };

  // Trip type options
  const tripTypes = [
    { value: 'round-trip', label: 'Round Trip' },
    { value: 'one-way', label: 'One Way Trip' },
    { value: 'airport-drop', label: 'Airport Drop' },
    { value: 'airport-pickup', label: 'Airport Pick-Up' }
  ];

  // Vehicle type options
  const vehicleTypes = [
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'tempo-traveller', label: 'Tempo Traveller' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <Paper 
        elevation={8} 
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.95)', 
          p: { xs: 3, md: 4 }, 
          borderRadius: 3, 
          minWidth: 320, 
          maxWidth: 500, 
          width: '100%', 
          mx: 'auto',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Box display="flex" flexDirection="column" gap={2.5}>
          {/* Header */}
          <Box textAlign="center" mb={1}>
            <Typography variant="h4" fontWeight={700} color="#1a1a1a" mb={1}>
              Focus on Ease and Convenience
            </Typography>
            <Typography variant="subtitle1" color="#666" fontSize={16}>
              Get a reliable ride for any journey, any time.
            </Typography>
          </Box>

          {/* Trip Type Selection */}
          <Box>
            <Typography variant="subtitle2" fontWeight={600} color="#333" mb={1.5} fontSize={15}>
              Trip Type
            </Typography>
            <ToggleButtonGroup
              value={tripType}
              exclusive
              onChange={(event, newValue) => newValue && setTripType(newValue)}
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
                '& .MuiToggleButton-root': {
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    bgcolor: '#8BC34A',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#7CB342',
                    }
                  },
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  }
                }
              }}
            >
              {tripTypes.map((type) => (
                <ToggleButton key={type.value} value={type.value}>
                  {type.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Vehicle Type */}
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel sx={{ color: '#666', fontWeight: 600, fontSize: 15 }}>Vehicle Type</InputLabel>
            <Select
              value={vehicleType}
              label="Vehicle Type"
              onChange={(e) => setVehicleType(e.target.value)}
              IconComponent={() => null}
              endAdornment={
                <InputAdornment position="end">
                  <DirectionsCarIcon sx={{ color: '#8BC34A', fontSize: 20 }} />
                </InputAdornment>
              }
              sx={{ 
                fontSize: 15, 
                bgcolor: '#f8f8f8', 
                borderRadius: 2, 
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#ddd' }, 
                height: 48 
              }}
            >
              {vehicleTypes.map((vehicle) => (
                <MenuItem key={vehicle.value} value={vehicle.value}>
                  {vehicle.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Pickup Location */}
          <GoogleMapsAutocomplete
            label="Pick up location"
            value={pickupLocation}
            onChange={setPickupLocation}
            placeholder="Enter pickup location"
            iconColor="#8BC34A"
            onPlaceSelect={(place) => {
              console.log('Pickup place selected:', place);
            }}
          />

          {/* Drop Location */}
          <GoogleMapsAutocomplete
            label="Drop location"
            value={dropLocation}
            onChange={setDropLocation}
            placeholder="Enter drop location"
            iconColor="#F44336"
            onPlaceSelect={(place) => {
              console.log('Drop place selected:', place);
            }}
          />

          {/* Date and Time Section */}
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2.5, 
              bgcolor: '#fafafa', 
              borderRadius: 2, 
              border: '1px solid #e0e0e0' 
            }}
          >
            <Box display="flex" gap={1} mb={1.5}>
              {/* Pick Up Date */}
              <DatePicker
                label="Pick Up Date"
                value={isValidDayjs(pickDate) ? pickDate : null}
                onChange={handleDayjsChange(setPickDate)}
                sx={{ width: '100%' }}
                inputFormat="DD/MM/YYYY"
                open={pickDateOpen}
                onOpen={() => setPickDateOpen(true)}
                onClose={() => setPickDateOpen(false)}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    placeholder: 'Pick Up Date',
                    InputLabelProps: { style: { color: '#666', fontWeight: 600, fontSize: 14 } },
                    InputProps: {
                      style: { fontSize: 14, background: 'white', borderRadius: 1, height: 44 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon sx={{ color: '#8BC34A', fontSize: 18, cursor: 'pointer' }} onClick={() => setPickDateOpen(true)} />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
              {/* Pick Up Time */}
              <TimePicker
                label="Pick Up Time"
                value={isValidDayjs(pickTime) ? pickTime : null}
                onChange={handleDayjsChange(setPickTime)}
                sx={{ width: '100%' }}
                inputFormat="hh:mm A"
                ampm={true}
                minutesStep={5}
                open={pickTimeOpen}
                onOpen={() => setPickTimeOpen(true)}
                onClose={() => setPickTimeOpen(false)}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    placeholder: 'Pick Up Time',
                    InputLabelProps: { style: { color: '#666', fontWeight: 600, fontSize: 14 } },
                    InputProps: {
                      style: { fontSize: 14, background: 'white', borderRadius: 1, height: 44 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccessTimeIcon sx={{ color: '#8BC34A', fontSize: 18, cursor: 'pointer' }} onClick={() => setPickTimeOpen(true)} />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Box>
            
            <Box display="flex" gap={1} mb={1.5}>
              {/* Drop Off Date */}
              <DatePicker
                label="Drop Off Date"
                value={isValidDayjs(dropDate) ? dropDate : null}
                onChange={handleDayjsChange(setDropDate)}
                sx={{ width: '100%' }}
                inputFormat="DD/MM/YYYY"
                open={dropDateOpen}
                onOpen={() => setDropDateOpen(true)}
                onClose={() => setDropDateOpen(false)}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    placeholder: 'Drop Off Date',
                    InputLabelProps: { style: { color: '#666', fontWeight: 600, fontSize: 14 } },
                    InputProps: {
                      style: { fontSize: 14, background: 'white', borderRadius: 1, height: 44 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon sx={{ color: '#F44336', fontSize: 18, cursor: 'pointer' }} onClick={() => setDropDateOpen(true)} />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
              {/* Drop Off Time */}
              <TimePicker
                label="Drop Off Time"
                value={isValidDayjs(dropTime) ? dropTime : null}
                onChange={handleDayjsChange(setDropTime)}
                sx={{ width: '100%' }}
                inputFormat="hh:mm A"
                ampm={true}
                minutesStep={5}
                open={dropTimeOpen}
                onOpen={() => setDropTimeOpen(true)}
                onClose={() => setDropTimeOpen(false)}
                slotProps={{
                  textField: {
                    size: 'small',
                    variant: 'outlined',
                    placeholder: 'Drop Off Time',
                    InputLabelProps: { style: { color: '#666', fontWeight: 600, fontSize: 14 } },
                    InputProps: {
                      style: { fontSize: 14, background: 'white', borderRadius: 1, height: 44 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccessTimeIcon sx={{ color: '#F44336', fontSize: 18, cursor: 'pointer' }} onClick={() => setDropTimeOpen(true)} />
                        </InputAdornment>
                      ),
                    },
                  },
                }}
              />
            </Box>
            
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 13 }}>
              Total Duration: {durationDisplay}
            </Typography>
          </Paper>

          {/* Find Your Ride Button */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              fontWeight: 700,
              fontSize: 16,
              py: 1.5,
              mt: 1,
              bgcolor: '#1a1a1a',
              color: 'white',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': { 
                bgcolor: '#333',
                transform: 'translateY(-1px)',
                boxShadow: 4
              },
              transition: 'all 0.2s ease-in-out'
            }}
            onClick={handleFindRide}
          >
            Find Your Ride
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default TexiBookingForm;
