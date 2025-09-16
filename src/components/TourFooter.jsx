import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { MdTour } from 'react-icons/md';

const TourFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/images/bike-rent-logo-2.png"
                alt="Bike Rent Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold">Tour Services</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover amazing destinations with our curated tour packages. Professional guides, 
              comfortable accommodations, and unforgettable experiences await you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/bike-rent" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Bike Rental
                </Link>
              </li>
              <li>
                <Link to="/taxi" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Taxi Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tour Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tour Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 text-sm">Mountain Adventures</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">City Explorations</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Beach Getaways</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Cultural Tours</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Adventure Sports</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Photography Tours</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">tours@bikerent.com</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-yellow-400 mt-1" />
                <span className="text-gray-300 text-sm">
                  123 Tour Street<br />
                  Travel City, TC 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">WhatsApp: +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Tour Services. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TourFooter;
