import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { CircularProgress, Box } from '@mui/material';
import Footer from '../components/Footer';
import api from '../utils/api';

const DynamicCityPage = () => {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const [CityComponent, setCityComponent] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadCityComponent = async () => {
      try {
        setLoading(true);
        setError(false);

        // Extract city name from slug using the slug utility
        const { parseCityFromSlug } = await import('../utils/slugUtils');
        const cityName = parseCityFromSlug(citySlug);

        // Capitalize first letter for component name
        const componentName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        
        // Fetch city page data from API
        try {
          const cityResponse = await api.get(`/api/cities/${citySlug}`);
          setCityData(cityResponse.data);
        } catch (cityError) {
          console.warn('Could not fetch city data:', cityError);
          setCityData(null);
        }
        
        // Dynamically import the city component with retry logic
        let importSuccess = false;
        let attempts = 0;
        const maxAttempts = 3;
        
        while (!importSuccess && attempts < maxAttempts) {
          try {
            attempts++;
            console.log(`Attempting to load city component: ${componentName} (attempt ${attempts})`);
            
            const cityModule = await import(`./cities-pages/${componentName}.jsx`);
            const Component = cityModule.default;
            setCityComponent(() => Component);
            importSuccess = true;
            setRetryCount(0);
          } catch (importError) {
            console.error(`Failed to import city component for ${componentName} (attempt ${attempts}):`, importError);
            
            if (attempts < maxAttempts) {
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
            } else {
              // Final fallback to Dehradun component
              try {
                console.log('Using fallback component: Dehradun');
                const fallbackModule = await import(`./cities-pages/Dehradun.jsx`);
                const FallbackComponent = fallbackModule.default;
                setCityComponent(() => FallbackComponent);
                importSuccess = true;
              } catch (fallbackError) {
                console.error('Fallback component also failed:', fallbackError);
                setError(true);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load city component:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (citySlug) {
      loadCityComponent();
    }
  }, [citySlug, retryCount]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !CityComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">City Page Not Found</h1>
          <p className="text-gray-600 mb-6">The city page you're looking for doesn't exist or is temporarily unavailable.</p>
          <div className="space-x-4">
            <button 
              onClick={() => setRetryCount(prev => prev + 1)} 
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Retry
            </button>
            <button 
              onClick={() => navigate('/bikes')} 
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Browse All Cities
            </button>
            <button 
              onClick={() => window.history.back()} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      }>
        <CityComponent cityData={cityData} />
      </Suspense>
      <Footer />
    </>
  );
};

export default DynamicCityPage;
