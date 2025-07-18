import React from 'react';
import { Phone, Mail, MapPin, Clock, Star, Shield, Users, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-yellow-500 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">About Bike Rent</h3>
            <p className="text-white text-sm leading-relaxed">
              Bike Rent is your trusted partner for convenient, affordable, and reliable bike 
              rentals in Indore. Explore the city with ease, enjoy flexible booking, and experience 
              top-notch customer service. Our mission is to make urban mobility simple and 
              accessible for everyone.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-white" />
                <span className="text-sm">4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-white" />
                <span className="text-sm">10K+ Users</span>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • Hourly Bike Rentals
              </li>
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • Daily & Weekly Packages
              </li>
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • Premium Bike Collection
              </li>
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • Corporate Bike Solutions
              </li>
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • 24/7 Roadside Assistance
              </li>
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • Guided City Tours
              </li>
              <li className="text-white hover:text-black transition-colors cursor-pointer">
                • Bike Maintenance Services
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Call Us</p>
                  <p className="text-white font-medium">+91 97987 74681</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Email Support</p>
                  <p className="text-white font-medium">support@bikerent.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Location</p>
                  <p className="text-white font-medium">Indore, Madhya Pradesh, India</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-white flex-shrink-0" />
                <div>
                  <p className="text-sm text-white">Working Hours</p>
                  <p className="text-white font-medium">24/7 Service Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            
            <div className="space-y-2">
              <a href="#" className="block text-white hover:text-black transition-colors text-sm">
                Home
              </a>
              <a href="#" className="block text-white hover:text-black transition-colors text-sm">
                About Us
              </a>
                 
              <a href="#" className="block text-white hover:text-black transition-colors text-sm">
                Book Now
              </a>
              <a href="#" className="block text-white hover:text-black transition-colors text-sm">
                Contact
              </a>
              <a href="#" className="block text-white hover:text-black transition-colors text-sm">
                Login / Register
              </a>
              <a href="#" className="block text-white hover:text-black transition-colors text-sm">
                FAQ
              </a>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 pt-4">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm text-white">Secure & Trusted</span>
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