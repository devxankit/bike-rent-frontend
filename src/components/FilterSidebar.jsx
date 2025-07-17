import React from 'react';

const FilterSidebar = ({ location, setLocation, allLocations, bikeName, setBikeName, price, setPrice, maxPrice, navigate, compact }) => {
  const labelClass = compact ? "font-semibold text-gray-900 text-xs mb-1.5" : "font-semibold text-gray-900 text-sm mb-1";
  const inputClass = compact ? "w-full border border-red-200 rounded-lg p-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition bg-white text-xs shadow-sm font-medium text-gray-900" : "w-full border border-red-200 rounded-lg p-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition bg-white text-sm shadow-sm font-medium text-gray-900";
  const textInputClass = compact ? "w-full border border-red-200 rounded-xl p-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition bg-red-50 text-xs shadow-sm text-gray-900" : "w-full border border-red-200 rounded-xl p-2 focus:ring-2 focus:ring-red-400 focus:border-red-400 transition bg-red-50 text-sm shadow-sm text-gray-900";
  const sliderClass = compact ? "w-full accent-red-500 slider-thumb-glow h-1.5" : "w-full accent-red-500 slider-thumb-glow h-2";
  const valueClass = compact ? "font-bold text-red-600 text-xs min-w-[32px]" : "font-bold text-red-600 text-sm min-w-[40px]";
  const gapClass = compact ? "flex flex-col gap-3 mb-3" : "flex flex-col gap-1 mb-2";
  const formClass = compact ? "space-y-4 mt-2" : "space-y-4 mt-2";
  const containerClass = compact ? "flex flex-col gap-4 p-3" : "flex flex-col gap-2";
  return (
    <div className={containerClass}>
      <h2 className={compact ? "text-base font-extrabold mb-3 text-gray-900 tracking-wide flex items-center gap-2" : "text-xl font-extrabold mb-2 text-gray-900 tracking-wide flex items-center gap-2"}>
        <span className={compact ? "inline-block bg-red-100 p-1.5 rounded-full shadow-sm" : "inline-block bg-red-100 p-2 rounded-full shadow-sm"}><svg xmlns='http://www.w3.org/2000/svg' className={compact ? 'h-4 w-4 text-red-500' : 'h-5 w-5 text-red-500'} fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z' /></svg></span>
        Find Your Ride
      </h2>
      <form className={formClass}>
        {/* City Filter */}
        <div className={gapClass}>
          <label className={labelClass}>City</label>
          <select
            className={inputClass}
            value={location}
            onChange={e => {
              setLocation(e.target.value);
              const city = e.target.value.trim().toLowerCase();
              if (["indore", "bhopal", "mumbai", "goa", "haldwani", "kathgodam", "pithoragarh", "dehradun"].includes(city)) {
                navigate(`/bikes/${city}`);
              } else if (city === "") {
                navigate('/bikes');
              }
            }}
          >
            <option value="">All Cities</option>
            {["Indore", "Bhopal", "Mumbai", "Goa", "Haldwani", "Kathgodam", "Pithoragarh", "Dehradun"].map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        {/* Bike Name Filter */}
        <div className={gapClass}>
          <label className={labelClass + " flex items-center gap-1"}>
            <svg className={compact ? "w-3.5 h-3.5 text-red-500" : "w-4 h-4 text-red-500"} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Bike Name
          </label>
          <input
            type="text"
            className={textInputClass}
            placeholder="e.g. Honda, Yamaha..."
            value={bikeName}
            onChange={e => setBikeName(e.target.value)}
          />
        </div>
        {/* Price Slider Filter */}
        <div className={gapClass}>
          <label className={labelClass + " flex items-center gap-1"}>
            <svg className={compact ? "w-3.5 h-3.5 text-red-500" : "w-4 h-4 text-red-500"} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 16v-4" /></svg>
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
                background: `linear-gradient(90deg, #ef4444 ${(price / maxPrice) * 100}%, #fee2e2 ${(price / maxPrice) * 100}%)`,
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

export default FilterSidebar; 