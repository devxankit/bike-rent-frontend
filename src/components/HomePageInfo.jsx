import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Star, 
  Bike, 
  Shield, 
  Users, 
  Phone, 
  Mail,
  Calendar,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';

function HomePageInfo() {
  const [activeTab, setActiveTab] = useState('hourly');

 


  const features = [
    { icon: Shield, title: 'Fully Insured', desc: 'Complete coverage for your peace of mind' },
    { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock assistance when you need it' },
    { icon: MapPin, title: 'Multiple Locations', desc: 'Pick up and drop off at convenient spots' },
    { icon: Users, title: 'Group Discounts', desc: 'Special rates for groups of 4 or more' }
  ];

  const steps = [
    { step: '01', title: 'Choose Your Bike', desc: 'Select from our premium fleet' },
    { step: '02', title: 'Book Online', desc: 'Quick and secure reservation' },
    { step: '03', title: 'Pick Up & Ride', desc: 'Grab your bike and explore' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Explore the City
                  <span className="block text-blue-300">Your Way</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Premium bike rentals for urban adventures. Discover hidden gems, 
                  beat the traffic, and experience the city like never before.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center group">
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">4.9/5</span>
                  <span className="text-blue-200">2,450+ reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bike className="h-5 w-5 text-blue-300" />
                  <span className="text-white font-semibold">500+</span>
                  <span className="text-blue-200">bikes available</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="./images/bikePoster.png" 
                alt="Premium bike rental"
                className="w-full h-80 lg:h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BikeRental?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best cycling experience with premium bikes and exceptional service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePageInfo;