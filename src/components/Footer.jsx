import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Shield, Users, Award } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const Footer = () => {
  const [cities, setCities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/api/cities')
      .then(res => {
        const activeCities = (res.data || []).filter(city => city.isActive);
        setCities(activeCities);
      })
      .catch(() => setCities([]));
  }, []);

  // Function to get location information based on current route
  const getLocationInfo = () => {
    const pathname = location.pathname;
    
    // Check if we're on a specific city page
    if (pathname.startsWith('/bikes/')) {
      const citySlug = pathname.split('/bikes/')[1];
      
      // Parse city name from slug (handles both new and old formats)
      let cityName = citySlug;
      if (citySlug.startsWith('bike-rent-in-')) {
        cityName = citySlug.replace('bike-rent-in-', '');
      } else if (citySlug.includes('-rent-bike-in-')) {
        const parts = citySlug.split('-rent-bike-in-');
        if (parts.length === 2 && parts[0] === parts[1]) {
          cityName = parts[0];
        }
      }
      
      // Define location information for each city
      const cityLocations = {
        'haldwani': {
          label: 'Haldwani Location',
          address: 'Malla Gorakhpur, Heera Nagar, Haldwani, Uttarakhand 263139'
        },
        'kathgodam': {
          label: 'Kathgodam Location',
          address: 'NH-87, Bareilly - Nainital Rd, Near Kathgodam Railway station, Kathgodam, Haldwani, Uttarakhand 263139'
        },
        'pithoragarh': {
          label: 'Pithoragarh Location',
          address: 'Tankpur road, near bus station, Pithoragarh, Uttarakhand 262501'
        },
        'rishikesh': {
          label: 'Rishikesh Location',
          address: 'Bus stand, ISBT Rd, Adarsh Gram, Rishikesh, Dehradun, Uttarakhand 249201'
        },
        'haridwar': {
          label: 'Haridwar Location',
          address: 'Near railway station Devpura, Haridwar, Uttarakhand 249401'
        },
        'dehradun': {
          label: 'Dehradun Location',
          address: 'Gandhi Rd, Govind Nagar, Railway Station, Dehradun, Uttarakhand 248001'
        },
        'almora': {
          label: 'Almora Location',
          address: 'Mall Rd, Paltan Bazar, Dharanaula, Almora, Uttarakhand 263601'
        },
        'nainital': {
          label: 'Nainital Location',
          address: 'Near bus stand, Tallital, Nainital, Uttarakhand 263001'
        },
        
      };
      
      // Return city-specific location or default
      return cityLocations[cityName.toLowerCase()] || {
        label: 'Location',
        address: 'Indore, Madhya Pradesh, India'
      };
    }
    
    // Default location for home page and other pages
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
            <h3 className="text-lg font-bold text-white mb-3">About Bike Rent</h3>
            <p className="text-white text-xs leading-relaxed">
              Bike Rent is your trusted partner for convenient, affordable, and reliable bike 
              rentals in Indore. Explore the city with ease, enjoy flexible booking, and experience 
              top-notch customer service. Our mission is to make urban mobility simple and 
              accessible for everyone.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-3 pt-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="text-xs">4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3 text-white" />
                <span className="text-xs">10K+ Users</span>
              </div>
            </div>
          </div>

          {/* City Locations Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-3">Our Locations</h3>
            <div className="space-y-1">
              {cities.map((city) => (
                <a
                  key={city._id || city.slug || city.name}
                  href={`/bikes/${city.slug || city.name.toLowerCase()}`}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors text-xs group"
                >
                  <MapPin className="h-3 w-3 text-teal-400 flex-shrink-0" />
                  <span>
                    Bike rent in <span className="font-bold">{city.name}</span>
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
                • Hourly Bike Rentals
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Daily & Weekly Packages
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Premium Bike Collection
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Corporate Bike Solutions
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • 24/7 Roadside Assistance
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Guided City Tours
              </li>
              <li className="text-white hover:text-yellow-400 transition-colors cursor-pointer">
                • Bike Maintenance Services
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
                  <p className="text-white font-medium text-xs">support@bikerent.com</p>
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
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                Home
              </a>
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                About Us
              </a>
                 
              <a href="#" className="block text-white hover:text-yellow-400 transition-colors text-xs">
                Book Now
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
                © 2025 Bike Rent. All rights reserved.
              </p>
              <p className="text-white text-xs mt-1">
                Making urban mobility accessible, one ride at a time.
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

export default Footer;