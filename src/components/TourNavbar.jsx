import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdMenu, MdClose, MdTour } from 'react-icons/md';
import { FaMotorcycle, FaTaxi } from 'react-icons/fa';

const TourNavbar = () => {
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
  useEffect(() => {
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
      <Link to="/tours" className={`text-lg font-semibold ${getActiveLinkStyles(isActiveLink('/tours'))}`} onClick={() => setDrawerOpen(false)}>Tour Home</Link>
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
          <Link to="/tours" className={`flex items-center gap-1 text-sm font-semibold ${getActiveLinkStyles(isActiveLink('/tours'))}`}>
            <MdTour className="w-4 h-4" />
            Tour Home
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
        
        {/* Mobile Navigation */}
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
  );
};

export default TourNavbar;
