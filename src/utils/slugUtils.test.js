// Simple test file for slug utilities
import { generateCitySlug, parseCityFromSlug, isValidCitySlug, getCityFromPath, generateBikesSlug } from './slugUtils';

// Test cases
console.log('Testing slug utilities...');

// Test generateCitySlug
console.log('generateCitySlug("indore") =', generateCitySlug('indore'));
console.log('generateCitySlug("Bhopal") =', generateCitySlug('Bhopal'));

// Test parseCityFromSlug - New format
console.log('parseCityFromSlug("bike-rent-in-indore") =', parseCityFromSlug('bike-rent-in-indore'));
console.log('parseCityFromSlug("bike-rent-in-bhopal") =', parseCityFromSlug('bike-rent-in-bhopal'));

// Test parseCityFromSlug - Old format (backward compatibility)
console.log('parseCityFromSlug("indore-rent-bike-in-indore") =', parseCityFromSlug('indore-rent-bike-in-indore'));
console.log('parseCityFromSlug("bhopal-rent-bike-in-bhopal") =', parseCityFromSlug('bhopal-rent-bike-in-bhopal'));

// Test isValidCitySlug - New format
console.log('isValidCitySlug("bike-rent-in-indore") =', isValidCitySlug('bike-rent-in-indore'));
console.log('isValidCitySlug("invalid-slug") =', isValidCitySlug('invalid-slug'));

// Test getCityFromPath - New format
console.log('getCityFromPath("/bikes/bike-rent-in-indore") =', getCityFromPath('/bikes/bike-rent-in-indore'));
// Test getCityFromPath - Old format (backward compatibility)
console.log('getCityFromPath("/bikes/indore-rent-bike-in-indore") =', getCityFromPath('/bikes/indore-rent-bike-in-indore'));

// Test generateBikesSlug
console.log('generateBikesSlug() =', generateBikesSlug());

console.log('All tests completed!'); 