import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { CircularProgress, Box } from '@mui/material';
import Footer from '../components/Footer';
import api from '../utils/api';

const DynamicCityPage = () => {
  const { citySlug } = useParams();
  const [CityComponent, setCityComponent] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        
        // Dynamically import the city component
        try {
          const cityModule = await import(`./cities-pages/${componentName}.jsx`);
          const Component = cityModule.default;
          setCityComponent(() => Component);
        } catch (importError) {
          console.error(`Failed to import city component for ${componentName}:`, importError);
          // Try to import a fallback component or show a generic city page
          const fallbackModule = await import(`./cities-pages/Dehradun.jsx`);
          const FallbackComponent = fallbackModule.default;
          setCityComponent(() => FallbackComponent);
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
  }, [citySlug]);

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
          <button 
            onClick={() => window.history.back()} 
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Go Back
          </button>
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
