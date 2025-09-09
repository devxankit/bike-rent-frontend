import React, { useEffect, useState } from 'react';
import BikeCard from '../components/BikeCard';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import { FiX } from 'react-icons/fi';


const Bikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [allLocations, setAllLocations] = useState([]);
  const [bikeName, setBikeName] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPrice] = useState(10000); // Fixed max price for slider
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all available bikes and cities on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch bikes
        const bikesRes = await api.get('/api/bikes', { params: { isBooked: false } });
        setBikes(bikesRes.data);
        
        // Fetch all active cities from city pages API
        const citiesRes = await api.get('/api/cities');
        const cityNames = citiesRes.data.map(city => city.name);
        setAllLocations(cityNames);
        
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Failed to load bikes and cities.');
        
        // Fallback: extract locations from bikes if city API fails
        try {
          const bikesRes = await api.get('/api/bikes', { params: { isBooked: false } });
          setBikes(bikesRes.data);
          const locations = Array.from(new Set(bikesRes.data.map(b => b.location).filter(Boolean)));
          setAllLocations(locations);
        } catch (fallbackErr) {
          setError('Failed to load bikes.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
    // Removed auto-set city filter from localStorage to always default to 'All Cities'
  }, []);

  // Auto-filter bikes when any filter changes
  useEffect(() => {
    const fetchFilteredBikes = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { isBooked: false };
        if (location) params.location = location;
        if (bikeName) params.name = bikeName;
        if (price > 0) params.price = price;
        // pickupTime filter is removed, so this line is removed
        const res = await api.get('/api/bikes', { params });
        setBikes(res.data);
      } catch (err) {
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
      <Navbar onFilterToggle={() => setFilterOpen(true)} />
      <div className="flex min-h-screen h-screen bg-gray-50">
        {/* Filters */}
        <aside className="w-80 p-4 bg-white border-r hidden md:block sticky top-0 h-screen shadow-lg rounded-r-3xl" style={{ alignSelf: 'flex-start' }}>
          <FilterSidebar
            location={location}
            setLocation={setLocation}
            allLocations={allLocations}
            bikeName={bikeName}
            setBikeName={setBikeName}
            price={price}
            setPrice={setPrice}
            maxPrice={maxPrice}
            navigate={navigate}
          />
        </aside>
        {/* Mobile Filter Popup */}
        {filterOpen && (
          <div className="fixed inset-0 z-[100010] flex md:hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setFilterOpen(false)} />
            {/* Popup - always slide in from left */}
            <div className="absolute left-0 top-0 bg-white w-10/12 max-w-xs h-full shadow-xl p-2 animate-slide-in-left flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-bold text-yellow-500">Filters</h2>
                <button onClick={() => setFilterOpen(false)} aria-label="Close filter" className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400">
                  <FiX className="w-5 h-5 text-yellow-500" />
                </button>
              </div>
              <FilterSidebar
                location={location}
                setLocation={setLocation}
                allLocations={allLocations}
                bikeName={bikeName}
                setBikeName={setBikeName}
                price={price}
                setPrice={setPrice}
                maxPrice={maxPrice}
                navigate={navigate}
                compact
              />
            </div>
          </div>
        )}
        {/* Bike List */}
        <main className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: '100vh' }}>
          <h1 className="text-2xl font-bold mb-6">Available Bikes</h1>
          {loading && <div>Loading bikes...</div>}
          {error && <div className="text-red-500">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && !error && sortedBikes.length === 0 && (
              <div>No bikes available.</div>
            )}
            {sortedBikes.map(bike => (
              <BikeCard key={bike._id} bike={bike} />
            ))}
          </div>
        </main>
      </div>
      
      {/* Footer Section */}
      <Footer />
      
    </>
  );
};

export default Bikes; 