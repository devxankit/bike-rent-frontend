// Simple test file for slug utilities
import { generateCitySlug, parseCityFromSlug, isValidCitySlug, getCityFromPath, generateBikesSlug } from './slugUtils';

// Test cases
console.log('Testing slug utilities...');

// Test generateCitySlug
console.log('generateCitySlug("indore") =', generateCitySlug('indore'));
console.log('generateCitySlug("Bhopal") =', generateCitySlug('Bhopal'));

// Test parseCityFromSlug
console.log('parseCityFromSlug("indore-rent-bike-in-indore") =', parseCityFromSlug('indore-rent-bike-in-indore'));
console.log('parseCityFromSlug("bhopal-rent-bike-in-bhopal") =', parseCityFromSlug('bhopal-rent-bike-in-bhopal'));

// Test isValidCitySlug
console.log('isValidCitySlug("indore-rent-bike-in-indore") =', isValidCitySlug('indore-rent-bike-in-indore'));
console.log('isValidCitySlug("invalid-slug") =', isValidCitySlug('invalid-slug'));

// Test getCityFromPath
console.log('getCityFromPath("/bikes/indore-rent-bike-in-indore") =', getCityFromPath('/bikes/indore-rent-bike-in-indore'));

// Test generateBikesSlug
console.log('generateBikesSlug() =', generateBikesSlug());

console.log('All tests completed!'); 