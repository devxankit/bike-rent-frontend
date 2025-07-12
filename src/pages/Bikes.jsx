import React, { useEffect, useState } from 'react';
import BikeCard from '../components/BikeCard';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';

// Enhanced logging utility for Bikes page
const logBikesAction = (action, data = null, error = null) => {
  const timestamp = new Date().toISOString();
  console.group(`🚲 [${timestamp}] BIKES ${action}`);
  
  if (data) {
    console.log('📤 Data:', data);
  }
  
  if (error) {
    console.error('❌ Error:', error);
    console.error('🔍 Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
  }
  
  console.groupEnd();
};

const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [allLocations, setAllLocations] = useState([]);
  const [bikeName, setBikeName] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPrice] = useState(10000); // Fixed max price for slider

  // Fetch all available bikes initially to get all locations
  useEffect(() => {
    console.log('🚲 [Bikes] Component mounted, fetching initial bikes');
    const fetchBikes = async () => {
      try {
        setLoading(true);
        logBikesAction('FETCH_INITIAL_ATTEMPT', { isBooked: false });
        
        const res = await api.get('/api/bikes', { params: { isBooked: false } });
        
        logBikesAction('FETCH_INITIAL_SUCCESS', { 
          bikeCount: res.data.length,
          locations: Array.from(new Set(res.data.map(b => b.location).filter(Boolean)))
        });
        
        setBikes(res.data);
        // Extract unique locations for dropdown
        const locations = Array.from(new Set(res.data.map(b => b.location).filter(Boolean)));
        setAllLocations(locations);
        // Find max price for slider
        const prices = res.data.map(b => b.price).filter(Boolean);
        // setMaxPrice(prices.length ? Math.max(...prices) : 100000); // This line is removed as maxPrice is now fixed
      } catch (err) {
        console.error('🚲 [Bikes] Failed to load initial bikes:', err);
        logBikesAction('FETCH_INITIAL_FAILED', null, err);
        setError('Failed to load bikes.');
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  // Auto-filter bikes when any filter changes
  useEffect(() => {
    console.log('🔍 [Bikes] Filters changed:', { location, bikeName, price });
    const fetchFilteredBikes = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { isBooked: false };
        if (location) params.location = location;
        if (bikeName) params.name = bikeName;
        if (price > 0) params.price = price;
        // pickupTime filter is removed, so this line is removed
        
        logBikesAction('FETCH_FILTERED_ATTEMPT', { params });
        
        const res = await api.get('/api/bikes', { params });
        
        logBikesAction('FETCH_FILTERED_SUCCESS', { 
          bikeCount: res.data.length,
          filters: params
        });
        
        setBikes(res.data);
      } catch (err) {
        console.error('🚲 [Bikes] Failed to load filtered bikes:', err);
        logBikesAction('FETCH_FILTERED_FAILED', null, err);
        setError('Failed to load bikes.');
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredBikes();
  }, [location, bikeName, price]);

  // Sort bikes so newest appear first
  const sortedBikes = [...bikes].sort((a, b) => new Date(b.year || b.createdAt) - new Date(a.year || a.createdAt));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Bikes</h1>
            <p className="text-gray-600">Find the perfect bike for your journey</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => {
                    console.log('📍 [Bikes] Location filter changed:', e.target.value);
                    setLocation(e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Bike Name Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bike Name</label>
                <input
                  type="text"
                  value={bikeName}
                  onChange={(e) => {
                    console.log('🚲 [Bikes] Bike name filter changed:', e.target.value);
                    setBikeName(e.target.value);
                  }}
                  placeholder="Search by bike name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price: ₹{price}</label>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={price}
                  onChange={(e) => {
                    console.log('💰 [Bikes] Price filter changed:', e.target.value);
                    setPrice(Number(e.target.value));
                  }}
                  className="w-full"
                />
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    console.log('🔄 [Bikes] Clearing all filters');
                    setLocation('');
                    setBikeName('');
                    setPrice(0);
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              {loading ? 'Loading bikes...' : `Found ${sortedBikes.length} bike${sortedBikes.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Bikes Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedBikes.map((bike) => (
                <BikeCard key={bike._id} bike={bike} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && sortedBikes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No bikes found matching your criteria.</p>
              <button
                onClick={() => {
                  console.log('🔄 [Bikes] Resetting filters from no results');
                  setLocation('');
                  setBikeName('');
                  setPrice(0);
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bikes; 