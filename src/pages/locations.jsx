import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const bikeGif = process.env.PUBLIC_URL + '/images/bike.gif';

const Locations = () => {
  const [start, setStart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [cities, setCities] = useState([]);
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

  useEffect(() => {
    api.get('/api/cities')
      .then(res => {
        const activeCities = (res.data || []).filter(city => city.isActive);
        setCities(activeCities);
      })
      .catch(err => {
        setCities([]);
        console.error('Error fetching cities:', err);
      });
  }, []);

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
          {/* Mobile: responsive grid */}
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 gap-3 transition-opacity duration-700 md:hidden ${showCities ? 'opacity-100' : 'opacity-0'} px-4 max-w-md mx-auto`}
            style={{
              position: 'relative',
              top: 0,
              width: '100%',
              minHeight: '150px',
              zIndex: 3,
              pointerEvents: showCities ? 'auto' : 'none',
            }}
          >
            {cities.map(city => (
              <div
                key={city._id || city.slug || city.name}
                className="flex flex-col items-center bg-white rounded-lg shadow p-2 border border-gray-100 hover:bg-yellow-50 transition cursor-pointer"
                style={{ opacity: showCities ? 1 : 0, transition: 'opacity 0.7s' }}
                onClick={() => navigate(`/bikes/${city.slug || city.name.toLowerCase()}`)}
              >
                <img
                  src={city.image || `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMTIgMTZIMjhWMTJIMTJWMjRIMjhWMjBIMTJWMjRIMjgiIHN0cm9rZT0iIzk5QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=`}
                  alt={city.name}
                  className="w-10 h-10 object-cover rounded-lg shadow"
                  onError={e => { 
                    e.target.onerror = null; 
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMTIgMTZIMjhWMTJIMTJWMjRIMjhWMjBIMTJWMjRIMjgiIHN0cm9rZT0iIzk5QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo='; 
                  }}
                />
                <span className="text-xs font-semibold text-gray-700 mt-1 text-center whitespace-nowrap">{city.name}</span>
              </div>
            ))}
          </div>
          {/* Desktop: horizontal rows with 8 cities per row */}
          <div
            className={`hidden md:flex md:flex-wrap md:justify-center gap-8 transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'} px-4 max-w-6xl mx-auto`}
            style={{
              position: 'relative',
              top: 0,
              width: '100%',
              minHeight: '90px',
              zIndex: 3,
              pointerEvents: showCities ? 'auto' : 'none',
            }}
          >
            {cities.map(city => (
              <div
                key={city._id || city.slug || city.name}
                className="flex flex-col items-center bg-white rounded-lg shadow p-2 w-[90px] border border-gray-100 hover:bg-yellow-50 transition cursor-pointer"
                style={{ opacity: showCities ? 1 : 0, transition: 'opacity 0.7s' }}
                onClick={() => navigate(`/bikes/${city.slug || city.name.toLowerCase()}`)}
              >
                <img
                  src={city.image || `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMTQgMTlIMzRWMThIMTRWMjZIMzRWMjVIMTRWMjZIMzQiIHN0cm9rZT0iIzk5QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=`}
                  alt={city.name}
                  className="w-12 h-12 object-cover rounded-lg shadow"
                  onError={e => { 
                    e.target.onerror = null; 
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNMTQgMTlIMzRWMThIMTRWMjZIMzRWMjVIMTRWMjZIMzQiIHN0cm9rZT0iIzk5QTNBRiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo='; 
                  }}
                />
                <span className="text-xs font-semibold text-gray-700 mt-1 text-center whitespace-nowrap">{city.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Full-width banner image below city cards and bike animation */}
        <div className={`w-full flex justify-center mt-8 pt-[450px] md:pt-[350px] lg:pt-[300px] transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'}`}>
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
