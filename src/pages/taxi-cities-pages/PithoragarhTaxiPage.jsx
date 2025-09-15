import React, { useEffect, useState } from 'react';
import TaxiCard from '../../components/TaxiCard';
import api from '../../utils/api';
import TaxiNavBar from '../../components/taxi-components/TaxiNavBar';
import FooterTaxi from '../../components/FooterTaxi';
import { useNavigate } from 'react-router-dom';
import TaxiFilterSidebar from '../../components/TaxiFilterSidebar';
import { FiX } from 'react-icons/fi';
import { generateTaxiCitySlug } from '../../utils/slugUtils';
import { Box, Typography } from '@mui/material';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const PithoragarhTaxiPage = ({ cityData }) => {
  const [taxis, setTaxis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Pithoragarh');
  const [allLocations, setAllLocations] = useState([]);
  const [taxiName, setTaxiName] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPrice] = useState(10000);
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    // Fetch all cities for the filter dropdown
    const fetchCities = async () => {
      try {
        const citiesRes = await api.get('/api/taxi-cities');
        const cityNames = citiesRes.data.map(city => city.name);
        setAllLocations(cityNames);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
        setAllLocations(['Pithoragarh']); // Fallback
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/taxis', { params: { isAvailable: true, location: 'Pithoragarh' } });
        setTaxis(res.data);
      } catch (err) {
        setError('Failed to load taxis.');
      } finally {
        setLoading(false);
      }
    };
    fetchTaxis();
  }, []);

  useEffect(() => {
    const fetchFilteredTaxis = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { isAvailable: true, location };
        if (taxiName) params.name = taxiName;
        if (price > 0) params.rentalPricePerDay = price;
        const res = await api.get('/api/taxis', { params });
        setTaxis(res.data);
      } catch (err) {
        setError('Failed to load taxis.');
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredTaxis();
  }, [location, taxiName, price]);

  // Sort taxis so newest appear first (descending by createdAt)
  const sortedTaxis = [...taxis].sort((a, b) => new Date(b.year || b.createdAt) - new Date(a.year || a.createdAt));

  // Redirect to city route on city change
  useEffect(() => {
    if (location && location.toLowerCase() !== 'pithoragarh') {
      const city = location.trim().toLowerCase();
      if (city) {
        const slug = generateTaxiCitySlug(city);
        navigate(`/taxi/${slug}`);
      } else {
        navigate(`/taxi`);
      }
    }
  }, [location, navigate]);

  return (
    <>
      <TaxiNavBar onFilterToggle={() => setFilterOpen(true)} />
      <div className="flex min-h-screen bg-gray-50">
        {/* Filters - Left Sidebar */}
        <aside className="w-80 p-4 bg-white border-r hidden md:block sticky top-0 h-screen shadow-lg rounded-r-3xl" style={{ alignSelf: 'flex-start' }}>
          <TaxiFilterSidebar
            location={location}
            setLocation={setLocation}
            allLocations={allLocations}
            taxiName={taxiName}
            setTaxiName={setTaxiName}
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
                <h2 className="text-base font-bold text-yellow-500">Taxi Filters</h2>
                 <button onClick={() => setFilterOpen(false)} aria-label="Close filter" className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400">
                   <FiX className="w-5 h-5 text-yellow-500" />
                  </button>
              </div>
              <TaxiFilterSidebar
                location={location}
                setLocation={setLocation}
                allLocations={allLocations}
                taxiName={taxiName}
                setTaxiName={setTaxiName}
                price={price}
                setPrice={setPrice}
                maxPrice={maxPrice}
                navigate={navigate}
                compact
              />
            </div>
          </div>
        )}
        
        {/* Main Content - Right Side */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Taxis in Pithoragarh</h1>
              <p className="text-gray-600">Find the perfect taxi for your journey in Pithoragarh</p>
            </div>
            
            {/* Taxi Listings */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : sortedTaxis.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No taxis available in Pithoragarh at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedTaxis.map((taxi) => (
                  <TaxiCard key={taxi._id} taxi={taxi} />
                ))}
              </div>
            )}
            
            {/* City Page Content - Displayed below taxi listings in main content area */}
            {cityData && cityData.content && (
              <div ref={scrollRef} className="animate-fade-in-up mt-8">
                <Box 
                  sx={{ 
                    p: 4,
                    bgcolor: 'white',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    border: '1px solid #e5e7eb',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #FDB813 0%, #E6A612 100%)',
                      borderRadius: '12px 12px 0 0'
                    }
                  }}
                >
                  <Box 
                    dangerouslySetInnerHTML={{ __html: cityData.content }}
                    sx={{
                      '& h1, & h2, & h3, & h4, & h5, & h6': {
                        color: '#1f2937',
                        fontWeight: 600,
                        mb: 2,
                        mt: 3,
                        lineHeight: 1.3
                      },
                      '& h1': { fontSize: { xs: '1.75rem', md: '2rem' } },
                      '& h2': { fontSize: { xs: '1.5rem', md: '1.75rem' } },
                      '& h3': { fontSize: { xs: '1.25rem', md: '1.5rem' } },
                      '& h4': { fontSize: { xs: '1.125rem', md: '1.25rem' } },
                      '& h5': { fontSize: { xs: '1rem', md: '1.125rem' } },
                      '& h6': { fontSize: '1rem' },
                      '& p': {
                        color: '#4b5563',
                        lineHeight: 1.8,
                        mb: 3,
                        fontSize: '1rem',
                        textAlign: 'justify'
                      },
                      '& ul, & ol': {
                        color: '#4b5563',
                        lineHeight: 1.8,
                        mb: 3,
                        pl: 4
                      },
                      '& li': {
                        mb: 1.5,
                        position: 'relative'
                      },
                      '& ul li::before': {
                        content: '"•"',
                        color: '#FDB813',
                        fontWeight: 'bold',
                        position: 'absolute',
                        left: '-1.5rem'
                      },
                      '& a': {
                        color: '#FDB813',
                        textDecoration: 'none',
                        fontWeight: 500,
                        borderBottom: '1px solid transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderBottomColor: '#FDB813',
                          color: '#E6A612'
                        }
                      },
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        my: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        }
                      },
                      '& blockquote': {
                        borderLeft: '4px solid #FDB813',
                        pl: 3,
                        ml: 0,
                        fontStyle: 'italic',
                        color: '#6b7280',
                        bgcolor: '#f9fafb',
                        p: 3,
                        borderRadius: 2,
                        my: 3,
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
                          borderRadius: 2,
                          zIndex: -1
                        }
                      },
                      '& strong, & b': {
                        fontWeight: 700,
                        color: '#1f2937'
                      },
                      '& em, & i': {
                        fontStyle: 'italic',
                        color: '#6b7280'
                      },
                      '& table': {
                        width: '100%',
                        borderCollapse: 'collapse',
                        my: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      },
                      '& th, & td': {
                        border: '1px solid #e5e7eb',
                        padding: '12px',
                        textAlign: 'left'
                      },
                      '& th': {
                        bgcolor: '#FDB813',
                        color: '#1f2937',
                        fontWeight: 600
                      },
                      '& tr:nth-of-type(even)': {
                        bgcolor: '#f9fafb'
                      }
                    }}
                  />
                </Box>
              </div>
            )}
          </div>
        </main>
      </div>
      <FooterTaxi />
    </>
  );
};

export default PithoragarhTaxiPage;
