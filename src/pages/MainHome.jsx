import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import Footer from '../components/Footer';
import { MdDashboard, MdMenu, MdClose, MdStar, MdSecurity, MdSpeed, MdSupport } from 'react-icons/md';
import { FaMotorcycle, FaTaxi, FaArrowRight, FaCheckCircle, FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';


const MainHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check login state from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
  const isLoggedIn = !!user;
  const isAdmin = user && user.isAdmin;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  // Helper function to get active link styles
  const getActiveLinkStyles = (isActive) => {
    return isActive 
      ? 'text-yellow-500 font-bold' 
      : 'text-[#111518] hover:text-yellow-500';
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Drawer content
  const drawerLinks = (
    <nav className="flex flex-col gap-4 mt-8 z-[10000]">
      <Link to="/" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/'))}`} onClick={() => setDrawerOpen(false)}>Home</Link>
      <Link to="/home" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/home'))}`} onClick={() => setDrawerOpen(false)}>Bike Home</Link>
      <Link to="/taxi" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi'))}`} onClick={() => setDrawerOpen(false)}>Taxi Home</Link>
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

  const cardData = [
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
    }
  ];

  const features = [
    {
      icon: MdSecurity,
      title: 'Safe & Secure',
      description: 'Verified drivers and well-maintained vehicles.'
    },
    {
      icon: MdSpeed,
      title: 'Quick Booking',
      description: 'Book in seconds with our easy platform.'
    },
    {
      icon: MdSupport,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance.'
    },
    {
      icon: MdStar,
      title: 'Premium Service',
      description: 'Top-notch service and professional staff.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Vehicles' },
    { number: '50+', label: 'Cities' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[10000] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/bike-rent-logo-2.png"
              alt="Bike Rent Logo"
              className="w-20 h-20 object-contain"
            />
          </Link>
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/'))}`}>Home</Link>
            <Link to="/home" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/home'))}`}>
              <FaMotorcycle className="w-4 h-4" />
              Bike Home
            </Link>
            <Link to="/taxi" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/taxi'))}`}>
              <FaTaxi className="w-4 h-4" />
              Taxi Home
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
      <section className="relative py-16 px-6 bg-gradient-to-br from-yellow-50/30 via-white to-yellow-50/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-yellow-500">Service</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional transportation solutions for all your needs
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
                onClick={() => handleCardClick(card.route)}
              >
                <Card className="relative overflow-hidden h-80 bg-white border-2 border-gray-100 hover:border-yellow-300 transition-all duration-500 shadow-lg hover:shadow-2xl">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-yellow-500/20 backdrop-blur-sm">
                        <card.icon className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                        <p className="text-yellow-200 text-sm font-medium">{card.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-200 text-sm mb-4 leading-relaxed">{card.description}</p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.features.map((feature, idx) => (
                        <span key={idx} className="bg-yellow-500/20 text-yellow-200 text-xs px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 w-fit"
                    >
                      Explore <FaArrowRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Key features that make us the best choice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group h-full"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100 h-full flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center max-w-xs">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-yellow-100 max-w-xl mx-auto">
              Join our growing community of satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center h-full"
              >
                <div className="bg-white/20 backdrop-blur-sm p-8 rounded-xl border border-white/30 h-full flex flex-col items-center justify-center shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3">{stat.number}</div>
                  <div className="text-yellow-100 font-medium text-sm leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MainHome;
