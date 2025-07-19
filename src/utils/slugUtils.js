// Utility functions for handling city slugs
export const generateCitySlug = (cityName) => {
  if (!cityName) return '';
  const city = cityName.trim().toLowerCase();
  return `${city}-rent-bike-in-${city}`;
};

export const parseCityFromSlug = (slug) => {
  if (!slug) return '';
  // Extract city name from slug format: "city-rent-bike-in-city"
  const parts = slug.split('-rent-bike-in-');
  if (parts.length === 2 && parts[0] === parts[1]) {
    return parts[0];
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
  // Extract city from path like "/bikes/indore-rent-bike-in-indore"
  const match = pathname.match(/\/bikes\/(.+)/);
  if (match) {
    return parseCityFromSlug(match[1]);
  }
  return '';
};

export const generateBikesSlug = () => {
  return 'rent-bike-in-all-cities';
}; 