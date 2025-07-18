import React, { useState } from 'react';
import { MdDashboard, MdMenu, MdClose } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { FaMoneyBillWave, FaMotorcycle, FaRegClock, FaHandHoldingUsd, FaCity, FaLandmark, FaMonument, FaBuilding, FaUniversity, FaRegBuilding, FaMapMarkerAlt, FaRegHospital, FaRegSmile, FaRegSun, FaRegStar, FaRegFlag } from 'react-icons/fa';

const DashboardNavbar = ({ onFilterToggle }) => {
  // Check login state from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
  const isLoggedIn = !!user;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Drawer content
  const drawerLinks = (
    <nav className="flex flex-col gap-4 mt-8">
      <Link to="/" className="text-lg font-semibold text-[#111518] hover:text-yellow-600" onClick={() => setDrawerOpen(false)}>Home</Link>
      <Link to="/bikes" className="text-lg font-semibold text-[#111518] hover:text-yellow-600" onClick={() => setDrawerOpen(false)}>Bikes</Link>
      <Link to="/admin/bikes?tab=1" className="text-lg font-semibold text-[#111518] hover:text-yellow-600" onClick={() => setDrawerOpen(false)}>Booking</Link>
      <Link to="/admin/customers" className="text-lg font-semibold text-[#111518] hover:text-yellow-600" onClick={() => setDrawerOpen(false)}>Customers</Link>
      <Link to="/admin/analytics" className="text-lg font-semibold text-[#111518] hover:text-yellow-600" onClick={() => setDrawerOpen(false)}>Analytics</Link>
      {isLoggedIn && (
        <Link to="/admin/dashboard" className="flex items-center gap-2 text-lg font-semibold text-[#111518] hover:text-blue-600" onClick={() => setDrawerOpen(false)}>
          <MdDashboard className="w-5 h-5" /> Dashboard
        </Link>
      )}
      {!isLoggedIn ? (
        <>
          <Link to="/login" className="bg-blue-500 text-white text-base font-semibold rounded-md px-4 py-1.5 hover:bg-blue-600 text-center transition-all" onClick={() => setDrawerOpen(false)}>Login</Link>
          <Link to="/signup" className="bg-gray-100 text-[#111518] text-base font-semibold rounded-md px-4 py-1.5 hover:bg-gray-200 text-center transition-all" onClick={() => setDrawerOpen(false)}>Sign Up</Link>
        </>
      ) : (
        <button onClick={() => { setDrawerOpen(false); handleLogout(); }} className="bg-red-500 text-white text-base font-semibold rounded-md px-4 py-1.5 hover:bg-yellow-500 text-center transition-all">Logout</button>
      )}
    </nav>
  );

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/bike-rent-logo-2.png"
            alt="Bike Rent Logo"
            className="w-20 h-20 object-contain"
          />
          {/* <span className="font-bold text-lg text-[#111518]">Bike Rent</span> */}
        </Link>
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold text-[#111518] hover:text-yellow-500">Home</Link>
          <Link to="/bikes" className="text-sm font-semibold text-[#111518] hover:text-yellow-500">Bikes</Link>
          {isLoggedIn && (
            <Link to="/admin/dashboard" className="flex items-center gap-1 text-sm font-semibold text-[#111518] hover:text-yellow-500">
              <MdDashboard className="w-5 h-5" /> Dashboard
            </Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="bg-blue-500 text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-blue-600">Login</Link>
              <Link to="/signup" className="bg-gray-100 text-[#111518] text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-gray-200">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white text-sm font-semibold rounded-full px-5 py-1.5 hover:bg-red-600">Logout</button>
          )}
        </nav>
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {location.pathname.startsWith('/bikes') && (
            <button
              className="flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={onFilterToggle}
              aria-label="Open filter"
            >
              <FiFilter className="w-5 h-5 text-yellow-500" />
            </button>
          )}
          {/* Bikes link for mobile */}
          <Link to="/bikes" className="flex items-center gap-1 text-sm font-semibold text-[#111518] hover:text-yellow-600 px-2 py-1 rounded transition-all">
            Bikes
            <FaMotorcycle className="w-4 h-4 text-yellow-500" />
          </Link>
          <button
            className="flex items-center justify-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default DashboardNavbar; 