import React, { useEffect, useState } from 'react';
import BikeCard from '../components/BikeCard';
import axios from 'axios';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';


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
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/bikes', { params: { isBooked: false } });
        setBikes(res.data);
        // Extract unique locations for dropdown
        const locations = Array.from(new Set(res.data.map(b => b.location).filter(Boolean)));
        setAllLocations(locations);
        // Find max price for slider
        const prices = res.data.map(b => b.price).filter(Boolean);
        // setMaxPrice(prices.length ? Math.max(...prices) : 100000); // This line is removed as maxPrice is now fixed
      } catch (err) {
        setError('Failed to load bikes.');
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
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
        const res = await axios.get('/api/bikes', { params });
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
      <Navbar />
      <div className="flex min-h-screen h-screen bg-gray-50">
        {/* Filters */}
        <aside className="w-80 p-4 bg-white border-r hidden md:block sticky top-0 h-screen shadow-lg rounded-r-3xl" style={{ alignSelf: 'flex-start' }}>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-extrabold mb-2 text-sky-700 tracking-wide flex items-center gap-2">
              <span className="inline-block bg-sky-100 p-2 rounded-full shadow-sm"><svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-sky-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z' /></svg></span>
              Find Your Ride
            </h2>
            <form className="space-y-4 mt-2">
              {/* City Filter */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sky-700 text-sm mb-1">City</label>
                <select
                  className="w-full border border-sky-200 rounded-lg p-2 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition bg-white text-sm shadow-sm font-medium text-sky-800"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                >
                  <option value="">All Cities</option>
                  {allLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              {/* Bike Name Filter */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sky-700 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Bike Name
                </label>
                <input
                  type="text"
                  className="w-full border border-sky-200 rounded-xl p-2 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition bg-sky-50 text-sm shadow-sm"
                  placeholder="e.g. Honda, Yamaha..."
                  value={bikeName}
                  onChange={e => setBikeName(e.target.value)}
                />
              </div>
              {/* Price Slider Filter */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-sky-700 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" /></svg>
                  Max Price (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full accent-sky-500 slider-thumb-glow h-2"
                    style={{
                      background: `linear-gradient(90deg, #0ea5e9 ${(price / maxPrice) * 100}%, #e0f2fe ${(price / maxPrice) * 100}%)`,
                      borderRadius: '6px',
                    }}
                  />
                  <span className="font-bold text-sky-600 text-sm min-w-[40px]">{price > 0 ? `₹${price}` : 'Any'}</span>
                </div>
                <div className="flex justify-between text-xs text-sky-400 mt-0.5">
                  <span>0</span>
                  <span>{maxPrice}</span>
                </div>
              </div>
            </form>
          </div>
        </aside>
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
      
    </>
  );
};

export default Bikes; 