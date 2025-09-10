import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import CustomDatePicker from './CustomDatePicker';
import CustomTimePicker from './CustomTimePicker';

const TourBookingForm = () => {
  const [city, setCity] = useState('');
  const [cityPopupOpen, setCityPopupOpen] = useState(false);
  const [cityPopupVisible, setCityPopupVisible] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [allCities, setAllCities] = useState([]);
  const cityPopupRef = useRef(null);

  // Date and time states
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Sample cities data - you can replace this with API call
  const sampleCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad',
    'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
    'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
    'Varanasi', 'Srinagar', 'Aurangabad', 'Navi Mumbai', 'Solapur', 'Vijayawada', 'Kolhapur',
    'Amritsar', 'Nashik', 'Sangli', 'Malegaon', 'Ulhasnagar', 'Jalgaon', 'Akola', 'Latur',
    'Ahmadnagar', 'Dhule', 'Ichalkaranji', 'Parbhani', 'Jalna', 'Bhusawal', 'Panvel',
    'Satara', 'Beed', 'Yavatmal', 'Kamptee', 'Gondia', 'Barshi', 'Achalpur', 'Osmanabad',
    'Nandurbar', 'Wardha', 'Udgir', 'Hinganghat'
  ];

  useEffect(() => {
    setAllCities(sampleCities);
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
  }, [cityPopupOpen, cityPopupVisible]);

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityPopupRef.current && !cityPopupRef.current.contains(event.target)) {
        setCityPopupOpen(false);
      }
    }
    if (cityPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cityPopupOpen]);

  const filteredCities = allCities.filter(cityName =>
    cityName.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setCityPopupOpen(false);
    setCitySearch('');
  };

  const handleFindTours = () => {
    if (!city || !startDate || !startTime || !endDate || !endTime) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would typically navigate to tour results or make an API call
    console.log('Finding tours for:', {
      city,
      startDate,
      startTime,
      endDate,
      endTime
    });
  };

  // Calculate duration
  const getDurationString = () => {
    if (!startDate || !startTime || !endDate || !endTime) return "-";
    
    const start = new Date(startDate);
    start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
    
    const end = new Date(endDate);
    end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
    
    if (end <= start) return "-";
    
    const ms = end - start;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min${minutes > 1 ? 's' : ''}`;
    } else {
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-md border border-gray-100 flex flex-col gap-3 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Book Your Tour</h2>
        <p className="text-xs text-gray-500 text-center mb-1">Find the perfect tour package for your destination.</p>
        
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 mb-0.5">Select City</label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center border border-gray-300 rounded px-4 py-3 pr-10 text-base bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer transition placeholder-gray-400 text-gray-700 font-normal text-left"
              style={{ height: '44px' }}
              onClick={() => setCityPopupOpen(true)}
            >
              <span className="flex-1 truncate text-base text-gray-700 text-left">{city || 'Select a city'}</span>
            </button>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center h-full cursor-pointer pointer-events-none">
              <FaMapMarkerAlt className="h-5 w-5 text-yellow-400" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1.5">
          <CustomDatePicker
            value={startDate}
            onChange={setStartDate}
            label="Tour Start Date"
            minDate={new Date()}
            placeholder="Select start date"
          />
          <CustomTimePicker
            value={startTime}
            onChange={setStartTime}
            label="Tour Start Time"
            selectedDate={startDate}
            placeholder="Select start time"
          />
          <CustomDatePicker
            value={endDate}
            onChange={setEndDate}
            label="Tour End Date"
            minDate={startDate || new Date()}
            placeholder="Select end date"
          />
          <CustomTimePicker
            value={endTime}
            onChange={setEndTime}
            label="Tour End Time"
            selectedDate={endDate}
            minDateTime={startDate && startTime ? new Date(startDate.getTime() + startTime.getTime()) : null}
            placeholder="Select end time"
          />
        </div>

        <hr className="my-2 border-gray-200" />
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
          <span>Total Duration:</span>
          <span>{getDurationString()}</span>
        </div>
        <button className="w-full h-10 bg-yellow-400 text-white py-1.5 rounded font-bold hover:bg-yellow-400 hover:scale-105 hover:shadow-lg transition-all duration-200 text-sm flex items-center justify-center gap-1 mt-1 active:scale-95" onClick={handleFindTours}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          Find Tours
        </button>
      </div>

      {/* City Selection Popup - Outside form container */}
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
              {filteredCities.map((cityName, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-1 sm:gap-1 p-0.5 sm:p-1 rounded-lg hover:bg-yellow-50 focus:bg-yellow-100 transition"
                  onClick={() => handleCitySelect(cityName)}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="w-5 h-5 text-yellow-500" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 mt-1 text-center">{cityName}</span>
                </button>
              ))}
              {filteredCities.length === 0 && (
                <span className="col-span-3 text-center text-gray-400 text-sm">No cities found</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourBookingForm;
