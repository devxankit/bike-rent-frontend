import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete'
import CustomDatePicker from '../CustomDatePicker'
import CustomTimePicker from '../CustomTimePicker'
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  InputAdornment,
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import { 
  DirectionsCar as DirectionsCarIcon,
  Search as SearchIcon
} from '@mui/icons-material'

const TaxiBookingForm = () => {
  // Form state
  const [tripType, setTripType] = useState('round-trip');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pickDate, setPickDate] = useState(null);
  const [pickTime, setPickTime] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [dropTime, setDropTime] = useState(null);

  // Picker open states
  const [pickDateOpen, setPickDateOpen] = useState(false);
  const [pickTimeOpen, setPickTimeOpen] = useState(false);
  const [dropDateOpen, setDropDateOpen] = useState(false);
  const [dropTimeOpen, setDropTimeOpen] = useState(false);

  // Add refs and direction state for pickers
  const pickDateRef = useRef();
  const pickTimeRef = useRef();
  const dropDateRef = useRef();
  const dropTimeRef = useRef();
  const [pickDateDirection, setPickDateDirection] = useState('down');
  const [pickTimeDirection, setPickTimeDirection] = useState('down');
  const [dropDateDirection, setDropDateDirection] = useState('down');
  const [dropTimeDirection, setDropTimeDirection] = useState('down');

  // Calculate duration
  function getDurationString(pickDate, pickTime, dropDate, dropTime) {
    if (!pickDate || !pickTime || !dropDate || !dropTime) return "-";
    const start = new Date(pickDate);
    start.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);
    const end = new Date(dropDate);
    end.setHours(dropTime.getHours(), dropTime.getMinutes(), 0, 0);
    if (end <= start) return "-";
    const ms = end - start;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let str = "";
    if (days > 0) str += `${days} day${days > 1 ? "s" : ""} `;
    if (hours > 0) str += `${hours} hour${hours > 1 ? "s" : ""} `;
    if (minutes > 0) str += `${minutes} min${minutes > 1 ? "s" : ""}`;
    return str.trim() || "0 min";
  }

  function getPopupDirection(inputRef) {
    if (!inputRef.current) return 'down';
    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    // Assume popup height ~350px, adjust as needed
    return spaceBelow < 350 && spaceAbove > spaceBelow ? 'up' : 'down';
  }

  const handlePickDateFocus = () => setPickDateDirection(getPopupDirection(pickDateRef));
  const handlePickTimeFocus = () => setPickTimeDirection(getPopupDirection(pickTimeRef));
  const handleDropDateFocus = () => setDropDateDirection(getPopupDirection(dropDateRef));
  const handleDropTimeFocus = () => setDropTimeDirection(getPopupDirection(dropTimeRef));

  // Add useEffect to recalculate popup direction when each picker is opened
  useEffect(() => {
    if (pickDateOpen) setPickDateDirection(getPopupDirection(pickDateRef));
  }, [pickDateOpen]);
  useEffect(() => {
    if (pickTimeOpen) setPickTimeDirection(getPopupDirection(pickTimeRef));
  }, [pickTimeOpen]);
  useEffect(() => {
    if (dropDateOpen) setDropDateDirection(getPopupDirection(dropDateRef));
  }, [dropDateOpen]);
  useEffect(() => {
    if (dropTimeOpen) setDropTimeDirection(getPopupDirection(dropTimeRef));
  }, [dropTimeOpen]);

  const now = new Date();
  const currentDatePlaceholder = now.toLocaleDateString('en-GB');
  const currentTimePlaceholder = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Handle form submission
  const handleFindRide = () => {
    if (!pickupLocation || !dropLocation || !vehicleType || !pickDate || !pickTime || !dropDate || !dropTime) {
      toast.info("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 2500,
        style: { fontSize: '0.95rem', minWidth: 0, maxWidth: '260px', padding: '8px 16px' },
        icon: '🚗',
      });
      return;
    }

    const bookingData = {
      tripType,
      pickupLocation,
      dropLocation,
      vehicleType,
      pickDate: pickDate.toISOString().split('T')[0],
      pickTime: pickTime.toTimeString().split(' ')[0].substring(0, 5),
      dropDate: dropDate.toISOString().split('T')[0],
      dropTime: dropTime.toTimeString().split(' ')[0].substring(0, 5),
      duration: getDurationString(pickDate, pickTime, dropDate, dropTime)
    };

    console.log('Taxi Booking Data:', bookingData);
    // Here you would typically send the data to your backend API
    toast.success("Taxi booking request submitted!", {
      position: "top-right",
      autoClose: 2500,
      style: { fontSize: '0.95rem', minWidth: 0, maxWidth: '260px', padding: '8px 16px' },
      icon: '🚗',
    });
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
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md sm:max-w-lg border border-gray-100 flex flex-col gap-3 sm:p-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Book a Taxi in Your City</h2>
      <p className="text-xs text-gray-500 text-center mb-1">Quickly find the best taxi for your journey needs.</p>
      
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
            display: 'flex',
            gap: 0.5,
            '& .MuiToggleButton-root': {
              border: '1px solid #ddd',
              borderRadius: 2,
              py: 1,
              px: 1,
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'none',
              flex: 1,
              minWidth: 0,
              '&.Mui-selected': {
                bgcolor: '#FDB813',
                color: 'white',
                '&:hover': {
                  bgcolor: '#E6A500',
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
              <DirectionsCarIcon sx={{ color: '#FDB813', fontSize: 20 }} />
            </InputAdornment>
          }
          sx={{ 
            fontSize: 15, 
            bgcolor: 'white', 
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
        iconColor="#FDB813"
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
        iconColor="#FDB813"
        onPlaceSelect={(place) => {
          console.log('Drop place selected:', place);
        }}
      />

      {/* Date and Time Section */}
      <div className="grid grid-cols-2 gap-2 mt-1.5">
        <CustomDatePicker
          ref={pickDateRef}
          value={pickDate}
          onChange={date => {
            setPickDate(date);
            setPickDateOpen(false);
            if (!pickTime) setPickTimeOpen(true); // Only open if not already set
          }}
          label="Pick Up Date"
          minDate={new Date()}
          popupDirection={pickDateDirection}
          onFocus={handlePickDateFocus}
          open={pickDateOpen}
          setOpen={setPickDateOpen}
          placeholder={currentDatePlaceholder}
        />
        <CustomTimePicker
          ref={pickTimeRef}
          value={pickTime}
          onChange={time => {
            setPickTime(time);
            setPickTimeOpen(false);
            if (!pickDate) setPickDateOpen(true); // Only open if not already set
          }}
          label="Pick Up Time"
          selectedDate={pickDate}
          popupDirection={pickTimeDirection}
          onFocus={handlePickTimeFocus}
          open={pickTimeOpen}
          setOpen={setPickTimeOpen}
          placeholder={currentTimePlaceholder}
        />
        <CustomDatePicker
          ref={dropDateRef}
          value={dropDate}
          onChange={date => {
            setDropDate(date);
            setDropDateOpen(false);
            if (!dropTime) setDropTimeOpen(true); // Only open if not already set
          }}
          label="Drop Off Date"
          minDate={pickDate || new Date()}
          popupDirection={dropDateDirection}
          onFocus={handleDropDateFocus}
          open={dropDateOpen}
          setOpen={setDropDateOpen}
          placeholder={currentDatePlaceholder}
        />
        <CustomTimePicker
          ref={dropTimeRef}
          value={dropTime}
          onChange={time => {
            setDropTime(time);
            setDropTimeOpen(false);
            if (!dropDate) setDropDateOpen(true); // Only open if not already set
          }}
          label="Drop Off Time"
          selectedDate={dropDate}
          popupDirection={dropTimeDirection}
          onFocus={handleDropTimeFocus}
          open={dropTimeOpen}
          setOpen={setDropTimeOpen}
          placeholder={currentTimePlaceholder}
          minDateTime={
            dropDate && pickDate && pickTime && dropDate.getFullYear() === pickDate.getFullYear() && dropDate.getMonth() === pickDate.getMonth() && dropDate.getDate() === pickDate.getDate()
              ? (() => { const d = new Date(dropDate); d.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0); return d; })()
              : undefined
          }
        />
      </div>
      <hr className="my-2 border-gray-200" />
      <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
        <span>Total Duration:</span>
        <span>{getDurationString(pickDate, pickTime, dropDate, dropTime)}</span>
      </div>

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
          bgcolor: '#FDB813',
          color: 'white',
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': { 
            bgcolor: '#E6A500',
            transform: 'translateY(-1px)',
            boxShadow: 4
          },
          transition: 'all 0.2s ease-in-out'
        }}
        onClick={handleFindRide}
      >
        Find Your Taxi
      </Button>
    </div>
  );
};

export default TaxiBookingForm;
