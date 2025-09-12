import React, { useState, useRef } from 'react';
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { FaTaxi, FaCar, FaMapMarkerAlt, FaRegClock, FaHandHoldingUsd, FaCity, FaLandmark, FaMonument, FaBuilding, FaUniversity, FaRegBuilding, FaRegHospital, FaRegSmile, FaRegSun, FaRegStar, FaRegFlag } from 'react-icons/fa';

const TaxiNavBar = ({ onFilterToggle }) => {
  // Check login state from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
  const isLoggedIn = !!user;
  const isAdmin = user && user.isAdmin;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const location = useLocation();

  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (path === '/home') {
      return location.pathname === '/home';
    }
    if (path === '/bikes') {
      return location.pathname.startsWith('/bikes');
    }
    if (path === '/taxi') {
      return location.pathname.startsWith('/taxi');
    }
    if (path === '/blogs') {
      return location.pathname.startsWith('/blogs');
    }
    if (path === '/admin/dashboard') {
      return location.pathname.startsWith('/admin');
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to get active link styles
  const getActiveLinkStyles = (isActive) => {
    return isActive 
      ? 'text-yellow-500 font-bold' 
      : 'text-[#111518] hover:text-yellow-500';
  };

  // Determine dropdown labels based on current route
  let servicesDropdownLabel = 'Services';
  if (location.pathname.startsWith('/home')) servicesDropdownLabel = 'Bike Rent';
  else if (location.pathname.startsWith('/taxi')) servicesDropdownLabel = 'Taxi Service';
  else if (location.pathname.startsWith('/tours') || location.pathname.startsWith('/tour-home') || location.pathname.startsWith('/tour-details')) servicesDropdownLabel = 'Tour Packages';

  let aboutDropdownLabel = 'About';
  if (location.pathname.startsWith('/taxi/about')) aboutDropdownLabel = 'About';
  else if (location.pathname.startsWith('/taxi/contact')) aboutDropdownLabel = 'Contact Us';
  else if (location.pathname.startsWith('/taxi/locations')) aboutDropdownLabel = 'Locations';
  else if (location.pathname.startsWith('/taxi/privacy-policy')) aboutDropdownLabel = 'Privacy Policy';
  else if (location.pathname.startsWith('/taxi/terms-and-conditions')) aboutDropdownLabel = 'Terms&Conditions';

  // Close dropdowns on click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
    }
    if (servicesDropdownOpen || aboutDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdownOpen, aboutDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Drawer content
  const drawerLinks = (
    <nav className="flex flex-col gap-4 mt-8 z-[10000]">
      <Link to="/" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/'))}`} onClick={() => setDrawerOpen(false)}>Home</Link>
      {/* Dropdown links as normal links in drawer */}
      <Link to="/home" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/home'))}`} onClick={() => setDrawerOpen(false)}>Bike Rent</Link>
      <Link to="/taxi" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi'))}`} onClick={() => setDrawerOpen(false)}>Taxi Service</Link>
      <Link to="/tours" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/tours'))}`} onClick={() => setDrawerOpen(false)}>Tour Packages</Link>
      <Link to="/taxi/locations" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi/locations'))}`} onClick={() => setDrawerOpen(false)}>Locations</Link>
      <Link to="/taxi/about" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi/about'))}`} onClick={() => setDrawerOpen(false)}>About</Link>
      <Link to="/taxi/contact" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi/contact'))}`} onClick={() => setDrawerOpen(false)}>Contact Us</Link>
      <Link to="/taxi/privacy-policy" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi/privacy-policy'))}`} onClick={() => setDrawerOpen(false)}>Privacy Policy</Link>
      <Link to="/taxi/terms-and-conditions" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/taxi/terms-and-conditions'))}`} onClick={() => setDrawerOpen(false)}>Terms&Conditions</Link>
      <Link to="/blogs" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/blogs'))}`} onClick={() => setDrawerOpen(false)}>Blog</Link>
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[10000]">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/taxi" className="flex items-center gap-2">
          <img
            src="/images/bike-rent-logo-2.png"
            alt="Taxi Service Logo"
            className="w-20 h-20 object-contain"
          />
        </Link>
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/'))}`}>Home</Link>
          
          {/* Services Dropdown */}
          <div className="relative" ref={servicesDropdownRef}>
            <button
              className={`text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/home') || isActiveLink('/taxi') || isActiveLink('/tours'))} flex items-center gap-1 focus:outline-none px-3 py-1 rounded transition-all ${servicesDropdownOpen ? 'bg-yellow-50' : ''}`}
              type="button"
              onClick={() => setServicesDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={servicesDropdownOpen}
            >
              {servicesDropdownLabel}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {servicesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-20">
                <Link to="/home" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/home'))} hover:bg-yellow-50`} onClick={() => setServicesDropdownOpen(false)}>Bike Rent</Link>
                <Link to="/taxi" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/taxi'))} hover:bg-yellow-50`} onClick={() => setServicesDropdownOpen(false)}>Taxi Service</Link>
                <Link to="/tours" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/tours'))} hover:bg-yellow-50`} onClick={() => setServicesDropdownOpen(false)}>Tour Packages</Link>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div className="relative" ref={aboutDropdownRef}>
            <button
              className={`text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/taxi/locations') || isActiveLink('/taxi/about') || isActiveLink('/taxi/contact') || isActiveLink('/taxi/privacy-policy') || isActiveLink('/taxi/terms-and-conditions'))} flex items-center gap-1 focus:outline-none px-3 py-1 rounded transition-all ${aboutDropdownOpen ? 'bg-yellow-50' : ''}`}
              type="button"
              onClick={() => setAboutDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={aboutDropdownOpen}
            >
              {aboutDropdownLabel}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {aboutDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-20">
                <Link to="/taxi/locations" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/taxi/locations'))} hover:bg-yellow-50`} onClick={() => setAboutDropdownOpen(false)}>Locations</Link>
                <Link to="/taxi/about" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/taxi/about'))} hover:bg-yellow-50`} onClick={() => setAboutDropdownOpen(false)}>About</Link>
                <Link to="/taxi/contact" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/taxi/contact'))} hover:bg-yellow-50`} onClick={() => setAboutDropdownOpen(false)}>Contact Us</Link>
                <Link to="/taxi/privacy-policy" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/taxi/privacy-policy'))} hover:bg-yellow-50`} onClick={() => setAboutDropdownOpen(false)}>Privacy Policy</Link>
                <Link to="/taxi/terms-and-conditions" className={`block px-4 py-2 text-sm ${getActiveLinkStyles(isActiveLink('/taxi/terms-and-conditions'))} hover:bg-yellow-50`} onClick={() => setAboutDropdownOpen(false)}>Terms&Conditions</Link>
              </div>
            )}
          </div>
          
          <Link to="/blogs" className={`text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/blogs'))}`}>Blog</Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/admin/dashboard'))}`}>
              <MdDashboard className="w-5 h-5" /> Dashboard
            </Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="bg-yellow-400 text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-yellow-500">Login</Link>
              <Link to="/signup" className="bg-gray-100 text-[#111518] text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-gray-200">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-yellow-500">Logout</button>
          )}
        </nav>
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {location.pathname.startsWith('/taxi/') && location.pathname !== '/taxi' && (
            <button
              className="flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={onFilterToggle}
              aria-label="Open filter"
            >
              <FiFilter className="w-5 h-5 text-yellow-500" />
            </button>
          )}
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
  );
};

export default TaxiNavBar;
