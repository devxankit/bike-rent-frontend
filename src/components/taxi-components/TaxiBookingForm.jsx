import React, { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import GoogleMapsAutocomplete from './GoogleMapsAutocomplete'
import CustomDatePicker from '../CustomDatePicker'
import CustomTimePicker from '../CustomTimePicker'
import { 
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import { 
  Search as SearchIcon,
  LocationOn as LocationOnIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { generateTaxiCitySlug } from '../../utils/slugUtils'
import api from '../../utils/api'

const TaxiBookingForm = () => {
  // Form state
  const [tripType, setTripType] = useState('round-trip');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropCoordinates, setDropCoordinates] = useState(null);
  const [pickDate, setPickDate] = useState(null);
  const [pickTime, setPickTime] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  
  // City selection state
  const [city, setCity] = useState('');
  const [cityPopupOpen, setCityPopupOpen] = useState(false);
  const [cityPopupVisible, setCityPopupVisible] = useState(false);
  const cityPopupRef = useRef(null);
  const [allCities, setAllCities] = useState([]);
  const [citySearch, setCitySearch] = useState('');
  
  const navigate = useNavigate();

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

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get('/api/taxi-cities');
        setAllCities(response.data);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
        setAllCities([]);
      }
    };
    fetchCities();
  }, []);

  // Animate popup open/close
  useEffect(() => {
    if (cityPopupOpen) {
      setCityPopupVisible(true);
    } else if (cityPopupVisible) {
      // Delay unmount for animation
      const timeout = setTimeout(() => setCityPopupVisible(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [cityPopupOpen]);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityPopupRef.current && !cityPopupRef.current.contains(event.target)) {
        setCityPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle form submission
  const handleFindRide = () => {
    // Check required fields based on trip type
    const isRoundTrip = tripType === 'round-trip';
    const requiredFields = [city, pickupLocation, dropLocation, pickDate, pickTime];
    
    if (isRoundTrip) {
      requiredFields.push(dropDate, dropTime);
    }
    
    if (requiredFields.some(field => !field)) {
      toast.info("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 2500,
        style: { fontSize: '0.95rem', minWidth: 0, maxWidth: '260px', padding: '8px 16px' },
        icon: '🚗',
      });
      return;
    }

    // Validate coordinates are available (only check when form is submitted)
    if (!pickupCoordinates || !dropCoordinates) {
      toast.error("Please select locations from the suggestions to calculate accurate pricing!", {
        position: "top-right",
        autoClose: 3000,
        style: { fontSize: '0.95rem', minWidth: 0, maxWidth: '300px', padding: '8px 16px' },
        icon: '🚗',
      });
      return;
    }

    const bookingData = {
      city,
      tripType,
      pickupLocation,
      dropLocation,
      pickupCoordinates,
      dropCoordinates,
      pickDate: pickDate.toISOString().split('T')[0],
      pickTime: pickTime.toTimeString().split(' ')[0].substring(0, 5),
      dropDate: isRoundTrip ? dropDate.toISOString().split('T')[0] : null,
      dropTime: isRoundTrip ? dropTime.toTimeString().split(' ')[0].substring(0, 5) : null,
      duration: isRoundTrip ? getDurationString(pickDate, pickTime, dropDate, dropTime) : "One-way trip"
    };

    // Save form data to localStorage for taxi cards
    localStorage.setItem('taxiRentFormData', JSON.stringify(bookingData));
    
    // Navigate to selected city page
    const cityLower = city.trim().toLowerCase();
    if (cityLower) {
      const slug = generateTaxiCitySlug(cityLower);
      navigate(`/taxi/${slug}`);
    } else {
      navigate('/taxi');
    }
  };

  // Trip type options
  const tripTypes = [
    { value: 'round-trip', label: 'Round Trip' },
    { value: 'one-way', label: 'One Way Trip' },
    { value: 'airport-drop', label: 'Airport Drop' },
    { value: 'airport-pickup', label: 'Airport Pick-Up' }
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


      {/* City Selection */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} color="#333" mb={1.5} fontSize={15}>
          Select City
        </Typography>
        <div className="relative">
          <button
            type="button"
            className="w-full flex items-center border border-gray-300 rounded px-4 py-3 pr-10 text-base bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition placeholder-gray-400 text-gray-700 font-normal text-left"
            style={{ height: '48px' }}
            onClick={() => setCityPopupOpen(true)}
          >
            <span className="flex-1 truncate text-base text-gray-700 text-left">{city || 'Select a city'}</span>
          </button>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center h-full cursor-pointer pointer-events-none">
            <LocationOnIcon sx={{ color: '#FDB813', fontSize: 20 }} />
          </span>
        </div>
        {/* City Selection Popup */}
        {cityPopupVisible && (
          <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 transition-opacity duration-200`} style={{ opacity: cityPopupOpen ? 1 : 0 }}>
            <div
              ref={cityPopupRef}
              className={`bg-white rounded-xl shadow-2xl w-full max-w-xs sm:max-w-lg p-3 sm:p-6 relative mx-2 transform transition-transform duration-200 ${cityPopupOpen ? 'scale-100' : 'scale-95'}`}
              style={{ opacity: 1 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setCityPopupOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <input
                type="text"
                placeholder="Search city"
                value={citySearch}
                onChange={e => setCitySearch(e.target.value)}
                className="w-full mb-3 px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-yellow-200 text-sm"
              />
              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-h-56 sm:max-h-72 overflow-y-auto">
                {allCities.filter(cityObj => cityObj.name.toLowerCase().includes(citySearch.toLowerCase())).map(cityObj => (
                  <button
                    key={cityObj.name}
                    className="flex flex-col items-center gap-1 sm:gap-1 p-0.5 sm:p-1 rounded-lg hover:bg-yellow-50 focus:bg-yellow-100 transition"
                    onClick={() => { setCity(cityObj.name); setCityPopupOpen(false); }}
                  >
                    <img
                      src={cityObj.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMTIgMTZIMjhWMTJIMTJWMjRIMjhWMjBIMTJWMjRIMjgiIHN0cm9rZT0iIzk5QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo='}
                      alt={cityObj.name}
                      className="w-10 h-10 object-cover rounded-lg shadow"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMTIgMTZIMjhWMTJIMTJWMjRIMjhWMjBIMTJWMjRIMjgiIHN0cm9rZT0iIzk5QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                    <span className="text-xs font-semibold text-gray-700 mt-1 text-center">{cityObj.name}</span>
                  </button>
                ))}
                {allCities.filter(cityObj => cityObj.name.toLowerCase().includes(citySearch.toLowerCase())).length === 0 && (
                  <span className="col-span-3 text-center text-gray-400 text-sm">No cities found</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Box>

      {/* Pickup Location */}
      <Box>
        <GoogleMapsAutocomplete
          label={
            tripType === 'airport-pickup' ? 'Airport Location' : 
            'Pick up location'
          }
          value={pickupLocation}
          onChange={(value) => {
            setPickupLocation(value);
            // Clear coordinates when user types (not selecting from suggestions)
            if (!value) {
              setPickupCoordinates(null);
            }
          }}
          placeholder={
            tripType === 'airport-pickup' ? 'Enter airport location' : 
            'Enter pickup location'
          }
          iconColor="#FDB813"
        onPlaceSelect={(place) => {
          if (place.geometry && place.geometry.location) {
            const lat = typeof place.geometry.location.lat === 'function' 
              ? place.geometry.location.lat() 
              : place.geometry.location.lat;
            const lng = typeof place.geometry.location.lng === 'function' 
              ? place.geometry.location.lng() 
              : place.geometry.location.lng;
            
            setPickupCoordinates({ lat, lng });
          }
        }}
        />
        {pickupLocation && !pickupCoordinates && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="caption" color="warning.main" sx={{ fontSize: '11px' }}>
              ⚠️ Click the location icon to get coordinates for distance-based pricing
            </Typography>
          </Box>
        )}
        {pickupCoordinates && (
          <Typography variant="caption" color="success.main" sx={{ fontSize: '11px', mt: 0.5, display: 'block' }}>
            ✅ Location coordinates set - distance pricing enabled
          </Typography>
        )}
      </Box>

      {/* Drop Location */}
      <Box>
        <GoogleMapsAutocomplete
          label={
            tripType === 'round-trip' ? 'Destination' : 
            tripType === 'airport-drop' ? 'Airport Location' : 
            'Drop location'
          }
          value={dropLocation}
          onChange={(value) => {
            setDropLocation(value);
            // Clear coordinates when user types (not selecting from suggestions)
            if (!value) {
              setDropCoordinates(null);
            }
          }}
          placeholder={
            tripType === 'round-trip' ? 'Enter destination' : 
            tripType === 'airport-drop' ? 'Enter airport location' : 
            'Enter drop location'
          }
          iconColor="#FDB813"
        onPlaceSelect={(place) => {
          if (place.geometry && place.geometry.location) {
            const lat = typeof place.geometry.location.lat === 'function' 
              ? place.geometry.location.lat() 
              : place.geometry.location.lat;
            const lng = typeof place.geometry.location.lng === 'function' 
              ? place.geometry.location.lng() 
              : place.geometry.location.lng;
            
            setDropCoordinates({ lat, lng });
          }
        }}
        />
        {dropLocation && !dropCoordinates && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Typography variant="caption" color="warning.main" sx={{ fontSize: '11px' }}>
              ⚠️ Click the location icon to get coordinates for distance-based pricing
            </Typography>
          </Box>
        )}
        {dropCoordinates && (
          <Typography variant="caption" color="success.main" sx={{ fontSize: '11px', mt: 0.5, display: 'block' }}>
            ✅ Location coordinates set - distance pricing enabled
          </Typography>
        )}
      </Box>

      {/* Date and Time Section */}
      <div className={`grid gap-2 mt-1.5 ${tripType === 'round-trip' ? 'grid-cols-2' : 'grid-cols-2'}`}>
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
        {tripType === 'round-trip' && (
          <>
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
          </>
        )}
      </div>
      <hr className="my-2 border-gray-200" />
      <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
        <span>Total Duration:</span>
        <span>
          {tripType === 'round-trip' 
            ? getDurationString(pickDate, pickTime, dropDate, dropTime)
            : "One-way trip"
          }
        </span>
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
