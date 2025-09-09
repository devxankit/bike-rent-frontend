import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Star, Car, Phone, MapPin, Clock, Shield } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ExploreTaxi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden" data-aos="fade-up">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black rounded-full text-sm font-bold shadow-lg" data-aos="fade-up" data-aos-delay="100">
              <MapPin className="w-4 h-4 mr-2" />
              Available in 15+ Cities
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight" data-aos="fade-up" data-aos-delay="200">
                <span className="text-white">Premium</span>
                <br />
                <span className="text-yellow-400">Taxi Service</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg" data-aos="fade-up" data-aos-delay="300">
                Experience luxury travel with our premium taxi fleet. Professional drivers, 
                comfortable vehicles, and 24/7 availability for all your transportation needs.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="400">
              <button 
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center group shadow-lg"
                onClick={() => navigate('/taxi')}
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center" data-aos="zoom-in" data-aos-delay="500">
                <div className="text-3xl font-bold text-yellow-400">4.9</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center" data-aos="zoom-in" data-aos-delay="600">
                <div className="text-3xl font-bold text-yellow-400">200+</div>
                <div className="text-sm text-gray-400">Fleet Size</div>
              </div>
              <div className="text-center" data-aos="zoom-in" data-aos-delay="700">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-400">Service</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Enhanced Design */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700" data-aos="fade-left" data-aos-delay="200">
              {/* Taxi Image */}
              <div className="relative h-80 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden mb-6" data-aos="zoom-in" data-aos-delay="400">
                <img 
                  src="./images/taxi-bg-1.png" 
                  alt="Premium taxi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm shadow-lg" data-aos="slide-left" data-aos-delay="600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Instant Booking
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/95 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg" data-aos="slide-right" data-aos-delay="700">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    +91 98765 43210
                  </div>
                </div>
              </div>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-gray-600" data-aos="flip-up" data-aos-delay="800">
                  <div className="text-2xl font-bold text-yellow-400">₹15/km</div>
                  <div className="text-sm text-gray-300">Starting Rate</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-gray-600" data-aos="flip-up" data-aos-delay="900">
                  <div className="text-2xl font-bold text-yellow-400">5 min</div>
                  <div className="text-sm text-gray-300">Avg. Wait Time</div>
                </div>
              </div>
            </div>
            
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-200" data-aos="slide-down" data-aos-delay="500">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-800">Verified Drivers</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-200" data-aos="slide-up" data-aos-delay="600">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-800">Clean Vehicles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreTaxi;
