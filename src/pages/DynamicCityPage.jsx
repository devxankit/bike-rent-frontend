import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { CircularProgress, Box } from '@mui/material';

const DynamicCityPage = () => {
  const { citySlug } = useParams();
  const [CityComponent, setCityComponent] = useState(null);
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
        
        // Dynamically import the city component
        const cityModule = await import(`./cities-pages/${componentName}.jsx`);
        const Component = cityModule.default;

        setCityComponent(() => Component);
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
    return <NotFound />;
  }

  return (
    <Suspense fallback={
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    }>
      <CityComponent />
    </Suspense>
  );
};

export default DynamicCityPage;
