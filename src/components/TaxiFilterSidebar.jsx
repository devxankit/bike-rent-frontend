import React from 'react';
import { generateTaxiCitySlug } from '../utils/slugUtils';

const TaxiFilterSidebar = ({ 
  location, 
  setLocation, 
  allLocations, 
  taxiName, 
  setTaxiName, 
  price, 
  setPrice, 
  maxPrice, 
  navigate,
  compact = false 
}) => {
  const labelClass = compact ? "font-semibold text-gray-900 text-xs mb-1.5" : "font-semibold text-gray-900 text-sm mb-1";
  const inputClass = compact ? "w-full border border-yellow-200 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white text-xs shadow-sm font-medium text-gray-900" : "w-full border border-yellow-200 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-white text-sm shadow-sm font-medium text-gray-900";
  const textInputClass = compact ? "w-full border border-yellow-200 rounded-xl p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-yellow-50 text-xs shadow-sm text-gray-900" : "w-full border border-yellow-200 rounded-xl p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition bg-yellow-50 text-sm shadow-sm text-gray-900";
  const sliderClass = compact ? "w-full accent-yellow-500 slider-thumb-glow h-1.5" : "w-full accent-yellow-500 slider-thumb-glow h-2";
  const valueClass = compact ? "font-bold text-yellow-600 text-xs min-w-[32px]" : "font-bold text-yellow-600 text-sm min-w-[40px]";
  const gapClass = compact ? "flex flex-col gap-3 mb-3" : "flex flex-col gap-1 mb-2";
  const formClass = compact ? "space-y-4 mt-2" : "space-y-4 mt-2";
  const containerClass = compact ? "flex flex-col gap-4 p-3" : "flex flex-col gap-2";
  
  // Extract unique cities from allLocations
  const uniqueCities = [...new Set(
    allLocations
      .filter(location => location && location.trim()) // Filter out empty cities
      .map(location => location.trim())
  )].sort(); // Sort alphabetically

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    const city = e.target.value.trim();
    if (city !== "") {
      // Use new slug format for navigation with any city
      const slug = generateTaxiCitySlug(city.toLowerCase());
      navigate(`/taxi/${slug}`);
    } else {
      // Navigate to main taxi page
      navigate(`/taxi`);
    }
  };

  return (
    <div className={containerClass + " z-[100010] relative"}>
      <h2 className={compact ? "text-base font-extrabold mb-3 text-gray-900 tracking-wide flex items-center gap-2" : "text-xl font-extrabold mb-2 text-gray-900 tracking-wide flex items-center gap-2"}>
        <span className={compact ? "inline-block bg-yellow-100 p-1.5 rounded-full shadow-sm" : "inline-block bg-yellow-100 p-2 rounded-full shadow-sm"}>
          <svg xmlns='http://www.w3.org/2000/svg' className={compact ? 'h-4 w-4 text-yellow-500' : 'h-5 w-5 text-yellow-500'} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
          </svg>
        </span>
        Find Your Taxi
      </h2>
      <form className={formClass}>

        {/* City Filter */}
        <div className={gapClass}>
          <label className={labelClass}>City</label>
          <select
            className={inputClass}
            value={location}
            onChange={handleLocationChange}
          >
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        {/* Taxi Name Filter */}
        <div className={gapClass}>
          <label className={labelClass + " flex items-center gap-1"}>
            <svg className={compact ? "w-3.5 h-3.5 text-yellow-500" : "w-4 h-4 text-yellow-500"} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Taxi Type
          </label>
          <input
            type="text"
            className={textInputClass}
            placeholder="e.g. Economy, Premium, Luxury..."
            value={taxiName}
            onChange={e => setTaxiName(e.target.value)}
          />
        </div>
        
        {/* Price Slider Filter */}
        <div className={gapClass}>
          <label className={labelClass + " flex items-center gap-1"}>
            <svg className={compact ? "w-3.5 h-3.5 text-yellow-500" : "w-4 h-4 text-yellow-500"} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" />
            </svg>
            Max Price (₹)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className={sliderClass}
              style={{
                background: `linear-gradient(90deg, #FDB813 ${(price / maxPrice) * 100}%, #FEF9E7 ${(price / maxPrice) * 100}%)`,
                borderRadius: '6px',
              }}
            />
            <span className={valueClass}>{price > 0 ? `₹${price}` : 'Any'}</span>
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
            <span>0</span>
            <span>{maxPrice}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaxiFilterSidebar;
