import React, { useEffect, useState } from 'react';
import BikeCard from '../../components/BikeCard';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../../components/FilterSidebar';
import { FiX } from 'react-icons/fi';
import { generateCitySlug, generateBikesSlug } from '../../utils/slugUtils';

const BhopalBikesPage = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Bhopal');
  const [allLocations, setAllLocations] = useState([]);
  const [bikeName, setBikeName] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPrice] = useState(10000);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    // Fetch all cities for the filter dropdown
    const fetchCities = async () => {
      try {
        const citiesRes = await api.get('/api/cities');
        const cityNames = citiesRes.data.map(city => city.name);
        setAllLocations(cityNames);
      } catch (err) {
        // fallback: use locations from bikes if city API fails
        try {
          const res = await api.get('/api/bikes', { params: { isBooked: false } });
          const locations = Array.from(new Set(res.data.map(b => b.location).filter(Boolean)));
          setAllLocations(locations);
        } catch {}
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/bikes', { params: { isBooked: false, location: 'Bhopal' } });
        setBikes(res.data);
      } catch (err) {
        setError('Failed to load bikes.');
      } finally {
        setLoading(false);
      }
    };
    fetchBikes();
  }, []);

  useEffect(() => {
    const fetchFilteredBikes = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { isBooked: false, location };
        if (bikeName) params.name = bikeName;
        if (price > 0) params.price = price;
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

  // Redirect to city route on city change
  useEffect(() => {
    if (location && location.toLowerCase() !== 'bhopal') {
      const city = location.trim().toLowerCase();
      if (["indore", "mumbai", "goa", "haldwani", "kathgodam", "pithoragarh", "dehradun", "bhopal"].includes(city)) {
        // Use new slug format for navigation
        const slug = generateCitySlug(city);
        navigate(`/bikes/${slug}`);
      } else if (location === "") {
        // Use slug for main bikes page
        const bikesSlug = generateBikesSlug();
        navigate(`/bikes/${bikesSlug}`);
      }
    }
  }, [location, navigate]);

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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="p-2">
                  <FiX className="w-5 h-5" />
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
                compact={true}
              />
            </div>
          </div>
        )}
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bikes in Bhopal</h1>
              <p className="text-gray-600">Find the perfect bike for your journey in Bhopal</p>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : sortedBikes.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No bikes available in Bhopal at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedBikes.map((bike) => (
                  <BikeCard key={bike._id} bike={bike} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default BhopalBikesPage;
