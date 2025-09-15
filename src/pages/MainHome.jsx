import React, { useState, useRef, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md';
import { FaMotorcycle, FaTaxi, FaArrowRight } from 'react-icons/fa';
import { MdTour } from 'react-icons/md';
import SEOHead from '../components/SEOHead';

// Lazy load heavy components
const LazyImage = lazy(() => import('../components/LazyImage'));


const MainHome = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Memoize user state to prevent unnecessary re-renders
  const userState = useMemo(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {}
    return {
      user,
      isLoggedIn: !!user,
      isAdmin: user && user.isAdmin
    };
  }, []);

  const { isLoggedIn, isAdmin } = userState;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Memoize helper functions
  const isActiveLink = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  const getActiveLinkStyles = useCallback((isActive) => {
    return isActive 
      ? 'text-yellow-500 font-bold' 
      : 'text-[#111518] hover:text-yellow-500';
  }, []);

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }, []);

  // Drawer content
  const drawerLinks = (
    <nav className="flex flex-col gap-4 mt-8 z-[10000]">
      <Link to="/" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/'))}`} onClick={() => setDrawerOpen(false)}>Home</Link>
      <Link to="/home" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/home'))}`} onClick={() => setDrawerOpen(false)}>Bike Rent</Link>
      <Link to="/taxi" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi'))}`} onClick={() => setDrawerOpen(false)}>Taxi Service</Link>
      <Link to="/tours" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/tours'))}`} onClick={() => setDrawerOpen(false)}>Tour Packages</Link>
      {isAdmin && (
        <Link to="/admin/dashboard" className={`flex items-center gap-2 text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/admin/dashboard'))}`} onClick={() => setDrawerOpen(false)}>
          <MdDashboard className="w-5 h-5" /> Dashboard
        </Link>
      )}
      {!isLoggedIn ? (
        <>
          <Link to="/login" className="bg-yellow-500 text-white text-base font-semibold rounded-md px-4 py-1.5 hover:bg-yellow-600 text-center transition-all" onClick={() => setDrawerOpen(false)}>Login</Link>
          <Link to="/signup" className="bg-gray-100 text-[#111518] text-base font-semibold rounded-md px-4 py-1.5 hover:bg-gray-200 text-center transition-all" onClick={() => setDrawerOpen(false)}>Sign Up</Link>
        </>
      ) : (
        <button onClick={() => { setDrawerOpen(false); handleLogout(); }} className="bg-red-500 text-white text-base font-semibold rounded-md px-4 py-1.5 hover:bg-yellow-500 text-center transition-all">Logout</button>
      )}
    </nav>
  );

  // Memoize card data to prevent recreation on every render
  const cardData = useMemo(() => [
    {
      id: 1,
      title: 'Taxi Service',
      subtitle: 'Professional & Reliable',
      image: '/images/taxi-bg-1.png',
      route: '/taxi',
      description: 'Book comfortable taxi rides with professional drivers.',
      features: ['24/7 Available', 'Safe & Secure', 'Affordable'],
      icon: FaTaxi,
      color: 'from-yellow-400 to-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      id: 2,
      title: 'Bike Rental',
      subtitle: 'Freedom to Explore',
      image: '/images/bg-3.png',
      route: '/home',
      description: 'Rent premium bikes and explore at your own pace.',
      features: ['Premium Bikes', 'Easy Booking', 'Well Maintained'],
      icon: FaMotorcycle,
      color: 'from-yellow-400 to-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      id: 3,
      title: 'Tour Packages',
      subtitle: 'Explore & Discover',
      image: '/images/tour.jpeg',
      route: '/tours',
      description: 'Discover amazing destinations with our curated tour packages.',
      features: ['Guided Tours', 'Expert Guides', 'Memorable Experiences'],
      icon: MdTour,
      color: 'from-yellow-400 to-yellow-500',
      textColor: 'text-yellow-500'
    }
  ], []);


  const handleCardClick = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEOHead
        title="Book Your Taxi, Bike & Tour Packages | BookyourRide.Com"
        description="Book taxis, bikes, and custom tour packages with transparent pricing, 24/7 support, and easy online booking at BookyourRide.com. Reserve now."
        keywords="taxi booking, bike rental, tour packages, online booking, 24/7 support, transparent pricing, BookyourRide"
        url="https://www.bookyourride.in/"
        image="https://www.bookyourride.in/images/bike-rent-logo-2.png"
        type="website"
        schemaType="WebSite"
      />
      
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[10000] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/bike-rent-logo-2.png"
              alt="Bike Rent Logo"
              className="w-20 h-20 object-contain"
              loading="eager"
              width="80"
              height="80"
            />
          </Link>
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/'))}`}>Home</Link>
            <Link to="/home" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/home'))}`}>
              <FaMotorcycle className="w-4 h-4" />
              Bike Rent
            </Link>
            <Link to="/taxi" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/taxi'))}`}>
              <FaTaxi className="w-4 h-4" />
              Taxi Service
            </Link>
            <Link to="/tours" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/tours'))}`}>
              <MdTour className="w-4 h-4" />
              Tour Packages
            </Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/admin/dashboard'))}`}>
                <MdDashboard className="w-5 h-5" /> Dashboard
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="bg-yellow-400 text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-yellow-500 transition-all">Login</Link>
                <Link to="/signup" className="bg-gray-100 text-[#111518] text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-gray-200 transition-all">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="bg-red-500 text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-yellow-500 transition-all">Logout</button>
            )}
          </nav>
          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/home" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/home'))} px-2 py-1 rounded transition-all`}>
              <FaMotorcycle className="w-4 h-4 text-yellow-500" />
            </Link>
            <Link to="/taxi" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/taxi'))} px-2 py-1 rounded transition-all`}>
              <FaTaxi className="w-4 h-4 text-yellow-500" />
            </Link>
            <Link to="/tours" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/tours'))} px-2 py-1 rounded transition-all`}>
              <MdTour className="w-4 h-4 text-yellow-500" />
            </Link>
            <button
              className="flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <MdMenu className="w-7 h-7 text-[#111518]" />
            </button>
          </div>
          {/* Drawer Overlay */}
          <div
            className={`fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setDrawerOpen(false)}
          ></div>
          {/* Drawer */}
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200">
              <span className="font-bold text-lg text-[#111518]">Menu</span>
              <button
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <MdClose className="w-6 h-6 text-[#111518]" />
              </button>
            </div>
            <div className="px-4 pb-6">{drawerLinks}</div>
          </aside>
        </div>
      </header>

      {/* Hero Section with Cards */}
      <section className="relative pt-4 md:pt-6 pb-0 md:pb-2  md:py-6 px-6 bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20">
        <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center mb-4 md:mb-12"
            >
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-0 md:mb-4 pb-0 md:pb-2">
              Choose Your <span className="text-yellow-500">Service</span>
            </h1>
            
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto ">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
                onClick={() => handleCardClick(card.route)}
              >
                <Card className="relative overflow-hidden w-[300px] h-[150px] md:w-full md:h-80 bg-white border-2 border-gray-100 hover:border-yellow-300 transition-all duration-500 shadow-lg hover:shadow-2xl mx-auto ">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Suspense fallback={
                      <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400">Loading...</div>
                      </div>
                    }>
                      <LazyImage 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        width="400"
                        height="320"
                      />
                    </Suspense>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6">
                    <div className="flex items-end justify-between gap-3">
                      {/* Left side - Icon, Title, Subtitle */}
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-2 md:p-2 rounded-full bg-yellow-500/20 backdrop-blur-sm">
                          <card.icon className="w-8 h-8 md:w-6 md:h-6 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-xl font-bold text-white">{card.title}</h3>
                        </div>
                      </div>
                      
                      {/* Right side - Explore button */}
                      <motion.button
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center gap-1 md:gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full font-semibold text-xs md:text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Explore
                        <FaArrowRight className="w-2 h-2 md:w-3 md:h-3" />
                      </motion.button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

MainHome.displayName = 'MainHome';

export default MainHome;
