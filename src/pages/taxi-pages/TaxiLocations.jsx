import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TaxiNavBar from '../../components/taxi-components/TaxiNavBar';
import FooterTaxi from '../../components/FooterTaxi';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const taxiGif = process.env.PUBLIC_URL + '/images/bike.gif';

const TaxiLocations = () => {
  const [start, setStart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCities, setShowCities] = useState(false);
  const [taxiCities, setTaxiCities] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    setStart(true);
    // Show cities after taxi animation duration (desktop), or immediately (mobile)
    const timer = setTimeout(() => setShowCities(true), isMobile ? 0 : 2000);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [isMobile]);

  useEffect(() => {
    api.get('/api/taxi-cities')
      .then(res => {
        const activeCities = (res.data || []).filter(city => city.isActive);
        setTaxiCities(activeCities);
      })
      .catch(err => {
        setTaxiCities([]);
        console.error('Error fetching taxi cities:', err);
      });
  }, []);

  // Animation values for mobile vs desktop
  const taxiStyle = {
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
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Our Taxi Locations | BookYourRide Taxi Services Across Cities</title>
        <meta name="title" content="Our Taxi Locations | BookYourRide Taxi Services Across Cities" />
        <meta name="description" content="Where do you want to travel? Discover BookYourRide taxi services in Indore, Bhopal, Mumbai, Goa & beyond. Comfortable rides start here with trusted taxi services across multiple cities." />
        <meta name="keywords" content="taxi service locations, taxi booking Indore, taxi service Bhopal, taxi rental Mumbai, taxi service Goa, cab service locations, taxi hire cities" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/taxi/locations" />
        <meta property="og:title" content="Our Taxi Locations | BookYourRide Taxi Services Across Cities" />
        <meta property="og:description" content="Where do you want to travel? Discover BookYourRide taxi services in Indore, Bhopal, Mumbai, Goa & beyond. Comfortable rides start here with trusted taxi services across multiple cities." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/taxi/locations" />
        <meta property="twitter:title" content="Our Taxi Locations | BookYourRide Taxi Services Across Cities" />
        <meta property="twitter:description" content="Where do you want to travel? Discover BookYourRide taxi services in Indore, Bhopal, Mumbai, Goa & beyond. Comfortable rides start here with trusted taxi services across multiple cities." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/taxi/locations" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Our Taxi Locations | BookYourRide Taxi Services Across Cities",
            "description": "Where do you want to travel? Discover BookYourRide taxi services in Indore, Bhopal, Mumbai, Goa & beyond. Comfortable rides start here with trusted taxi services across multiple cities.",
            "url": "https://www.bookyourride.in/taxi/locations",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 22.7196,
                  "longitude": 75.8577
                },
                "geoRadius": "500000"
              }
            }
          })}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TaxiNavBar />
        <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute left-0 top-[30%] w-full -translate-y-1/2 pointer-events-none z-0 ">
            <div
              className={`text-black text-2xl pt-[150px] md:pt-0 md:text-3xl font-extrabold text-center mb-6 transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'}`}
              style={{letterSpacing: '0.02em'}}
            >
              Book a taxi in your city now
            </div>
            {/* Taxi animation: only show on desktop */}
            {!isMobile && (
              <img
                src={taxiGif}
                alt="Taxi service"
                className="h-[150px] md:h-[180px]"
                style={taxiStyle}
              />
            )}
            {/* City cards fade in after taxi animation */}
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
              {taxiCities.map(city => (
                <div
                  key={city._id || city.slug || city.name}
                  className="flex flex-col items-center bg-white rounded-lg shadow p-2 border border-gray-100 hover:bg-yellow-50 transition cursor-pointer"
                  style={{ opacity: showCities ? 1 : 0, transition: 'opacity 0.7s' }}
                  onClick={() => navigate(`/taxi/${city.slug || city.name.toLowerCase().replace(/\s+/g, '-')}`)}
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
              {taxiCities.map(city => (
                <div
                  key={city._id || city.slug || city.name}
                  className="flex flex-col items-center bg-white rounded-lg shadow p-2 w-[90px] border border-gray-100 hover:bg-yellow-50 transition cursor-pointer"
                  style={{ opacity: showCities ? 1 : 0, transition: 'opacity 0.7s' }}
                  onClick={() => navigate(`/taxi/${city.slug || city.name.toLowerCase().replace(/\s+/g, '-')}`)}
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
          {/* Full-width banner image below city cards and taxi animation */}
          <div className={`w-full flex justify-center mt-8 pt-[450px] md:pt-[350px] lg:pt-[300px] transition-opacity duration-700 ${showCities ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={process.env.PUBLIC_URL + '/images/bike-banner-4.jpg'}
              alt="Taxi Service Banner"
              className="w-full max-w-7xl object-cover rounded-lg shadow-lg"
              style={{
                height: isMobile ? '120px' : '260px',
                objectFit: 'cover',
                borderRadius: '1rem',
              }}
            />
          </div>
        </main>
        <FooterTaxi />
      </div>
    </>
  );
};

export default TaxiLocations;
