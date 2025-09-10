// Utility functions for handling city slugs
export const generateCitySlug = (cityName) => {
  if (!cityName) return '';
  const city = cityName.trim().toLowerCase();
  return `bike-rent-in-${city}`;
};

export const parseCityFromSlug = (slug) => {
  if (!slug) return '';
  
  // Handle new format: "bike-rent-in-city"
  if (slug.startsWith('bike-rent-in-')) {
    return slug.replace('bike-rent-in-', '');
  }
  
  // Handle old format for backward compatibility: "city-rent-bike-in-city"
  if (slug.includes('-rent-bike-in-')) {
    const parts = slug.split('-rent-bike-in-');
    if (parts.length === 2 && parts[0] === parts[1]) {
      return parts[0];
    }
  }
  
  // Fallback: if slug doesn't match expected format, return as is
  return slug;
};

export const isValidCitySlug = (slug) => {
  if (!slug) return false;
  const city = parseCityFromSlug(slug);
  const validCities = ["indore", "bhopal", "mumbai", "goa", "haldwani", "kathgodam", "pithoragarh", "dehradun"];
  return validCities.includes(city.toLowerCase());
};

export const getCityFromPath = (pathname) => {
  // Extract city from path like "/bikes/bike-rent-in-indore"
  const match = pathname.match(/\/bikes\/(.+)/);
  if (match) {
    return parseCityFromSlug(match[1]);
  }
  return '';
};

export const generateBikesSlug = () => {
  return 'rent-bike-in-all-cities';
};

export const generateTaxisSlug = () => {
  return 'taxi-service-in-all-cities';
};

// Taxi city slug utilities
export const generateTaxiCitySlug = (cityName) => {
  if (!cityName) return '';
  const city = cityName.trim().toLowerCase();
  return `taxi-service-in-${city}`;
};

export const parseTaxiCityFromSlug = (slug) => {
  if (!slug) return '';
  
  // Handle full format: "taxi-service-in-city"
  if (slug.startsWith('taxi-service-in-')) {
    return slug.replace('taxi-service-in-', '');
  }
  
  // Handle short format: "city" (for backward compatibility)
  // This handles cases where just the city name is used
  return slug;
};

export const isValidTaxiCitySlug = (slug) => {
  if (!slug) return false;
  const city = parseTaxiCityFromSlug(slug);
  // Allow any city name - validation will be done by checking if the city exists in the database
  return city && city.length > 0;
};

export const getTaxiCityFromPath = (pathname) => {
  // Extract city from path like "/taxi/taxi-service-in-indore" or "/taxi/indore"
  const match = pathname.match(/\/taxi\/(.+)/);
  if (match) {
    return parseTaxiCityFromSlug(match[1]);
  }
  return '';
};

// Tour city slug utilities
export const generateTourCitySlug = (cityName) => {
  if (!cityName) return '';
  const city = cityName.trim().toLowerCase();
  return `tour-packages-in-${city}`;
};

export const parseTourCityFromSlug = (slug) => {
  if (!slug) return '';
  
  // Handle full format: "tour-packages-in-city"
  if (slug.startsWith('tour-packages-in-')) {
    return slug.replace('tour-packages-in-', '');
  }
  
  // Handle short format: "city" (for backward compatibility)
  // This handles cases where just the city name is used
  return slug;
};

export const isValidTourCitySlug = (slug) => {
  if (!slug) return false;
  const city = parseTourCityFromSlug(slug);
  // Allow any city name - validation will be done by checking if the city exists in the database
  return city && city.length > 0;
};

export const getTourCityFromPath = (pathname) => {
  // Extract city from path like "/tour/tour-packages-in-indore" or "/tour/indore"
  const match = pathname.match(/\/tour\/(.+)/);
  if (match) {
    return parseTourCityFromSlug(match[1]);
  }
  return '';
}; 