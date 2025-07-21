import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const cityImageMap = {
  Indore: '/images/indore.jpeg',
  Bhopal: '/images/bhopal.jpeg',
  Mumbai: '/images/mumbai.jpg',
  Goa: '/images/goa.jpeg',
  Haldwani: '/images/haldwani.jpeg',
  Kathgodam: '/images/kathgodam.jpeg',
  Pithoragarh: '/images/pithoragarh.jpeg',
  Dehradun: '/images/dehradun.jpeg',
};
const cityList = [
  'Indore',
  'Bhopal',
  'Mumbai',
  'Goa',
  'Haldwani',
  'Kathgodam',
  'Pithoragarh',
  'Dehradun',
];

const bikeGif = process.env.PUBLIC_URL + '/images/bike.gif';

const Locations = () => {
  const [start, setStart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    setStart(true);
    // Show cities after bike animation duration (desktop), or immediately (mobile)
    const timer = setTimeout(() => setShowCities(true), isMobile ? 0 : 2000);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [isMobile]);

  // Animation values for mobile vs desktop
  const bikeStyle = {
    position: 'absolute',
    left: start
      ? (isMobile ? '100vw' : '100vw')
      : (isMobile ? '-120px' : '-400px'),
    transition: isMobile
      ? 'left 3.2s cubic-bezier(0.77,0,0.175,1)'
      : 'left 2.5s cubic-bezier(0.77,0,0.175,1)',
    zIndex: 2,
    display: showCities ? 'none' : 'block',
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute left-0 top-[30%] w-full -translate-y-1/2 pointer-events-none z-0 ">
          <div
            className={`text-black text-2xl pt-[150px] md:pt-0 md:text-3xl font-extrabold text-center mb-6 transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'}`}
            style={{letterSpacing: '0.02em'}}
          >
            Rent a bike in your city now
          </div>
          {/* Bike animation: only show on desktop */}
          {!isMobile && (
            <img
              src={bikeGif}
              alt="Bike running"
              className="h-[150px] md:h-[180px]"
              style={bikeStyle}
            />
          )}
          {/* City cards fade in after bike animation */}
          {/* Mobile: 2-column grid */}
          <div
            className={`grid grid-cols-2 pl-[60px] gap-7 transition-opacity duration-700 md:hidden ${showCities ? 'opacity-100' : 'opacity-0'} overflow-x-auto px-2`}
            style={{
              position: 'relative',
              top: 0,
              width: '100%',
              minHeight: '150px',
              zIndex: 3,
              pointerEvents: showCities ? 'auto' : 'none',
            }}
          >
            {cityList.map(city => (
              <div
                key={city}
                className="flex flex-col items-center bg-white rounded-lg shadow p-2 min-w-[70px] max-w-[90px] border border-gray-100 hover:bg-yellow-50 transition cursor-pointer"
                style={{ opacity: showCities ? 1 : 0, transition: 'opacity 0.7s' }}
                onClick={() => navigate(`/bikes/${city.toLowerCase()}`)}
              >
                <img
                  src={cityImageMap[city] || '/images/default-city.png'}
                  alt={city}
                  className="w-10 h-10 object-cover rounded-lg shadow"
                />
                <span className="text-xs font-semibold text-gray-700 mt-1 text-center whitespace-nowrap">{city}</span>
              </div>
            ))}
          </div>
          {/* Desktop: horizontal row */}
          <div
            className={`hidden md:flex flex-row items-center justify-center gap-8 transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'}`}
            style={{
              position: 'relative',
              top: 0,
              width: '100%',
              minHeight: '150px',
              zIndex: 3,
              pointerEvents: showCities ? 'auto' : 'none',
            }}
          >
            {cityList.map(city => (
              <div
                key={city}
                className="flex flex-col items-center bg-white rounded-lg shadow p-3 min-w-[110px] max-w-[110px] border border-gray-100 hover:bg-yellow-50 transition cursor-pointer"
                style={{ opacity: showCities ? 1 : 0, transition: 'opacity 0.7s' }}
                onClick={() => navigate(`/bikes/${city.toLowerCase()}`)}
              >
                <img
                  src={cityImageMap[city] || '/images/default-city.png'}
                  alt={city}
                  className="w-14 h-14 object-cover rounded-lg shadow"
                />
                <span className="text-sm font-semibold text-gray-700 mt-1 text-center whitespace-nowrap">{city}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Full-width banner image below city cards and bike animation */}
        <div className={`w-full flex justify-center mt-8 pt-[450px] md:pt-[300px]  transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={process.env.PUBLIC_URL + '/images/bike-banner-4.jpg'}
            alt="Bike Banner"
            className="w-full max-w-7xl object-cover rounded-lg shadow-lg"
            style={{
              height: isMobile ? '120px' : '260px',
              objectFit: 'cover',
              borderRadius: '1rem',
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Locations;
