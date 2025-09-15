import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import TourNavbar from '../../components/TourNavbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TourContact() {
  React.useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      disable: window.innerWidth < 768 ? true : false, // Disable on mobile for better performance
    });
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact Us | BookYourRide Tours - Get in Touch for Tour Services</title>
        <meta name="title" content="Contact Us | BookYourRide Tours - Get in Touch for Tour Services" />
        <meta name="description" content="Contact BookYourRide Tours for tour service inquiries, support, or bookings. Reach out to our customer service team for assistance with tour packages and travel services across multiple destinations." />
        <meta name="keywords" content="contact BookYourRide tours, tour service contact, travel service support, customer service, tour booking help, tour inquiries" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="BookYourRide" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bookyourride.in/tours/contact" />
        <meta property="og:title" content="Contact Us | BookYourRide Tours - Get in Touch for Tour Services" />
        <meta property="og:description" content="Contact BookYourRide Tours for tour service inquiries, support, or bookings. Reach out to our customer service team for assistance with tour packages and travel services across multiple destinations." />
        <meta property="og:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        <meta property="og:site_name" content="BookYourRide" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.bookyourride.in/tours/contact" />
        <meta property="twitter:title" content="Contact Us | BookYourRide Tours - Get in Touch for Tour Services" />
        <meta property="twitter:description" content="Contact BookYourRide Tours for tour service inquiries, support, or bookings. Reach out to our customer service team for assistance with tour packages and travel services across multiple destinations." />
        <meta property="twitter:image" content="https://www.bookyourride.in/images/bike-rent-logo-2.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FDB813" />
        <link rel="canonical" href="https://www.bookyourride.in/tours/contact" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us | BookYourRide Tours - Get in Touch for Tour Services",
            "description": "Contact BookYourRide Tours for tour service inquiries, support, or bookings. Reach out to our customer service team for assistance with tour packages and travel services across multiple destinations.",
            "url": "https://www.bookyourride.in/tours/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "BookYourRide",
              "url": "https://www.bookyourride.in/",
              "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "9368584334",
                "contactType": "customer service",
                "availableLanguage": "English"
              }
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <TourNavbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/tour-bg.jpeg')" }}></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-aos="fade-up">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" >
              Get in touch with our team for tour service inquiries, support, or bookings. 
              We're here to help make your travel experience comfortable and memorable.
            </p>
          </div>
        </section>

        {/* Basic Contact Information Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to help you with all your tour service needs. Reach out to us through any of the following ways.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our customer service team</p>
                <a href="tel:+919368584334" className="text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors">
                  +91 9368584334
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your queries and we'll respond quickly</p>
                <a href="mailto:support@tourrent.com" className="text-yellow-600 font-semibold text-lg hover:text-yellow-700 transition-colors">
                  support@tourrent.com
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center" data-aos="fade-up" >
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Us</h3>
                <p className="text-gray-600 mb-4">Our main office location</p>
                <p className="text-gray-700 font-semibold">
                  Malla Gorakhpur, Heera Nagar<br />
                  Haldwani, Uttarakhand 263139
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions about our tour services.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" >
                <h3 className="text-xl font-bold text-gray-800 mb-3">How do I book a tour?</h3>
                <p className="text-gray-600">
                  You can book a tour through our website, mobile app, or by calling our customer service number. 
                  Simply browse our tour packages, select your preferred destination and dates, and complete the booking process.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" >
                <h3 className="text-xl font-bold text-gray-800 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept cash, credit/debit cards, UPI, and digital wallets. You can pay online during booking 
                  or directly to our representative after your tour.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" >
                <h3 className="text-xl font-bold text-gray-800 mb-3">Do you provide group tours?</h3>
                <p className="text-gray-600">
                  Yes, we provide both individual and group tours. Our group tours are designed to offer 
                  shared experiences while maintaining personal attention to each traveler.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" >
                <h3 className="text-xl font-bold text-gray-800 mb-3">Can I cancel my tour booking?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel your tour booking up to 48 hours before the scheduled departure time. 
                  Cancellation charges may apply based on the timing and tour package.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" >
                <h3 className="text-xl font-bold text-gray-800 mb-3">What's included in the tour package?</h3>
                <p className="text-gray-600">
                  Our tour packages typically include transportation, accommodation (for multi-day tours), 
                  professional guide services, and entrance fees to major attractions. Meals and personal expenses are usually not included.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6" data-aos="fade-up" >
                <h3 className="text-xl font-bold text-gray-800 mb-3">Do you provide custom tour packages?</h3>
                <p className="text-gray-600">
                  Yes, we offer custom tour packages tailored to your specific interests, budget, and schedule. 
                  Contact our team to discuss your requirements and we'll create a personalized itinerary for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Tour Destinations</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide tour services across multiple destinations with professional guides and well-planned itineraries.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'Mumbai', 'Goa', 'Delhi', 'Jaipur', 'Agra', 'Kerala',
                'Rajasthan', 'Himachal Pradesh', 'Uttarakhand', 'Kashmir',
                'Ladakh', 'Andaman', 'Karnataka', 'Tamil Nadu', 'Gujarat',
                'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar'
              ].map((destination, index) => (
                <div key={destination} className="bg-white p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" >
                  <div className="text-lg font-semibold text-gray-800">{destination}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Send us a Message</h2>
              <p className="text-lg text-gray-600">
                Have a specific question or need a custom tour package? Send us a message and we'll get back to you within 24 hours.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8" data-aos="fade-up" >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Tour Booking</option>
                      <option value="custom">Custom Tour Package</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Tell us about your tour requirements, questions, or any specific needs..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}
