import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Shield, Users, Award } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const FooterTaxi = () => {
  const [taxiCities, setTaxiCities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/api/taxi-cities')
      .then(res => {
        const activeCities = (res.data || []).filter(city => city.isActive);
        setTaxiCities(activeCities);
      })
      .catch(() => setTaxiCities([]));
  }, []);

  // Function to get location information based on current route
  const getLocationInfo = () => {
    const pathname = location.pathname;
    
    // Check if we're on a specific taxi city page
    if (pathname.startsWith('/taxi/')) {
      const citySlug = pathname.split('/taxi/')[1];
      
      // Parse city name from slug (handles taxi service format)
      let cityName = citySlug;
      if (citySlug.startsWith('taxi-service-in-')) {
        cityName = citySlug.replace('taxi-service-in-', '');
      }
      
      // Define location information for each taxi city
      const cityLocations = {
        'indore': {
          label: 'Indore Taxi Location',
          address: 'Rajwada Palace Area, Indore, Madhya Pradesh 452001'
        },
        'bhopal': {
          label: 'Bhopal Taxi Location',
          address: 'New Market, Bhopal, Madhya Pradesh 462001'
        },
        'mumbai': {
          label: 'Mumbai Taxi Location',
          address: 'Gateway of India, Mumbai, Maharashtra 400001'
        },
        'goa': {
          label: 'Goa Taxi Location',
          address: 'Panaji, Goa 403001'
        },
        'dehradun': {
          label: 'Dehradun Taxi Location',
          address: 'Clock Tower, Dehradun, Uttarakhand 248001'
        },
        'haldwani': {
          label: 'Haldwani Taxi Location',
          address: 'Malla Gorakhpur, Heera Nagar, Haldwani, Uttarakhand 263139'
        },
        'kathgodam': {
          label: 'Kathgodam Taxi Location',
          address: 'NH-87, Near Kathgodam Railway station, Kathgodam, Uttarakhand 263139'
        },
        'pithoragarh': {
          label: 'Pithoragarh Taxi Location',
          address: 'Tankpur road, near bus station, Pithoragarh, Uttarakhand 262501'
        }
      };
      
      // Return city-specific location or default
      return cityLocations[cityName.toLowerCase()] || {
        label: 'Taxi Location',
        address: 'Indore, Madhya Pradesh, India'
      };
    }
    
    // Default location for taxi home page and other pages
    return {
      label: 'Head Office',
      address: 'Malla Gorakhpur, Heera Nagar, Haldwani, Uttarakhand 263139'
    };
  };

  const locationInfo = getLocationInfo();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-3">About Taxi Rent</h3>
            <p className="text-white text-xs leading-relaxed">
              Taxi Rent is your trusted partner for convenient, affordable, and reliable taxi 
              services across multiple cities. Travel with comfort, enjoy flexible booking, and experience 
              top-notch customer service. Our mission is to make urban and intercity travel simple and 
              accessible for everyone.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-3 pt-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="text-xs">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3 text-white" />
                <span className="text-xs">15K+ Users</span>
              </div>
            </div>
          </div>

          {/* Taxi City Locations Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-3">Our Taxi Cities</h3>
            <div className="space-y-1">
              {taxiCities.map((city) => (
                <a
                  key={city._id || city.slug || city.name}
                  href={`/taxi/${city.slug || city.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors text-xs group"
                >
                  <MapPin className="h-3 w-3 text-teal-400 flex-shrink-0" />
                  <span>
                    Taxi service in <span className="font-bold">{city.name}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-3">Our Services</h3>
            <ul className="space-y-1 text-xs">
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Local Taxi Service
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Outstation Taxi Booking
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Airport Transfer Service
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Railway Station Pickup
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Corporate Taxi Solutions
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • 24/7 Emergency Service
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Luxury & Premium Cars
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-3">Contact Us</h3>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-white flex-shrink-0" />
                <div>
                  <p className="text-xs text-white">Call Us</p>
                  <p className="text-white font-medium text-xs">+91 9368584334</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-white flex-shrink-0" />
                <div>
                  <p className="text-xs text-white">Email Support</p>
                  <p className="text-white font-medium text-xs">support@taxirent.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-white flex-shrink-0" />
                <div>
                  <p className="text-xs text-white">{locationInfo.label}</p>
                  <p className="text-white font-medium text-xs">{locationInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-white flex-shrink-0" />
                <div>
                  <p className="text-xs text-white">Working Hours</p>
                  <p className="text-white font-medium text-xs">24/7 Service Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
            
            <div className="space-y-1">
              <a href="/taxi" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                Taxi Home
              </a>
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                About Us
              </a>
              <a href="/taxi" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                Book Taxi
              </a>
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                Contact
              </a>
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                Login / Register
              </a>
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                FAQ
              </a>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 pt-3">
              <Shield className="h-4 w-4 text-white" />
              <span className="text-xs text-white">Secure & Trusted</span>
            </div>
          </div>
        </div>
       
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white text-sm">
                © 2025 Taxi Rent. All rights reserved.
              </p>
              <p className="text-white text-xs mt-1">
                Making travel accessible, one ride at a time.
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-white transition-colors">
                Refund Policy
              </a>
              <a href="#" className="text-white hover:text-white transition-colors">
                Careers
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTaxi;
