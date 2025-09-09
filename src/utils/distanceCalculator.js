/**
 * Distance Calculator Utility
 * Uses Google Maps Distance Matrix API to calculate distances between two points
 * Includes 24-hour caching to avoid repeated API calls
 */

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CACHE_KEY_PREFIX = 'distance_cache_';

/**
 * Generate cache key from coordinates
 * @param {Object} pickup - {lat, lng}
 * @param {Object} drop - {lat, lng}
 * @returns {string} Cache key
 */
const generateCacheKey = (pickup, drop) => {
  const pickupStr = `${pickup.lat.toFixed(6)},${pickup.lng.toFixed(6)}`;
  const dropStr = `${drop.lat.toFixed(6)},${drop.lng.toFixed(6)}`;
  return `${CACHE_KEY_PREFIX}${pickupStr}_${dropStr}`;
};

/**
 * Get cached distance data
 * @param {string} cacheKey - Cache key
 * @returns {Object|null} Cached data or null
 */
const getCachedDistance = (cacheKey) => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;
    
    const data = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

/**
 * Cache distance data
 * @param {string} cacheKey - Cache key
 * @param {Object} data - Data to cache
 */
const setCachedDistance = (cacheKey, data) => {
  try {
    const cacheData = {
      ...data,
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching distance data:', error);
  }
};

/**
 * Calculate distance using Google Maps Distance Matrix API
 * @param {Object} pickup - {lat, lng}
 * @param {Object} drop - {lat, lng}
 * @returns {Promise<Object>} Distance data
 */
const calculateDistance = async (pickup, drop) => {
  // Check if Google Maps is loaded
  if (!window.google || !window.google.maps) {
    throw new Error('Google Maps API not loaded');
  }

  const service = new window.google.maps.DistanceMatrixService();
  
  return new Promise((resolve, reject) => {
    service.getDistanceMatrix(
      {
        origins: [pickup],
        destinations: [drop],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status === window.google.maps.DistanceMatrixStatus.OK) {
          const element = response.rows[0].elements[0];
          
          if (element.status === 'OK') {
            const distance = element.distance.value / 1000; // Convert to kilometers
            const duration = element.duration.value; // Duration in seconds
            
            const result = {
              distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
              duration: duration,
              status: 'OK'
            };
            
            resolve(result);
          } else {
            reject(new Error(`Distance calculation failed: ${element.status}`));
          }
        } else {
          reject(new Error(`Distance Matrix API error: ${status}`));
        }
      }
    );
  });
};

/**
 * Get distance between two points with caching
 * @param {Object} pickup - {lat, lng}
 * @param {Object} drop - {lat, lng}
 * @returns {Promise<Object>} Distance data
 */
export const getDistance = async (pickup, drop) => {
  // Validate input coordinates
  if (!pickup || !drop || 
      typeof pickup.lat !== 'number' || typeof pickup.lng !== 'number' ||
      typeof drop.lat !== 'number' || typeof drop.lng !== 'number') {
    throw new Error('Invalid coordinates provided');
  }

  const cacheKey = generateCacheKey(pickup, drop);
  
  // Try to get from cache first
  const cached = getCachedDistance(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Calculate distance using Google Maps API
    const result = await calculateDistance(pickup, drop);
    
    // Cache the result
    setCachedDistance(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Distance calculation failed:', error);
    throw error;
  }
};

/**
 * Calculate taxi price based on distance and trip type
 * @param {number} distance - Distance in kilometers
 * @param {number} pricePerKm - Price per kilometer
 * @param {string} tripType - Trip type ('one-way', 'round-trip', 'airport-drop', 'airport-pickup')
 * @returns {Object} Price calculation details
 */
export const calculateTaxiPrice = (distance, pricePerKm, tripType) => {
  if (!distance || !pricePerKm || distance <= 0 || pricePerKm <= 0) {
    throw new Error('Invalid distance or price per km');
  }

  let multiplier = 1;
  let tripTypeLabel = 'One Way';

  switch (tripType) {
    case 'round-trip':
      multiplier = 2;
      tripTypeLabel = 'Return Trip';
      break;
    case 'one-way':
    case 'airport-drop':
    case 'airport-pickup':
      multiplier = 1;
      tripTypeLabel = 'One Way';
      break;
    default:
      multiplier = 1;
      tripTypeLabel = 'One Way';
  }

  const totalDistance = distance * multiplier;
  const totalPrice = totalDistance * pricePerKm;

  return {
    distance: distance,
    pricePerKm: pricePerKm,
    tripType: tripType,
    tripTypeLabel: tripTypeLabel,
    multiplier: multiplier,
    totalDistance: totalDistance,
    totalPrice: Math.round(totalPrice),
    calculation: `${distance}km × ₹${pricePerKm}/km${multiplier > 1 ? ' × 2 (Return Trip)' : ''} = ₹${Math.round(totalPrice)}`
  };
};

/**
 * Clear all distance cache
 */
export const clearDistanceCache = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing distance cache:', error);
  }
};

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
export const getCacheStats = () => {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_KEY_PREFIX));
    
    let validEntries = 0;
    let expiredEntries = 0;
    const now = Date.now();
    
    cacheKeys.forEach(key => {
      const cached = localStorage.getItem(key);
      if (cached) {
        try {
          const data = JSON.parse(cached);
          if (now - data.timestamp <= CACHE_DURATION) {
            validEntries++;
          } else {
            expiredEntries++;
          }
        } catch (error) {
          expiredEntries++;
        }
      }
    });
    
    return {
      totalEntries: cacheKeys.length,
      validEntries,
      expiredEntries,
      cacheDuration: CACHE_DURATION
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { totalEntries: 0, validEntries: 0, expiredEntries: 0, cacheDuration: CACHE_DURATION };
  }
};
